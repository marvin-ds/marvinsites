-- =============================================================================
-- Gate 1 — Common Core: tables, constraints, foreign keys
-- Marvin Sites + Marvin Local shared foundation
-- Decision D012: diagnostics renamed to human_diagnostics (Gate 1)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Businesses — central entity
-- ---------------------------------------------------------------------------

create table public.businesses (
  id                uuid        primary key default gen_random_uuid(),
  created_at        timestamptz not null    default now(),
  updated_at        timestamptz not null    default now(),

  name              text        not null,
  city              text        not null,
  state             text,

  website_url       text,
  phone_normalized  text,

  google_place_id   text,

  status            text        not null    default 'active',
  environment       text        not null    default 'production',

  constraint businesses_status_check
    check (status in ('active', 'inactive', 'archived')),

  constraint businesses_environment_check
    check (environment in ('production', 'staging', 'test'))
);

-- google_place_id: nullable, but unique when present
create unique index businesses_google_place_id_unique
  on public.businesses (google_place_id)
  where google_place_id is not null;

-- ---------------------------------------------------------------------------
-- Business sources
-- ---------------------------------------------------------------------------

create table public.business_sources (
  id            uuid        primary key default gen_random_uuid(),
  business_id   uuid        not null    references public.businesses (id) on delete cascade,
  source_type   text        not null,
  external_id   text,
  source_url    text,
  created_at    timestamptz not null    default now(),
  updated_at    timestamptz not null    default now(),

  constraint business_sources_source_type_check
    check (source_type in ('website', 'google_place', 'other'))
);

-- ---------------------------------------------------------------------------
-- Leads — commercial contact (person, not the business)
-- ---------------------------------------------------------------------------

create table public.leads (
  id                    uuid        primary key default gen_random_uuid(),
  created_at            timestamptz not null    default now(),
  updated_at            timestamptz not null    default now(),
  last_activity_at      timestamptz not null    default now(),

  business_id           uuid        references public.businesses (id) on delete set null,

  -- Contact info (kept alongside business_id for backward compat)
  name                  text        not null,
  business_name         text        not null,
  phone_raw             text        not null,
  phone_normalized      text        not null,
  email_raw             text,
  email_normalized      text,

  city                  text        not null,
  state                 text,
  segment               text        not null,
  digital_presence_url  text,

  source_type           text        not null,
  status                text        not null    default 'new',
  qualified             boolean,
  lost_reason           text,

  landing_version       text        not null    default 'unknown',
  offer_version         text        not null    default 'unknown',
  tracking_version      text        not null    default 'unknown',
  environment           text        not null    default 'production',

  constraint leads_status_check check (
    status in (
      'new', 'contacted', 'qualified', 'unqualified',
      'diagnostic_in_progress', 'diagnostic_delivered',
      'proposal_sent', 'checkout_sent',
      'won', 'lost', 'customer', 'canceled'
    )
  ),

  constraint leads_environment_check
    check (environment in ('production', 'staging', 'test'))
);

-- ---------------------------------------------------------------------------
-- Lead attribution
-- ---------------------------------------------------------------------------

create table public.lead_attribution (
  id                    uuid        primary key default gen_random_uuid(),
  lead_id               uuid        not null unique references public.leads (id) on delete cascade,

  first_touch_at        timestamptz not null,
  first_source          text        not null,
  first_medium          text        not null,
  first_campaign        text        not null,
  first_campaign_id     text,
  first_content         text,
  first_term            text,
  first_referrer        text,
  first_landing_page    text        not null,
  first_gclid           text,
  first_gbraid          text,
  first_wbraid          text,
  first_fbclid          text,

  last_touch_at         timestamptz not null,
  last_source           text        not null,
  last_medium           text        not null,
  last_campaign         text        not null,
  last_campaign_id      text,
  last_content          text,
  last_term             text,
  last_referrer         text,
  last_landing_page     text        not null,
  last_gclid            text,
  last_gbraid           text,
  last_wbraid           text,
  last_fbclid           text,

  session_id            text
);

-- ---------------------------------------------------------------------------
-- Lead consents
-- ---------------------------------------------------------------------------

create table public.lead_consents (
  id                          uuid        primary key default gen_random_uuid(),
  lead_id                     uuid        references public.leads (id) on delete set null,
  session_id                  text,

  privacy_ack                 boolean     not null    default false,
  diagnostic_contact_allowed  boolean     not null    default false,
  email_marketing_opt_in      boolean     not null    default false,
  whatsapp_marketing_opt_in   boolean     not null    default false,

  analytics_storage           text        not null    default 'denied',
  ad_storage                  text        not null    default 'denied',
  ad_user_data                text        not null    default 'denied',
  ad_personalization          text        not null    default 'denied',

  consent_version             text        not null,
  policy_version              text        not null,
  source                      text        not null,
  created_at                  timestamptz not null    default now(),
  updated_at                  timestamptz not null    default now(),

  constraint lead_consents_has_identity
    check (lead_id is not null or session_id is not null),

  constraint lead_consents_analytics_storage_check
    check (analytics_storage in ('granted', 'denied')),

  constraint lead_consents_ad_storage_check
    check (ad_storage in ('granted', 'denied')),

  constraint lead_consents_ad_user_data_check
    check (ad_user_data in ('granted', 'denied')),

  constraint lead_consents_ad_personalization_check
    check (ad_personalization in ('granted', 'denied'))
);

-- ---------------------------------------------------------------------------
-- Lead status history (append-only)
-- ---------------------------------------------------------------------------

create table public.lead_status_history (
  id            uuid        primary key default gen_random_uuid(),
  lead_id       uuid        not null    references public.leads (id) on delete cascade,
  from_status   text,
  to_status     text        not null,
  changed_at    timestamptz not null    default now(),
  changed_by    uuid,
  reason        text,
  event_id      uuid        not null    default gen_random_uuid() unique
);

-- ---------------------------------------------------------------------------
-- Human diagnostics (manual analysis — not Raio-X scanner)
-- ---------------------------------------------------------------------------

create table public.human_diagnostics (
  id                uuid        primary key default gen_random_uuid(),
  lead_id           uuid        not null    references public.leads (id) on delete restrict,
  created_at        timestamptz not null    default now(),
  delivered_at      timestamptz,
  score             numeric,
  status            text        not null    default 'pending',
  summary           text,
  strengths         jsonb       not null    default '[]',
  opportunities     jsonb       not null    default '[]',
  criteria          jsonb       not null    default '{}',
  recommended_plan  text,
  version           text        not null    default 'v1',

  constraint human_diagnostics_status_check
    check (status in ('pending', 'in_progress', 'delivered', 'canceled'))
);

-- ---------------------------------------------------------------------------
-- Deals
-- ---------------------------------------------------------------------------

create table public.deals (
  id                  uuid        primary key default gen_random_uuid(),
  lead_id             uuid        not null    references public.leads (id) on delete restrict,
  created_at          timestamptz not null    default now(),

  status              text        not null    default 'open',
  plan_code           text        not null,
  setup_value         numeric     not null    default 0 check (setup_value >= 0),
  monthly_value       numeric     not null    default 0 check (monthly_value >= 0),
  currency            text        not null    default 'BRL',

  proposal_sent_at    timestamptz,
  checkout_sent_at    timestamptz,
  won_at              timestamptz,
  lost_at             timestamptz,
  lost_reason         text,

  constraint deals_status_check
    check (status in ('open', 'proposal_sent', 'checkout_sent', 'won', 'lost', 'canceled'))
);

-- ---------------------------------------------------------------------------
-- Checkout sessions
-- ---------------------------------------------------------------------------

create table public.checkout_sessions (
  id                      uuid        primary key default gen_random_uuid(),
  deal_id                 uuid        not null    references public.deals (id) on delete restrict,
  lead_id                 uuid        not null    references public.leads (id) on delete restrict,
  created_at              timestamptz not null    default now(),

  token_hash              text        not null    unique,
  expires_at              timestamptz,
  clicked_at              timestamptz,

  atomicat_checkout_url   text        not null,
  atomicat_reference      text,
  attribution_snapshot    jsonb       not null    default '{}'
);

-- ---------------------------------------------------------------------------
-- Payments
-- ---------------------------------------------------------------------------

create table public.payments (
  id                    uuid        primary key default gen_random_uuid(),
  lead_id               uuid        not null    references public.leads (id) on delete restrict,
  deal_id               uuid        not null    references public.deals (id) on delete restrict,
  created_at            timestamptz not null    default now(),
  paid_at               timestamptz,

  provider              text        not null,
  provider_payment_id   text,
  payment_method        text        not null,
  status                text        not null    default 'pending',

  amount                numeric     not null    check (amount >= 0),
  currency              text        not null    default 'BRL',
  manual_reference      text,
  event_id              uuid        not null    default gen_random_uuid() unique,

  constraint payments_payment_method_check
    check (payment_method in ('atomicat_card', 'atomicat_pix', 'pix_manual', 'other')),

  constraint payments_status_check
    check (status in ('pending', 'paid', 'failed', 'refunded', 'canceled')),

  -- Deduplicate provider payments when provider_payment_id is present
  constraint payments_provider_payment_unique
    unique nulls not distinct (provider, provider_payment_id)
);

-- ---------------------------------------------------------------------------
-- Subscriptions
-- ---------------------------------------------------------------------------

create table public.subscriptions (
  id                        uuid        primary key default gen_random_uuid(),
  lead_id                   uuid        not null    references public.leads (id) on delete restrict,
  deal_id                   uuid        not null    references public.deals (id) on delete restrict,

  provider                  text        not null,
  provider_subscription_id  text,
  plan_code                 text        not null,
  monthly_value             numeric     not null    check (monthly_value >= 0),
  status                    text        not null    default 'active',

  started_at                timestamptz not null    default now(),
  next_billing_at           timestamptz,
  canceled_at               timestamptz,
  cancel_reason             text,

  constraint subscriptions_status_check
    check (status in ('active', 'past_due', 'canceled', 'paused'))
);

-- ---------------------------------------------------------------------------
-- Provider webhook events (idempotency foundation for Atomicat/future)
-- ---------------------------------------------------------------------------

create table public.provider_webhook_events (
  id                  uuid        primary key default gen_random_uuid(),
  provider            text        not null,
  provider_event_id   text        not null,
  event_type          text        not null,
  received_at         timestamptz not null    default now(),
  processed_at        timestamptz,
  status              text        not null    default 'pending',
  payload_hash        text        not null,
  error_message       text,

  -- Idempotency: one event per provider per provider_event_id
  constraint provider_webhook_events_unique
    unique (provider, provider_event_id),

  constraint provider_webhook_events_status_check
    check (status in ('pending', 'processed', 'failed', 'ignored'))
);

-- ---------------------------------------------------------------------------
-- Conversion queue (Google Ads offline)
-- ---------------------------------------------------------------------------

create table public.conversion_queue (
  id                  uuid        primary key default gen_random_uuid(),
  lead_id             uuid        not null    references public.leads (id) on delete restrict,
  deal_id             uuid        references public.deals (id) on delete set null,
  payment_id          uuid        references public.payments (id) on delete set null,

  conversion_type     text        not null,
  conversion_time     timestamptz not null    default now(),
  conversion_value    numeric     check (conversion_value >= 0),
  currency            text,

  gclid               text,
  gbraid              text,
  wbraid              text,
  email_normalized    text,
  phone_normalized    text,

  status              text        not null    default 'pending',
  attempt_count       int         not null    default 0 check (attempt_count >= 0),
  last_attempt_at     timestamptz,
  provider_response   text,
  event_id            uuid        not null    default gen_random_uuid(),

  constraint conversion_queue_type_check
    check (conversion_type in ('qualified_lead', 'proposal_sent', 'purchase')),

  constraint conversion_queue_status_check
    check (status in ('pending', 'sent', 'failed', 'dead_letter')),

  -- Deduplicate by event + type
  constraint conversion_queue_event_type_unique
    unique (event_id, conversion_type)
);

-- ---------------------------------------------------------------------------
-- Email subscriptions
-- ---------------------------------------------------------------------------

create table public.email_subscriptions (
  id              uuid        primary key default gen_random_uuid(),
  lead_id         uuid        not null    references public.leads (id) on delete restrict,
  email_normalized text       not null,
  status          text        not null    default 'subscribed',
  opt_in_at       timestamptz,
  opt_out_at      timestamptz,
  source          text        not null,
  consent_version text        not null,

  constraint email_subscriptions_status_check
    check (status in ('subscribed', 'unsubscribed', 'bounced', 'complained'))
);

-- ---------------------------------------------------------------------------
-- Email events
-- ---------------------------------------------------------------------------

create table public.email_events (
  id                  uuid        primary key default gen_random_uuid(),
  lead_id             uuid        not null    references public.leads (id) on delete restrict,
  email_normalized    text        not null,
  event_type          text        not null,
  occurred_at         timestamptz not null    default now(),
  provider            text,
  provider_message_id text,
  metadata            jsonb       not null    default '{}',

  constraint email_events_type_check
    check (event_type in ('sent', 'delivered', 'bounced', 'complained', 'unsubscribed'))
);

-- ---------------------------------------------------------------------------
-- Audit log
-- NOTE: Do not store unnecessary PII in audit_log.metadata.
-- ---------------------------------------------------------------------------

create table public.audit_log (
  id            uuid        primary key default gen_random_uuid(),
  event_id      uuid        not null    unique default gen_random_uuid(),
  created_at    timestamptz not null    default now(),

  actor_type    text        not null,
  actor_id      uuid,
  action        text        not null,
  entity_type   text        not null,
  entity_id     uuid,
  metadata      jsonb       not null    default '{}',

  constraint audit_log_actor_type_check
    check (actor_type in ('system', 'admin', 'webhook', 'api'))
);
