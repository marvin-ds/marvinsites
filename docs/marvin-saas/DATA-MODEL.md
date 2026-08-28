# Marvin Local — Modelo de Dados (SaaS-specific)

**Status:** DRAFT — Gate 0.5  
**Última atualização:** 27/08/2026

> Este documento cobre APENAS entidades específicas do produto SaaS (Raio-X, Radar, módulos).
> As entidades compartilhadas (businesses, leads, payments, etc.) estão em:
> [../marvin/DATA-MODEL.md](../marvin/DATA-MODEL.md)
>
> NÃO duplicar definições de leads, payments, subscriptions aqui.
> Referenciar o modelo compartilhado.

---

## Visão geral da hierarquia

```
business (docs/marvin/DATA-MODEL.md)
├── business_sources (docs/marvin/DATA-MODEL.md)
├── leads / contatos (docs/marvin/DATA-MODEL.md)
│   ├── lead_attribution
│   ├── lead_consents
│   └── lead_status_history
├── diagnostics / human_diagnostics (docs/marvin/DATA-MODEL.md)
├── deals (docs/marvin/DATA-MODEL.md)
├── payments (docs/marvin/DATA-MODEL.md)
├── subscriptions (docs/marvin/DATA-MODEL.md)
│
├── scan_runs          ← ESTE DOCUMENTO
│   ├── scan_checks    ← ESTE DOCUMENTO
│   ├── score_snapshots← ESTE DOCUMENTO
│   ├── issues         ← ESTE DOCUMENTO
│   └── recommendations← ESTE DOCUMENTO
│
└── FUTURO / NÃO IMPLEMENTAR AGORA:
    ├── business_memberships
    ├── alerts
    ├── feature_entitlements
    ├── competitors
    ├── review_campaigns
    ├── tracked_links
    ├── attribution_events
    └── service_requests
```

---

## Entidades Raio-X — IMPLEMENTAR NO MS-G2

### scan_runs

Cada execução do scanner para um negócio.

| Campo | Tipo | Notas |
|---|---|---|
| id | uuid | PK |
| business_id | uuid | FK → businesses.id |
| created_at | timestamptz | |
| completed_at | timestamptz | nullable |
| status | text | `pending` / `running` / `complete` / `partial` / `failed` |
| score | integer | nullable — null se partial ou failed; 0–100 se complete |
| score_version | text | ex: `"raiox-v1"` — muda quando pesos/thresholds mudam |
| scanner_version | text | versão do motor do scanner |
| check_version | text | versão da lógica dos checks |
| category_scores | jsonb | `{A: int, B: int, C: int, D: int, E: int}` nullable |
| checks | jsonb | array de check results — ver SCORING-SPEC evidence contract |
| priorities | jsonb | array top 3 — ver SCORING-SPEC recommendation contract |
| source | text | web / api / internal |
| trigger | text | user_request / scheduled / manual |

**Invariante:** se `status = "partial"` ou `"failed"`, `score = null` e `category_scores = null`. Se `status = "complete"`, `score` é inteiro entre 0 e 100.

**RLS:** usuário só vê scans de negócios que tem acesso.

---

### scan_checks

Resultado individual de cada verificação.

| Campo | Tipo | Notas |
|---|---|---|
| id | uuid | PK |
| scan_run_id | uuid | FK → scan_runs.id |
| check_code | text | ex: https_enabled, whatsapp_link_present |
| category | text | área do score |
| result | text | pass / fail / unavailable |
| points_possible | integer | max pontos deste check |
| points_awarded | integer | pontos concedidos |
| evidence | jsonb | dado bruto que justifica o resultado |
| check_version | text | versão da lógica deste check |
| created_at | timestamptz | |

---

### score_snapshots

Score consolidado por área, gerado ao final do scan.

| Campo | Tipo | Notas |
|---|---|---|
| id | uuid | PK |
| scan_run_id | uuid | FK → scan_runs.id |
| business_id | uuid | FK → businesses.id |
| created_at | timestamptz | |
| total_score | integer | 0–100 |
| area_scores | jsonb | {area: pontos, ...} |
| score_version | text | |

---

### issues

Problemas identificados no scan.

| Campo | Tipo | Notas |
|---|---|---|
| id | uuid | PK |
| scan_run_id | uuid | FK → scan_runs.id |
| business_id | uuid | FK → businesses.id |
| check_code | text | check que gerou o issue |
| category | text | área |
| severity | text | high / medium / low |
| status | text | open / resolved |
| created_at | timestamptz | |
| resolved_at | timestamptz | nullable |

---

### recommendations

Top 3 prioridades geradas para o resultado.

| Campo | Tipo | Notas |
|---|---|---|
| id | uuid | PK |
| scan_run_id | uuid | FK → scan_runs.id |
| business_id | uuid | FK → businesses.id |
| rank | integer | 1, 2 ou 3 |
| issue_code | text | check_code que gerou |
| message_key | text | chave de mensagem ao usuário |
| category | text | |
| created_at | timestamptz | |

---

## Entidades futuras — NÃO IMPLEMENTAR AGORA

Documentar apenas para evitar surpresas arquiteturais:

### business_memberships
Relaciona usuários autenticados com negócios (necessário para Radar).

### alerts
Alertas disparados pelo Guardião Marvin (uptime, SSL, WhatsApp down).

### feature_entitlements
Módulos contratados por subscription (Radar, Avaliações, Concorrentes).

### competitors
Concorrentes selecionados pelo cliente para comparação mensal.

### review_campaigns
Campanhas de avaliação (Marvin Avaliações).

### tracked_links
Links rastreáveis gerados pelo Marvin Origem.

### attribution_events
Eventos de atribuição de contatos WhatsApp/site (Marvin Origem).

### service_requests
Pedidos de execução humana gerados pelo dashboard.

---

## Notas de implementação para MS-G2

1. Criar migrations aditivas — nunca destrutivas
2. RLS obrigatório em todas as tabelas
3. Nenhuma service key no browser
4. `scan_runs.status = partial` quando dados de API externa falharem (não penalizar negócio)
5. `evidence` em `scan_checks` deve ter tamanho controlado — não armazenar HTML completo
6. Indexar: `business_id`, `scan_run_id`, `status`, `created_at`

---

*Referência: [../marvin/DATA-MODEL.md](../marvin/DATA-MODEL.md) (entidades compartilhadas)*
