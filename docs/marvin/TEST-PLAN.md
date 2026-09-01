# Marvin Sites — Plano de Testes

**Versão:** 1.0 | **Data-base:** 27/08/2026

---

## Testes automatizados mínimos

### Unitários
- UTM parser;
- attribution `g3-v1`: first-touch, last-touch, click IDs, storage, session ID, sanitização;
- phone normalization;
- email normalization;
- status transitions;
- attribution merge;
- conversion dedupe;
- PIX purchase flow.

### Integração
- lead insert;
- consent insert;
- checkout session;
- webhook idempotency;
- conversion queue.

### E2E
- consent reject;
- consent accept;
- attribution capture with UTMs/click IDs;
- attribution hidden fields on diagnostic submit;
- diagnostic submit;
- WhatsApp click;
- checkout redirect;
- admin PIX;
- mobile.

---

## QA completo (Gate 14)

Testar:
- desktop;
- mobile;
- browsers;
- forms;
- consent;
- GTM;
- GA4;
- Ads;
- Supabase;
- WhatsApp;
- checkout;
- PIX;
- e-mail;
- SEO;
- 404;
- redirects;
- performance;
- accessibility;
- webhooks;
- idempotency;
- duplicate submits.

Critério: checklist crítico aprovado.

---

## Critério global de aceite por Gate

```text
Branch:
HEAD:
Working tree:
Origin/local:
Build:
Tests:
Preview:
Mudanças:
Migrations:
Env vars:
Tracking verificado:
Riscos:
Próximo Gate:
```

Build passando não é suficiente.

## Gate 3 — Attribution QA

Casos mínimos:

1. `?utm_source=google&utm_medium=cpc&utm_campaign=test-g3&utm_term=site`
   cria first-touch e last-touch.
2. Recarregar sem parâmetros preserva first-touch e last-touch útil.
3. Nova URL atribuída com Instagram mantém first-touch e atualiza last-touch.
4. `gclid`, `gbraid`, `wbraid` e `fbclid` são capturados separadamente.
5. URL direta inicial gera `direct / none`.
6. URL direta posterior não apaga contexto útil.
7. Referrer externo vira `referral`; referrer de busca conhecido vira `organic`.
8. Query string não whitelistada não entra em `landing_page`.
9. Storage inválido ou indisponível não quebra página, consentimento, formulário ou WhatsApp.
10. Formulário Netlify mantém `fetch POST /` e `/obrigado/`.

## Gate 4 — Lead Capture QA

Casos mínimos:

1. Payload válido cria `business`, `lead`, `lead_attribution` e `lead_consents`.
2. `lead_status_history` é criado pelo trigger existente.
3. Retry com mesmo `submission_id` não duplica lead nem business.
4. Falha no meio da operação não deixa registros parciais.
5. `anon` e `authenticated` continuam sem insert direto nas tabelas comerciais.
6. `SUPABASE_SERVICE_ROLE_KEY` não aparece em browser, resposta pública, docs ou logs.
7. Marketing consent permanece false sem opt-in explícito.
8. Consent Mode snapshot é gravado separadamente de consentimento de marketing.
9. Falha do endpoint não redireciona para `/obrigado/`.
10. `/obrigado/`, G2 consent e G3 attribution não sofrem regressão.
