# Marvin Sites — Estado Atual

**Atualizar a cada Gate concluído.**

---

## Gate atual

**G0 — Inventário e baseline** (pendente)

## Branch atual

`main`

## HEAD

`acd6b0c` — perf: desativa cssCodeSplit — elimina cadeia de CSS bloqueante

## Working tree

Limpo. Nada a commitar.

## O que está concluído

### Site (marvinsites.com.br)
- [x] Layout e identidade visual base (Astro + Tailwind)
- [x] Header com logo SVG (`/favicon.svg`)
- [x] Hero, Problem, Solution, Services, Testimonials, FinalCTA, Footer
- [x] 4 páginas de cidade (Santos, Guarujá, Praia Grande, São Vicente) com FAQs locais
- [x] Formulário de diagnóstico com honeypot + validação
- [x] Botão WhatsApp flutuante
- [x] Páginas /termos e /privacidade
- [x] Google Search Console verificado + sitemap enviado
- [x] Netlify deploy auto + redirects http/www → https/apex
- [x] Google Fonts não-bloqueante (`media="print" onload`)
- [x] cssCodeSplit desabilitado (elimina cascata CSS bloqueante)
- [x] Favicon SVG (logo mark colorido)
- [x] WCAG AA — múltiplas rodadas de correção de contraste
- [x] PageSpeed: 93 Performance, 96 Accessibility, 100 Best Practices, 100 SEO

### Documentação
- [x] `docs/marvin/TECH-SPEC.md` — spec técnica completa v1.0
- [x] `docs/marvin/DATA-MODEL.md` — modelo de dados Supabase
- [x] `docs/marvin/TRACKING-SPEC.md` — GTM, GA4, Ads, UTM, atribuição
- [x] `docs/marvin/PRIVACY-SPEC.md` — consentimento, retenção, LGPD
- [x] `docs/marvin/ATOMICAT-INTEGRATION.md` — integração pagamento/hospedagem
- [x] `docs/marvin/EMAIL-SPEC.md` — e-mail marketing
- [x] `docs/marvin/SEO-SPEC.md` — SEO técnico e arquitetura da home
- [x] `docs/marvin/TEST-PLAN.md` — plano de testes
- [x] `docs/marvin/DECISIONS.md` — registro de decisões
- [x] `docs/marvin/CHANGELOG.md` — changelog

## Bloqueios conhecidos

- Nenhum bloqueio crítico no momento.
- Capacidades de webhook/API da Atomicat ainda não validadas tecnicamente (Gate 7).
- GA4/GTM/Google Ads: contas existentes não auditadas (Gate 0).

## Próxima missão

**Gate 0 — Inventário e baseline** no branch `chore/marvin-g0-inventory`:

- [ ] Auditar stack e dependências exatas
- [ ] Mapear todas as URLs e redirects
- [ ] Inventariar tags, cookies, banner de consentimento atual
- [ ] Auditar formulários e links de WhatsApp
- [ ] Confirmar status do sitemap e Search Console
- [ ] Auditar contas Analytics/Ads existentes
- [ ] Auditar conta Atomicat e capacidades
- [ ] Screenshot baseline Lighthouse/PageSpeed
- [ ] Entregar CURRENT.md atualizado e DECISIONS.md

## Preview

https://marvinsites.com.br

## Testes pendentes

- Formulário de diagnóstico em produção (envio real)
- Verificar se Supabase está configurado
- Verificar GTM Container ID
