# Marvin Local — Security Spec

**Status:** DRAFT — Gate 0.5  
**Última atualização:** 27/08/2026

---

## Princípios herdados (docs/marvin/TECH-SPEC.md)

- RLS em todas as tabelas Supabase
- Nenhuma service key no browser
- Edge Functions para APIs externas (Places, Resend, Atomicat)
- Secrets somente server-side
- Logs sem PII desnecessária
- Migrations versionadas
- Nenhum endpoint público funcionando como proxy genérico

---

## Ameaça específica do Raio-X

**O Raio-X gratuito não pode virar API pública de terceiros.**

Sem proteção adequada, qualquer pessoa poderia usar o backend da Marvin como proxy gratuito para:
- Consultar Google Places
- Analisar sites alheios em escala
- Gerar scans para fins não relacionados

---

## Proteções obrigatórias para o Raio-X

| Proteção | Implementação | MS-Gate |
|---|---|---|
| Rate limit por IP | Middleware / Edge Function | MS-G3 |
| Rate limit por sessão | Supabase + Edge | MS-G3 |
| Limite de scans por telefone | Supabase check | MS-G3 |
| Honeypot | Campo oculto no formulário | MS-G7 |
| Fila / throttle interno | Queue table ou pg_net | MS-G3 |
| Quotas internas por período | Supabase + cron | MS-G3 |
| Turnstile (Cloudflare) | Somente se abuso real confirmado | quando necessário |

Não colocar CAPTCHA pesado no lançamento se não houver abuso real.

---

## APIs externas

| API | Como expor | Proibido |
|---|---|---|
| Google Places | Edge Function only | nunca expor key no browser |
| PageSpeed Insights | Edge Function only | nunca expor key no browser |
| Resend | Edge Function only | nunca expor key no browser |
| Atomicat | Edge Function only | nunca expor key no browser |

---

## Autenticação (Radar)

- Raio-X: sem conta obrigatória antes do resultado
- Radar: magic link via Supabase Auth
- Não criar senha tradicional inicialmente
- Google OAuth: posteriormente, quando necessário

---

## Dados em repouso

- PII em Supabase (RLS + PostgreSQL encryption nativo)
- Nenhum dado bruto de Google fora do escopo da política vigente
- `place_id` pode ser armazenado — outros campos verificar política
- Logs de Edge Function sem PII

---

## Dados em trânsito

- HTTPS obrigatório em todos os endpoints
- Supabase Edge Functions sempre via HTTPS
- Headers de segurança herdados de netlify.toml (site) e configuração própria (app)

---

## Auditoria

- `audit_log` registra operações sensíveis (herdado do modelo compartilhado)
- Scan runs têm `created_at`, `source`, `trigger`
- Sem alteração de dados sem rastro

---

## Ambientes

| Ambiente | Supabase | Notas |
|---|---|---|
| Desenvolvimento | Free / branch | pausar inatividade no Free |
| Produção | Pro (US$25/mês) | quando começar a cobrar |

Separar secrets por ambiente. Nunca usar credenciais de produção em desenvolvimento.

---

## Checklist de segurança antes do MS-G9 (beta fechado)

- [ ] RLS ativo e testado em todas as tabelas do SaaS
- [ ] Nenhuma service key exposta
- [ ] Rate limit funcionando
- [ ] Honeypot presente no formulário
- [ ] Quotas internas configuradas
- [ ] Logs sem PII desnecessária
- [ ] Ambientes separados
- [ ] Revisão de headers CSP para `app.marvinsites.com.br`
