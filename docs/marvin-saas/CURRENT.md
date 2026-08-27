# Marvin Local — Estado Atual

**Atualizar a cada MS-Gate concluído.**

---

## Produto atual

**Raio-X Marvin**

## Stage

**Pre-development / contract**

---

## MS-Gate atual

**MS-G0 — Contrato do produto: PENDING**

Motivo: pontuação individual dos checks, thresholds, prioridades e política Google ainda precisam ser congelados antes do código.

MS-G0 não pode ser declarado APPROVED até que SCORING-SPEC.md esteja completo.

---

## Branch atual (Gate 0.5)

`chore/marvin-g05-raiox-alignment`

## O que está concluído

- [x] Gate 0.5 — reconciliação arquitetural (documental)
- [x] docs/marvin-saas/ criada com 14 documentos
- [x] Raio-X definido como futura porta principal de aquisição
- [x] business definido como entidade estrutural central
- [x] Supabase compartilhado documentado
- [x] MS-Gates definidos e reconciliados com Gates Marvin Sites
- [x] Tracking legacy vs futuro separado
- [x] Interlock G4/G12/G13 ↔ MS-G10 documentado

## O que ainda NÃO está feito

- [ ] Raio-X implementado (código zero)
- [ ] Scanner (código zero)
- [ ] Google Places integrada
- [ ] Supabase configurado
- [ ] Interface Raio-X
- [ ] Radar (nem começado)
- [ ] Autenticação
- [ ] Cobrança

---

## Pendências antes de MS-G1

1. MS-G0 SCORING-SPEC.md precisa ser fechado (pontos individuais, thresholds, prioridades, regra de partial)
2. GOOGLE-DATA-SPEC.md precisa ser revisado antes de integrar Places
3. Inventário técnico (repositório, DNS, Google Cloud, Places, secrets, ambientes)

---

## Próxima missão

**MS-G0 — Contrato do produto**

Fechar:
- nomes finais dos produtos
- pontuação individual de cada check no SCORING-SPEC
- thresholds por área
- regra de partial scan
- tratamento de ausência de site
- política de top 3
- mensagens ao usuário
- limites de uso do Raio-X
- preços beta definitivos (hoje são hypotheses)
- escopo final do V1

**Aguardar autorização explícita antes de iniciar MS-G0.**

---

## Raio-X — estado atual

Não existe código.

O CTA atual da home (`Quero meu diagnóstico gratuito`) continua ativo em produção.

O cutover para Raio-X acontece apenas no MS-G10 — Raio-X público.

Não retirar o fluxo atual antes disso.

---

## Preview (site atual)

https://marvinsites.com.br
