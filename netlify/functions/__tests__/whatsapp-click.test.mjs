import { afterEach, test } from 'node:test';
import assert from 'node:assert/strict';

import { handler } from '../whatsapp-click.mjs';

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };

function setEnv() {
  process.env.SUPABASE_URL = 'https://test.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'sb_secret_test_key';
}

afterEach(() => {
  globalThis.fetch = originalFetch;
  process.env = { ...originalEnv };
});

function mockFetch(status = 201, body = '') {
  globalThis.fetch = async () => ({
    ok: status >= 200 && status < 300,
    status,
    text: async () => body,
  });
}

function validEvent(overrides = {}) {
  return {
    httpMethod: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      ref: 'MS-AB2C',
      placement: 'hero',
      page: '/',
      session_id: 'test-session-001',
      ...overrides,
    }),
  };
}

// ─── Method guard ────────────────────────────────────────────────────────────

test('GET returns 405', async () => {
  const res = await handler({ httpMethod: 'GET', headers: {}, body: '' });
  assert.equal(res.statusCode, 405);
});

// ─── Content-type guard ──────────────────────────────────────────────────────

test('non-JSON content-type returns 415', async () => {
  const res = await handler({
    httpMethod: 'POST',
    headers: { 'content-type': 'text/plain' },
    body: '{}',
  });
  assert.equal(res.statusCode, 415);
});

// ─── Validation ──────────────────────────────────────────────────────────────

test('invalid ref format returns 400', async () => {
  const res = await handler(validEvent({ ref: 'bad-ref' }));
  assert.equal(res.statusCode, 400);
  assert.ok(JSON.parse(res.body).error.includes('REF'));
});

test('ref with lowercase returns 400', async () => {
  const res = await handler(validEvent({ ref: 'MS-ab2c' }));
  assert.equal(res.statusCode, 400);
});

test('invalid placement returns 400', async () => {
  const res = await handler(validEvent({ placement: 'arbitrary' }));
  assert.equal(res.statusCode, 400);
  assert.ok(JSON.parse(res.body).error.includes('PLACEMENT'));
});

test('missing session_id returns 400', async () => {
  const res = await handler(validEvent({ session_id: '' }));
  assert.equal(res.statusCode, 400);
  assert.ok(JSON.parse(res.body).error.includes('SESSION'));
});

test('missing env returns 500', async () => {
  const res = await handler(validEvent());
  assert.equal(res.statusCode, 500);
});

test('all valid placements are accepted', async () => {
  setEnv();
  mockFetch(201);
  const placements = ['header', 'floating', 'hero', 'plans', 'faq', 'diagnostic', 'footer'];
  for (const placement of placements) {
    const res = await handler(validEvent({ placement }));
    assert.equal(res.statusCode, 200, `placement ${placement} should be accepted`);
  }
});

// ─── Supabase interaction ─────────────────────────────────────────────────────

test('valid request with successful DB insert returns 200', async () => {
  setEnv();
  mockFetch(201);
  const res = await handler(validEvent());
  assert.equal(res.statusCode, 200);
  assert.ok(JSON.parse(res.body).ok);
});

test('duplicate ref (409) is treated as success', async () => {
  setEnv();
  mockFetch(409);
  const res = await handler(validEvent());
  assert.equal(res.statusCode, 200);
  assert.ok(JSON.parse(res.body).ok);
});

test('DB error returns 500 without leaking details', async () => {
  setEnv();
  mockFetch(500, 'internal error detail');
  const res = await handler(validEvent());
  assert.equal(res.statusCode, 500);
  const body = JSON.parse(res.body);
  assert.ok(!JSON.stringify(body).includes('internal error detail'));
});

test('no PII in 200 response', async () => {
  setEnv();
  mockFetch(201);
  const res = await handler(validEvent({ session_id: 'pii-session-xyz' }));
  assert.ok(!res.body.includes('pii-session-xyz'));
});

test('body size limit enforced', async () => {
  const res = await handler({
    httpMethod: 'POST',
    headers: { 'content-type': 'application/json' },
    body: 'x'.repeat(4097),
  });
  assert.equal(res.statusCode, 413);
});

test('invalid JSON returns 400', async () => {
  const res = await handler({
    httpMethod: 'POST',
    headers: { 'content-type': 'application/json' },
    body: 'not json',
  });
  assert.equal(res.statusCode, 400);
});

test('legacy JWT key is accepted', async () => {
  process.env.SUPABASE_URL = 'https://test.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY =
    'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIn0.signature_123';
  mockFetch(201);
  const res = await handler(validEvent());
  assert.equal(res.statusCode, 200);
});
