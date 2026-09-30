export type DiagnosticStatus = 'strong' | 'good' | 'opportunity' | 'attention';

export interface DiagnosticEvidence {
  id: string;
  image: string;
  fullImage: string;
  alt: string;
  title: string;
  caption: string;
}

export interface DiagnosticJourneyItem {
  key: 'encontrar' | 'entender' | 'confiar' | 'chamar';
  label: string;
  status: DiagnosticStatus;
  headline: string;
  summary: string;
  opportunity?: string;
}

export interface DiagnosticPage {
  slug: string;
  lead: {
    name: string;
    segment: string;
    city: string;
  };
  meta: {
    title: string;
    description: string;
    robots: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    identity: string;
    microcopy: string;
  };
  summary: {
    title: string;
    body: string[];
  };
  journey: DiagnosticJourneyItem[];
  strengths: string[];
  discoveryPaths: {
    known: {
      label: string;
      steps: string[];
      conclusion: string;
    };
    unknown: {
      label: string;
      steps: string[];
      conclusion: string;
    };
  };
  findings: {
    title: string;
    body: string[];
    evidenceIds: string[];
  }[];
  searchFinding: {
    title: string;
    body: string[];
    disclaimer: string;
  };
  opportunity: {
    title: string;
    body: string[];
    highlight: string;
  };
  recommendation: {
    title: string;
    intro: string;
    items: {
      title: string;
      body: string;
    }[];
  };
  nextJourney: {
    title: string;
    steps: string[];
    microcopy: string;
  };
  googleNote: string;
  cta: {
    title: string;
    body: string;
    label: string;
    message: string;
  };
  evidence: DiagnosticEvidence[];
}

const evidenceBase = '/diagnosticos/gilvan-salvadori-ferro/evidence';

export const gilvanDiagnostic: DiagnosticPage = {
  slug: 'gilvan-salvadori-ferro',
  lead: {
    name: 'Dr. Gilvan Salvadori Ferro',
    segment: 'Odontologia',
    city: 'Santos, SP',
  },
  meta: {
    title: 'Seu diagnóstico está pronto - Marvin Sites',
    description: 'Uma análise simples da sua presença digital: o que já está bem resolvido e onde encontramos oportunidade.',
    robots: 'noindex,nofollow,noarchive',
    ogTitle: 'Seu diagnóstico está pronto - Marvin Sites',
    ogDescription: 'Uma análise simples da sua presença digital: o que já está bem resolvido e onde encontramos oportunidade.',
    ogImage: '/og-image.jpg',
  },
  hero: {
    eyebrow: 'DIAGNÓSTICO DE PRESENÇA DIGITAL',
    title: 'Dr. Gilvan, sua presença já transmite bastante confiança.',
    intro: 'O principal ponto que encontramos está em outro lugar: na diferença entre quem já pesquisa pelo seu nome e quem ainda está procurando pelo tratamento.',
    identity: 'Dr. Gilvan Salvadori Ferro - Odontologia em Santos',
    microcopy: 'Análise baseada em Google, Instagram, presença pública, tratamentos informados e buscas relacionadas em Santos.',
  },
  summary: {
    title: 'O diagnóstico em uma frase',
    body: [
      'Quem já conhece o Dr. Gilvan encontra uma presença forte.',
      'A principal oportunidade está em criar uma presença própria também para quem começa procurando pelo tratamento.',
    ],
  },
  journey: [
    {
      key: 'encontrar',
      label: 'Encontrar',
      status: 'strong',
      headline: 'Muito forte pelo seu nome.',
      summary: 'Quando pesquisamos Dr. Gilvan Salvadori Ferro, encontramos uma presença consistente no Google e em outros canais.',
      opportunity: 'O segundo caminho começa quando a pessoa ainda não conhece você e procura diretamente por um tratamento.',
    },
    {
      key: 'entender',
      label: 'Entender',
      status: 'good',
      headline: 'Seu Instagram explica bem sua atuação.',
      summary: 'Implantes, próteses, facetas e outros conteúdos aparecem de forma profissional.',
      opportunity: 'Hoje essas informações ficam principalmente dentro das plataformas.',
    },
    {
      key: 'confiar',
      label: 'Confiar',
      status: 'strong',
      headline: 'Este é um dos seus maiores ativos.',
      summary: 'As avaliações, o conteúdo, o consultório e sua imagem profissional já criam uma base forte de confiança.',
      opportunity: 'A oportunidade é aproveitar melhor esse ativo.',
    },
    {
      key: 'chamar',
      label: 'Chamar',
      status: 'good',
      headline: 'O contato já existe.',
      summary: 'Seu WhatsApp está disponível e o Google apresenta telefone.',
      opportunity: 'Podemos tornar o caminho entre interesse por um tratamento e contato mais organizado e direto.',
    },
  ],
  strengths: [
    'Presença forte quando pesquisam seu nome',
    'Nota 5,0 no Google',
    '68 avaliações',
    'Conteúdo profissional no Instagram',
    'Consultório apresentado',
    'Localização clara',
    'Contato disponível',
  ],
  discoveryPaths: {
    known: {
      label: 'Quando já conhecem seu nome',
      steps: ['Pesquisa por "Gilvan Salvadori Ferro"', 'Google', 'Avaliações', 'Instagram', 'Contato'],
      conclusion: 'Esse caminho já está muito bem resolvido.',
    },
    unknown: {
      label: 'Quando ainda não conhecem você',
      steps: ['Pesquisa por implantes, facetas ou lentes em Santos', 'Encontram profissionais, clínicas e páginas sobre esses tratamentos', 'Comparam informações e confiança', 'Decidem onde aprofundar'],
      conclusion: 'Foi aqui que encontramos a principal oportunidade.',
    },
  },
  findings: [
    {
      title: 'Sua presença aparece com força quando pesquisam seu nome',
      body: [
        'Google, avaliações, Instagram e outras referências ajudam a confirmar que a pessoa encontrou o profissional certo.',
      ],
      evidenceIds: ['google-nome'],
    },
    {
      title: 'Sua reputação já é um ativo importante.',
      body: [
        'A nota 5,0 com 68 avaliações aparece de forma clara. As próprias avaliações reforçam atributos como atenção, competência e confiança.',
      ],
      evidenceIds: ['google-perfil-mobile', 'google-avaliacoes'],
    },
    {
      title: 'Seu Instagram já explica bem sua atuação',
      body: [
        'O perfil apresenta tratamentos, consultório, avaliações, localização e um caminho direto para o WhatsApp.',
        'O conteúdo também reforça sua atuação profissional, mostrando procedimentos, ambiente e sua presença como especialista.',
      ],
      evidenceIds: ['instagram-cabecalho', 'instagram-grade'],
    },
    {
      title: 'O que ainda falta é conectar tudo em uma presença própria',
      body: [
        'Na própria busca aparecem profissionais levando a pessoa para páginas próprias. No perfil analisado do Dr. Gilvan, o Google ainda não apresenta um website associado.',
      ],
      evidenceIds: ['google-oportunidade'],
    },
  ],
  searchFinding: {
    title: 'O que encontramos nas buscas por tratamento',
    body: [
      'Nas buscas que analisamos, encontramos páginas próprias de profissionais e clínicas dedicadas a esses tratamentos. Não encontramos uma página própria sua fazendo esse mesmo papel.',
      'Isso não significa que você "não aparece no Google". Pelo contrário: sua presença pelo nome é forte.',
    ],
    disclaimer: 'Resultados do Google variam conforme localização, dispositivo e outros fatores. Esta análise não representa promessa de posição ou ranking.',
  },
  opportunity: {
    title: 'A oportunidade que encontramos',
    body: [
      'Você não precisa reconstruir sua presença do zero.',
      'Google, avaliações e Instagram já oferecem uma base forte.',
      'A oportunidade é criar uma presença própria que reúna seus principais tratamentos, aproveite a confiança que você já construiu e facilite o caminho até o contato.',
    ],
    highlight: 'Não se trata de simplesmente "aparecer no Google". Você já aparece. Trata-se de representar melhor seus tratamentos também para quem ainda não conhece você.',
  },
  recommendation: {
    title: 'Como organizaríamos essa presença',
    intro: 'A recomendação fica mais simples quando agrupamos em quatro partes.',
    items: [
      { title: 'Seus tratamentos', body: 'Implantes, facetas e lentes apresentados de forma clara, além da odontologia biomimética como parte da sua abordagem profissional.' },
      { title: 'Quem é o Dr. Gilvan', body: 'Experiência, formação, forma de trabalhar e informações que ajudam o paciente a entender melhor sua atuação.' },
      { title: 'Confiança e consultório', body: 'Avaliações, ambiente, localização e informações práticas reunidas em um só lugar.' },
      { title: 'Contato fácil', body: 'WhatsApp disponível nos pontos em que a pessoa naturalmente decide entrar em contato.' },
    ],
  },
  nextJourney: {
    title: 'A nova jornada ficaria mais simples',
    steps: ['Pesquisa pelo tratamento', 'Informação clara', 'Avaliações e confiança', 'Dr. Gilvan', 'WhatsApp'],
    microcopy: 'O objetivo é reduzir o esforço de quem quer entender sua atuação e chamar com segurança.',
  },
  googleNote: 'Não existe promessa de posição no Google. Uma presença própria cria páginas e informações que podem ser encontradas e compreendidas, mas a posição depende de diversos fatores externos.',
  cta: {
    title: 'Se fizer sentido, o próximo passo é simples',
    body: 'Posso te mostrar como organizaríamos essa presença para o seu caso e qual formato faz mais sentido.',
    label: 'Quero ver como ficaria',
    message: 'Oi, Marcos. Vi o diagnóstico que você preparou para mim. Pode me mostrar como vocês estruturariam essa presença?',
  },
  evidence: [
    {
      id: 'google-nome',
      image: `${evidenceBase}/google-nome.png`,
      fullImage: `${evidenceBase}/google-nome-original.png`,
      alt: 'Resultado do Google para Dr. Gilvan Salvadori Ferro com resultados pelo nome e painel lateral do perfil.',
      title: 'Google pelo nome',
      caption: 'A busca mostra sua presença, avaliações, Instagram e o perfil com 5,0 e 68 avaliações.',
    },
    {
      id: 'google-perfil-mobile',
      image: `${evidenceBase}/google-perfil-mobile.png`,
      fullImage: `${evidenceBase}/google-perfil-mobile-original.png`,
      alt: 'Perfil do Google do Dr. Gilvan em visualização vertical com nota, endereço, telefone e avaliações.',
      title: 'Perfil forte no Google',
      caption: 'A reputação, localização, telefone e horários aparecem com clareza.',
    },
    {
      id: 'google-avaliacoes',
      image: `${evidenceBase}/google-avaliacoes.png`,
      fullImage: `${evidenceBase}/google-avaliacoes-original.png`,
      alt: 'Tela de avaliações do Google com nota 5,0, 68 avaliações e uma avaliação destacando confiança.',
      title: 'Avaliações que reforçam confiança',
      caption: 'As próprias avaliações reforçam atenção, competência e confiança.',
    },
    {
      id: 'instagram-cabecalho',
      image: `${evidenceBase}/instagram-cabecalho.png`,
      fullImage: `${evidenceBase}/instagram-cabecalho-original.png`,
      alt: 'Cabeçalho do Instagram do Dr. Gilvan com especialidades, WhatsApp e destaques.',
      title: 'Instagram organizado',
      caption: 'O perfil apresenta especialidades, WhatsApp e destaques importantes.',
    },
    {
      id: 'instagram-grade',
      image: `${evidenceBase}/instagram-grade.png`,
      fullImage: `${evidenceBase}/instagram-grade-original.png`,
      alt: 'Grade do Instagram com conteúdos de consultório, procedimentos, tratamentos e presença profissional.',
      title: 'Conteúdo com autoridade visual',
      caption: 'A grade mostra consultório, procedimentos, explicações e presença profissional.',
    },
    {
      id: 'google-oportunidade',
      image: `${evidenceBase}/google-oportunidade.png`,
      fullImage: `${evidenceBase}/google-oportunidade-original.png`,
      alt: 'Busca no Google Maps mostrando resultados patrocinados com website e o perfil do Dr. Gilvan sem website cadastrado.',
      title: 'Oportunidade de presença própria',
      caption: 'Outros resultados oferecem caminho para site próprio; o perfil analisado ainda não apresenta website associado.',
    },
  ],
};

export const diagnostics = {
  [gilvanDiagnostic.slug]: gilvanDiagnostic,
};
