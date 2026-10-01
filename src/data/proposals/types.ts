export type JourneyKey = 'encontrar' | 'entender' | 'confiar' | 'chamar';

export interface ProposalPage {
  slug: string;
  proposalDate: string;
  lead: {
    name: string;
    profession: string;
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
    intro: string[];
    highlight: string[];
    ctaLabel: string;
  };
  startingPoint: {
    eyebrow: string;
    title: string;
    items: {
      title: string;
      body: string;
    }[];
    conclusion: string;
  };
  valuePositioning: {
    eyebrow: string;
    title: string;
    body: string[];
    highlight: string[];
    layers: {
      title: string;
      body: string;
    }[];
    constellation: string[];
  };
  recommendation: {
    title: string;
    intro: string;
  };
  journey: {
    key: JourneyKey;
    title: string;
    body: string;
  }[];
  scopeGroups: {
    title: string;
    body: string;
    items?: string[];
  }[];
  structurePreview: {
    eyebrow: string;
    title: string;
    intro: string;
    items: {
      title: string;
      type?: 'page' | 'section' | 'area';
      body: string;
    }[];
  };
  patientJourney: {
    title: string;
    steps: string[];
    body: string;
    note: string;
  };
  presenceMap: {
    current: {
      label: string;
      nodes: string[];
    };
    organized: {
      label: string;
      sources: string[];
      hub: string;
      details: string[];
      destination: string;
    };
    caption: string;
  };
  implementation: {
    title: string;
    intro: string;
    items: {
      title: string;
      body: string;
    }[];
  };
  googleBusinessCare: {
    enabled: boolean;
    title: string;
    intro: string;
    implementationItems: string[];
    monthlyTitle: string;
    monthlyIntro: string;
    monthlyItems: string[];
    scopeNote?: {
      title: string;
      body: string;
      exclusions: string[];
    };
  };
  recommendationReason: {
    eyebrow: string;
    title: string;
    body: string[];
    reasons: string[];
    highlight: string;
  };
  clientResponsibilities: {
    title: string;
    highlight: string;
    body: string;
    client: string[];
    closing: string[];
  };
  process: {
    step: number;
    title: string;
    body: string;
  }[];
  continuousCare: {
    title: string;
    intro: string;
    highlightTitle: string;
    highlightBody: string;
    pillars: {
      title: string;
      body?: string;
      items: string[];
    }[];
    valuePhrase: string[];
  };
  monthlyReason: {
    title: string;
    body: string[];
    highlight: string;
  };
  monthlyResponsibility: {
    eyebrow: string;
    title: string;
    subtitle: string;
    price: string;
    items: {
      title: string;
      body: string;
      examples?: string[];
    }[];
    closing: string[];
  };
  fairUse: {
    title: string;
    body: string[];
    highlight: string;
  };
  hiringContext: {
    title: string;
    beforeTitle: string;
    beforeItems: string[];
    afterTitle: string;
    afterItems: string[];
    closing: string;
  };
  investment: {
    eyebrow: string;
    title: string;
    subtitle: string;
    planName: string;
    setupLabel: string;
    setupPrice: string;
    setupDescription: string;
    monthlyLabel: string;
    monthlyPrice: string;
    monthlyDescription: string;
    monthlyIncludes: string[];
    commercialCondition?: {
      enabled: boolean;
      label: string;
      standardSetupPrice: string;
      offeredSetupPrice: string;
      note: string;
    };
    contractNote: string;
  };
  clarity: {
    title: string;
    body: string[];
  };
  riskReduction: {
    title: string;
    highlight: string;
    body: string[];
  };
  faq: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  cta: {
    eyebrow: string;
    title: string;
    body: string[];
    primaryLabel: string;
    primaryMessage: string;
    secondaryLabel: string;
    secondaryMessage: string;
    contractNote: string;
  };
  footer: {
    tagline: string;
    preparedForLabel: string;
    contractNote: string;
  };
}
