# Marvin Sites — Estado Atual

**Atualizar a cada Gate concluído.**

---

## Gate atual

**G0 — Inventário e baseline** ✅ APPROVED

## Branch atual

`chore/marvin-g0-inventory`

## HEAD

`e6a2360` — docs(marvin): add canonical implementation specs v1.0

## Working tree

Limpo.

## O que está concluído

### Site (marvinsites.com.br)
- [x] Layout e identidade visual base (Astro + Tailwind)
- [x] Header com logo SVG (`/favicon.svg`)
- [x] Hero, Problem, Solution, Services, Testimonials, FinalCTA, Footer
- [x] 4 páginas de cidade (Santos, Guarujá, Praia Grande, São Vicente) com FAQs locais
- [x] Formulário de diagnóstico com honeypot + validação (via Netlify Forms)
- [x] Botão WhatsApp flutuante
- [x] Páginas /termos e /privacidade
- [x] Google Search Console verificado + sitemap enviado
- [x] Netlify deploy auto + redirects http/www → https/apex
- [x] Google Fonts não-bloqueante (`media="print" onload`)
- [x] cssCodeSplit desabilitado (elimina cascata CSS bloqueante)
- [x] Favicon SVG (logo mark colorido)
- [x] WCAG AA — múltiplas rodadas de correção de contraste
- [x] PageSpeed: 93 Performance, 96 Accessibility, 100 Best Practices, 100 SEO
- [x] Pelo menos 1 página de nicho (`/nichos/clinicas`)

### Documentação (docs/marvin/)
- [x] TECH-SPEC.md — spec técnica completa v1.0
- [x] DATA-MODEL.md — modelo de dados Supabase
- [x] TRACKING-SPEC.md — GTM, GA4, Ads, UTM, atribuição
- [x] PRIVACY-SPEC.md — consentimento, retenção, LGPD
- [x] ATOMICAT-INTEGRATION.md — integração pagamento/hospedagem
- [x] EMAIL-SPEC.md — e-mail marketing
- [x] SEO-SPEC.md — SEO técnico e arquitetura da home
- [x] TEST-PLAN.md — plano de testes
- [x] DECISIONS.md — 8 decisões registradas (D001–D008)
- [x] PLANO-MESTRE.md — plano comercial estratégico v1.0
- [x] CHANGELOG.md — histórico de mudanças
- [x] G0-INVENTORY.md — inventário técnico completo

## Bloqueios conhecidos

### Confirmar antes de iniciar Gate 1:

1. **Existe projeto Supabase já criado para Marvin Sites?** (Gate 1 depende disso)
2. **`PUBLIC_WHATSAPP_NUMBER` está configurada no Netlify?** (P2 — fallback placeholder pode estar em produção)
3. **Página `/obrigado` existe?** (P1 — formulário redireciona para essa URL; se não existir, submit vai para 404)

### Externas (Gates posteriores):
- GA4/GTM/Google Ads: contas não auditadas (Gate 2)
- Atomicat: capacidades de webhook/API não validadas (Gate 7)

## Riscos ativos

| ID | Prioridade | Descrição |
|---|---|---|
| R01 | P1 | Leads só existem no Netlify Forms — sem banco, sem atribuição |
| R02 | P1 | Página `/obrigado` provavelmente não existe — confirmar |
| R03 | P1 | Sem Google Consent Mode v2 (necessário para Gate 2) |
| R04 | P2 | `api.resend.com` na CSP sem código correspondente |
| R05 | P2 | Fallback `5513000000000` no WhatsApp se env var ausente |

## Próxima missão

**Gate 1 — Supabase e segurança** no branch `feat/marvin-g1-supabase`

Aguardando:
- Confirmação sobre projeto Supabase existente
- Confirmação sobre `/obrigado`
- Autorização explícita para iniciar Gate 1

**NÃO INICIAR GATE 1 sem autorização.**

## Preview

https://marvinsites.com.br

## Stack verificada

- Astro 4.16.0 / Tailwind CSS 3.4.0 / TypeScript 5.6.0
- Node v24 local / Node 20 no Netlify build
- npm 11 / package-lock.json
- Deploy: Netlify (branch main → auto-deploy)
- Analytics: Umami only (cookieless)
- Formulário: Netlify Forms (sem backend próprio)
