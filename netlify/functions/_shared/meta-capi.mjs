import { createHash } from 'node:crypto';

const DEFAULT_PIXEL_ID = '1247210063126992';
const DEFAULT_GRAPH_VERSION = 'v26.0';

function env(name, source = process.env) {
  return source?.[name] || '';
}

export function isValidMetaPixelId(value) {
  return typeof value === 'string' && /^\d{8,30}$/.test(value);
}

export function resolveMetaConfig(source = process.env) {
  const pixelId = env('META_PIXEL_ID', source) || env('PUBLIC_META_PIXEL_ID', source) || DEFAULT_PIXEL_ID;
  const accessToken = env('META_CAPI_ACCESS_TOKEN', source);
  const graphVersion = env('META_CAPI_GRAPH_VERSION', source) || DEFAULT_GRAPH_VERSION;
  const testEventCode = env('META_CAPI_TEST_EVENT_CODE', source);

  return {
    pixelId,
    accessToken,
    graphVersion: /^v\d+\.\d+$/.test(graphVersion) ? graphVersion : DEFAULT_GRAPH_VERSION,
    testEventCode,
    configured: isValidMetaPixelId(pixelId) && Boolean(accessToken),
  };
}

export function hashMetaValue(value) {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return createHash('sha256').update(normalized).digest('hex');
}

export function hashMetaPhone(value) {
  if (typeof value !== 'string') return undefined;
  const digits = value.replace(/\D/g, '');
  if (!digits) return undefined;
  return hashMetaValue(digits.startsWith('55') ? digits : `55${digits}`);
}

export function getHeader(event, name) {
  const headers = event?.headers || {};
  const target = name.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === target) return String(value);
  }
  return '';
}

export function parseCookieHeader(cookieHeader = '') {
  const result = {};
  for (const part of String(cookieHeader).split(';')) {
    const index = part.indexOf('=');
    if (index <= 0) continue;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (key) result[key] = value;
  }
  return result;
}

export function buildFbcFromClickId(clickId, eventTime) {
  if (typeof clickId !== 'string' || !clickId.trim()) return undefined;
  return `fb.1.${eventTime * 1000}.${clickId.trim()}`;
}

export function buildEventSourceUrl(event, payload) {
  const landingPage = payload?.attribution?.last_landing_page || payload?.attribution?.first_landing_page || '/';
  if (/^https:\/\/marvinsites\.com\.br\//.test(landingPage)) return landingPage;

  const host = getHeader(event, 'x-forwarded-host') || getHeader(event, 'host') || 'marvinsites.com.br';
  const safeHost = String(host).split(',')[0].trim().toLowerCase().split(':')[0];
  const path = String(landingPage).startsWith('/') ? String(landingPage) : '/';
  return `https://${safeHost || 'marvinsites.com.br'}${path}`;
}

export function buildMetaLeadSubmittedEvent({ event, payload, eventTime = Math.floor(Date.now() / 1000) }) {
  const cookies = parseCookieHeader(getHeader(event, 'cookie'));
  const forwardedFor = getHeader(event, 'x-nf-client-connection-ip') || getHeader(event, 'x-forwarded-for');
  const clientIp = forwardedFor.split(',')[0].trim();
  const userAgent = getHeader(event, 'user-agent');
  const firstName = payload?.lead?.name?.split(/\s+/)[0] || '';
  const fbclid = payload?.attribution?.last_fbclid || payload?.attribution?.first_fbclid || '';
  const userData = {
    client_user_agent: userAgent || undefined,
    client_ip_address: clientIp || undefined,
    em: payload?.lead?.email_normalized ? [hashMetaValue(payload.lead.email_normalized)] : undefined,
    ph: payload?.lead?.phone_normalized ? [hashMetaPhone(payload.lead.phone_normalized)] : undefined,
    fn: firstName ? [hashMetaValue(firstName)] : undefined,
    ct: payload?.lead?.city ? [hashMetaValue(payload.lead.city)] : undefined,
    st: payload?.lead?.state ? [hashMetaValue(payload.lead.state)] : undefined,
    fbp: cookies._fbp || undefined,
    fbc: cookies._fbc || buildFbcFromClickId(fbclid, eventTime),
    external_id: payload?.submission_id ? [hashMetaValue(payload.submission_id)] : undefined,
  };

  for (const [key, value] of Object.entries(userData)) {
    if (Array.isArray(value) && !value.filter(Boolean).length) delete userData[key];
    if (value === undefined || value === '') delete userData[key];
  }

  return {
    event_name: 'LeadSubmitted',
    event_time: eventTime,
    event_id: payload?.submission_id,
    action_source: 'website',
    event_source_url: buildEventSourceUrl(event, payload),
    user_data: userData,
    custom_data: {
      content_name: 'Diagnostico Marvin Sites',
      content_category: payload?.lead?.segment,
      lead_status: payload?.lead?.status,
      tracking_version: payload?.lead?.tracking_version,
      landing_version: payload?.lead?.landing_version,
      offer_version: payload?.lead?.offer_version,
      environment: payload?.lead?.environment,
    },
  };
}

export function sanitizeMetaDiagnostic(details = {}) {
  const allowed = {};
  for (const key of ['event', 'stage', 'category', 'status', 'code', 'submission_id', 'configured']) {
    const value = details[key];
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      allowed[key] = value;
    }
  }
  return allowed;
}

export function logMetaDiagnostic(details) {
  console.error('[meta-capi]', JSON.stringify(sanitizeMetaDiagnostic(details)));
}

export async function sendMetaLeadSubmitted({ event, payload, fetchImpl = fetch, envSource = process.env }) {
  const config = resolveMetaConfig(envSource);
  const submissionId = payload?.submission_id;

  if (payload?.consent?.ad_storage !== 'granted') {
    return { sent: false, skipped: true };
  }

  if (!config.configured) {
    if (config.accessToken) {
      logMetaDiagnostic({
        event: 'meta_capi_skip',
        stage: 'config',
        category: 'INVALID_PIXEL_ID',
        submission_id: submissionId,
        configured: false,
      });
    }
    return { sent: false, skipped: true };
  }

  const capiEvent = buildMetaLeadSubmittedEvent({ event, payload });
  const body = {
    data: [capiEvent],
  };

  if (config.testEventCode) body.test_event_code = config.testEventCode;

  let response;
  try {
    const url = `https://graph.facebook.com/${config.graphVersion}/${config.pixelId}/events?access_token=${encodeURIComponent(config.accessToken)}`;
    response = await fetchImpl(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    logMetaDiagnostic({
      event: 'meta_capi_error',
      stage: 'fetch',
      category: 'META_NETWORK_ERROR',
      submission_id: submissionId,
      configured: true,
    });
    return { sent: false, skipped: false };
  }

  if (!response.ok) {
    let code;
    try {
      const errorBody = await response.clone().json();
      code = typeof errorBody?.error?.code === 'number' ? errorBody.error.code : undefined;
    } catch {
    }
    logMetaDiagnostic({
      event: 'meta_capi_error',
      stage: 'api',
      category: 'META_HTTP_ERROR',
      status: response.status,
      code,
      submission_id: submissionId,
      configured: true,
    });
    return { sent: false, skipped: false };
  }

  return { sent: true, skipped: false };
}
