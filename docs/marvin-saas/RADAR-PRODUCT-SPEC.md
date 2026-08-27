# Marvin Radar — Product Spec

**Status:** HIGH LEVEL / FROZEN — não detalhar features até MS-G15 se aproximar  
**Última atualização:** 27/08/2026

> Este documento existe para evitar surpresas arquiteturais no modelo de dados
> e nas integrações. Não construir código antes de validar Raio-X (MS-G9/G10).

---

## Objetivo

Monitoramento recorrente da presença digital do negócio.

**Promessa:**

> Sua presença digital monitorada continuamente.

---

## Modelo de negócio

Primeiro produto SaaS recorrente da Marvin.

Hipótese de preço: **R$39–49/mês** (STATUS: hypothesis — não tratar como permanente)

Critério para lançar: 5–10 pagantes antes de construir módulos seguintes.

---

## Onboarding

O usuário que realizou o Raio-X já possui:
- Empresa cadastrada (business_id)
- Baseline de score
- Contato salvo

Ao assinar Radar: **ativar monitoramento, não fazer novo onboarding.**

```
RAIO-X → baseline salvo → assinatura → monitoramento ativo
```

---

## Dashboard V1 (conceitual)

```
Sua presença agora: 67/100
No mês passado: 63/100
Mudança: +4

[Problemas ativos]
[Problemas resolvidos]
[Alertas]
[Histórico]
[Próximas prioridades]
```

---

## Frequência de monitoramento

| Frequência | O que monitorar |
|---|---|
| Diário | site responde, HTTPS, certificado, redirect, página principal |
| Semanal | links importantes, WhatsApp, mudanças relevantes |
| Mensal | score completo, Google, avaliações, PageSpeed, relatório |

O pequeno empresário não precisa receber notificações diárias. Foco em **alertas relevantes**.

---

## Guardião Marvin (dentro do Radar)

Não é um produto separado. É uma função interna do Radar.

Exemplos de alertas:
- "Seu site ficou indisponível."
- "Seu certificado apresenta problema."
- "Não encontramos mais o botão principal de WhatsApp."

Vendemos: "Se algo importante atrapalhar o cliente de encontrar ou chamar sua empresa, você fica sabendo."

---

## Alertas V1

Canal: **e-mail primeiro** (não WhatsApp Business API ainda).

No dashboard:
- Alertas ativos
- Alertas resolvidos
- Prioridade
- Ação recomendada

---

## Serviço humano dentro do Radar

Quando houver um problema identificado, exibir:

**"Quero que a Marvin resolva"**

Ao clicar, cria um `service_request` com contexto completo (cliente, site, problema, score, scan, plano atual).

O cliente não precisa explicar tudo novamente.

---

## Autenticação

Magic link via Supabase Auth. Não criar senha tradicional inicialmente.
Google OAuth: posteriormente, quando necessário.

---

## MS-Gates para Radar

| MS-Gate | Entrega |
|---|---|
| MS-G11 | Autenticação, dashboard básico, business ownership |
| MS-G12 | Scans agendados, histórico, evolução, issues |
| MS-G13 | Guardião (uptime, SSL, alertas) |
| MS-G14 | Cobrança (checkout, assinatura, entitlement) |
| MS-G15 | Radar Beta pago (5–10 primeiros clientes) |

Não construir código de Radar antes de MS-G10 (Raio-X público) estar aprovado.

---

## Tabelas Supabase associadas (futuro — não implementar no G1)

- `business_memberships` — usuário ↔ business
- `alerts` — alertas do Guardião
- `feature_entitlements` — módulos ativos por subscription

Ver [DATA-MODEL.md](DATA-MODEL.md) seção "Entidades futuras".
