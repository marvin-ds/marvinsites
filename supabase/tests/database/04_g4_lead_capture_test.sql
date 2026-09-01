-- =============================================================================
-- Gate 4 — Lead Capture RPC tests (pgTAP)
-- =============================================================================

begin;

select plan(26);

select has_column('public', 'leads', 'submission_id', 'leads.submission_id exists for safe retries');

select has_index(
  'public',
  'leads',
  'leads_submission_id_unique',
  'leads_submission_id_unique exists'
);

select has_function(
  'public',
  'capture_lead_v1',
  array['jsonb'],
  'capture_lead_v1(jsonb) exists'
);

select is(
  has_function_privilege('anon', 'public.capture_lead_v1(jsonb)', 'EXECUTE'),
  false,
  'anon cannot execute capture_lead_v1'
);

select is(
  has_function_privilege('authenticated', 'public.capture_lead_v1(jsonb)', 'EXECUTE'),
  false,
  'authenticated cannot execute capture_lead_v1'
);

select lives_ok(
  $$select public.capture_lead_v1('{
    "submission_id": "g4_test_submission_001",
    "business": {
      "name": "Clínica G4",
      "city": "Santos",
      "state": "SP",
      "phone_normalized": "5513999990001",
      "status": "active",
      "environment": "test"
    },
    "lead": {
      "name": "Ana Teste",
      "business_name": "Clínica G4",
      "phone_raw": "(13) 99999-0001",
      "phone_normalized": "5513999990001",
      "city": "Santos",
      "state": "SP",
      "segment": "Clínica / Consultório",
      "source_type": "form",
      "status": "new",
      "landing_version": "site-g4",
      "offer_version": "diagnostic-v1",
      "tracking_version": "g3-v1",
      "environment": "test"
    },
    "attribution": {
      "first_touch_at": "2026-09-01T10:00:00Z",
      "first_source": "google",
      "first_medium": "cpc",
      "first_campaign": "g4_test",
      "first_campaign_id": "123",
      "first_landing_page": "/?utm_source=google",
      "first_gclid": "TEST-GCLID",
      "last_touch_at": "2026-09-01T10:10:00Z",
      "last_source": "google",
      "last_medium": "cpc",
      "last_campaign": "g4_test",
      "last_campaign_id": "123",
      "last_landing_page": "/?utm_source=google",
      "last_gclid": "TEST-GCLID",
      "session_id": "session-g4-001"
    },
    "consent": {
      "session_id": "session-g4-001",
      "privacy_ack": true,
      "diagnostic_contact_allowed": true,
      "email_marketing_opt_in": false,
      "whatsapp_marketing_opt_in": false,
      "analytics_storage": "denied",
      "ad_storage": "denied",
      "ad_user_data": "denied",
      "ad_personalization": "denied",
      "consent_version": "g2-v1",
      "policy_version": "2026-09-01",
      "source": "diagnostic_form"
    },
    "meta": {
      "capture_version": "g4-v1"
    }
  }'::jsonb)$$,
  'valid capture succeeds'
);

select is((select count(*)::int from public.businesses where name = 'Clínica G4'), 1, 'business created');
select is((select count(*)::int from public.leads where submission_id = 'g4_test_submission_001'), 1, 'lead created');
select is(
  (select business_id is not null from public.leads where submission_id = 'g4_test_submission_001'),
  true,
  'lead linked to business'
);
select is(
  (select status from public.leads where submission_id = 'g4_test_submission_001'),
  'new',
  'lead starts as new'
);
select is(
  (select count(*)::int from public.lead_status_history where lead_id = (select id from public.leads where submission_id = 'g4_test_submission_001') and to_status = 'new'),
  1,
  'initial status history created by trigger'
);
select is(
  (select first_source from public.lead_attribution where lead_id = (select id from public.leads where submission_id = 'g4_test_submission_001')),
  'google',
  'attribution first source persisted'
);
select is(
  (select last_campaign_id from public.lead_attribution where lead_id = (select id from public.leads where submission_id = 'g4_test_submission_001')),
  '123',
  'attribution last campaign id persisted'
);
select is(
  (select session_id from public.lead_attribution where lead_id = (select id from public.leads where submission_id = 'g4_test_submission_001')),
  'session-g4-001',
  'attribution session id persisted'
);
select is(
  (select email_marketing_opt_in from public.lead_consents where lead_id = (select id from public.leads where submission_id = 'g4_test_submission_001')),
  false,
  'email marketing is not inferred'
);
select is(
  (select whatsapp_marketing_opt_in from public.lead_consents where lead_id = (select id from public.leads where submission_id = 'g4_test_submission_001')),
  false,
  'whatsapp marketing is not inferred'
);
select is(
  (select analytics_storage from public.lead_consents where lead_id = (select id from public.leads where submission_id = 'g4_test_submission_001')),
  'denied',
  'consent mode snapshot persisted'
);
select is(
  (select count(*)::int from public.audit_log where entity_id = (select id from public.leads where submission_id = 'g4_test_submission_001') and action = 'lead_capture_created'),
  1,
  'non-PII audit entry created'
);

select is(
  (public.capture_lead_v1('{
    "submission_id": "g4_test_submission_001"
  }'::jsonb)->>'duplicate')::boolean,
  true,
  'duplicate submission is idempotent'
);
select is((select count(*)::int from public.leads where submission_id = 'g4_test_submission_001'), 1, 'duplicate does not create second lead');
select is((select count(*)::int from public.businesses where name = 'Clínica G4'), 1, 'duplicate does not create second business');

select throws_ok(
  $$select public.capture_lead_v1('{
    "submission_id": "g4_bad_submission_001",
    "business": {
      "name": "Falha G4",
      "city": "Santos",
      "status": "invalid",
      "environment": "test"
    }
  }'::jsonb)$$,
  '23514',
  null,
  'invalid business status fails'
);

select is((select count(*)::int from public.leads where submission_id = 'g4_bad_submission_001'), 0, 'failed operation leaves no lead');
select is((select count(*)::int from public.businesses where name = 'Falha G4'), 0, 'failed operation leaves no business');

select is(
  has_table_privilege('anon', 'public.leads', 'INSERT'),
  false,
  'anon still cannot insert leads directly'
);
select is(
  has_table_privilege('authenticated', 'public.leads', 'INSERT'),
  false,
  'authenticated still cannot insert leads directly'
);

select * from finish();
rollback;
