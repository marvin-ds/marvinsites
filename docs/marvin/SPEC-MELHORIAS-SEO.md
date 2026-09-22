# Marvin Sites — Spec de Melhorias SEO Futuras

**Status:** PARTIALLY IMPLEMENTED  
**Data-base:** 2026-09-22  
**Origem:** Auditoria do site `marvinsites.com.br` contra guia editorial "Seu site existe e o Google não sabe: 20 ajustes que a IA resolve numa tarde"  
**Escopo inicial:** documentação apenas.  
**Atualização:** itens técnicos executáveis foram implementados em seguida, sem alteração de tracking, Consent Mode, Netlify, Supabase ou oferta comercial.

---

## 1. Objetivo

Registrar as melhorias SEO identificadas para implementação futura, separando:

- o que já está implementado no site Marvin Sites;
- o que está parcialmente implementado;
- o que ainda não está implementado;
- o que vale a pena priorizar antes de novas frentes de conteúdo ou aquisição.

Esta spec não substitui a `SEO-SPEC.md` canônica. Ela funciona como lista de pendências técnicas e editoriais derivadas da auditoria.

---

## 2. Estado Atual Auditado

Referência técnica auditada:

- domínio: `https://marvinsites.com.br`;
- repositório: `C:\Projetos\marvin-sites`;
- HEAD observado na auditoria inicial: `11a7741144368a5b6b1054e75a7990a0bf01a9ec`;
- auditoria inicial realizada sem alteração de arquivos de produção.

---

## 3. Guia Usado Como Referência

O guia organiza a auditoria em quatro blocos:

1. **Deixar entrar**  
   Garantir que Google e rastreadores consigam acessar e indexar o site.

2. **Deixar entender**  
   Garantir que cada página tenha estrutura, títulos, descrições, URLs, links internos e dados estruturados compreensíveis.

3. **Deixar rápido e apresentável**  
   Garantir boa experiência mobile, imagens otimizadas e aparência correta ao compartilhar links.

4. **Aparecer também nas respostas de IA**  
   Verificar se rastreadores de IA estão bloqueados ou permitidos conscientemente.

---

## 4. O Que Já Está Implementado

### 4.1 Indexação e acesso

Implementado:

- HTTPS ativo em produção.
- Redirecionamento `http://marvinsites.com.br/` para `https://marvinsites.com.br/`.
- HSTS ativo em produção.
- `robots.txt` existe e responde `200`.
- `robots.txt` permite o site em geral.
- `robots.txt` bloqueia apenas rotas que não devem ser indexadas:
  - `/obrigado`;
  - `/.netlify/`.
- `sitemap.xml` existe e responde `200`.
- `sitemap.xml` lista home, páginas de nicho, páginas de cidade, privacidade e termos.
- Home não possui `noindex`.
- Página `/obrigado/` possui `noindex`, o que é intencional.

Arquivos relevantes:

- `public/robots.txt`
- `src/pages/sitemap.xml.ts`
- `src/layouts/BaseLayout.astro`

### 4.2 Entendimento das páginas

Implementado:

- Titles configurados por página.
- Meta descriptions configuradas por página.
- Canonical implementado no layout base.
- H1 estruturado por tipo de página:
  - home;
  - nichos;
  - cidades;
  - páginas legais.
- URLs limpas e compreensíveis:
  - `/nichos/clinicas`;
  - `/nichos/contadores`;
  - `/cidades/santos`;
  - `/cidades/guaruja`;
  - etc.
- Links internos entre home, nichos, cidades, termos, privacidade e CTAs.
- Schema.org básico implementado:
  - `LocalBusiness`;
  - `Service`.
- Verificação do Google Search Console presente no código.

Arquivos relevantes:

- `src/layouts/BaseLayout.astro`
- `src/lib/schema.ts`
- `src/pages/index.astro`
- `src/layouts/NichoLayout.astro`
- `src/components/sections/NichoHero.astro`
- `src/components/sections/CidadeHero.astro`

### 4.3 Apresentação social

Parcialmente implementado:

- Tags Open Graph existem:
  - `og:title`;
  - `og:description`;
  - `og:image`;
  - `og:url`;
  - `og:type`;
  - `og:locale`.
- Tags Twitter Card existem:
  - `twitter:card`;
  - `twitter:title`;
  - `twitter:description`;
  - `twitter:image`.

Estado após execução:

- `public/og-image.jpg` foi criado com dimensão 1200x630 px.
- O layout já apontava para `/og-image.jpg`, portanto a lacuna de arquivo ausente foi fechada.

Arquivo relevante:

- `src/layouts/BaseLayout.astro`

### 4.4 Performance e mobile

Implementado:

- Meta viewport configurada.
- CSS e layout são responsivos.
- Assets do Astro possuem cache agressivo via Netlify.
- Fontes usam preconnect/preload e carregamento não bloqueante.

Estado após execução:

- `public/logo-mark.png` foi reduzido de aproximadamente 622 KB para poucos KB.
- `public/favicon.png` foi reduzido de aproximadamente 946 KB para poucos KB.
- Não houve auditoria Lighthouse/PageSpeed formal nesta rodada.

Arquivos relevantes:

- `public/logo-mark.png`
- `public/favicon.png`
- `src/components/layout/Footer.astro`
- `netlify.toml`

### 4.5 Rastreadores de IA

Estado após execução:

- `robots.txt` permite tudo por padrão via `User-agent: *`.
- Não há bloqueio explícito para rastreadores de IA.
- A decisão foi documentada como comentário no `robots.txt`: páginas públicas de marketing ficam abertas para descoberta, e bloqueios específicos devem passar por nova decisão.

Interpretação:

- O site provavelmente não bloqueia rastreadores de IA, mas a decisão ainda não está registrada de forma explícita como escolha estratégica.

---

## 5. Melhorias Recomendadas

### P1 — Criar imagem social canônica

**Problema:** `og:image` aponta para `/og-image.jpg`, mas o arquivo não existe.

**Impacto:** links compartilhados em WhatsApp, redes sociais e mensageiros podem aparecer sem imagem, com preview incompleto ou com aparência amadora.

**Recomendação:**

- Criar `public/og-image.jpg` ou ajustar o caminho para um asset existente.
- Tamanho recomendado: 1200x630 px.
- Conteúdo sugerido:
  - marca Marvin Sites;
  - mensagem curta: "Presença digital local para pequenos negócios";
  - elementos visuais de Google + site + WhatsApp;
  - sem prometer ranking, clientes ou resultado garantido.

**Estado:** implementado.

---

### P1 — Confirmar indexação no Google Search Console

**Problema:** o código está preparado para rastreamento, mas a auditoria técnica não confirma, sozinha, se o Google já rastreou e indexou todas as páginas relevantes.

**Recomendação:**

- Confirmar no Google Search Console:
  - propriedade verificada;
  - sitemap enviado;
  - home inspecionada;
  - páginas de nicho inspecionadas;
  - páginas de cidade inspecionadas;
  - ausência de bloqueios por `robots.txt`;
  - ausência de `noindex` indevido;
  - páginas válidas no relatório de indexação.

**Vale implementar?** Sim. Alta prioridade operacional antes de escalar tráfego pago ou conteúdo.

---

### P2 — Otimizar imagens pequenas e assets públicos

**Problema:** há PNGs grandes usados em contexto pequeno:

- `public/logo-mark.png`: aproximadamente 622 KB;
- `public/favicon.png`: aproximadamente 946 KB.

**Impacto:** pode prejudicar carregamento, especialmente em mobile e rede lenta.

**Recomendação:**

- Substituir logo pequeno por SVG quando possível.
- Gerar versões PNG realmente dimensionadas para favicon/ícone.
- Manter assets grandes somente se forem usados em contexto que justifique a resolução.

**Estado:** implementado parcialmente. Ainda falta auditoria Lighthouse/PageSpeed formal.

---

### P2 — Enriquecer Schema.org

**Problema:** Schema.org existe, mas ainda é básico.

Observações:

- `LocalBusiness` contém telefone placeholder.
- `sameAs` está vazio.
- Serviços e áreas atendidas poderiam ser mais explícitos.
- Não há `FAQPage` apesar de haver FAQ visível na home.

**Recomendação:**

- Atualizar `schemaLocalBusiness()` com dados reais aprovados.
- Considerar `Organization` ou `LocalBusiness` conforme decisão canônica.
- Adicionar `FAQPage` se o conteúdo de FAQ permanecer estável.
- Melhorar `Service` por nicho/cidade quando fizer sentido.
- Nunca criar avaliações fictícias ou claims não comprovados.

**Estado:** implementado parcialmente. O schema foi enriquecido com `WebSite`, `FAQPage`, `LocalBusiness` sem telefone falso, imagem social e áreas atendidas. Ainda pode evoluir quando houver dados externos reais, como perfis sociais e Google Perfil da Empresa.

---

### P2 — Documentar decisão sobre rastreadores de IA

**Problema:** `robots.txt` permite bots genericamente, mas não há decisão explícita registrada sobre rastreadores de IA.

**Recomendação:**

- Definir se Marvin Sites deseja permitir ou bloquear rastreadores de IA.
- Como a estratégia atual depende de descoberta e presença digital, a recomendação inicial é permitir rastreamento, salvo riscos específicos.
- Registrar a decisão em documentação operacional e, se necessário, no próprio `robots.txt`.

**Estado:** documentado no `robots.txt`, sem criar bloqueios específicos.

---

### P2 — Rodar auditoria Lighthouse/PageSpeed mobile

**Problema:** a auditoria atual não mediu Core Web Vitals ou Lighthouse.

**Recomendação:**

- Rodar PageSpeed Insights ou Lighthouse em:
  - home;
  - uma página de nicho;
  - uma página de cidade;
  - `/privacidade`;
  - `/termos`.
- Registrar:
  - Performance;
  - Accessibility;
  - Best Practices;
  - SEO;
  - LCP;
  - CLS;
  - INP/TBT conforme ferramenta.

**Vale implementar?** Sim. Prioridade média antes de novas campanhas ou expansão de páginas.

---

### P3 — Google Perfil da Empresa

**Problema:** a melhoria de maior retorno para negócio local pode estar fora do site.

**Recomendação:**

Confirmar que o Google Perfil da Empresa da Marvin está completo com:

- nome correto;
- categoria correta;
- endereço ou área de atendimento, conforme estratégia;
- telefone;
- horário de funcionamento;
- fotos reais;
- descrição clara;
- link para o site;
- avaliações respondidas.

**Vale implementar?** Sim, mas fora do repositório. Prioridade comercial alta, execução externa.

---

## 6. O Que Não Deve Ser Feito Sem Nova Decisão

Não implementar automaticamente:

- produção massiva de conteúdo antes de fechar as pendências técnicas P1;
- promessas de ranking, clientes ou vendas;
- marcações de avaliação fictícia em schema;
- bloqueio de rastreadores de IA sem decisão estratégica;
- alteração ampla de robots/CSP/tracking sem gate específico;
- redesign da home por preferência estética.

---

## 7. Checklist De Implementação Futura

Antes de considerar esta spec concluída:

- [x] Criar `og-image` canônica.
- [ ] Confirmar sitemap e indexação no Google Search Console.
- [x] Otimizar `logo-mark.png` e `favicon.png`.
- [x] Atualizar Schema.org com estrutura enriquecida sem dados fictícios.
- [x] Decidir e documentar política inicial para rastreadores de IA.
- [ ] Rodar Lighthouse/PageSpeed em páginas representativas.
- [ ] Confirmar que não houve regressão em Consent/GTM/GA4/Meta.
- [ ] Confirmar que mudanças não alteram oferta, preços ou claims aprovados.

---

## 8. Priorização Recomendada

Sequência sugerida:

1. `og-image` canônica.
2. Google Search Console e inspeção de indexação.
3. Otimização de imagens pequenas.
4. Schema.org enriquecido.
5. Política de rastreadores de IA.
6. Lighthouse/PageSpeed formal.
7. Google Perfil da Empresa, em frente operacional externa.

---

## 9. Critério De Fechamento

Esta spec pode ser marcada como concluída quando:

- os itens P1 forem implementados e validados;
- os itens P2 forem auditados ou implementados com decisão explícita;
- houver evidência de Search Console ou equivalente confirmando rastreamento/indexação;
- o preview social do domínio estiver correto;
- a documentação for atualizada com o resultado final.
