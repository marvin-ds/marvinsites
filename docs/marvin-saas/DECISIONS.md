# Marvin Local — Registro de Decisões

**Atualizar sempre que uma decisão técnica ou estratégica relevante for tomada.**

Numeração: D-MS### (separada dos D### de docs/marvin/DECISIONS.md)

---

## D-MS001 — 27/08/2026 — Plataforma modular única

**Decisão:** A Marvin não criará vários Micro-SaaS independentes. A arquitetura será uma única plataforma modular de Presença Digital Local.

**Sequência:** Raio-X → Radar → Avaliações → Concorrentes → Origem → Marvin Local

**Motivo:** Reduz risco financeiro, mantém foco, evita fragmentação de base.

**Status:** APPROVED

---

## D-MS002 — 27/08/2026 — Raio-X como porta gratuita principal

**Decisão:** Raio-X Marvin será gratuito e será a principal porta automatizada de diagnóstico.

**Promessa-base:** "Veja como sua empresa aparece para quem pesquisa."

**Motivo:** Escala o diagnóstico, reduz trabalho manual, qualifica leads antes do diagnóstico humano.

**Status:** APPROVED

---

## D-MS003 — 27/08/2026 — Diagnóstico humano preservado

**Decisão:** O Diagnóstico Humano NÃO será removido. Passa a ser o próximo passo de maior intenção depois do resultado automático.

**Novo fluxo:** Aquisição → Home → Raio-X → resultado → diagnóstico humano opcional → WhatsApp → proposta → serviço Marvin.

**Status:** APPROVED

---

## D-MS004 — 27/08/2026 — Radar é o primeiro SaaS recorrente

**Decisão:** Marvin Radar será o primeiro produto SaaS recorrente.

**Regra:** Não construir Avaliações, Concorrentes ou Origem antes de validar Radar.

**Critério mínimo:** 5–10 pagantes Radar antes de construir Avaliações.

**Status:** APPROVED

---

## D-MS005 — 27/08/2026 — Score determinístico

**Decisão:** A nota do Raio-X será determinística, explicável, versionada e reproduzível.

**Regra:**
- IA NÃO decide score
- IA NÃO inventa checks
- IA NÃO decide top 3
- IA poderá futuramente apenas explicar dados existentes

**Status:** APPROVED

---

## D-MS006 — 27/08/2026 — Raio-X sem conta obrigatória

**Decisão:** O Raio-X V1 não exigirá criação de conta antes do resultado.

Radar exigirá autenticação (magic link).

**Status:** APPROVED

---

## D-MS007 — 27/08/2026 — Supabase compartilhado

**Decisão:** Supabase será fonte de verdade compartilhada entre site institucional, CRM e SaaS.

**Regra de ouro:** NÃO existirão dois bancos comerciais, dois Supabases para a mesma operação inicial, dois CRMs, duas tabelas independentes de negócios, dois sistemas concorrentes de atribuição.

**Status:** APPROVED

---

## D-MS008 — 27/08/2026 — BUSINESS como entidade estrutural central

**Decisão:** BUSINESS passa a ser a entidade estrutural central da plataforma.

Um negócio pode ter: contatos/leads, scans, scores, issues, diagnóstico humano, deals, pagamentos, assinatura, futuramente Radar.

**Impacto no G1:** O schema Supabase do Gate 1 deve nascer com `businesses` como entidade central, não apenas `leads`.

**Status:** APPROVED

---

## D-MS009 — 27/08/2026 — Cutover da home somente no MS-G10

**Decisão:** O CTA atual "Diagnóstico gratuito" continuará funcionando até o Raio-X estar pronto para produção.

NÃO retirar o fluxo atual prematuramente. O cutover da home só acontece no MS-G10.

**Status:** APPROVED

---

## D-MS010 — 27/08/2026 — Home continua vendendo presença digital local

**Decisão:** A home continua vendendo PRESENÇA DIGITAL LOCAL. Raio-X é mecanismo de aquisição, não o assunto principal da marca.

A home NÃO deve parecer site de SaaS.

**Status:** APPROVED

---

## D-MS011 — 27/08/2026 — Desenvolvimento sob demanda validada

**Decisão:** Não desenvolver módulo futuro porque "parece interessante".

Regra: validar produto anterior antes de avançar. Usar critérios de validação documentados no MASTER-PLAN.

**Status:** APPROVED

---

## D-MS012 — 27/08/2026 — Dados Google com FieldMask e política

**Decisão:** Dados Google precisam respeitar política oficial, FieldMask mínimo, quotas, caching e regras de armazenamento.

`place_id` poderá ser usado como identificador persistente conforme especificação futura (ver GOOGLE-DATA-SPEC.md).

Não construir banco que simplesmente copie Google Maps.

Política oficial deverá ser revisada imediatamente antes do MS-G4.

**Status:** APPROVED

---

## D-MS013 — 28/08/2026 — Score V1 weights definitivos (raiox-v1)

**Decisão:** Os pesos finais do Score da Presença Digital V1 são:

| Categoria | Pontos |
|---|---|
| A — Presença e informações locais | 25 |
| B — Site e clareza | 25 |
| C — Contato e WhatsApp | 20 |
| D — Confiança e reputação | 15 |
| E — Saúde técnica | 15 |
| **Total** | **100** |

`score_version = "raiox-v1"`. Mudanças nos pesos ou thresholds exigem novo score_version.

**Status:** APPROVED — MS-G0

---

## D-MS014 — 28/08/2026 — No-site behavior

**Decisão:** Se `website_identified = fail`, todos os checks dependentes de site recebem **0 pontos** (não `unavailable`). Isso representa ausência real do negócio, não erro do scanner. O zero é intencional e reflete a oportunidade de melhoria. O grupo `website_presence` sobe como prioridade consolidada no Top 3.

**Status:** APPROVED — MS-G0

---

## D-MS015 — 28/08/2026 — Unavailable/partial behavior

**Decisão:** Falha de infraestrutura Marvin ou API externa → check = `unavailable`. Scan com qualquer `unavailable` → status = `partial`, score = `null`. Scan `partial` não normaliza nem redistribui pontos. Retry é permitido. Falha real do site (4xx, 5xx, cert inválido, loop) → check = `fail` (0 pts) — não é erro do scanner.

**Status:** APPROVED — MS-G0

---

## D-MS016 — 28/08/2026 — Review heuristics V1

**Decisão:** Thresholds de avaliações do Google para `review_count_signal`: ≥20=5pts; 10–19=4pts; 5–9=3pts; 1–4=1pt; 0=0pts. Para `google_rating_quality`: ≥4.5=4pts; 4.0–4.4=2pts; <4.0=0pts.

**Nota obrigatória:** Estes thresholds são heurística V1 da Marvin — não são benchmark competitivo, não são média do setor e não são promessa de performance. Revisão possível na V2 com dados reais de scans.

**Status:** APPROVED — MS-G0

---

## D-MS017 — 28/08/2026 — Top 3 formula e tie-break

**Decisão:** `priority_score = points_lost × severity_multiplier` onde critical=1.50, high=1.25, medium=1.00, low=0.75. Ordenação: priority_score DESC → severity DESC → journey (chamar>encontrar>confiar>entender) → max_points DESC → check_code ASC. Checks `pass` ou `unavailable` são excluídos. Máximo 1 recomendação por `recommendation_group`.

**Status:** APPROVED — MS-G0

---

## D-MS018 — 28/08/2026 — Recommendation deduplication

**Decisão:** O Top 3 exibe no máximo 1 recomendação por `recommendation_group`. Quando múltiplos checks do mesmo grupo falham, o de maior `priority_score` representa o grupo. Quando `website_identified=fail`, checks de clareza (title, h1, meta) não aparecem separadamente — são consolidados em `website_presence`.

**Status:** APPROVED — MS-G0

---

## D-MS019 — 28/08/2026 — Score versioning

**Decisão:** Três versões independentes: `score_version` (fórmula e pesos), `check_version` (lógica de cada check), `scanner_version` (motor do scanner). Mudança em qualquer peso ou threshold → novo `score_version`. Determinismo garantido: mesmos dados + mesma `score_version` + mesma `check_version` = mesmo resultado.

**Status:** APPROVED — MS-G0

---

## Decisões pendentes / em aberto

| ID | Assunto | Status |
|---|---|---|
| — | Preço exato do Radar (R$39 ou R$49?) | hypothesis — aguardar dados |
| — | Sequência UX do Raio-X (captura antes ou depois do resultado?) | a testar no V1 |
| — | Nome do projeto Supabase | marvin-platform-prod ou marvin-sites-prod (não recrie se já existe) |
