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
6. Definir recomendacao, escopo, cuidado continuo e Google Business Care.
7. Definir plano, implantacao, mensalidade e condicao comercial, quando autorizada.
8. Configurar CTAs de WhatsApp.
9. Rodar build e testes aplicaveis.
10. Validar mobile e desktop.
11. Revisar privacidade, sitemap, noindex, WhatsApp e ausencia de promessas indevidas.
12. Gerar Preview para revisao comercial.

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
- nao ha promessa de pacientes, faturamento, ranking ou contatos;
- Fair Use esta claro sem limites tecnicos publicos;
- CTA nao e aceite contratual;
- `noindex,nofollow,noarchive` presente;
- proposta fora do sitemap;
- sem overflow em mobile;
- build e testes aplicaveis passando.
