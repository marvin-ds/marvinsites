# Marvin Sites — Limites dos Planos, Fair Use e Hospedagem Gerenciada

**VERSÃO:** 1.0
**DATA-BASE:** 05/09/2026
**STATUS:** CANÔNICO
**SUBSTITUI:** regras dispersas de limites existentes em documentos anteriores.
**GOVERNA:** limites de infraestrutura, trabalho humano, funcionalidades, fair use, excedentes, upgrade, isolamento e cláusula-base contratual de hospedagem gerenciada.
**NÃO GOVERNA:** preço público da home, fornecedor de hospedagem, código, fornecedor de pagamento, propriedade intelectual completa do contrato.
**PREVALÊNCIA:** prevalece sobre qualquer menção anterior conflitante a “ilimitado”, minutos, envelopes ou excedentes.
**NATUREZA:** documento vivo. Os envelopes são hipóteses operacionais e devem ser recalibrados com consumo real.

---

# 1. Objetivo

A Marvin utiliza infraestrutura compartilhada para obter margem, escala e gestão centralizada. Isso cria uma obrigação: o contrato e a operação precisam impedir que um cliente consuma recursos de forma desproporcional e coloque outros projetos em risco.

A solução não é vender créditos, GB ou linguagem técnica ao pequeno empresário.

A solução é:

> **planos com capacidade compatível com um perfil normal de uso, limites claros e processo de upgrade antes de qualquer cobrança adicional.**

# 2. Três classes de limite

Todo plano possui três dimensões independentes.

## 2.1 Infraestrutura

Inclui tráfego, bandwidth, requests, compute, storage, arquivos pesados, processamento e integrações que consomem recurso.

## 2.2 Trabalho humano

Inclui pequenas alterações, suporte, revisão, prioridade, reuniões, análise e implementação manual.

## 2.3 Funcionalidades

Inclui páginas, landing pages, GA4, GTM, pixels, Clarity, quizzes, calculadoras, integrações, tracking e relatórios.

Um cliente pode estar dentro do limite de tráfego e fora do limite de trabalho humano. Ou o contrário.

# 3. Regra de comunicação

Não falar em créditos, GB como argumento principal, requests, compute ou saldo de Team.

Falar em:

> **Hospedagem gerenciada compatível com o uso normal do plano contratado.**

# 4. Escada vigente

| Plano | Setup | Mensalidade |
|---|---:|---:|
| Micro | R$399 | R$97 |
| Essencial | R$599 | R$197 |
| Profissional | R$1.497 | R$297 |
| Crescimento | R$2.997+ | R$497+ |

Os níveis são progressivos. Não precisam ser quatro ofertas públicas simultâneas.

# 5. Micro — R$97/mês

## Uso esperado

Site estático, presença local simples, baixo tráfego e poucos pedidos de alteração.

## Trabalho humano

> **até aproximadamente 20 minutos/mês de pequenas alterações, não acumulativos.**

Correções de defeitos de responsabilidade da Marvin não consomem essa franquia.

## Funcionalidades-base

Hospedagem gerenciada, SSL, domínio conectado, versionamento, WhatsApp, formulário simples, SEO técnico baseline e suporte básico.

## Não incluído por padrão

GA4, GTM, pixels, Clarity, relatório, landing page, nova página, quiz, automação, SEO contínuo ou campanha.

## Envelope interno

> **até ~5 GB/mês de bandwidth equivalente**, sem compute pesado.

Esse número é interno e não é uma promessa pública rígida.

# 6. Essencial — R$197/mês

## Trabalho humano

> **até aproximadamente 30 minutos/mês, não acumulativos.**

## Pode incluir

Tudo do Micro, maior acompanhamento, Search Console, GA4 básico quando fizer sentido, eventos essenciais conforme escopo, pequenas melhorias e suporte com prioridade maior.

## Envelope interno

> **até ~15 GB/mês de referência**, integrações leves, sem compute pesado.

# 7. Profissional — R$297/mês

## Trabalho humano

> **até aproximadamente 60 minutos/mês, não acumulativos.**

## Pode incluir

GA4, GTM quando necessário, tracking de WhatsApp, tracking de formulário, monitoramento ampliado, Clarity quando útil, revisão periódica de métricas e maior volume de páginas/conteúdo.

## Envelope interno

> **até ~30 GB/mês**, Functions leves quando justificadas.

# 8. Crescimento — R$497+/mês

## Trabalho humano

> **até aproximadamente 120 minutos/mês**, não acumulativos, conforme contrato.

## Pode incluir

Tracking avançado, Ads, pixels, UTMs, landing pages, novas páginas limitadas, A/B, quiz, calculadora, integrações, relatórios, otimizações e prioridade.

## Envelope interno

> **até ~75 GB/mês como referência**, com compute e integrações definidos em proposta.

Cliente de alto consumo pode exigir infraestrutura dedicada.

# 9. O que é pequena alteração

Exemplos: telefone, horário, texto curto, preço, foto, serviço, endereço, CTA e ajuste pontual.

Não é pequena alteração: redesign, nova seção complexa, nova página extensa, nova integração, nova automação, quiz, calculadora, refatoração grande ou migração.

# 10. Correção de responsabilidade Marvin

Não descontar dos minutos do cliente bug introduzido pela Marvin, link quebrado por deploy Marvin, regressão, formulário quebrado por alteração da Marvin ou erro de configuração sob responsabilidade da Marvin.

Isso é suporte/correção.

# 11. Política de fair use

## Até 100% do envelope
Uso normal.

## 100–120% em um ciclo
Analisar causa, otimizar, comunicar se necessário e não cobrar automaticamente.

## Acima de 120% por dois ciclos
Revisão comercial, upgrade, ajuste de infraestrutura ou eventual limitação de recurso não essencial.

## Pico extremo / >200% / ataque
Proteger serviço, mitigar, identificar origem, comunicar cliente, isolar se necessário e tratar custo extraordinário conforme contrato.

# 12. Picos pontuais

Pico não significa automaticamente upgrade.

Primeiro avaliar campanha, viralização, bot, ataque, erro técnico, asset pesado, publicação ou sazonalidade.

Se o pico for excepcional, otimizar e manter.

Se virar novo padrão, revisar plano.

# 13. Uso anormal

Exemplos:

- downloads pesados;
- vídeo hospedado diretamente em grande volume;
- automações de scraping;
- bots;
- ataques;
- processamento server-side fora do escopo;
- campanha de alto volume não informada;
- distribuição de arquivos;
- uso do site como storage.

A Marvin pode tomar medidas técnicas razoáveis para proteger a carteira.

# 14. Concentração de risco por cliente

Hipótese operacional:

- >15% do consumo da Team por dois ciclos → revisão;
- >25% em um ciclo → avaliar isolamento imediato.

Não é regra contratual pública. É gatilho interno.

# 15. Team compartilhada

Os projetos podem compartilhar recursos de uma infraestrutura administrada pela Marvin.

Isso torna necessário headroom, alertas, identificação de top consumidores, reserva, sharding e isolamento.

O cliente não precisa administrar isso.

# 16. Faixas internas da Team

- 50% → normal;
- 70% → atenção;
- 80% → decisão;
- 90% → ação obrigatória.

Nunca esperar o esgotamento como método de gestão.

# 17. Upgrade

Gatilhos possíveis:

- tráfego recorrente;
- mais páginas;
- mais alterações;
- tracking;
- campanhas;
- integrações;
- funcionalidades;
- prioridade;
- monitoramento;
- suporte;
- consumo.

O upgrade não é punição. É adequação da estrutura ao uso real.

# 18. Processo de upgrade

1. identificar uso;
2. verificar erro/otimização;
3. confirmar tendência;
4. informar cliente;
5. explicar impacto;
6. recomendar plano;
7. obter aceite;
8. alterar cobrança;
9. registrar decisão.

Não cobrar excedente silenciosamente.

# 19. Infraestrutura dedicada

Considerar quando projeto domina consumo, campanha gera picos, compute é relevante, SLA exige isolamento, risco é alto, MRR justifica ou segurança exige.

A infraestrutura dedicada pode ser cobrada separadamente.

# 20. Serviços à parte

Mesmo em plano mensal:

- landing page extra;
- página extensa;
- copy extensa;
- identidade;
- criativos;
- produção fotográfica;
- vídeo;
- automação complexa;
- integração complexa;
- e-commerce;
- sistema;
- portal;
- tráfego pago;
- SEO avançado;
- grande migração;
- redesign.

# 21. Mudança de escopo

Se o cliente usa repetidamente o plano mensal para solicitar trabalho equivalente a projeto novo, não acumular, não absorver, reclassificar e propor orçamento.

# 22. Comunicação recomendada

> **Seu plano inclui hospedagem gerenciada e cuidado compatíveis com o uso normal previsto para esse nível. Se o negócio crescer ou começar a exigir mais tráfego, páginas, integrações ou alterações, primeiro analisamos o que pode ser otimizado. Se a mudança for permanente, avisamos e recomendamos o plano adequado antes de qualquer alteração de cobrança.**

# 23. Cláusula contratual padrão — Hospedagem Gerenciada e Fair Use

> **HOSPEDAGEM GERENCIADA, CAPACIDADE E USO JUSTO.** A hospedagem e a infraestrutura técnica necessárias ao funcionamento do site estão incluídas enquanto vigente o plano de cuidado contínuo contratado, dentro do perfil normal de utilização previsto para esse plano. A CONTRATADA poderá operar os projetos em infraestrutura compartilhada e gerenciada, mantendo controles técnicos destinados à disponibilidade, segurança, desempenho e uso equilibrado dos recursos.
>
> O serviço não constitui hospedagem ilimitada. Tráfego, transferência de dados, requisições, processamento, armazenamento, integrações, arquivos pesados, automações e outras funcionalidades estão sujeitos ao perfil de uso e ao escopo do plano contratado.
>
> Picos ocasionais serão analisados antes de eventual reclassificação. Quando o consumo acima do perfil contratado se tornar recorrente, a CONTRATADA poderá recomendar otimizações, mudança de plano, contratação de capacidade adicional ou migração para infraestrutura isolada/dedicada.
>
> Não haverá cobrança automática de excedente ou alteração de mensalidade sem comunicação prévia ao CONTRATANTE e, quando aplicável, aceite da nova condição comercial.
>
> Em situações de uso anormal, ataque, tráfego automatizado, campanha de volume elevado, distribuição de arquivos, processamento não previsto ou evento capaz de comprometer a disponibilidade do projeto ou de outros serviços gerenciados, a CONTRATADA poderá adotar medidas técnicas razoáveis e proporcionais para mitigação e continuidade, comunicando o CONTRATANTE assim que possível.
>
> O CONTRATANTE deverá informar previamente campanhas, eventos ou mudanças previsíveis capazes de aumentar de forma relevante o tráfego ou o consumo técnico. Caso o novo nível de uso seja permanente, as partes ajustarão o plano e/ou a infraestrutura aplicável.
>
> Os parâmetros internos utilizados pela CONTRATADA para gestão de capacidade não constituem promessa de disponibilidade ilimitada nem transformam o plano em serviço de hospedagem avulsa.

# 24. Nota jurídica

A cláusula acima é **base operacional contratual**, não parecer jurídico.

Antes de adoção definitiva em contrato padrão, recomenda-se revisão jurídica brasileira considerando Código Civil, Código de Defesa do Consumidor quando aplicável, LGPD, regras de cancelamento, responsabilidade, indisponibilidade, propriedade e licenciamento.

# 25. Registro interno

Por cliente registrar:

- client_id;
- plan_code;
- envelope;
- consumo;
- minutos;
- exceções;
- upgrades;
- incidentes;
- avisos;
- aceite de mudança.

# 26. Revisão dos envelopes

Revisar após 3–5 clientes, 10 clientes, qualquer incidente relevante, mudança de preço do fornecedor, mudança de perfil de tráfego ou margem abaixo do esperado.

# 27. Diretriz final

> **Fair use existe para proteger cliente, Marvin e toda a carteira. Ele deve ser previsível, comunicado e proporcional — nunca uma surpresa de cobrança.**
