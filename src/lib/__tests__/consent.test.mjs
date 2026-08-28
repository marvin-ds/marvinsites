/**
 * Gate 2A — Consent logic unit tests
 * Run: node --test src/lib/__tests__/consent.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

// ---- Inline the pure logic (no DOM, no imports) ----
const CONSENT_STORAGE_KEY = 'marvin_consent_v2';
const CONSENT_LEGACY_KEY = 'marvin_cookie_consent';
const CONSENT_VERSION = 'g2-v1';

const DEFAULT_CONSENT = {
  version: CONSENT_VERSION,
  updatedAt: '',
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};

function getDefaultConsent() {
  return { ...DEFAULT_CONSENT };
}

function buildAcceptAll() {
  const state = {
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  };
  return applyDependencies(state);
}

function buildRejectAll() {
  return {
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  };
}

function applyDependencies(state) {
  const result = { ...state };
  if (result.ad_storage === 'denied' || result.ad_user_data === 'denied') {
    result.ad_personalization = 'denied';
  }
  return result;
}

function isGtmEligible(state) {
  return state.analytics_storage === 'granted' || state.ad_storage === 'granted';
}

function isValidGtmId(id) {
  return typeof id === 'string' && /^GTM-[A-Z0-9]+$/.test(id);
}

function readStoredConsent(storage) {
  try {
    const raw = storage[CONSENT_STORAGE_KEY];
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function hasLegacyConsentOnly(storage) {
  const hasLegacy = CONSENT_LEGACY_KEY in storage;
  const hasV2 = CONSENT_STORAGE_KEY in storage;
  return hasLegacy && !hasV2;
}

// ---- Tests ----

test('getDefaultConsent returns all denied', () => {
  const c = getDefaultConsent();
  assert.equal(c.analytics_storage, 'denied');
  assert.equal(c.ad_storage, 'denied');
  assert.equal(c.ad_user_data, 'denied');
  assert.equal(c.ad_personalization, 'denied');
});

test('buildAcceptAll returns all granted', () => {
  const c = buildAcceptAll();
  assert.equal(c.analytics_storage, 'granted');
  assert.equal(c.ad_storage, 'granted');
  assert.equal(c.ad_user_data, 'granted');
  assert.equal(c.ad_personalization, 'granted');
});

test('buildRejectAll returns all denied', () => {
  const c = buildRejectAll();
  assert.equal(c.analytics_storage, 'denied');
  assert.equal(c.ad_storage, 'denied');
  assert.equal(c.ad_user_data, 'denied');
  assert.equal(c.ad_personalization, 'denied');
});

test('applyDependencies forces ad_personalization denied when ad_storage denied', () => {
  const c = applyDependencies({
    version: CONSENT_VERSION, updatedAt: '',
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  });
  assert.equal(c.ad_personalization, 'denied');
});

test('applyDependencies forces ad_personalization denied when ad_user_data denied', () => {
  const c = applyDependencies({
    version: CONSENT_VERSION, updatedAt: '',
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'denied',
    ad_personalization: 'granted',
  });
  assert.equal(c.ad_personalization, 'denied');
});

test('applyDependencies allows ad_personalization when both ad_storage and ad_user_data granted', () => {
  const c = applyDependencies({
    version: CONSENT_VERSION, updatedAt: '',
    analytics_storage: 'denied',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  });
  assert.equal(c.ad_personalization, 'granted');
});

test('isGtmEligible false when all denied', () => {
  assert.equal(isGtmEligible(buildRejectAll()), false);
});

test('isGtmEligible true when analytics_storage granted', () => {
  assert.equal(isGtmEligible({ ...buildRejectAll(), analytics_storage: 'granted' }), true);
});

test('isGtmEligible true when ad_storage granted', () => {
  assert.equal(isGtmEligible({ ...buildRejectAll(), ad_storage: 'granted' }), true);
});

test('isValidGtmId true for GTM-ABC123', () => {
  assert.equal(isValidGtmId('GTM-ABC123'), true);
});

test('isValidGtmId false for empty string', () => {
  assert.equal(isValidGtmId(''), false);
});

test('isValidGtmId false for lowercase GTM-xxxxxxx', () => {
  assert.equal(isValidGtmId('GTM-xxxxxxx'), false);
});

test('isValidGtmId false for undefined', () => {
  assert.equal(isValidGtmId(undefined), false);
});

test('readStoredConsent returns null when version differs', () => {
  const storage = {
    [CONSENT_STORAGE_KEY]: JSON.stringify({ version: 'old-v0', analytics_storage: 'granted' }),
  };
  assert.equal(readStoredConsent(storage), null);
});

test('hasLegacyConsentOnly true when legacy exists but v2 does not', () => {
  const storage = { [CONSENT_LEGACY_KEY]: '1' };
  assert.equal(hasLegacyConsentOnly(storage), true);
});

test('hasLegacyConsentOnly false when both keys exist', () => {
  const storage = {
    [CONSENT_LEGACY_KEY]: '1',
    [CONSENT_STORAGE_KEY]: JSON.stringify(getDefaultConsent()),
  };
  assert.equal(hasLegacyConsentOnly(storage), false);
});

test('hasLegacyConsentOnly false when no keys exist', () => {
  assert.equal(hasLegacyConsentOnly({}), false);
});
