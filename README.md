# Marvin Sites

Site institucional e comercial da **Marvin Sites** — presença digital para pequenos negócios locais.

---

## O que é este projeto

A Marvin Sites ajuda pequenos negócios a serem encontrados no Google, transmitirem confiança e receberem contatos pelo WhatsApp. O site é, ele mesmo, uma demonstração disso: rápido, claro e com um único objetivo — abrir conversa.

Este repositório contém o código do site `marvinsites.com.br`.

---

## Stack

| Camada | Tecnologia | Por quê |
|---|---|---|
| Framework | [Astro](https://astro.build) | HTML estático puro, zero JS desnecessário, Core Web Vitals altos |
| CSS | [Tailwind CSS](https://tailwindcss.com) | Produtividade e manutenção simples |
| Hospedagem | [Netlify](https://netlify.com) | CDN global, SSL automático, deploy por push |
| Formulários | Netlify Forms + Functions | Sem backend próprio, sem banco de dados |
| Email | [Resend](https://resend.com) | Notificação de leads por email |
| Analytics | [Umami](https://umami.is) | Sem cookies, compatível com LGPD |

---

## Estrutura de arquivos

```
marvin-sites/
├── public/                    # Assets estáticos
│   ├── images/
│   │   └── portfolio/         # Exemplos por nicho
│   ├── robots.txt
│   └── og-image.jpg
├── src/
│   ├── components/
│   │   ├── layout/            # Header, Footer, WhatsAppButton
│   │   ├── sections/          # Seções da homepage (Hero, Problem, Services...)
│   │   └── ui/                # Componentes reutilizáveis
│   ├── layouts/
│   │   ├── BaseLayout.astro   # Meta tags, schema, analytics
│   │   └── NichoLayout.astro  # Layout para páginas de nicho
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   ├── nichos/            # Páginas por nicho (clínicas, contadores...)
│   │   ├── privacidade.astro  # Política de Privacidade (LGPD)
│   │   └── termos.astro       # Termos de Uso
│   ├── content/               # Dados de portfólio, depoimentos e nichos
│   └── lib/                   # Helpers: analytics, whatsapp, schema
├── netlify/
│   └── functions/             # contact.ts, diagnostico.ts
├── netlify.toml               # Build, redirects e headers de segurança
├── astro.config.mjs
└── tailwind.config.mjs
```

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/marvin-sites.git
cd marvin-sites

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:4321`.

---

## Deploy

O deploy é automático via Netlify a cada push na branch `main`.

```
push na main → build Astro → CDN Netlify → marvinsites.com.br
```

PRs e branches auxiliares geram **preview deploys** automáticos com URL única para revisão antes de subir para produção.

### Branches

| Branch | Ambiente | Deploy |
|---|---|---|
| `main` | Produção | Automático |
| `develop` | Desenvolvimento | Preview automático |
| `feature/*` | Funcionalidade | Preview automático |

---

## Variáveis de ambiente

Configurar no painel do Netlify (nunca commitar no repositório):

```
RESEND_API_KEY=           # Chave da API do Resend para envio de emails
NOTIFICATION_EMAIL=       # Email que recebe os leads do formulário
WHATSAPP_NUMBER=          # Número com DDI (ex: 5513XXXXXXXXX)
SITE_URL=                 # https://marvinsites.com.br
```

Para desenvolvimento local, criar um arquivo `.env` na raiz (já incluído no `.gitignore`).

---

## Segurança

Headers HTTP configurados no `netlify.toml`:

- `Content-Security-Policy` — proteção contra XSS
- `X-Frame-Options` — bloqueia embedding em iframes externos
- `X-Content-Type-Options` — previne MIME sniffing
- `Strict-Transport-Security` — força HTTPS (HSTS, 1 ano)
- `Referrer-Policy` — controla dados de referência
- `Permissions-Policy` — desabilita camera, mic e geolocalização

Formulários têm validação no frontend (UX) e no backend serverless (segurança), além de campo honeypot para bloquear bots.

---

## LGPD

O site coleta apenas os dados estritamente necessários para contato comercial:

- Nome, WhatsApp, cidade e segmento — via formulário de diagnóstico
- IP e pageviews — via Umami, sem cookies

Todos os formulários têm **checkbox de consentimento explícito** (obrigatório). A Política de Privacidade completa está em `/privacidade`. Para solicitações de acesso, correção ou exclusão de dados: `privacidade@marvinsites.com.br`.

---

## Performance

Metas de Core Web Vitals:

| Métrica | Meta |
|---|---|
| LCP | < 1,5s |
| INP | < 100ms |
| CLS | < 0,05 |
| Lighthouse Score | > 95 |

Estratégias: HTML estático, imagens em WebP com `loading="lazy"`, fontes com `font-display: swap`, Tailwind purge, cache agressivo via CDN.

---

## Comandos úteis

```bash
npm run dev        # Desenvolvimento local
npm run build      # Build de produção
npm run preview    # Preview do build localmente
npm run lint       # Lint do código
```

---

## Padrão de commits

```
feat: adiciona seção de serviços
fix: corrige link de WhatsApp no mobile
perf: otimiza imagens do portfólio para WebP
content: adiciona página de nicho para contadores
style: ajusta espaçamento do hero no mobile
docs: atualiza README
```

---

## Documentação do projeto

A arquitetura completa, decisões técnicas, estratégia de SEO, roadmap de implementação e checklist de lançamento estão documentados em:

- `docs/arquitetura.md` — estrutura técnica completa
- `docs/fundacional.md` — posicionamento, ofertas e estratégia comercial
- `docs/operacional.md` — rotina de prospecção, metas e funil de vendas

---

*Marvin Sites — Sites e presença digital para pequenos negócios locais.*
