import {
  jsonResponse,
  parseJsonBody,
  safeErrorResponse,
  validateLeadCapture,
} from './_shared/lead-capture.mjs';

const RPC_NAME = 'capture_lead_v1';

function env(name) {
  return process.env[name] || '';
}

async function callSupabase(payload) {
  const supabaseUrl = env('SUPABASE_URL').replace(/\/$/, '');
  const serviceRoleKey = env('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('missing_supabase_server_env');
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${RPC_NAME}`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ payload }),
  });

  if (!response.ok) {
    throw new Error('supabase_capture_failed');
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
