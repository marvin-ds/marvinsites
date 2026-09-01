-- =============================================================================
-- Gate 4 — Lead Capture Foundation
-- Atomic server-side lead capture for Netlify Functions
-- =============================================================================

alter table public.leads
  add column if not exists submission_id text;

create unique index if not exists leads_submission_id_unique
  on public.leads (submission_id)
  where submission_id is not null;

create or replace function public.capture_lead_v1(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  existing_lead_id uuid;
  new_business_id uuid;
  new_lead_id uuid;
begin
  if payload is null or jsonb_typeof(payload) <> 'object' then
    raise exception 'invalid payload' using errcode = '22023';
  end if;

  if nullif(payload->>'submission_id', '') is null then
    raise exception 'submission_id is required' using errcode = '23502';
  end if;

  select id
    into existing_lead_id
    from public.leads
   where submission_id = payload->>'submission_id'
   limit 1;

  if existing_lead_id is not null then
    return jsonb_build_object('ok', true, 'duplicate', true, 'lead_id', existing_lead_id);
  end if;

  insert into public.businesses (
    name,
    city,
    state,
    website_url,
    phone_normalized,
    status,
    environment
  )
  values (
    payload #>> '{business,name}',
    payload #>> '{business,city}',
    nullif(payload #>> '{business,state}', ''),
    nullif(payload #>> '{business,website_url}', ''),
    nullif(payload #>> '{business,phone_normalized}', ''),
    coalesce(nullif(payload #>> '{business,status}', ''), 'active'),
    coalesce(nullif(payload #>> '{business,environment}', ''), 'production')
  )
  returning id into new_business_id;

  if nullif(payload #>> '{business,website_url}', '') is not null then
    insert into public.business_sources (
      business_id,
      source_type,
      source_url
    )
    values (
      new_business_id,
      'website',
      payload #>> '{business,website_url}'
    );
  end if;

  insert into public.leads (
    submission_id,
    business_id,
    name,
    business_name,
    phone_raw,
    phone_normalized,
    email_raw,
    email_normalized,
    city,
    state,
    segment,
    digital_presence_url,
    source_type,
    status,
    landing_version,
    offer_version,
    tracking_version,
    environment
  )
  values (
    payload->>'submission_id',
    new_business_id,
    payload #>> '{lead,name}',
    payload #>> '{lead,business_name}',
    payload #>> '{lead,phone_raw}',
    payload #>> '{lead,phone_normalized}',
    nullif(payload #>> '{lead,email_raw}', ''),
    nullif(payload #>> '{lead,email_normalized}', ''),
    payload #>> '{lead,city}',
    nullif(payload #>> '{lead,state}', ''),
    payload #>> '{lead,segment}',
    nullif(payload #>> '{lead,digital_presence_url}', ''),
    coalesce(nullif(payload #>> '{lead,source_type}', ''), 'form'),
    coalesce(nullif(payload #>> '{lead,status}', ''), 'new'),
    coalesce(nullif(payload #>> '{lead,landing_version}', ''), 'site-g4'),
    coalesce(nullif(payload #>> '{lead,offer_version}', ''), 'diagnostic-v1'),
    coalesce(nullif(payload #>> '{lead,tracking_version}', ''), 'g3-v1'),
    coalesce(nullif(payload #>> '{lead,environment}', ''), 'production')
  )
  returning id into new_lead_id;

  insert into public.lead_attribution (
    lead_id,
    first_touch_at,
    first_source,
    first_medium,
    first_campaign,
    first_campaign_id,
    first_content,
    first_term,
    first_referrer,
    first_landing_page,
    first_gclid,
    first_gbraid,
    first_wbraid,
    first_fbclid,
    last_touch_at,
    last_source,
    last_medium,
    last_campaign,
    last_campaign_id,
    last_content,
    last_term,
    last_referrer,
    last_landing_page,
    last_gclid,
    last_gbraid,
    last_wbraid,
    last_fbclid,
    session_id
  )
  values (
    new_lead_id,
    (payload #>> '{attribution,first_touch_at}')::timestamptz,
    payload #>> '{attribution,first_source}',
    payload #>> '{attribution,first_medium}',
    payload #>> '{attribution,first_campaign}',
    nullif(payload #>> '{attribution,first_campaign_id}', ''),
    nullif(payload #>> '{attribution,first_content}', ''),
    nullif(payload #>> '{attribution,first_term}', ''),
    nullif(payload #>> '{attribution,first_referrer}', ''),
    payload #>> '{attribution,first_landing_page}',
    nullif(payload #>> '{attribution,first_gclid}', ''),
    nullif(payload #>> '{attribution,first_gbraid}', ''),
    nullif(payload #>> '{attribution,first_wbraid}', ''),
    nullif(payload #>> '{attribution,first_fbclid}', ''),
    (payload #>> '{attribution,last_touch_at}')::timestamptz,
    payload #>> '{attribution,last_source}',
    payload #>> '{attribution,last_medium}',
    payload #>> '{attribution,last_campaign}',
    nullif(payload #>> '{attribution,last_campaign_id}', ''),
    nullif(payload #>> '{attribution,last_content}', ''),
    nullif(payload #>> '{attribution,last_term}', ''),
    nullif(payload #>> '{attribution,last_referrer}', ''),
    payload #>> '{attribution,last_landing_page}',
    nullif(payload #>> '{attribution,last_gclid}', ''),
    nullif(payload #>> '{attribution,last_gbraid}', ''),
    nullif(payload #>> '{attribution,last_wbraid}', ''),
    nullif(payload #>> '{attribution,last_fbclid}', ''),
    nullif(payload #>> '{attribution,session_id}', '')
  );

  insert into public.lead_consents (
    lead_id,
    session_id,
    privacy_ack,
    diagnostic_contact_allowed,
    email_marketing_opt_in,
    whatsapp_marketing_opt_in,
    analytics_storage,
    ad_storage,
    ad_user_data,
    ad_personalization,
    consent_version,
    policy_version,
    source
  )
  values (
    new_lead_id,
    nullif(payload #>> '{consent,session_id}', ''),
    coalesce((payload #>> '{consent,privacy_ack}')::boolean, true),
    coalesce((payload #>> '{consent,diagnostic_contact_allowed}')::boolean, true),
    coalesce((payload #>> '{consent,email_marketing_opt_in}')::boolean, false),
    coalesce((payload #>> '{consent,whatsapp_marketing_opt_in}')::boolean, false),
    coalesce(nullif(payload #>> '{consent,analytics_storage}', ''), 'denied'),
    coalesce(nullif(payload #>> '{consent,ad_storage}', ''), 'denied'),
    coalesce(nullif(payload #>> '{consent,ad_user_data}', ''), 'denied'),
    coalesce(nullif(payload #>> '{consent,ad_personalization}', ''), 'denied'),
    payload #>> '{consent,consent_version}',
    payload #>> '{consent,policy_version}',
    coalesce(nullif(payload #>> '{consent,source}', ''), 'diagnostic_form')
  );

  insert into public.audit_log (
    actor_type,
    action,
    entity_type,
    entity_id,
    metadata
  )
  values (
    'api',
    'lead_capture_created',
    'lead',
    new_lead_id,
    jsonb_build_object(
      'capture_version', payload #>> '{meta,capture_version}',
      'source_type', payload #>> '{lead,source_type}',
      'tracking_version', payload #>> '{lead,tracking_version}'
    )
  );

  return jsonb_build_object('ok', true, 'duplicate', false, 'lead_id', new_lead_id);
end;
$$;

revoke all on function public.capture_lead_v1(jsonb) from public;
revoke all on function public.capture_lead_v1(jsonb) from anon;
revoke all on function public.capture_lead_v1(jsonb) from authenticated;
grant execute on function public.capture_lead_v1(jsonb) to service_role;
