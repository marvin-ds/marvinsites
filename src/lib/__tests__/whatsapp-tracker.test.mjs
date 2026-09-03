import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  VALID_PLACEMENTS,
  isValidPlacement,
  isValidRef,
  generateRef,
  sanitizePage,
  appendRefToWaUrl,
  buildTrackPayload,
} from '../whatsapp-tracker.ts';

// ─── isValidPlacement ───────────────────────────────────────────────────────

test('isValidPlacement — returns true for all valid placements', () => {
  for (const p of VALID_PLACEMENTS) {
    assert.ok(isValidPlacement(p), `expected true for ${p}`);
  }
});

test('isValidPlacement — rejects unknown strings', () => {
  for (const p of ['', 'arbitrary', 'home', 'sidebar', null, undefined, 42]) {
    assert.equal(isValidPlacement(p), false, `expected false for ${JSON.stringify(p)}`);
  }
});

// ─── generateRef / isValidRef ───────────────────────────────────────────────

test('generateRef — matches MS-XXXX pattern', () => {
  for (let i = 0; i < 50; i++) {
    const ref = generateRef();
    assert.match(ref, /^MS-[A-Z0-9]{4}$/, `invalid ref: ${ref}`);
  }
});

test('generateRef — produces unique values', () => {
  const refs = new Set(Array.from({ length: 200 }, generateRef));
  assert.ok(refs.size > 190, 'expected high uniqueness');
});

test('generateRef — no confusable characters (0, 1, I, O, L)', () => {
  for (let i = 0; i < 200; i++) {
    const suffix = generateRef().slice(3);
    assert.ok(!/[01IOL]/.test(suffix), `confusable char in ${suffix}`);
  }
});

test('isValidRef — accepts valid refs', () => {
  assert.ok(isValidRef('MS-AB2C'));
  assert.ok(isValidRef('MS-ZZZZ'));
  assert.ok(isValidRef('MS-2345'));
});

test('isValidRef — rejects invalid formats', () => {
  assert.equal(isValidRef('ms-ab2c'), false);
  assert.equal(isValidRef('MS-AB2'), false);
  assert.equal(isValidRef('MS-AB2CC'), false);
  assert.equal(isValidRef(''), false);
  assert.equal(isValidRef('ABCD'), false);
});

// ─── sanitizePage ───────────────────────────────────────────────────────────

test('sanitizePage — returns pathname only', () => {
  assert.equal(sanitizePage('/sobre'), '/sobre');
  assert.equal(sanitizePage('/cidades/santos'), '/cidades/santos');
});

test('sanitizePage — strips query and hash', () => {
  assert.equal(sanitizePage('/?utm_source=google'), '/');
  assert.equal(sanitizePage('/page#section'), '/page');
});

test('sanitizePage — returns "/" for non-string or empty', () => {
  assert.equal(sanitizePage(''), '/');
  assert.equal(sanitizePage(null), '/');
  assert.equal(sanitizePage(undefined), '/');
});

// ─── appendRefToWaUrl ───────────────────────────────────────────────────────

test('appendRefToWaUrl — appends ref to text param', () => {
  const base = 'https://wa.me/5513000000000?text=Ol%C3%A1!%20Vim%20pelo%20site.';
  const result = appendRefToWaUrl(base, 'MS-AB2C');
  const url = new URL(result);
  assert.ok(url.searchParams.get('text')?.includes('[MS-AB2C]'));
});

test('appendRefToWaUrl — preserves original text before ref', () => {
  const base = 'https://wa.me/5513000000000?text=Ol%C3%A1';
  const result = appendRefToWaUrl(base, 'MS-XY3Z');
  const text = new URL(result).searchParams.get('text') || '';
  assert.ok(text.startsWith('Olá'), `expected original text first: ${text}`);
  assert.ok(text.includes('[MS-XY3Z]'));
});

test('appendRefToWaUrl — handles URL with no text param', () => {
  const base = 'https://wa.me/5513000000000';
  const result = appendRefToWaUrl(base, 'MS-AB2C');
  assert.ok(result.includes('MS-AB2C'));
});

test('appendRefToWaUrl — returns original URL on invalid input', () => {
  const bad = 'not-a-url';
  assert.equal(appendRefToWaUrl(bad, 'MS-AB2C'), bad);
});

// ─── buildTrackPayload ──────────────────────────────────────────────────────

test('buildTrackPayload — returns valid ref', () => {
  const p = buildTrackPayload('hero', '/', 'session-123');
  assert.ok(isValidRef(p.ref));
});

test('buildTrackPayload — preserves placement and sessionId', () => {
  const p = buildTrackPayload('header', '/cidades/santos', 'my-session');
  assert.equal(p.placement, 'header');
  assert.equal(p.session_id, 'my-session');
  assert.equal(p.page, '/cidades/santos');
});

test('buildTrackPayload — sanitizes page pathname', () => {
  const p = buildTrackPayload('floating', '/?utm_source=google', 'sid');
  assert.equal(p.page, '/');
});

test('buildTrackPayload — truncates long session_id', () => {
  const longId = 'a'.repeat(200);
  const p = buildTrackPayload('footer', '/', longId);
  assert.ok(p.session_id.length <= 128);
});
