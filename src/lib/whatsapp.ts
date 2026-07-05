interface WhatsAppParams {
  numero: string;
  mensagem: string;
  origem: string;
  nicho?: string;
}

export function gerarLinkWhatsApp({ numero, mensagem, origem, nicho }: WhatsAppParams): string {
  const texto = encodeURIComponent(mensagem);
  const utms  = new URLSearchParams({
    utm_source:   'site',
    utm_medium:   'whatsapp-button',
    utm_campaign: origem,
    utm_content:  nicho ?? 'geral',
  });
  return `https://wa.me/${numero}?text=${texto}&${utms}`;
}

export const WHATSAPP_NUMERO = import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '5513000000000';

export const LINKS = {
  hero: gerarLinkWhatsApp({
    numero:   WHATSAPP_NUMERO,
    mensagem: 'Olá! Quero ver como ficaria meu negócio com um site da Marvin Sites.',
    origem:   'hero',
  }),
  flutuante: gerarLinkWhatsApp({
    numero:   WHATSAPP_NUMERO,
    mensagem: 'Olá! Vim pelo site da Marvin Sites e gostaria de saber mais.',
    origem:   'botao-flutuante',
  }),
  cta_final: gerarLinkWhatsApp({
    numero:   WHATSAPP_NUMERO,
    mensagem: 'Olá! Quero solicitar um diagnóstico gratuito da minha presença digital.',
    origem:   'cta-final',
  }),
};
