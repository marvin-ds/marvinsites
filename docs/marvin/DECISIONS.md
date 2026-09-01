# Marvin Sites — Registro de Decisões

**Atualizar sempre que uma decisão técnica ou estratégica relevante for tomada.**

> Decisões específicas da Marvin Local / SaaS: [../marvin-saas/DECISIONS.md](../marvin-saas/DECISIONS.md)

---

## D020 — 28/08/2026 — Netlify build-ignore para mudanças sem impacto no site

**Decisão:** Script `scripts/netlify-ignore-build.mjs` cancela builds do Netlify quando TODOS os arquivos alterados estão em `docs/`, `supabase/` ou `apps/`. Qualquer arquivo fora dessas pastas gera build normalmente.

**Fail-safe:** incerteza = BUILD. O script nunca cancela em caso de erro ou sem commit range.

---

## D019 — 28/08/2026 — Sem repositório aninhado nem workspaces prematuros

**Decisão:** Monorepo com um único `package.json` na raiz. npm workspaces e `apps/marvin-app/` serão criados somente quando houver código real. Sem submodules. Sem pastas vazias para representar arquitetura futura.

---

## D018 — 28/08/2026 — Preview-first: desenvolvimento em branch, produção apenas no Gate aprovado

**Decisão:** Deploy de produção somente após Gate aprovado pelo operador e merge consolidado em `main`. Exceções: P0 (produção indisponível) e P1 urgente (fluxo comercial quebrado).

**Motivação:** Reduzir deploys desnecessários, manter produção estável e rastreável.

---

## D017 — 28/08/2026 — Supabase compartilhado (site + SaaS)

**Decisão:** Um único projeto Supabase (`dboihbvjtdlgvugjxaam`) serve tanto o site Netlify quanto o app Vercel futuro. Sem instâncias separadas por produto.

**Consequência:** Reforça D001. Dado que o Common Core já compartilha `businesses`, `leads` e atribuição, criar uma segunda instância geraria divergência e duplicação de PII.

---

## D016 — 28/08/2026 — Vercel para aplicações Marvin Local

**Decisão:** O app SaaS (`app.marvinsites.com.br`) será hospedado no Vercel com Root Directory `apps/marvin-app`. Configurar somente quando o projeto existir. Plano comercial a validar antes do lançamento.

---

## D015 — 28/08/2026 — Netlify para site institucional e aquisição

**Decisão:** Netlify é responsável por `marvinsites.com.br` — SEO, landing pages, conteúdo público, CTAs e aquisição. Não deve se transformar no host principal do SaaS.

---

## D014 — 28/08/2026 — Monorepo GitHub — um único repositório

**Decisão:** Um único repositório Git para site (Netlify), app futuro (Vercel) e schema Supabase. Estrutura: `src/` (site), `apps/` (SaaS futuro), `supabase/` (banco), `docs/`.

**Motivação:** Simplifica histórico, migrations versionadas lado a lado com código, e evita sincronização entre repos.

---

## D013 — 28/08/2026 — `human_diagnostics` em vez de `diagnostics`

**Decisão:** A tabela de análise manual da Marvin se chama `human_diagnostics`, não `diagnostics`. O scanner automático do Raio-X usará tabelas separadas (`scan_runs`, `scan_checks`) no MS-G2.

**Motivação:** Evitar ambiguidade futura entre diagnóstico humano e scan automático.

---

## D012 — 28/08/2026 — Supabase CLI como devDependency versionada

**Decisão:** Supabase CLI instalado via `npm install --save-dev supabase` (v2.116.0). Schema nasce integralmente de migrations versionadas no repositório. Nenhuma edição manual pelo dashboard.

---

## D009 — 27/08/2026 — Gate 0.5: Arquitetura Marvin Local incorporada

**Decisão:** A Marvin Local / Micro-SaaS foi formalmente incorporada à arquitetura do projeto. O Supabase será compartilhado entre site, CRM e SaaS. `businesses` passa a ser a entidade estrutural central. O Raio-X Marvin é a futura porta principal de aquisição.

**Consequência:** G1 deve nascer com `businesses` como entidade central. A UX definitiva do diagnóstico manual (G4) não deve ser construída para ser substituída logo depois; G4 deve entregar "Lead Capture Foundation" sem dependência de UX específica. G12/G13 do site ficam em interlock com MS-G10 (Raio-X público).

**Referência:** docs/marvin-saas/DECISIONS.md D-MS001 a D-MS012.

---

## D010 — 27/08/2026 — G4 renomeado: Lead Capture Foundation

**Decisão:** O Gate 4 não deve construir uma UX específica de "formulário diagnóstico manual" que será substituída pelo Raio-X. O objetivo de G4 passa a ser:

"Lead Capture Foundation" — endpoint seguro, lead + business link, consent, persistência, /obrigado fallback e eventos compartilhados.

**A UX definitiva do Raio-X pertence aos MS-Gates.**

---

## D011 — 27/08/2026 — Cutover da home somente no MS-G10

**Decisão:** O CTA atual "Quero meu diagnóstico gratuito" e o fluxo de diagnóstico manual são LEGACY CURRENT e ficam em produção até o MS-G10 (Raio-X público). Não retirar prematuramente.

**Status:** o fluxo atual é intencionalmente mantido enquanto o Raio-X está em desenvolvimento.

---

## D008 — 27/08/2026 — Numeração canônica dos Gates técnicos

**Decisão:** TECH-SPEC.md + CURRENT.md são a referência canônica da numeração dos Gates de implementação.

**Contexto:** PLANO-MESTRE.md contém uma sequência estratégica anterior ("Gate 0 — Oferta e regras", "Gate 1 — Arquitetura da página"…) que serviu para estruturar o plano comercial. A TECH-SPEC.md define a sequência de implementação técnica, começando em Gate 0 = Inventário e baseline. As duas numerações coexistem nos documentos e são incompatíveis. Para execução técnica, vale exclusivamente a numeração da TECH-SPEC.md.

**Consequência:** Todo prompt de execução deve referenciar Gates pelo número da TECH-SPEC. O PLANO-MESTRE não deve ser alterado — é documento estratégico, não de implementação.

---

## D001 — 27/08/2026 — Supabase como fonte de verdade

**Decisão:** Supabase será a fonte de verdade para todos os dados comerciais (leads, atribuição, consentimentos, pagamentos, assinaturas).

**Motivação:** Independência de fornecedor; auditabilidade; integração com conversões offline do Google Ads.

**Consequência:** Nenhuma ferramenta de terceiros (Atomicat, provedor de e-mail) é a fonte primária de dados.

---

## D002 — 27/08/2026 — Atomicat para hospedagem e cobrança

**Decisão:** Atomicat será usada para hospedagem de sites de clientes, cobrança de implantação e recorrência.

**Motivação:** Ferramenta já escolhida pelo operador para gestão de sites de clientes.

**Pendência:** Validar tecnicamente capacidades de webhook, metadata, API e ambiente de teste no Gate 7.

---

## D003 — 27/08/2026 — CTA principal: diagnóstico gratuito

**Decisão:** CTA primário é "Quero meu diagnóstico gratuito". WhatsApp é rota secundária.

**Motivação:** Diagnóstico cria comprometimento, filtra leads e dá informação para a venda consultiva.

---

## D004 — 27/08/2026 — Casos como "exemplos de transformação"

**Decisão:** Os casos antes/depois não são apresentados como clientes reais — são "Exemplos de transformação de presença digital" com subtítulo "Cenários demonstrativos baseados em situações comuns de negócios locais."

**Motivação:** Transparência e conformidade com regulação de publicidade.

---

## D005 — 27/08/2026 — Preços como hipóteses comerciais

**Decisão:** Os quatro planos (Micro R$399+R$97/mês, Essencial R$197/mês, Profissional R$1.497+R$297/mês, Crescimento a partir de R$2.997+R$497/mês) são hipóteses sujeitas a revisão por CAC, margem e retenção.

---

## D006 — 27/08/2026 — Consent Mode v2 modo básico no lançamento

**Decisão:** Implementar Google Consent Mode v2 no modo básico com default denied para todas as categorias de anúncio/analytics.

**Motivação:** Conformidade LGPD, requisito Google Ads Enhanced Conversions.

---

## D007 — 27/08/2026 — PIX manual com atribuição preservada

**Decisão:** PIX pago fora da plataforma é confirmado manualmente no CRM Lite, que dispara purchase + conversion_queue usando a atribuição já registrada no Supabase.

**Motivação:** Não perder sinal de conversão por limitação de método de pagamento.

---

## D021 — 28/08/2026 — Consent Mode Basic (não Advanced)

**Decisão:** Implementar Google Consent Mode v2 no modo **basic** — GTM/GA4 não carregam antes do consentimento. Em Advanced Mode GTM carregaria antes com dados anonimizados; rejeitamos por complexidade e risco de conformidade LGPD.

**Motivação:** LGPD exige opt-in explícito. Basic Mode é mais conservador e suficiente para o estágio atual.

---

## D022 — 28/08/2026 — GTM via variável de ambiente PUBLIC_GTM_ID

**Decisão:** ID do GTM configurado apenas como variável de ambiente `PUBLIC_GTM_ID` no Netlify. Código nunca contém ID real hardcoded. Em ambiente local/preview sem a variável, GTM simplesmente não carrega.

**Motivação:** Evitar exposição de IDs em commits; separação entre dev e produção.

---

## D023 — 28/08/2026 — GA4 via GTM (não direto no código)

**Decisão:** GA4 será configurado dentro do GTM como Google Tag, não via script direto no site. O site só conhece o GTM-ID; o GA4 Measurement ID fica no GTM.

**Motivação:** Governança centralizada de tags; facilita trocas de conta sem deploy.

---

## D024 — 28/08/2026 — Umami gateado por analytics_storage

**Decisão:** Script do Umami só é injetado dinamicamente quando `analytics_storage === 'granted'`. Antes do consentimento, nenhuma requisição para analytics.umami.is.

**Motivação:** Conformidade LGPD; usuário deve consentir antes de qualquer coleta.

---

## D025 — 28/08/2026 — GTM noscript iframe omitido em Basic Mode

**Decisão:** O `<noscript><iframe src="gtm.js">` não é incluído no HTML. Em Basic Consent Mode não é necessário para conformidade. Usuários sem JS são minoria sem impacto no funil.

**Motivação:** Menor complexidade; sem benefício real para o perfil de usuário deste site.

---

## D026 — 01/09/2026 — Attribution Foundation `g3-v1`

**Decisão:** Implementar atribuição first-party local com versão explícita
`g3-v1`, usando `marvin_attribution_v1` em localStorage e `marvin_session_v1`
em sessionStorage.

**Regras:** first-touch é imutável, last-touch só atualiza com novo contexto
útil, visita direta posterior não apaga last-touch útil, e a landing page guarda
somente parâmetros whitelistados.

**Privacidade:** Não armazenar PII, não usar fingerprint, não usar GA client ID
como session ID e não enviar click IDs completos ao dataLayer.

**Escopo:** G3 não cria migration, não insere no Supabase, não altera GTM/GA4 e
não implementa WhatsApp attribution definitiva.
