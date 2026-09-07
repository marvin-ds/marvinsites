import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  buildMetaLeadSubmittedEvent,
  hashMetaPhone,
  hashMetaValue,
  resolveMetaConfig,
  sanitizeMetaDiagnostic,
  sendMetaLeadSubmitted,
} from '../_shared/meta-capi.mjs';

function leadPayload(overrides = {}) {
  return {
    submission_id: 'meta_submission_001',
    lead: {
      name: 'Maria Silva',
      phone_normalized: '5513999990001',
      email_normalized: 'maria@example.com',
      city: 'Santos',
      state: 'SP',
      segment: 'Clínica / Consultório',
      status: 'new',
      tracking_version: 'g3-v1',
      landing_version: 'site-g4',
      offer_version: 'diagnostic-v1',
      environment: 'production',
    },
    attribution: {
      last_landing_page: '/?utm_source=meta&utm_medium=paid_social&fbclid=abc123',
      last_fbclid: 'abc123',
    },
    consent: {
      ad_storage: 'granted',
    },
    ...overrides,
  };
}

function requestEvent() {
  return {
    headers: {
      host: 'marvinsites.com.br',
      'user-agent': 'Mozilla/5.0 Test',
      'x-nf-client-connection-ip': '203.0.113.10',
      cookie: '_fbp=fb.1.111.222',
    },
  };
}

test('resolveMetaConfig uses public pixel id fallback without exposing token', () => {
  const config = resolveMetaConfig({ META_CAPI_ACCESS_TOKEN: 'token_test' });

  assert.equal(config.pixelId, '1247210063126992');
  assert.equal(config.graphVersion, 'v26.0');
  assert.equal(config.configured, true);
});

test('hash helpers normalize PII before hashing', () => {
  assert.equal(hashMetaValue(' Maria@Example.COM '), hashMetaValue('maria@example.com'));
  assert.equal(hashMetaPhone('(13) 99999-0001'), hashMetaPhone('5513999990001'));
  assert.match(hashMetaValue('maria@example.com'), /^[a-f0-9]{64}$/);
});

test('LeadSubmitted event uses submission_id as deduplication event_id and hashes PII', () => {
  const event = buildMetaLeadSubmittedEvent({
    event: requestEvent(),
    payload: leadPayload(),
    eventTime: 1788799016,
  });
  const serialized = JSON.stringify(event);

  assert.equal(event.event_name, 'LeadSubmitted');
  assert.equal(event.event_id, 'meta_submission_001');
  assert.equal(event.action_source, 'website');
  assert.equal(event.user_data.client_user_agent, 'Mozilla/5.0 Test');
  assert.equal(event.user_data.client_ip_address, '203.0.113.10');
  assert.equal(event.user_data.fbp, 'fb.1.111.222');
  assert.equal(event.user_data.fbc, 'fb.1.1788799016000.abc123');
  assert.equal(serialized.includes('maria@example.com'), false);
  assert.equal(serialized.includes('Maria Silva'), false);
  assert.equal(serialized.includes('5513999990001'), false);
});

test('sendMetaLeadSubmitted skips when ad consent is denied', async () => {
  let called = false;
  const result = await sendMetaLeadSubmitted({
    event: requestEvent(),
    payload: leadPayload({ consent: { ad_storage: 'denied' } }),
    envSource: { META_CAPI_ACCESS_TOKEN: 'token_test' },
    fetchImpl: async () => {
      called = true;
      return { ok: true, json: async () => ({}) };
    },
  });

  assert.equal(result.skipped, true);
  assert.equal(called, false);
});

test('sendMetaLeadSubmitted posts to Graph events endpoint when configured', async () => {
  let request;
  const result = await sendMetaLeadSubmitted({
    event: requestEvent(),
    payload: leadPayload(),
    envSource: {
      META_CAPI_ACCESS_TOKEN: 'token_test',
      META_CAPI_TEST_EVENT_CODE: 'TEST123',
    },
    fetchImpl: async (url, options) => {
      request = { url, options };
      return { ok: true, json: async () => ({ events_received: 1 }) };
    },
  });
  const body = JSON.parse(request.options.body);

  assert.equal(result.sent, true);
  assert.equal(request.url, 'https://graph.facebook.com/v26.0/1247210063126992/events?access_token=token_test');
  assert.equal(request.options.headers['Content-Type'], 'application/json');
  assert.equal(body.test_event_code, 'TEST123');
  assert.equal(body.data[0].event_name, 'LeadSubmitted');
  assert.equal(body.data[0].event_id, 'meta_submission_001');
});

test('sendMetaLeadSubmitted does not fail caller when Meta returns an error', async () => {
  const originalConsoleError = console.error;
  console.error = () => {};
  let result;
  try {
    result = await sendMetaLeadSubmitted({
      event: requestEvent(),
      payload: leadPayload(),
      envSource: { META_CAPI_ACCESS_TOKEN: 'token_test' },
      fetchImpl: async () => ({ ok: false, status: 401, json: async () => ({ error: { code: 190 } }) }),
    });
  } finally {
    console.error = originalConsoleError;
  }

  assert.deepEqual(result, { sent: false, skipped: false });
});

test('sanitized diagnostics exclude token and PII', () => {
  const diagnostic = sanitizeMetaDiagnostic({
    event: 'meta_capi_error',
    stage: 'api',
    category: 'META_HTTP_ERROR',
    status: 401,
    code: 190,
    submission_id: 'meta_submission_001',
    accessToken: 'token_test',
    email: 'maria@example.com',
    phone: '5513999990001',
  });
  const serialized = JSON.stringify(diagnostic);

  assert.equal(serialized.includes('token_test'), false);
  assert.equal(serialized.includes('maria@example.com'), false);
  assert.equal(serialized.includes('5513999990001'), false);
  assert.equal(diagnostic.category, 'META_HTTP_ERROR');
});
