import {
  jsonResponse,
  parseJsonBody,
  safeErrorResponse,
  validateLeadCapture,
} from './_shared/lead-capture.mjs';

const RPC_NAME = 'capture_lead_v1';
const MODERN_SECRET_PREFIX = 'sb_secret_';

function env(name) {
  return process.env[name] || '';
}

export function isLegacyJwt(value) {
  if (typeof value !== 'string') return false;
  const parts = value.split('.');
  if (parts.length !== 3) return false;
  return parts.every((part) => /^[A-Za-z0-9_-]+$/.test(part) && part.length > 0);
}

export function buildSupabaseServerHeaders(key) {
  if (!key) {
    throw new Error('MISSING_SUPABASE_KEY');
  }

  const headers = {
    apikey: key,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };

  if (key.startsWith(MODERN_SECRET_PREFIX)) {
    return { headers, keyMode: 'MODERN_SECRET' };
  }

  if (isLegacyJwt(key)) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${key}`,
      },
      keyMode: 'LEGACY_SERVICE_ROLE',
    };
  }

  throw new Error('INVALID_KEY_FORMAT');
}

export function sanitizeDiagnostic(details = {}) {
  const allowed = {};
  for (const key of ['event', 'stage', 'category', 'status', 'code', 'submission_id', 'keyMode']) {
    const value = details[key];
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      allowed[key] = value;
    }
  }
  return allowed;
}

export function logDiagnostic(details) {
  console.error('[lead-capture]', JSON.stringify(sanitizeDiagnostic(details)));
}

async function callSupabase(payload) {
  const supabaseUrl = env('SUPABASE_URL').replace(/\/$/, '');
  const serviceRoleKey = env('SUPABASE_SERVICE_ROLE_KEY');
  const submissionId = payload?.submission_id;

  if (!supabaseUrl) {
    logDiagnostic({ event: 'lead_capture_error', stage: 'env', category: 'MISSING_SUPABASE_URL', submission_id: submissionId });
    throw new Error('MISSING_SUPABASE_URL');
  }

  let auth;
  try {
    auth = buildSupabaseServerHeaders(serviceRoleKey);
  } catch (error) {
    logDiagnostic({ event: 'lead_capture_error', stage: 'auth', category: error.message, submission_id: submissionId });
    throw error;
  }

  let response;
  try {
    response = await fetch(`${supabaseUrl}/rest/v1/rpc/${RPC_NAME}`, {
      method: 'POST',
      headers: auth.headers,
      body: JSON.stringify({ payload }),
    });
  } catch {
    logDiagnostic({
      event: 'lead_capture_error',
      stage: 'fetch',
      category: 'SUPABASE_NETWORK_ERROR',
      submission_id: submissionId,
      keyMode: auth.keyMode,
    });
    throw new Error('SUPABASE_NETWORK_ERROR');
  }

  if (!response.ok) {
    let code;
    try {
      const body = await response.clone().json();
      code = typeof body?.code === 'string' ? body.code : undefined;
    } catch {
    }
    logDiagnostic({
      event: 'lead_capture_error',
      stage: 'rpc',
      category: 'SUPABASE_HTTP_ERROR',
      status: response.status,
      code,
      submission_id: submissionId,
      keyMode: auth.keyMode,
    });
    throw new Error('SUPABASE_HTTP_ERROR');
  }

  return response.json();
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'method_not_allowed' });
  }

  try {
    const input = parseJsonBody(event);
    const payload = validateLeadCapture(input);
    if (payload.bot) return jsonResponse(201, { ok: true });

    await callSupabase(payload);
    return jsonResponse(201, { ok: true });
  } catch (error) {
    return safeErrorResponse(error);
  }
}
