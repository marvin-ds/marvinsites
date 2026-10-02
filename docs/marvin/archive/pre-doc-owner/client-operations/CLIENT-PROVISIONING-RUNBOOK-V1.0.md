# Marvin Sites — Client Provisioning Runbook

**VERSÃO:** 1.0
**DATA-BASE:** 05/09/2026
**STATUS:** CANÔNICO OPERACIONAL
**GOVERNA:** criação técnica de um novo cliente até baseline.
**NÃO GOVERNA:** venda e contrato.

---

# 1. Pré-condições

Não provisionar sem:

- contrato/aceite;
- plano;
- pagamento conforme política;
- briefing mínimo;
- domínio identificado;
- responsável de aprovação.

# 2. Gerar ID

Formato:

`MS-CL-0001`

Registrar:

- nome;
- plan_code;
- setup;
- monthly.

# 3. Criar repo

Padrão:

`client-0001-slug`

Privado.

Não inserir secrets.

# 4. Criar projeto

Padrão:

`ms-0001-slug`

Na Team correta.

Cliente não vira Team Owner.

# 5. Starter

Clonar versão aprovada.

Registrar versão.

# 6. Configuração

Preencher:

- business;
- brand;
- services;
- reviews;
- locations;
- CTA;
- SEO;
- feature flags.

# 7. Branch

Criar branch de implantação.

# 8. Build

Rodar:

- install;
- build;
- testes;
- lint se configurado.

# 9. Preview

Gerar Deploy Preview.

Validar mobile e conteúdo.

# 10. Revisão Marvin

Conferir:

- telefone;
- WhatsApp;
- preço;
- endereço;
- claims;
- prova;
- SEO;
- form.

# 11. Revisão cliente

Registrar aprovação.

Não interpretar silêncio como aprovação.

# 12. DNS

Executar apenas após DNS Runbook.

# 13. Produção

- merge;
- deploy automático;
- sem deploy manual duplicado;
- smoke.

# 14. Go-live

Validar:

- 200;
- HTTPS;
- www;
- CTA;
- form;
- metadata;
- sitemap;
- robots;
- 404.

# 15. Baseline

Registrar:

```text
client_id
repo
commit
project_id
deploy_id
team
domain
plan
go_live_at
tracking
integrations
```

# 16. Handoff interno

Registrar:

- onde editar;
- como publicar;
- limites;
- contatos;
- exceções.

# 17. Critério de saída

Cliente só entra em cuidado mensal depois de baseline completo.
