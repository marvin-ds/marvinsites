# Marvin Local — Scoring Spec

**Status:** DRAFT — MS-G0 PENDING  
**Versão do score:** v0.1-draft (NÃO congelada)  
**Última atualização:** 27/08/2026

> Este documento ainda NÃO está aprovado para implementação.
> MS-G0 deverá fechar: pontos individuais, thresholds, severidades, regra de partial,
> regra de ausência de site, prioridade, mensagens, exemplos e versionamento.

---

## Princípios

1. O score é **determinístico**: mesmos dados → mesma nota, sempre.
2. O score é **explicável**: cada ponto tem origem em um check específico.
3. O score é **versionado**: todo resultado carrega `score_version`, `scanner_version`, `check_version`, `timestamp`.
4. O score é **reproduzível**: dado o mesmo input, dois sistemas independentes chegam ao mesmo resultado.

**IA NÃO decide score.**  
**IA NÃO decide top 3.**  
**IA NÃO inventa checks.**

---

## Pesos por área (APROVADOS)

| Área | Pontos |
|---|---:|
| Presença e informações locais | 25 |
| Site e clareza | 25 |
| Contato e WhatsApp | 20 |
| Confiança e reputação | 15 |
| Saúde técnica | 15 |
| **Total** | **100** |

---

## Checks candidatos (DRAFT — pontuação individual: OPEN DECISION)

### Área 1 — Presença e informações locais (25 pts)

| Check | Código | Pontos | Status |
|---|---|---|---|
| Negócio encontrado no Google | `business_found_google` | OPEN | DRAFT |
| Categoria presente | `category_present` | OPEN | DRAFT |
| Endereço ou área de atendimento presente | `address_or_service_area_present` | OPEN | DRAFT |
| Telefone presente no Google | `phone_present_google` | OPEN | DRAFT |
| Horários de funcionamento presentes | `hours_present` | OPEN | DRAFT |
| Website vinculado ao perfil | `website_present_google` | OPEN | DRAFT |

### Área 2 — Site e clareza (25 pts)

| Check | Código | Pontos | Status |
|---|---|---|---|
| Site existe e responde | `website_declared` | OPEN | DRAFT |
| Título presente | `title_present` | OPEN | DRAFT |
| Meta description presente | `meta_description_present` | OPEN | DRAFT |
| H1 presente | `h1_present` | OPEN | DRAFT |
| Sinal de serviços na página | `services_signal_present` | OPEN | DRAFT |
| Sinal de localização/região | `location_signal_present` | OPEN | DRAFT |
| Sinal de descrição do negócio | `business_description_signal_present` | OPEN | DRAFT |

### Área 3 — Contato e WhatsApp (20 pts)

| Check | Código | Pontos | Status |
|---|---|---|---|
| Telefone visível | `phone_visible_site` | OPEN | DRAFT |
| Link tel: clicável | `tel_link_present` | OPEN | DRAFT |
| Link WhatsApp presente | `whatsapp_link_present` | OPEN | DRAFT |
| Formulário ou link de contato | `contact_form_or_link_present` | OPEN | DRAFT |
| CTA de contato presente | `contact_cta_present` | OPEN | DRAFT |

### Área 4 — Confiança e reputação (15 pts)

| Check | Código | Pontos | Status |
|---|---|---|---|
| Avaliação Google disponível | `google_rating_available` | OPEN | DRAFT |
| Nota Google acima do threshold | `google_rating_threshold` | OPEN | DRAFT |
| Quantidade de avaliações acima do threshold | `review_count_threshold` | OPEN | DRAFT |
| Sinal de depoimentos no site | `testimonials_signal_site` | OPEN | DRAFT |
| Sinal de autoridade / sobre / equipe | `authority_about_team_signal` | OPEN | DRAFT |

### Área 5 — Saúde técnica (15 pts)

| Check | Código | Pontos | Status |
|---|---|---|---|
| HTTPS habilitado | `https_enabled` | OPEN | DRAFT |
| TLS válido | `tls_valid` | OPEN | DRAFT |
| HTTP 200 (sucesso) | `http_success` | OPEN | DRAFT |
| Viewport mobile presente | `mobile_viewport_present` | OPEN | DRAFT |
| Redirect chain aceitável | `redirect_chain_acceptable` | OPEN | DRAFT |

---

## Estados possíveis de cada check

| Estado | Significado |
|---|---|
| `pass` | Check passou, pontos concedidos |
| `fail` | Check falhou, pontos não concedidos |
| `unavailable` | Dado não disponível (sem site declarado, sem Place ID etc.) |

**Importante:** ERRO DA MARVIN / API indisponível NÃO pode virar penalidade do cliente.

Se dados necessários não puderem ser obtidos por erro do sistema, o scan deve ser `partial` ou `failed/retry`, nunca fabricar score como se o negócio tivesse falhado.

---

## Regras abertas — MS-G0 deve fechar

| Item | Status |
|---|---|
| Pontos individuais de cada check | OPEN DECISION |
| Thresholds de nota Google | OPEN DECISION |
| Thresholds de quantidade de avaliações | OPEN DECISION |
| Regra exata de partial scan | OPEN DECISION |
| Regra para negócio sem site | OPEN DECISION |
| Checks "não aplicáveis" (ex: sem Google Place) | OPEN DECISION |
| Fórmula exata de top 3 prioridades | OPEN DECISION |
| Mensagens ao usuário por problema | OPEN DECISION |
| Exemplos de resultados reais | OPEN DECISION |

---

## Top 3 Prioridades — Princípio (implementação: MS-G5)

**NÃO vem de IA.**

```
checks falhos
+ peso do problema
+ gravidade
+ impacto sobre: encontrar / entender / confiar / chamar
= lista determinística
```

Exemplos conceituais:
1. Não há site.
2. Não encontramos caminho claro para WhatsApp.
3. O perfil localizado não apresenta site associado.

---

## Versionamento obrigatório

Todo scan deve registrar:

```
score_version
scanner_version
check_version
timestamp
```

Se mudarmos a fórmula daqui a seis meses, precisamos saber por que a nota mudou.

---

## Validação humana antes do público (MS-G6)

- Selecionar 20–30 negócios reais
- Executar Raio-X automático
- Fazer avaliação humana independente
- Comparar: "Esse resultado faz sentido?"
- Corrigir falsos positivos e falsos negativos
- Não lançar publicamente uma nota que não conseguimos defender
