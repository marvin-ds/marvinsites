# Marvin Sites — Estado Atual

**Atualizar a cada Gate concluído.**

---

## Gate atual

**G0 — Inventário e baseline** ✅ APPROVED  
**G0.5 — Reconciliação arquitetural Marvin Local** ✅ APPROVED  
**HOTFIX /obrigado** ✅ PRODUCTION APPROVED  
**Architectural Alignment (D012–D020)** ✅ APPROVED  
**G1 — Supabase compartilhado e segurança** ✅ APPROVED
**G2 — Consent Mode + GTM + GA4** ✅ PRODUCTION APPROVED
**G3 — Attribution** IMPLEMENTED — PENDING APPROVAL

## Branch de produção

`main` — HEAD `69b370ea`

## Branch de trabalho atual

`feat/marvin-g3-attribution`

## Working tree

Limpa.

## O que está concluído

### Site (marvinsites.com.br)
- [x] Layout e identidade visual base (Astro + Tailwind)
- [x] Header com logo SVG (`/favicon.svg`)
- [x] Hero, Problem, Solution, Services, Testimonials, FinalCTA, Footer
- [x] 4 páginas de cidade (Santos, Guarujá, Praia Grande, São Vicente) com FAQs locais
- [x] 6 páginas de nicho com SEO e WhatsApp contextual
- [x] Formulário de diagnóstico com honeypot + validação — **fluxo atual:**
  - `fetch POST` para `/` (Netlify Forms processa)
  - `window.location.assign('/obrigado/')` após sucesso
- [x] Página `/obrigado/` — confirmação pós-formulário (noindex, fora do sitemap)
- [x] Botão WhatsApp flutuante
- [x] Páginas /termos e /privacidade
- [x] Google Search Console verificado + sitemap enviado
- [x] Netlify deploy auto + redirects http/www → https/apex
- [x] Google Fonts não-bloqueante (`media="print" onload`)
- [x] cssCodeSplit desabilitado (elimina cascata CSS bloqueante)
- [x] Favicon SVG (logo mark colorido)
- [x] WCAG AA — múltiplas rodadas de correção de contraste
- [x] PageSpeed: 93 Performance, 96 Accessibility, 100 Best Practices, 100 SEO

### Variáveis de ambiente (Netlify)
- [x] `PUBLIC_WHATSAPP_NUMBER` — USER-CONFIRMED / EXTERNAL (configurada corretamente)

### Supabase — Gate 1 ✅ APROVADO
- [x] Projeto criado externamente
- Project Ref: `dboihbvjtdlgvugjxaam`
- Project URL: `https://dboihbvjtdlgvugjxaam.supabase.co`
- [x] 4 migrations aplicadas (local + remoto)
- [x] 16 tabelas do Common Core criadas
- [x] 40+ índices de performance
- [x] Triggers: updated_at, protect_first_touch, record_lead_status_change
- [x] RLS habilitado em todas as 16 tabelas — deny-by-default
- [x] anon e authenticated sem acesso direto
- [x] 116 testes pgTAP passando (01_schema, 02_security, 03_business)

### Documentação (docs/marvin/)
- [x] TECH-SPEC.md — spec técnica completa v1.0
- [x] DATA-MODEL.md — modelo de dados Supabase (v1.1 — businesses adicionado)
- [x] TRACKING-SPEC.md — GTM, GA4, Ads, UTM, atribuição
- [x] PRIVACY-SPEC.md — consentimento, retenção, LGPD
- [x] ATOMICAT-INTEGRATION.md — integração pagamento/hospedagem
- [x] EMAIL-SPEC.md — e-mail marketing
- [x] SEO-SPEC.md — SEO técnico e arquitetura da home
- [x] TEST-PLAN.md — plano de testes
- [x] DECISIONS.md — 11 decisões registradas (D001–D011)
- [x] PLANO-MESTRE.md — plano comercial estratégico v1.0
- [x] CHANGELOG.md — histórico de mudanças
- [x] G0-INVENTORY.md — inventário técnico completo

### Documentação (docs/marvin-saas/) — Gate 0.5
- [x] MASTER-PLAN.md — plano mestre executivo Marvin Local
- [x] CURRENT.md — estado atual do produto SaaS
- [x] DECISIONS.md — decisões D-MS001 a D-MS012
- [x] RAIO-X-PRODUCT-SPEC.md — especificação do produto Raio-X V1
- [x] RADAR-PRODUCT-SPEC.md — especificação high-level do Radar
- [x] SCORING-SPEC.md — spec do score (draft, MS-G0 pending)
- [x] DATA-MODEL.md — entidades SaaS (scan_runs, checks, scores, issues)
- [x] API-SPEC.md — contratos de endpoints futuros
- [x] GOOGLE-DATA-SPEC.md — política e campos Google Places
- [x] TRACKING-SPEC.md — eventos Raio-X / Radar
- [x] BILLING-SPEC.md — cobrança Radar (contrato futuro)
- [x] SECURITY-SPEC.md — segurança do Raio-X
- [x] QA-SPEC.md — plano de testes SaaS
- [x] ROADMAP.md — MS-Gates com interlock Gates do site

## Infraestrutura canônica

| Componente | Plataforma | Domínio | Status |
|---|---|---|---|
| Site institucional | Netlify | marvinsites.com.br | ✅ LIVE |
| App / SaaS | Vercel | app.marvinsites.com.br | FUTURO |
| Backend / DB | Supabase | dboihbvjtdlgvugjxaam | ✅ G1 APPROVED — 4 migrations / 16 tables |
| Repositório | GitHub | marvin-ds/marvinsites | monorepo |

**Política de deploy:** branch → Preview → Gate APPROVED → 1 merge → 1 deploy de produção.  
Exceções P0/P1 apenas para falhas críticas em produção.

**Netlify build-ignore:** `scripts/netlify-ignore-build.mjs` — skips build quando apenas `docs/`, `supabase/` ou `apps/` mudam.

## Riscos ativos

| ID | Prioridade | Descrição |
|---|---|---|
| R01 | P1 | Leads só existem no Netlify Forms — sem banco, sem atribuição |
| R03 | P2 | `api.resend.com` na CSP sem código correspondente |

**Riscos encerrados:**
- ~~R02~~ `/obrigado` inexistente → PRODUCTION APPROVED (dd54bb0)
- ~~R02~~ Sem Consent Mode v2 → G2 PRODUCTION APPROVED (13665ada) — GTM-PHJLZWF4 v2 + Consent Mode Basic
- ~~R05~~ `PUBLIC_WHATSAPP_NUMBER` desconhecida → USER-CONFIRMED / EXTERNAL

## Gate 1 — escopo confirmado

**Branch:** `feat/marvin-g1-supabase` ✅ APROVADO — pending merge em main

G1 deve criar o **Common Core** do Supabase compartilhado (Marvin Sites + Marvin Local):

**Incluídas:**
- `businesses`
- `business_sources`
- `leads` (com `business_id` FK → businesses)
- `lead_attribution`
- `lead_consents`
- `lead_status_history`
- `diagnostics`
- `deals`
- `checkout_sessions`
- `payments`
- `subscriptions`
- `provider_webhook_events`
- `conversion_queue`
- `email_subscriptions`
- `email_events`
- `audit_log`

**NÃO incluídas em G1** (pertencem ao MS-G2):
- `scan_runs`
- `scan_checks`
- `score_snapshots`
- `issues`
- `recommendations`

## Interlock arquitetural

| Gate | Depende de |
|---|---|
| G1 | Common Supabase core |
| G2 | Consent/tracking compartilhado |
| G3 | Attribution compartilhada |
| G4 — Lead Capture Foundation | Não construir UX de diagnóstico manual definitiva |
| G12/G13 | Coordenação com MS-G10 (cutover da home) |
| MS-G0 | Scoring contract — fechar antes de programar scanner |
| MS-G2+ | Tabelas/scanner específicos Raio-X |

## Próxima missão

**G3 — Attribution** — NEXT / NOT STARTED. Aguardando autorização explícita.
**MS-G1** — NOT STARTED.

**NÃO INICIAR SEM AUTORIZAÇÃO.**

G3 autorizado em 01/09/2026 com Codex como ACTIVE_TOOL. Escopo: fundação
first-party de atribuição `g3-v1`, sem Supabase runtime, sem migration, sem
GTM/GA4 novos e sem deploy de produção.

Estado G3:
- Branch: `feat/marvin-g3-attribution`
- HEAD: ver `git rev-parse HEAD` no branch de trabalho
- Preview: `https://g3-attribution--transcendent-fairy-69ba57.netlify.app`
- Tests: `test:attribution` 26/26, `test:consent` 17/17, `npm run lint` PASS, `npm run build` PASS
- Production: unchanged

## Stack verificada

- Astro 4.16.0 / Tailwind CSS 3.4.0 / TypeScript 5.6.0
- Node v24 local / Node 20 no Netlify build
- npm 11 / package-lock.json
- Deploy: Netlify (branch main → auto-deploy)
- Analytics: Umami (cookieless) + GTM-PHJLZWF4 v2 / GA4 G-TT3QQJR64N (Consent Mode Basic, default denied)
- Formulário: Netlify Forms (fetch + manual redirect)
- Supabase: G1 APPROVED — 4 migrations, 16 tabelas, 116 pgTAP, RLS deny-by-default
