-- =============================================================================
-- Gate 1 — Functions and triggers
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Shared updated_at trigger function (one function, applied per table)
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Apply updated_at trigger to tables that have the column
create trigger trg_businesses_updated_at
  before update on public.businesses
  for each row execute function public.set_updated_at();

create trigger trg_business_sources_updated_at
  before update on public.business_sources
  for each row execute function public.set_updated_at();

create trigger trg_leads_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

create trigger trg_lead_consents_updated_at
  before update on public.lead_consents
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- First-touch immutability — protect first_* fields after initial write
-- ---------------------------------------------------------------------------

create or replace function public.protect_first_touch()
returns trigger
language plpgsql
as $$
begin
  -- Only lock when first_touch_at was already set
  if old.first_touch_at is not null then
    new.first_touch_at      := old.first_touch_at;
    new.first_source        := old.first_source;
    new.first_medium        := old.first_medium;
    new.first_campaign      := old.first_campaign;
    new.first_campaign_id   := old.first_campaign_id;
    new.first_content       := old.first_content;
    new.first_term          := old.first_term;
    new.first_referrer      := old.first_referrer;
    new.first_landing_page  := old.first_landing_page;
    new.first_gclid         := old.first_gclid;
    new.first_gbraid        := old.first_gbraid;
    new.first_wbraid        := old.first_wbraid;
    new.first_fbclid        := old.first_fbclid;
  end if;
  return new;
end;
$$;

create trigger trg_lead_attribution_protect_first_touch
  before update on public.lead_attribution
  for each row execute function public.protect_first_touch();

-- ---------------------------------------------------------------------------
-- Lead status history — auto-record on insert and status change
-- ---------------------------------------------------------------------------

create or replace function public.record_lead_status_change()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.lead_status_history
      (lead_id, from_status, to_status, changed_at)
    values
      (new.id, null, new.status, now());

  elsif tg_op = 'UPDATE' and old.status is distinct from new.status then
    insert into public.lead_status_history
      (lead_id, from_status, to_status, changed_at)
    values
      (new.id, old.status, new.status, now());
  end if;

  return new;
end;
$$;

create trigger trg_leads_status_history
  after insert or update on public.leads
  for each row execute function public.record_lead_status_change();
