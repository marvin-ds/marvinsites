# Marvin Sites — Changelog

---

## [Gate 3] — 01/09/2026 — Attribution Foundation

### Tracking
- Implementada fundação de atribuição first-party `g3-v1`
- Captura UTMs, `gclid`, `gbraid`, `wbraid`, `fbclid`, landing page e referrer
- First-touch imutável e last-touch atualizável apenas por novo contexto útil
- Sessão first-party em `sessionStorage` e atribuição persistente em `localStorage` por 90 dias
- DataLayer recebe eventos `attribution_initialized` / `attribution_updated` sem PII e sem click IDs completos

### Formulário
- Formulário Netlify atual preservado: `fetch POST /` → `/obrigado/`
- Hidden fields de atribuição adicionados para leads atuais já carregarem contexto de origem

### Testes
- Suite unitária `test:attribution` criada com cobertura de parse, sanitização, storage, sessão, first/last-touch e snapshot

### Infraestrutura
- Nenhuma migration
- Nenhuma integração runtime com Supabase
- Nenhuma alteração em GTM/GA4/Vercel/DNS
- Preview Netlify: `https://g3-attribution--transcendent-fairy-69ba57.netlify.app`
- Produção não alterada

---

## [Gate 4] — 01/09/2026 — Lead Capture Foundation

### Backend
- Criado endpoint server-side `/.netlify/functions/lead-capture`
- Criada validação server-side com whitelist, limite de payload, sanitização e respostas genéricas
- Criada migration `20260901000005_g4_lead_capture_rpc.sql`
- Adicionado `leads.submission_id` para retry/idempotência
- Criada RPC `public.capture_lead_v1(payload jsonb)` para operação transacional

### Formulário
- Formulário passa a enviar JSON ao endpoint e só redireciona após sucesso
- Adicionado campo obrigatório `Nome do negócio` para respeitar `businesses` como entidade central
- Netlify Forms deixa de ser a fonte canônica prevista para o lead

### Privacidade
- Marketing consent permanece false sem opt-in explícito
- Consent Mode snapshot é persistido separadamente
- Sem PII em analytics/dataLayer/respostas públicas

### Infraestrutura
- Sem Vercel
- Sem GTM/GA4
- Sem produção
- Docker Desktop/Linux engine confirmado
- Portas Supabase locais movidas para `55420–55429` porque `54315–54414` está reservado no Windows
- `npm run db:reset` aplicou G1 + G4 localmente
- `npm run db:test` passou com 4 arquivos / 142 testes pgTAP

---

## [Gate 1] — 28/08/2026 — Supabase Common Core e Segurança

### Schema
- 16 tabelas do Common Core criadas via 4 migrations versionadas
- Entidades: businesses, business_sources, leads, lead_attribution, lead_consents, lead_status_history, human_diagnostics, deals, checkout_sessions, payments, subscriptions, provider_webhook_events, conversion_queue, email_subscriptions, email_events, audit_log
- 40+ índices de performance (FKs, status, session_id, event_id, last_activity_at)
- Constraints: google_place_id unique partial (NULLS NOT DISTINCT), consent identity check, payment amount ≥ 0, lead status enum (12 valores), business status enum

### Triggers
- `trg_businesses_updated_at` / `trg_leads_updated_at` / `trg_lead_consents_updated_at` — função `set_updated_at()`
- `trg_lead_attribution_protect_first_touch` — imutabilidade dos campos `first_*` após first_touch_at definido
- `trg_leads_status_history` — registro automático de mudanças de status no insert e update

### Segurança
- RLS habilitado em todas as 16 tabelas (deny-by-default)
- `REVOKE ALL` de `anon` e `authenticated` em todas as tabelas
- Nenhuma policy permissiva — acesso futuro via service role em Gates seguintes
- Sem tabelas de scan (`scan_runs`, `scan_checks` etc.) — escopo MS-G2

### Testes (pgTAP)
- `01_schema_test.sql` — 58 testes: tabelas, PKs, FKs, colunas, triggers
- `02_security_test.sql` — 36 testes: RLS ON, privilégios anon/authenticated, ausência de tabelas MS-G2
- `03_business_test.sql` — 22 testes: UUID, status constraints, FK, status history, first-touch, consentimento, pagamento, idempotência webhook, token_hash
- **116 testes passando, 0 falhas**

### Infraestrutura
- Supabase CLI 2.116.0 como devDependency
- `npm run db:start/stop/reset/test` configurados
- Migrations aplicadas em local (Docker) e remoto (`dboihbvjtdlgvugjxaam`)

### Runtime
- Nenhum código do site alterado
- Produção: inalterada

---

## [Architectural Alignment] — 28/08/2026 — Hosting, Monorepo e Política de Deploy

### Decisões registradas (D012–D020)
- Monorepo GitHub: site (Netlify) + app futuro (Vercel) + Supabase no mesmo repo
- Netlify = site institucional; Vercel = `app.marvinsites.com.br` (futuro)
- Supabase compartilhado: um único projeto para site + SaaS
- `human_diagnostics` em vez de `diagnostics` (D013)
- Supabase CLI como devDependency versionada (D012)
- Deploy policy: Preview-first, produção somente no Gate aprovado (D018)

### Implementação
- `scripts/netlify-ignore-build.mjs` — skip builds para docs/supabase/apps
- `netlify.toml`: `ignore = "node scripts/netlify-ignore-build.mjs"`
- `docs/marvin/DEPLOYMENT-SPEC.md` criado
- `docs/marvin/DECISIONS.md` D012–D020 adicionados
- `docs/marvin/CURRENT.md` seção de infraestrutura adicionada

### Runtime
- Nenhum código de site alterado
- Build Astro: inalterado
- Produção: inalterada

---

## [HOTFIX /obrigado] — 27/08/2026 — Formulário + Página de Confirmação

### Problema resolvido
- Formulário de diagnóstico redirecionava para `/obrigado` (sem barra) → 404 no Netlify
- POST nativo para action URL causava erro de redirect no Netlify Forms

### Solução
- Criada página `/obrigado/` com `noindex`, fora do sitemap
- Adicionado `noindex?: boolean` ao `BaseLayout.astro`
- Formulário alterado para `fetch POST` para `/` + `window.location.assign('/obrigado/')`
- Commits: `96f1d28` → `a158846` → `dd54bb0`

### Status
- PRODUCTION APPROVED — fluxo validado em produção (Netlify Forms recebeu submissão)

---

## [Gate 0.5] — 27/08/2026 — Reconciliação Arquitetural Marvin Local

### Arquitetura
- Incorporação formal da Marvin Local / Micro-SaaS ao projeto
- Raio-X Marvin definido como futura porta principal de aquisição (substituindo CTA diagnóstico manual no MS-G10)
- `businesses` definido como entidade estrutural central do Supabase compartilhado
- `leads.business_id` adicionado ao modelo de dados compartilhado
- `business_sources` adicionada ao modelo de dados compartilhado
- Supabase compartilhado documentado para site + CRM + SaaS
- G4 renomeado: "Lead Capture Foundation" (sem UX definitiva de diagnóstico manual)
- Interlock G12/G13 ↔ MS-G10 documentado

### Documentação nova
- `docs/marvin-saas/` criada com 14 documentos:
  MASTER-PLAN, CURRENT, DECISIONS, RAIO-X-PRODUCT-SPEC, RADAR-PRODUCT-SPEC,
  SCORING-SPEC, DATA-MODEL, API-SPEC, GOOGLE-DATA-SPEC, TRACKING-SPEC,
  BILLING-SPEC, SECURITY-SPEC, QA-SPEC, ROADMAP

### Decisões adicionadas
- D009: Gate 0.5 — Arquitetura Marvin Local incorporada
- D010: G4 renomeado para Lead Capture Foundation
- D011: Cutover da home somente no MS-G10
- D-MS001 a D-MS012 (docs/marvin-saas/DECISIONS.md)

### Runtime
- Nenhum código funcional alterado
- Nenhuma migration criada
- Nenhuma dependência instalada
- Site em produção: inalterado

---

## [Gate 0] — 27/08/2026 — Inventário e Baseline

### Documentação
- Criados todos os docs em `docs/marvin/` a partir da Especificação Técnica v1.0
- `G0-INVENTORY.md` — inventário técnico completo do estado atual
- `DECISIONS.md` D008 — numeração canônica dos Gates (TECH-SPEC.md é referência)
- `CURRENT.md` — atualizado com estado pós-Gate 0 e riscos identificados

### Achados relevantes (Gate 0)
- Stack: Astro 4.16.0, Tailwind 3.4.0, TypeScript 5.6.0, Netlify, npm
- Analytics: apenas Umami (cookieless) — sem GTM, GA4, Ads, Meta
- Formulário: Netlify Forms — sem banco próprio, sem atribuição
- Atomicat: zero integração existente
- P1: `/obrigado` provavelmente inexistente — confirmar antes do Gate 1

---

## [Site] — 2026-08-27

### Performance
- `cssCodeSplit: false` no Vite — elimina cascata CSS bloqueante (965ms → 0)
- Google Fonts não-bloqueante via `media="print" onload` + noscript fallback
- Logo SVG 1KB substituindo PNG 607KB — elimina LCP pesado

### Acessibilidade
- Múltiplas rodadas de correção WCAG AA: contraste `text-gray-400` → `text-gray-600`, `text-white/40` → `text-white/70`, badges `text-conversao` → `text-orange-700`
- Honeypot com `aria-hidden="true"` + `tabindex="-1"`
- Numbers com `aria-hidden="true"` na seção Solution

### SEO
- 4 páginas de cidade expandidas com FAQs locais (~600-700 palavras cada)
- Sitemap enviado ao Google Search Console (indexação solicitada)
- Google Search Console verificado via meta tag + arquivo HTML

### Conteúdo
- Seção Testimonials reescrita com 6 casos antes/depois representativos
- Disclaimer honesto: "Casos representativos baseados em perfis reais de mercado"
- Páginas de Termos e Privacidade com data atualizada e cláusula de domínio revisada

### Infraestrutura
- Netlify redirects: http/www → https/apex (elimina duplo redirect)
- Logo: CSS placeholder → `favicon.svg` colorido no header

### PageSpeed final
- Performance: 93
- Accessibility: 96
- Best Practices: 100
- SEO: 100

---

## [Gate 2A] — 28/08/2026 — Consent Foundation (Consent Mode v2)

### Consent Mode v2
- Substituído `CookieBanner.astro` (legacy, key `marvin_cookie_consent`) por sistema completo v2
- Storage key: `marvin_consent_v2`, version: `g2-v1`
- Default denied para todos os 4 estados (analytics_storage, ad_storage, ad_user_data, ad_personalization)
- Legacy consent detectado mas NÃO promovido — usuário vê o banner novamente

### Módulos criados
- `src/lib/consent.ts` — lógica pura: read/save/build/validate/dependencies
- `src/lib/gtm.ts` — GTM loader idempotente com validação de ID
- `src/lib/datalayer.ts` — push ao dataLayer sem PII
- `src/components/consent/ConsentBanner.astro` — banner com Accept/Reject/Preferences
- `src/components/consent/ConsentPreferences.astro` — modal com toggles acessíveis

### Integração
- `BaseLayout.astro`: script inline de init antes de qualquer outro script
- `Footer.astro`: botão "Preferências de privacidade" que reabre modal
- Umami: gateado por `analytics_storage === 'granted'`
- GTM: não carrega sem consentimento elegível e sem PUBLIC_GTM_ID válido

### Testes
- 17 testes unitários em `src/lib/__tests__/consent.test.mjs` — todos passando
- Build: 14 páginas sem regressão

### Infra
- `.env.example` criado com `PUBLIC_GTM_ID=` vazio
- CSP inalterada (Google domains serão adicionados no G2B)
- Produção não alterada
