export const MAX_BODY_BYTES = 24 * 1024;
export const LEAD_CAPTURE_VERSION = 'g4-v1';
export const POLICY_VERSION = '2026-09-01';
export const CONSENT_VERSION = 'g2-v1';
export const TRACKING_VERSION = 'g3-v1';

const STRING_LIMIT = 160;
const URL_LIMIT = 512;
const TEXT_LIMIT = 500;
const SEGMENTS = new Set([
  'Clínica / Consultório',
  'Contador / Consultoria',
  'Reforma / Construção',
  'Estética / Beleza',
  'Professor / Curso',
  'Turismo / Hospedagem',
  'Restaurante / Delivery',
  'Imobiliária / Corretor',
  'Serviços automotivos',
  'Outro',
]);
const CONSENT_VALUES = new Set(['granted', 'denied']);

const ATTRIBUTION_FIELDS = [
  'first_touch_at',
  'first_source',
  'first_medium',
  'first_campaign',
  'first_campaign_id',
  'first_content',
  'first_term',
  'first_referrer',
  'first_landing_page',
  'first_gclid',
  'first_gbraid',
  'first_wbraid',
  'first_fbclid',
  'last_touch_at',
  'last_source',
  'last_medium',
  'last_campaign',
  'last_campaign_id',
  'last_content',
  'last_term',
  'last_referrer',
  'last_landing_page',
  'last_gclid',
  'last_gbraid',
  'last_wbraid',
  'last_fbclid',
  'session_id',
];

export class ValidationError extends Error {
  constructor(message, statusCode = 422) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = statusCode;
  }
}

export function sanitizeString(value, limit = STRING_LIMIT) {
  if (typeof value !== 'string') return '';
  return value
    .trim()
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .slice(0, limit);
}

export function normalizePhone(value) {
  const digits = sanitizeString(value, 40).replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('55')) return digits.slice(0, 13);
  return `55${digits}`.slice(0, 13);
}

export function normalizeEmail(value) {
  const email = sanitizeString(value, 254).toLowerCase();
  if (!email) return '';
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
}

function splitCityState(value) {
  const raw = sanitizeString(value, STRING_LIMIT);
  if (!raw) return { city: '', state: '' };
  const [city, state] = raw.split(',').map((part) => sanitizeString(part, 80));
  const normalizedState = state && /^[a-zA-Z]{2}$/.test(state) ? state.toUpperCase() : '';
  return { city: city || raw, state: normalizedState };
}

function requireString(value, field, limit = STRING_LIMIT) {
  const sanitized = sanitizeString(value, limit);
  if (!sanitized) throw new ValidationError(`invalid ${field}`);
  return sanitized;
}

function optionalString(value, limit = STRING_LIMIT) {
  const sanitized = sanitizeString(value, limit);
  return sanitized || undefined;
}

function consentValue(value) {
  const sanitized = sanitizeString(value, 20);
  return CONSENT_VALUES.has(sanitized) ? sanitized : 'denied';
}

function attributionValue(snapshot, key, limit = STRING_LIMIT) {
  const sanitized = sanitizeString(snapshot?.[key], limit);
  return sanitized || undefined;
}

function requiredAttributionValue(snapshot, key, fallback, limit = STRING_LIMIT) {
  return attributionValue(snapshot, key, limit) || fallback;
}

function attributionTimestamp(snapshot, key) {
  const value = attributionValue(snapshot, key, 40);
  if (!value) return new Date().toISOString();
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : new Date().toISOString();
}

export function parseJsonBody(event) {
  const body = event?.body ?? '';
  if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) {
    throw new ValidationError('payload too large', 413);
  }
  const contentType = event?.headers?.['content-type'] || event?.headers?.['Content-Type'] || '';
  if (!String(contentType).toLowerCase().includes('application/json')) {
    throw new ValidationError('unsupported content type', 400);
  }
  try {
    const parsed = JSON.parse(body);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('not object');
    }
    return parsed;
  } catch {
    throw new ValidationError('invalid json', 400);
  }
}

export function validateLeadCapture(input) {
  if (sanitizeString(input?.['bot-field'], 80)) {
    return { bot: true };
  }

  const submissionId = requireString(input?.submission_id, 'submission_id', 80);
  if (!/^[a-zA-Z0-9_-]{12,80}$/.test(submissionId)) {
    throw new ValidationError('invalid submission_id');
  }

  const contactName = requireString(input?.nome, 'nome');
  const businessName = requireString(input?.negocio, 'negocio');
  const rawPhone = requireString(input?.whatsapp, 'whatsapp', 40);
  const phoneNormalized = normalizePhone(rawPhone);
  if (phoneNormalized.length < 12 || phoneNormalized.length > 13) {
    throw new ValidationError('invalid whatsapp');
  }

  const { city, state } = splitCityState(input?.cidade);
  if (!city) throw new ValidationError('invalid cidade');

  const segment = requireString(input?.segmento, 'segmento');
  if (!SEGMENTS.has(segment)) throw new ValidationError('invalid segmento');

  const emailNormalized = normalizeEmail(input?.email);
  if (sanitizeString(input?.email, 254) && !emailNormalized) {
    throw new ValidationError('invalid email');
  }

  const privacyAck = input?.consentimento === true || input?.consentimento === 'on' || input?.consentimento === 'true';
  if (!privacyAck) throw new ValidationError('privacy consent required');

  const snapshot = input?.attribution && typeof input.attribution === 'object' ? input.attribution : {};
  const attributionVersion = attributionValue(snapshot, 'attribution_version') || attributionValue(input, 'attribution_version') || TRACKING_VERSION;
  if (attributionVersion !== TRACKING_VERSION) throw new ValidationError('invalid attribution');

  const sessionId = attributionValue(snapshot, 'session_id', 80) || attributionValue(input, 'session_id', 80);
  const consentMode = input?.consent_mode && typeof input.consent_mode === 'object' ? input.consent_mode : {};

  const attribution = {};
  for (const field of ATTRIBUTION_FIELDS) {
    const limit = field.includes('landing_page') || field.includes('referrer') ? URL_LIMIT : STRING_LIMIT;
    attribution[field] = attributionValue(snapshot, field, limit);
  }

  attribution.session_id = sessionId;
  attribution.first_touch_at = attributionTimestamp(snapshot, 'first_touch_at');
  attribution.last_touch_at = attributionTimestamp(snapshot, 'last_touch_at');
  attribution.first_source = requiredAttributionValue(snapshot, 'first_source', 'direct');
  attribution.first_medium = requiredAttributionValue(snapshot, 'first_medium', 'none');
  attribution.first_campaign = requiredAttributionValue(snapshot, 'first_campaign', '(not set)');
  attribution.first_landing_page = requiredAttributionValue(snapshot, 'first_landing_page', '/', URL_LIMIT);
  attribution.last_source = requiredAttributionValue(snapshot, 'last_source', attribution.first_source);
  attribution.last_medium = requiredAttributionValue(snapshot, 'last_medium', attribution.first_medium);
  attribution.last_campaign = requiredAttributionValue(snapshot, 'last_campaign', attribution.first_campaign);
  attribution.last_landing_page = requiredAttributionValue(snapshot, 'last_landing_page', attribution.first_landing_page, URL_LIMIT);

  return {
    submission_id: submissionId,
    business: {
      name: businessName,
      city,
      state: state || undefined,
      website_url: optionalString(input?.site, URL_LIMIT),
      phone_normalized: phoneNormalized,
      status: 'active',
      environment: 'production',
    },
    lead: {
      name: contactName,
      business_name: businessName,
      phone_raw: sanitizeString(rawPhone, 40),
      phone_normalized: phoneNormalized,
      email_raw: optionalString(input?.email, 254),
      email_normalized: emailNormalized || undefined,
      city,
      state: state || undefined,
      segment,
      digital_presence_url: optionalString(input?.site, URL_LIMIT),
      source_type: 'form',
      status: 'new',
      landing_version: 'site-g4',
      offer_version: 'diagnostic-v1',
      tracking_version: TRACKING_VERSION,
      environment: 'production',
    },
    attribution,
    consent: {
      session_id: sessionId,
      privacy_ack: true,
      diagnostic_contact_allowed: true,
      email_marketing_opt_in: false,
      whatsapp_marketing_opt_in: false,
      analytics_storage: consentValue(consentMode.analytics_storage),
      ad_storage: consentValue(consentMode.ad_storage),
      ad_user_data: consentValue(consentMode.ad_user_data),
      ad_personalization: consentValue(consentMode.ad_personalization),
      consent_version: sanitizeString(consentMode.version, 40) || CONSENT_VERSION,
      policy_version: POLICY_VERSION,
      source: 'diagnostic_form',
    },
    meta: {
      capture_version: LEAD_CAPTURE_VERSION,
    },
  };
}

export function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(body),
  };
}

export function safeErrorResponse(error) {
  if (error instanceof ValidationError) {
    const statusCode = error.statusCode || 422;
    return jsonResponse(statusCode, { ok: false, error: statusCode === 413 ? 'payload_too_large' : 'invalid_request' });
  }
  return jsonResponse(500, { ok: false, error: 'capture_failed' });
}
