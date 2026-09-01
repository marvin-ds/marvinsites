import { afterEach, test } from 'node:test';
import assert from 'node:assert/strict';

import { handler } from '../lead-capture.mjs';

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };

function validEvent(overrides = {}) {
  return {
    httpMethod: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      submission_id: 'g4_submission_endpoint_001',
      negocio: 'Clínica Boa Vista',
      nome: 'Maria Silva',
      whatsapp: '(13) 99999-0001',
      cidade: 'Santos, SP',
      segmento: 'Clínica / Consultório',
      consentimento: 'true',
      attribution: {
        attribution_version: 'g3-v1',
        session_id: 'session-g4',
        first_touch_at: '2026-09-01T10:00:00Z',
        first_source: 'google',
        first_medium: 'cpc',
        first_campaign: 'g4',
        first_landing_page: '/?utm_source=google',
        last_touch_at: '2026-09-01T10:10:00Z',
        last_source: 'google',
        last_medium: 'cpc',
        last_campaign: 'g4',
        last_landing_page: '/?utm_source=google',
      },
      consent_mode: {
        version: 'g2-v1',
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
      ...overrides,
    }),
  };
}

afterEach(() => {
  globalThis.fetch = originalFetch;
  process.env = { ...originalEnv };
});

test('GET is rejected', async () => {
  const response = await handler({ httpMethod: 'GET', headers: {}, body: null });
  assert.equal(response.statusCode, 405);
});

test('valid POST calls Supabase RPC and returns minimal 201', async () => {
  process.env.SUPABASE_URL = 'https://example.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'secret-service-role';

  let request;
  globalThis.fetch = async (url, options) => {
    request = { url, options };
    return { ok: true, json: async () => ({ ok: true }) };
  };

  const response = await handler(validEvent());
  const body = JSON.parse(response.body);

  assert.equal(response.statusCode, 201);
  assert.deepEqual(body, { ok: true });
  assert.equal(request.url, 'https://example.supabase.co/rest/v1/rpc/capture_lead_v1');
  assert.equal(request.options.headers.Authorization, 'Bearer secret-service-role');
  assert.equal(JSON.parse(request.options.body).payload.lead.email_raw, undefined);
});

test('malformed JSON returns safe 400', async () => {
  const response = await handler({
    httpMethod: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{bad',
  });
  assert.equal(response.statusCode, 400);
  assert.deepEqual(JSON.parse(response.body), { ok: false, error: 'invalid_request' });
});

test('oversized request returns 413', async () => {
  const response = await handler({
    httpMethod: 'POST',
    headers: { 'content-type': 'application/json' },
    body: 'x'.repeat(25 * 1024),
  });
  assert.equal(response.statusCode, 413);
});

test('database failure returns generic 500 with no secret or PII', async () => {
  process.env.SUPABASE_URL = 'https://example.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'secret-service-role';
  globalThis.fetch = async () => ({ ok: false, status: 500, json: async () => ({}) });

  const response = await handler(validEvent({ nome: 'Pessoa Secreta' }));
  assert.equal(response.statusCode, 500);
  assert.equal(response.body.includes('secret-service-role'), false);
  assert.equal(response.body.includes('Pessoa Secreta'), false);
  assert.deepEqual(JSON.parse(response.body), { ok: false, error: 'capture_failed' });
});

test('missing Supabase env returns generic 500', async () => {
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  const response = await handler(validEvent());
  assert.equal(response.statusCode, 500);
  assert.deepEqual(JSON.parse(response.body), { ok: false, error: 'capture_failed' });
});

test('honeypot returns success without calling Supabase', async () => {
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return { ok: true, json: async () => ({}) };
  };
  const response = await handler(validEvent({ 'bot-field': 'filled' }));
  assert.equal(response.statusCode, 201);
  assert.equal(called, false);
});
