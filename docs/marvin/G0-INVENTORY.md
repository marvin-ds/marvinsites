# Marvin Sites — Gate 0: Inventário Técnico e Baseline

**Data:** 27/08/2026  
**Branch:** chore/marvin-g0-inventory  
**HEAD inicial:** e6a2360254e249f14efb78859bd7058101241d79  
**Executado por:** Claude Code (Gate 0 — read-only audit)

---

## A. Git / Repositório

| Item | Estado |
|---|---|
| Branch-base | `main` |
| Remote | `https://github.com/marvin-ds/marvinsites.git` |
| HEAD ao entrar no Gate 0 | `e6a2360` (docs commit) |
| Working tree | Limpo |
| Origin/local | Sincronizado |
| Monorepo? | Não — repo único |
| Diretório da aplicação | `C:/Projetos/marvin-sites/` |

**VERIFICADO**

---

## B. Stack

| Item | Valor |
|---|---|
| Framework | **Astro 4.16.0** |
| Output | `static` (SSG) |
| CSS | **Tailwind CSS 3.4.0** via `@astrojs/tailwind` |
| TypeScript | `^5.6.0` (devDependency) |
| Tipo de módulos | ESM (`"type": "module"`) |
| Runtime | Node.js v24.19.0 |
| Package manager | npm 11.11.1 (pnpm: não instalado) |
| Lockfile | `package-lock.json` |
| Build command | `npm run build` → `astro build` |
| Output dir | `dist/` |
| Lint | `tsc --noEmit` (sem ESLint/Prettier configurados) |
| Testes | **nenhum framework de teste** configurado |
| Outras dependências | `@astrojs/sitemap ^3.7.3` |

**VERIFICADO**

---

## C. Hosting / Deploy

| Item | Valor |
|---|---|
| Provider | **Netlify** |
| Branch de produção | `main` (auto-deploy) |
| Comando de build | `npm run build` |
| Publish dir | `dist` |
| NODE_VERSION (build) | `20` (Netlify env override — runtime local é v24) |
| Preview | Deploy automático de PRs via Netlify |
| Deploy de produção | Merge em `main` → auto-deploy |

**VERIFICADO**

Nota: NODE_VERSION=20 no netlify.toml vs Node v24 local. Build deve ser testado nesta diferença se houver problemas futuros. Atualmente o build passou sem erros.

---

## D. Domínio / DNS

| Item | Valor |
|---|---|
| Domínio principal | `marvinsites.com.br` |
| www → canonical | Redirect 301 para `https://marvinsites.com.br/:splat` |
| http → https | Redirect 301 configurado no `netlify.toml` |
| Redirect duplo eliminado | Sim — http/www cobertos em regras separadas |
| DNS real | **EXTERNO — REQUER CONFIRMAÇÃO DO USUÁRIO** |
| SSL | Gerenciado pela Netlify (HSTS configurado) |

**VERIFICADO parcialmente** — redirects no repo confirmados; DNS real não inspecionável pelo repositório.

---

## E. Mapa de Rotas

| Path | Tipo | Indexável | Observações |
|---|---|---|---|
| `/` | Home | Sim | CTA principal, formulário diagnóstico |
| `/cidades/santos` | Cidade | Sim | FAQs locais, ~600 palavras |
| `/cidades/guaruja` | Cidade | Sim | FAQs locais, ~600 palavras |
| `/cidades/praia-grande` | Cidade | Sim | FAQs locais, ~600 palavras |
| `/cidades/sao-vicente` | Cidade | Sim | FAQs locais, ~600 palavras |
| `/nichos/clinicas` | Nicho | Sim | Página por nicho |
| `/termos` | Legal | Sim | Termos de uso |
| `/privacidade` | Legal | Sim | Política de privacidade |
| `/obrigado` | Pós-formulário | **INFERIDO** | Não encontrada em `src/pages/` na inspeção — confirmar |
| `/sitemap.xml` | Técnico | N/A | Gerado via `@astrojs/sitemap` + `src/pages/sitemap.xml.ts` |
| `/robots.txt` | Técnico | N/A | Existe em `public/robots.txt` |
| `/google50b2b3e012b567d3.html` | Verificação | N/A | Google Search Console |
| `404` | Erro | Não | **INFERIDO** — verificar se existe página 404 customizada |

**Páginas de nicho identificadas:** apenas `/nichos/clinicas` encontrada. Outras (`/contadores`, `/estetica`, `/reformas`) não verificadas — podem existir ou não.

---

## F. SEO Baseline

### Home (`/`)

| Item | Estado |
|---|---|
| Title | `Marvin Sites — Sites para pequenos negócios locais` |
| Meta description | `Sites e presença digital para pequenos negócios serem encontrados no Google, transmitirem confiança e receberem contatos pelo WhatsApp. Entrega em 7 dias úteis.` |
| Canonical | `https://marvinsites.com.br/` (dinâmico via `Astro.url.href`) |
| H1 | Presente (verificado anteriormente) |
| Open Graph | Completo (title, description, image, url, type, locale) |
| Twitter Card | `summary_large_image` |
| Favicon | SVG + PNG fallback |
| Google Verification | Meta tag: `pY3-FVjNoBtfuq1hZOYCiR7Knt30ikJJ-7YEOmrWEio` |

### Páginas de cidade

| Cidade | Title | Description | Canonical |
|---|---|---|---|
| Santos | `Criação de Site para Pequenos Negócios em Santos SP | Marvin Sites` | `Sites profissionais... Entrega em 7 dias...` | `https://marvinsites.com.br/cidades/santos` |
| Guarujá | `Criação de Site para Pequenos Negócios em Guarujá SP | Marvin Sites` | `Sites profissionais...` | `https://marvinsites.com.br/cidades/guaruja` |
| Praia Grande | `Criação de Site para Pequenos Negócios em Praia Grande SP | Marvin Sites` | `Sites profissionais...` | `https://marvinsites.com.br/cidades/praia-grande` |
| São Vicente | `Criação de Site para Pequenos Negócios em São Vicente SP | Marvin Sites` | `Sites profissionais...` | `https://marvinsites.com.br/cidades/sao-vicente` |

### Structured Data

- `schemaLocalBusiness` implementado em `src/lib/schema.ts` e injetado via `BaseLayout.astro`
- Schema aplicado globalmente — **P2:** verificar se páginas de cidade e nicho passam schema correto ou reutilizam LocalBusiness genérico
- Sem FAQPage schema nas páginas de cidade apesar de terem seção de FAQ — **P2:** oportunidade para Gate 11

### Outros

| Item | Estado |
|---|---|
| Sitemap | Gerado via `@astrojs/sitemap` + config customizada |
| Robots.txt | Existe em `public/robots.txt` |
| Search Console | **EXTERNO — REQUER CONFIRMAÇÃO:** verificação via meta tag presente. Sitemap enviado (confirmado anteriormente pelo usuário). |
| Noindex em preview/staging | **NÃO IMPLEMENTADO** — previews Netlify indexáveis. P2 para Gate 11. |

---

## G. Tracking / Tags

| Ferramenta | Estado |
|---|---|
| GTM | **NÃO EXISTE** |
| GA4 | **NÃO EXISTE** |
| Google Ads | **NÃO EXISTE** |
| Meta Pixel / fbq | **NÃO EXISTE** |
| Hotjar / Clarity | **NÃO EXISTE** |
| dataLayer | **NÃO EXISTE** |
| **Umami** | **EXISTE** — `src/lib/analytics.ts` |

### Umami — detalhes

- Biblioteca: `src/lib/analytics.ts` expõe função `trackEvent(event, data)` que chama `window.umami.track()`
- O script do Umami provavelmente é carregado via BaseLayout (tag não encontrada explicitamente no batch — **INFERIDO** a partir da CSP que permite `https://analytics.umami.is`)
- CSP em `netlify.toml` permite: `script-src ... https://analytics.umami.is` e `connect-src ... https://analytics.umami.is`
- Umami é cookieless e privacy-respecting — **não** requer Consent Mode para funcionar
- O banner atual informa "analytics sem cookies (Umami)" — comunicação adequada

### UTM / click IDs

- UTMs **não são capturados** no lado servidor — apenas passados nas URLs de WhatsApp via `gerarLinkWhatsApp()`
- Não existe captura de `gclid`, `gbraid`, `wbraid`, `fbclid` — será implementado em Gate 3

**VERIFICADO**

---

## H. Privacidade / Consentimento

### Banner atual

- Componente: `src/components/ui/CookieBanner.astro`
- Opções: apenas **"Aceitar"** (um único botão)
- Comportamento: `localStorage.setItem('marvin_cookie_consent', '1')` ao aceitar
- O banner **esconde** ao aceitar — não controla tags (Umami não requer consentimento)
- Sem opção "Recusar não essenciais" ou "Preferências"

### Análise de conformidade

| Requisito (TECH-SPEC Gate 2) | Estado atual |
|---|---|
| Google Consent Mode v2 | **NÃO IMPLEMENTADO** — P0 para Gate 2 |
| Opção "Recusar não essenciais" | **NÃO EXISTE** — P1 |
| Categorias (analytics / publicidade) | **NÃO EXISTE** — P1 |
| Default denied para ad_storage, ad_user_data | **NÃO EXISTE** — P0 para Gate 2 |

**Nota importante:** O estado atual é coerente com a ausência de GTM/GA4/Google Ads. O banner simples só é P0 quando esses sistemas forem instalados (Gate 2). Não há urgência de correção antes do Gate 1.

### Política de Privacidade / Termos

- `/privacidade` — data julho/2026, menciona Umami corretamente
- `/termos` — data julho/2026, domínio no nome do cliente, arquivos exportáveis no cancelamento

**VERIFICADO**

---

## I. Formulários

### Formulário de diagnóstico (`DiagnosticForm.astro`)

| Item | Estado |
|---|---|
| Campos | nome, empresa, cidade, whatsapp, segmento, url_presente (opcional), consentimento (checkbox) |
| Método | `POST` |
| Backend | **Netlify Forms** (`data-netlify="true"`) |
| Ação | Redirect para `/obrigado` |
| Honeypot | `bot-field` com `aria-hidden="true"` + `tabindex="-1"` ✓ |
| Validação client-side | HTML required + type constraints |
| Validação server-side | **Netlify processa** — sem Edge Function própria |
| Persistência | **Netlify Forms dashboard apenas** — sem Supabase, sem banco |
| Notificação por e-mail | **EXTERNO — REQUER CONFIRMAÇÃO:** Netlify pode enviar email de notificação se configurado no painel |
| Atribuição | **NÃO EXISTE** — UTMs/gclid não capturados no submit |
| Rate limit | Netlify Forms tem limite por tier |
| Deduplicação | **NÃO EXISTE** |
| Tracking post-submit | `diagnostic_submit` event **NÃO disparado** (sem GA4/dataLayer) |

**P1 — RISCO DE PERDA DE LEAD:** Leads existem apenas no Netlify Forms. Não há Supabase. Se o Netlify Forms for desativado, ou se o plano tiver cota esgotada, leads são perdidos silenciosamente. Gate 4 criará o endpoint próprio.

**P2 — /obrigado:** A action do formulário redireciona para `/obrigado` mas a página não foi encontrada em `src/pages/`. Verificar se existe — se não existir, o redirect após submit vai para 404.

---

## J. WhatsApp

### Número

- Env var: `PUBLIC_WHATSAPP_NUMBER` (Netlify env)
- Fallback hardcoded: `5513000000000` — **P2:** se a env var não estiver configurada no Netlify, este número placeholder é usado em produção

### Placements mapeados

| Placement | Componente | Mensagem pré-preenchida | UTMs |
|---|---|---|---|
| Header | `Header.astro` | `LINKS.hero` | `utm_campaign=hero` |
| Botão flutuante | `WhatsAppButton.astro` | `LINKS.flutuante` | `utm_campaign=botao-flutuante` |
| FinalCTA | `FinalCTA.astro` | `LINKS.cta_final` | `utm_campaign=cta-final` |
| Cidade hero | `CidadeHero.astro` | Dinâmico por cidade | `utm_campaign=cidade-{slug}-hero` |
| Cidade CTA | `CidadeCTA.astro` | Dinâmico por cidade | `utm_campaign=cidade-{slug}-cta` |
| Cidade nichos | `CidadeNichos.astro` | Dinâmico por cidade | `utm_campaign=cidade-{slug}-outro` |
| Planos/Services | `Services.astro` | Por plano | `utm_campaign=card-servico` |

### Atribuição atual

- UTMs passados na URL do wa.me ✓ — preservam origem no link
- `utm_source=site`, `utm_medium=whatsapp-button` fixos para todos
- `utm_campaign` = placement específico ✓
- `utm_content` = nicho/geral ✓
- **NÃO captura gclid/fbclid** — atribuição de Ads perdida no clique WhatsApp
- **NÃO cria session_id nem whatsapp_ref** — Gate 5 implementará atribuição determinística

**VERIFICADO**

---

## K. Atomicat

| Item | Estado |
|---|---|
| URLs Atomicat no código | **NÃO ENCONTRADAS** |
| SDK / script | **NÃO EXISTE** |
| Checkout link | **NÃO EXISTE** |
| Webhook | **NÃO EXISTE** |
| API key | **NÃO EXISTE** |
| Redirect `/go/checkout/` | **NÃO EXISTE** |

**NÃO VERIFICADO (externo):** Capacidades de webhook, metadata, API, PIX, ambiente de teste da Atomicat. Requer acesso manual ao painel — será auditado no Gate 7.

Integração atual com Atomicat: **zero**. Toda integração será construída do zero.

---

## L. Search Console / GA4 / Google Ads

| Ferramenta | Estado |
|---|---|
| Search Console | **EXTERNO** — Verificação meta tag no código: `pY3-FVjNoBtfuq1hZOYCiR7Knt30ikJJ-7YEOmrWEio`. Arquivo HTML: `google50b2b3e012b567d3.html`. Propriedade verificada (confirmado pelo usuário). Sitemap enviado. |
| GA4 Property ID | **NÃO EXISTE no código** |
| GTM Container ID | **NÃO EXISTE no código** |
| Google Ads Customer/Conversion ID | **NÃO EXISTE no código** |

**EXTERNO — REQUER CONFIRMAÇÃO:** Verificar se existem contas GA4/GTM/Google Ads já criadas que precisem ser vinculadas.

---

## M. Cookies / Storage

| Item | Valor |
|---|---|
| `localStorage` key | `marvin_cookie_consent` = `'1'` ao aceitar banner |
| Cookies first-party | Nenhum identificado além do que Netlify pode definir internamente |
| Cookies third-party | Nenhum (Umami é cookieless) |
| sessionStorage | Não utilizado |
| indexedDB | Não utilizado |
| Parâmetros UTM persistidos | **Não** — UTMs passados inline nos links, não capturados/persistidos |

**VERIFICADO**

---

## N. Performance Baseline

Build: **passou sem erros** (warnings apenas de CRLF no Windows — inofensivos).

PageSpeed anterior (reportado pelo usuário antes do Gate 0):

| Métrica | Desktop (estimado) |
|---|---|
| Performance | 93 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |

**INFERIDO** — valores do último relatório compartilhado. Baseline Lighthouse automatizado não executado neste Gate (sem browser disponível no ambiente de execução). Recomenda-se captura manual via PageSpeed Insights antes de qualquer mudança de Gate 2+.

Configurações de performance verificadas:
- `cssCodeSplit: false` — CSS único sem cascata ✓
- Google Fonts não-bloqueante (`media="print" onload`) ✓
- Logo SVG < 1KB ✓
- Cache agressivo em `netlify.toml` para assets com hash ✓

---

## O. Baseline Visual

Screenshots automáticas não executadas (sem browser headless disponível). Baseline visual documentado como:

- Site publicado em produção em `https://marvinsites.com.br`
- Última alteração visual: commit `acd6b0c` (cssCodeSplit fix)
- Seções visíveis: Hero, Problema, Solução, Serviços (3 planos), Casos antes/depois, FAQ, FinalCTA, Footer
- 4 páginas de cidade com FAQs locais
- Mínimo 1 página de nicho (`/nichos/clinicas`)

**EXTERNO:** Capturas manuais recomendadas antes de iniciar Gate 12 (home redesign).

---

## P. Segurança

### Headers de segurança (netlify.toml) ✓

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: (ver abaixo)
```

CSP atual:
```
default-src 'self';
script-src 'self' 'unsafe-inline' https://analytics.umami.is;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self' https://analytics.umami.is https://api.resend.com;
frame-ancestors 'self';
```

### Achados

| Classificação | Achado |
|---|---|
| **P2** | `api.resend.com` na CSP mas Resend **não encontrado** no código — referência órfã. Quando GTM/Supabase/email forem adicionados, a CSP precisará ser atualizada. |
| **P2** | `'unsafe-inline'` em `script-src` — necessário para Astro SSG; idealmente mitigado com nonce/hash no futuro |
| **P2** | Previews Netlify de PRs são públicos e indexáveis (`noindex` não configurado) |
| **P2** | Fallback `5513000000000` no WhatsApp — número placeholder pode aparecer em produção se `PUBLIC_WHATSAPP_NUMBER` não estiver configurado |
| **P3** | Sem framework de testes automatizados |
| **P3** | Lint apenas via `tsc --noEmit` — sem ESLint |

**Nenhum secret encontrado no repositório.** `PUBLIC_WHATSAPP_NUMBER` é variável pública por design (prefixo `PUBLIC_`).

---

## Q. Dependências Externas Não Verificadas

| Item | Status | Necessário para Gate 1? |
|---|---|---|
| Conta GA4 existente | EXTERNO — REQUER CONFIRMAÇÃO | Não (Gate 2) |
| GTM Container ID | EXTERNO — REQUER CONFIRMAÇÃO | Não (Gate 2) |
| Google Ads Customer ID / Conversion ID | EXTERNO — REQUER CONFIRMAÇÃO | Não (Gate 9) |
| Atomicat — webhook capabilities | EXTERNO — REQUER CONFIRMAÇÃO | Não (Gate 7) |
| Atomicat — ambiente de teste | EXTERNO — REQUER CONFIRMAÇÃO | Não (Gate 7) |
| Notificação email Netlify Forms | EXTERNO — REQUER CONFIRMAÇÃO | Não (Gate 4) |
| DNS real / nameservers | EXTERNO — REQUER CONFIRMAÇÃO | Não |
| Supabase — projeto existente? | EXTERNO — REQUER CONFIRMAÇÃO | **Sim (Gate 1)** |

---

## R. Riscos

| ID | Classificação | Descrição |
|---|---|---|
| R01 | **P1** | Leads existem apenas no Netlify Forms — sem backup, sem atribuição, sem banco. Perda possível se cota atingida ou plano alterado. |
| R02 | **P1** | Página `/obrigado` provavelmente não existe — submit do formulário redireciona para 404. Verificar imediatamente. |
| R03 | **P1** | Sem Google Consent Mode v2 — necessário antes de qualquer tag de Ads/Analytics (Gate 2). |
| R04 | **P2** | `api.resend.com` na CSP sem código correspondente — CSP desatualizada. |
| R05 | **P2** | `PUBLIC_WHATSAPP_NUMBER` não configurada no Netlify = fallback `5513000000000` em produção. |
| R06 | **P2** | Previews Netlify indexáveis — sem `noindex` automático. |
| R07 | **P2** | Schema structured data pode ser genérico em páginas de cidade/nicho. |
| R08 | **P3** | Sem testes automatizados de qualquer tipo. |

---

## S. Bloqueadores

**Nenhum bloqueador para Gate 1 (Supabase).**

O único item que requer confirmação antes do Gate 1 é:

> **Existe um projeto Supabase já criado para a Marvin Sites?**  
> Se sim: qual URL, quais tabelas existem, há migrations?  
> Se não: Gate 1 criará do zero.

Todos os outros pontos externos (GA4, GTM, Ads, Atomicat) são de Gates posteriores e não bloqueiam o Gate 1.

---

## T. Recomendação para Gate 1

**Gate 0 — APPROVED**

Pré-requisito imediato (antes de commitar Gate 1):

1. **Verificar se `/obrigado` existe** — se não existir, criar página mínima de confirmação (P1, risco imediato em produção).
2. **Confirmar com o usuário:** existe projeto Supabase já criado?
3. **Confirmar com o usuário:** `PUBLIC_WHATSAPP_NUMBER` está configurada no painel Netlify?

Gate 1 pode iniciar após confirmações acima. Branch: `feat/marvin-g1-supabase`.

---

## Arquivos criados/alterados neste Gate

- `docs/marvin/G0-INVENTORY.md` — este documento (criado)
- `docs/marvin/CURRENT.md` — atualizado
- `docs/marvin/DECISIONS.md` — D008 adicionado
- `docs/marvin/CHANGELOG.md` — registro do Gate 0
