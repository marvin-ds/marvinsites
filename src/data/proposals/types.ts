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
  fairUse: {
    title: string;
    body: string[];
    highlight: string;
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
