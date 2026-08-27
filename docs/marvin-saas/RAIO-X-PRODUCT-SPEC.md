# Raio-X Marvin — Product Spec V1

**Status:** DRAFT — Gate 0.5  
**MS-Gate:** MS-G0 pending (pontuação individual e thresholds ainda a fechar)  
**Última atualização:** 27/08/2026

---

## Propósito

Raio-X Marvin é a principal porta gratuita de aquisição da Marvin Sites.

**Promessa:**

> Veja como sua empresa aparece para quem pesquisa.

**Não é:**
- Auditoria SEO
- Rank tracker
- CRM
- Analisador de anúncios
- Ferramenta de social media

---

## Fluxo V1

```
1. IDENTIFICAÇÃO
   Usuário informa: nome, empresa, cidade, WhatsApp, site (quando tiver)

2. BUSCA / LOCALIZAÇÃO
   Sistema busca o negócio no Google Places

3. CONFIRMAÇÃO
   "Encontramos esta empresa. É ela?"
   (reduz erro com empresas de nome similar)

4. CAPTURA / ASSOCIAÇÃO
   Contato vinculado ao negócio (business_id)

5. SCAN AUTOMÁTICO
   Backend executa verificações (site + Google)

6. SCORE
   Motor calcula Nota Marvin (ver SCORING-SPEC.md)

7. RESULTADO
   Sua Presença Local: XX/100

8. TOP 3 PRIORIDADES
   Os três pontos que merecem mais atenção agora

9. CTA DIAGNÓSTICO HUMANO
   "Quero uma análise mais completa da Marvin"

10. CTA RADAR
    "Quero acompanhar minha presença continuamente"
    (pode estar como coming soon até Radar existir)
```

---

## Entrada prevista

| Campo | Obrigatório? | Observação |
|---|---|---|
| Nome | sim | do responsável |
| Empresa | sim | nome do negócio |
| Cidade | sim | para localização |
| WhatsApp | sim | canal de contato |
| Site/URL | não | quando tiver |

> A ordem exata da captura ainda poderá ser testada no futuro.
> Não travar implementação visual neste Gate.
>
> Hipóteses a testar após V1:
> - Versão A: captura completa antes do Raio-X
> - Versão B: empresa + cidade → resultado parcial → captura para liberar completo
> - Versão C: captura só após resultado parcial

---

## Resultado — estrutura

```
Sua Presença Local: 64/100

[5 áreas com pontuação]

3 prioridades agora:
1. Não encontramos link de WhatsApp na página principal.
2. O site não possui descrição clara dos serviços principais.
3. Não identificamos avaliações Google vinculadas ao negócio.

[CTA diagnóstico humano]
[CTA Radar]
```

**Linguagem dos problemas:**
- Não dizer: "Seu texto é ruim."
- Dizer: "Não encontramos uma descrição clara dos principais serviços na página analisada."

---

## Escopo V1 — IN SCOPE

### Site / HTML
- URL existente
- Resposta HTTP
- HTTPS
- Título da página
- Meta description
- H1
- Viewport mobile
- Sinais de serviços
- Sinais de localização/região
- Telefone e link tel:
- WhatsApp e link wa.me
- CTA de contato
- Formulário/link de contato
- Redirects básicos

### Google Places
- Busca do negócio
- Confirmação pelo usuário
- place_id
- Categoria (quando disponível)
- Telefone (quando disponível)
- Endereço/região (quando disponível)
- Horários (quando disponíveis)
- Website (quando disponível)
- Avaliação/quantidade (quando FieldMask/custo permitir)

### Técnico
- Status HTTP
- TLS/HTTPS
- Redirects
- Viewport
- Disponibilidade básica

---

## Escopo V1 — OUT OF SCOPE

- Rank tracking de palavras-chave
- Posições do Maps / geogrid
- Concorrentes
- Google OAuth / Business Profile API avançada
- Instagram profundo
- Redes sociais fechadas
- Crawling de centenas de páginas
- Análise de anúncios
- CRM completo novo
- IA generativa para score
- Resposta automática de avaliações
- WhatsApp Business API
- PageSpeed bloqueando resultado (pode ser background/assíncrono)
- Aplicativo mobile

---

## Prevenção de abuso

O Raio-X gratuito não pode virar API pública para terceiros.

Aplicar:
- Rate limit por IP
- Rate limit por sessão
- Limite de scans por telefone
- Cache de resultados onde política permitir
- Honeypot
- Fila / throttle
- Quotas internas
- Turnstile somente se houver abuso real confirmado

Não colocar CAPTCHA pesado no lançamento se não houver problema real.

---

## Tracking associado

Ver [TRACKING-SPEC.md](TRACKING-SPEC.md) — seção Raio-X Events.

Eventos V1:
```
raiox_view
raiox_start
business_search
business_selected
raiox_submit
scan_started
scan_completed
scan_failed
result_view
human_diagnostic_click
human_diagnostic_request
radar_cta_click
```

---

## Modelo de dados associado

Ver [DATA-MODEL.md](DATA-MODEL.md) — entidades: `businesses`, `business_sources`, `scan_runs`, `scan_checks`, `score_snapshots`, `issues`, `recommendations`.

---

## Dependências técnicas

| Dependência | MS-Gate | Status |
|---|---|---|
| Score Engine | MS-G5 | NOT STARTED |
| Scanner V0 (site) | MS-G3 | NOT STARTED |
| Google Places | MS-G4 | NOT STARTED |
| Interface Raio-X | MS-G7 | NOT STARTED |
| Tracking + integração Marvin | MS-G8 | NOT STARTED |
| Validação humana (20–30 negócios) | MS-G6 | NOT STARTED |
| Beta fechado (50 scans) | MS-G9 | NOT STARTED |
| Integração na home | MS-G10 | NOT STARTED |

---

## Critério de aceite antes de público

- Score não publicar resultado que não conseguimos defender
- Validação humana: 20–30 negócios reais comparados com avaliação manual
- Nenhum falso positivo grave (empresa existente recebendo nota 0 por erro do sistema)
- Rate limit funcionando
- Dados Google respeitando política

---

*Referência: [SCORING-SPEC.md](SCORING-SPEC.md) | [GOOGLE-DATA-SPEC.md](GOOGLE-DATA-SPEC.md) | [API-SPEC.md](API-SPEC.md)*
