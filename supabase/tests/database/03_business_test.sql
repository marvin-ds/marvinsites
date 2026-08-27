-- =============================================================================
-- Gate 1 — Business logic tests (pgTAP)
-- =============================================================================

begin;

select plan(32);

-- ---------------------------------------------------------------------------
-- UUID generation
-- ---------------------------------------------------------------------------

select isnt(
  (insert into public.businesses (name, city, status, environment)
   values ('Teste Clínica', 'Santos', 'active', 'test')
   returning id::text),
  null,
  'businesses: UUID auto-generated'
);

-- Reset for clean tests
truncate public.businesses cascade;

-- ---------------------------------------------------------------------------
-- Business: invalid status rejected
-- ---------------------------------------------------------------------------

select throws_ok(
  $$insert into public.businesses (name, city, status, environment)
    values ('X', 'Santos', 'invalid_status', 'production')$$,
  '23514',
  null,
  'businesses: invalid status rejected'
);

-- ---------------------------------------------------------------------------
-- Business: google_place_id unique when present
-- ---------------------------------------------------------------------------

insert into public.businesses (name, city, status, environment, google_place_id)
values ('Negócio A', 'Santos', 'active', 'test', 'ChIJ_place_001');

select throws_ok(
  $$insert into public.businesses (name, city, status, environment, google_place_id)
    values ('Negócio B', 'Santos', 'active', 'test', 'ChIJ_place_001')$$,
  '23505',
  null,
  'businesses: google_place_id unique constraint'
);

-- Two businesses can have NULL google_place_id
insert into public.businesses (name, city, status, environment, google_place_id)
values ('Sem Place A', 'Santos', 'active', 'test', null);

insert into public.businesses (name, city, status, environment, google_place_id)
values ('Sem Place B', 'Santos', 'active', 'test', null);

select pass('businesses: multiple NULL google_place_id allowed');

truncate public.businesses cascade;

-- ---------------------------------------------------------------------------
-- Lead: valid status insert
-- ---------------------------------------------------------------------------

insert into public.businesses (id, name, city, status, environment)
values ('00000000-0000-0000-0000-000000000001', 'Biz Teste', 'Santos', 'active', 'test');

insert into public.leads (
  name, business_name, phone_raw, phone_normalized,
  city, segment, source_type, status, landing_version, offer_version, tracking_version, environment
) values (
  'Ana Teste', 'Clínica Teste', '13999990001', '5513999990001',
  'Santos', 'Clínica / Consultório', 'form', 'new', 'v1', 'v1', 'v1', 'test'
);

select pass('leads: insert with valid status succeeds');

-- ---------------------------------------------------------------------------
-- Lead: invalid status rejected
-- ---------------------------------------------------------------------------

select throws_ok(
  $$insert into public.leads (
      name, business_name, phone_raw, phone_normalized,
      city, segment, source_type, status, landing_version, offer_version, tracking_version, environment
    ) values (
      'X', 'X', '13000000000', '5513000000000',
      'Santos', 'Outro', 'form', 'status_invalido', 'v1', 'v1', 'v1', 'test'
    )$$,
  '23514',
  null,
  'leads: invalid status rejected'
);

-- ---------------------------------------------------------------------------
-- Lead: business_id FK respected
-- ---------------------------------------------------------------------------

select throws_ok(
  $$insert into public.leads (
      name, business_name, phone_raw, phone_normalized,
      city, segment, source_type, status, business_id,
      landing_version, offer_version, tracking_version, environment
    ) values (
      'X', 'X', '13000000000', '5513000000000',
      'Santos', 'Outro', 'form', 'new',
      'ffffffff-ffff-ffff-ffff-ffffffffffff',
      'v1', 'v1', 'v1', 'test'
    )$$,
  '23503',
  null,
  'leads: invalid business_id FK rejected'
);

-- ---------------------------------------------------------------------------
-- Lead: status history auto-created on insert
-- ---------------------------------------------------------------------------

select is(
  (select count(*)::int from public.lead_status_history
   where lead_id = (select id from public.leads limit 1)
     and from_status is null and to_status = 'new'),
  1,
  'lead_status_history: initial entry created on lead insert'
);

-- ---------------------------------------------------------------------------
-- Lead: status history on update
-- ---------------------------------------------------------------------------

update public.leads set status = 'contacted' where status = 'new';

select is(
  (select count(*)::int from public.lead_status_history
   where lead_id = (select id from public.leads limit 1)
     and from_status = 'new' and to_status = 'contacted'),
  1,
  'lead_status_history: entry created on status change'
);

-- ---------------------------------------------------------------------------
-- Lead: no duplicate history entry when status unchanged
-- ---------------------------------------------------------------------------

update public.leads set status = 'contacted' where status = 'contacted';

select is(
  (select count(*)::int from public.lead_status_history
   where lead_id = (select id from public.leads limit 1)
     and to_status = 'contacted'),
  1,
  'lead_status_history: no duplicate when status unchanged'
);

-- ---------------------------------------------------------------------------
-- Lead attribution: first-touch protection
-- ---------------------------------------------------------------------------

with lead as (select id from public.leads limit 1)
insert into public.lead_attribution (
  lead_id,
  first_touch_at, first_source, first_medium, first_campaign, first_landing_page,
  last_touch_at,  last_source,  last_medium,  last_campaign,  last_landing_page
)
select
  lead.id,
  now(), 'google', 'cpc', 'camp_001', '/',
  now(), 'google', 'cpc', 'camp_001', '/'
from lead;

-- Attempt to overwrite first_touch fields
update public.lead_attribution
set first_source = 'facebook', first_medium = 'social'
where lead_id = (select id from public.leads limit 1);

select is(
  (select first_source from public.lead_attribution
   where lead_id = (select id from public.leads limit 1)),
  'google',
  'lead_attribution: first_source immutable after set'
);

select is(
  (select first_medium from public.lead_attribution
   where lead_id = (select id from public.leads limit 1)),
  'cpc',
  'lead_attribution: first_medium immutable after set'
);

-- last_touch IS mutable
update public.lead_attribution
set last_source = 'facebook'
where lead_id = (select id from public.leads limit 1);

select is(
  (select last_source from public.lead_attribution
   where lead_id = (select id from public.leads limit 1)),
  'facebook',
  'lead_attribution: last_source mutable'
);

-- ---------------------------------------------------------------------------
-- Consent: requires lead_id OR session_id
-- ---------------------------------------------------------------------------

select throws_ok(
  $$insert into public.lead_consents
    (privacy_ack, diagnostic_contact_allowed, email_marketing_opt_in,
     analytics_storage, ad_storage, ad_user_data, ad_personalization,
     consent_version, policy_version, source)
    values (true, true, false, 'denied', 'denied', 'denied', 'denied', 'v1', 'v1', 'form')$$,
  '23514',
  null,
  'lead_consents: both lead_id and session_id NULL rejected'
);

-- ---------------------------------------------------------------------------
-- Consent: invalid storage value rejected
-- ---------------------------------------------------------------------------

select throws_ok(
  $$insert into public.lead_consents
    (session_id, privacy_ack, diagnostic_contact_allowed, email_marketing_opt_in,
     analytics_storage, ad_storage, ad_user_data, ad_personalization,
     consent_version, policy_version, source)
    values ('sess_001', true, true, false,
            'unknown', 'denied', 'denied', 'denied', 'v1', 'v1', 'form')$$,
  '23514',
  null,
  'lead_consents: invalid analytics_storage value rejected'
);

-- ---------------------------------------------------------------------------
-- Payment: negative amount rejected
-- ---------------------------------------------------------------------------

select throws_ok(
  $$insert into public.deals (lead_id, status, plan_code, setup_value, monthly_value)
    values (
      (select id from public.leads limit 1),
      'open', 'essencial', -1, 197
    )$$,
  '23514',
  null,
  'deals: negative setup_value rejected'
);

-- ---------------------------------------------------------------------------
-- Webhook event: duplicate provider_event_id rejected
-- ---------------------------------------------------------------------------

insert into public.provider_webhook_events
  (provider, provider_event_id, event_type, status, payload_hash)
values ('atomicat', 'evt_001', 'payment.created', 'pending', 'hash_abc');

select throws_ok(
  $$insert into public.provider_webhook_events
    (provider, provider_event_id, event_type, status, payload_hash)
    values ('atomicat', 'evt_001', 'payment.created', 'pending', 'hash_xyz')$$,
  '23505',
  null,
  'provider_webhook_events: duplicate (provider, provider_event_id) rejected'
);

-- ---------------------------------------------------------------------------
-- Checkout: duplicate token_hash rejected
-- ---------------------------------------------------------------------------

-- Need deal and checkout session
insert into public.deals (id, lead_id, status, plan_code, setup_value, monthly_value)
values (
  '00000000-0000-0000-0001-000000000001',
  (select id from public.leads limit 1),
  'open', 'essencial', 0, 197
);

insert into public.checkout_sessions
  (deal_id, lead_id, token_hash, atomicat_checkout_url)
values (
  '00000000-0000-0000-0001-000000000001',
  (select id from public.leads limit 1),
  'hash_tok_001',
  'https://checkout.atomicat.com/xxx'
);

select throws_ok(
  $$insert into public.checkout_sessions
    (deal_id, lead_id, token_hash, atomicat_checkout_url)
    values (
      '00000000-0000-0000-0001-000000000001',
      (select id from public.leads limit 1),
      'hash_tok_001',
      'https://checkout.atomicat.com/yyy'
    )$$,
  '23505',
  null,
  'checkout_sessions: duplicate token_hash rejected'
);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------

do $$ declare biz_id uuid; begin
  insert into public.businesses (name, city, status, environment)
  values ('Trigger Test', 'Santos', 'active', 'test')
  returning id into biz_id;

  perform pg_sleep(0.01);

  update public.businesses set name = 'Trigger Test Updated' where id = biz_id;

  if (select updated_at > created_at from public.businesses where id = biz_id) then
    perform pass('businesses: updated_at trigger advances on UPDATE');
  else
    perform fail('businesses: updated_at trigger did NOT advance');
  end if;
end $$;

select pass('updated_at trigger check done');

-- ---------------------------------------------------------------------------
-- Scan tables do not exist
-- ---------------------------------------------------------------------------

select hasnt_table('public', 'scan_runs',       'scan_runs absent from schema');
select hasnt_table('public', 'scan_checks',     'scan_checks absent from schema');
select hasnt_table('public', 'score_snapshots', 'score_snapshots absent from schema');

select * from finish();
rollback;
