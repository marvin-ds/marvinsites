# G4 — Lead Capture Foundation

Status: IMPLEMENTED — pending local Supabase validation, preview, and approval
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
- Server code does not intentionally log full payloads, email, or phone.

## Testing

Implemented:

- `npm run test:lead-capture`
- `npm run test:attribution`
- `npm run test:consent`
- `npm run lint`
- `npm run build`
- pgTAP file `supabase/tests/database/04_g4_lead_capture_test.sql`

Pending in this environment:

- `npm run db:reset`
- `npm run db:test`

Blocker observed: local Supabase cannot run until Docker Desktop Linux engine is
available.

## Production Rollout Boundary

Before production:

1. Run local Supabase reset and pgTAP.
2. Apply the G4 migration to remote Supabase only after explicit authorization.
3. Configure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Netlify only after
   explicit authorization.
4. Validate preview function behavior with a safe backend target.
5. Request approval before merge to `main` and production deploy.
