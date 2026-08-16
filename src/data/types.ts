export interface Project {
  slug: string;
  index: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  users: string[];
  accent: string;
  metrics: {
    northStar: string;
    supporting: string[];
  };
  links: {
    demo: string;
    github: string;
    caseStudyPdf: string;
  };
  // Real screenshots (extracted from the uploaded PRD/deck). `layers` is
  // used for the layered hero composition (primary/secondary/background,
  // front-to-back). `gallery` is the full set with captions, used in the
  // project detail page and "Behind the Build".
  screens: {
    aspect: "portrait" | "landscape";
    layers: { src: string; alt: string }[];
    gallery: { src: string; thumb: string; caption: string }[];
  };
  // WhatsApp Smart Search AI fields
  flow?: string[];
  mvp?: string[];
  future?: string[];
  // YouTube Consent & Personalization fields
  currentExperience?: string[];
  solution?: { step: string; title: string }[];
  successCriteria?: string[];
  rollout?: string[];
  principle?: string;
  tradeoffs?: string[];
  diagnosticThinking?: {
    scenario: string;
    hypotheses: string[];
    rootCause: string[];
  };
  dashboard?: {
    kpi: string;
    kpiLabel: string;
    kpiChange: string;
    note: string;
  };
}
