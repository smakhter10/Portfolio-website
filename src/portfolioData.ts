/**
 * PORTFOLIO CUSTOMIZATION DATA FILE
 * ==========================================
 * Clients can edit this single file to update all titles, descriptions,
 * bio texts, project lists (casettes), metrics, capabilities, and social links.
 * No web developer knowledge is required!
 */

export interface DossierMetric {
  label: string;
  val: string;
}

export interface Dossier {
  num: string;
  docCode: string;
  title: string;
  longDesc: string;
  tag: string;
  specs: string[];
  metrics: DossierMetric[];
}

export interface ProjectItem {
  title: string;
  desc: string;
  year: string;
  category: string;
  tech: string[];
  themeColor: "emerald" | "purple" | "cyan" | "orange";
  tapeFormat: string;
  biasText: string;
  volScale: string;
  stickerBg: string;
  accentBorder: string;
  textColor: string;
  reelColor: string;
  accentText: string;
  image: string;
}

export interface ServiceItem {
  num: string;
  title: string;
  category: string;
  image: string;
}

export interface MetricSpecValue {
  label: string;
  val: string;
}

export const portfolioData = {
  // Global settings
  clientName: "SEEYAM",
  contactEmail: "smakhter10@gmail.com",
  copyYear: 2026,

  // --- HERO SECTION ---
  hero: {
    displayName: "SEEYAM",
    badgeNumber: "(25)",
    bioTag: "SEEYAM PORTFOLIO • EST. 2020",
    bioDescription: "WordPress Specialist & High-Contrast Custom Frontend Composer.",
    scrollLabel: "Scroll downstream",
  },

  // --- CREATOR PROFILE CODE-DECODER SECTION ---
  creatorProfile: {
    identityTag: "IDENTITY REGISTER // STACK: WORDPRESS • REACT",
    registNo: "REGIST. NO: #SE-2026",
    statusPrefix: "STATUS: DECODING",
    badgeLabel: "CREATOR SPECIFICATION",
    
    // Main paragraph that auto-decodes as you scroll:
    bioText: "I am Seeyam, a creative web technologist specializing in bespoke WordPress architectures, custom system plugins, and high-performance React application layers. I build fast, semantic codebases integrated with tactile physical layouts, responsive forms, and smooth micro-interactive choreography. Synthesizing meticulous visual styling with clean engineering routines to formulate lasting, premium digital experiences for forward-thinking brands, design studios, and innovators.",
    
    // Flat editorial metrics printed below the decoder:
    profileMetrics: [
      { id: "01", label: "ENCODING STACK", value: "WordPress & React Architecture" },
      { id: "02", label: "CORE PARADIGM", value: "Semantic Performance Layers" },
      { id: "03", label: "MOTION TIMING", value: "GSAP ScrollTrigger Scroll Pin" },
    ]
  },

  // --- ABOUT METHODOLOGY SECTION (STACKING FOLDERS) ---
  dossiers: [
    {
      num: "01",
      docCode: "SYS_CORE // CORE ARCHITECTURE",
      title: "Extensible WordPress Ecosystems",
      longDesc: "Developing bulletproof, self-governing CMS pipelines built directly into raw PHP modules, replacing bulky layouts with light, high-performance visual hierarchies.",
      tag: "CORE SCHEMATIC",
      specs: [
        "Advanced Custom Fields (ACF)",
        "REST API Hook Interceptors",
        "Object-Oriented PHP Structures",
        "Strict WP-Security Standards",
      ],
      metrics: [
        { label: "QUERY LOAD", val: "-48%" },
        { label: "SPEED INDEX", val: "99/100" },
        { label: "FID RATIO", val: "0.4ms" },
      ],
    },
    {
      num: "02",
      docCode: "SYS_VIEW // FRONTEND LAYERS",
      title: "High-Contrast Visual Systems",
      longDesc: "Crafting tactile, high-contrast layouts combining strict typography rules with fluid GSAP micro-animations that respond organically to physical user inputs.",
      tag: "DOCK SCHEMATIC",
      specs: [
        "Tailwind Fluid Grids",
        "GSAP Timeline Orchestration",
        "Hardware Accelerated CSS3",
        "Accessible AA+ Contrast Rules",
      ],
      metrics: [
        { label: "FPS INDEX", val: "60 FPS" },
        { label: "ACCESSIBILITY", val: "100%" },
        { label: "REACTION TIMING", val: "ULTRA" },
      ],
    },
    {
      num: "03",
      docCode: "SYS_DATA // INTEGRATION PLUGINS",
      title: "Custom Plugin Architectures",
      longDesc: "Architecting bespoke WordPress extensions from scratch to fulfill custom queries, complex taxomony rules, and dynamic live databases.",
      tag: "BASE SYSTEM CODE",
      specs: [
        "WP Database Transients API",
        "AJAX Real-Time Pagination",
        "OAuth 2.0 Client Connectors",
        "Secure Storage Routines",
      ],
      metrics: [
        { label: "API EFFICIENCY", val: "+72%" },
        { label: "MEMORY SPIKE", val: "ZERO" },
        { label: "CACHE HIT RATE", val: "99.4%" },
      ],
    },
    {
      num: "04",
      docCode: "SYS_SPEED // CORE BENCHMARKS",
      title: "Hyper-Performance Auditing",
      longDesc: "Eliminating complex rendering blocks, minifying heavy scripts, and caching API responses to turn standard designs into incredibly fast web applications.",
      tag: "OPTIMIZATION MANUAL",
      specs: [
        "Webpack/Vite Bundle Trees",
        "WebP/AVIF Asset Pre-scaling",
        "Critical Path CSS Inlining",
        "Dynamic Redis Tuning",
      ],
      metrics: [
        { label: "CONVERSION", val: "+34%" },
        { label: "TTFB RESPONSE", val: "88ms" },
        { label: "BOUNCE RATE", val: "-22%" },
      ],
    },
  ] as Dossier[],

  // --- SELECTED WORKS SECTION (RETRO PLAYING CASSETTES) ---
  projects: [
    {
      title: "Verdant E-commerce",
      desc: "An organic merchant sanctuary built on WooCommerce, incorporating custom billing gateways, fluid cart state transitions, and responsive inventory controls.",
      year: "2026",
      category: "E-Commerce Website",
      tech: ["WooCommerce", "Elementor Pro", "Tailwind CSS", "Alpine.js"],
      themeColor: "emerald",
      tapeFormat: "TYPE II",
      biasText: "CHROME BIAS 70µs",
      volScale: "C-90",
      stickerBg: "bg-emerald-500",
      accentBorder: "border-emerald-500",
      textColor: "text-emerald-500",
      reelColor: "bg-emerald-950/40",
      accentText: "text-emerald-100",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Aura Editorial",
      desc: "A luxury lifestyle digital publication portfolio displaying asymmetrical index pages, smooth transition routines, and procedural typographic headers.",
      year: "2025",
      category: "Portfolio Website",
      tech: ["React SPA", "WordPress API", "GSAP ScrollTrigger"],
      themeColor: "purple",
      tapeFormat: "TYPE I",
      biasText: "NORMAL BIAS 120µs",
      volScale: "C-60",
      stickerBg: "bg-purple-650 bg-gradient-to-r from-purple-800 to-indigo-700",
      accentBorder: "border-purple-500",
      textColor: "text-purple-400",
      reelColor: "bg-purple-950/40",
      accentText: "text-purple-100",
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Reserva Hospitality",
      desc: "A fully unified booking engine and visitor management workflow built for custom boutique hotels, mapping live reservation limits and date matrixes.",
      year: "2025",
      category: "Booking Website",
      tech: ["PHP", "Custom API", "Vanilla JS", "MySQL"],
      themeColor: "cyan",
      tapeFormat: "TYPE IV",
      biasText: "METAL BIAS 70µs",
      volScale: "C-90",
      stickerBg: "bg-cyan-600 bg-gradient-to-r from-cyan-700 to-blue-800",
      accentBorder: "border-cyan-500",
      textColor: "text-cyan-400",
      reelColor: "bg-cyan-950/40",
      accentText: "text-cyan-100",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Dynamic Grid Forge",
      desc: "A bespoke WordPress Plugin enabling real-time masonry layout generation, advanced taxonomy routing, and heavy server-side caching routines.",
      year: "2026",
      category: "Custom WP Plugin",
      tech: ["PHP OOP", "WP Admin API", "AJAX", "Caleb Cache"],
      themeColor: "orange",
      tapeFormat: "TYPE II",
      biasText: "CHROME BIAS 70µs",
      volScale: "C-46",
      stickerBg: "bg-amber-600 bg-gradient-to-r from-orange-600 to-amber-600",
      accentBorder: "border-amber-500",
      textColor: "text-amber-400",
      reelColor: "bg-amber-950/40",
      accentText: "text-amber-100",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80"
    }
  ] as ProjectItem[],

  // --- SERVICES CAPABILITIES SECTION ---
  services: [
    {
      num: "001",
      title: "WORDPRESS DEVELOPMENT",
      category: "CMS ARCHITECTURE",
      image: "https://geeksforless.com/wp-content/uploads/2023/08/WordPress.png",
    },
    {
      num: "002",
      title: "ELEMENTOR & WOOCOMMERCE",
      category: "E-COMMERCE SYSTEM",
      image: "https://wooninjas.com/wp-content/uploads/2020/08/woocommerce-and-elementor.png",
    },
    {
      num: "003",
      title: "CUSTOM PLUGIN INTENT",
      category: "BACKEND PLUGINS",
      image: "https://www.codeable.io/wp-content-new/uploads/2025/11/custom_wordpress_plugin_development_featured.jpg",
    },
    {
      num: "004",
      title: "LANDING PAGE DESIGN",
      category: "CONVERSION DESIGN",
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/8d1f15106866231.5f99a74fb2f32.jpg",
    },
    {
      num: "005",
      title: "SPEED OPTIMIZATION",
      category: "PERFORMANCE OVERHAUL",
      image: "https://freshysites.com/wp-content/uploads/best-site-speed-optimization-plugins.jpg",
    },
    {
      num: "006",
      title: "WEBSITE MAINTENANCE",
      category: "WATCH PROTOCOLS",
      image: "https://www.spinxdigital.com/app/uploads/2023/01/Image-Maintenance.jpg",
    },
  ] as ServiceItem[],

  // --- CONTACT SECTION ---
  contact: {
    sectionTag: "Initiate Contact",
    ctaHeadline: "Let’s build something memorable.",
    budgetPlaceholder: "What is your legal name?",
    emailPlaceholder: "How do we reach you? (Email)",
    budgetTierLabel: "Allocated Budget",
    budgetTiers: ["Standard", "Premium", "Enterprise"],
    messageLabel: "Tell me about your brand goals & requirements",
    messagePlaceholder: "Describe your design parameters, timelines, and technical stack...",
    buttonSubmitLabel: "Transmit Parameters",
    buttonSendingLabel: "Processing Transmission...",
    successAlertMessage: "Project request received successfully! Seeyam will reach out in 12 hours.",
    responseGuaranteedLabel: "Guaranteed respond time: • 12 Hours",
  },

  // --- SOCIAL CHANNELS LIST ---
  socials: [
    { label: "GitHub", url: "https://github.com/smakhter10" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/seeyam-akhter-692771266/" },
    { label: "Facebook", url: "https://www.facebook.com/" },
  ]
};
