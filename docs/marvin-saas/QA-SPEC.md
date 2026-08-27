# Marvin Local — QA Spec

**Status:** DRAFT — Gate 0.5 (plano futuro, sem implementação)  
**Última atualização:** 27/08/2026

---

## Testes unitários

| Teste | Escopo |
|---|---|
| Check parsers (HTML) | título, meta, H1, viewport, contato |
| Extração de metadata | WhatsApp detection, phone detection |
| Score determinístico | mesmos inputs → mesma nota |
| Top 3 prioridades determinístico | mesmos checks → mesma lista |
| Versionamento | score_version/check_version corretos |
| URL normalization | http/https, www, trailing slash |
| Phone normalization | formatos BR |
| Status transitions | scan pending → running → completed |

---

## Testes de integração

| Teste | Escopo |
|---|---|
| business create/dedupe | mesmo place_id não duplica business |
| scan create | associado ao business correto |
| scan check persistence | todos os checks salvos corretamente |
| score snapshot | calculado e salvo ao final do scan |
| lead ↔ business | lead.business_id ligado corretamente |
| attribution preservation | UTM preservado do Raio-X ao lead |
| Google response normalization | campo ausente não quebra scan |
| Rate limit | 429 após limite excedido |

---

## Testes E2E (antes de MS-G9 — beta fechado)

| Fluxo | Cenário |
|---|---|
| home → Raio-X | CTA abre corretamente |
| business search | resultado retorna |
| business confirmation | usuário confirma negócio correto |
| contact submit | lead criado, scan iniciado |
| loading state | feedback ao usuário enquanto scana |
| result view | resultado completo exibido |
| human diagnostic CTA | redireciona / abre WhatsApp |
| radar CTA disabled | exibe "em breve" quando Radar não disponível |
| consent reject | scan não inicia sem consentimento |
| consent accept | scan inicia normalmente |
| mobile | toda a experiência em 375px |
| scan failure | mensagem de erro amigável |
| scan partial | resultado parcial exibido corretamente |
| rate limit | usuário vê mensagem, não erro técnico |

---

## Validação humana — MS-G6

Antes de qualquer público:

1. Selecionar 20–30 negócios reais (locais conhecidos)
2. Executar Raio-X automático para cada um
3. Fazer avaliação humana independente para cada um
4. Comparar: "Esse resultado faz sentido?"
5. Medir: falsos positivos, falsos negativos
6. Corrigir checks problemáticos
7. Re-validar após correções

Critério de aceite: nenhum resultado que "não conseguimos defender" em público.

---

## Gate checklist (acúmulo por MS-Gate)

### MS-G3 — Scanner V0
- [ ] Scanner retorna JSON consistente para sites diferentes
- [ ] Falha de HTTP não quebra processo
- [ ] Timeout controlado

### MS-G4 — Google Places
- [ ] Busca retorna resultados relevantes
- [ ] place_id armazenado corretamente
- [ ] FieldMask mínimo em uso
- [ ] Billing alert configurado

### MS-G5 — Score Engine
- [ ] Mesmos checks → mesma nota (determinístico)
- [ ] score_version registrado
- [ ] Top 3 prioridades corretos

### MS-G6 — Validação humana
- [ ] 20+ negócios testados
- [ ] Nenhum resultado indefensável
- [ ] Falsos positivos corrigidos

### MS-G7 — Interface
- [ ] Mobile-first funcional
- [ ] Loading state presente
- [ ] Resultado legível
- [ ] CTAs funcionando

### MS-G8 — Tracking
- [ ] Eventos disparando na sequência correta
- [ ] Nenhum PII em GA4
- [ ] Attribution preservada

### MS-G9 — Beta fechado
- [ ] 50 scans reais executados
- [ ] Nenhum crash crítico
- [ ] Score reconhecido como plausível pelos usuários
