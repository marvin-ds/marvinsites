# Marvin Starter — Especificação V1.0

**VERSÃO:** 1.0
**DATA-BASE:** 05/09/2026
**STATUS:** SPEC — NÃO IMPLEMENTADO
**GOVERNA:** escopo futuro do Starter técnico de sites de clientes.
**NÃO GOVERNA:** implementação atual, layout final de cliente ou preço.

---

# 1. Objetivo

Criar uma base Astro/TypeScript reutilizável que reduza tempo de entrega sem produzir sites genéricos.

# 2. Princípios

- static-first;
- config-driven;
- conteúdo separado de layout;
- mobile first;
- acessível;
- SEO baseline;
- baixo JS;
- performance;
- Preview;
- tracking modular;
- sem secrets.

# 3. Estrutura

```text
src/
  components/
    common/
    sections/
    conversion/
    forms/
    local/
  content/
    business.json
    services.json
    reviews.json
    faq.json
    locations.json
  config/
    brand.ts
    seo.ts
    features.ts
    tracking.ts
  layouts/
  pages/
  styles/
public/
netlify/
tests/
```

# 4. business.json

Deve permitir:

- nome;
- razão social opcional;
- telefone;
- WhatsApp;
- e-mail;
- endereço;
- cidade;
- região;
- horários;
- social;
- mapa;
- CTA.

# 5. Componentes mínimos

- Header simples;
- Hero;
- Services;
- About;
- Differentials;
- Reviews;
- Gallery;
- Location;
- Service Area;
- FAQ;
- Contact;
- WhatsApp;
- Form;
- Footer.

# 6. Componentes opcionais

- before/after;
- team;
- price guide;
- portfolio;
- sticky CTA;
- campaign banner.

# 7. SEO

- title;
- meta;
- canonical;
- sitemap;
- robots;
- OG;
- schema;
- local data;
- favicon.

# 8. Tracking

Feature flags:

```text
analytics: false
gtm: false
clarity: false
metaPixel: false
```

Nada carrega por padrão sem escopo.

# 9. Consentimento

Se analytics/ads ativado:

- CMP;
- Consent Mode quando aplicável;
- sem PII.

# 10. Forms

Netlify Forms baseline.

Opções:

- honeypot;
- webhook;
- success page.

# 11. WhatsApp

Config:

- number;
- message;
- placement;
- service context;
- tracking optional.

# 12. Performance

- imagens otimizadas;
- lazy load;
- sem JS desnecessário;
- sem vídeo pesado local.

# 13. Testes

- build;
- internal links;
- metadata;
- H1;
- overflow;
- WhatsApp;
- form markup;
- sitemap;
- robots.

# 14. Design

Starter não define “um design Marvin”.

Deve permitir:

- tokens;
- tipografia;
- cores;
- spacing;
- composição;
- ordem de seções.

# 15. Critério de aceite

Starter é aceito quando:

- cria Preview limpo;
- conteúdo troca sem caçar hardcode;
- tracking é opcional;
- SEO baseline passa;
- mobile passa;
- criar cliente não exige refatorar core.

# 16. O que não entra V1

- CMS;
- dashboard;
- quiz engine;
- automação de provisioning;
- multi-tenant;
- pacote npm privado;
- Radar.

# 17. Status

NOT IMPLEMENTED.

Nenhum código é criado por esta spec.
