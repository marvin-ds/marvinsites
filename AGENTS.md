# AGENTS.md — Regras para agentes de IA no repositório Marvin Sites

Este arquivo define regras e diretrizes que agentes de IA (Claude Code, Codex, etc.)
devem seguir ao trabalhar neste repositório.

Leia este arquivo na íntegra antes de executar qualquer tarefa.

---

## Documentação canônica

Toda decisão técnica, estratégica ou de design está documentada em `docs/marvin/`.
Antes de criar, editar ou deletar qualquer arquivo, verifique se existe documentação
relevante nessa pasta.

Documentos principais:
- `docs/marvin/TECH-SPEC.md` — especificação técnica geral
- `docs/marvin/DECISIONS.md` — decisões estratégicas registradas
- `docs/marvin/CURRENT.md` — status atual e próxima missão
- `docs/marvin/PORTFOLIO_MARVIN_SITES.md` — portfólio de nichos (ver seção abaixo)

---

## Princípios gerais

- Commits pequenos e reversíveis
- Nunca commitar direto em `main` ou `production`
- Sempre criar branch antes de qualquer mudança
- Build deve passar antes de qualquer merge
- Documentar decisões relevantes em `DECISIONS.md`
- Atualizar `CURRENT.md` ao iniciar e ao concluir cada Gate

---

## Portfólio de nichos (`exemplos/`)

Todo arquivo criado, editado ou revisado dentro do diretório `exemplos/` ou qualquer subdiretório dele (`exemplos/[slug]/`) **deve obrigatoriamente seguir** a documentação canônica localizada em:

```text
docs/marvin/PORTFOLIO_MARVIN_SITES.md
```

### Quando esta regra se aplica

Esta regra se aplica a qualquer tarefa que envolva:

- Criar um novo site demonstrativo de nicho
- Editar HTML, CSS ou JS de site existente no portfólio
- Criar ou editar a página de índice `exemplos/index.html`
- Adicionar imagens, ícones ou assets em `exemplos/`
- Alterar estrutura de URLs do portfólio
- Revisar copy ou textos de qualquer site do portfólio
- Criar novas seções em sites existentes
- Corrigir bugs em sites do portfólio

### O que verificar ANTES de executar qualquer tarefa no portfólio

Antes de criar ou editar qualquer arquivo em `exemplos/`, o agente deve:

1. **Ler** `docs/marvin/PORTFOLIO_MARVIN_SITES.md` na íntegra.
2. **Identificar** o nicho sendo trabalhado na tabela da seção 4.
3. **Confirmar** o slug de URL correto na tabela (ex: `psicologo`, não `psicolog`).
4. **Usar** a paleta de cores definida na seção 6.2 para o nicho em questão.
5. **Seguir** a estrutura de seções obrigatórias da seção 5.1.
6. **Incluir** o banner de aviso "demonstrativo Marvin Sites" em todos os sites.
7. **Aplicar** o sistema de design tokens da seção 6 (variáveis CSS).
8. **Buscar** imagens usando as queries da seção 7.3 antes de inserir qualquer imagem.
9. **Executar** os prompts na ordem definida na seção 9 (pesquisa → geração → validação).
10. **Aplicar** o checklist de qualidade completo da seção 10 antes de commitar.

### Regras inegociáveis (nunca violar)

- **NUNCA** usar Bootstrap, Tailwind ou qualquer framework CSS nos sites de portfólio.
- **NUNCA** usar React, Vue, Angular ou qualquer framework JS.
- **NUNCA** omitir o meta tag `noindex, nofollow` nos sites de nicho individuais.
- **NUNCA** usar uma paleta de cores que não seja a especificada para aquele nicho (seção 6.2).
- **NUNCA** criar um site de nicho sem o banner de aviso "demonstrativo Marvin Sites".
- **NUNCA** usar o mesmo slug com erro de digitação — consultar a tabela da seção 4 antes de criar diretórios.
- **NUNCA** colocar o botão WhatsApp apontando para número fictício — usar sempre o número da Marvin Sites.
- **NUNCA** apresentar depoimentos fictícios como depoimentos reais.
- **NUNCA** usar nome, endereço ou telefone de negócio real existente nos sites demonstrativos.
- **NUNCA** usar identidade visual igual entre dois nichos diferentes — cada nicho tem paleta e tipografia próprias.

### Stack obrigatória para sites de portfólio

```text
HTML5 + CSS3 + JavaScript vanilla
Tudo em um único index.html por nicho
Fontes: Google Fonts (CDN)
Ícones: Lucide Icons (CDN via cdnjs.cloudflare.com)
Imagens: Unsplash CDN (URLs diretas com parâmetros de otimização)
```

### Estrutura de arquivos por nicho

```text
exemplos/
└── [slug-do-nicho]/
    ├── index.html      ← obrigatório (único arquivo de código)
    ├── og-image.jpg    ← obrigatório (1200×630px)
    └── favicon.ico     ← obrigatório
```

### Sequência de trabalho obrigatória ao criar um novo site

```text
1. Ler docs/marvin/PORTFOLIO_MARVIN_SITES.md (seções 4, 5, 6, 7, 8, 9)
2. Executar prompt de pesquisa de referências (seção 9.1)
3. Buscar e validar URLs de imagens Unsplash (seção 9.5 + tabela 7.3)
4. Executar prompt de geração (seção 9.2) com todos os parâmetros preenchidos
5. Executar prompt de validação (seção 9.3)
6. Aplicar checklist completo (seção 10) — todos os 32 itens
7. Testar em mobile (iOS Safari + Android Chrome)
8. Commitar apenas após checklist 100% aprovado
```

### Padrão de commit para sites de portfólio

```text
feat(portfolio): adiciona site demonstrativo — [nicho]

- Cria exemplos/[slug]/index.html com estrutura completa
- Paleta: [cor primary] + [cor accent]
- Empresa fictícia: [nome], [cidade]
- Fontes: [heading font] + [body font]
- Checklist seção 10: aprovado

Refs: docs/marvin/PORTFOLIO_MARVIN_SITES.md — Nicho #[número]
```

### Padrão de commit para edições em sites existentes

```text
fix(portfolio): [descrição da correção] — [nicho]

[Descrição do que foi corrigido e por quê]

Checklist afetado: [itens do checklist revisados]
Refs: docs/marvin/PORTFOLIO_MARVIN_SITES.md
```

### O que fazer se surgir dúvida durante a execução

Se houver ambiguidade sobre qualquer aspecto técnico, visual ou de conteúdo de um site de portfólio, a ordem de consulta é:

1. `docs/marvin/PORTFOLIO_MARVIN_SITES.md` — documento canônico (fonte primária)
2. `docs/marvin/DECISIONS.md` — decisões estratégicas registradas
3. Documentos no `system prompt` do projeto Marvin Sites (via Project Knowledge)
4. Perguntar ao usuário antes de prosseguir (nunca adivinhar)

Nunca tomar decisão de design, copy ou estrutura por conta própria sem base na documentação. Em caso de divergência entre documentos, o `PORTFOLIO_MARVIN_SITES.md` tem precedência para tudo relacionado ao portfólio.

### Atualizações ao documento de portfólio

Se durante a execução de uma tarefa for identificada necessidade de atualizar o documento canônico (ex: novo nicho, correção de especificação, novo design token), o agente deve:

1. **Não** modificar o `PORTFOLIO_MARVIN_SITES.md` por conta própria.
2. **Registrar** a necessidade de atualização em um comentário no PR ou na mensagem de commit.
3. **Aguardar** aprovação do responsável para atualizar o documento.

Exceção: correção de erros óbvios de digitação ou links quebrados no documento podem ser corrigidos diretamente, com commit separado identificando a natureza da correção.
