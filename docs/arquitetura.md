# Marvin Sites — Arquitetura Completa do Site
## Planejamento para build com Claude Code · Netlify via GitHub

---

## 1. Visão geral do projeto

**Domínio:** marvinsites.com.br (ou marvin.com.br)
**Stack:** Astro (SSG/SSR) + Tailwind CSS + Netlify Functions
**Repositório:** GitHub → Netlify (deploy automático por branch)
**Objetivo central:** Um único CTA — abrir conversa no WhatsApp.

O site da Marvin Sites não é um portfólio técnico. É uma ferramenta de vendas. Cada decisão de arquitetura deve ser avaliada com essa lente.

---

## 2. Escolha do stack — justificativa

### Framework: Astro

**Por quê Astro e não Next.js, Gatsby ou CRA?**

| Critério | Astro | Next.js |
|---|---|---|
| Performance out-of-the-box | Excelente — zero JS por padrão | Boa, mas com overhead de hidratação |
| SEO local | Perfeito — HTML estático puro | Bom, mas depende de configuração |
| Curva de aprendizado | Baixa para sites estáticos | Maior |
| Custo de hospedagem | Zero no Netlify (estático) | Pode gerar custos serverless |
| Velocidade de build | Alta | Média |

Astro entrega HTML puro para o navegador. Sem JavaScript desnecessário. Isso significa Core Web Vitals altíssimos — essencial para SEO local.

### CSS: Tailwind CSS v4

Produtividade alta, classes utilitárias que facilitam manutenção via Claude Code, e modo `purge` elimina CSS não utilizado em produção.

### Hospedagem: Netlify

- Deploy automático via push no GitHub
- CDN global incluído (importante para velocidade)
- Netlify Forms para captura de leads sem backend próprio
- Netlify Functions para lógica serverless (ex: envio de notificação)
- SSL automático via Let's Encrypt
- Headers de segurança configuráveis via `netlify.toml`
- Preview deploys por branch (para testar mudanças antes de subir)

### Alternativa avaliada e descartada: WordPress

WordPress foi descartado porque:
- Superfície de ataque enorme (plugins, vulnerabilidades frequentes)
- Performance inferior sem configuração avançada
- Manutenção constante
- Desnecessariamente complexo para o escopo do projeto

---

## 3. Estrutura de arquivos do repositório

```
marvin-sites/
├── .github/
│   └── workflows/
│       └── lighthouse.yml         # Audit automático de performance
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml                # Gerado automaticamente pelo Astro
│   ├── og-image.jpg               # Open Graph para redes sociais
│   └── images/
│       ├── portfolio/             # Exemplos por nicho
│       └── team/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── WhatsAppButton.astro   # CTA fixo — presente em toda página
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── Problem.astro
│   │   │   ├── Solution.astro
│   │   │   ├── Services.astro
│   │   │   ├── Portfolio.astro
│   │   │   ├── Testimonials.astro
│   │   │   ├── FAQ.astro
│   │   │   └── FinalCTA.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── Card.astro
│   │       ├── Badge.astro
│   │       └── DiagnosticForm.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro       # Meta tags, schema, analytics
│   │   └── NichoLayout.astro     # Layout para páginas de nicho
│   ├── pages/
│   │   ├── index.astro            # Homepage
│   │   ├── obrigado.astro         # Pós-formulário
│   │   ├── privacidade.astro      # Política de Privacidade (LGPD)
│   │   ├── termos.astro           # Termos de Uso
│   │   ├── nichos/
│   │   │   ├── clinicas.astro
│   │   │   ├── contadores.astro
│   │   │   ├── reformas.astro
│   │   │   ├── estetica.astro
│   │   │   ├── turismo.astro
│   │   │   └── professores.astro
│   │   └── blog/                  # Futuro — conteúdo para SEO
│   │       └── [...slug].astro
│   ├── content/
│   │   ├── portfolio/             # Dados dos exemplos de portfólio (JSON/MD)
│   │   ├── testimonials/          # Depoimentos (JSON)
│   │   └── nichos/                # Conteúdo por nicho (MD)
│   ├── lib/
│   │   ├── analytics.ts           # Wrapper de eventos de analytics
│   │   ├── whatsapp.ts            # Gerador de links com UTMs
│   │   └── schema.ts              # JSON-LD helpers
│   └── styles/
│       └── global.css             # Variáveis CSS, resets, tipografia base
├── netlify/
│   └── functions/
│       ├── contact.ts             # Processa formulário e notifica por email
│       └── diagnostico.ts         # Endpoint do formulário de diagnóstico
├── netlify.toml                   # Configuração de build, redirects e headers
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

---

## 4. Estrutura de páginas

### 4.1 Homepage — `/`

Ordem das seções (baseada em lógica de conversão, não de apresentação):

```
1. HEADER (fixo, sticky)
   - Logo
   - Menu minimal (Serviços, Exemplos, Contato)
   - Botão WhatsApp destacado

2. HERO
   - Headline: proposta de valor em 1 frase
   - Subheadline: detalha o benefício sem jargão
   - CTA primário: "Quero ver como ficaria meu negócio"
   - CTA secundário: "Ver exemplos"
   - Elemento visual: exemplo de site no celular (mobile-first)

3. PROBLEMA
   - Subheadline: "O que acontece quando o cliente pesquisa e não encontra nada claro?"
   - Lista de perdas invisíveis (sem bullet points — copy em fluxo)
   - Elemento visual: exemplo de busca no Google sem resultado satisfatório

4. SOLUÇÃO
   - O que a Marvin Sites entrega
   - Como funciona (processo em 3 passos — simples)
   - Diferenciais sem jargão técnico

5. SERVIÇOS
   - 3 ofertas com preço visível (ou "a partir de")
   - Card com o que inclui cada uma
   - CTA individual por oferta

6. PORTFÓLIO / EXEMPLOS
   - Exemplos por nicho (clínica, contador, reforma...)
   - Link para cada nicho detalhado
   - Antes/depois quando disponível

7. DEPOIMENTOS
   - Começa vazio, componente já preparado
   - Fallback: "Primeiros clientes com desconto de validação"

8. FAQ
   - Perguntas reais do processo de venda
   - Sem jargão nas respostas

9. CTA FINAL
   - Diagnóstico de presença digital gratuito
   - Formulário mínimo: nome, cidade, segmento, WhatsApp
   - Ou botão direto para WhatsApp

10. FOOTER
    - Links legais (Privacidade, Termos)
    - CNPJ/razão social
    - Redes sociais
    - WhatsApp

11. BOTÃO WHATSAPP FLUTUANTE (fixo no canto inferior direito)
    - Sempre visível
    - Mais proeminente no mobile
```

---

### 4.2 Páginas por nicho — `/nichos/[slug]`

Cada página de nicho é uma landing page específica com:

- Headline focada no problema daquele nicho
- Exemplos de sites daquele segmento
- Argumento central do nicho (conforme documento fundacional)
- CTA para WhatsApp com mensagem pré-preenchida específica
- Schema LocalBusiness e breadcrumb
- URL amigável: `/nichos/clinicas-estetica`, `/nichos/contadores`

**Benefício estratégico:** essas páginas rankeiam para buscas específicas como "site para contador Santos" ou "site para clínica estética Guarujá".

---

### 4.3 Página de Diagnóstico — integrada à homepage

O formulário de diagnóstico não precisa ser uma página separada. Ele vive como seção na homepage. Quando enviado:

1. Netlify Function processa o envio
2. Notificação chega por email (via Resend ou Mailgun — API simples)
3. Usuário é redirecionado para `/obrigado` com instrução de próximo passo
4. Evento de conversão é disparado para analytics

---

## 5. Performance — objetivos e estratégias

### Meta de Core Web Vitals

| Métrica | Meta | Por quê importa |
|---|---|---|
| LCP (Largest Contentful Paint) | < 1,5s | Velocidade de carregamento percebida |
| FID/INP | < 100ms | Resposta à interação |
| CLS (Cumulative Layout Shift) | < 0,05 | Estabilidade visual |
| Performance Score (Lighthouse) | > 95 | SEO e confiança |

### Como atingir

**Imagens:**
- Formato WebP com fallback JPEG
- `loading="lazy"` em todas as imagens abaixo do fold
- Dimensões explícitas (`width` e `height`) para evitar CLS
- Astro tem componente `<Image />` que otimiza automaticamente

**JavaScript:**
- Astro entrega zero JS por padrão
- JS somente onde necessário (formulário, botão WhatsApp com UTM dinâmico)
- Scripts de analytics carregam com `async` e apenas após consentimento LGPD

**Fontes:**
- Google Fonts com `font-display: swap`
- Preconnect declarado no `<head>`
- Subset apenas dos caracteres necessários (latin)

**CSS:**
- Tailwind purge elimina CSS não utilizado
- CSS crítico inline no `<head>` (above-the-fold)
- Resto carregado de forma não bloqueante

**CDN:**
- Netlify distribui automaticamente via CDN global
- Assets estáticos têm cache de 1 ano (`Cache-Control: max-age=31536000, immutable`)
- HTML com cache de curto prazo para permitir updates (`Cache-Control: no-cache`)

---

## 6. SEO — estratégia local

O SEO local é o maior canal de aquisição de médio/longo prazo da Marvin Sites.

### Estrutura técnica de SEO

**Meta tags por página:**
```html
<title>Sites para [Nicho] em [Cidade] | Marvin Sites</title>
<meta name="description" content="[Descrição específica por nicho e cidade]" />
<link rel="canonical" href="https://marvinsites.com.br/[slug]" />
```

**Open Graph para redes sociais:**
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="/og-image.jpg" />
<meta property="og:type" content="website" />
```

**Schema.org (JSON-LD):**

```json
// Homepage — LocalBusiness
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Marvin Sites",
  "description": "Sites e presença digital para pequenos negócios locais",
  "url": "https://marvinsites.com.br",
  "telephone": "+55-13-XXXXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Santos",
    "addressRegion": "SP",
    "addressCountry": "BR"
  },
  "areaServed": "Brasil",
  "priceRange": "R$697 - R$12.000"
}
```

```json
// Páginas de nicho — adicionar "@type": "Service"
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Site para Clínicas e Consultórios",
  "provider": { "@type": "LocalBusiness", "name": "Marvin Sites" },
  "description": "...",
  "areaServed": "Brasil"
}
```

**Sitemap:**
- Gerado automaticamente pelo Astro (plugin `@astrojs/sitemap`)
- Enviado ao Google Search Console
- Atualizado a cada deploy

**Robots.txt:**
```
User-agent: *
Allow: /
Disallow: /obrigado
Disallow: /api/

Sitemap: https://marvinsites.com.br/sitemap.xml
```

### Estratégia de conteúdo para SEO local

Páginas que devem existir para capturar buscas específicas:

| URL | Busca-alvo |
|---|---|
| `/nichos/clinicas` | "site para clínica" |
| `/nichos/contadores` | "site para contador" |
| `/nichos/reformas` | "site para empresa de reforma" |
| `/cidades/santos` | "criação de site em Santos SP" |
| `/cidades/guaruja` | "site para negócio em Guarujá" |
| `/blog/instagram-nao-substitui-site` | "instagram substitui site" |
| `/blog/quanto-custa-site-pequeno-negocio` | "quanto custa site pequeno negócio" |

---

## 7. Segurança

### 7.1 Headers HTTP (configurados no `netlify.toml`)

```toml
[[headers]]
  for = "/*"
  [headers.values]
    # Impede que o site seja carregado em iframes de terceiros
    X-Frame-Options = "SAMEORIGIN"
    
    # Impede que o browser "adivinhe" o tipo de conteúdo
    X-Content-Type-Options = "nosniff"
    
    # Controla informações de referência enviadas
    Referrer-Policy = "strict-origin-when-cross-origin"
    
    # Impede acesso a features sensíveis do browser sem necessidade
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    
    # Content Security Policy — crucial contra XSS
    Content-Security-Policy = """
      default-src 'self';
      script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https:;
      connect-src 'self' https://api.resend.com;
      frame-ancestors 'self';
    """
    
    # HSTS — força HTTPS por 1 ano
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
```

### 7.2 Formulários

- **Netlify Forms** processa os dados no servidor — sem exposição de chaves no frontend
- Rate limiting via Netlify (proteção contra spam/flood)
- Honeypot field (campo oculto) para bloquear bots simples
- Validação tanto no frontend (UX) quanto no backend serverless (segurança)

### 7.3 Netlify Functions

```typescript
// netlify/functions/contact.ts
// Validação rigorosa antes de processar

export const handler = async (event) => {
  // Aceita apenas POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const body = JSON.parse(event.body || '{}');
  
  // Sanitização de inputs
  const nome = sanitize(body.nome?.trim());
  const whatsapp = sanitize(body.whatsapp?.replace(/\D/g, ''));
  const cidade = sanitize(body.cidade?.trim());
  const segmento = sanitize(body.segmento?.trim());
  
  // Validação
  if (!nome || !whatsapp || whatsapp.length < 10) {
    return { statusCode: 400, body: JSON.stringify({ erro: 'Dados inválidos' }) };
  }
  
  // Envio via Resend (email) + notificação WhatsApp opcional
  await notificar({ nome, whatsapp, cidade, segmento });
  
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
```

### 7.4 Dependências

- Atualização mensal de dependências (via Dependabot no GitHub)
- `npm audit` a cada deploy para detectar vulnerabilidades
- Nunca expor variáveis de ambiente no bundle cliente

---

## 8. LGPD — Conformidade

A LGPD (Lei Geral de Proteção de Dados — Lei 13.709/2018) exige atenção especial para qualquer site que coleta dados de brasileiros.

### 8.1 O que o site coleta

| Dado | Finalidade | Base legal (LGPD) |
|---|---|---|
| Nome | Identificação do lead | Legítimo interesse / Consentimento |
| WhatsApp | Contato comercial | Consentimento explícito |
| Cidade | Segmentação regional | Legítimo interesse |
| Segmento | Qualificação do lead | Legítimo interesse |
| IP / cookies de analytics | Análise de tráfego | Consentimento |

### 8.2 Banner de consentimento (Cookie Consent)

Implementar um banner simples de cookies que:
- Aparece na primeira visita
- Explica o que é coletado e por quê
- Permite aceitar ou recusar cookies não essenciais
- Salva a preferência no `localStorage` (sem cookie próprio para isso)
- Bloqueia Google Analytics até o consentimento ser dado

**Biblioteca sugerida:** `vanilla-cookieconsent` (leve, sem dependências)

### 8.3 Política de Privacidade — obrigatória

Página `/privacidade` deve conter:

1. **Quem é o responsável pelos dados** — razão social, CNPJ, email de contato
2. **Que dados são coletados** — listagem clara
3. **Para que são usados** — finalidade específica
4. **Com quem são compartilhados** — ex: Netlify (hospedagem), Resend (email)
5. **Por quanto tempo ficam armazenados** — ex: 12 meses após último contato
6. **Direitos do titular** — acesso, correção, exclusão, portabilidade
7. **Como exercer os direitos** — email de contato: privacidade@marvinsites.com.br
8. **Como entrar em contato para dúvidas**

### 8.4 Formulários — consentimento explícito

Todo formulário deve ter:
```html
<label>
  <input type="checkbox" name="consentimento" required />
  Concordo com a 
  <a href="/privacidade">Política de Privacidade</a> 
  e autorizo o contato pelo WhatsApp informado.
</label>
```

O campo é obrigatório (`required`). Sem marcar, o formulário não envia.

### 8.5 Retenção e exclusão de dados

- Leads que não respondem em 6 meses: excluir da base
- Se um titular solicitar exclusão: responder em até 15 dias
- Não há banco de dados próprio — dados ficam no Netlify Forms + email

### 8.6 Processadores de dados (DPAs)

| Serviço | Finalidade | Conformidade LGPD |
|---|---|---|
| Netlify | Hospedagem e formulários | Possui DPA disponível |
| Resend / Mailgun | Envio de emails | Possui DPA disponível |
| Google Analytics | Análise de tráfego | Requer consentimento explícito |
| GitHub | Código-fonte | Sem dados de usuários finais |

---

## 9. Analytics — sem ser invasivo

### Stack recomendada

**Opção A: Google Analytics 4 (com consentimento)**
- Mais completo
- Requer banner de cookies
- Configurar `anonymize_ip: true`
- Configurar `storage: 'none'` antes do consentimento

**Opção B: Umami (auto-hospedado ou cloud)**
- Open source, sem cookies
- Conformidade LGPD nativa
- Não requer banner de cookies
- Mais simples, mas suficiente para o estágio atual

**Recomendação inicial:** Umami Cloud (plano gratuito suficiente) — menos atrito legal, mais focado nos dados que importam.

### Eventos a rastrear (independente da ferramenta)

```javascript
// Eventos críticos para otimizar conversão
trackEvent('hero_cta_click', { variant: 'whatsapp' });
trackEvent('servico_card_click', { plano: 'essencial' });
trackEvent('form_submit', { origem: 'diagnostico' });
trackEvent('whatsapp_button_click', { posicao: 'flutuante' });
trackEvent('portfolio_nicho_view', { nicho: 'clinicas' });
```

---

## 10. Infraestrutura de deploy — fluxo completo

```
Desenvolvedor (Claude Code)
        ↓
   Branch: feature/nova-secao
        ↓
   Pull Request no GitHub
        ↓
   Netlify gera Preview Deploy (URL única para revisar)
        ↓
   Review + aprovação
        ↓
   Merge na branch main
        ↓
   Netlify detecta push → build automático (Astro build)
        ↓
   Deploy para CDN global (< 1 minuto)
        ↓
   marvinsites.com.br atualizado
```

### `netlify.toml` — configuração base

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = "200"

# Redirect www para apex
[[redirects]]
  from = "https://www.marvinsites.com.br/*"
  to = "https://marvinsites.com.br/:splat"
  status = "301"
  force = true

# Cache agressivo para assets estáticos
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Todos os headers de segurança (conforme seção 7.1)
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
```

---

## 11. Variáveis de ambiente

Nunca colocar chaves de API no código. Usar variáveis de ambiente do Netlify.

```
# Configuradas no painel do Netlify (não no repositório)

RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
NOTIFICATION_EMAIL=marcos@marvinsites.com.br
WHATSAPP_NUMBER=5513XXXXXXXXX
SITE_URL=https://marvinsites.com.br

# Analytics (se GA4)
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Acessadas nas Functions assim:
```typescript
const apiKey = process.env.RESEND_API_KEY;
```

---

## 12. Estratégia de conteúdo e componentes para WhatsApp

O link de WhatsApp nunca deve ser apenas `https://wa.me/55XXXXXXXXXXX`. Deve incluir:

1. **Mensagem pré-preenchida** contextual à origem
2. **UTM parameters** para rastrear de onde veio

```typescript
// src/lib/whatsapp.ts
export function gerarLinkWhatsApp({
  numero,
  mensagem,
  origem,
  nicho,
}: WhatsAppParams): string {
  const mensagemEncoded = encodeURIComponent(mensagem);
  const baseUrl = `https://wa.me/${numero}?text=${mensagemEncoded}`;
  
  // UTM para analytics
  const utmParams = new URLSearchParams({
    utm_source: 'site',
    utm_medium: 'whatsapp-button',
    utm_campaign: origem,
    utm_content: nicho || 'geral',
  });
  
  return `${baseUrl}&${utmParams}`;
}

// Exemplo de uso por nicho
const linkClinica = gerarLinkWhatsApp({
  numero: '55XXXXXXXXXXX',
  mensagem: 'Olá! Vi o site da Marvin Sites e gostaria de saber como ficaria uma página para minha clínica.',
  origem: 'pagina-clinicas',
  nicho: 'saude-estetica',
});
```

---

## 13. Portfólio e exemplos — estratégia de conteúdo

Antes de ter clientes reais, o portfólio deve ser construído com:

### 13.1 Demos por nicho (necessário desde o dia 1)

Criar páginas de demonstração para pelo menos 3 nichos:
- `demo-clinica.marvinsites.com.br` (subdomínio Netlify)
- `demo-contador.marvinsites.com.br`
- `demo-reforma.marvinsites.com.br`

Essas demos são o principal argumento de venda antes de ter clientes reais.

### 13.2 Estrutura de dados do portfólio

```json
// src/content/portfolio/clinica-estetica-santos.json
{
  "id": "clinica-estetica-santos",
  "nicho": "saude-estetica",
  "nome": "Espaço Bella Vita",
  "cidade": "Santos, SP",
  "tipo": "demo",
  "descricao": "Clínica de estética com foco em harmonização facial",
  "url_demo": "https://demo-clinica.marvinsites.com.br",
  "imagem_before": null,
  "imagem_after": "/images/portfolio/clinica-bella-vita.jpg",
  "servicos_criados": ["Página inicial", "Serviços", "Contato"],
  "destaque": "Botão de WhatsApp com 3 opções de serviço direto"
}
```

---

## 14. Acessibilidade

Um site de uma empresa de sites precisa dar exemplo.

Requisitos mínimos:

- Contraste de texto ≥ 4.5:1 (WCAG AA)
- Alt text em todas as imagens
- Navegação por teclado funcional
- Labels em todos os campos de formulário
- `aria-label` em botões com apenas ícone (ex: botão WhatsApp flutuante)
- `prefers-reduced-motion` respeitado nas animações

---

## 15. Monitoramento pós-deploy

### Ferramentas gratuitas para monitorar

| Ferramenta | O que monitora | Custo |
|---|---|---|
| Netlify Analytics | Tráfego, pageviews | Gratuito básico |
| Google Search Console | Indexação, queries de busca | Gratuito |
| PageSpeed Insights | Performance, Core Web Vitals | Gratuito |
| UptimeRobot | Disponibilidade (uptime) | Gratuito até 50 monitores |
| Netlify deploy notifications | Falhas de build | Gratuito |

### Ação mínima semanal

- Verificar se o site está no ar (UptimeRobot alerta automaticamente)
- Revisar leads recebidos via formulário
- Verificar Core Web Vitals no Search Console mensalmente

---

## 16. Roadmap de implementação

### Fase 1 — MVP (semana 1-2)

- [ ] Repositório GitHub criado e conectado ao Netlify
- [ ] Projeto Astro inicializado com Tailwind
- [ ] `netlify.toml` configurado com headers de segurança
- [ ] Homepage com todas as seções (sem depoimentos reais ainda)
- [ ] Formulário de diagnóstico funcionando
- [ ] Netlify Function de email configurada
- [ ] Botão WhatsApp flutuante com link correto
- [ ] Política de Privacidade publicada
- [ ] Banner de cookies básico
- [ ] Domínio configurado com SSL
- [ ] Google Search Console configurado

### Fase 2 — Nichos e SEO (semana 3-4)

- [ ] 3 páginas de nicho (clínicas, contadores, reformas)
- [ ] 3 demos funcionando em subdomínios
- [ ] Schema LocalBusiness implementado
- [ ] Sitemap enviado ao Google
- [ ] Open Graph configurado

### Fase 3 — Autoridade (mês 2-3)

- [ ] Primeiros depoimentos de clientes reais
- [ ] Casos com "antes/depois" reais
- [ ] 2 artigos de blog para SEO
- [ ] Páginas por cidade (Santos, Guarujá, etc.)
- [ ] Google Analytics ou Umami com eventos configurados

### Fase 4 — Escala (mês 4+)

- [ ] Blog com calendário editorial
- [ ] Mais páginas de nicho
- [ ] Mais páginas por cidade
- [ ] A/B test de CTAs
- [ ] Otimização de conversão baseada em dados

---

## 17. Decisões técnicas que o Claude Code precisa saber

Ao usar o Claude Code para construir o site, passe estas instruções:

### Preferências de código

1. **TypeScript em tudo** — inclusive arquivos `.astro`
2. **Sem CSS-in-JS** — usar Tailwind ou CSS modules
3. **Componentes pequenos e reutilizáveis** — cada seção é um componente
4. **Sem dependências desnecessárias** — checar `npm install` antes de aceitar
5. **Acessibilidade como padrão** — aria-labels, alt texts, contraste

### Padrão de commit

```
feat: adiciona seção de serviços
fix: corrige link de WhatsApp no mobile
perf: otimiza imagens do portfólio para WebP
content: adiciona página de nicho para contadores
style: ajusta espaçamento do hero no mobile
```

### Branches

- `main` — produção (deploy automático)
- `develop` — desenvolvimento (preview deploy)
- `feature/nome-da-feature` — novas funcionalidades

---

## 18. Checklist de lançamento

Antes de apontar o domínio real para o site, verificar:

**Performance**
- [ ] Lighthouse Score > 90 em todas as métricas
- [ ] Site abre em menos de 2s em 3G

**SEO**
- [ ] Todas as páginas têm `<title>` e `<meta description>` únicos
- [ ] Schema.org implementado
- [ ] Sitemap gerado e acessível em `/sitemap.xml`
- [ ] `robots.txt` correto

**Segurança**
- [ ] Headers HTTP configurados (verificar em securityheaders.com)
- [ ] SSL ativo (testar em ssllabs.com)
- [ ] Formulários com validação e honeypot

**LGPD**
- [ ] Política de Privacidade publicada
- [ ] Termos de Uso publicados
- [ ] Banner de cookies funcionando
- [ ] Checkbox de consentimento nos formulários
- [ ] Email de privacidade configurado

**Conversão**
- [ ] Botão de WhatsApp funciona (testar no mobile)
- [ ] Formulário envia e notificação chega
- [ ] Página `/obrigado` existe e faz sentido
- [ ] Link de WhatsApp com mensagem pré-preenchida correta

**Conteúdo**
- [ ] Nenhum texto de placeholder (Lorem Ipsum)
- [ ] Preços ou faixas de preço visíveis
- [ ] Imagens otimizadas (sem arquivos > 200kb)
- [ ] Todos os links funcionando

---

## Resumo executivo

| Decisão | Escolha | Motivo |
|---|---|---|
| Framework | Astro | Performance máxima, HTML estático, SEO perfeito |
| CSS | Tailwind CSS | Produtividade + manutenibilidade |
| Hospedagem | Netlify | Gratuito, CDN global, SSL automático |
| Formulários | Netlify Forms + Function | Sem backend próprio, seguro, simples |
| Email | Resend | API simples, gratuito até 3k/mês |
| Analytics | Umami | Sem cookies, conformidade LGPD nativa |
| Banco de dados | Nenhum | Complexidade desnecessária no estágio atual |
| Segurança | Headers HTTP + CSP | Proteção sem custo, configuração via netlify.toml |
| LGPD | Consentimento explícito + Política | Conformidade legal mínima necessária |
| Monitoramento | UptimeRobot + Search Console | Gratuito, cobre o essencial |

---

*Marvin Sites — Documento de Arquitetura v1.0*
*Gerado para uso com Claude Code + Netlify + GitHub*
