/**
 * Gate 3 — Attribution logic unit tests
 * Run: node --test src/lib/__tests__/attribution.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

const ATTRIBUTION_VERSION = 'g3-v1';
const ATTRIBUTION_STORAGE_KEY = 'marvin_attribution_v1';
const SESSION_STORAGE_KEY = 'marvin_session_v1';
const VALUE_LIMIT = 160;
const URL_LIMIT = 512;
const ATTRIBUTION_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_id',
  'utm_content',
  'utm_term',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
];
const SEARCH_HOSTS = ['google.', 'bing.com', 'yahoo.', 'duckduckgo.com', 'ecosia.org'];

function memoryStorage(initial = {}) {
  return {
    data: { ...initial },
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(this.data, key) ? this.data[key] : null;
    },
    setItem(key, value) {
      this.data[key] = value;
    },
    removeItem(key) {
      delete this.data[key];
    },
  };
}

function brokenStorage() {
  return {
    getItem() { throw new Error('blocked'); },
    setItem() { throw new Error('blocked'); },
    removeItem() { throw new Error('blocked'); },
  };
}

function sanitizeValue(value, limit = VALUE_LIMIT) {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim().replace(/[\u0000-\u001F\u007F]/g, '').replace(/[<>]/g, '').slice(0, limit);
  return normalized || undefined;
}

function parseAttributionParams(search) {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const result = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const value = sanitizeValue(params.get(key));
    if (value) result[key] = value;
  }
  return result;
}

function buildLandingPage(href) {
  const url = new URL(href);
  const clean = new URLSearchParams();
  for (const key of ATTRIBUTION_PARAMS) {
    const value = sanitizeValue(url.searchParams.get(key));
    if (value) clean.set(key, value);
  }
  const query = clean.toString();
  return sanitizeValue(`${url.pathname}${query ? `?${query}` : ''}`, URL_LIMIT) || '/';
}

function normalizeReferrer(referrer, currentHref) {
  const value = sanitizeValue(referrer, URL_LIMIT);
  if (!value) return undefined;
  const ref = new URL(value);
  const current = new URL(currentHref);
  if (ref.hostname === current.hostname) return undefined;
  return sanitizeValue(`${ref.protocol}//${ref.hostname}${ref.pathname}`, URL_LIMIT);
}

function inferTouch(params, landingPage, referrer, now) {
  const hasUtm = Boolean(params.utm_source || params.utm_medium || params.utm_campaign || params.utm_id || params.utm_content || params.utm_term);
  const hasGoogleClick = Boolean(params.gclid || params.gbraid || params.wbraid);
  const hasFacebookClick = Boolean(params.fbclid);
  let source = params.utm_source;
  let medium = params.utm_medium;
  let signal = null;
  if (hasUtm) {
    signal = 'explicit';
  } else if (hasGoogleClick) {
    source = 'google';
    medium = 'cpc';
    signal = 'click_id';
  } else if (hasFacebookClick) {
    source = 'facebook';
    medium = 'paid_social';
    signal = 'click_id';
  } else if (referrer) {
    const host = new URL(referrer).hostname;
    const isOrganic = SEARCH_HOSTS.some((searchHost) => host.includes(searchHost));
    source = isOrganic && host.includes('google.') ? 'google' : host;
    medium = isOrganic ? 'organic' : 'referral';
    signal = isOrganic ? 'organic' : 'referral';
  } else {
    source = 'direct';
    medium = 'none';
    signal = 'direct';
  }
  return {
    touchedAt: now.toISOString(),
    source: source || 'unknown',
    medium: medium || 'unknown',
    campaign: params.utm_campaign,
    campaignId: params.utm_id,
    content: params.utm_content,
    term: params.utm_term,
    landingPage,
    referrer,
    signal,
    ...params,
  };
}

function expiresAtFrom(now) {
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + 90);
  return expiresAt.toISOString();
}

function readStoredAttribution(storage, now = new Date()) {
  if (!storage) return null;
  try {
    const raw = storage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== ATTRIBUTION_VERSION) return null;
    if (!parsed.firstTouch || !parsed.lastTouch || !parsed.expiresAt) return null;
    if (Date.parse(parsed.expiresAt) <= now.getTime()) return null;
    return parsed;
  } catch {
    try { storage.removeItem(ATTRIBUTION_STORAGE_KEY); } catch {}
    return null;
  }
}

function updateAttribution(context) {
  const now = context.now ?? new Date();
  const params = parseAttributionParams(new URL(context.href).search);
  const landingPage = buildLandingPage(context.href);
  const referrer = context.referrer ? normalizeReferrer(context.referrer, context.href) : undefined;
  const currentTouch = inferTouch(params, landingPage, referrer, now);
  const stored = readStoredAttribution(context.localStorage, now);
  const state = stored
    ? {
        ...stored,
        updatedAt: now.toISOString(),
        expiresAt: expiresAtFrom(now),
        lastTouch: currentTouch.signal !== 'direct' ? currentTouch : stored.lastTouch,
      }
    : {
        version: ATTRIBUTION_VERSION,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        expiresAt: expiresAtFrom(now),
        firstTouch: currentTouch,
        lastTouch: currentTouch,
      };
  try { context.localStorage?.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(state)); } catch {}
  return state;
}

function getOrCreateSessionId(storage, fallbackId = 'session-a') {
  if (!storage) return fallbackId;
  try {
    const stored = sanitizeValue(storage.getItem(SESSION_STORAGE_KEY), 80);
    if (stored) return stored;
    storage.setItem(SESSION_STORAGE_KEY, fallbackId);
    return fallbackId;
  } catch {
    return fallbackId;
  }
}

function buildAttributionSnapshot(state, sessionId) {
  return {
    attribution_version: state.version,
    session_id: sessionId,
    first_touch_at: state.firstTouch.touchedAt,
    first_source: state.firstTouch.source,
    first_medium: state.firstTouch.medium,
    first_campaign: state.firstTouch.campaign,
    first_campaign_id: state.firstTouch.campaignId,
    first_content: state.firstTouch.content,
    first_term: state.firstTouch.term,
    first_referrer: state.firstTouch.referrer,
    first_landing_page: state.firstTouch.landingPage,
    first_gclid: state.firstTouch.gclid,
    first_gbraid: state.firstTouch.gbraid,
    first_wbraid: state.firstTouch.wbraid,
    first_fbclid: state.firstTouch.fbclid,
    last_touch_at: state.lastTouch.touchedAt,
    last_source: state.lastTouch.source,
    last_medium: state.lastTouch.medium,
    last_campaign: state.lastTouch.campaign,
    last_campaign_id: state.lastTouch.campaignId,
    last_content: state.lastTouch.content,
    last_term: state.lastTouch.term,
    last_referrer: state.lastTouch.referrer,
    last_landing_page: state.lastTouch.landingPage,
    last_gclid: state.lastTouch.gclid,
    last_gbraid: state.lastTouch.gbraid,
    last_wbraid: state.lastTouch.wbraid,
    last_fbclid: state.lastTouch.fbclid,
  };
}

function attributionFormFields(snapshot) {
  const fields = {
    attribution_version: snapshot.attribution_version,
    session_id: snapshot.session_id,
    utm_source: snapshot.last_source,
    utm_medium: snapshot.last_medium,
    utm_campaign: snapshot.last_campaign,
    utm_id: snapshot.last_campaign_id,
    utm_content: snapshot.last_content,
    utm_term: snapshot.last_term,
    gclid: snapshot.last_gclid,
    gbraid: snapshot.last_gbraid,
    wbraid: snapshot.last_wbraid,
    fbclid: snapshot.last_fbclid,
    landing_page: snapshot.last_landing_page,
    referrer: snapshot.last_referrer,
  };
  return Object.fromEntries(Object.entries(fields).filter(([, value]) => typeof value === 'string' && value.length > 0));
}

test('parse UTMs', () => {
  const parsed = parseAttributionParams('?utm_source=google&utm_medium=cpc&utm_campaign=test&utm_id=123&utm_content=a&utm_term=site');
  assert.equal(parsed.utm_source, 'google');
  assert.equal(parsed.utm_medium, 'cpc');
  assert.equal(parsed.utm_campaign, 'test');
  assert.equal(parsed.utm_id, '123');
  assert.equal(parsed.utm_content, 'a');
  assert.equal(parsed.utm_term, 'site');
});

test('parse gclid', () => assert.equal(parseAttributionParams('?gclid=abc').gclid, 'abc'));
test('parse gbraid', () => assert.equal(parseAttributionParams('?gbraid=abc').gbraid, 'abc'));
test('parse wbraid', () => assert.equal(parseAttributionParams('?wbraid=abc').wbraid, 'abc'));
test('parse fbclid', () => assert.equal(parseAttributionParams('?fbclid=abc').fbclid, 'abc'));

test('sanitization trims, removes control characters and angle brackets', () => {
  assert.equal(sanitizeValue('  <abc>\n  '), 'abc');
});

test('first touch is created', () => {
  const state = updateAttribution({
    href: 'https://marvinsites.com.br/?utm_source=google&utm_medium=cpc',
    localStorage: memoryStorage(),
    now: new Date('2026-09-01T10:00:00Z'),
  });
  assert.equal(state.firstTouch.source, 'google');
  assert.equal(state.firstTouch.medium, 'cpc');
});

test('first touch is immutable', () => {
  const storage = memoryStorage();
  updateAttribution({ href: 'https://marvinsites.com.br/?utm_source=google&utm_medium=cpc', localStorage: storage, now: new Date('2026-09-01T10:00:00Z') });
  const state = updateAttribution({ href: 'https://marvinsites.com.br/?utm_source=instagram&utm_medium=social', localStorage: storage, now: new Date('2026-09-01T11:00:00Z') });
  assert.equal(state.firstTouch.source, 'google');
});

test('last touch updates with new attributed context', () => {
  const storage = memoryStorage();
  updateAttribution({ href: 'https://marvinsites.com.br/?utm_source=google&utm_medium=cpc', localStorage: storage, now: new Date('2026-09-01T10:00:00Z') });
  const state = updateAttribution({ href: 'https://marvinsites.com.br/?utm_source=instagram&utm_medium=social', localStorage: storage, now: new Date('2026-09-01T11:00:00Z') });
  assert.equal(state.lastTouch.source, 'instagram');
  assert.equal(state.lastTouch.medium, 'social');
});

test('empty direct visit does not erase useful last touch', () => {
  const storage = memoryStorage();
  updateAttribution({ href: 'https://marvinsites.com.br/?utm_source=google&utm_medium=cpc', localStorage: storage, now: new Date('2026-09-01T10:00:00Z') });
  const state = updateAttribution({ href: 'https://marvinsites.com.br/', localStorage: storage, now: new Date('2026-09-01T11:00:00Z') });
  assert.equal(state.lastTouch.source, 'google');
});

test('invalid storage recovers', () => {
  const storage = memoryStorage({ [ATTRIBUTION_STORAGE_KEY]: '{bad json' });
  const state = updateAttribution({ href: 'https://marvinsites.com.br/?utm_source=google', localStorage: storage });
  assert.equal(state.firstTouch.source, 'google');
});

test('version mismatch is discarded', () => {
  const storage = memoryStorage({ [ATTRIBUTION_STORAGE_KEY]: JSON.stringify({ version: 'old', firstTouch: {}, lastTouch: {}, expiresAt: '2099-01-01T00:00:00Z' }) });
  const state = updateAttribution({ href: 'https://marvinsites.com.br/?utm_source=google', localStorage: storage });
  assert.equal(state.version, ATTRIBUTION_VERSION);
});

test('session ID is created', () => {
  assert.equal(getOrCreateSessionId(memoryStorage(), 'session-a'), 'session-a');
});

test('session ID is reused within session storage', () => {
  const storage = memoryStorage({ [SESSION_STORAGE_KEY]: 'session-a' });
  assert.equal(getOrCreateSessionId(storage, 'session-b'), 'session-a');
});

test('landing page only keeps attribution whitelist', () => {
  const landing = buildLandingPage('https://marvinsites.com.br/?utm_source=google&nome=Maria&telefone=13999999999&gclid=abc');
  assert.equal(landing, '/?utm_source=google&gclid=abc');
});

test('referrer is normalized without query string', () => {
  const referrer = normalizeReferrer('https://example.com/path?secret=x', 'https://marvinsites.com.br/');
  assert.equal(referrer, 'https://example.com/path');
});

test('same-site referrer is ignored', () => {
  const referrer = normalizeReferrer('https://marvinsites.com.br/outra?x=1', 'https://marvinsites.com.br/');
  assert.equal(referrer, undefined);
});

test('no PII query dump enters landing page', () => {
  const landing = buildLandingPage('https://marvinsites.com.br/?email=a@b.com&utm_campaign=x&whatsapp=13');
  assert.equal(landing, '/?utm_campaign=x');
});

test('attribution snapshot maps to Supabase fields', () => {
  const state = updateAttribution({ href: 'https://marvinsites.com.br/?utm_source=google&utm_medium=cpc&utm_id=42', localStorage: memoryStorage(), now: new Date('2026-09-01T10:00:00Z') });
  const snapshot = buildAttributionSnapshot(state, 'session-a');
  assert.equal(snapshot.first_campaign_id, '42');
  assert.equal(snapshot.last_landing_page, '/?utm_source=google&utm_medium=cpc&utm_id=42');
});

test('direct case is deterministic for first visit', () => {
  const state = updateAttribution({ href: 'https://marvinsites.com.br/', localStorage: memoryStorage() });
  assert.equal(state.firstTouch.source, 'direct');
  assert.equal(state.firstTouch.medium, 'none');
});

test('referral case is deterministic', () => {
  const state = updateAttribution({ href: 'https://marvinsites.com.br/', referrer: 'https://parceiro.com/a?x=1', localStorage: memoryStorage() });
  assert.equal(state.firstTouch.source, 'parceiro.com');
  assert.equal(state.firstTouch.medium, 'referral');
});

test('organic case is deterministic for known search referrer', () => {
  const state = updateAttribution({ href: 'https://marvinsites.com.br/', referrer: 'https://www.google.com/search?q=site', localStorage: memoryStorage() });
  assert.equal(state.firstTouch.source, 'google');
  assert.equal(state.firstTouch.medium, 'organic');
});

test('organic case keeps non-Google search host as source', () => {
  const state = updateAttribution({ href: 'https://marvinsites.com.br/', referrer: 'https://www.bing.com/search?q=site', localStorage: memoryStorage() });
  assert.equal(state.firstTouch.source, 'www.bing.com');
  assert.equal(state.firstTouch.medium, 'organic');
});

test('storage unavailable falls back without throwing', () => {
  const state = updateAttribution({ href: 'https://marvinsites.com.br/?utm_source=google', localStorage: brokenStorage() });
  assert.equal(state.firstTouch.source, 'google');
});

test('expired storage is discarded', () => {
  const storage = memoryStorage();
  const old = updateAttribution({ href: 'https://marvinsites.com.br/?utm_source=google', localStorage: storage, now: new Date('2026-01-01T00:00:00Z') });
  storage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify({ ...old, expiresAt: '2026-01-02T00:00:00Z' }));
  const state = updateAttribution({ href: 'https://marvinsites.com.br/?utm_source=instagram', localStorage: storage, now: new Date('2026-09-01T00:00:00Z') });
  assert.equal(state.firstTouch.source, 'instagram');
});

test('form fields use current last touch values', () => {
  const state = updateAttribution({ href: 'https://marvinsites.com.br/?utm_source=google&utm_medium=cpc&gclid=abc', localStorage: memoryStorage() });
  const snapshot = buildAttributionSnapshot(state, 'session-a');
  const fields = attributionFormFields(snapshot);
  assert.equal(fields.attribution_version, ATTRIBUTION_VERSION);
  assert.equal(fields.session_id, 'session-a');
  assert.equal(fields.utm_source, 'google');
  assert.equal(fields.gclid, 'abc');
});
