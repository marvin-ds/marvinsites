# Diagnostic Pages — Marvin Sites

## Funcao

Paginas de diagnostico individual sao entregas comerciais consultivas para leads qualificados. Elas mostram uma analise simples da presenca digital atual, reconhecem ativos existentes e apontam oportunidades sem prometer resultado, posicao no Google, pacientes, vendas ou faturamento.

Estas paginas pertencem ao site institucional da Marvin Sites. Nao fazem parte do portfolio demonstrativo em `exemplos/` e nao usam a stack dos sites de clientes.

## Arquitetura

Arquivos principais:

- `src/pages/diagnosticos/[slug].astro`
- `src/data/diagnostics/gilvan-salvadori-ferro.ts`
- `src/components/diagnostics/`
- `public/diagnosticos/[slug]/evidence/`

O layout e reutilizavel. O conteudo especifico do lead fica no arquivo de dados. Para criar novo diagnostico, o ideal e adicionar novo arquivo de dados e registrar o item exportado no mapa usado pela rota.

## Como criar um novo diagnostico

1. Criar uma branch propria.
2. Duplicar o modelo de dados do diagnostico existente.
3. Alterar `slug`, dados do lead, achados, recomendacoes e CTA.
4. Selecionar poucas evidencias relevantes.
5. Criar recortes legiveis em mobile e preservar originais para lightbox.
6. Garantir que a pagina use `noindex,nofollow,noarchive`.
7. Confirmar que o novo diagnostico nao entra no sitemap nem em menus.
8. Rodar `npm run lint`, `npm run build` e os testes aplicaveis.
9. Validar visualmente em mobile antes de enviar o link.

## Privacidade

Paginas individuais devem permanecer fora de indexacao publica:

- meta robots `noindex,nofollow,noarchive`;
- sem listagem publica de diagnosticos;
- sem link em menu;
- `/diagnosticos/` bloqueado no `robots.txt`;
- sem envio de nome do lead para analytics ou dataLayer.

O preview social deve ser generico, com marca Marvin, sem expor o nome do lead.

## Assets

As capturas devem ficar em:

```text
public/diagnosticos/[slug]/evidence/
```

Use nomes sem espacos. Para cada evidencia, preferir:

- um recorte legivel para a pagina;
- uma copia original para ampliacao em lightbox.

Nao reduzir screenshot desktop inteiro ate o texto ficar ilegivel.

## QA

Antes de considerar pronto:

- verificar mobile em 360, 375, 390 e 412 px;
- verificar desktop em 768 e 1440 px;
- checar ausencia de rolagem horizontal;
- abrir todas as evidencias no lightbox;
- testar CTA de WhatsApp;
- checar `robots`;
- confirmar ausencia no sitemap;
- revisar texto contra promessas indevidas.

## Limites da V1

Esta V1 e estatica, sem CMS, sem login, sem banco de dados, sem automacao de criacao e sem scanner. A prioridade e validar o formato comercial manualmente antes de transformar em sistema maior.
