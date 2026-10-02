# Marvin Local — Plano Mestre Executivo da Esteira de Micro-SaaS
## Addendum V1.1 — Managed-Site Mode e Integração com a Infraestrutura Marvin

**VERSÃO:** 1.1 ADDENDUM
**DATA-BASE:** 05/09/2026
**STATUS:** ADDENDUM CANÔNICO
**SUBSTITUI:** nada; complementa o Plano Mestre V1.0.
**GOVERNA:** relação entre Marvin Local/Radar e sites de clientes hospedados/gerenciados pela Marvin.
**NÃO GOVERNA:** score Raio-X, roadmap completo SaaS, hosting, preço de serviços.
**PREVALÊNCIA:** em conflitos sobre integração com sites Marvin, este Addendum prevalece sobre o V1.0.

---

# 1. Decisão

A nova infraestrutura dos sites de clientes cria um modo adicional de operação para a esteira SaaS:

> **Managed-Site Mode**

Quando a empresa utiliza um site construído e gerenciado pela Marvin, parte dos sinais necessários ao Radar pode ser obtida de forma mais direta e confiável.

Isso não transforma o Radar em “painel de hospedagem”.

O valor continua sendo:

> **saber se a presença digital está organizada, funcionando e o que merece atenção.**

# 2. Dois modos futuros

## External Site Mode
Negócio usa site externo. Radar depende de scanner, APIs e sinais públicos.

## Managed-Site Mode
Negócio usa site Marvin. Radar poderá combinar sinais públicos com sinais operacionais próprios.

# 3. Identificadores

Sites Marvin devem registrar:

```text
client_id
repo_slug
netlify_project_id
team_id
domain
plan_code
baseline_commit
go_live_at
```

O SaaS não deve depender apenas do nome comercial.

# 4. Sinais reutilizáveis

Possíveis sinais futuros:

- HTTP;
- HTTPS;
- SSL;
- redirects;
- deploy;
- WhatsApp;
- form;
- PageSpeed;
- Search Console;
- tracking;
- erros;
- consumo;
- incidentes;
- baseline.

# 5. Evitar duplicação

O monitoramento operacional criado para cuidar dos clientes não deve ser reimplementado do zero dentro do Radar.

Preferir:

```text
operational checks
↓
interface estável
↓
Radar
```

# 6. Service Request

Quando Radar identificar problema em cliente gerenciado:

> **Quero que a Marvin resolva**

O pedido pode transportar:

- client_id;
- check;
- prioridade;
- scan;
- contexto;
- plano.

# 7. Limites

Radar não deve expor créditos Netlify ao pequeno empresário.

Ele traduz sinais técnicos em linguagem de presença.

# 8. Ordem preservada

Permanece:

Raio-X → Radar → Avaliações → Concorrentes → Origem → Marvin Local.

Não antecipar módulos por causa da nova infraestrutura.

# 9. Estado atual

- Raio-X: NOT STARTED;
- Radar: NOT STARTED;
- Vercel: NOT CREATED.

Este Addendum é somente documental.

# 10. Critério de implementação futura

Managed-Site Mode só deve ser construído quando:

- existirem sites Marvin ativos;
- sinais estiverem estáveis;
- processo manual estiver entendido;
- Radar estiver priorizado.

# 11. Diretriz final

> **A infraestrutura de serviços deve alimentar o futuro produto; o produto não deve obrigar a operação a construir complexidade prematuramente.**
