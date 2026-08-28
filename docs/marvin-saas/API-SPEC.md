# Marvin Local — API Spec

**Status:** DRAFT — Gate 0.5 (contratos futuros, sem implementação)  
**Última atualização:** 27/08/2026

> Endpoints abaixo são contratos conceituais.
> Paths, métodos e schemas podem mudar antes do MS-G3/G7.

---

## Princípios

- Nunca expor APIs externas (Google Places, Resend, Atomicat) diretamente ao browser
- Todos os endpoints com secrets rodam em Edge Function ou server-side
- PII nunca vai em URL params ou query strings
- Rate limit em todos os endpoints públicos
- Idempotência onde relevante

---

## Endpoints planejados — Raio-X

### POST /api/raiox/business-search

**Propósito:** buscar negócio no Google Places.

**Request:**
```json
{
  "query": "string",
  "city": "string"
}
```

**Response:**
```json
{
  "results": [
    {
      "place_id": "string",
      "name": "string",
      "address": "string",
      "category": "string"
    }
  ]
}
```

**Auth:** sem autenticação (público)  
**Rate limit:** por IP + por sessão  
**PII:** query não deve conter dados pessoais  
**Notas:** place_id retornado ao frontend apenas para confirmação — não armazenar antes da confirmação

---

### POST /api/raiox/business-confirm

**Propósito:** usuário confirma o negócio correto.

**Request:**
```json
{
  "place_id": "string",
  "session_token": "string"
}
```

**Response:**
```json
{
  "business_details": {
    "name": "string",
    "address": "string",
    "website": "string",
    "phone": "string",
    "category": "string",
    "hours": "object | null",
    "rating": "number | null",
    "review_count": "integer | null"
  },
  "confirm_token": "string"
}
```

**Auth:** sem autenticação  
**Rate limit:** por IP  
**Notas:** business_details retornado para exibição, não para armazenamento direto

---

### POST /api/raiox/submit

**Propósito:** usuário submete contato e inicia scan.

**Request:**
```json
{
  "confirm_token": "string",
  "contact": {
    "name": "string",
    "company": "string",
    "whatsapp": "string",
    "city": "string"
  },
  "website_url": "string | null",
  "consent": true,
  "utm": {
    "source": "string | null",
    "medium": "string | null",
    "campaign": "string | null"
  }
}
```

**Response:**
```json
{
  "scan_token": "string",
  "status": "pending"
}
```

**Auth:** sem autenticação  
**Rate limit:** por IP + por telefone  
**Idempotência:** mesmo telefone + mesmo place_id na mesma janela → retorna scan existente  
**PII:** name/whatsapp armazenados no Supabase com RLS — nunca em logs

---

### POST /api/raiox/scan (interno)

**Propósito:** executa o scan (chamado internamente pelo submit ou por Edge Function).

**Não exposto diretamente ao browser.**

---

### GET /api/raiox/result/{scan_token}

**Propósito:** busca resultado do scan para exibição.

**Response:**
```json
{
  "status": "completed | pending | partial | failed",
  "score": 64,
  "areas": {
    "presence": { "score": 18, "max": 25 },
    "site": { "score": 20, "max": 25 },
    "contact": { "score": 12, "max": 20 },
    "trust": { "score": 8, "max": 15 },
    "technical": { "score": 6, "max": 15 }
  },
  "priorities": [
    {
      "rank": 1,
      "check_code": "whatsapp_link_present",
      "message": "Não encontramos link de WhatsApp na página principal."
    }
  ],
  "scan_version": "1.0",
  "scan_at": "2026-08-27T..."
}
```

**Auth:** sem autenticação (token no path é opaco e temporário)  
**Expiração:** scan_token expira após janela de sessão

---

## Endpoints futuros (documentar, não implementar agora)

```
POST /api/radar/subscribe
GET  /api/radar/dashboard/{business_id}
GET  /api/radar/history/{business_id}
POST /api/service-request
POST /api/webhooks/atomicat
POST /api/webhooks/google-places (se aplicável)
```

---

## Erros padrão

| Código | Significado |
|---|---|
| 400 | Input inválido |
| 401 | Não autenticado (endpoints futuros) |
| 403 | Sem acesso ao recurso |
| 422 | Entidade inprocessável |
| 429 | Rate limit atingido |
| 500 | Erro interno |
| 503 | Serviço externo indisponível (Places, etc.) |

Erros 503 nunca devem penalizar o score do cliente.

---

## Contratos de resultado do Raio-X (MS-G0 APPROVED)

### Resultado complete

```json
{
  "status": "complete",
  "score": 74,
  "score_version": "raiox-v1",
  "score_label": "Presença em desenvolvimento",
  "categories": {
    "A": { "name": "Presença e informações locais", "max": 25, "score": 22 },
    "B": { "name": "Site e clareza", "max": 25, "score": 25 },
    "C": { "name": "Contato e WhatsApp", "max": 20, "score": 14 },
    "D": { "name": "Confiança e reputação", "max": 15, "score": 8 },
    "E": { "name": "Saúde técnica", "max": 15, "score": 5 }
  },
  "priorities": [
    {
      "rank": 1,
      "recommendation_group": "contact_whatsapp",
      "message_key": "no_whatsapp",
      "finding_title": "string",
      "recommended_action": "string",
      "journey_impact": "chamar"
    }
  ],
  "scanner_version": "string",
  "check_version": "string",
  "evaluated_at": "ISO8601"
}
```

### Resultado partial

```json
{
  "status": "partial",
  "score": null,
  "score_version": "raiox-v1",
  "available_findings": ["check_code_1", "check_code_2"],
  "retry_allowed": true,
  "evaluated_at": "ISO8601"
}
```

### Resultado failed

```json
{
  "status": "failed",
  "score": null,
  "retry_allowed": true,
  "evaluated_at": "ISO8601"
}
```
