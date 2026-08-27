-- =============================================================================
-- Gate 1 — RLS and privilege hardening
--
-- Principle: anon and authenticated roles have ZERO direct access to
-- commercial tables. Access will be granted explicitly in future Gates
-- when server-side endpoints are implemented (Gate 4+).
--
-- This migration is the authoritative RLS definition — it does NOT rely on
-- Supabase's "automatic RLS" project setting, ensuring reproducibility.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Enable RLS on all commercial tables
-- ---------------------------------------------------------------------------

alter table public.businesses              enable row level security;
alter table public.business_sources        enable row level security;
alter table public.leads                   enable row level security;
alter table public.lead_attribution        enable row level security;
alter table public.lead_consents           enable row level security;
alter table public.lead_status_history     enable row level security;
alter table public.human_diagnostics       enable row level security;
alter table public.deals                   enable row level security;
alter table public.checkout_sessions       enable row level security;
alter table public.payments                enable row level security;
alter table public.subscriptions           enable row level security;
alter table public.provider_webhook_events enable row level security;
alter table public.conversion_queue        enable row level security;
alter table public.email_subscriptions     enable row level security;
alter table public.email_events            enable row level security;
alter table public.audit_log               enable row level security;

-- ---------------------------------------------------------------------------
-- Revoke direct table privileges from anon and authenticated
--
-- Note: "Automatically expose new tables" is OFF on this project, so
-- PostgREST should not auto-grant these. We enforce it explicitly for
-- reproducibility in case the project setting changes.
-- ---------------------------------------------------------------------------

revoke all on public.businesses              from anon, authenticated;
revoke all on public.business_sources        from anon, authenticated;
revoke all on public.leads                   from anon, authenticated;
revoke all on public.lead_attribution        from anon, authenticated;
revoke all on public.lead_consents           from anon, authenticated;
revoke all on public.lead_status_history     from anon, authenticated;
revoke all on public.human_diagnostics       from anon, authenticated;
revoke all on public.deals                   from anon, authenticated;
revoke all on public.checkout_sessions       from anon, authenticated;
revoke all on public.payments                from anon, authenticated;
revoke all on public.subscriptions           from anon, authenticated;
revoke all on public.provider_webhook_events from anon, authenticated;
revoke all on public.conversion_queue        from anon, authenticated;
revoke all on public.email_subscriptions     from anon, authenticated;
revoke all on public.email_events            from anon, authenticated;
revoke all on public.audit_log               from anon, authenticated;

-- ---------------------------------------------------------------------------
-- No RLS policies are created here intentionally.
--
-- With RLS enabled and no permissive policy, access is denied by default
-- (Postgres deny-by-default when RLS is ON and no policy matches).
--
-- Future Gates will add explicit server-side policies when endpoints
-- are implemented. Service role bypasses RLS as expected for server ops.
-- ---------------------------------------------------------------------------
