# Marvin Sites — Especificação de Hosting e Deploy

**Versão:** 1.0 | **Data-base:** 28/08/2026

---

## Arquitetura de Hosting

```
GitHub (monorepo)
├── src/             → Netlify — marvinsites.com.br
├── apps/
│   └── marvin-app/  → Vercel — app.marvinsites.com.br  (FUTURO)
├── supabase/        → Supabase — backend compartilhado
└── docs/
```

### GitHub

Um único repositório Git. Sem submodules. Sem repositório aninhado.

### Netlify

**Domínio:** `marvinsites.com.br`

Responsável por:
- Site institucional e comercial
- SEO e indexação
- Landing pages por nicho e cidade
- Aquisição (CTA, formulário, diagnóstico)
- Conteúdo público estático

Não deve se transformar em host principal do SaaS.

### Vercel

**Domínio futuro:** `app.marvinsites.com.br`

Responsável futuramente por:
- Raio-X Marvin
- Marvin Radar
- Dashboard operacional
- Áreas autenticadas
- Interfaces SaaS interativas

**Status:** NÃO CONFIGURADO. Root Directory será `apps/marvin-app` quando existir.

> Antes do lançamento comercial: verificar termos e plano Vercel vigente para uso comercial. Alternativa: Cloudflare Workers/Pages se custo justificar. Decisão adiada para o Gate de criação do app.

### Supabase

**Project Ref:** `dboihbvjtdlgvugjxaam`  
**Project URL:** `https://dboihbvjtdlgvugjxaam.supabase.co`

Backend compartilhado entre site Netlify e app Vercel. Um único projeto. Sem instâncias separadas por produto.

---

## Domínios

| Destino | URL | Host |
|---|---|---|
| Site institucional | `https://marvinsites.com.br` | Netlify |
| App / SaaS | `https://app.marvinsites.com.br` | Vercel (futuro) |
| Backend | interno | Supabase |

DNS de `app.marvinsites.com.br` será configurado somente quando o projeto Vercel existir.

---

## Política de Deploy

### Regra principal

```
branch → testes locais → Preview → Gate APPROVED → 1 merge → 1 deploy de produção
```

**Não fazer merge em main a cada pequena correção.**  
**Não usar produção como ambiente de teste.**  
**Não gerar deploy de produção apenas para validar documentação.**

### Fluxo padrão

1. Desenvolvimento em branch feature/fix/chore
2. Build local + testes locais
3. Deploy Preview (Netlify) quando necessário
4. Gate aprovado pelo operador
5. Merge fast-forward em `main`
6. Um único deploy de produção

### Exceções — deploy intermediário autorizado

| Prioridade | Critério |
|---|---|
| P0 | Produção indisponível, falha crítica, risco de segurança |
| P1 urgente | Fluxo comercial quebrado (checkout, formulário, formulário essencial) |

Correções P2/P3 aguardam consolidação no próximo Gate.

**Exemplo histórico válido:** hotfix `/obrigado` — formulário de diagnóstico quebrava fluxo de aquisição em produção.

---

## Netlify — Otimização de Builds

### Ignore script

`scripts/netlify-ignore-build.mjs`

Configurado em `netlify.toml`:
```toml
[build]
  ignore = "node scripts/netlify-ignore-build.mjs"
```

**Convenção Netlify:**
- `exit 0` → build **cancelado** (skip)
- `exit 1` → build **prossegue**

### Diretórios que podem ser ignorados (quando exclusivos)

| Diretório | Racional |
|---|---|
| `docs/` | Documentação — sem impacto no site |
| `supabase/` | Migrations e testes de banco |
| `apps/` | App SaaS futuro — não afeta Netlify |

### Sempre geram build

- `src/` — código do site Astro
- `public/` — assets estáticos
- `package.json` / `package-lock.json` — dependências
- `netlify.toml` — configuração de build
- `astro.config.*` / `tailwind.config.*` / `tsconfig*`
- Qualquer arquivo fora das pastas ignoráveis
- Commit misto (docs + src) → BUILD

**Fail-safe:** incerteza = BUILD. O script nunca cancela em caso de erro.

### Cenários testados

| Cenário | Arquivos | Resultado esperado |
|---|---|---|
| A | `docs/marvin/CURRENT.md` | SKIP (exit 0) |
| B | `supabase/migrations/x.sql` | SKIP (exit 0) |
| C | `apps/marvin-app/x.ts` | SKIP (exit 0) |
| D | `src/pages/index.astro` | BUILD (exit 1) |
| E | `package.json` | BUILD (exit 1) |
| F | `netlify.toml` | BUILD (exit 1) |
| G | `src/... + docs/...` | BUILD (exit 1) |
| H | Sem `CACHED_COMMIT_REF` | BUILD (exit 1) / fail-safe |

---

## Vercel — Política futura

Quando `apps/marvin-app/` existir:

- Vercel Root Directory: `apps/marvin-app`
- Mudança apenas no site Netlify → não gera deploy Vercel
- Mudança apenas no app → não exige deploy Netlify
- Mudança compartilhada relevante → ambos podem buildar

---

## Integração site ↔ app

Acoplamento mínimo. O site deve funcionar sem o app disponível.

CTAs futuros do site apontarão para:
```html
<a href="https://app.marvinsites.com.br/raio-x">
  Fazer meu Raio-X gratuito
</a>
```

Esse cutover pertence ao **MS-G10**.

---

## Shared packages — futuro

Quando houver código verdadeiramente compartilhado entre site e app:

```
packages/
├── types/
├── tracking/
└── contracts/
```

npm workspaces será adicionado ao `package.json` somente quando existir necessidade real. Sem abstrações antecipadas.

---

## SEO

O site institucional é responsável pelo SEO comercial. O app não substitui páginas indexáveis.

| URL | Tipo |
|---|---|
| `marvinsites.com.br/clinicas` | Página SEO comercial (Netlify) |
| `app.marvinsites.com.br/raio-x` | Ferramenta (Vercel, noindex) |

Áreas autenticadas do app devem ser `noindex`. Detalhamento no Gate correspondente.

---

## Segredos

**Nunca em Git.** Nunca em logs públicos. Nunca em chat.

| Variável | Onde usar | Status G1 |
|---|---|---|
| `SUPABASE_URL` | Server-side only | Documentada, não configurada no Netlify |
| `SUPABASE_ANON_KEY` | Server-side only | Documentada, não configurada no Netlify |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side only | Documentada, não configurada no Netlify |
| `PUBLIC_WHATSAPP_NUMBER` | Netlify env | USER-CONFIRMED / EXTERNAL |

`PUBLIC_SUPABASE_*` com prefixo `PUBLIC_` → **proibido** (expõe no browser).
