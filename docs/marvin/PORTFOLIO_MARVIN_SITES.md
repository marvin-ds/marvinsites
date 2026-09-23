# Marvin Sites — Documentação Completa do Portfólio de Nichos

**Versão:** 1.0  
**Data-base:** Setembro/2026  
**Status:** Documento canônico para construção e manutenção do portfólio  
**Repositório:** `/docs/portfolio/PORTFOLIO_MARVIN_SITES.md`  
**Natureza:** Documento vivo. Qualquer alteração relevante deve ser registrada no changelog ao final deste arquivo.

---

## Sumário

1. [Visão estratégica do portfólio](#1-visão-estratégica-do-portfólio)
2. [Arquitetura de URLs e navegação](#2-arquitetura-de-urls-e-navegação)
3. [Integração com o site principal](#3-integração-com-o-site-principal)
4. [Os 22 nichos prioritários](#4-os-22-nichos-prioritários)
5. [Estrutura-padrão de cada site de nicho](#5-estrutura-padrão-de-cada-site-de-nicho)
6. [Sistema de design (design tokens)](#6-sistema-de-design-design-tokens)
7. [Banco de imagens e fontes visuais](#7-banco-de-imagens-e-fontes-visuais)
8. [Especificação técnica de cada nicho](#8-especificação-técnica-de-cada-nicho)
9. [Prompts para Claude Code / Codex](#9-prompts-para-claude-code--codex)
10. [Checklist de qualidade por site](#10-checklist-de-qualidade-por-site)
11. [SEO por nicho](#11-seo-por-nicho)
12. [Lista completa de negócios locais buscados no Google e IAs](#12-lista-completa-de-negócios-locais-buscados-no-google-e-ias)
13. [Diretrizes de copy por nicho](#13-diretrizes-de-copy-por-nicho)
14. [Pesquisa de referências de design](#14-pesquisa-de-referências-de-design)
15. [Roadmap de execução em fases](#15-roadmap-de-execução-em-fases)
16. [Regras gerais e critérios de qualidade](#16-regras-gerais-e-critérios-de-qualidade)
17. [Changelog](#17-changelog)

---

## 1. Visão estratégica do portfólio

### 1.1 Por que construir o portfólio

O portfólio de nichos é o principal ativo de prova e conversão da Marvin Sites. Ele cumpre quatro funções estratégicas simultaneamente:

**Função 1 — Prova visual durante a prospecção**
Quando um vendedor aborda um dentista no WhatsApp ou Instagram, ele pode enviar um link direto: "Olha um exemplo de como ficaria para o seu segmento." O prospect não precisa imaginar — ele vê.

**Função 2 — Argumento de autoridade de nicho**
Sites organizados por segmento transmitem especialização. Um contador que visita a página `marvinsites.com.br/exemplos/contador` entende que a Marvin já pensou nele — não é uma agência genérica.

**Função 3 — SEO orgânico de médio prazo**
Cada página de nicho bem estruturada pode aparecer nas buscas por "site para [nicho] em [cidade]" ou "como ter site profissional para [segmento]". São páginas de conteúdo com intenção comercial que trazem tráfego qualificado sem custo de mídia.

**Função 4 — Material para tráfego pago**
Cada site de nicho pode ser a landing page destino de anúncios no Google Ads ou Meta Ads segmentados por setor, cidade ou interesse.

### 1.2 Princípios inegociáveis

- **Nenhum site do portfólio deve parecer template.** O cliente que ver dois sites e perceber que são idênticos na estrutura visual perderá a confiança.
- **Cada site usa uma empresa fictícia com nome, cidade, bairro e identidade próprios.** Nunca "Empresa Exemplo" ou "Nome da Clínica".
- **Os sites não são demos técnicas.** São demonstrações comerciais de confiança, clareza e conversão.
- **Cada site tem um CTA funcional:** botão de WhatsApp que abre uma conversa com o número da Marvin Sites, com mensagem pré-preenchida do nicho.
- **Todo site é responsivo e roda bem no celular.** O cliente prospectado verá pelo smartphone na maioria das vezes.
- **Nenhum depoimento fictício será apresentado como depoimento real.** Usar sempre avaliações estilizadas como "baseadas em perfis reais de Google" ou simplesmente avaliações genéricas sem atribuição nomeada verificável.

### 1.3 O que os sites do portfólio NÃO são

- Não são sites de clientes reais.
- Não são templates para venda avulsa.
- Não são demonstrações de ferramentas.
- Não são modelos prontos para o cliente baixar.
- Não são páginas institucionais da Marvin Sites.

### 1.4 O que os sites do portfólio SÃO

- Demonstrações realistas de resultado.
- Prova de que a Marvin entrega qualidade visual e clareza comercial.
- Ferramentas de vendas internas.
- Páginas de SEO de nicho.
- Landing pages para campanhas.

---

## 2. Arquitetura de URLs e navegação

### 2.1 Estrutura de diretórios

```
marvinsites.com.br/
└── exemplos/
    ├── index.html                  ← Página de índice do portfólio (lista todos os nichos)
    ├── clinica-estetica/
    ├── consultorio-odontologico/
    ├── contador/
    ├── eletricista/
    ├── empresa-de-reforma/
    ├── salao-de-beleza/
    ├── psicologo/
    ├── fisioterapeuta/
    ├── advogado/
    ├── pousada/
    ├── nutricionista/
    ├── personal-trainer/
    ├── pizzaria-delivery/
    ├── corretor-de-imoveis/
    ├── escola-de-idiomas/
    ├── dedetizadora/
    ├── veterinario/
    ├── barbearia/
    ├── ar-condicionado/
    ├── distribuidora-de-bebidas/
    ├── pet-shop/
    └── pilates-academia/
```

### 2.2 Padrão de URL

- Sempre em português, sem acentos, com hífens.
- Sem números, datas ou sufixos técnicos.
- URL permanente — não renomear depois de publicar (impacto em SEO).

**Exemplos corretos:**
```
marvinsites.com.br/exemplos/psicologo/
marvinsites.com.br/exemplos/ar-condicionado/
marvinsites.com.br/exemplos/distribuidora-de-bebidas/
```

**Exemplos incorretos:**
```
marvinsites.com.br/exemplos/psicolog/          ← erro de digitação
marvinsites.com.br/exemplos/psicologo-v2/      ← versionamento na URL
marvinsites.com.br/exemplos/clinica_estetica/  ← underscore em vez de hífen
```

### 2.3 Página de índice do portfólio (`/exemplos/`)

A página `/exemplos/index.html` é a vitrine principal do portfólio. Ela deve:

- Ter um título claro: **"Exemplos de presença digital por segmento"**
- Ter um subtítulo explicativo: **"Veja como ficaria para o seu negócio. Cada exemplo é um site demonstrativo real, construído para mostrar o que é possível para cada tipo de negócio local."**
- Listar todos os nichos como cards clicáveis
- Cada card tem: ícone do segmento, nome do nicho, descrição de uma linha, botão "Ver exemplo"
- Ter um CTA ao final: **"Seu segmento não está aqui? Fale com a gente."** → abre WhatsApp
- Ser responsiva e carregar rápido
- Ter meta tags próprias para SEO

**Estrutura visual da página de índice:**

```
[Hero]
Título: Exemplos de presença digital por segmento
Subtítulo: Sites demonstrativos reais por tipo de negócio local

[Grid de cards — 3 colunas no desktop, 1 no mobile]
[Ícone] Clínica de Estética
         Organização, confiança e captação de clientes
         [Ver exemplo →]

[Ícone] Dentista / Consultório
         Presença profissional para quem busca no Google
         [Ver exemplo →]

... (todos os 22 nichos)

[CTA Final]
Seu segmento não está aqui?
[Falar com a Marvin →] (WhatsApp)
```

---

## 3. Integração com o site principal

### 3.1 Referência no menu principal

O menu de `marvinsites.com.br` deve incluir a entrada **"Exemplos"** apontando para `/exemplos/`.

Posição recomendada no menu: **penúltima posição**, antes do CTA principal.

```
[Início] [Serviços] [Como funciona] [Exemplos] [Diagnóstico gratuito →]
```

### 3.2 Seção na home

A home de `marvinsites.com.br` deve ter uma seção dedicada ao portfólio, posicionada após a seção de serviços ou depoimentos.

**Modelo da seção:**

```
── SEÇÃO PORTFÓLIO NA HOME ──────────────────────────────

Título:
"Veja como fica na prática"

Subtítulo:
"Construímos exemplos reais para os principais segmentos de negócios locais.
Clique no seu segmento e veja como ficaria para você."

[Grid com os 5-6 nichos prioritários como cards visuais]

[Botão]: Ver todos os exemplos →  → leva para /exemplos/

──────────────────────────────────────────────────────────
```

### 3.3 Links internos a partir das landing pages de nicho

Cada landing page de nicho da Marvin Sites (ex: `marvinsites.com.br/para-clinicas/`) deve ter um link para o exemplo correspondente: "Veja como ficaria → [link para /exemplos/clinica-estetica/]"

### 3.4 CTA no site de exemplo → volta para Marvin Sites

Todo site do portfólio deve ter, em posição visível (header e/ou banner discreto no topo), um aviso:

```
Este é um site demonstrativo da Marvin Sites.
Quer uma página assim para o seu negócio?
[Falar com a Marvin] → WhatsApp da Marvin Sites
```

Esse banner deve ser visualmente diferenciado (borda superior colorida ou faixa discreta), sem atrapalhar a experiência de visualização do site.

---

## 4. Os 22 nichos prioritários

Ordenados por prioridade estratégica (urgência de busca + volume + ticket comercial):

### Fase 1 — Prioridade máxima (construir primeiro)

| # | Nicho | Slug URL | Empresa fictícia sugerida | Cidade fictícia sugerida |
|---|---|---|---|---|
| 1 | Clínica de Estética | `clinica-estetica` | Studio Clara Vidal | Santos, SP |
| 2 | Eletricista / Serviços Elétricos | `eletricista` | Elétrica Forte | Campinas, SP |
| 3 | Dentista / Consultório Odontológico | `consultorio-odontologico` | Clínica Dr. Rafael Melo | Ribeirão Preto, SP |
| 4 | Contador / Escritório Contábil | `contador` | Contábil Horizonte | São Paulo, SP |
| 5 | Empresa de Reforma e Pintura | `empresa-de-reforma` | Reforma & Arte | Curitiba, PR |

### Fase 2 — Prioridade alta

| # | Nicho | Slug URL | Empresa fictícia sugerida | Cidade fictícia sugerida |
|---|---|---|---|---|
| 6 | Salão de Beleza | `salao-de-beleza` | Studio Beleza Viva | Florianópolis, SC |
| 7 | Psicólogo / Terapeuta | `psicologo` | Psic. Ana Borges | Belo Horizonte, MG |
| 8 | Fisioterapeuta / Clínica de Reabilitação | `fisioterapeuta` | Clínica Movimento | Porto Alegre, RS |
| 9 | Advogado | `advogado` | Escritório Leal & Martins | Fortaleza, CE |
| 10 | Pousada / Hospedagem Local | `pousada` | Pousada Mares do Sul | Ilhabela, SP |

### Fase 3 — Completar portfólio

| # | Nicho | Slug URL | Empresa fictícia sugerida | Cidade fictícia sugerida |
|---|---|---|---|---|
| 11 | Nutricionista | `nutricionista` | Nutri Daniela Farias | São Paulo, SP |
| 12 | Personal Trainer | `personal-trainer` | Personal Bruno Costa | Goiânia, GO |
| 13 | Pizzaria / Delivery Local | `pizzaria-delivery` | Pizzaria Forno Velho | Sorocaba, SP |
| 14 | Corretor de Imóveis | `corretor-de-imoveis` | Imóveis Eduardo Vilar | Joinville, SC |
| 15 | Escola de Idiomas | `escola-de-idiomas` | Língua Viva Idiomas | Uberlândia, MG |
| 16 | Dedetizadora / Controle de Pragas | `dedetizadora` | Pest Control SP | Santo André, SP |
| 17 | Veterinário / Pet Shop | `veterinario` | Clínica Vet Amigos | Niterói, RJ |
| 18 | Barbearia | `barbearia` | Barbearia Dom Pedro | São Paulo, SP |
| 19 | Ar-Condicionado (Venda e Manutenção) | `ar-condicionado` | Clima Certo Ar | Santos, SP |
| 20 | Distribuidora de Bebidas | `distribuidora-de-bebidas` | Distribuidora Sul Bebidas | Londrina, PR |
| 21 | Pet Shop | `pet-shop` | Pet Feliz | Natal, RN |
| 22 | Pilates / Academia Pequena | `pilates-academia` | Studio Pilates Equilíbrio | Recife, PE |

> **Nota sobre Pet Shop vs Veterinário:** Os dois nichos serão construídos separados pois têm perfis de busca, ticket, e argumentos de venda distintos. Veterinário é serviço de saúde com urgência; pet shop é compra recorrente com fidelização.

---

## 5. Estrutura-padrão de cada site de nicho

Todos os 22 sites usam a mesma arquitetura de seções. O que muda entre os nichos:

- Nome e identidade da empresa fictícia
- Paleta de cores (ver seção 6)
- Imagens (ver seção 7)
- Copy (textos) — argumentos específicos por setor
- Serviços listados
- FAQ — perguntas reais do nicho
- Ícones e ilustrações

### 5.1 Seções obrigatórias (em ordem)

```
┌─────────────────────────────────────────────────┐
│ BANNER DE AVISO (Marvin Sites — demonstrativo)  │
├─────────────────────────────────────────────────┤
│ HEADER                                          │
│  Logo fictícia | Menu: Serviços / Sobre /       │
│  Contato       | Botão WhatsApp                 │
├─────────────────────────────────────────────────┤
│ HERO (Seção 1)                                  │
│  Headline forte do nicho                        │
│  Subtítulo com benefício principal              │
│  CTA: Chamar no WhatsApp                        │
│  Imagem principal de destaque                   │
├─────────────────────────────────────────────────┤
│ APRESENTAÇÃO (Seção 2)                          │
│  "Quem somos" em 3-4 linhas                     │
│  Número de atendimentos ou anos de experiência  │
│  Foto do espaço ou do profissional              │
├─────────────────────────────────────────────────┤
│ SERVIÇOS (Seção 3)                              │
│  Cards de 4 a 6 serviços principais             │
│  Cada card: ícone + nome + descrição de 2 linhas│
├─────────────────────────────────────────────────┤
│ DIFERENCIAIS (Seção 4)                          │
│  "Por que escolher [Nome do Negócio]?"          │
│  3 a 4 diferenciais com ícone e texto           │
├─────────────────────────────────────────────────┤
│ AVALIAÇÕES / PROVA SOCIAL (Seção 5)             │
│  3 avaliações genéricas estilizadas             │
│  Nota 4.9★ no Google (indicado como fictício)   │
│  Selo: "Baseado em perfis reais de Google"      │
├─────────────────────────────────────────────────┤
│ GALERIA (Seção 6)                               │
│  4 a 6 fotos do Unsplash/Pexels por nicho       │
│  Grid responsivo                                │
├─────────────────────────────────────────────────┤
│ LOCALIZAÇÃO E HORÁRIOS (Seção 7)                │
│  Endereço fictício completo                     │
│  Horário de atendimento                         │
│  Iframe do Google Maps (endereço real próximo   │
│  à cidade fictícia, sem identificar negócio real│
├─────────────────────────────────────────────────┤
│ FAQ (Seção 8)                                   │
│  4 a 5 perguntas frequentes do nicho            │
│  Accordion expansível                           │
├─────────────────────────────────────────────────┤
│ CTA FINAL (Seção 9)                             │
│  Headline de fechamento                         │
│  Subtítulo de urgência ou clareza               │
│  Botão WhatsApp grande e visível                │
│  Telefone alternativo                           │
├─────────────────────────────────────────────────┤
│ RODAPÉ                                          │
│  Logo | Endereço | Links rápidos               │
│  Redes sociais (ícones, sem links ativos)       │
│  "Site demonstrativo Marvin Sites"              │
└─────────────────────────────────────────────────┘
```

### 5.2 Botão WhatsApp flutuante

Todo site deve ter um botão de WhatsApp flutuante no canto inferior direito, visível em todas as seções, com:

- Ícone do WhatsApp
- Texto: "Chamar no WhatsApp"
- Link: `https://wa.me/55XXXXXXXXXXX?text=Olá%2C+vi+o+site+de+vocês+e+gostaria+de+saber+mais.`
- O número deve ser o da Marvin Sites (substituir `XXXXXXXXXXX` pelo número real)
- Animação suave de entrada (pulsar ou aparecer após 3 segundos)

### 5.3 Header fixo

O header deve:
- Ficar fixo no topo ao rolar a página (sticky)
- Ter logo fictícia do negócio (texto estilizado + ícone simples)
- Menu com: Serviços / Sobre / Contato
- Botão CTA: "Chamar no WhatsApp" com cor de destaque
- Colapsar em menu hambúrguer no mobile

### 5.4 Âncoras de navegação

Todos os menus devem usar âncoras internas (`#servicos`, `#sobre`, `#contato`) para navegação suave dentro da página única, sem recarregar.

---

## 6. Sistema de design (design tokens)

### 6.1 Princípio geral

Cada nicho tem uma **paleta própria** derivada de associações visuais do setor. Isso evita que os sites pareçam idênticos e reforça a percepção de customização por segmento.

A estrutura de tokens é a mesma para todos:

```css
:root {
  --color-primary: [cor principal do nicho];
  --color-primary-dark: [versão escura da cor principal];
  --color-accent: [cor de destaque para CTAs];
  --color-bg: [fundo da página — próximo ao branco];
  --color-bg-section: [fundo alternado de seção];
  --color-text: [cor do texto principal];
  --color-text-muted: [cor de texto secundário];
  --color-border: [cor de bordas e separadores];

  --font-heading: [fonte de títulos];
  --font-body: [fonte de corpo];

  --radius-card: 12px;
  --radius-button: 8px;
  --shadow-card: 0 2px 16px rgba(0,0,0,0.07);

  --transition: 0.2s ease;
}
```

### 6.2 Paletas por nicho

| # | Nicho | Primary | Accent | BG | Fonte Heading | Fonte Body |
|---|---|---|---|---|---|---|
| 1 | Clínica de Estética | `#8B7355` (marrom nude) | `#C4956A` | `#FAF8F5` | Cormorant Garamond | Inter |
| 2 | Eletricista | `#1A3A5C` (azul profissional) | `#F5A623` (amarelo elétrico) | `#F4F7FC` | Montserrat | Open Sans |
| 3 | Dentista | `#0EA5E9` (azul saúde) | `#38BDF8` | `#F0F9FF` | Poppins | Inter |
| 4 | Contador | `#1E3A5F` (azul corporativo) | `#2563EB` | `#F8FAFC` | Playfair Display | Inter |
| 5 | Reforma e Pintura | `#7C4A1E` (terracota construtivo) | `#F97316` | `#FDF8F4` | Raleway | Open Sans |
| 6 | Salão de Beleza | `#9B2C79` (roxo beleza) | `#EC4899` | `#FDF4FB` | Cormorant Garamond | Lato |
| 7 | Psicólogo | `#2D6A4F` (verde sereno) | `#52B788` | `#F0FAF5` | Merriweather | Inter |
| 8 | Fisioterapeuta | `#1E6091` (azul clínico) | `#4CAF82` | `#F0F7FF` | Poppins | Open Sans |
| 9 | Advogado | `#1C1C2E` (azul-marinho) | `#C9A84C` (dourado) | `#F8F8F8` | Playfair Display | Lato |
| 10 | Pousada | `#2D6A4F` (verde natureza) | `#E9C46A` (areia) | `#FAFDF9` | Cormorant Garamond | Inter |
| 11 | Nutricionista | `#2D6A4F` (verde saúde) | `#81C784` | `#F1FAF4` | Poppins | Inter |
| 12 | Personal Trainer | `#1A1A2E` (preto esporte) | `#E94560` (vermelho energia) | `#F5F5F5` | Montserrat | Open Sans |
| 13 | Pizzaria | `#C0392B` (vermelho) | `#E67E22` (laranja) | `#FFF9F5` | Raleway | Lato |
| 14 | Corretor de Imóveis | `#1A3A5C` (azul imóvel) | `#2563EB` | `#F8FAFC` | Playfair Display | Inter |
| 15 | Escola de Idiomas | `#6C3483` (roxo educação) | `#9B59B6` | `#FAF7FF` | Poppins | Open Sans |
| 16 | Dedetizadora | `#1A472A` (verde controle) | `#28B463` | `#F2FBF5` | Montserrat | Open Sans |
| 17 | Veterinário | `#1565C0` (azul pet) | `#4CAF50` | `#EFF7FF` | Poppins | Inter |
| 18 | Barbearia | `#1A1A1A` (preto barbershop) | `#C9A84C` (dourado) | `#F5F5F5` | Playfair Display | Lato |
| 19 | Ar-Condicionado | `#0F3057` (azul tecnológico) | `#00A8E8` (azul claro frio) | `#F0F8FF` | Montserrat | Open Sans |
| 20 | Distribuidora de Bebidas | `#8B0000` (vermelho bebida) | `#F4A261` (âmbar) | `#FFF8F3` | Raleway | Lato |
| 21 | Pet Shop | `#FF6B35` (laranja amigável) | `#FFD166` (amarelo) | `#FFFAF5` | Nunito | Open Sans |
| 22 | Pilates/Academia | `#7B2D8B` (roxo harmonia) | `#E040FB` | `#FDF4FF` | Poppins | Inter |

### 6.3 Tipografia — carregamento via Google Fonts

Todas as fontes devem ser carregadas via Google Fonts no `<head>`:

```html
<!-- Exemplo para Clínica de Estética -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### 6.4 Escala tipográfica padrão

```css
--text-xs:   0.75rem;   /* 12px — labels */
--text-sm:   0.875rem;  /* 14px — legendas */
--text-base: 1rem;      /* 16px — corpo */
--text-lg:   1.125rem;  /* 18px — destaque corpo */
--text-xl:   1.25rem;   /* 20px — subtítulos */
--text-2xl:  1.5rem;    /* 24px — títulos de seção */
--text-3xl:  1.875rem;  /* 30px — headings */
--text-4xl:  2.25rem;   /* 36px — hero subtitle */
--text-5xl:  3rem;      /* 48px — hero headline */
```

### 6.5 Breakpoints

```css
/* Mobile first */
@media (min-width: 640px)  { /* sm  — tablet pequeno */ }
@media (min-width: 768px)  { /* md  — tablet */ }
@media (min-width: 1024px) { /* lg  — desktop */ }
@media (min-width: 1280px) { /* xl  — desktop largo */ }
```

### 6.6 Grid

- Mobile: 1 coluna
- Tablet: 2 colunas
- Desktop: 3 ou 4 colunas (dependendo do componente)
- Max-width do container: `1200px`
- Padding horizontal: `16px` mobile, `24px` tablet, `40px` desktop

---

## 7. Banco de imagens e fontes visuais

### 7.1 Fontes permitidas e gratuitas

| Plataforma | URL | Uso permitido |
|---|---|---|
| Unsplash | `https://unsplash.com` | Gratuito para uso comercial, sem atribuição obrigatória |
| Pexels | `https://pexels.com` | Gratuito para uso comercial |
| Pixabay | `https://pixabay.com` | Gratuito para uso comercial |
| Freepik (free) | `https://freepik.com` | Gratuito com atribuição ou premium sem atribuição |

### 7.2 Como referenciar imagens nos sites (CDN direto)

Em vez de baixar imagens, usar as URLs diretamente do Unsplash via CDN. Formato:

```html
<img src="https://images.unsplash.com/photo-[ID]?w=800&q=80&auto=format&fit=crop"
     alt="[Descrição relevante ao nicho]"
     loading="lazy"
     width="800" height="600">
```

Parâmetros úteis:
- `w=800` → largura em pixels
- `q=80` → qualidade de compressão
- `auto=format` → formato otimizado automaticamente
- `fit=crop` → corte proporcional
- `&crop=entropy` → corte inteligente no ponto mais interessante

### 7.3 Banco de imagens por nicho

A seguir, queries de busca recomendadas para o Unsplash e imagens sugeridas por nicho. O Claude Code deve buscar e validar as URLs antes de inserir no código.

**Nicho 1 — Clínica de Estética**
```
Queries Unsplash: "aesthetic clinic", "facial treatment", "beauty spa", 
"skincare professional", "clean beauty salon"
Estilo: luz natural suave, branco e nude, minimalista, profissional tratando cliente
```

**Nicho 2 — Eletricista**
```
Queries Unsplash: "electrician working", "electrical panel", "electrical wiring",
"technician tools", "electrical service"
Estilo: profissional com EPI, ambiente de trabalho, ferramentas organizadas
```

**Nicho 3 — Dentista**
```
Queries Unsplash: "dentist office", "dental clinic", "teeth whitening",
"dental chair", "dentist smiling patient"
Estilo: consultório limpo, profissional, branco, sorriso
```

**Nicho 4 — Contador**
```
Queries Unsplash: "accountant desk", "business meeting", "financial documents",
"office professional", "calculator documents"
Estilo: escritório organizado, profissional, documentos, computador
```

**Nicho 5 — Reforma e Pintura**
```
Queries Unsplash: "home renovation", "painting wall", "construction worker",
"before after renovation", "interior reform"
Estilo: obra organizada, resultado final bonito, profissional trabalhando
```

**Nicho 6 — Salão de Beleza**
```
Queries Unsplash: "hair salon", "hairdresser", "hair coloring", "beauty salon",
"hair styling professional"
Estilo: salão bonito e limpo, profissional trabalhando, resultado do serviço
```

**Nicho 7 — Psicólogo**
```
Queries Unsplash: "therapy session", "psychologist office", "mental health",
"calm office", "counseling"
Estilo: ambiente aconchegante, sofá, luz suave, planta, paz
```

**Nicho 8 — Fisioterapeuta**
```
Queries Unsplash: "physiotherapy", "physical therapy", "rehabilitation clinic",
"massage therapy", "exercise therapy"
Estilo: clínica limpa, profissional com paciente, aparelhos modernos
```

**Nicho 9 — Advogado**
```
Queries Unsplash: "lawyer office", "legal documents", "law books",
"attorney meeting", "justice scale"
Estilo: escritório sério, livros, mesa de madeira escura, profissional
```

**Nicho 10 — Pousada**
```
Queries Unsplash: "pousada brazil", "inn bedroom", "cozy hotel room",
"tropical accommodation", "breakfast hotel"
Estilo: quarto aconchegante, café da manhã farto, área externa bonita
```

**Nicho 11 — Nutricionista**
```
Queries Unsplash: "nutritionist", "healthy food", "meal planning",
"nutrition consultation", "vegetables fresh"
Estilo: consulta, comida colorida e saudável, profissional simpática
```

**Nicho 12 — Personal Trainer**
```
Queries Unsplash: "personal trainer", "gym training", "fitness coaching",
"workout session", "strength training"
Estilo: academia, treino em dupla, energia, resultado
```

**Nicho 13 — Pizzaria**
```
Queries Unsplash: "pizza", "pizza oven", "pizza delivery", "italian restaurant",
"pizza making"
Estilo: pizza saindo do forno, ambiente aconchegante, entrega
```

**Nicho 14 — Corretor de Imóveis**
```
Queries Unsplash: "real estate agent", "house keys", "modern house",
"property showing", "apartment interior"
Estilo: profissional mostrando imóvel, imóvel bonito, chave
```

**Nicho 15 — Escola de Idiomas**
```
Queries Unsplash: "language school", "english class", "students classroom",
"teacher teaching", "study group"
Estilo: sala de aula moderna, alunos engajados, professor dinâmico
```

**Nicho 16 — Dedetizadora**
```
Queries Unsplash: "pest control", "exterminator", "spray insecticide",
"professional pest service", "technician uniform"
Estilo: técnico com EPI completo, equipamento profissional, casa limpa
```

**Nicho 17 — Veterinário**
```
Queries Unsplash: "veterinarian", "vet clinic", "dog examination",
"cat vet", "animal care"
Estilo: veterinário examinando animal, clínica limpa, pet feliz
```

**Nicho 18 — Barbearia**
```
Queries Unsplash: "barbershop", "barber cutting hair", "beard trim",
"barbershop interior", "classic barbershop"
Estilo: ambiente vintage ou moderno, navalha, resultado final
```

**Nicho 19 — Ar-Condicionado**
```
Queries Unsplash: "air conditioning installation", "hvac technician",
"air conditioner", "cooling system", "technician installing"
Estilo: técnico instalando, aparelho novo, ambiente fresco
```

**Nicho 20 — Distribuidora de Bebidas**
```
Queries Unsplash: "beverage warehouse", "drinks distribution", "beer bottles",
"cold drinks", "beverage delivery"
Estilo: galpão organizado, entrega, variedade de produtos, frigobar
```

**Nicho 21 — Pet Shop**
```
Queries Unsplash: "pet shop", "dog grooming", "pet store", "cute dog bath",
"pet care"
Estilo: loja colorida e organizada, banho e tosa, pets felizes
```

**Nicho 22 — Pilates/Academia**
```
Queries Unsplash: "pilates studio", "yoga class", "pilates exercise",
"small gym", "fitness studio"
Estilo: studio clean, aparelhos de pilates, alunos praticando
```

### 7.4 Ícones

Usar **Lucide Icons** (gratuito, MIT license) via CDN:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lucide/0.294.0/lucide.min.js"></script>
```

Ícones sugeridos por componente:
- Serviços: ícones específicos por serviço (ex: `scissors` para salão, `tooth` para dentista)
- Diferenciais: `shield-check`, `clock`, `star`, `heart`, `award`, `thumbs-up`
- WhatsApp: usar SVG próprio (o Lucide não tem WhatsApp nativo)
- Localização: `map-pin`
- Horário: `clock`
- Telefone: `phone`
- E-mail: `mail`

---

## 8. Especificação técnica de cada nicho

### 8.1 Stack tecnológica

**Decisão:** Sites estáticos em HTML5 + CSS3 + JavaScript vanilla.

**Razões:**
- Máxima performance (Core Web Vitals excelentes)
- Sem dependência de framework ou CMS
- Deploy simples em qualquer hospedagem
- Fácil manutenção e atualização
- Compatível com Cloudflare Pages, Netlify, GitHub Pages, hospedagem tradicional

**O que NÃO usar nos sites de portfólio:**
- React, Vue, Angular (desnecessário para páginas estáticas)
- WordPress (overhead e segurança desnecessários aqui)
- Bootstrap, Foundation (geram identidade visual genérica)
- jQuery (desnecessário com JS moderno)
- Tailwind (aceitável, mas tende a gerar visual idêntico entre sites)

**O que usar:**
- CSS customizado com variáveis (tokens)
- Intersection Observer para animações de entrada
- Smooth scroll nativo (`scroll-behavior: smooth`)
- Google Fonts via CDN
- Lucide Icons via CDN
- Vanilla JS para accordion, menu mobile, scroll animations

### 8.2 Estrutura de arquivos de cada nicho

```
/exemplos/[slug-do-nicho]/
├── index.html      ← página principal (tudo em um arquivo)
├── og-image.jpg    ← imagem para Open Graph (1200×630px)
└── favicon.ico     ← favicon simples (pode ser emoji)
```

Todos os estilos e scripts ficam no mesmo `index.html` (tag `<style>` e `<script>`) para simplificar deploy e manutenção.

### 8.3 Meta tags obrigatórias

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Nome do Negócio] — [Serviço Principal] em [Cidade] | [Bairro]</title>
  <meta name="description" content="[Nome] oferece [serviço] em [cidade]. [Benefício 1], [benefício 2]. Agende pelo WhatsApp.">
  <meta name="robots" content="noindex, nofollow"> <!-- Sites de portfólio NÃO devem ser indexados -->
  
  <!-- Open Graph -->
  <meta property="og:title" content="[Nome do Negócio] — [Serviço]">
  <meta property="og:description" content="[Descrição curta]">
  <meta property="og:image" content="[URL da og-image]">
  <meta property="og:type" content="website">
  
  <!-- Identificação como demonstrativo -->
  <meta name="generator" content="Marvin Sites — Demonstrativo">
</head>
```

> **IMPORTANTE:** Os sites de portfólio devem usar `noindex, nofollow` para não aparecerem no Google como negócios reais. Apenas a página de índice `/exemplos/` deve ser indexada pela Marvin Sites.

### 8.4 Performance obrigatória

- Imagens com `loading="lazy"` e `width`/`height` definidos
- CSS crítico inline no `<head>` para renderização inicial
- Google Fonts com `display=swap`
- Nenhum JavaScript bloqueante no `<head>`
- Imagens do Unsplash via CDN com parâmetros de otimização (`?w=800&q=80&auto=format`)

### 8.5 Acessibilidade mínima

- Todo `<img>` com `alt` descritivo
- Contraste de texto mínimo AA (4.5:1 para texto normal)
- Links com texto descritivo (não "clique aqui")
- Botões com `aria-label` quando necessário
- Menu mobile com `aria-expanded`
- Focus visible em todos os elementos interativos

---

## 9. Prompts para Claude Code / Codex

### 9.1 Prompt de pesquisa de referências (executar antes de cada site)

```
Você é um pesquisador de design UX/UI especializado em sites de pequenos negócios locais brasileiros.

Pesquise na web exemplos de sites bem avaliados, referências de design e boas práticas visuais para o nicho: [NICHO].

Entregue:
1. PALETA VISUAL DOMINANTE: quais cores são mais usadas neste nicho no Brasil? Por quê fazem sentido?
2. TIPOGRAFIA COMUM: quais estilos de fonte são mais usados (sans-serif clean, serif elegante, etc.)?
3. SEÇÕES MAIS ENCONTRADAS: quais seções aparecem na maioria dos bons sites deste nicho?
4. ELEMENTOS VISUAIS ESPECÍFICOS: o que aparece muito e faz sentido visualmente neste nicho?
5. O QUE EVITAR: quais elementos ou escolhas visuais parecem genéricas, datadas ou inadequadas?
6. REFERÊNCIAS DE IMAGENS UNSPLASH: forneça 5-8 queries em inglês para buscar imagens ideais para este nicho.
7. ARGUMENTOS COMERCIAIS VISUAIS: o que o design deve comunicar emocionalmente para este público?
```

### 9.2 Prompt principal de geração de site (executar após pesquisa)

```
Você é um desenvolvedor frontend sênior e designer especializado em sites de pequenos negócios locais brasileiros.

Crie um site de portfólio demonstrativo para a Marvin Sites, representando um negócio fictício do nicho: [NICHO].

DADOS DO NEGÓCIO FICTÍCIO:
- Nome: [NOME FICTÍCIO]
- Cidade: [CIDADE], [ESTADO]
- Bairro: [BAIRRO]
- Slogan: [SLOGAN]
- WhatsApp (para links): o número da Marvin Sites [NÚMERO]

PALETA DE CORES:
- Primary: [COR HEX]
- Accent: [COR HEX]
- Background: [COR HEX]
- Text: [COR HEX]

FONTES: [FONTE HEADING] para títulos, [FONTE BODY] para corpo — via Google Fonts

IMAGENS: use as seguintes URLs do Unsplash (já validadas):
- Hero: [URL 1]
- Apresentação: [URL 2]
- Galeria: [URL 3], [URL 4], [URL 5], [URL 6]

SERVIÇOS DO NICHO (incluir na Seção 3):
[LISTA DE 4-6 SERVIÇOS ESPECÍFICOS DO NICHO]

PERGUNTAS DO FAQ (incluir na Seção 8):
[LISTA DE 4-5 PERGUNTAS FREQUENTES REAIS DO NICHO]

REQUISITOS TÉCNICOS OBRIGATÓRIOS:
1. HTML5 + CSS3 + JavaScript vanilla, tudo em um único index.html
2. Responsivo: mobile-first (1 coluna), tablet (2 col), desktop (3 col)
3. Todas as 10 seções da estrutura padrão Marvin Sites
4. Banner de aviso no topo: "Site demonstrativo Marvin Sites — [botão Quero um site assim]"
5. Botão WhatsApp flutuante no canto inferior direito
6. Header fixo (sticky) com menu e CTA
7. Smooth scroll e animações sutis de entrada (Intersection Observer)
8. Accordion no FAQ
9. Ícones via Lucide Icons CDN
10. Meta tags com noindex, nofollow (portfólio, não indexar)
11. CSS com variáveis (tokens) para cores, tipografia, espaçamento
12. Performance: lazy loading em imagens, fontes com display=swap

INSTRUÇÕES DE DESIGN:
- NÃO usar Bootstrap, Tailwind ou frameworks
- NÃO usar gradientes excessivos ou sombras dramáticas
- NÃO usar o padrão "card com borda arredondada idêntica em tudo"
- NÃO usar ALL CAPS em labels desnecessariamente
- USAR tipografia como elemento de design, não apenas como texto
- USAR espaçamento generoso — sites apertados parecem amadores
- USAR uma hierarquia visual clara (o que o olho deve ver primeiro)
- O site deve parecer um negócio real e profissional de [CIDADE]
- Evitar parecer template genérico de WordPress

COPY DA HERO (personalizar para o nicho):
- Headline: [HEADLINE FORTE ESPECÍFICA DO NICHO]
- Subtítulo: [SUBTÍTULO COM BENEFÍCIO PRINCIPAL]
- CTA: "Chamar no WhatsApp"

Entregue apenas o código HTML completo, sem explicações adicionais.
```

### 9.3 Prompt de validação e revisão

```
Revise o site HTML criado para o nicho [NICHO] da Marvin Sites e verifique:

CHECKLIST DE QUALIDADE:
□ O site parece um negócio real de [CIDADE], não um template genérico?
□ As cores estão aplicadas com consistência e harmonia?
□ As fontes estão legíveis em mobile (mínimo 16px para corpo)?
□ O botão WhatsApp está visível e funcional?
□ O banner de aviso "demonstrativo Marvin Sites" está presente?
□ Todas as 10 seções estão presentes e em ordem?
□ O FAQ tem accordion funcionando?
□ O menu mobile colapsa corretamente?
□ As imagens têm alt text descritivo?
□ O contraste texto/fundo é adequado (mínimo 4.5:1)?
□ As imagens têm loading="lazy"?
□ O meta noindex está presente?
□ O smooth scroll funciona entre as seções?
□ O site carrega sem erros no console?
□ A copy é específica para o nicho (não genérica)?

Corrija todos os problemas encontrados e entregue o HTML revisado.
```

### 9.4 Prompt para geração da página de índice do portfólio

```
Crie a página de índice do portfólio da Marvin Sites: /exemplos/index.html

Esta página lista todos os 22 nichos do portfólio como cards clicáveis.

IDENTIDADE VISUAL:
- Usar a paleta institucional da Marvin Sites
- Header com logo "Marvin Sites" e link de volta para a home
- Design limpo, profissional, confiante

LISTA DE NICHOS (com slugs):
[INSERIR LISTA COMPLETA COM ÍCONE SUGERIDO PARA CADA UM]

CADA CARD DEVE TER:
- Ícone SVG do setor (via Lucide)
- Nome do nicho em português
- Descrição de uma linha (benefício principal para aquele segmento)
- Botão "Ver exemplo →"
- Link para /exemplos/[slug]/

CTA FINAL DA PÁGINA:
- "Seu segmento não está aqui?"
- Botão "Falar com a Marvin" → WhatsApp

REQUISITOS TÉCNICOS:
- HTML5 + CSS3 + JS vanilla em um único arquivo
- Grid responsivo (1 col mobile, 2 col tablet, 3 col desktop)
- Cards com hover effect suave
- Meta tags com indexação PERMITIDA (esta página pode aparecer no Google)
- Title: "Exemplos de sites por segmento — Portfólio Marvin Sites"
- Meta description: "Veja exemplos reais de presença digital para negócios locais. Clínicas, contadores, reformas, salões e muito mais."
```

### 9.5 Prompt para busca de imagens Unsplash (executar antes da geração)

```
Pesquise imagens gratuitas no Unsplash para o nicho [NICHO] de negócios locais brasileiros.

Critérios de seleção:
- Imagens realistas e profissionais (não estoque óbvio)
- Pessoas reais trabalhando (quando aplicável)
- Iluminação natural e ambiente limpo
- Sem watermarks ou logos
- Proporção horizontal (landscape) para hero e galeria
- Resolução mínima 1200px de largura

Entregue:
1. URL completa da imagem hero (horizontal, impactante)
2. URL da imagem de apresentação (profissional com cliente ou no ambiente)
3. 4 URLs para galeria (diversidade de serviços/ambientes)

Formato das URLs:
https://images.unsplash.com/photo-[ID]?w=1200&q=80&auto=format&fit=crop

Confirme que cada URL está acessível antes de entregar.
```

---

## 10. Checklist de qualidade por site

Antes de marcar qualquer site do portfólio como concluído, verificar todos os itens:

### 10.1 Identidade e conteúdo

- [ ] Empresa fictícia tem nome real e credível (não "Clínica Exemplo")
- [ ] Cidade e bairro são específicos e existentes
- [ ] Slogan é específico ao nicho, não genérico
- [ ] Serviços listados são reais para aquele segmento
- [ ] FAQ tem perguntas que clientes reais fazem
- [ ] Avaliações/depoimentos não parecem inventados ou genéricos
- [ ] Horário de atendimento faz sentido para o nicho
- [ ] Endereço fictício parece real (logradouro, número, bairro, CEP no formato correto)
- [ ] Copy não usa expressões genéricas como "soluções completas" ou "atendimento diferenciado"

### 10.2 Design visual

- [ ] Paleta de cores está de acordo com a especificação do nicho
- [ ] Fontes estão carregando via Google Fonts sem erros
- [ ] Contraste de texto é legível (mínimo AA)
- [ ] Layout não parece template genérico de WordPress
- [ ] Espaçamento entre seções é adequado (não apertado)
- [ ] Hierarquia visual está clara (olho sabe o que ver primeiro)
- [ ] Mobile não quebra layout em nenhuma das seções
- [ ] Cards de serviços têm ícones específicos do nicho (não ícones genéricos)
- [ ] Imagens são de alta qualidade e relevantes ao nicho
- [ ] Imagens não parecem óbvias de banco de imagens

### 10.3 Funcionalidade

- [ ] Todos os links do menu levam às seções corretas via âncora
- [ ] Smooth scroll funciona
- [ ] Menu hambúrguer funciona no mobile
- [ ] Header fica fixo ao rolar
- [ ] FAQ accordion abre e fecha corretamente
- [ ] Botão WhatsApp flutuante está visível e clicável
- [ ] Link do WhatsApp abre com mensagem pré-preenchida correta
- [ ] Banner de aviso "demonstrativo Marvin Sites" está presente e visível
- [ ] Botão no banner leva ao WhatsApp da Marvin Sites
- [ ] Imagens têm loading="lazy"
- [ ] Não há erros no console do navegador

### 10.4 SEO e meta

- [ ] Title tag é específico: "[Nome] — [Serviço] em [Cidade]"
- [ ] Meta description tem entre 150-160 caracteres
- [ ] Meta noindex está presente (portfólio não deve ser indexado como negócio real)
- [ ] Open Graph tags presentes (og:title, og:description, og:image)
- [ ] Charset UTF-8 declarado
- [ ] Viewport meta tag presente

### 10.5 Performance

- [ ] Página carrega em menos de 3 segundos em 3G (testar com Lighthouse)
- [ ] LCP (Largest Contentful Paint) abaixo de 2.5s
- [ ] Sem shift de layout (CLS próximo de 0)
- [ ] Fontes com display=swap para evitar FOIT
- [ ] Nenhum script bloqueante no head

---

## 11. SEO por nicho

### 11.1 Estratégia SEO do portfólio

Os sites de nicho individuais usam `noindex` (não devem aparecer no Google como negócios reais).

A **página de índice** (`/exemplos/`) pode ser indexada e pode ranquear para termos como:
- "exemplos de site para pequenos negócios"
- "portfólio de sites para negócios locais"
- "como fica um site profissional para [nicho]"

As **landing pages de nicho da Marvin Sites** (ex: `/para-clinicas/`, `/para-contadores/`) são as páginas que devem ranquear organicamente. Cada uma deve ter um link visible para o exemplo correspondente no portfólio.

### 11.2 Termos de busca por nicho (para landing pages)

| Nicho | Termos principais | Termos de cauda longa |
|---|---|---|
| Clínica de Estética | site para clínica de estética | criar site clínica estética barato SP |
| Eletricista | site para eletricista | site profissional eletricista autônomo |
| Dentista | site para dentista | criação de site consultório odontológico |
| Contador | site para escritório contábil | site contador MEI profissional |
| Reforma | site para empresa de reforma | criar site reformas e construção |
| Salão de Beleza | site para salão de beleza | criar site salão de cabelo profissional |
| Psicólogo | site para psicólogo | como ter site profissional psicólogo |
| Fisioterapeuta | site para fisioterapeuta | site clínica de fisioterapia |
| Advogado | site para advogado | criar site escritório de advocacia |
| Pousada | site para pousada | criar site pousada reservas diretas |
| Ar-Condicionado | site para empresa de ar-condicionado | site técnico instalação ar condicionado |
| Distribuidora | site para distribuidora de bebidas | criar site distribuidora local |

### 11.3 Meta tags modelo por nicho

**Clínica de Estética:**
```html
<title>Studio Clara Vidal — Estética Avançada em Santos, SP</title>
<meta name="description" content="Studio de estética em Santos com procedimentos faciais, corporais e cuidados da pele. Agende pelo WhatsApp. Horários flexíveis e atendimento personalizado.">
```

**Eletricista:**
```html
<title>Elétrica Forte — Eletricista em Campinas 24h | Instalações e Manutenção</title>
<meta name="description" content="Eletricista em Campinas. Instalações, manutenções, quadros elétricos e emergências 24h. Profissional com NR10. Orçamento pelo WhatsApp.">
```

**Ar-Condicionado:**
```html
<title>Clima Certo Ar — Venda e Manutenção de Ar-Condicionado em Santos</title>
<meta name="description" content="Instalação, manutenção e venda de ar-condicionado em Santos. Técnicos certificados, todas as marcas. Orçamento gratuito pelo WhatsApp.">
```

**Distribuidora de Bebidas:**
```html
<title>Sul Bebidas — Distribuidora de Bebidas em Londrina | Entrega Rápida</title>
<meta name="description" content="Distribuidora de bebidas em Londrina. Cervejas, refrigerantes, águas e muito mais. Entrega para bares, restaurantes e eventos. Peça pelo WhatsApp.">
```

---

## 12. Lista completa de negócios locais buscados no Google e IAs

Esta lista representa os tipos de negócio local que mais recebem buscas ativas de pessoas com **intenção de contratar**. São os melhores alvos de prospecção da Marvin Sites e os nichos com maior ROI de site.

### 12.1 Urgência / Problema imediato (conversão altíssima)

Esses negócios recebem buscas de pessoas com problema agora — quem aparece, atende:

```
Eletricista 24h [cidade]
Encanador urgência [cidade]
Dedetizadora [cidade]
Dedetização emergência [cidade]
Chaveiro 24h [cidade]
Guincho / Reboque [cidade]
Marido de aluguel [cidade]
Técnico em ar-condicionado [cidade]
Empresa de ar-condicionado [cidade]
Instalação ar-condicionado [cidade]
Manutenção ar-condicionado [cidade]
Vidraçaria emergência [cidade]
Serralheria [cidade]
Técnico em informática domicílio [cidade]
Desentupidora [cidade]
```

### 12.2 Saúde e bem-estar (busca de confiança antes de agendar)

```
Dentista [bairro] / [cidade]
Clínica odontológica [cidade]
Psicólogo [cidade] / online
Psiquiatra [cidade]
Fisioterapeuta perto de mim
Clínica de fisioterapia [cidade]
Nutricionista [cidade]
Fonoaudiólogo [cidade]
Dermatologista [cidade]
Ginecologista [cidade]
Ortopedista [cidade]
Cardiologista [cidade]
Endocrinologista [cidade]
Médico clínico geral [cidade]
Otorrinolaringologista [cidade]
Oftalmilogista [cidade]
Terapeuta holístico [cidade]
Acupunturista [cidade]
Quiropraxia [cidade]
Médico do trabalho [cidade]
Clínica de reabilitação [cidade]
```

### 12.3 Estética e beleza (busca por resultado visual)

```
Clínica de estética [cidade]
Esteticista [cidade]
Estética facial [cidade]
Micropigmentação [cidade]
Micropigmentação de lábios [cidade]
Designer de sobrancelhas [cidade]
Extensão de cílios / Lash [cidade]
Depilação a laser [cidade]
Botox [cidade]
Preenchimento labial [cidade]
Salão de beleza [bairro]
Cabeleireiro [bairro]
Coloração de cabelo [cidade]
Progressiva [cidade]
Manicure e pedicure [bairro]
Nail designer [cidade]
Barbearia [bairro]
Barba e cabelo [bairro]
Spa [cidade]
Massagem terapêutica [cidade]
```

### 12.4 Construção, reforma e serviços técnicos

```
Empresa de reforma [cidade]
Pintor de parede [cidade]
Pedreiro [cidade]
Mestre de obras [cidade]
Marcenaria [cidade]
Móveis planejados [cidade]
Gesseiro / Drywall [cidade]
Empresa de limpeza residencial [cidade]
Empresa de limpeza comercial [cidade]
Limpeza pós-obra [cidade]
Jardineiro [cidade]
Paisagismo [cidade]
Dedetizadora [cidade]
Impermeabilização [cidade]
Instalação de piso [cidade]
Empresa de alumínio e vidro [cidade]
Instalação de câmeras [cidade]
Empresa de segurança eletrônica [cidade]
```

### 12.5 Profissionais liberais e serviços B2B

```
Contador MEI [cidade]
Contador abertura empresa [cidade]
Escritório de contabilidade [cidade]
Advogado trabalhista [cidade]
Advogado de família [cidade]
Advogado previdenciário [cidade]
Advogado criminal [cidade]
Advogado imobiliário [cidade]
Despachante [cidade]
Tradutor juramentado [cidade]
Consultor de RH [cidade]
Consultor financeiro [cidade]
Engenheiro civil autônomo [cidade]
Arquiteto [cidade]
Designer gráfico freelancer [cidade]
Fotógrafo [cidade]
Fotógrafo de casamento [cidade]
Videomaker [cidade]
```

### 12.6 Alimentação e delivery local

```
Pizzaria delivery [bairro]
Marmita saudável [cidade]
Marmitaria [cidade]
Salgado para evento [cidade]
Bolo personalizado [cidade]
Bolo no pote [cidade]
Restaurante self-service [cidade]
Cafeteria [bairro]
Padaria artesanal [cidade]
Doceria [cidade]
Confeitaria [cidade]
Hambúrguer artesanal delivery [cidade]
Comida japonesa delivery [cidade]
Churrasco para eventos [cidade]
Buffet de comida [cidade]
```

### 12.7 Educação e formação

```
Aula de inglês particular [cidade]
Escola de inglês [cidade]
Escola de idiomas [cidade]
Reforço escolar [cidade]
Professor particular [cidade]
Professor de matemática [cidade]
Professor de física [cidade]
Aula de música [cidade]
Aula de violão [cidade]
Aula de piano [cidade]
Aula de canto [cidade]
Personal trainer [cidade] / [bairro]
Pilates [cidade]
Yoga [cidade]
Natação aulas [cidade]
Dança [cidade]
Escola de natação [cidade]
```

### 12.8 Turismo e eventos

```
Pousada em [cidade]
Hospedagem [cidade]
Hotel econômico [cidade]
Guia turístico [cidade]
Passeio de barco [cidade]
Aluguel de chalé [cidade]
Buffet infantil [cidade]
Salão de festas [cidade]
Fotógrafo de casamento [cidade]
DJ para casamento [cidade]
Decoração de festas [cidade]
Floricultura [cidade]
Cerimonialista [cidade]
```

### 12.9 Imóveis e habitação

```
Corretor de imóveis [cidade]
Imobiliária [bairro] / [cidade]
Aluguel de apartamento [cidade]
Compra de casa [cidade]
Avaliação de imóvel [cidade]
Aluguel comercial [cidade]
Sala comercial para alugar [cidade]
Galpão industrial para alugar [cidade]
```

### 12.10 Pets e animais

```
Veterinário [bairro]
Clínica veterinária [cidade]
Veterinário 24h [cidade]
Pet shop [bairro]
Banho e tosa [bairro]
Adestrador de cães [cidade]
Hotel para animais [cidade]
Creche para cães [cidade]
Acupuntura veterinária [cidade]
```

### 12.11 Bebidas e distribuidoras (nicho de alto potencial comercial)

```
Distribuidora de bebidas [cidade]
Distribuidora de cerveja [cidade]
Atacado de bebidas [cidade]
Bebidas para festa [cidade]
Chopeira para evento [cidade]
Loja de bebidas [bairro]
Bebidas delivery [cidade]
Bebidas em atacado [cidade]
Fornecedor de bebidas para bares [cidade]
```

### 12.12 Ar-condicionado e climatização (nicho em alta — El Niño)

```
Instalação de ar-condicionado [cidade]
Manutenção de ar-condicionado [cidade]
Limpeza de ar-condicionado [cidade]
Higienização de ar-condicionado [cidade]
Técnico de ar-condicionado [cidade]
Venda de ar-condicionado [cidade]
Ar-condicionado split instalação [cidade]
Empresa de climatização [cidade]
Ar-condicionado barato [cidade]
Instalador de ar-condicionado [cidade]
```

> **Observação estratégica sobre ar-condicionado:** Com o El Niño trazendo temperaturas extremas ao Brasil, este nicho está em pico de demanda. Empresas de instalação e manutenção de ar-condicionado são buscadas com urgência — comportamento similar ao de eletricista. O ROI de um site para esse nicho é imediato.

---

## 13. Diretrizes de copy por nicho

### 13.1 Princípios gerais de copy

- **Nunca use:** "soluções completas", "atendimento diferenciado", "qualidade garantida", "anos de experiência no mercado", "equipe altamente qualificada"
- **Sempre use:** benefícios concretos, dores reais, resultados específicos, linguagem do cliente
- **Tom:** direto, humano, sem exagero, sem promessa milagrosa
- **Foco:** o que o cliente ganha, não o que a empresa tem

### 13.2 Fórmulas de headline por nicho

**Clínica de Estética:**
- "Sua pele pode ser transformada. Aqui começa a diferença."
- "Cuidado real. Resultado visível. Sem enrolação."
- "Pele saudável não é luxo. É rotina."

**Eletricista / Ar-Condicionado:**
- "Problema elétrico tem solução rápida. A gente resolve."
- "Seu ar não resfria mais? A gente aparece hoje."
- "Serviço técnico sério, sem surpresa no orçamento."

**Dentista:**
- "Um sorriso que você não quer esconder mais."
- "Cuidado dental sem complicação e sem dor."
- "Seu próximo sorriso começa com uma consulta."

**Contador:**
- "Sua empresa organizada. Sua cabeça, tranquila."
- "Contabilidade que você entende. Contador que te explica."
- "Chega de perder dinheiro por não ter a contabilidade certa."

**Reforma:**
- "A reforma que você imaginou, entregue no prazo combinado."
- "Seu espaço renovado. Sem obra que não acaba."
- "A gente faz o projeto e executa. Do início ao acabamento."

**Psicólogo:**
- "Cuidar da saúde mental é o passo mais importante que você pode dar."
- "Um espaço seguro para você falar o que precisa."
- "Você não precisa resolver tudo sozinho."

**Salão de Beleza:**
- "Seu cabelo do jeito que você sempre quis."
- "Mais do que beleza. Uma tarde só sua."
- "Resultados que falam mais do que qualquer filtro."

**Ar-Condicionado:**
- "Calor fora de controle? Resolvemos hoje."
- "Instalação rápida. Ar gelado. Garantia real."
- "Climatizamos ambientes residenciais e comerciais em toda [cidade]."

**Distribuidora de Bebidas:**
- "Bebidas geladas no seu ponto de venda. Na hora que você precisa."
- "Fornecedor de bebidas para bares, restaurantes e eventos em [cidade]."
- "Estoque completo. Entrega rápida. Preço de distribuidora."

### 13.3 Copy para CTAs

**Principal:**
- "Chamar no WhatsApp" (nunca "Contate-nos" ou "Enviar mensagem")
- "Quero um orçamento" (para serviços técnicos)
- "Agendar agora" (para saúde e estética)
- "Pedir entrega" (para alimentação e bebidas)
- "Falar com um especialista" (para contador, advogado)

**Secundário:**
- "Ver serviços"
- "Como funciona"
- "Nossos trabalhos"

### 13.4 Mensagens pré-preenchidas de WhatsApp por nicho

```
Clínica de Estética:
"Olá! Vi o site do Studio [Nome] e quero agendar uma avaliação. Podem me ajudar?"

Eletricista:
"Olá! Preciso de um eletricista em [cidade]. Vi o site de vocês. Podem me atender?"

Ar-Condicionado:
"Olá! Vi o site de vocês sobre ar-condicionado. Preciso de instalação/manutenção. Qual o próximo passo?"

Distribuidora:
"Olá! Vi o site da distribuidora. Gostaria de fazer um pedido / saber sobre valores. Podem me ajudar?"

Dentista:
"Olá! Vi o site do Dr(a). [Nome] e quero agendar uma consulta. Têm horário disponível?"

Contador:
"Olá! Vi o site da [Empresa]. Tenho interesse nos serviços contábeis. Podem me dar mais informações?"
```

---

## 14. Pesquisa de referências de design

### 14.1 Onde pesquisar antes de cada site

| Fonte | URL | O que buscar |
|---|---|---|
| Awwwards | `awwwards.com` | Sites premiados por nicho |
| Dribbble | `dribbble.com` | Mockups de UI por setor |
| Behance | `behance.net` | Projetos completos por nicho |
| Land-book | `land-book.com` | Landing pages bem executadas |
| Lapa.ninja | `lapa.ninja` | Landing pages por categoria |
| Screenlane | `screenlane.com` | Patterns de UI |
| Google Images | `images.google.com` | Referências reais brasileiras |

### 14.2 Queries de pesquisa por nicho (para Google Images e referências)

```
"site clinica estetica design" → para estética
"dentist website design modern" → para dentista
"electrician website design" → para eletricista
"accountant website design professional" → para contador
"barbershop website design" → para barbearia
"pousada site design brasil" → para hospedagem
"air conditioning company website" → para ar-condicionado
"beverage distributor website" → para distribuidora
```

### 14.3 Tendências de design por nicho (2025-2026)

**Saúde e estética:** fundos claros (branco ou off-white), tipografia serif para autoridade, fotos reais em vez de ilustrações, minimalismo com muito espaço em branco, verde sage ou nude como cor de destaque.

**Serviços técnicos (eletricista, ar-condicionado):** azul profissional + amarelo/laranja para energia, fotos de profissionais em ação com EPI, ícones técnicos, dados concretos (anos de experiência, atendimentos realizados), foco em urgência e disponibilidade 24h.

**Gastronomia e bebidas:** cores quentes (vermelho, laranja, âmbar), fotografia de produto em alta qualidade, cardápio visual, entrega em destaque, elementos artesanais para posicionamento premium.

**Barbearia:** estética vintage ou industrial moderna, paleta escura (preto + dourado), tipografia com personalidade (serif ou display), fotos de processo de trabalho.

**Contador e advogado:** seriedade sem frieza, azul marinho + branco, tipografia serif clássica, escritório organizado, credenciais e certificações em destaque.

---

## 15. Roadmap de execução em fases

### Fase 1 — Infraestrutura (antes de qualquer site)

**Duração estimada:** 1-2 dias  
**O que fazer:**

- [ ] Criar a estrutura de diretórios em `marvinsites.com.br/exemplos/`
- [ ] Criar a página de índice `/exemplos/index.html`
- [ ] Adicionar link "Exemplos" no menu principal do site
- [ ] Criar seção de portfólio na home
- [ ] Definir número de WhatsApp da Marvin Sites para os links
- [ ] Testar estrutura de URL em ambiente de desenvolvimento

### Fase 2 — Primeiros 5 sites (prioridade máxima)

**Duração estimada:** 1 semana  
**Sequência:**

| Ordem | Nicho | Motivo da prioridade |
|---|---|---|
| 1º | Clínica de Estética | Volume alto de busca, visual forte, ticket alto |
| 2º | Eletricista | Urgência extrema, ROI imediato do site |
| 3º | Dentista | Volume massivo de busca local, confiança crítica |
| 4º | Contador | B2B com busca racional e recorrente |
| 5º | Ar-Condicionado | Alta demanda sazonal (El Niño), urgência |

**Processo por site:**
1. Executar prompt de pesquisa de referências (seção 9.1)
2. Buscar e validar URLs de imagens (seção 9.5)
3. Executar prompt principal de geração (seção 9.2)
4. Executar prompt de validação (seção 9.3)
5. Aplicar checklist de qualidade (seção 10)
6. Publicar e testar em mobile

### Fase 3 — Próximos 5 sites

**Duração estimada:** 1-2 semanas  
**Sequência:**

| Ordem | Nicho |
|---|---|
| 6º | Empresa de Reforma e Pintura |
| 7º | Salão de Beleza |
| 8º | Psicólogo |
| 9º | Distribuidora de Bebidas |
| 10º | Pousada |

### Fase 4 — Completar portfólio

**Duração estimada:** 2-3 semanas  
**Sequência:**

| Ordem | Nicho |
|---|---|
| 11º | Fisioterapeuta |
| 12º | Advogado |
| 13º | Nutricionista |
| 14º | Personal Trainer |
| 15º | Pizzaria/Delivery |
| 16º | Corretor de Imóveis |
| 17º | Escola de Idiomas |
| 18º | Dedetizadora |
| 19º | Veterinário |
| 20º | Barbearia |
| 21º | Pet Shop |
| 22º | Pilates/Academia |

### Fase 5 — Otimização pós-publicação

**Duração estimada:** contínua  
**O que fazer:**

- [ ] Testar todos os links de WhatsApp
- [ ] Verificar performance com Google Lighthouse (meta: 90+ em todos)
- [ ] Adicionar sites ao menu "Exemplos" do site principal
- [ ] Criar landing pages de nicho na Marvin Sites linkando para cada exemplo
- [ ] Monitorar cliques nos sites de portfólio via analytics

---

## 16. Regras gerais e critérios de qualidade

### 16.1 Antes de publicar cada site, responder:

1. Um cliente do segmento que acessar este site vai pensar "isso foi feito para mim"?
2. O site passa confiança imediatamente nos primeiros 3 segundos?
3. O visitante sabe claramente como chamar o negócio no WhatsApp?
4. O site funciona perfeitamente no celular?
5. A Marvin Sites ficaria orgulhosa de mostrar isso em uma prospecção?
6. O banner "demonstrativo Marvin Sites" está claro sem ser intrusivo?
7. Nenhum elemento fictício pode ser confundido com um negócio real e prejudicar alguém?

Se qualquer resposta for "não" ou "talvez" — revisar antes de publicar.

### 16.2 O que nunca fazer nos sites de portfólio

- Usar foto de pessoa real identificável como "dono do negócio"
- Usar endereço de negócio real existente como endereço fictício
- Usar número de telefone real de outra pessoa/empresa
- Usar nome de negócio real existente
- Apresentar depoimentos como se fossem de clientes reais
- Deixar links quebrados
- Publicar com `index` (permitir indexação como negócio real no Google)
- Usar qualquer prompt ou instrução de IA visível no HTML
- Copiar/replicar design de site de concorrente

### 16.3 O que sempre fazer

- Deixar o banner de aviso "demonstrativo" visível em todos os sites
- Manter o botão WhatsApp apontando para a Marvin Sites (não para número fictício)
- Atualizar o índice `/exemplos/` sempre que um novo site for publicado
- Testar em iOS Safari e Android Chrome antes de publicar
- Manter uma lista interna dos sites publicados com URLs e datas

### 16.4 Evolução do portfólio

O portfólio não é estático. Prioridades de evolução:

**Fase de maturação:**
- Substituir sites fictícios por cases reais de clientes (com autorização)
- Adicionar seção "Antes e Depois" em cada nicho
- Criar versões com texto em evidência do diagnóstico Marvin

**Novos nichos a considerar (futuro):**
- Clínica de estética corporal / depilação
- Mecânica automotiva
- Agência de seguros
- Salão de festas
- Floricultura
- Transporte e logística local
- Oficina de costura e roupas sob medida
- Clínica de acupuntura

---

## 17. Changelog

| Data | Versão | Alteração | Responsável |
|---|---|---|---|
| Set/2026 | 1.0 | Criação do documento completo | Marvin Sites |

---

*Documento gerado e mantido pela operação Marvin Sites.*  
*Dúvidas ou atualizações: registrar no changelog e comunicar ao time.*
