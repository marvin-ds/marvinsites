# Marvin Sites — Especificação Técnica, Dados, Tracking, Atribuição, SEO e Roadmap de Implementação

**VERSÃO:** 2.0
**DATA-BASE:** 05/09/2026
**STATUS:** CANÔNICO
**SUBSTITUI:** V1.0 de 27/08/2026
**GOVERNA:** arquitetura técnica da operação Marvin, dados, tracking, integrações, ambientes, segurança e roadmap por Gates.
**NÃO GOVERNA:** posicionamento de marca, copy pública, limites comerciais detalhados, contrato, design de produto do Raio-X/Radar.
**PREVALÊNCIA:** prevalece sobre a V1.0 em arquitetura técnica, hosting de clientes e roadmap. O documento Netlify governa detalhes de infraestrutura de sites de clientes; o Fair Use governa limites; CURRENT governa o estado efetivamente executado.
**NATUREZA:** documento vivo e executável por Gates.

---

# 0. Objetivo

Esta versão reconcilia o estado técnico real com as novas decisões estratégicas.

A arquitetura deixa de misturar:

- site institucional Marvin;
- backend e operação própria;
- sites dos clientes;
- aplicações futuras;
- checkout;
- SaaS.

Essas superfícies passam a ter responsabilidades distintas.

Princípio:

> **Cada camada deve ser simples, rastreável, reversível e governada pelo documento correto.**

---

# 1. Estado técnico conhecido

## 1.1 Concluído em produção

- G3 — Attribution: PRODUCTION APPROVED;
- G4 — Lead Capture: PRODUCTION APPROVED;
- G5 — WhatsApp Attribution: PRODUCTION APPROVED;
- COM-G1 — Home / Oferta / Copy: PRODUCTION APPROVED.

## 1.2 Não iniciado

- G6 — CRM Lite;
- Raio-X Marvin;
- Marvin Radar;
- Vercel app;
- arquitetura final de pagamentos.

## 1.3 Repositórios

**Produto:** `C:\Projetos\marvin-sites`
**Operações:** `C:\Projetos\marvin-ops`

Último par canônico conhecido antes desta reconciliação:

- marvin-sites: `91a929d719c4f04e331d6bf615d9d21b39e91030`;
- marvin-ops: `ce3c2e7f6e2a1c7842594adef4348ae33473f815`.

Esses hashes são snapshot histórico e devem ser confirmados por Git antes de qualquer implementação.

---

# 2. Arquitetura em quatro domínios

## A. Site institucional Marvin

```text
marvinsites.com.br
↓
Astro / TypeScript / Tailwind
↓
GitHub
↓
Netlify
↓
Netlify Functions quando necessário
↓
Supabase / GTM / GA4 / WhatsApp
```

Função:

- aquisição;
- conteúdo;
- SEO;
- diagnóstico;
- formulário;
- tracking.

## B. Backend e operação própria Marvin

```text
Site / Functions
↓
Supabase
↓
Leads / atribuição / consentimento / status / deals
↓
CRM / pagamentos / conversões futuras
```

Supabase permanece fonte de verdade da operação Marvin.

## C. Sites dos clientes

```text
Briefing
↓
Marvin Starter
↓
Repo privado do cliente
↓
Astro / TypeScript / componentes Marvin
↓
Netlify Project exclusivo
↓
Domínio do cliente
```

Cada cliente possui:

- `client_id`;
- repo próprio;
- project próprio;
- domínio próprio;
- baseline;
- plano;
- registro de tracking e integrações.

## D. Aplicações / SaaS

```text
Raio-X / Radar / Marvin Local
↓
Vercel (quando autorizado)
↓
Supabase
```

Não criar agora.

---

# 3. Decisão sobre Atomicat

Atomicat deixa de ser dependência estrutural de hospedagem dos sites Marvin.

A V1.0 previa Atomicat para hospedagem e cobrança. Isso é substituído parcialmente:

- hosting de clientes → Netlify;
- criação padrão → stack Marvin;
- pagamento → OPEN / provider-agnostic.

Atomicat pode ser usada como ferramenta especializada em projeto específico, sem se tornar arquitetura-padrão.

---

# 4. Pagamentos — arquitetura agnóstica

O sistema deve poder integrar um provedor que ofereça:

- Pix;
- cartão;
- boleto quando necessário;
- recorrência;
- webhooks;
- idempotência;
- reference/metadata;
- cancelamento;
- refund;
- status de assinatura.

Possíveis provedores não constituem decisão:

- AtomicPay;
- Asaas;
- Stripe;
- Mercado Pago;
- outros.

Não criar campos ou nomes dependentes de um fornecedor quando um conceito genérico for suficiente.

---

# 5. Supabase — fonte de verdade

Permanecem os domínios de dados já implementados:

- `businesses`;
- `business_sources`;
- `leads`;
- `lead_attribution`;
- `lead_consents`;
- `lead_status_history`;
- `human_diagnostics`;
- `deals`;
- `checkout_sessions`;
- `payments`;
- `subscriptions`;
- `provider_webhook_events`;
- `conversion_queue`;
- `email_subscriptions`;
- `email_events`;
- `audit_log`;
- `whatsapp_clicks`.

Não reabrir tabelas aprovadas sem Gate próprio.

---

# 6. G1/G4/G5 — estado preservado

G1 estabeleceu core, índices, funções/triggers e RLS.

G4 estabeleceu captura transacional por RPC e idempotência de submissão.

G5 estabeleceu persistência de clique WhatsApp e `whatsapp_ref` opaco.

A reconciliação documental não autoriza migrations.

---

# 7. Segurança

Obrigatório:

- service role apenas em servidor;
- RLS;
- logs sem PII desnecessária;
- validação server-side;
- idempotência;
- secrets fora do Git;
- sem tokens em chat;
- sem dados pessoais em GA4;
- rate limit em endpoints quando necessário;
- rollback definido.

---

# 8. Consentimento e tracking

A implementação atual de Consent Mode v2 permanece válida.

Default:

- analytics_storage denied;
- ad_storage denied;
- ad_user_data denied;
- ad_personalization denied.

GTM/GA4 seguem o estado aprovado.

Não modificar sem novo Gate.

---

# 9. G3 Attribution

Permanecem:

- first touch;
- last touch;
- UTM;
- gclid;
- gbraid;
- wbraid;
- fbclid;
- referrer;
- landing;
- session_id;
- versionamento.

Não reabrir.

---

# 10. G4 Lead Capture

Permanecem:

- submissão server-side;
- atomicidade;
- idempotência;
- business;
- lead;
- attribution;
- consent;
- status inicial;
- histórico.

Não reabrir.

---

# 11. G5 WhatsApp

Permanecem:

- `whatsapp_ref`;
- `placement`;
- `session_id`;
- persistência server-side;
- sem PII no código de referência;
- RLS;
- instrumentação dos CTAs.

Não adicionar `environment` à tabela retroativamente sem nova decisão.

---

# 12. Eventos da operação Marvin

Browser:

- page_view;
- diagnostic_start;
- diagnostic_submit;
- whatsapp_click;
- plan_view;
- plan_cta_click;
- example_view;
- faq_open.

Server/comercial:

- lead_created;
- contacted;
- qualified;
- diagnostic_delivered;
- proposal_sent;
- checkout_sent;
- purchase;
- subscription_started;
- subscription_renewed;
- subscription_failed;
- subscription_canceled;
- refund;
- lost.

Nenhum evento deve carregar PII em GA4.

---

# 13. Sites de clientes — princípios técnicos

Padrão:

- static-first;
- Astro;
- TypeScript;
- componentes reutilizáveis;
- conteúdo estruturado;
- JS mínimo;
- imagens otimizadas;
- Netlify Forms quando suficiente;
- Functions somente quando justificadas.

Objetivo:

- performance;
- baixo consumo;
- segurança;
- portabilidade;
- manutenção simples;
- Preview barato;
- rollback.

---

# 14. Identificação de cliente

Campos internos mínimos:

```text
client_id
project_slug
repo_slug
netlify_project_id
domain
plan_code
setup_value
monthly_value
team_id
go_live_at
baseline_commit
baseline_deploy_id
```

Convenção sugerida:

`MS-CL-0001`

Repo:

`client-0001-clinica-aurora`

Project:

`ms-0001-clinica-aurora`

---

# 15. Marvin Starter V1

Ainda não implementado.

Deverá conter:

- brand config;
- business data;
- SEO;
- schema;
- WhatsApp;
- form;
- mapa;
- reviews;
- FAQ;
- GTM opcional;
- analytics opcional;
- Netlify config;
- testes.

A spec específica governa o Starter.

---

# 16. Tracking modular dos clientes

Não instalar tudo para todos.

## Micro
- WhatsApp;
- form;
- baseline técnico.

## Essencial
- Search Console;
- GA4 quando útil;
- eventos básicos.

## Profissional
- GA4;
- GTM quando necessário;
- WhatsApp/form events;
- Clarity opcional.

## Crescimento
- Ads;
- pixels;
- UTMs;
- conversões;
- landing pages;
- A/B;
- atribuição.

---

# 17. Contas de clientes

Sempre que viável:

- GA4;
- Search Console;
- Google Ads;
- Meta;
- pixels;

devem ser criados em propriedade/controlabilidade do cliente, com acesso Marvin.

---

# 18. SEO baseline de sites de clientes

Obrigatório:

- title;
- meta description;
- canonical;
- H1 único;
- H2/H3 coerentes;
- sitemap;
- robots;
- Open Graph;
- favicon;
- alt;
- mobile;
- schema;
- URLs limpas;
- informação local consistente.

Não prometer posição.

---

# 19. Performance

Regras:

- WebP/AVIF quando viável;
- `srcset`;
- dimensões;
- lazy loading fora do hero;
- evitar vídeo pesado local;
- JS mínimo;
- bibliotecas sob demanda;
- scripts de marketing somente se usados.

Budget inicial de referência:

- home preferencialmente ~1,5 MB ou menos em condição normal;
- sem console errors críticos;
- sem recursos essenciais quebrados.

---

# 20. Forms de clientes

Plano simples:

```text
Form
↓
Netlify Forms
↓
notificação
```

Plano avançado:

```text
Form
↓
Netlify Forms / endpoint
↓
webhook
↓
CRM / automação / Supabase
```

Não transformar painel Forms em CRM sem decisão.

---

# 21. DNS

Nenhuma mudança DNS sem:

- inventário;
- MX;
- SPF;
- DKIM;
- DMARC;
- TXT;
- A/AAAA/CNAME;
- subdomínios;
- rollback.

O runbook específico governa execução.

---

# 22. Environments

## Marvin institucional

Produção:
`marvinsites.com.br`

Preview:
Netlify Deploy Preview.

## Clientes

Cada projeto deve ter:

- branch main/prod;
- Preview;
- domínio final;
- variáveis próprias.

Preview não deve contaminar conversão real.

## Apps futuros

Vercel/Supabase apenas quando Gate autorizar.

---

# 23. Netlify Teams

Direção:

- Marvin Core;
- Marvin Clientes A;
- novas Teams por consumo/risco.

Decisão de criar ou migrar Team ainda OPEN.

Não alterar conta nesta reconciliação.

---

# 24. Fair use

A spec técnica apenas referencia:

`CLIENT_PLAN_LIMITS_AND_FAIR_USE_V1.0.md`

Não duplicar parâmetros em múltiplos documentos.

---

# 25. Observabilidade dos sites de clientes

Antes do Radar:

- HTTP;
- HTTPS;
- SSL;
- redirects;
- home;
- WhatsApp;
- form;
- links;
- performance;
- tracking conforme plano.

O monitoramento manual/operacional de hoje deve ser construído de maneira reutilizável pelo futuro Radar.

---

# 26. Incidentes

P1:

- site indisponível;
- domínio;
- SSL;
- CTA principal.

P2:

- form;
- tracking;
- mapa;
- função comercial importante.

P3:

- cosmético;
- melhoria;
- conteúdo não crítico.

Princípio:

> restaurar primeiro, investigar/refatorar depois.

---

# 27. Backup e rollback

Fonte de verdade do código:

Git.

Deploy:

histórico Netlify.

Conteúdo:

arquivos estruturados versionados.

Assets originais:

arquivo administrativo seguro.

Leads:

sistema definido no escopo.

---

# 28. Relação com Raio-X / Radar

O site de cliente pode futuramente fornecer dados de:

- uptime;
- deploy;
- SSL;
- WhatsApp;
- form;
- PageSpeed;
- tracking;
- Search Console;
- consumo.

A arquitetura deve evitar duplicação entre operação manual e SaaS.

---

# 29. Roadmap técnico reconciliado

## TRACK CORE — Marvin institucional

### G0/G1/G2/G3/G4/G5
Concluídos conforme CURRENT.

### G6 — CRM Lite
NOT STARTED.

### G7 — Payment Provider Gate
Substitui o antigo conceito “Atomicat Gate”.

Objetivo:

- comparar provedores;
- escolher;
- integrar;
- webhooks;
- recorrência;
- Pix;
- provider reference;
- idempotência.

### G8 — PIX / reconciliação
Depois do provider Gate, se necessário.

### G9 — Google enhanced/offline conversions
Quando houver vendas e volume.

### G10 — Email
Quando houver necessidade operacional.

### G11+ — SEO/Ads/otimizações
Atualizar conforme prioridade comercial real.

---

# 30. Track de infraestrutura de clientes

## ARCH-G1 — Reconciliation
Esta documentação.

## ARCH-G2 — Netlify Client Baseline
Decidir:
- Core vs Client Team;
- Pro;
- owner/access;
- alertas;
- reserva.

## ARCH-G3 — Marvin Starter V1
Implementar a spec.

## ARCH-G4 — Primeiro template
Escolher nicho.

## ARCH-G5 — Primeiro cliente
Provisionar via runbook.

## ARCH-G6 — Medição
Consumir 3–5 clientes antes de automatizar.

Nenhum desses Gates inicia automaticamente com esta documentação.

---

# 31. Track SaaS

Permanece separado:

- MS-G0 scoring;
- MS-G1 inventory;
- scanner;
- Raio-X;
- Radar.

O estado real deve ser lido no CURRENT e docs `marvin-saas`.

Não criar app por causa desta reconciliação.

---

# 32. Testes de site cliente

Mínimo:

- build;
- links;
- mobile;
- overflow;
- title/meta;
- canonical;
- sitemap;
- robots;
- schema;
- WhatsApp;
- form;
- 404;
- HTTPS;
- consentimento quando aplicável.

---

# 33. Gate de produção de cliente

Antes de go-live:

1. branch correta;
2. diff conhecido;
3. build;
4. Preview;
5. conteúdo conferido;
6. aprovação;
7. DNS inventariado;
8. rollback;
9. produção;
10. smoke;
11. baseline;
12. registro no sistema.

---

# 34. Governaça de agentes

Antes de editar:

- objetivo;
- allowed paths;
- estado Git;
- decisão canônica;
- testes;
- rollback;
- output.

Uma ferramenta não pode redefinir silenciosamente:

- preços;
- arquitetura;
- claims;
- domínio;
- propriedade;
- estado de Gate.

---

# 35. Git

Um writer por vez.

Handoff:

- commit;
- push;
- tree clean;
- CURRENT;
- pair state;
- Resume Spec.

Nenhum force push sem decisão explícita.

---

# 36. Métricas técnicas

Marvin Core:

- lead capture;
- attribution;
- WhatsApp;
- erros;
- conversion queue futura.

Clientes:

- créditos;
- bandwidth;
- requests;
- deploys;
- compute;
- incidentes;
- tempo de manutenção;
- custo por cliente.

---

# 37. Definição de sucesso

A arquitetura estará madura quando a Marvin conseguir responder:

## Própria operação

- origem do lead;
- diagnóstico;
- WhatsApp;
- qualificação;
- proposta;
- venda;
- mensalidade;
- receita;
- consentimento;
- CAC.

## Cada cliente

- qual plano;
- qual domínio;
- qual repo;
- qual project;
- qual Team;
- qual baseline;
- quanto consome;
- qual tracking;
- quais integrações;
- quando foi último deploy;
- quanto suporte consome;
- está dentro do fair use;
- precisa upgrade?

Se não conseguimos responder, a operação ainda não está pronta para escalar.

---

# 38. Decisões abertas

- payment provider;
- Netlify Team topology executada;
- auto recharge;
- momento do G6;
- momento do Raio-X;
- momento do Ads;
- política jurídica final de código/licença;
- SLA por plano.

---

# 39. Changelog

## V2.0 — 05/09/2026

- separadas quatro arquiteturas;
- Netlify substitui Atomicat como hosting padrão de clientes;
- pagamento torna-se provider-agnostic;
- G3/G4/G5 preservados;
- COM-G1 registrado como produção;
- novo track ARCH;
- Fair Use referenciado;
- Starter formalizado como futuro;
- SaaS separado;
- DNS e provisioning ganham runbooks próprios.
