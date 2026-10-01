# Proposal Pages — Marvin Sites

## Objetivo

Paginas de proposta sao ativos comerciais reutilizaveis para leads qualificados. Elas continuam a experiencia do diagnostico individual:

- Diagnostico: o que encontramos.
- Proposta: o que recomendamos fazer, como cuidaremos e quanto custa.

A V1 e estatica, simples, mobile first e data-driven. Nao e SaaS, dashboard, CMS, banco de dados, gerador automatico, contrato, checkout ou sistema multi-tenant.

## Arquitetura

Arquivos principais:

- `src/pages/propostas/[slug].astro`
- `src/data/proposals/*.ts`
- `src/data/proposals/types.ts`
- `src/components/proposals/`

O layout e reutilizavel. O conteudo especifico do lead fica no arquivo de dados. A rota usa `import.meta.glob`, entao uma nova proposta deve exigir principalmente um novo arquivo em `src/data/proposals/`.

## Privacidade

Propostas possuem informacoes comerciais individualizadas.

Obrigatorio:

- `robots: "noindex,nofollow,noarchive"` no arquivo de dados.
- Nao adicionar propostas ao sitemap.
- Nao criar indice publico de propostas.
- Nao colocar links em menu, portfolio ou busca publica.
- Usar slug nao trivial com short-id.
- Open Graph generico da Marvin, sem nome do cliente e sem preco.

`public/robots.txt` bloqueia `/propostas/`, mas o meta robots da pagina continua sendo a protecao principal.

## Como criar nova proposta

1. Criar branch propria.
2. Criar um novo arquivo em `src/data/proposals/`.
3. Definir `slug` com nome legivel e short-id.
4. Informar lead, segmento e cidade.
5. Inserir contexto herdado do diagnostico.
6. Definir recomendacao e explicar por que aquele escopo e suficiente para o caso.
7. Materializar o que entra: estrutura inicial, papel do cliente, cuidado continuo e limites.
8. Definir plano, implantacao, mensalidade e condicao comercial, quando autorizada.
9. Configurar CTAs de WhatsApp.
10. Rodar build e testes aplicaveis.
11. Validar mobile e desktop.
12. Revisar privacidade, sitemap, noindex, WhatsApp e ausencia de promessas indevidas.
13. Gerar Preview para revisao comercial.

## Regra de decisao

Uma proposta Marvin nao deve apenas mostrar tudo o que podemos fazer.

Ela deve deixar claro por que aquele escopo especifico e suficiente para aquele caso.

Quanto mais facil fica construir paginas com tecnologia, mais importante fica demonstrar o valor que existe antes e depois da construcao: diagnostico, decisao, organizacao, integracao e responsabilidade continua.

Nunca justificar o preco pelo esforco de construir paginas. Justificar pelo conjunto de diagnostico, organizacao, execucao, integracao e cuidado continuo da presenca digital.

A construcao tecnica e parte da entrega, mas nao deve ser o principal argumento de valor.

Toda proposta deve responder, antes do preco:

- por que esta estrutura;
- o que entra;
- por que este plano;
- o que o cliente precisa fornecer;
- o que a Marvin assume;
- o que a mensalidade mantem sob responsabilidade da Marvin;
- o que nao esta incluido;
- como risco e reduzido antes de publicar.

## Precos e condicoes

Nao alterar preco canonico global dentro da proposta.

Para Presenca Local Profissional, a referencia vigente e:

- implantacao: R$ 1.497;
- cuidado continuo: R$ 297/mes.

Condicoes especificas devem ficar no arquivo de dados da proposta, em `commercialCondition`, sem badge promocional, urgencia artificial ou comparacao de planos.

## Google Business Care

`googleBusinessCare.enabled` controla se os blocos de Google aparecem.

Quando ativo, a copy deve falar de organizacao, acompanhamento, pequenas atualizacoes e consistencia entre Google, presenca propria e WhatsApp.

Nao prometer ranking, topo do Google, quantidade de contatos, gestao diaria, Google Ads, respostas ilimitadas a avaliacoes, producao de fotos ou alteracoes que dependam de aprovacao do Google.

Quando houver cuidado com Google, delimitar de forma visivel:

- informacoes principais;
- pequenos ajustes previstos no plano;
- conexao correta com a presenca publicada;
- itens que exigem avaliacao separada, como campanhas, respostas em escala, postagens recorrentes, producao de fotos, SEO avancado ou monitoramento de ranking.

## Validacao por personas

O Banco de Personas e lente de revisao, nao fonte de fatos sobre o lead.

Use personas para revisar linguagem, clareza, risco percebido, objecoes silenciosas e proporcionalidade do escopo. Nunca use personas para afirmar capacidade financeira, prioridade, comportamento de compra, dores presumidas, urgencia ou fatos individuais.

Persona tambem nao governa preco, Fair Use, limites ou contrato.

### Gate Persona

Antes de liberar proposta, revisar:

- [ ] fala com contexto real;
- [ ] nao presume faturamento;
- [ ] nao presume capacidade financeira;
- [ ] nao presume dor;
- [ ] traduz tecnologia em beneficio;
- [ ] reconhece o que ja funciona;
- [ ] preserva ENCONTRAR -> ENTENDER -> CONFIAR -> CHAMAR;
- [ ] nao desqualifica Google;
- [ ] nao desqualifica Instagram;
- [ ] nao desqualifica indicacao;
- [ ] nao promete ranking;
- [ ] nao promete leads;
- [ ] nao promete vendas;
- [ ] nao promete faturamento;
- [ ] mostra o que entra;
- [ ] mostra o que nao entra;
- [ ] explica a recorrencia;
- [ ] explica o trabalho do cliente;
- [ ] protege margem;
- [ ] proximo passo proporcional.

### Gate de percepcao de valor

Antes de liberar proposta, revisar:

- [ ] parece que estamos vendendo apenas um site?
- [ ] o cliente entende que o trabalho comeca antes da construcao?
- [ ] o cliente entende que Google, WhatsApp e avaliacoes fazem parte da presenca?
- [ ] o cliente entende que a implantacao inclui decisao e organizacao?
- [ ] o cliente entende que a mensalidade representa responsabilidade continua?
- [ ] a tecnologia esta invisivel?
- [ ] o preco esta sendo justificado pelo valor, nao por complexidade tecnica?
- [ ] a proposta evita atacar IA, templates ou concorrentes?
- [ ] a proposta parece especifica para o caso?
- [ ] a proposta explica por que aquele plano e adequado?

## Tracking

Eventos permitidos:

- `proposal_view`
- `proposal_primary_cta_click`
- `proposal_secondary_cta_click`

Nao enviar nome, telefone, e-mail, preco individual, slug do lead ou qualquer PII ao `dataLayer`.

## Contrato futuro

A V1 termina no WhatsApp:

```text
proposal -> manifestacao de interesse -> contrato -> assinatura -> pagamento -> briefing
```

Nao criar checkbox de aceite, assinatura eletronica, checkout ou contrato dentro da pagina de proposta sem nova aprovacao.

## QA

Antes de considerar pronto:

- proposta parece continuacao visual do diagnostico;
- proposta e mais consultiva e refinada que o diagnostico;
- Presenca Digital Local e protagonista;
- Google aparece na implantacao e no cuidado continuo;
- mensalidade e compreendida antes do preco;
- investimento aparece depois de recomendacao, escopo, processo, cuidado continuo, Google e Fair Use;
- proposta explica por que o escopo e suficiente para o caso;
- proposta materializa o que sera publicado sem prometer quantidade rigida de paginas;
- proposta explica propriedade de dominio e cancelamento sem inventar regra contratual;
- nao ha promessa de pacientes, faturamento, ranking ou contatos;
- Fair Use esta claro sem limites tecnicos publicos;
- pesquisas de mercado e concorrentes nao aparecem na copy;
- personas nao aparecem na copy como fatos sobre o lead;
- CTA nao e aceite contratual;
- `noindex,nofollow,noarchive` presente;
- proposta fora do sitemap;
- sem overflow em mobile;
- build e testes aplicaveis passando.
