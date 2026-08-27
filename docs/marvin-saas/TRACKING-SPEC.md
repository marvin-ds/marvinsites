# Marvin Local — Tracking Spec (SaaS)

**Status:** DRAFT — Gate 0.5  
**Última atualização:** 27/08/2026

> Este documento cobre eventos específicos do produto Raio-X / Radar.
> Eventos do site institucional, GTM, GA4, Ads e atribuição compartilhada estão em:
> [../marvin/TRACKING-SPEC.md](../marvin/TRACKING-SPEC.md)

---

## Estado atual vs futuro

| Evento | Estado | Observação |
|---|---|---|
| `diagnostic_start` | LEGACY CURRENT | fluxo diagnóstico manual atual |
| `diagnostic_submit` | LEGACY CURRENT | conversão principal hoje |
| `raiox_view` | FUTURE RAIO-X | quando Raio-X existir |
| `raiox_start` | FUTURE RAIO-X | |
| `business_search` | FUTURE RAIO-X | |
| `business_selected` | FUTURE RAIO-X | |
| `raiox_submit` | FUTURE RAIO-X | |
| `scan_started` | FUTURE RAIO-X | |
| `scan_completed` | FUTURE RAIO-X | |
| `scan_failed` | FUTURE RAIO-X | |
| `result_view` | FUTURE RAIO-X | |
| `human_diagnostic_click` | FUTURE RAIO-X | |
| `human_diagnostic_request` | FUTURE RAIO-X | |
| `radar_cta_click` | FUTURE RAIO-X | |

**CUTOVER CONDITION:** O tracking legacy só é substituído no MS-G10 — quando o Raio-X público substituir o CTA principal da home.

Não remover `diagnostic_start` / `diagnostic_submit` antes do MS-G10.

---

## Eventos Raio-X V1

### raiox_view
**Quando:** usuário chega na página/modal do Raio-X.  
**Parâmetros:** `{ source: string, utm_* }`

### raiox_start
**Quando:** usuário começa a preencher o formulário.  
**Parâmetros:** `{ source: string }`

### business_search
**Quando:** usuário submete busca do negócio.  
**Parâmetros:** `{ query: string, city: string }`  
**Nota:** não enviar PII para GA4.

### business_selected
**Quando:** usuário confirma o negócio encontrado.  
**Parâmetros:** `{ place_id_hashed: string, confidence: string }`  
**Nota:** nunca enviar `place_id` raw para GA4.

### raiox_submit
**Quando:** usuário submete contato para iniciar scan.  
**Parâmetros:** `{ city: string, segment: string }`  
**Nota:** nunca enviar WhatsApp/nome/e-mail para GA4.

### scan_started
**Quando:** backend confirma início do scan.  
**Parâmetros:** `{ scan_id_hashed: string }`

### scan_completed
**Quando:** scan concluído com sucesso.  
**Parâmetros:** `{ score: integer, duration_ms: integer }`

### scan_failed
**Quando:** scan falhou ou ficou partial.  
**Parâmetros:** `{ reason: string }`

### result_view
**Quando:** usuário vê o resultado.  
**Parâmetros:** `{ score: integer }`

### human_diagnostic_click
**Quando:** usuário clica no CTA de diagnóstico humano.  
**Parâmetros:** `{ score: integer, source: 'result_page' }`

### human_diagnostic_request
**Quando:** usuário completa formulário de diagnóstico humano (alta intenção).  
**Parâmetros:** `{ city: string, segment: string }`

### radar_cta_click
**Quando:** usuário clica no CTA do Radar (mesmo que esteja disabled/coming soon).  
**Parâmetros:** `{ score: integer, radar_available: boolean }`

---

## Eventos futuros (documentar, não implementar agora)

```
radar_checkout_start
radar_subscription_started
dashboard_view
alert_view
issue_service_click
service_request
subscription_canceled
reviews_module_started
competitor_added
origin_installed
tracked_whatsapp_click
customer_marked_won
```

---

## Google Ads — estratégia de conversão

| Fase | Evento de conversão | Status |
|---|---|---|
| Hoje | `diagnostic_submit` (quando implementado no G2) | LEGACY PLANNED |
| Raio-X V1 | `scan_completed` (candidato primário) | PLANNED — REQUIRES VALIDATION |
| Após volume | `human_diagnostic_request` | PLANNED |
| Após volume | `qualified_lead` | PLANNED |
| Após vendas | `purchase` | PLANNED |

**Regra:** não marcar `scan_completed` como conversão de produção antes de o Raio-X existir.
Registrar como PLANNED / REQUIRES VALIDATION.

---

## Regras gerais (herdadas de docs/marvin/TRACKING-SPEC.md)

- Nunca enviar PII para GA4
- Nunca enviar PII para GTM dataLayer
- Eventos de browser disparam somente após sucesso server-side
- Eventos de conversão de alto valor devem ter backend verification
- Consent Mode v2 default-denied (Gate 2 do site)

---

*Referência: [../marvin/TRACKING-SPEC.md](../marvin/TRACKING-SPEC.md) (tracking compartilhado)*
