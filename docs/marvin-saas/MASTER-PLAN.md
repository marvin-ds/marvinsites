# Marvin Local — Plano Mestre Executivo da Esteira de Micro-SaaS

**Versão:** 1.0 — 27/08/2026  
**Status:** documento estratégico e executivo  
**Natureza:** documento vivo. Produto, preços, frequência de monitoramento e módulos devem evoluir com dados reais.

> SOURCE IMPORT: este documento foi consolidado a partir do "Marvin Local — Plano Mestre Executivo da Esteira de Micro-SaaS" (fonte externa, 27/08/2026). Decisões canônicas registradas abaixo. Preservar o arquivo-fonte original.

---

## 1. Decisão central

A Marvin Sites não criará vários Micro-SaaS independentes.

A estratégia é construir **uma única plataforma de Presença Digital Local**, inicialmente simples, que ganha novos módulos conforme houver demanda comprovada.

```
RAIO-X MARVIN          gratuito
↓
MARVIN RADAR           monitoramento recorrente
↓
MARVIN AVALIAÇÕES      reputação
↓
MARVIN CONCORRENTES    comparação local
↓
MARVIN ORIGEM          origem dos contatos e clientes
↓
MARVIN LOCAL           bundle da plataforma
↓
SERVIÇOS MARVIN        execução humana das melhorias
```

A lógica econômica:

```
Software identifica → Marvin explica → Cliente entende o problema
→ Software acompanha → Marvin pode executar → Cliente permanece
→ Novas necessidades aparecem → Expansão
```

---

## 2. Categoria que estamos construindo

**Presença Digital Local**

A plataforma responde perguntas simples:
- Quando alguém procura minha empresa, encontra algo profissional?
- Meu site está funcionando?
- Meu WhatsApp está fácil de encontrar?
- Meu negócio aparece corretamente no Google?
- Minha reputação está melhorando?
- De onde estão vindo meus contatos?
- O que eu deveria melhorar agora?

Não entregar um painel cheio de métricas técnicas. Entregar **respostas**.

A plataforma traduz tecnologia em: **encontrar → entender → confiar → chamar.**

---

## 3. Princípio de desenvolvimento

> **Não desenvolver o próximo módulo antes de validar que o anterior gera uso, percepção de valor ou receita.**

Sequência correta:

```
1. Construir Raio-X
2. Validar utilização
3. Construir Radar
4. Conseguir primeiros assinantes
5. Ouvir usuários
6. Construir Avaliações
7. Validar adesão
8. Construir Concorrentes
9. Validar adesão
10. Construir Origem
11. Consolidar Marvin Local
```

---

## 4. Arquitetura dos produtos

| Ordem | Produto | Função | Modelo |
|---|---|---|---|
| 1 | **Raio-X Marvin** | Aquisição e diagnóstico inicial | Gratuito |
| 2 | **Marvin Radar** | Monitoramento recorrente | R$29–49/mês (hypothesis) |
| 2A | **Guardião Marvin** | Monitor técnico | Dentro do Radar |
| 3 | **Marvin Avaliações** | Reputação | Add-on |
| 4 | **Marvin Concorrentes** | Comparação local | Add-on |
| 5 | **Marvin Origem** | Atribuição de contatos | Add-on premium |
| 6 | **Marvin Presença AI** | Recomendações | Camada da plataforma |
| 7 | **Marvin Local** | Bundle | R$99–197/mês (hypothesis) |
| permanente | **Marvin Sites** | Execução humana | Serviços separados |

---

## 5. O Diagnóstico Humano continua existindo

O Raio-X não substitui o diagnóstico humano. Ele passa a funcionar **antes** dele.

Novo fluxo oficial:

```
ANÚNCIO / GOOGLE / CONTEÚDO / PROSPECÇÃO
↓
HOME MARVIN
↓
RAIO-X GRATUITO
↓
RESULTADO IMEDIATO
↓
DIAGNÓSTICO HUMANO OPCIONAL
↓
WHATSAPP
↓
PROPOSTA
↓
SERVIÇO MARVIN
```

Segunda etapa (futuro):

```
RAIO-X → MARVIN RADAR → RECORRÊNCIA SAAS
```

---

## 6. Nota Marvin — Princípios

A nota será: **determinística, explicável, versionada e reproduzível.**

IA NÃO decide score. IA NÃO inventa checks. IA NÃO decide top 3.
IA poderá futuramente apenas explicar dados existentes em linguagem natural.

Pesos aprovados:

| Área | Pontos |
|---|---:|
| Presença e informações locais | 25 |
| Site e clareza | 25 |
| Contato e WhatsApp | 20 |
| Confiança e reputação | 15 |
| Saúde técnica | 15 |
| **Total** | **100** |

Ver especificação completa: [SCORING-SPEC.md](SCORING-SPEC.md)

---

## 7. Hipótese inicial de preços

**STATUS: hypothesis — não tratar como permanente.**

Lançamento:
- Raio-X: R$0
- Radar Beta: R$39–49/mês

Evolução planejada:
- Após Avaliações: Radar + Avaliações R$59–69
- Após Concorrentes: Local R$99–129
- Após Origem: Local Pro R$149–197

---

## 8. Stack tecnológico

| Componente | Tecnologia | Notas |
|---|---|---|
| Site institucional | Astro (existente) | Não migrar |
| Aplicação SaaS | `app.marvinsites.com.br` — React + Vite + TS + Tailwind | Mobile-first |
| Backend | Supabase (compartilhado com site) | Isolamento lógico |
| E-mail | Resend | Free tier inicialmente |
| Analytics | GTM + GA4 (Gate 2 do site) | Compartilhado |
| Places | Google Places API (MS-G4) | FieldMask mínimo |
| Pagamentos | Atomicat (se tecnicamente adequada) | Validar MS-G14 |

**Um único Supabase** para site, CRM, Raio-X e Radar.

---

## 9. Investimento inicial estimado

Desenvolvimento e beta:

| Item | Estimativa |
|---|---:|
| Supabase | US$0 (Free) |
| Resend | US$0 (Free tier) |
| Google Places | US$0 dentro das franquias |
| GA4/GTM | US$0 |
| Hosting adicional | US$0–5 |
| IA | US$0 |
| **Total incremental** | **~US$0–5/mês** |

Produção comercial (primeiro investimento estrutural):
- Supabase Pro: US$25/mês
- Hosting: ~US$5/mês

Regra financeira: **só aumentar custo quando houver uso real, receita ou risco operacional real.**

---

## 10. Critérios para construir módulos seguintes

**Avaliações:** construir se usuários pedirem, houver uso recorrente, reputação aparecer como prioridade recorrente.

**Concorrentes:** construir se clientes demonstrarem interesse, comparação aparecer em vendas.

**Origem:** construir quando clientes anunciarem e perguntarem de onde vêm contatos.

Critério mínimo:
- Antes de Avaliações: 5–10 pagantes Radar
- Antes de Concorrentes: 20+ clientes ativos
- Antes de Origem: 10+ clientes que anunciam

---

## 11. Riscos principais

| Risco | Mitigação |
|---|---|
| Construir demais | MS-Gates e critérios de validação |
| Score não confiável | Determinístico + validação humana (MS-G6) |
| Depender demais do Google | Dados próprios + abstração de fontes + scanner próprio |
| Custos de API crescerem | FieldMask + cache permitido + frequência inteligente |
| Violações de políticas | Gate específico Google (MS-G4) + atribuições |
| Painel complicado | Responder sempre: o que aconteceu? isso importa? o que faço agora? |
| Usuário não agir | Botão "Resolver com a Marvin" |

---

## 12. North Star Metric

**Negócios ativos monitorados** — não downloads, não contas, não scans.

---

## 13. Frase que orienta o produto

> **"A Marvin não precisa construir um software que faça tudo. Precisa construir um software que mostre ao pequeno empresário o que merece atenção — e torne simples resolver."**

---

## 14. Visão de longo prazo

```
AQUISIÇÃO:  Raio-X gratuito
↓
RECORRÊNCIA: Radar / Marvin Local
↓
EXECUÇÃO:   Marvin Sites (serviço humano)
```

Um visitante pode entrar gratuitamente → virar assinante → depois virar cliente de serviço.
O software aumenta retenção do serviço. O serviço aumenta o valor do software.

---

*Referência: [ROADMAP.md](ROADMAP.md) | [SCORING-SPEC.md](SCORING-SPEC.md) | [RAIO-X-PRODUCT-SPEC.md](RAIO-X-PRODUCT-SPEC.md)*
