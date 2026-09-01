# Marvin Sites — Especificação Técnica, Dados, Tracking, Atribuição, SEO e Roadmap de Implementação

**Versão:** 1.0  
**Data-base:** 27/08/2026  
**Status:** Documento técnico canônico para execução fase a fase em Claude Code  
**Natureza:** Documento vivo. Alterações relevantes devem ser registradas no changelog e em `DECISIONS.md`.

---

## 0. Objetivo

Este documento transforma o Plano Mestre comercial da Marvin Sites em uma especificação técnica executável.

A reconstrução não parte de uma página em branco. O layout, a identidade visual e a lógica geral do site atual serão preservados sempre que fizer sentido. O trabalho passa a concentrar-se em posicionamento e copy, arquitetura de conversão, diagnóstico como CTA principal, Google Ads e atribuição, GTM, GA4, Consent Mode, conversões otimizadas, conversões offline, Supabase como fonte de verdade, integração com Atomicat, rastreamento de vendas via WhatsApp, tratamento de PIX sem link, e-mail marketing, SEO técnico, páginas por nicho, segurança e mensuração econômica.

Princípio operacional:

> **A página só estará pronta para receber tráfego quando formos capazes de acompanhar o caminho completo de um visitante até lead, diagnóstico, proposta, venda e recorrência.**

---

# 1. Decisões estratégicas já aprovadas

## 1.1 Categoria

A Marvin Sites vende **Presença Digital Local**, não "site barato" e não "criação de site" como produto isolado.

Ecossistema comercial:

**Google → Perfil da Empresa → Google Maps → Site/Página → Avaliações → WhatsApp**

Resultado que comunicamos:

**encontrar → entender → confiar → chamar**

## 1.2 CTA principal

CTA primário da home e das landing pages:

> **Quero meu diagnóstico gratuito**

WhatsApp permanece disponível como rota secundária.

## 1.3 Diagnóstico

Mensagem oficial:

- **Solicitação em menos de 1 minuto.**
- **Diagnóstico entregue em até 24 horas úteis.**

## 1.4 Prova e demonstrações

Os casos atuais não serão apresentados como clientes reais.

Título aprovado:

> **Exemplos de transformação de presença digital**

Subtítulo:

> **Cenários demonstrativos baseados em situações comuns de negócios locais.**

Nenhum depoimento fictício deverá ser apresentado como depoimento real.

## 1.5 SEO

Formulação-base:

> **Estrutura de SEO local para ajudar o Google a entender seus serviços e região de atuação.**

Sem promessa de posição, clientes ou faturamento.

## 1.6 Recorrência

A mensalidade será comunicada como:

> **Cuidado contínuo da presença digital**

## 1.7 Oferta inicial

### Presença Local Micro
- implantação: **R$ 399**
- cuidado contínuo: **R$ 97/mês**
- público: micro-negócios, MEIs e prestadores solo
- escopo altamente padronizado

### Presença Local Essencial
- cuidado contínuo: **R$ 197/mês**
- público: pequenos negócios com necessidade de presença mais completa

### Presença Local Profissional
- referência inicial: **R$ 1.497**
- cuidado contínuo: **R$ 297/mês**

### Crescimento Local
- referência inicial: **a partir de R$ 2.997**
- cuidado contínuo: **a partir de R$ 497/mês**

Preços são hipóteses comerciais e podem evoluir com CAC, margem, retenção e taxa de fechamento.

## 1.8 Pagamentos e hospedagem

A **Atomicat** será utilizada para:

- hospedagem;
- cobrança da implantação;
- cobrança recorrente;
- links de pagamento;
- recursos de atribuição/tagueamento disponíveis.

Os nomes exatos de parâmetros, webhooks, metadados e APIs da Atomicat serão validados tecnicamente antes da integração.

## 1.9 Banco

O **Supabase** será a fonte de verdade para leads, atribuição, consentimentos, status comercial, diagnósticos, propostas, vendas, pagamentos, assinaturas, e-mail, filas de conversão e auditoria.

---

# 2. Princípios técnicos obrigatórios

1. Supabase é a fonte de verdade.
2. Nenhuma chave de serviço no navegador.
3. Webhooks verificados e idempotentes.
4. Todo evento comercial importante tem `event_id`.
5. Todo lead possui first-touch e last-touch.
6. Toda venda precisa ser associável a um lead.
7. PIX manual não pode quebrar atribuição.
8. Consentimento e marketing precisam ser auditáveis.
9. O usuário pode recusar tags não essenciais.
10. A página funciona mesmo sem Analytics.
11. Preview não contamina produção.
12. GA4 não recebe PII.
13. Logs não devem conter PII desnecessária.
14. Tracking é testado antes de produção.
15. Google Ads deve aprender com qualidade e venda, não apenas com cliques.
16. Atomicat é ferramenta, não centro da marca.
17. A arquitetura deve permitir troca futura de ferramentas sem perda do histórico comercial.

---

# 3. Arquitetura de alto nível

```text
VISITANTE
   |
   v
MARVINSITES.COM.BR
   |
   +----------------------+
   |                      |
   v                      v
CMP / CONSENTIMENTO      FORMULÁRIO / WHATSAPP
   |                      |
   v                      v
GOOGLE TAG MANAGER       API/ENDPOINT MARVIN
   |                      |
   +---- GA4              v
   +---- GOOGLE ADS      SUPABASE
   +---- CONVERSION       |
        LINKER            +--- LEADS
   +---- FUTURO META      +--- ATTRIBUTION
                          +--- CONSENTS
                          +--- STATUS
                          +--- DEALS
                          +--- DIAGNOSTICS
                          +--- PAYMENTS
                          +--- SUBSCRIPTIONS
                          +--- CONVERSION QUEUE
                          +--- EMAIL
                          +--- AUDIT

WHATSAPP
   |
   +--> link de checkout Marvin
          |
          v
   /go/checkout/{token}
          |
          +--> registra clique / lead / atribuição
          |
          v
       ATOMICAT
          |
          +--> pagamento
          +--> recorrência
          +--> webhook/API, se disponível
          |
          v
       SUPABASE

PIX MANUAL
   |
   +--> confirmação administrativa
          |
          v
       SUPABASE
          |
          +--> purchase
          +--> conversion_queue
          |
          v
GOOGLE ADS DATA MANAGER / CONVERSÕES OFFLINE
```

---

# 4. Ambientes

## Produção
- `marvinsites.com.br`
- Supabase prod
- GTM prod
- GA4 prod
- Google Ads real
- Atomicat real
- e-mails reais

## Desenvolvimento
- Supabase local ou namespace de desenvolvimento
- nenhum evento de Google Ads de produção
- GA4 em debug/teste
- links Atomicat de teste quando disponíveis

## Preview/Staging
- `noindex`
- sem conversões reais de Ads
- sem upload offline
- `environment = staging`

---

# 5. Identificação

IDs UUID:

- `lead_id`
- `attribution_id`
- `consent_id`
- `diagnostic_id`
- `deal_id`
- `checkout_session_id`
- `payment_id`
- `subscription_id`
- `event_id`
- `conversion_queue_id`

Código curto de WhatsApp:

`MS-7K4P`

Sem PII.

---

## 5.1 Attribution Foundation — Gate 3

`attribution_version = g3-v1`

G3 captura e preserva contexto first-party de origem antes da persistência de
leads no Supabase. A implementação fica no browser, sem PII, sem fingerprinting,
sem GA client ID e sem envio manual ao GA4.

O snapshot local deve ser compatível com `lead_attribution`:

- first-touch imutável;
- last-touch atualizável apenas por novo contexto útil;
- sessão first-party em `sessionStorage`;
- atribuição persistente em `localStorage` por 90 dias;
- UTMs e click IDs preservados em campos separados.

G3 não cria migration e não altera GTM, GA4, Supabase remoto, Vercel ou DNS.

## 5.2 Lead Capture Foundation — Gate 4

`capture_version = g4-v1`

G4 troca a persistência principal do formulário de Netlify Forms para Supabase,
mantendo Netlify como runtime do site e do endpoint server-side.

Fluxo:

```text
formulário
→ /.netlify/functions/lead-capture
→ public.capture_lead_v1(payload jsonb)
→ businesses + leads + lead_attribution + lead_consents
```

A operação usa `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` somente no servidor.
O browser nunca recebe credencial privilegiada e continua sem insert direto nas
tabelas Common Core.

G4 adiciona idempotência por `submission_id`, sem dedupe por e-mail/telefone, e
não altera GTM, GA4, Vercel, DNS, Google Ads, WhatsApp attribution ou CRM Lite.

---

# 6. Modelo de dados Supabase

Ver `DATA-MODEL.md` para schema completo de tabelas.

---

# 7. Segurança Supabase

Ver `PRIVACY-SPEC.md` para política de retenção e consentimento.

- RLS em tabelas com dados pessoais.
- `anon` não lê leads.
- formulário público não insere com `service_role` no cliente.
- submissão por endpoint server-side/Edge Function.
- painel administrativo autenticado.
- rate limit + honeypot + validação server-side.
- Turnstile apenas se houver abuso.
- logs sem telefone/e-mail completo.
- segredos somente em env vars.

Variáveis previstas:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
GTM_CONTAINER_ID
GA4_MEASUREMENT_ID
GOOGLE_ADS_CUSTOMER_ID
GOOGLE_ADS_CONVERSION_ID
GOOGLE_ADS_CONVERSION_LABEL
GOOGLE_DATA_MANAGER_CREDENTIALS
ATOMICAT_API_KEY
ATOMICAT_WEBHOOK_SECRET
ATOMICAT_ACCOUNT_ID
EMAIL_PROVIDER_API_KEY
ADMIN_ALLOWED_EMAILS
```

---

# 8. Performance e acessibilidade

Performance:
- fontes otimizadas;
- imagens responsivas;
- lazy load fora do hero;
- JavaScript reduzido;
- layout estável;
- mobile prioritário.

Acessibilidade:
- contraste;
- focus;
- labels;
- teclado;
- `aria-expanded`;
- erros acessíveis;
- alt text.

---

# 9. Observabilidade

Checar:
- formulário;
- Supabase;
- webhook Atomicat;
- conversion queue;
- e-mail.

Alertar em:
- 5xx;
- webhook falhando;
- conversão presa;
- e-mail bloqueado;
- spam;
- checkout sem reconciliação.

---

# 10. Deploy

1. nunca direto em produção;
2. branch;
3. testes;
4. preview;
5. validação;
6. merge controlado;
7. production deploy;
8. smoke real;
9. rollback definido.

Banco:
- migrations versionadas;
- backup antes de destrutivo;
- sem edição manual irreproduzível.

---

# 11. Branches

```text
chore/marvin-g0-inventory
feat/marvin-g1-supabase
feat/marvin-g2-consent-tracking
feat/marvin-g3-lead-attribution
feat/marvin-g4-diagnostic-form
feat/marvin-g5-whatsapp-attribution
feat/marvin-g6-crm-lite
feat/marvin-g7-atomicat
feat/marvin-g8-pix-offline
feat/marvin-g9-google-conversions
feat/marvin-g10-email
feat/marvin-g11-seo
feat/marvin-g12-home-conversion
```

Commits pequenos e reversíveis.

---

# 12. Ordem de execução

```text
G0 Inventário
→ G1 Supabase
→ G2 Consent/Tracking
→ G3 Attribution
→ G4 Form
→ G5 WhatsApp
→ G6 CRM
→ G7 Atomicat
→ G8 PIX
→ G9 Google offline/enhanced
→ G10 Email
→ G11 SEO técnico
→ G12 Arquitetura home
→ G13 Copy
→ G14 QA
→ G15 Release
→ G16 Google Ads
→ G17 Nichos
→ G18 Otimização
→ G19 Meta experimental
```

Princípio:

> **Primeiro construímos a capacidade de medir; depois reconstruímos a máquina que será medida.**

---

# 13. Definição de sucesso

A infraestrutura estará concluída quando conseguirmos responder:

- de qual campanha veio este lead?
- qual página viu?
- pediu diagnóstico?
- clicou no WhatsApp?
- foi qualificado?
- recebeu diagnóstico?
- recebeu proposta?
- qual plano?
- qual setup?
- qual mensalidade?
- pagou por Atomicat ou PIX?
- qual CAC?
- está ativo?
- cancelou?
- quanto gerou de receita real?
- Google Ads recebeu o sinal de venda?
- consentiu marketing?
- quando deve sair da base?

Se não conseguimos responder isso, o tracking não está terminado.

---

# 14. Critério global de aceite dos Gates

Todo Gate termina com:

```text
Branch:
HEAD:
Working tree:
Origin/local:
Build:
Tests:
Preview:
Mudanças:
Migrations:
Env vars:
Tracking verificado:
Riscos:
Próximo Gate:
```

Build passando não é suficiente.

---

# 15. Referências técnicas oficiais

- Google — Consent Mode / Tag Platform
- Google Ads — Conversões Otimizadas para Leads
- Google Ads — Conversões Offline / Data Manager
- Google Ads — Vinculação GA4 ↔ Google Ads

Observação 2026: os fluxos novos de conversões offline e conversões otimizadas para leads devem seguir a arquitetura vigente do Data Manager, não tutoriais legados.

---

# Changelog

## v1.0 — 27/08/2026

Documento inicial criado a partir do Plano Mestre comercial.
