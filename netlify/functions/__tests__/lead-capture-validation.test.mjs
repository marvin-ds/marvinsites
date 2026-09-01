import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  MAX_BODY_BYTES,
  parseJsonBody,
  validateLeadCapture,
  ValidationError,
} from '../_shared/lead-capture.mjs';

function validInput(overrides = {}) {
  return {
    submission_id: 'g4_submission_abc123',
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
      last_gclid: 'TEST-GCLID',
    },
    consent_mode: {
      version: 'g2-v1',
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    },
    ...overrides,
  };
}

test('valid payload maps to Supabase RPC payload', () => {
  const payload = validateLeadCapture(validInput());
  assert.equal(payload.lead.name, 'Maria Silva');
  assert.equal(payload.business.name, 'Clínica Boa Vista');
  assert.equal(payload.lead.phone_normalized, '5513999990001');
  assert.equal(payload.lead.status, 'new');
  assert.equal(payload.attribution.last_gclid, 'TEST-GCLID');
  assert.equal(payload.consent.privacy_ack, true);
  assert.equal(payload.consent.email_marketing_opt_in, false);
  assert.equal(payload.consent.whatsapp_marketing_opt_in, false);
});

test('missing required field fails validation', () => {
  assert.throws(() => validateLeadCapture(validInput({ negocio: '' })), ValidationError);
});

test('oversized strings are trimmed to approved limits', () => {
  const payload = validateLeadCapture(validInput({
    nome: ` ${'A'.repeat(300)} `,
    attribution: {
      ...validInput().attribution,
      first_landing_page: `/${'x'.repeat(900)}`,
      last_landing_page: `/${'x'.repeat(900)}`,
    },
  }));
  assert.equal(payload.lead.name.length, 160);
  assert.equal(payload.attribution.first_landing_page.length, 512);
});

test('malformed phone fails validation', () => {
  assert.throws(() => validateLeadCapture(validInput({ whatsapp: '123' })), ValidationError);
});

test('unknown segment fails validation', () => {
  assert.throws(() => validateLeadCapture(validInput({ segmento: 'Segmento inventado' })), ValidationError);
});

test('bad attribution version fails validation', () => {
  assert.throws(() => validateLeadCapture(validInput({
    attribution: { ...validInput().attribution, attribution_version: 'g2-v0' },
  })), ValidationError);
});

test('invalid consent shape defaults Consent Mode values to denied', () => {
  const payload = validateLeadCapture(validInput({
    consent_mode: { version: 'g2-v1', analytics_storage: 'maybe' },
  }));
  assert.equal(payload.consent.analytics_storage, 'denied');
  assert.equal(payload.consent.ad_storage, 'denied');
});

test('marketing consent is never inferred from ad consent', () => {
  const payload = validateLeadCapture(validInput({
    consent_mode: {
      version: 'g2-v1',
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    },
  }));
  assert.equal(payload.consent.email_marketing_opt_in, false);
  assert.equal(payload.consent.whatsapp_marketing_opt_in, false);
});

test('honeypot returns bot marker without database payload', () => {
  const payload = validateLeadCapture(validInput({ 'bot-field': 'filled' }));
  assert.deepEqual(payload, { bot: true });
});

test('parseJsonBody rejects malformed JSON', () => {
  assert.throws(() => parseJsonBody({
    headers: { 'content-type': 'application/json' },
    body: '{bad',
  }), ValidationError);
});

test('parseJsonBody rejects oversized request body', () => {
  assert.throws(() => parseJsonBody({
    headers: { 'content-type': 'application/json' },
    body: 'x'.repeat(MAX_BODY_BYTES + 1),
  }), ValidationError);
});

test('unknown input fields do not enter the RPC payload', () => {
  const payload = validateLeadCapture(validInput({ admin: 'true', role: 'owner' }));
  assert.equal(payload.admin, undefined);
  assert.equal(payload.lead.admin, undefined);
  assert.equal(payload.business.role, undefined);
});
