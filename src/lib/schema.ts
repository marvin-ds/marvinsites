export function schemaLocalBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Marvin Sites',
    description: 'Sites e presença digital para pequenos negócios locais serem encontrados, transmitirem confiança e receberem contatos pelo WhatsApp.',
    url: 'https://marvinsites.com.br',
    telephone: '+55-13-00000-0000',
    email: 'contato@marvinsites.com.br',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santos',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    areaServed: 'Brasil',
    priceRange: 'R$697 - R$12.000',
    sameAs: [],
  };
}

export function schemaService(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'LocalBusiness', name: 'Marvin Sites' },
    areaServed: 'Brasil',
  };
}
