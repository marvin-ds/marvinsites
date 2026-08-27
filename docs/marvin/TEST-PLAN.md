# Marvin Sites — Plano de Testes

**Versão:** 1.0 | **Data-base:** 27/08/2026

---

## Testes automatizados mínimos

### Unitários
- UTM parser;
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
