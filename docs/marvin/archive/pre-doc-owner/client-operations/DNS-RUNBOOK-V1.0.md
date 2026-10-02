# Marvin Sites — DNS Runbook

**VERSÃO:** 1.0
**DATA-BASE:** 05/09/2026
**STATUS:** CANÔNICO OPERACIONAL
**GOVERNA:** auditoria, mudança e rollback DNS de clientes.

---

# 1. Regra absoluta

> **Nunca alterar DNS antes de saber se o domínio também hospeda e-mail ou outros serviços.**

# 2. Inventário

Capturar:

- registrador;
- nameservers;
- A;
- AAAA;
- CNAME;
- MX;
- TXT;
- SPF;
- DKIM;
- DMARC;
- verificações;
- subdomínios.

# 3. Evidência

Salvar snapshot legível antes da mudança.

# 4. E-mail

Confirmar:

- Google Workspace?;
- Microsoft 365?;
- provedor?;
- aliases?;
- DKIM?;
- MX?

# 5. Mudança mínima

Preferir alterar somente registros necessários para o site.

Não trocar nameserver sem necessidade.

# 6. TTL

Avaliar TTL antes.

# 7. Netlify

Usar valores oficiais do projeto alvo.

Não copiar de outro cliente.

# 8. SSL

Após propagação:

- certificado;
- HTTPS;
- redirect.

# 9. www

Decidir canonical:

- apex;
- www.

Configurar redirect.

# 10. Smoke

- domínio;
- www;
- HTTPS;
- e-mail não afetado;
- form;
- links.

# 11. Rollback

Se falhar:

- restaurar registros;
- confirmar DNS;
- confirmar e-mail;
- registrar incidente.

# 12. Proibições

- apagar MX por engano;
- sobrescrever TXT desconhecido;
- assumir SPF único;
- remover DKIM;
- trocar nameserver sem plano;
- fazer mudança sem acesso de rollback.

# 13. Registro

Guardar:

- antes;
- depois;
- data;
- operador;
- TTL;
- resultado.

# 14. Critério de saída

Site e e-mail funcionando; inventário atualizado.
