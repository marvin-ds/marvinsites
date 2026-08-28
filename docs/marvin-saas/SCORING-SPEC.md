# SCORING-SPEC — Raio-X V1 APPROVED

**score_version:** `raiox-v1`  
**Status:** APPROVED — MS-G0  
**Data:** 2026-08-28  

---

## Definição do produto

O **Raio-X Marvin** avalia automaticamente a presença digital local de um pequeno negócio e produz o **Score da Presença Digital** — uma pontuação de 0 a 100.

**O score mede:** quão bem o negócio está visível, compreensível, confiável e acessível online.

**O score NÃO promete:**
- Topo do Google
- Mais clientes ou mais vendas
- Desempenho competitivo frente a concorrentes

**Linguagem ao usuário:** "Score da Presença Digital" — nunca "nota da empresa" ou "nota de qualidade".

---

## Princípios

1. **Determinístico:** mesmos dados + mesma `score_version` + mesma `check_version` = mesmo resultado, sempre.
2. **Explicável:** cada ponto tem origem em um check específico com evidência documentada.
3. **Versionado:** todo resultado carrega `score_version`, `scanner_version`, `check_version`, `evaluated_at`.
4. **Reproduzível:** dois sistemas independentes com o mesmo input chegam ao mesmo resultado.

**IA NÃO atribui pontos.**  
**IA NÃO define resultado de checks.**  
**IA NÃO ordena o Top 3.**  
**IA NÃO define severidade.**  
**IA NÃO cria evidência factual.**

---

## Registry Table — Fonte de Verdade Única

Total de pontos: **100**

| check_code | category | max_points | evaluation_rule | degraded_rule | severity | journey | recommendation_group | source | availability_behavior | message_key |
|---|---|---|---|---|---|---|---|---|---|---|
| business_found_google | A | 8 | pass se Place ID encontrado e ativo via API | — | critical | encontrar | google_presence | google_places | unavailable se API falhou | gmb_not_found |
| category_present | A | 4 | pass se category não vazia no retorno Google | — | high | encontrar | business_info | google_places | unavailable se business_found=unavailable | gmb_no_category |
| address_or_service_area_present | A | 4 | pass se address ou service_area presentes | — | high | encontrar | business_info | google_places | unavailable se business_found=unavailable | gmb_no_address |
| phone_present_google | A | 3 | pass se phone não vazio no Google | — | high | chamar | contact_phone | google_places | unavailable se business_found=unavailable | gmb_no_phone |
| hours_present | A | 3 | pass se opening_hours presentes | — | medium | entender | business_info | google_places | unavailable se business_found=unavailable | gmb_no_hours |
| website_present_google | A | 3 | pass se website_url presente no Google | — | medium | entender | google_presence | google_places | unavailable se business_found=unavailable | gmb_no_website |
| website_identified | B | 5 | pass se URL do site resolvida com sucesso (2xx) | — | high | entender | website_presence | site_scanner | fail se 4xx/5xx/loop; unavailable se scanner interno indisponível | no_website |
| title_present | B | 3 | pass se `<title>` não vazio e ≤ 120 chars | — | medium | entender | website_clarity | site_scanner | 0 se website_identified=fail | no_title |
| meta_description_present | B | 3 | pass se `<meta name="description">` presente e não vazia | — | low | encontrar | website_clarity | site_scanner | 0 se website_identified=fail | no_meta_description |
| h1_present | B | 3 | pass se ao menos um `<h1>` presente | — | medium | entender | website_clarity | site_scanner | 0 se website_identified=fail | no_h1 |
| services_signal_present | B | 4 | pass se palavras-chave de serviços detectadas no HTML | — | high | entender | website_clarity | site_scanner | 0 se website_identified=fail | no_services_signal |
| location_signal_present | B | 4 | pass se cidade/bairro/região detectada no HTML | — | high | encontrar | local_relevance | site_scanner | 0 se website_identified=fail | no_location_signal |
| business_description_signal_present | B | 3 | pass se parágrafo descritivo detectado no HTML | — | medium | confiar | website_clarity | site_scanner | 0 se website_identified=fail | no_description_signal |
| phone_visible_site | C | 4 | pass se número de telefone visível no HTML | — | high | chamar | contact_phone | site_scanner | 0 se website_identified=fail | no_phone_visible |
| tel_link_present | C | 3 | pass se `<a href="tel:...">` presente | — | medium | chamar | contact_phone | site_scanner | 0 se website_identified=fail | no_tel_link |
| whatsapp_link_present | C | 6 | pass se link wa.me ou api.whatsapp.com presente | — | critical | chamar | contact_whatsapp | site_scanner | 0 se website_identified=fail | no_whatsapp |
| contact_form_or_link_present | C | 3 | pass se formulário ou página /contato detectada | — | medium | chamar | contact_path | site_scanner | 0 se website_identified=fail | no_contact_form |
| contact_cta_present | C | 4 | pass se CTA de contato visível (botão/link proeminente) | — | high | chamar | contact_path | site_scanner | 0 se website_identified=fail | no_contact_cta |
| google_rating_available | D | 2 | pass se rating presente no retorno Google | — | medium | confiar | reputation | google_places | unavailable se business_found=unavailable | no_rating |
| google_rating_quality | D | 4 | DEGRADED: 4=rating≥4.5; 2=4.0–4.4; 0=<4.0 | ver regra degraded | high | confiar | reputation | google_places | 0 se google_rating_available=fail | low_rating |
| review_count_signal | D | 5 | DEGRADED: 5=≥20; 4=10–19; 3=5–9; 1=1–4; 0=0 | ver regra degraded | high | confiar | reputation | google_places | 0 se business_found=fail | low_reviews |
| testimonials_signal_site | D | 2 | pass se depoimentos detectados no HTML | — | low | confiar | social_proof | site_scanner | 0 se website_identified=fail | no_testimonials |
| authority_about_team_signal | D | 2 | pass se página Sobre/Equipe detectada | — | medium | confiar | authority | site_scanner | 0 se website_identified=fail | no_authority |
| https_enabled | E | 3 | pass se URL começa com https:// | — | critical | confiar | security | site_scanner | 0 se website_identified=fail | no_https |
| tls_valid | E | 3 | pass se certificado TLS válido e não expirado | — | critical | confiar | security | site_scanner | 0 se website_identified=fail | invalid_tls |
| http_success | E | 4 | pass se resposta HTTP 2xx | — | critical | confiar | availability | site_scanner | 0 se website_identified=fail | http_error |
| mobile_viewport_present | E | 3 | pass se `<meta name="viewport">` presente | — | high | entender | mobile | site_scanner | 0 se website_identified=fail | no_viewport |
| redirect_chain_acceptable | E | 2 | DEGRADED: 2=0–2 redirects; 0=mais de 2 | ver regra degraded | low | confiar | redirects | site_scanner | 0 se website_identified=fail | long_redirect_chain |

### Totais por categoria

| Categoria | Nome | Pontos |
|---|---|---|
| A | Presença e informações locais | 25 |
| B | Site e clareza | 25 |
| C | Contato e WhatsApp | 20 |
| D | Confiança e reputação | 15 |
| E | Saúde técnica | 15 |
| **TOTAL** | | **100** |

Verificação: 8+4+4+3+3+3=25 ✓ | 5+3+3+3+4+4+3=25 ✓ | 4+3+6+3+4=20 ✓ | 2+4+5+2+2=15 ✓ | 3+3+4+3+2=15 ✓

---

## Grupos de recomendação

| recommendation_group | Descrição |
|---|---|
| google_presence | Visibilidade no Google |
| business_info | Informações do negócio no Google |
| website_presence | Existência e acessibilidade do site |
| website_clarity | Clareza e conteúdo do site |
| local_relevance | Sinalização de localização |
| contact_phone | Telefone visível e clicável |
| contact_whatsapp | Link de WhatsApp |
| contact_path | Formulário e CTA de contato |
| reputation | Avaliações Google |
| social_proof | Depoimentos no site |
| authority | Página sobre / equipe |
| security | HTTPS e TLS |
| availability | Resposta HTTP do site |
| mobile | Compatibilidade mobile |
| redirects | Cadeia de redirecionamentos |

---

## Estados dos checks

| Estado | Significado |
|---|---|
| `pass` | Check passou — pontos concedidos |
| `degraded` | Check parcialmente atendido — pontos parciais conforme regra |
| `fail` | Check falhou — 0 pontos |
| `unavailable` | Dado não disponível por falha de infraestrutura (scanner Marvin ou API externa) |

---

## Estados do scan

| Status | Significado |
|---|---|
| `complete` | Todos os checks executados com sucesso |
| `partial` | Um ou mais checks com `unavailable` por falha de infraestrutura |
| `failed` | Scan inutilizável — retry permitido |

**Partial scan:** `score = null`. Não normalizar, não redistribuir pontos.  
**Failed scan:** `score = null`, `retry_allowed = true`.

---

## Regras de tratamento de erros

### Regra: negócio sem site

Se `website_identified = fail`, todos os checks dependentes de site recebem **0 pontos** (não `unavailable`).

Isso é dado do negócio, não erro do scanner. O zero reflete a ausência real.

Checks dependentes de site: todos os da categoria B (exceto `website_identified`), todos os da categoria C, `testimonials_signal_site`, `authority_about_team_signal` (categoria D), todos os da categoria E.

### Regra: erros externos

| Situação | Tratamento |
|---|---|
| Site retorna 404 ou 5xx | `fail` — 0 pontos |
| Certificado TLS inválido ou expirado | `fail` — 0 pontos |
| Loop de redirecionamento | `fail` — 0 pontos |
| Scanner Marvin indisponível | `unavailable` → scan `partial` |
| Google Places API indisponível | `unavailable` → scan `partial` |
| HTTP 403 / 429 / anti-bot | preferir `unavailable` → scan `partial` |

### Regra: negócio não encontrado na API

- API funcionou, negócio não encontrado: `business_found_google = fail` (0 pts), scan continua com checks do site se URL disponível.
- API falhou (erro de infraestrutura): `business_found_google = unavailable` → scan `partial`.

---

## Score labels

| Faixa | Label |
|---|---|
| 0–39 | Presença com lacunas importantes |
| 40–59 | Presença básica |
| 60–74 | Presença em desenvolvimento |
| 75–89 | Presença bem estruturada |
| 90–100 | Presença muito bem estruturada |

---

## Top 3 Prioridades — fórmula determinística

**NÃO usa IA.**

### Fórmula

```
priority_score = points_lost × severity_multiplier
```

| Severity | Multiplier |
|---|---|
| critical | 1.50 |
| high | 1.25 |
| medium | 1.00 |
| low | 0.75 |

`points_lost = max_points − points_awarded`

Para checks degraded: `points_lost = max_points − points_awarded` (ex: google_rating_quality com rating 4.2 → awarded=2, lost=2).

### Ordenação (desempate)

1. `priority_score` DESC
2. `severity` DESC (critical > high > medium > low)
3. `journey` — ordem: `chamar` > `encontrar` > `confiar` > `entender`
4. `max_points` DESC
5. `check_code` ASC (alfabético, determinístico)

### Regras de filtragem

- Checks com resultado `pass` → excluídos
- Checks com resultado `unavailable` → excluídos
- Máximo de **1 recomendação por `recommendation_group`**
- Retornar os 3 primeiros após filtragem e de-duplicação por grupo

### Prioridade especial sem site

Quando `website_identified = fail`:
- O grupo `website_presence` sobe como primeira prioridade consolidada
- Checks `title_present`, `h1_present`, `meta_description_present` NÃO aparecem separadamente no Top 3 (são consequência do mesmo problema)

---

## Contrato de evidência por check

```json
{
  "check_code": "whatsapp_link_present",
  "result": "fail",
  "max_points": 6,
  "points_awarded": 0,
  "evidence": {
    "url_scanned": "https://exemplo.com.br",
    "whatsapp_links_found": [],
    "patterns_checked": ["wa.me", "api.whatsapp.com"]
  },
  "source": "site_scanner",
  "evaluated_at": "2026-08-28T10:00:00Z",
  "check_version": "1.0"
}
```

---

## Contrato de mensagem por grupo (message contract)

Cada `recommendation_group` expõe os seguintes campos de mensagem ao usuário:

| Campo | Descrição |
|---|---|
| `finding_title` | Título curto do que foi encontrado |
| `what_we_found` | O que o Raio-X detectou (factual, sem jargão) |
| `why_it_matters` | Por que isso importa para o negócio |
| `recommended_action` | O que fazer para melhorar |
| `journey_impact` | Qual etapa da jornada é afetada (encontrar / entender / confiar / chamar) |

**Tom:** claro, humano, sem jargão técnico.

**Proibido usar:** "SEO on-page", "CTR", "TLS handshake", "schema markup", "indexação", "SERP".

---

## Versionamento

| Campo | Significado |
|---|---|
| `score_version` | Versão da fórmula de pesos e thresholds (`raiox-v1`) |
| `check_version` | Versão da lógica de cada check individual |
| `scanner_version` | Versão do motor do scanner |

Mudanças nos pesos ou thresholds → incrementar `score_version`.  
Mudanças na lógica de um check → incrementar `check_version` do check afetado.  
Determinismo: mesmos dados + mesma `score_version` + mesma `check_version` = mesmo resultado.

---

## Fixtures calculadas

> Os thresholds de avaliações são heurística V1 da Marvin — não são benchmark competitivo, não são média do setor e não são promessa de performance.

---

### Fixture A — Negócio muito bem estruturado

**Cenário:** Google completo, site completo, WhatsApp presente, boas avaliações, HTTPS, mobile.

| Categoria | Points |
|---|---|
| A | 25 (todos pass) |
| B | 25 (todos pass) |
| C | 20 (todos pass) |
| D | 2+4+5+2+2 = 15 (rating≥4.5, ≥20 reviews) |
| E | 15 (todos pass) |
| **Total** | **100** |

**Score label:** Presença muito bem estruturada  
**Scan status:** complete  
**Top 3:** nenhuma prioridade (todos pass)

---

### Fixture B — Bom Google + bom site + sem WhatsApp

**Cenário:** Google completo, site completo, sem link de WhatsApp, boa reputação.

| Categoria | Points |
|---|---|
| A | 25 |
| B | 25 |
| C | 4+3+0+3+4 = 14 (whatsapp_link_present=fail) |
| D | 15 |
| E | 15 |
| **Total** | **94** |

**Score label:** Presença muito bem estruturada  
**Scan status:** complete  
**Top 3:**
1. `contact_whatsapp` — whatsapp_link_present: 6pts × 1.50 = **9.0**
2. `contact_path` — contact_form_or_link_present: 0 pts? Não — C parcial só perdeu whatsapp. contact_form e cta = pass. Próximo check fail seria qualquer outro perdido.

*(Neste cenário, apenas whatsapp_link_present é fail. Top 3 tem 1 item.)*

---

### Fixture C — Excelente Google, sem site

**Cenário:** Google muito bem preenchido (rating≥4.5, ≥20 reviews), sem website.

| Check | Result | Points |
|---|---|---|
| business_found_google | pass | 8 |
| category_present | pass | 4 |
| address_or_service_area_present | pass | 4 |
| phone_present_google | pass | 3 |
| hours_present | pass | 3 |
| website_present_google | fail | 0 |
| website_identified | fail | 0 |
| *B dependentes* | 0 (regra no-site) | 0 |
| *C todos* | 0 (regra no-site) | 0 |
| google_rating_available | pass | 2 |
| google_rating_quality | pass (≥4.5) | 4 |
| review_count_signal | pass (≥20) | 5 |
| testimonials_signal_site | 0 (regra no-site) | 0 |
| authority_about_team_signal | 0 (regra no-site) | 0 |
| *E todos* | 0 (regra no-site) | 0 |

**Total: 8+4+4+3+3+0+0+0+0+2+4+5+0+0+0 = 33**

**Score label:** Presença com lacunas importantes  
**Scan status:** complete  
**Top 3:**
1. `website_presence` (consolidado — prioridade especial sem site)
2. `contact_whatsapp` — whatsapp_link_present: 6pts × 1.50 = 9.0
3. `availability` — http_success: 4pts × 1.50 = 6.0

---

### Fixture D — Site bom, negócio não encontrado no Google

**Cenário:** API funcionou, Place ID não encontrado. Site existe, funcional, com HTTPS.

| Categoria | Points |
|---|---|
| A | 0 (business_found_google=fail, demais dependem do Google) |
| B | 25 (site identificado, todos os checks pass) |
| C | 20 (WhatsApp presente, todos pass) |
| D | 0+0+0+2+2 = 4 (sem dados Google; testimonials e authority no site = pass) |
| E | 15 (HTTPS, TLS, HTTP 200, mobile, redirect OK) |
| **Total** | **64** |

**Score label:** Presença em desenvolvimento  
**Scan status:** complete  
**Top 3:**
1. `google_presence` — business_found_google: 8pts × 1.50 = **12.0**
2. `reputation` — google_rating_available: 2pts × 1.00 = 2.0; review_count: 5pts × 1.25 = 6.25 → review_count_signal é do mesmo grupo. Por de-dup: google_rating_quality (4pts × 1.25=5.0) também no grupo reputation. Top do grupo = review_count_signal (5×1.25=6.25).
3. `business_info` — address_or_service_area_present: 4pts × 1.25 = 5.0

*(google_presence=#1; reputation=#2; business_info=#3)*

---

### Fixture E — Site sem HTTPS e sem contato

**Cenário:** Google OK, site existe mas é HTTP puro, sem WhatsApp, sem telefone visível.

| Categoria | Points |
|---|---|
| A | 25 |
| B | 25 |
| C | 0+0+0+3+0 = 3 (apenas contact_form_or_link pass) |
| D | 2+4+5+0+0 = 11 (sem testimonials/authority no site) |
| E | 0+0+4+3+2 = 9 (https=fail, tls=fail, http=pass, mobile=pass, redirect=pass) |
| **Total** | **73** |

**Score label:** Presença em desenvolvimento  
**Scan status:** complete  
**Top 3:**
1. `contact_whatsapp` — whatsapp_link_present: 6pts × 1.50 = **9.0**
2. `security` — https_enabled: 3pts × 1.50 = 4.5 (de-dup: tls_valid também 4.5, mesmo grupo → 1 por grupo)
3. `contact_path` — contact_cta_present: 4pts × 1.25 = 5.0

*(contato whatsapp=#1; security=#2; contact_path=#3)*

---

### Fixture F — Poucas avaliações (degraded em review_count)

**Cenário:** Google bem preenchido, site completo, rating 4.2 (degraded), 6 reviews (degraded=3pts).

| Categoria | Points |
|---|---|
| A | 25 |
| B | 25 |
| C | 20 |
| D | 2+2+3+2+2 = 11 (rating_quality=2 pois 4.0–4.4; review_count=3 pois 5–9) |
| E | 15 |
| **Total** | **96** |

**Score label:** Presença muito bem estruturada  
**Scan status:** complete  
**Top 3:**
1. `reputation` — review_count_signal: lost=2pts × 1.25 = 2.5; google_rating_quality: lost=2pts × 1.25 = 2.5 → tie → severity igual (high) → journey igual (confiar) → max_points DESC: review_count(5) > rating_quality(4) → review_count vence → 1 por grupo
2. *(apenas grupo reputation tem pontos perdidos)*

*(Top 3 tem 1 item — restantes são pass)*

---

### Fixture G — API Google indisponível

**Cenário:** Scanner tenta chamar Google Places API, recebe erro de infraestrutura.

- Todos os checks de source=`google_places` → `unavailable`
- Checks de source=`site_scanner` → executados normalmente (se URL disponível)
- **Scan status:** `partial`
- **Score:** `null`
- `retry_allowed: true`

Top 3: não calculado (score=null).

---

### Fixture H — Scanner de site indisponível

**Cenário:** Google Places API OK, scanner do site falha por erro interno.

- Checks de source=`google_places` → executados normalmente
- Checks de source=`site_scanner` → `unavailable`
- **Scan status:** `partial`
- **Score:** `null`
- `retry_allowed: true`

Top 3: não calculado (score=null).

---

### Fixture I — No-site: Google muito bem preenchido, sem website

**Cenário:** rating≥4.5, ≥20 reviews, Google completo. Sem website declarado nem identificado.

Idêntico ao Fixture C (variante com avaliação perfeita):

| Categoria | Points |
|---|---|
| A | 8+4+4+3+3+0 = 22 |
| B | 0 |
| C | 0 |
| D | 2+4+5+0+0 = 11 |
| E | 0 |
| **Total** | **33** |

**Score label:** Presença com lacunas importantes  
**Scan status:** complete  
**Top 3:**
1. `website_presence` (prioridade especial no-site, consolidado)
2. `contact_whatsapp` — whatsapp_link_present: 6pts × 1.50 = 9.0
3. `availability` — http_success: 4pts × 1.50 = 6.0

**Impacto demonstrado:** um negócio com reputação perfeita no Google perde 67 pontos por não ter site. Isso evidencia o produto Marvin ao prospect.
