# Marvin Sites — Especificação de Tracking

**Versão:** 1.0 | **Data-base:** 27/08/2026

---

## GTM e GA4

### GTM

Camada central de governança de tags.

Container com:
- versionamento;
- naming convention;
- consent checks;
- ambientes.

### GA4

Usado para:
- comportamento;
- funil;
- origem;
- eventos;
- conteúdo.

Nunca enviar PII.

### Vinculação

GA4 ↔ Google Ads obrigatória antes de mídia.

---

## Eventos browser

- `page_view`
- `diagnostic_view`
- `diagnostic_start`
- `diagnostic_submit`
- `whatsapp_click`
- `plan_view`
- `plan_cta_click`
- `example_view`
- `faq_open`

`diagnostic_submit` só dispara após sucesso server-side.

`whatsapp_click` deve carregar `placement`:

```text
header
floating
hero
plans
faq
diagnostic
footer
```

---

## Eventos server-side

- `lead_created`
- `lead_contacted`
- `lead_qualified`
- `lead_unqualified`
- `diagnostic_delivered`
- `proposal_sent`
- `checkout_link_sent`
- `checkout_clicked`
- `purchase`
- `subscription_started`
- `subscription_renewed`
- `subscription_failed`
- `subscription_canceled`
- `refund`
- `lead_lost`

---

## Google Ads — conversões

### Lançamento

Primária:

`diagnostic_submit`

Secundárias/observação:

- `whatsapp_click`
- `qualified_lead`
- `purchase`

Depois de volume consistente, migrar otimização para `qualified_lead` e posteriormente testar `purchase` como principal.

Valores:
- `purchase`: setup real pago;
- mensalidade fica no banco para LTV real;
- não inflar conversão com LTV previsto antes de dados.

---

## Conversões Otimizadas / Offline

A arquitetura deve permitir:

- conversões otimizadas para Web;
- conversões otimizadas para leads;
- conversões offline via Google Ads Data Manager.

O pipeline de 2026 deve usar a arquitetura vigente do Data Manager, evitando fluxos legados.

---

## Atribuição first-touch e last-touch

Capturar:

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
referrer
landing_page
timestamp
```

Ativar auto-tagging do Google Ads.

Quando permitido pelo consentimento:
- persistir atribuição first-party por até 90 dias;
- first-touch imutável;
- last-touch atualizado.

---

## WhatsApp — atribuição determinística

Ao clicar:

1. recuperar/criar `session_id`;
2. registrar `whatsapp_click`;
3. gerar `whatsapp_ref`;
4. abrir WhatsApp com mensagem pré-preenchida.

Exemplo:

> Oi! Quero entender qual presença local faz sentido para meu negócio. [MS-7K4P]

No CRM, o código liga a conversa à sessão/lead e preserva a atribuição.

---

## UTM

Padrão:

```text
utm_source=google
utm_medium=cpc
utm_campaign={objetivo_nicho_regiao}
utm_content={anuncio_variacao}
utm_term={keyword}
utm_id={campaign_id}
```

Guardar IDs reais além de nomes legíveis.

---

## Versionamento

Todo lead guarda:

```text
landing_version
offer_version
tracking_version
consent_version
```

---

## Conversões offline — pipeline

### Fase 1

Validar manualmente via exportação do Supabase e upload no Google Ads Data Manager.

### Fase 2

Automatizar worker/Edge Function:

1. busca pending;
2. normaliza;
3. aplica hash quando exigido;
4. envia;
5. grava resposta;
6. retry;
7. dead-letter.

Deduplicação:

```text
event_id + conversion_type
```

Compra usa `payment_id`.

---

## Métricas

### Aquisição
- sessões;
- CPC;
- CTR;
- termos;
- custo.

### Página
- diagnostic_start rate;
- diagnostic_submit rate;
- whatsapp_click rate;
- plan_view;
- plan_cta_click.

### Qualidade
- % qualified;
- % diagnostic_delivered;
- % proposal_sent.

### Venda
- close rate;
- CAC;
- setup médio;
- mensalidade média.

### Recorrência
- MRR;
- churn;
- tempo ativo;
- receita acumulada;
- suporte por plano.

### Econômica
- payback CAC;
- margem por plano;
- CAC por nicho;
- CAC por campanha;
- receita por origem.
