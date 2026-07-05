# Variáveis de Ambiente — Netlify

Configure estas variáveis no painel do Netlify:
**Site settings → Environment variables → Add variable**

---

## Variáveis obrigatórias

| Variável | Exemplo | Para que serve |
|---|---|---|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxxxxxx` | Envio de email quando alguém preenche o formulário |
| `NOTIFICATION_EMAIL` | `marcos@marvinsites.com.br` | Email que recebe os leads do formulário |
| `PUBLIC_WHATSAPP_NUMBER` | `5513999999999` | Número com DDI+DDD, sem espaços ou traços |

## Variáveis opcionais

| Variável | Exemplo | Para que serve |
|---|---|---|
| `SITE_URL` | `https://marvinsites.com.br` | URL canônica do site |

---

## Como obter cada chave

### RESEND_API_KEY
1. Acesse [resend.com](https://resend.com) e crie uma conta gratuita
2. Vá em **API Keys → Create API Key**
3. Copie a chave gerada (começa com `re_`)
4. O plano gratuito permite até 3.000 emails/mês

### NOTIFICATION_EMAIL
- O email que você quer receber quando alguém solicitar diagnóstico
- Pode ser qualquer email seu — ex: `marcos.cislene@gmail.com`

### PUBLIC_WHATSAPP_NUMBER
- Formato: `55` (Brasil) + DDD + número
- Exemplo: `5513999999999` para (13) 99999-9999
- **Sem** espaços, traços ou parênteses

---

## Como testar localmente

Crie um arquivo `.env` na raiz do projeto (já está no `.gitignore`):

```
RESEND_API_KEY=re_sua_chave_aqui
NOTIFICATION_EMAIL=seu@email.com
PUBLIC_WHATSAPP_NUMBER=5513999999999
```

---

## Após configurar no Netlify

1. Vá em **Deploys → Trigger deploy** para o site recarregar com as novas variáveis
2. Preencha o formulário de diagnóstico no site para testar
3. Confirme que o email de notificação chegou
4. Confirme que o link de WhatsApp está correto
