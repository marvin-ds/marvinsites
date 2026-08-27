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

## Decisões pendentes / em aberto

| ID | Assunto | Status |
|---|---|---|
| — | Preço exato do Radar (R$39 ou R$49?) | hypothesis — aguardar dados |
| — | Sequência UX do Raio-X (captura antes ou depois do resultado?) | a testar no V1 |
| — | Nome do projeto Supabase | marvin-platform-prod ou marvin-sites-prod (não recrie se já existe) |
| MS-G0 | Pontos individuais de cada check | PENDING — fechar antes de programar |
| MS-G0 | Regra de partial scan | PENDING |
| MS-G0 | Thresholds de avaliação Google | PENDING |
