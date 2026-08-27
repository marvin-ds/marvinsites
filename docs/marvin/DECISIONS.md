# Marvin Sites — Registro de Decisões

**Atualizar sempre que uma decisão técnica ou estratégica relevante for tomada.**

> Decisões específicas da Marvin Local / SaaS: [../marvin-saas/DECISIONS.md](../marvin-saas/DECISIONS.md)

---

## D009 — 27/08/2026 — Gate 0.5: Arquitetura Marvin Local incorporada

**Decisão:** A Marvin Local / Micro-SaaS foi formalmente incorporada à arquitetura do projeto. O Supabase será compartilhado entre site, CRM e SaaS. `businesses` passa a ser a entidade estrutural central. O Raio-X Marvin é a futura porta principal de aquisição.

**Consequência:** G1 deve nascer com `businesses` como entidade central. A UX definitiva do diagnóstico manual (G4) não deve ser construída para ser substituída logo depois; G4 deve entregar "Lead Capture Foundation" sem dependência de UX específica. G12/G13 do site ficam em interlock com MS-G10 (Raio-X público).

**Referência:** docs/marvin-saas/DECISIONS.md D-MS001 a D-MS012.

---

## D010 — 27/08/2026 — G4 renomeado: Lead Capture Foundation

**Decisão:** O Gate 4 não deve construir uma UX específica de "formulário diagnóstico manual" que será substituída pelo Raio-X. O objetivo de G4 passa a ser:

"Lead Capture Foundation" — endpoint seguro, lead + business link, consent, persistência, /obrigado fallback e eventos compartilhados.

**A UX definitiva do Raio-X pertence aos MS-Gates.**

---

## D011 — 27/08/2026 — Cutover da home somente no MS-G10

**Decisão:** O CTA atual "Quero meu diagnóstico gratuito" e o fluxo de diagnóstico manual são LEGACY CURRENT e ficam em produção até o MS-G10 (Raio-X público). Não retirar prematuramente.

**Status:** o fluxo atual é intencionalmente mantido enquanto o Raio-X está em desenvolvimento.

---

## D008 — 27/08/2026 — Numeração canônica dos Gates técnicos

**Decisão:** TECH-SPEC.md + CURRENT.md são a referência canônica da numeração dos Gates de implementação.

**Contexto:** PLANO-MESTRE.md contém uma sequência estratégica anterior ("Gate 0 — Oferta e regras", "Gate 1 — Arquitetura da página"…) que serviu para estruturar o plano comercial. A TECH-SPEC.md define a sequência de implementação técnica, começando em Gate 0 = Inventário e baseline. As duas numerações coexistem nos documentos e são incompatíveis. Para execução técnica, vale exclusivamente a numeração da TECH-SPEC.md.

**Consequência:** Todo prompt de execução deve referenciar Gates pelo número da TECH-SPEC. O PLANO-MESTRE não deve ser alterado — é documento estratégico, não de implementação.

---

## D001 — 27/08/2026 — Supabase como fonte de verdade

**Decisão:** Supabase será a fonte de verdade para todos os dados comerciais (leads, atribuição, consentimentos, pagamentos, assinaturas).

**Motivação:** Independência de fornecedor; auditabilidade; integração com conversões offline do Google Ads.

**Consequência:** Nenhuma ferramenta de terceiros (Atomicat, provedor de e-mail) é a fonte primária de dados.

---

## D002 — 27/08/2026 — Atomicat para hospedagem e cobrança

**Decisão:** Atomicat será usada para hospedagem de sites de clientes, cobrança de implantação e recorrência.

**Motivação:** Ferramenta já escolhida pelo operador para gestão de sites de clientes.

**Pendência:** Validar tecnicamente capacidades de webhook, metadata, API e ambiente de teste no Gate 7.

---

## D003 — 27/08/2026 — CTA principal: diagnóstico gratuito

**Decisão:** CTA primário é "Quero meu diagnóstico gratuito". WhatsApp é rota secundária.

**Motivação:** Diagnóstico cria comprometimento, filtra leads e dá informação para a venda consultiva.

---

## D004 — 27/08/2026 — Casos como "exemplos de transformação"

**Decisão:** Os casos antes/depois não são apresentados como clientes reais — são "Exemplos de transformação de presença digital" com subtítulo "Cenários demonstrativos baseados em situações comuns de negócios locais."

**Motivação:** Transparência e conformidade com regulação de publicidade.

---

## D005 — 27/08/2026 — Preços como hipóteses comerciais

**Decisão:** Os quatro planos (Micro R$399+R$97/mês, Essencial R$197/mês, Profissional R$1.497+R$297/mês, Crescimento a partir de R$2.997+R$497/mês) são hipóteses sujeitas a revisão por CAC, margem e retenção.

---

## D006 — 27/08/2026 — Consent Mode v2 modo básico no lançamento

**Decisão:** Implementar Google Consent Mode v2 no modo básico com default denied para todas as categorias de anúncio/analytics.

**Motivação:** Conformidade LGPD, requisito Google Ads Enhanced Conversions.

---

## D007 — 27/08/2026 — PIX manual com atribuição preservada

**Decisão:** PIX pago fora da plataforma é confirmado manualmente no CRM Lite, que dispara purchase + conversion_queue usando a atribuição já registrada no Supabase.

**Motivação:** Não perder sinal de conversão por limitação de método de pagamento.
