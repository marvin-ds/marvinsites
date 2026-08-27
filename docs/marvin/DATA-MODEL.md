# Marvin Sites — Modelo de Dados Supabase

**Versão:** 1.0 | **Data-base:** 27/08/2026

---

## `leads`

```text
id uuid pk
created_at timestamptz
updated_at timestamptz
last_activity_at timestamptz
name text
business_name text
phone_raw text
phone_normalized text
email_raw text nullable
email_normalized text nullable
city text
state text nullable
segment text
digital_presence_url text nullable
source_type text
status text
qualified boolean nullable
lost_reason text nullable
landing_version text
offer_version text
tracking_version text
environment text
```

Status possíveis:

```text
new
contacted
qualified
unqualified
diagnostic_in_progress
diagnostic_delivered
proposal_sent
checkout_sent
won
lost
customer
canceled
```

---

## `lead_attribution`

```text
id uuid pk
lead_id uuid fk
first_touch_at timestamptz
first_source text
first_medium text
first_campaign text
first_campaign_id text nullable
first_content text nullable
first_term text nullable
first_referrer text nullable
first_landing_page text
first_gclid text nullable
first_gbraid text nullable
first_wbraid text nullable
first_fbclid text nullable
last_touch_at timestamptz
last_source text
last_medium text
last_campaign text
last_campaign_id text nullable
last_content text nullable
last_term text nullable
last_referrer text nullable
last_landing_page text
last_gclid text nullable
last_gbraid text nullable
last_wbraid text nullable
last_fbclid text nullable
session_id text nullable
```

First-touch é imutável. Last-touch pode ser atualizado.

---

## `lead_consents`

```text
id uuid pk
lead_id uuid nullable
session_id text nullable
privacy_ack boolean
diagnostic_contact_allowed boolean
email_marketing_opt_in boolean
whatsapp_marketing_opt_in boolean default false
analytics_storage text
ad_storage text
ad_user_data text
ad_personalization text
consent_version text
policy_version text
source text
created_at timestamptz
updated_at timestamptz
```

---

## `lead_status_history`

```text
id uuid pk
lead_id uuid
from_status text nullable
to_status text
changed_at timestamptz
changed_by uuid nullable
reason text nullable
event_id uuid
```

---

## `diagnostics`

```text
id uuid pk
lead_id uuid
created_at timestamptz
delivered_at timestamptz nullable
score numeric nullable
status text
summary text nullable
strengths jsonb
opportunities jsonb
criteria jsonb
recommended_plan text nullable
version text
```

---

## `deals`

```text
id uuid pk
lead_id uuid
created_at timestamptz
status text
plan_code text
setup_value numeric
monthly_value numeric
currency text default 'BRL'
proposal_sent_at timestamptz nullable
checkout_sent_at timestamptz nullable
won_at timestamptz nullable
lost_at timestamptz nullable
lost_reason text nullable
```

---

## `checkout_sessions`

```text
id uuid pk
deal_id uuid
lead_id uuid
token_hash text
created_at timestamptz
expires_at timestamptz nullable
clicked_at timestamptz nullable
atomicat_checkout_url text
atomicat_reference text nullable
attribution_snapshot jsonb
```

---

## `payments`

```text
id uuid pk
lead_id uuid
deal_id uuid
created_at timestamptz
paid_at timestamptz nullable
provider text
provider_payment_id text nullable
payment_method text
status text
amount numeric
currency text
manual_reference text nullable
event_id uuid
```

Métodos:

```text
atomicat_card
atomicat_pix
pix_manual
other
```

---

## `subscriptions`

```text
id uuid pk
lead_id uuid
deal_id uuid
provider text
provider_subscription_id text nullable
plan_code text
monthly_value numeric
status text
started_at timestamptz
next_billing_at timestamptz nullable
canceled_at timestamptz nullable
cancel_reason text nullable
```

---

## `provider_webhook_events`

```text
id uuid pk
provider text
provider_event_id text
event_type text
received_at timestamptz
processed_at timestamptz nullable
status text
payload_hash text
error_message text nullable
```

---

## `conversion_queue`

```text
id uuid pk
lead_id uuid
deal_id uuid nullable
payment_id uuid nullable
conversion_type text
conversion_time timestamptz
conversion_value numeric nullable
currency text nullable
gclid text nullable
gbraid text nullable
wbraid text nullable
email_normalized text nullable
phone_normalized text nullable
status text
attempt_count int
last_attempt_at timestamptz nullable
provider_response text nullable
event_id uuid
```

Tipos:

```text
qualified_lead
proposal_sent
purchase
```

---

## `email_subscriptions`

```text
id uuid pk
lead_id uuid
email_normalized text
status text
opt_in_at timestamptz nullable
opt_out_at timestamptz nullable
source text
consent_version text
```

---

## `email_events`

Eventos úteis:

```text
sent
delivered
bounced
complained
unsubscribed
```

---

## `audit_log`

Ações administrativas relevantes:

- mudança de status;
- marcação de PIX;
- alteração de valor;
- cancelamento;
- exclusão/anonimização;
- reenvio de conversão.
