import { homeFaqs } from './faq';

const siteUrl = 'https://marvinsites.com.br';

export function schemaLocalBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: 'Marvin Sites',
    description: 'Presença digital local para pequenos negócios serem encontrados com mais clareza, transmitirem confiança e facilitarem o contato pelo WhatsApp.',
    url: siteUrl,
    email: 'contato@marvinsites.com.br',
    logo: `${siteUrl}/logo-mark.png`,
    image: `${siteUrl}/og-image.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santos',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    areaServed: [
      { '@type': 'City', name: 'Santos' },
      { '@type': 'City', name: 'Guarujá' },
      { '@type': 'City', name: 'Praia Grande' },
      { '@type': 'City', name: 'São Vicente' },
      { '@type': 'Country', name: 'Brasil' },
    ],
    priceRange: 'R$399+',
    sameAs: [],
  };
}

export function schemaService(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@id': `${siteUrl}/#localbusiness` },
    areaServed: [
      { '@type': 'City', name: 'Santos' },
      { '@type': 'City', name: 'Guarujá' },
      { '@type': 'City', name: 'Praia Grande' },
      { '@type': 'City', name: 'São Vicente' },
      { '@type': 'Country', name: 'Brasil' },
    ],
    serviceType: 'Presença digital local para pequenos negócios',
  };
}

export function schemaWebsite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Marvin Sites',
    url: siteUrl,
    publisher: { '@id': `${siteUrl}/#localbusiness` },
    inLanguage: 'pt-BR',
  };
}

export function schemaFaqPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteUrl}/#faq`,
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.pergunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.resposta,
      },
    })),
  };
}

export function schemaHome() {
  return [schemaLocalBusiness(), schemaWebsite(), schemaFaqPage()];
}
