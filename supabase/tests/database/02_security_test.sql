-- =============================================================================
-- Gate 1 — Security tests (pgTAP)
-- Tests that anon and authenticated have no direct access.
-- =============================================================================

begin;

select plan(36);

-- ---------------------------------------------------------------------------
-- RLS is enabled on all tables
-- ---------------------------------------------------------------------------

select is(
  (select c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relname = 'businesses'),
  true, 'RLS ON: businesses'
);
select is(
  (select c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relname = 'leads'),
  true, 'RLS ON: leads'
);
select is(
  (select c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relname = 'lead_attribution'),
  true, 'RLS ON: lead_attribution'
);
select is(
  (select c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relname = 'lead_consents'),
  true, 'RLS ON: lead_consents'
);
select is(
  (select c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relname = 'human_diagnostics'),
  true, 'RLS ON: human_diagnostics'
);
select is(
  (select c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relname = 'deals'),
  true, 'RLS ON: deals'
);
select is(
  (select c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relname = 'payments'),
  true, 'RLS ON: payments'
);
select is(
  (select c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relname = 'audit_log'),
  true, 'RLS ON: audit_log'
);
select is(
  (select c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relname = 'conversion_queue'),
  true, 'RLS ON: conversion_queue'
);
select is(
  (select c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relname = 'provider_webhook_events'),
  true, 'RLS ON: provider_webhook_events'
);

-- ---------------------------------------------------------------------------
-- anon has no SELECT/INSERT on commercial tables
-- ---------------------------------------------------------------------------

select is(
  has_table_privilege('anon', 'public.businesses', 'SELECT'),
  false, 'anon: no SELECT on businesses'
);
select is(
  has_table_privilege('anon', 'public.businesses', 'INSERT'),
  false, 'anon: no INSERT on businesses'
);
select is(
  has_table_privilege('anon', 'public.leads', 'SELECT'),
  false, 'anon: no SELECT on leads'
);
select is(
  has_table_privilege('anon', 'public.leads', 'INSERT'),
  false, 'anon: no INSERT on leads'
);
select is(
  has_table_privilege('anon', 'public.lead_attribution', 'SELECT'),
  false, 'anon: no SELECT on lead_attribution'
);
select is(
  has_table_privilege('anon', 'public.lead_consents', 'SELECT'),
  false, 'anon: no SELECT on lead_consents'
);
select is(
  has_table_privilege('anon', 'public.lead_consents', 'INSERT'),
  false, 'anon: no INSERT on lead_consents'
);
select is(
  has_table_privilege('anon', 'public.human_diagnostics', 'SELECT'),
  false, 'anon: no SELECT on human_diagnostics'
);
select is(
  has_table_privilege('anon', 'public.deals', 'SELECT'),
  false, 'anon: no SELECT on deals'
);
select is(
  has_table_privilege('anon', 'public.payments', 'SELECT'),
  false, 'anon: no SELECT on payments'
);
select is(
  has_table_privilege('anon', 'public.audit_log', 'SELECT'),
  false, 'anon: no SELECT on audit_log'
);
select is(
  has_table_privilege('anon', 'public.conversion_queue', 'SELECT'),
  false, 'anon: no SELECT on conversion_queue'
);

-- ---------------------------------------------------------------------------
-- authenticated has no SELECT/INSERT on commercial tables
-- ---------------------------------------------------------------------------

select is(
  has_table_privilege('authenticated', 'public.businesses', 'SELECT'),
  false, 'authenticated: no SELECT on businesses'
);
select is(
  has_table_privilege('authenticated', 'public.businesses', 'INSERT'),
  false, 'authenticated: no INSERT on businesses'
);
select is(
  has_table_privilege('authenticated', 'public.leads', 'SELECT'),
  false, 'authenticated: no SELECT on leads'
);
select is(
  has_table_privilege('authenticated', 'public.leads', 'INSERT'),
  false, 'authenticated: no INSERT on leads'
);
select is(
  has_table_privilege('authenticated', 'public.human_diagnostics', 'SELECT'),
  false, 'authenticated: no SELECT on human_diagnostics'
);
select is(
  has_table_privilege('authenticated', 'public.deals', 'SELECT'),
  false, 'authenticated: no SELECT on deals'
);
select is(
  has_table_privilege('authenticated', 'public.payments', 'SELECT'),
  false, 'authenticated: no SELECT on payments'
);
select is(
  has_table_privilege('authenticated', 'public.audit_log', 'SELECT'),
  false, 'authenticated: no SELECT on audit_log'
);
select is(
  has_table_privilege('authenticated', 'public.conversion_queue', 'SELECT'),
  false, 'authenticated: no SELECT on conversion_queue'
);

-- ---------------------------------------------------------------------------
-- No scan tables exist (Gate 1 scope enforcement)
-- ---------------------------------------------------------------------------

select hasnt_table('public', 'scan_runs',          'scan_runs NOT in schema (MS-G2)');
select hasnt_table('public', 'scan_checks',        'scan_checks NOT in schema (MS-G2)');
select hasnt_table('public', 'score_snapshots',    'score_snapshots NOT in schema (MS-G2)');
select hasnt_table('public', 'issues',             'issues NOT in schema (MS-G2)');
select hasnt_table('public', 'recommendations',    'recommendations NOT in schema (MS-G2)');

select * from finish();
rollback;
