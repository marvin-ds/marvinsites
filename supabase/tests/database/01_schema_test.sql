-- =============================================================================
-- Gate 1 — Schema tests (pgTAP)
-- =============================================================================

begin;

select plan(80);

-- ---------------------------------------------------------------------------
-- Tables exist
-- ---------------------------------------------------------------------------

select has_table('public', 'businesses',              'businesses table exists');
select has_table('public', 'business_sources',        'business_sources table exists');
select has_table('public', 'leads',                   'leads table exists');
select has_table('public', 'lead_attribution',        'lead_attribution table exists');
select has_table('public', 'lead_consents',           'lead_consents table exists');
select has_table('public', 'lead_status_history',     'lead_status_history table exists');
select has_table('public', 'human_diagnostics',       'human_diagnostics table exists');
select has_table('public', 'deals',                   'deals table exists');
select has_table('public', 'checkout_sessions',       'checkout_sessions table exists');
select has_table('public', 'payments',                'payments table exists');
select has_table('public', 'subscriptions',           'subscriptions table exists');
select has_table('public', 'provider_webhook_events', 'provider_webhook_events table exists');
select has_table('public', 'conversion_queue',        'conversion_queue table exists');
select has_table('public', 'email_subscriptions',     'email_subscriptions table exists');
select has_table('public', 'email_events',            'email_events table exists');
select has_table('public', 'audit_log',               'audit_log table exists');

-- ---------------------------------------------------------------------------
-- Primary keys
-- ---------------------------------------------------------------------------

select col_is_pk('public', 'businesses',              'id', 'businesses PK');
select col_is_pk('public', 'leads',                   'id', 'leads PK');
select col_is_pk('public', 'lead_attribution',        'id', 'lead_attribution PK');
select col_is_pk('public', 'lead_consents',           'id', 'lead_consents PK');
select col_is_pk('public', 'lead_status_history',     'id', 'lead_status_history PK');
select col_is_pk('public', 'human_diagnostics',       'id', 'human_diagnostics PK');
select col_is_pk('public', 'deals',                   'id', 'deals PK');
select col_is_pk('public', 'payments',                'id', 'payments PK');
select col_is_pk('public', 'audit_log',               'id', 'audit_log PK');

-- ---------------------------------------------------------------------------
-- Foreign keys
-- ---------------------------------------------------------------------------

select fk_ok(
  'public', 'business_sources', 'business_id',
  'public', 'businesses',       'id',
  'business_sources.business_id → businesses.id'
);

select fk_ok(
  'public', 'leads', 'business_id',
  'public', 'businesses', 'id',
  'leads.business_id → businesses.id'
);

select fk_ok(
  'public', 'lead_attribution', 'lead_id',
  'public', 'leads',            'id',
  'lead_attribution.lead_id → leads.id'
);

select fk_ok(
  'public', 'lead_status_history', 'lead_id',
  'public', 'leads',               'id',
  'lead_status_history.lead_id → leads.id'
);

select fk_ok(
  'public', 'human_diagnostics', 'lead_id',
  'public', 'leads',             'id',
  'human_diagnostics.lead_id → leads.id'
);

select fk_ok(
  'public', 'deals', 'lead_id',
  'public', 'leads', 'id',
  'deals.lead_id → leads.id'
);

select fk_ok(
  'public', 'payments', 'deal_id',
  'public', 'deals',    'id',
  'payments.deal_id → deals.id'
);

-- ---------------------------------------------------------------------------
-- RLS enabled
-- ---------------------------------------------------------------------------

select policies_are('public', 'businesses',              array[]::text[], 'businesses: no open policies');
select policies_are('public', 'leads',                   array[]::text[], 'leads: no open policies');
select policies_are('public', 'lead_attribution',        array[]::text[], 'lead_attribution: no open policies');
select policies_are('public', 'lead_consents',           array[]::text[], 'lead_consents: no open policies');
select policies_are('public', 'human_diagnostics',       array[]::text[], 'human_diagnostics: no open policies');
select policies_are('public', 'deals',                   array[]::text[], 'deals: no open policies');
select policies_are('public', 'payments',                array[]::text[], 'payments: no open policies');
select policies_are('public', 'audit_log',               array[]::text[], 'audit_log: no open policies');

-- ---------------------------------------------------------------------------
-- Columns exist (spot checks)
-- ---------------------------------------------------------------------------

select has_column('public', 'leads',           'business_id',      'leads.business_id exists');
select has_column('public', 'leads',           'last_activity_at', 'leads.last_activity_at exists (retention)');
select has_column('public', 'lead_consents',   'lead_id',          'lead_consents.lead_id exists');
select has_column('public', 'lead_consents',   'session_id',       'lead_consents.session_id exists');
select has_column('public', 'lead_attribution','first_touch_at',   'lead_attribution.first_touch_at exists');
select has_column('public', 'lead_attribution','last_touch_at',    'lead_attribution.last_touch_at exists');
select has_column('public', 'lead_attribution','session_id',       'lead_attribution.session_id exists');
select has_column('public', 'lead_status_history','event_id',      'lead_status_history.event_id exists');
select has_column('public', 'audit_log',       'event_id',         'audit_log.event_id exists');
select has_column('public', 'audit_log',       'metadata',         'audit_log.metadata exists');
select has_column('public', 'conversion_queue','event_id',         'conversion_queue.event_id exists');
select has_column('public', 'checkout_sessions','token_hash',      'checkout_sessions.token_hash exists');
select has_column('public', 'payments',        'event_id',         'payments.event_id exists');
select has_column('public', 'email_subscriptions','opt_out_at',    'email_subscriptions.opt_out_at exists (retention)');

-- ---------------------------------------------------------------------------
-- Triggers exist
-- ---------------------------------------------------------------------------

select trigger_is('public', 'businesses',      'trg_businesses_updated_at',          'businesses updated_at trigger');
select trigger_is('public', 'leads',           'trg_leads_updated_at',               'leads updated_at trigger');
select trigger_is('public', 'lead_attribution','trg_lead_attribution_protect_first_touch', 'first-touch protection trigger');
select trigger_is('public', 'leads',           'trg_leads_status_history',           'leads status history trigger');

select * from finish();
rollback;
