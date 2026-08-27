# Marvin Sites — Changelog

---

## [Não lançado]

### Documentação
- Criados todos os docs em `docs/marvin/` a partir da Especificação Técnica v1.0

---

## [Site] — 2026-08-27

### Performance
- `cssCodeSplit: false` no Vite — elimina cascata CSS bloqueante (965ms → 0)
- Google Fonts não-bloqueante via `media="print" onload` + noscript fallback
- Logo SVG 1KB substituindo PNG 607KB — elimina LCP pesado

### Acessibilidade
- Múltiplas rodadas de correção WCAG AA: contraste `text-gray-400` → `text-gray-600`, `text-white/40` → `text-white/70`, badges `text-conversao` → `text-orange-700`
- Honeypot com `aria-hidden="true"` + `tabindex="-1"`
- Numbers com `aria-hidden="true"` na seção Solution

### SEO
- 4 páginas de cidade expandidas com FAQs locais (~600-700 palavras cada)
- Sitemap enviado ao Google Search Console (indexação solicitada)
- Google Search Console verificado via meta tag + arquivo HTML

### Conteúdo
- Seção Testimonials reescrita com 6 casos antes/depois representativos
- Disclaimer honesto: "Casos representativos baseados em perfis reais de mercado"
- Páginas de Termos e Privacidade com data atualizada e cláusula de domínio revisada

### Infraestrutura
- Netlify redirects: http/www → https/apex (elimina duplo redirect)
- Logo: CSS placeholder → `favicon.svg` colorido no header

### PageSpeed final
- Performance: 93
- Accessibility: 96
- Best Practices: 100
- SEO: 100
