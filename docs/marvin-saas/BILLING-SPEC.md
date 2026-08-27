# Marvin Local — Billing Spec

**Status:** DRAFT — Gate 0.5 (contrato, não integração)  
**Integração real:** MS-G14  
**Última atualização:** 27/08/2026

---

## Ferramenta preferencial

**Atomicat** será preferencialmente reutilizada para cobrança Radar, se tecnicamente adequada.

> Integração real somente no MS-G14.
> Não integrar Atomicat neste Gate.

---

## Validações necessárias antes de MS-G14

| Item | Status |
|---|---|
| Checkout de assinatura recorrente | EXTERNAL VERIFICATION REQUIRED |
| Webhook de pagamento confirmado | EXTERNAL VERIFICATION REQUIRED |
| external_reference / metadata | EXTERNAL VERIFICATION REQUIRED |
| Status de assinatura (ativo/cancelado) | EXTERNAL VERIFICATION REQUIRED |
| Ambiente de teste (sandbox) | EXTERNAL VERIFICATION REQUIRED |
| Cancelamento e refund | EXTERNAL VERIFICATION REQUIRED |
| Identificação do cliente na Atomicat | EXTERNAL VERIFICATION REQUIRED |

Não programar dependência rígida antes do teste real.

---

## Integração com Supabase

Supabase é a fonte de verdade de pagamentos e assinaturas.

Fluxo planejado (ver docs/marvin/ATOMICAT-INTEGRATION.md para referência do site):

```
Checkout Atomicat
↓
Webhook → POST /api/webhooks/atomicat
↓
Supabase: subscriptions + feature_entitlements
↓
RLS controla acesso às features
```

---

## Hipótese de preços Radar

| Produto | Hipótese | Status |
|---|---|---|
| Radar Beta | R$39–49/mês | hypothesis |
| Avaliações add-on | +R$29 | hypothesis |
| Local bundle | R$99–129 | hypothesis |
| Local Pro | R$149–197 | hypothesis |

Não tratar como permanente. Validar com dados reais após MS-G15.

---

## Regra de entitlement

`feature_entitlements` controlará o que cada subscription tem acesso.

`subscriptions.status = active` → entitlement válido.
`subscriptions.status != active` → bloquear acesso ao dashboard.

RLS + checks de entitlement antes de renderizar dados de scan.

---

*Referência: [../marvin/ATOMICAT-INTEGRATION.md](../marvin/ATOMICAT-INTEGRATION.md)*
