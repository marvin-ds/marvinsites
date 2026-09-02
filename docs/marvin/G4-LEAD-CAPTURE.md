# G4 — Lead Capture Foundation

Status: ENVIRONMENT SEMANTICS FIX — pending preview revalidation
Capture version: `g4-v1`
Date: 2026-09-01

## Scope

G4 moves the diagnostic form from Netlify Forms as the primary lead store to a
secure server-side capture flow:

```text
visitor
→ attribution g3-v1
→ diagnostic form
→ Netlify Function
→ Supabase RPC
→ businesses + leads + lead_attribution + lead_consents
→ /obrigado/
```

G4 does not create Vercel, WhatsApp attribution, CRM Lite, Google Ads offline
conversions, Enhanced Conversions, GTM changes, GA4 changes, DNS changes, or a
production deployment.

## Endpoint

```text
POST /.netlify/functions/lead-capture
Content-Type: application/json
```

Successful response:

```json
{ "ok": true }
```

The public response never exposes internal database IDs, SQL errors, stack
traces, service errors, Supabase keys, email, or phone.

## Server-Side Environment

Required server-only variables:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

`SUPABASE_SERVICE_ROLE_KEY` is used only inside the Netlify Function. It must not
be committed, printed, logged, or sent to browser code.

For G4, the variable name remains `SUPABASE_SERVICE_ROLE_KEY` because that is the
configured Netlify name. Internally it means a privileged server-side Supabase
key and can be either:

- modern Supabase Secret Key (`sb_secret_...`): sent as `apikey` only;
- legacy `service_role` JWT: sent as `apikey` plus `Authorization: Bearer`.

This naming is operational debt. A future cleanup may rename the variable to a
neutral name such as `SUPABASE_SECRET_KEY`, but G4 does not require that change.

Server diagnostics are sanitized. They may log error category, HTTP status,
PostgREST error code, key mode, and submission correlation ID, but never key
values, auth headers, email, phone, names, business names, full payloads, or
click IDs.

## Environment Semantics

`environment` represents the trusted deploy/runtime environment, not a value
chosen by the browser.

The Netlify Function derives the canonical value server-side:

- production deploy or canonical production host `marvinsites.com.br`:
  `production`;
- Deploy Preview, branch deploy, dev, unknown, or other non-production host:
  `staging`.

The browser is not authoritative for `environment`; any client-supplied value is
ignored/overridden before calling the Supabase RPC. This prevents preview/test
leads from being classified as production leads.

Known pre-fix test artifact:

```text
submission_id = g4previewcodex20260901a
environment = production
```

That record was created before the server-side environment fix and must not be
reused for environment validation because RPC idempotency can return the old
record.

## Validation

The Netlify Function whitelists and validates only the approved fields:

- `submission_id`
- `negocio`
- `nome`
- `whatsapp`
- `cidade`
- `segmento`
- `site`
- `email`
- `consentimento`
- `bot-field`
- `attribution`
- `consent_mode`

Unknown fields are ignored. Required values are trimmed, bounded, and sanitized.
The endpoint enforces POST, JSON content type, and a 24 KB request limit.

## Business Mapping

The current form now asks for `Nome do negócio`, because the G1 schema defines
`businesses` as the central entity and `leads` as the commercial contact.

G4 creates one business per valid submission. It does not do fuzzy matching or
merge businesses by similar names. Deterministic deduplication of businesses is
deferred until an approved rule exists.

## Database Transaction

Migration:

```text
supabase/migrations/20260901000005_g4_lead_capture_rpc.sql
```

The migration adds:

- nullable `leads.submission_id`
- unique partial index `leads_submission_id_unique`
- RPC `public.capture_lead_v1(payload jsonb)`

The RPC inserts `businesses`, optional `business_sources`, `leads`,
`lead_attribution`, `lead_consents`, and a non-PII `audit_log` entry inside one
Postgres operation. If any insert fails, the transaction rolls back.

`lead_status_history` is created by the existing G1 trigger on lead insert.

## Idempotency

The browser creates a random `submission_id` once per page load and reuses it on
retry. The database enforces uniqueness through `leads_submission_id_unique`.
Repeated submissions with the same `submission_id` return success from the RPC
without creating another lead or business.

The endpoint does not dedupe by email or phone.

## Attribution Mapping

G4 accepts the G3 `window.marvinAttribution` snapshot and maps it to
`lead_attribution`.

Required non-null campaign fields fall back to `(not set)` when G3 has no
campaign, such as direct traffic. Click IDs are persisted in Supabase fields but
not pushed to `dataLayer`.

## Consent Mapping

Privacy/contact consent comes from the explicit required checkbox.

Marketing consent remains false because the current form has no marketing opt-in.
G4 does not infer marketing consent from Google Consent Mode, UTMs, analytics
storage, ad storage, or click IDs.

The browser sends a Consent Mode snapshot from `marvin_consent_v2` when present.
Invalid or absent values default to denied.

## Netlify Forms Transition

Netlify Forms is no longer the primary persistence path in G4. The canonical
lead store is Supabase.

The UI redirects to `/obrigado/` only after the server-side endpoint returns
success. On failure, the user remains on the form, sees a generic error, and can
retry with the same `submission_id`.

## Security

- No service role key in browser code.
- No browser direct inserts into Common Core tables.
- No permissive RLS policy added.
- anon/authenticated direct table access remains denied.
- No PII sent to GA4, GTM, Umami, URL query strings, or `dataLayer`.
- Endpoint responses are generic and non-sensitive.
- Server code does not intentionally log full payloads, email, phone, key
  material, auth headers, business names, or click IDs.

## Testing

Implemented:

- `npm run test:lead-capture`
- `npm run test:attribution`
- `npm run test:consent`
- `npm run lint`
- `npm run build`
- pgTAP file `supabase/tests/database/04_g4_lead_capture_test.sql`

Completed in local environment:

- `npm run db:reset`: PASS
- `npm run db:test`: PASS, 4 files / 142 tests

Port note:

The default Supabase local ports `54320–54329` were unavailable because Windows
reserved the `54315–54414` TCP range. Project local ports were moved to
`55420–55429` in `supabase/config.toml`.

## Production Rollout Boundary

Before production:

1. Remote Supabase migration must remain aligned through `000005`.
2. `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` must be available to Netlify
   Functions in the required contexts.
3. Validate preview function behavior with the controlled test submission.
4. Request approval before merge to `main` and production deploy.
