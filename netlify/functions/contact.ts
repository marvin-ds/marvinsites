import type { Handler } from '@netlify/functions';

function sanitize(str: string | undefined): string {
  return (str ?? '').replace(/[<>"'`]/g, '').trim().slice(0, 500);
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body: Record<string, string>;
  try {
    body = JSON.parse(event.body ?? '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ erro: 'Payload inválido' }) };
  }

  const nome      = sanitize(body.nome);
  const whatsapp  = sanitize(body.whatsapp).replace(/\D/g, '');
  const cidade    = sanitize(body.cidade);
  const segmento  = sanitize(body.segmento);

  if (!nome || whatsapp.length < 10) {
    return { statusCode: 400, body: JSON.stringify({ erro: 'Dados obrigatórios ausentes ou inválidos' }) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const emailDestino = process.env.NOTIFICATION_EMAIL;

  if (apiKey && emailDestino) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Marvin Sites <noreply@marvinsites.com.br>',
        to: [emailDestino],
        subject: `Novo lead: ${nome} — ${segmento}`,
        html: `
          <h2>Novo diagnóstico solicitado</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp}</p>
          <p><strong>Cidade:</strong> ${cidade}</p>
          <p><strong>Segmento:</strong> ${segmento}</p>
          <p><a href="https://wa.me/${whatsapp}">Abrir WhatsApp</a></p>
        `,
      }),
    });
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
