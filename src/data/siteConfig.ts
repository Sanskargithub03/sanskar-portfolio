// ============================================================================
// SITE CONFIG — single source of truth.
// Swap the hero/contact photo, or any link, in ONE place and the whole
// site updates. Nothing below should be hardcoded elsewhere in components.
// ============================================================================
import type { Project } from "./types";

export const siteConfig = {
  personal: {
    name: "Sanskar Yede",
    firstName: "Sanskar",
    role: "Product Thinker",
    tagline: "Product discovery, AI-native products, user research, PRDs and growth.",
    email: "sanskar355yede@gmail.com",
    phone: "8602527698",
    phoneDisplay: "+91 86025 27698",
    // ------------------------------------------------------------------
    // PHOTO — primary/fallback pair, per the diagnosis below.
    //
    // ROOT CAUSE of the missing hero portrait: "https://kommodo.ai/i/..."
    // is Kommodo's shareable HTML PAGE for the image (it serves
    // `text/html`), not the image file itself. An <img src> pointed at
    // it receives an HTML document instead of image bytes and fails to
    // decode — silently, with no visible error, which is exactly why the
    // glow rendered but the portrait didn't.
    //
    // The real asset lives at Kommodo's CDN (resolved from that page's
    // own og:image tag) — but that CDN link is also explicitly time-
    // limited ("this link expires Sep 15, 2026"), so it's a fallback,
    // not a permanent source.
    //
    // PRIMARY: a local file at /public/images/profile-sanskar.webp.
    // That file is NOT bundled in this pass (no binary asset was
    // supplied) — drop the real optimized photo there and it's picked
    // up automatically, with zero code changes, per photoFallback below.
    photo: "/images/profile-sanskar.webp",
    photoFallback: "https://plain-apac-prod-public.komododecks.com/202608/16/obH5ZjjvOYXuvfifEryy/image.png",
    photoAlt: "Portrait of Sanskar Yede",
    location: "IIIT Nagpur, India",
    education: {
      degree: "B.Tech, Electronics & Communication Engineering",
      school: "IIIT Nagpur",
      cgpa: "8.02",
    },
    availability: "Available for Product Opportunities",
    positioning: "Building AI-native products at the intersection of users, technology and growth.",
    secondaryPositioning: "Product-first, with a technical edge.",
  },

  social: {
    linkedin: "https://www.linkedin.com/in/sanskar-yede-b61798294",
    github: "https://github.com/Sanskargithub03",
    resume: "https://drive.google.com/file/d/1tvziS5aTx6X_6VkX2USbJQomcG5MaC2W/view?usp=sharing",
  },

  nav: [
    { label: "Home", href: "#home" },
    { label: "Works", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
  ],

  hero: {
    greeting: "Hey, there",
    lineOne: "I AM",
    lineTwo: "SANSKAR",
    roleLineOne: "PRODUCT",
    roleLineTwo: "THINKER",
    ctas: {
      primary: { label: "View My Work", href: "#work" },
      secondary: { label: "Contact Me", href: "#contact" },
      tertiary: { label: "View Resume", href: "" }, // resolved from social.resume
    },
  },

  howIThink: [
    {
      number: "01",
      title: "User Research",
      description: "Understand the user's actual problem before jumping to solutions.",
    },
    {
      number: "02",
      title: "Product Strategy",
      description: "Translate user needs and business constraints into product direction.",
    },
    {
      number: "03",
      title: "MVP Thinking",
      description: "Prioritize the smallest useful version that can validate the core hypothesis.",
    },
    {
      number: "04",
      title: "Measure & Iterate",
      description: "Define success metrics and improve through feedback and data.",
    },
  ],

  impact: [
    { value: 40, suffix: "%", label: "Inter-college participation increase" },
    { value: 15000, suffix: "+", label: "Tantra Fiesta registrations" },
    { value: 2.3, suffix: "×", label: "Digital engagement increase" },
    { value: 25, suffix: "+", label: "Colleges reached through ambassador outreach" },
    { value: 31, suffix: "+", label: "Events covered" },
  ],

  projects: [
    {
      slug: "whatsapp-smart-search-ai",
      index: "01",
      title: "WhatsApp Smart Search AI",
      category: "AI Product / Product Design",
      description:
        "An AI-powered semantic search experience for WhatsApp that helps users find messages, documents and links using natural language instead of exact keywords.",
      problem:
        "Users often remember the context of a conversation, or who shared something, but not the exact filename or wording — so keyword search fails them exactly when they need it most.",
      users: ["Everyday WhatsApp users searching long chat histories", "Teams sharing documents and links across busy group chats"],
      flow: ["WhatsApp", "AI Search", "Natural Language Query", "Semantic Search", "Ranked Results", "Open Result"],
      mvp: [
        "Natural language search",
        "Semantic ranking",
        "AI summaries",
        "Smart filters",
        "Related documents",
        "Privacy-first on-device processing",
      ],
      metrics: {
        northStar: "Search Success Rate",
        supporting: ["Average Search Time", "Repeat Usage", "Successful Result Click Rate", "Latency"],
      },
      future: ["Voice search", "OCR", "Multimodal retrieval", "Image understanding", "Calendar integration", "AI recommendations"],
      // Real screens extracted from the uploaded PRD (WhatsApp_Smart_Search_AI_PRD_With_Images.pdf).
      screens: {
        aspect: "portrait",
        layers: [
          { src: "/projects/whatsapp/results.webp", alt: "Ranked semantic search results for \"Amazon OA link\"" },
          { src: "/projects/whatsapp/home-light.webp", alt: "Smart Search home screen with suggested queries" },
          { src: "/projects/whatsapp/settings-dark.webp", alt: "Smart Search privacy settings, on-device processing" },
        ],
        gallery: [
          { src: "/projects/whatsapp/home-light.webp", thumb: "/projects/whatsapp/home-light.webp", caption: "Home — natural language search entry point" },
          { src: "/projects/whatsapp/home-dark.webp", thumb: "/projects/whatsapp/home-dark.webp", caption: "Home — dark mode" },
          { src: "/projects/whatsapp/processing.webp", thumb: "/projects/whatsapp/processing.webp", caption: "AI processing — reading query, searching, ranking" },
          { src: "/projects/whatsapp/results.webp", thumb: "/projects/whatsapp/results.webp", caption: "Ranked semantic results with match confidence" },
          { src: "/projects/whatsapp/settings-light.webp", thumb: "/projects/whatsapp/settings-light.webp", caption: "Settings — light mode" },
          { src: "/projects/whatsapp/settings-dark.webp", thumb: "/projects/whatsapp/settings-dark.webp", caption: "Settings — on-device processing & privacy" },
        ],
      },
      links: {
        demo: "https://sanskargithub03.github.io/WhatsApp-Smart-Search-AI/",
        github: "https://github.com/Sanskargithub03/WhatsApp-Smart-Search-AI",
        // The actual uploaded PRD — WhatsApp_Smart_Search_AI_PRD_With_Images.pdf
        caseStudyPdf: "/case-studies/whatsapp-smart-search-ai.pdf",
      },
      accent: "#E7A65C",
    },
    {
      slug: "youtube-consent-personalization",
      index: "02",
      title: "YouTube Consent & Personalization",
      category: "Product Strategy / Privacy / Trust",
      description:
        "A product-thinking case study exploring how YouTube's consent and data experience in India could better align with the Digital Personal Data Protection Act, 2023 for under-18 users without breaking the product experience.",
      problem:
        "India's DPDP Act, 2023 requires verifiable parental consent for under-18 users — but most consent flows are built to satisfy legal teams, not the people living through them.",
      users: ["A parent managing a supervised account", "A self-signed-up teen, aged 15–17"],
      currentExperience: ["Sign-up", "Routing", "Consent", "Ongoing data controls"],
      solution: [
        { step: "01", title: "Smarter Age-Assurance" },
        { step: "02", title: "Granular Consent" },
        { step: "03", title: "In-App Parent Dashboard" },
        { step: "04", title: "Age-Up Re-consent" },
      ],
      metrics: {
        northStar: "Verified Consent Rate",
        supporting: ["Parent Dashboard Engagement", "7-Day Consent Completion", "Rights-Request Resolution Time"],
      },
      successCriteria: [
        "Verified Consent Rate ≥ 90%",
        "95% of rights requests resolved within 48 hours",
        "Sign-up completion drop ≤ 5%",
      ],
      rollout: ["Phase 1 — Soft Launch", "Phase 2 — Controlled UX Test", "Phase 3 — Full Rollout"],
      principle: "Don't A/B test whether legally required consent is requested — test how the consent experience is presented.",
      tradeoffs: ["Engineering complexity", "Reduced ad personalization", "Consent fatigue", "UX friction", "Edge cases"],
      // From the deck's "Diagnostic Thinking" slide — a structured
      // response to a hypothetical metric regression, included because it
      // demonstrates analytical process, not just the proposed solution.
      diagnosticThinking: {
        scenario: "North Star drops 15% in week 3 — no release shipped. Now what?",
        hypotheses: [
          "Instrumentation bug — consent status stopped updating correctly in logs",
          "Funnel drop-off — a UX step is causing higher parent abandonment",
          "Denominator shift — a new cohort (e.g. school term start) spikes flagged-minor sign-ups, diluting the rate",
          "External dependency change — a Family Link API/policy update broke the integration",
        ],
        rootCause: [
          "Cross-tab the metric by day / platform / region to isolate where the drop concentrates",
          "Bug → hotfix; funnel drop → simplify the friction screen + parent reminder nudges; denominator shift → adjust metric window or let it normalise",
        ],
      },
      // Headline KPI from the deck's illustrative dashboard slide — the
      // deck itself labels this "mock data shown for illustration."
      dashboard: {
        kpi: "87.4%",
        kpiLabel: "Verified Consent Rate",
        kpiChange: "▲ 3.1 pts vs last month",
        note: "Mock data, shown for illustration in the source deck.",
      },
      // Real slides rasterized from the uploaded deck (YouTube_DPDP_Consent_Deck.pdf).
      screens: {
        aspect: "landscape",
        layers: [
          { src: "/projects/youtube/dashboard.webp", alt: "Consent health dashboard — Verified Consent Rate 87.4%" },
          { src: "/projects/youtube/solution.webp", alt: "Proposed layered consent system, four components" },
          { src: "/projects/youtube/problem.webp", alt: "Problem statement — minors watching YouTube without consent built for them" },
        ],
        gallery: [
          { src: "/projects/youtube/problem.webp", thumb: "/projects/youtube/problem-thumb.webp", caption: "Problem statement & why it matters" },
          { src: "/projects/youtube/users.webp", thumb: "/projects/youtube/users-thumb.webp", caption: "The two users: parent and self-signed-up teen" },
          { src: "/projects/youtube/current-experience.webp", thumb: "/projects/youtube/current-experience-thumb.webp", caption: "Where today's flow falls short of DPDP" },
          { src: "/projects/youtube/solution.webp", thumb: "/projects/youtube/solution-thumb.webp", caption: "A layered consent system" },
          { src: "/projects/youtube/metrics.webp", thumb: "/projects/youtube/metrics-thumb.webp", caption: "One north star, guarded on both sides" },
          { src: "/projects/youtube/diagnostic.webp", thumb: "/projects/youtube/diagnostic-thumb.webp", caption: "Diagnostic thinking — hypothesis tree" },
          { src: "/projects/youtube/dashboard.webp", thumb: "/projects/youtube/dashboard-thumb.webp", caption: "Monitoring consent health at a glance" },
          { src: "/projects/youtube/rollout.webp", thumb: "/projects/youtube/rollout-thumb.webp", caption: "Phased launch, with honest limits on A/B testing" },
          { src: "/projects/youtube/tradeoffs.webp", thumb: "/projects/youtube/tradeoffs-thumb.webp", caption: "Nothing here is free — trade-offs accepted" },
        ],
      },
      links: {
        demo: "https://sanskargithub03.github.io/youtube-consent-prototype/",
        github: "https://github.com/Sanskargithub03/youtube-consent-prototype",
        // The actual uploaded deck — YouTube_DPDP_Consent_Deck.pdf
        caseStudyPdf: "/case-studies/youtube-consent-personalization.pdf",
      },
      accent: "#B08862",
    },
  ] as Project[],

  // NOTE ON DATES: no resume text or file with actual role dates has been
  // supplied in this conversation. Rather than keep presenting a guessed
  // range as fact, `period` is left blank below — set the two real dates
  // here and they'll appear automatically (ExperienceRow hides the pill
  // entirely when period is empty, so this degrades cleanly either way).
  experience: [
    {
      slug: "abhivyakti",
      org: "Abhivyakti, IIIT Nagpur",
      role: "Marketing Head",
      period: "", // ← add verified dates, e.g. "2023 — 2024"
      // Resolved from the kommodo.ai share PAGE to its actual image asset —
      // see the photo comment above for why the share-page link itself
      // doesn't work as an <img src>. Also time-limited; swap for a
      // permanent local asset when convenient (e.g. /images/abhivyakti-logo.webp).
      logo: "https://plain-apac-prod-public.komododecks.com/202608/16/ZrsMLK4yq3COUByazkOg/image.png",
      tags: ["Growth", "User Acquisition", "Campaign Strategy"],
      highlights: [
        { value: "40%", label: "Participation increase" },
        { value: "25+", label: "Colleges reached" },
      ],
      impact: [
        "Led growth initiatives that increased inter-college participation by 40% through targeted outreach and user-focused campaigns.",
        "Designed and managed a Campus Ambassador Program across 25+ colleges.",
        "Analyzed campaign performance and user feedback to optimize engagement strategies.",
        "Collaborated with design, operations and event teams.",
      ],
    },
    {
      slug: "tantra-fiesta",
      org: "Tantra Fiesta, IIIT Nagpur",
      role: "Marketing Head",
      period: "", // ← add verified dates, e.g. "2022 — 2023"
      logo: "https://plain-apac-prod-public.komododecks.com/202608/16/9vWvl9MtV2E2WLcvwMbg/image.png",
      tags: ["Growth", "Analytics", "Cross-functional Execution"],
      highlights: [
        { value: "15,000+", label: "Registrations driven" },
        { value: "2.3×", label: "Digital engagement" },
      ],
      impact: [
        "Led marketing strategy for 31+ events.",
        "Drove 15,000+ registrations.",
        "Increased digital engagement by 2.3×.",
        "Worked with design, technical and operations teams.",
      ],
    },
  ],

  about: {
    heading: ["About", "Sanskar"],
    paragraph:
      "Sanskar Yede is an Electronics & Communication Engineering undergraduate at IIIT Nagpur focused on Product Management and AI-native product development. He combines user research, product discovery and PRD writing with technical understanding of digital design and computer architecture — using both sides to build products that are useful, buildable and worth the effort.",
    productSkills: [
      "User Research",
      "Product Discovery",
      "PRD Writing",
      "User Journey Mapping",
      "Feature Prioritization",
      "MVP Planning",
      "Competitive Analysis",
      "Experimentation",
      "Growth Analytics",
    ],
    technicalSkills: ["Digital Design", "Verilog", "SystemVerilog", "Computer Architecture", "VLSI", "Python", "C++"],
    statement: "Product-first, with a technical edge.",
  },

  toolkit: {
    categories: [
      {
        name: "Product",
        items: [
          "Product Discovery",
          "User Research",
          "User Stories",
          "User Journey Mapping",
          "Feature Prioritization",
          "MVP Planning",
          "Competitive Analysis",
          "PRD Writing",
        ],
      },
      {
        name: "Analytics",
        items: ["KPI Tracking", "Data Analysis", "Experimentation", "Growth Metrics", "A/B Testing", "SQL (Learning)"],
      },
      {
        name: "AI & Tools",
        items: ["ChatGPT", "Claude", "Gemini", "Codex", "Gamma", "Figma", "Excel", "Git", "Prompt Engineering"],
      },
    ],
  },

  technicalEdge: {
    title: "I2C → AXI4-Lite Bridge",
    description:
      "Designed a hardware bridge between I2C peripherals and the AXI4-Lite bus for communication between low-speed devices and processor interfaces.",
    concepts: [
      "Verilog RTL",
      "FSM-based protocol conversion",
      "I2C",
      "AXI4-Lite",
      "Address decoding",
      "Read/write transactions",
      "Simulation-based verification",
    ],
    github: "https://github.com/Sanskargithub03/I2C-to-AXI4LITE",
  },

  achievements: [
    {
      number: "01",
      title: "2nd Position",
      detail: "Dark Silicon VLSI Design Competition",
      org: "IIIT Nagpur",
    },
    {
      number: "02",
      title: "Top 500 Teams",
      detail: "eYantra Robotics Competition",
      org: "IIT Bombay",
    },
    {
      number: "03",
      title: "Top 5 Finalist",
      detail: "Trail Tracer Line Follower Competition",
      org: "",
    },
    {
      number: "04",
      title: "4th Place",
      detail: "Build the Brand Competition",
      org: "IIT Roorkee",
    },
  ],

  contact: {
    heading: ["Let's", "Build Something"],
    subheading: "Open to Product, AI Product and Product Strategy opportunities.",
  },

  footer: {
    tags: ["Product", "AI", "Growth"],
    year: 2026,
  },
} as const;

export type SiteConfig = typeof siteConfig;
