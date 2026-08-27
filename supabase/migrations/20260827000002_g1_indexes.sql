-- =============================================================================
-- Gate 1 — Indexes
-- =============================================================================

-- businesses
create index idx_businesses_status        on public.businesses (status);
create index idx_businesses_city_state    on public.businesses (city, state);

-- business_sources
create index idx_business_sources_business_id   on public.business_sources (business_id);
create index idx_business_sources_source_type   on public.business_sources (source_type);

-- leads
create index idx_leads_business_id        on public.leads (business_id);
create index idx_leads_status             on public.leads (status);
create index idx_leads_last_activity_at   on public.leads (last_activity_at);
create index idx_leads_phone_normalized   on public.leads (phone_normalized);
create index idx_leads_email_normalized   on public.leads (email_normalized) where email_normalized is not null;
create index idx_leads_environment        on public.leads (environment);

-- lead_attribution
create index idx_lead_attribution_lead_id     on public.lead_attribution (lead_id);
create index idx_lead_attribution_session_id  on public.lead_attribution (session_id) where session_id is not null;

-- lead_consents
create index idx_lead_consents_lead_id      on public.lead_consents (lead_id) where lead_id is not null;
create index idx_lead_consents_session_id   on public.lead_consents (session_id) where session_id is not null;

-- lead_status_history
create index idx_lead_status_history_lead_id    on public.lead_status_history (lead_id);
create index idx_lead_status_history_changed_at on public.lead_status_history (changed_at);

-- human_diagnostics
create index idx_human_diagnostics_lead_id  on public.human_diagnostics (lead_id);
create index idx_human_diagnostics_status   on public.human_diagnostics (status);

-- deals
create index idx_deals_lead_id  on public.deals (lead_id);
create index idx_deals_status   on public.deals (status);

-- checkout_sessions
create index idx_checkout_sessions_deal_id  on public.checkout_sessions (deal_id);
create index idx_checkout_sessions_lead_id  on public.checkout_sessions (lead_id);

-- payments
create index idx_payments_lead_id   on public.payments (lead_id);
create index idx_payments_deal_id   on public.payments (deal_id);
create index idx_payments_status    on public.payments (status);

-- subscriptions
create index idx_subscriptions_lead_id  on public.subscriptions (lead_id);
create index idx_subscriptions_deal_id  on public.subscriptions (deal_id);
create index idx_subscriptions_status   on public.subscriptions (status);

-- provider_webhook_events
create index idx_provider_webhook_events_status       on public.provider_webhook_events (status);
create index idx_provider_webhook_events_received_at  on public.provider_webhook_events (received_at);

-- conversion_queue
create index idx_conversion_queue_lead_id         on public.conversion_queue (lead_id);
create index idx_conversion_queue_status          on public.conversion_queue (status);
create index idx_conversion_queue_conversion_time on public.conversion_queue (conversion_time);

-- email_subscriptions
create index idx_email_subscriptions_lead_id  on public.email_subscriptions (lead_id);
create index idx_email_subscriptions_status   on public.email_subscriptions (status);

-- email_events
create index idx_email_events_lead_id     on public.email_events (lead_id);
create index idx_email_events_occurred_at on public.email_events (occurred_at);

-- audit_log
create index idx_audit_log_entity         on public.audit_log (entity_type, entity_id);
create index idx_audit_log_created_at     on public.audit_log (created_at);
create index idx_audit_log_actor          on public.audit_log (actor_type, actor_id) where actor_id is not null;
