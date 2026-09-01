# G3 — Attribution Foundation

Status: IMPLEMENTED — pending validation and approval
Attribution version: `g3-v1`
Date: 2026-09-01

## Scope

G3 creates the first-party attribution foundation for the current Netlify site.
It does not insert leads into Supabase and does not create new migrations,
GTM tags, GA4 events, Vercel apps, checkout flows, or WhatsApp attribution codes.

## Storage

| Key | Storage | Purpose | Lifetime |
|---|---|---|---|
| `marvin_attribution_v1` | localStorage | first-touch and useful last-touch context | 90 days, rolling on update |
| `marvin_session_v1` | sessionStorage | first-party session identifier | browser tab/session |

No PII is stored in either key. Do not store name, phone, email, lead ID,
business ID, raw query strings, fingerprints, or GA client IDs.

## Captured Parameters

Only these query parameters are captured:

```text
utm_source
utm_medium
utm_campaign
utm_id
utm_content
utm_term
gclid
gbraid
wbraid
fbclid
```

Values are trimmed, control characters and angle brackets are removed, and
individual values are capped at 160 characters. Landing page and referrer fields
are capped at 512 characters.

## First Touch

First touch is the first known acquisition context for `g3-v1` in this browser.
After it is created, it is immutable for the lifetime of the attribution object.
Invalid, expired, or mismatched-version storage is discarded and rebuilt.

## Last Touch

Last touch is the most recent useful acquisition context. It updates when a new
URL contains attribution parameters, click IDs, or a deterministic external
referrer. A direct visit with no useful signal does not erase an existing useful
last touch.

Initial direct visits are represented deterministically as:

```text
source = direct
medium = none
```

Known search referrers become organic. Other external referrers become referral.
G3 does not implement advanced channel grouping.

## Click IDs

`gclid`, `gbraid`, `wbraid`, and `fbclid` are stored separately. They are not
manually sent to GA4 in G3. The dataLayer receives only presence flags for click
IDs.

## Landing Page

Landing page stores the pathname plus the approved attribution query parameters.
The full query string is never persisted. Non-whitelisted params are dropped to
avoid accidental PII capture.

## Referrer

Referrer stores protocol, host, and path only. Query string and same-site
referrers are ignored.

## Consent Relationship

G3 distinguishes first-party attribution context from Google Analytics / Ads
consent.

First-party attribution is used to preserve the origin context for a lead request
and is not sent to Google by this implementation. GTM/GA4 behavior remains
controlled by Gate 2 Consent Mode Basic rules.

## DataLayer

G3 emits one of:

```text
attribution_initialized
attribution_updated
```

Payload contains:

```text
attribution_version
session_id
source
medium
campaign
campaign_id
content
term
has_gclid
has_gbraid
has_wbraid
has_fbclid
```

No PII and no raw click ID values are pushed to dataLayer.

## Form Integration

The current Netlify Forms flow remains unchanged:

```text
Netlify Forms -> fetch POST / -> /obrigado/
```

Hidden fields are filled client-side before submit:

```text
attribution_version
session_id
utm_source
utm_medium
utm_campaign
utm_id
utm_content
utm_term
gclid
gbraid
wbraid
fbclid
landing_page
referrer
```

These fields use the current last-touch snapshot. The future G4 Supabase endpoint
can use the same snapshot source to persist first-touch and last-touch directly.

## Browser to Supabase Mapping

| Browser snapshot | Supabase `lead_attribution` |
|---|---|
| `session_id` | `session_id` |
| `first_touch_at` | `first_touch_at` |
| `first_source` | `first_source` |
| `first_medium` | `first_medium` |
| `first_campaign` | `first_campaign` |
| `first_campaign_id` | `first_campaign_id` |
| `first_content` | `first_content` |
| `first_term` | `first_term` |
| `first_referrer` | `first_referrer` |
| `first_landing_page` | `first_landing_page` |
| `first_gclid` | `first_gclid` |
| `first_gbraid` | `first_gbraid` |
| `first_wbraid` | `first_wbraid` |
| `first_fbclid` | `first_fbclid` |
| `last_touch_at` | `last_touch_at` |
| `last_source` | `last_source` |
| `last_medium` | `last_medium` |
| `last_campaign` | `last_campaign` |
| `last_campaign_id` | `last_campaign_id` |
| `last_content` | `last_content` |
| `last_term` | `last_term` |
| `last_referrer` | `last_referrer` |
| `last_landing_page` | `last_landing_page` |
| `last_gclid` | `last_gclid` |
| `last_gbraid` | `last_gbraid` |
| `last_wbraid` | `last_wbraid` |
| `last_fbclid` | `last_fbclid` |

## Boundaries

G4 will persist leads and attribution in Supabase.
G5 will add WhatsApp-specific attribution, click logging, and `whatsapp_ref`.
MS-Gates will reuse the same attribution principles for Raio-X when the app
exists.
