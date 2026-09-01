# Marvin Sites — Especificação de Privacidade e Consentimento

**Versão:** 1.0 | **Data-base:** 27/08/2026

---

## Consentimento e privacidade

### Banner

Substituir o banner atual por:

- **Aceitar todos**
- **Recusar não essenciais**
- **Preferências**

Categorias:
- necessários;
- analytics;
- publicidade/marketing.

### Consent Mode

Implementação inicial:

> **Google Consent Mode v2 — modo básico**

Default:

```text
analytics_storage = denied
ad_storage = denied
ad_user_data = denied
ad_personalization = denied
```

Depois da escolha, atualizar o estado.

### Formulário

Consentimento obrigatório apenas para processar o diagnóstico e responder ao pedido.

Marketing por e-mail deve ter opt-in separado.

Gate 4: o formulário envia dados pessoais para uma Netlify Function server-side,
que grava no Supabase. A chave `service_role` do Supabase fica somente no
ambiente server-side. Netlify Forms não é a fonte canônica do lead.

---

## Segurança Supabase

- RLS em tabelas com dados pessoais.
- `anon` não lê leads.
- formulário público não insere com `service_role` no cliente.
- submissão por endpoint server-side/Edge Function.
- painel administrativo autenticado.
- rate limit + honeypot + validação server-side.
- Turnstile apenas se houver abuso.
- logs sem telefone/e-mail completo.
- segredos somente em env vars.

---

## Retenção de dados

Política operacional inicial, sujeita à revisão jurídica/LGPD:

### Lead não convertido

PII por **24 meses a partir da última interação significativa**.

Depois:
- excluir/anonimizar PII;
- preservar apenas agregados sem identificação.

### Opt-out

- parar marketing imediatamente;
- remover de automações;
- manter apenas dado mínimo de supressão necessário para não reinscrever acidentalmente.

### Clientes

Registros contratuais/financeiros seguem retenção legal e contábil aplicável.

### Logs

- logs técnicos detalhados: 90 dias;
- payload sensível: minimizar e eliminar rapidamente.

### Job mensal

1. localizar elegíveis;
2. anonimizar/excluir PII;
3. preservar agregado;
4. registrar em `audit_log`.
