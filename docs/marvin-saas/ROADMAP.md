# Marvin Local — Roadmap (MS-Gates)

**Última atualização:** 27/08/2026

> MS-Gates são numeração própria da Marvin Local / SaaS.
> NÃO confundir com Gates do site Marvin Sites (G0, G1, G2...).
> A distinção é intencional e canônica.

---

## MS-Gates — Raio-X e Radar

| MS-Gate | Nome | Status | Branch |
|---|---|---|---|
| MS-G0 | Contrato do produto | PENDING | — |
| MS-G1 | Inventário técnico | NOT STARTED | — |
| MS-G2 | Modelo de dados | NOT STARTED | — |
| MS-G3 | Scanner V0 | NOT STARTED | — |
| MS-G4 | Google Places | NOT STARTED | — |
| MS-G5 | Score Engine | NOT STARTED | — |
| MS-G6 | Validação humana | NOT STARTED | — |
| MS-G7 | Interface Raio-X | NOT STARTED | — |
| MS-G8 | Tracking / integração Marvin | NOT STARTED | — |
| MS-G9 | Beta fechado | NOT STARTED | — |
| MS-G10 | Raio-X público | NOT STARTED | — |
| MS-G11 | Radar: autenticação | NOT STARTED | — |
| MS-G12 | Radar: histórico e scans recorrentes | NOT STARTED | — |
| MS-G13 | Radar: Guardião (uptime, alertas) | NOT STARTED | — |
| MS-G14 | Radar: cobrança | NOT STARTED | — |
| MS-G15 | Radar Beta pago | NOT STARTED | — |
| MS-G16+ | Módulos adicionais (sob validação) | FROZEN | — |

---

## Detalhamento

### MS-G0 — Contrato do produto (1–2 dias)

Fechar:
- Nomes finais dos produtos
- Score V1: pontuação individual de cada check
- Thresholds por área
- Regra de partial scan
- Tratamento de ausência de site
- Mensagens ao usuário
- Limites de uso do Raio-X gratuito
- Preços beta definitivos (hoje são hypotheses)
- Escopo final do V1

**Critério:** nenhuma ambiguidade relevante antes de programar.

---

### MS-G1 — Inventário técnico

Mapear:
- Repositório (novo ou integrado)
- Deploy (Netlify vs app.marvinsites.com.br)
- Supabase (projeto, branches)
- Migrations existentes (G1 do site)
- DNS para app.marvinsites.com.br
- Google Cloud project
- Places API billing
- Secrets disponíveis

**Critério:** saber exatamente o que será reutilizado.

---

### MS-G2 — Modelo de dados

Implementar (migrations aditivas, após G1 do site):
- `scan_runs`
- `scan_checks`
- `score_snapshots`
- `issues`
- `recommendations`

RLS em todas. Testes de integridade.

**Critério:** estrutura estável antes do scanner.

---

### MS-G3 — Scanner V0

Análise própria de site (sem Google Places ainda):
- HTTP/HTTPS
- Status
- Title, meta, H1
- Mobile viewport
- Contatos (phone, WhatsApp)
- Links e redirects
- Sinais de serviços e localização

Entrada: URL. Saída: JSON.

**Critério:** funciona consistentemente em sites diferentes.

---

### MS-G4 — Google Places

Implementar:
- Busca de negócio
- Confirmação pelo usuário
- Place ID
- FieldMask mínimo
- Detalhes necessários
- Quotas + billing alert
- Atribuição Google obrigatória

**Critério:** identificação consistente de empresas. Sem violações de política.

---

### MS-G5 — Score Engine

Implementar fórmula determinística.
Testes unitários obrigatórios.

**Critério:** mesmos dados sempre geram a mesma nota.

---

### MS-G6 — Validação humana do score

20–30 negócios reais. Avaliação humana + automática. Correção de falsos positivos.

**Critério:** nenhum resultado indefensável publicamente.

---

### MS-G7 — Interface Raio-X

Busca + formulário + loading + resultado + score + categorias + prioridades + CTAs.
Mobile prioritário.

**Critério:** experiência simples e clara.

---

### MS-G8 — Tracking e integração Marvin

Conectar lead, atribuição, consentimento, diagnóstico, scan, CTA.

**Critério:** conseguimos seguir o lead até venda.

---

### MS-G9 — Beta fechado

Usar com prospects Marvin e contatos conhecidos.
Meta: 50 scans reais. Observar falhas, tempo, percepção de valor.

---

### MS-G10 — Raio-X público

Integrar na home. CTA atual → Raio-X Marvin. Funil completo funcionando.

**Critério:** funil completo funcionando.
**Interlock:** este Gate também completa o interlock com G4 e G12/G13 do site.

---

### MS-G11 a MS-G15 — Radar

Ver [RADAR-PRODUCT-SPEC.md](RADAR-PRODUCT-SPEC.md).

**MS-G15 critério:** primeiros 5–10 clientes pagantes. Se ninguém pagar, descobrir por quê antes de construir Avaliações.

---

### MS-G16+ — Módulos adicionais

Somente sob demanda validada:
- Marvin Avaliações (após 5–10 pagantes Radar)
- Marvin Concorrentes (após 20+ clientes ativos)
- Marvin Origem (após 10+ clientes que anunciam)
- Marvin Presença AI (somente após dados estruturados suficientes)
- Marvin Local bundle

---

## Coordenação com Gates do site Marvin Sites

| Gate Site | Interlock com MS-Gates |
|---|---|
| G1 — Supabase compartilhado | deve nascer com `businesses` como entidade central, mas sem tabelas de Radar |
| G2 — Consentimento/tracking | base de tracking compartilhada usada pelo Raio-X também |
| G3 — Attribution | attribution compartilhada preserva UTMs do Raio-X |
| G4 — Lead Capture Foundation | renomeado: não construir UX definitiva de diagnóstico manual que será substituída |
| G12/G13 — Home rebuild | NÃO executar independente antes do MS-G10 |

**Regra de interlock G4:**

G4 deve entregar:
- Endpoint seguro para captura de lead
- Lead ↔ business link
- Consent registration
- Persistência Supabase
- `/obrigado` fallback (hotfix)
- Eventos compartilhados

A UX definitiva do Raio-X pertence aos MS-Gates, não ao G4.

**Regra de interlock G12/G13:**

A reconstrução da home e o novo hero com CTA Raio-X acontecem no MS-G10.
G12/G13 do site (Atomicat, CRM avançado, etc.) devem ser coordenados, não antecipados.

---

## Próximas ações executivas (do MASTER-PLAN)

1. Aprovar este Roadmap
2. Executar MS-G0 — Contrato do produto
3. Hotfix `/obrigado` no site
4. Gate 1 Supabase compartilhado
5. MS-G1 Inventário técnico SaaS
6. MS-G2 Modelo de dados
7. MS-G3 Scanner
8. MS-G4 Google Places
9. MS-G5 Score Engine
10. MS-G6 Validação humana
11. MS-G7 Interface
12. MS-G8 Integração
13. MS-G9 Beta fechado
14. MS-G10 Raio-X público
15. Somente então: Radar
