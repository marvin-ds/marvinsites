declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

export function trackEvent(event: string, data?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(event, data);
  }
}

export const Events = {
  HERO_CTA:        'hero_cta_click',
  SERVICO_CARD:    'servico_card_click',
  FORM_SUBMIT:     'form_submit',
  WHATSAPP_CLICK:  'whatsapp_button_click',
  NICHO_VIEW:      'portfolio_nicho_view',
} as const;
