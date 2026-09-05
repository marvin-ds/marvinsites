# Marvin Sites — Integração Atomicat

> **STATUS:** HISTORICAL / REFERENCE ONLY.
> Atomicat is not standard client hosting after DOC-SYNC V2.
> Payment provider remains OPEN and requires a future formal decision.

**Versão:** 1.0 | **Data-base:** 27/08/2026

---

## Papel da Atomicat

Ferramenta de hospedagem e cobrança dos sites dos clientes. Não é o centro da marca.

Usada para:
- hospedagem dos sites de clientes;
- cobrança da implantação;
- cobrança recorrente;
- links de pagamento;
- recursos de atribuição/tagueamento disponíveis.

---

## Checkout com atribuição

Nunca enviar checkout genérico quando já conhecemos o lead.

Criar:

```text
https://marvinsites.com.br/go/checkout/{token}
```

Fluxo:

1. criar `checkout_session`;
2. ligar a `lead_id` + `deal_id`;
3. enviar link pelo WhatsApp;
4. endpoint Marvin registra clique;
5. redireciona para Atomicat;
6. anexar referência/metadata/tag suportada;
7. pagamento volta por webhook/API ou reconciliação.

---

## Validação técnica (Gate 7)

No Gate específico, confirmar:

- webhook de pagamento aprovado;
- assinatura criada;
- renovação;
- falha;
- cancelamento;
- reembolso;
- assinatura/HMAC;
- `external_reference` ou metadata;
- parâmetros no checkout;
- API de consulta;
- ambiente de teste.

---

## Webhook

Se houver webhook:

```text
POST /api/webhooks/atomicat
```

Requisitos:
- verificar assinatura;
- idempotência;
- atualizar payment/subscription;
- lifecycle event;
- fila de conversão.

Fallback:
- reconciliação manual documentada.

---

## PIX sem link

Não precisamos de cookie/tag dentro do PIX se o lead já estiver no Supabase.

Fluxo:

1. lead existe;
2. atribuição existe;
3. deal existe;
4. cliente paga PIX direto;
5. operador confirma;
6. registrar `pix_manual`;
7. disparar `purchase`;
8. criar `conversion_queue`;
9. Google Ads recebe conversão offline com a atribuição original.

Painel:

> **Marcar PIX como pago**

Campos:
- valor;
- data/hora;
- referência opcional;
- observação.

---

## Pontos de verificação técnica pendentes (Gate 0/7)

1. stack e framework exatos;
2. deploy atual;
3. webhook/API/metadata Atomicat;
4. ambiente de teste Atomicat;
5. automação de e-mail Atomicat;
6. auth do CRM interno;
7. contas GA4/GTM/Search Console já existentes;
8. domínio/DNS atual.
