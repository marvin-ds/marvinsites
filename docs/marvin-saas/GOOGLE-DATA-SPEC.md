# Marvin Local — Google Data Spec

**Status:** DRAFT — Gate 0.5 (contrato, não integração)  
**Última atualização:** 27/08/2026

> EXTERNAL VERIFICATION REQUIRED: política oficial do Google Places deve ser revisada
> imediatamente antes do MS-G4 — termos mudam e este documento pode estar defasado.

---

## Princípio

**Nunca pedir todos os campos "por conveniência."**

Pedimos somente aquilo que realmente será utilizado.
O Google cobra de acordo com o nível mais alto do FieldMask solicitado.

---

## Estratégia de busca

1. Pesquisa de IDs (operação barata)
2. Usuário confirma o negócio correto
3. Uma única consulta de detalhes para o negócio confirmado (FieldMask mínimo)

---

## Campos planejados V1

| Campo | Finalidade | Necessário V1? | Armazenar? | Cache? | SKU/Custo | Observação |
|---|---|---|---|---|---|---|
| `place_id` | Identificador persistente | SIM | SIM | N/A | — | Único permitido para armazenamento persistente |
| `displayName` | Nome do negócio | SIM | temporário | permitido conforme política | Essentials | |
| `formattedAddress` | Localização | SIM | temporário | verificar política | Essentials | |
| `nationalPhoneNumber` | Telefone | SIM | não | por sessão | Essentials/Pro | |
| `websiteUri` | URL do site | SIM | não | por sessão | Essentials | |
| `businessStatus` | Aberto/fechado | SIM | não | por sessão | Essentials | |
| `primaryType` | Categoria | SIM | não | por sessão | Essentials | |
| `regularOpeningHours` | Horários | SIM | não | por sessão | Essentials/Pro | |
| `rating` | Nota média | CONDICIONAL | não | verificar política | Enterprise | avaliar custo |
| `userRatingCount` | Qtd avaliações | CONDICIONAL | não | verificar política | Enterprise | avaliar custo |
| `reviews` | Texto das avaliações | NÃO V1 | NÃO | NÃO | — | fora de escopo |
| `photos` | Fotos | NÃO V1 | NÃO | NÃO | — | fora de escopo |
| `editorialSummary` | Resumo editorial | NÃO V1 | NÃO | NÃO | — | fora de escopo |

> EXTERNAL VERIFICATION REQUIRED: valores de SKU e preço devem ser verificados na
> documentação oficial antes do MS-G4. Os valores acima são referências aproximadas.

---

## Regras de armazenamento

**Permitido armazenar permanentemente:**
- `place_id` — identificador do negócio

**NÃO armazenar permanentemente sem verificar política:**
- Qualquer campo retornado pela Places API além de `place_id`

**Dados derivados da Marvin (armazenamento permitido):**
- Score calculado
- Checks executados
- Issues identificados
- Timestamps e metadados de scan

**Dados brutos do Google (restrições de armazenamento/caching):**
- Verificar política vigente antes de persistir qualquer campo além de `place_id`
- Alguns campos admitem cache por tempo limitado
- Verificar atribuição visual obrigatória

---

## Atribuição visual obrigatória

Google exige que resultados usando Places API mostrem atribuição ("Powered by Google" ou logo conforme política vigente).

> EXTERNAL VERIFICATION REQUIRED: verificar requisitos exatos de atribuição antes do MS-G4.

---

## Billing e quotas

- Billing ativo obrigatório no projeto Google Cloud mesmo dentro da franquia gratuita
- Configurar alertas de custo antes de ir a público
- Monitorar consumo de cada SKU
- `rating` e `userRatingCount` no nível Enterprise: ~1.000 requisições gratuitas/mês

Cenário estimado com 100 negócios (1 consulta/mês cada):

| Volume | SKU | Custo aproximado |
|---|---|---|
| 100 negócios × 1 consulta | Essentials | dentro da franquia |
| 100 negócios × 1 consulta (com rating) | Enterprise | ~US$0–2 extras |

> EXTERNAL VERIFICATION REQUIRED: verificar franquias e preços atuais antes do MS-G4.

---

## Fallback quando Google não responder

O scan deve continuar com `area_1_score = 0` (presença local não avaliada) e `status = partial`.

Não cancelar o scan inteiro por falha da API Places.
Não penalizar o negócio por erro do sistema.

---

## Place ID — uso como identificador

O `place_id` pode ser armazenado para reutilização sem consultar novamente.

Benefícios:
- Evita re-busca na próxima vez que o negócio for scanado
- Permite monitoramento recorrente (Radar) sem custo adicional de busca
- Evita erros de negócios com nome similar

---

## Perguntas a responder antes do MS-G4

1. Quais campos exatamente são necessários para o score V1?
2. Qual é a política vigente de caching para cada campo?
3. Qual é a política vigente de atribuição visual?
4. Os preços atuais dos SKUs justificam incluir `rating` no V1?
5. Existe mudança recente nos termos de armazenamento?

---

*Revisar política oficial: https://developers.google.com/maps/documentation/places/web-service/policies*
*(verificar URL atual — não clicar automaticamente, confirmar com usuário)*
