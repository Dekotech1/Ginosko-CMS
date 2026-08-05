import { Article, ProjectCaseStudy, ServiceSolution, MediaAsset, EnterpriseLead, UserProfile, ActivityLogItem } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-001',
    title: 'The 2026 Grid Modernization Mandate: Integrating Utility-Scale Solar with BESS',
    slug: 'grid-modernization-mandate-solar-bess',
    subtitle: 'How regional transmission operators and enterprise IPPs are leveraging edge telemetry and battery storage to eliminate curtailment risk.',
    content: `# The 2026 Grid Modernization Mandate: Integrating Utility-Scale Solar with BESS

Global energy grids are undergoing their most dramatic structural evolution in over a century. As variable renewable energy (VRE) penetration exceeds 35% across North American and European transmission networks, the central challenge has shifted from power generation to **grid balancing, inertia preservation, and curtailment mitigation**.

## The Curtailment Bottleneck in Utility Solar

In 2025 alone, unmitigated solar curtailment across major ISO regions resulted in over **$1.4 billion in lost clean power generation value**. Traditional grid infrastructure, designed around centralized baseload thermal plants, struggles to absorb massive midday photovoltaic surges without voltage instability.

> "The bottleneck is no longer the cost per kilowatt-hour of photovoltaic modules—it is the temporal alignment of solar output with real-time industrial demand spikes." — *Dr. Elena Vance, VP of Grid Engineering at Ginosko*

### Key Strategic Pillars for 2026 Deployment

1. **Collocated BESS Architecture**: Direct DC-coupled lithium-iron-phosphate (LFP) storage arrays reduce balance-of-system (BOS) capital costs by up to 14%.
2. **Predictive AI Dispatch**: Utilizing high-frequency weather satellite modeling to forecast ramp rates 3 hours in advance with 98.4% accuracy.
3. **Synthetic Inertia Regulation**: Inverter-based grid-forming technology capable of responding to frequency anomalies within 15 milliseconds.

\`\`\`
+-----------------------------------------------------------------------+
|  Collocated Solar PV Array  --->  DC-DC Converter  --->  LFP Battery  |
|                                                                 |     |
|  Grid Interconnection <--- Smart Bidirectional Inverter <------+     |
+-----------------------------------------------------------------------+
\`\`\`

## Economic Payback & Asset Valuation

When integrating a 100MW / 400MWh battery energy storage system (BESS) with a 250MW solar installation, project internal rate of return (IRR) increases from **8.2% to 14.7%** under current capacity payment frameworks.

### Recommended Next Steps for Utility Assets
- Audit legacy interconnections for dynamic line rating (DLR) readiness.
- Transition from fixed long-term fixed PPAs to hybrid tolling structures.
- Implement automated state-of-charge (SoC) degradation safeguards.`,
    summary: 'An executive analysis of how battery energy storage systems (BESS) and predictive AI dispatch eliminate grid curtailment and optimize utility solar asset economics.',
    category: 'Solar Energy',
    tags: ['Grid Modernization', 'BESS', 'Utility Solar', 'Decarbonization', 'Energy Storage'],
    status: 'published',
    author: {
      name: 'Dr. Elena Vance',
      role: 'VP of Grid Architecture',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    readTimeMinutes: 6,
    views: 3420,
    seo: {
      metaTitle: '2026 Grid Modernization Mandate: Solar & BESS Integration | Ginosko',
      metaDescription: 'Learn how collocated battery storage and predictive AI dispatch transform utility-scale solar economics and prevent grid curtailment.',
      focusKeywords: ['Grid Modernization', 'BESS', 'Solar Energy', 'Utility Scale', 'Energy Storage'],
    },
  },
  {
    id: 'art-002',
    title: 'Navigating Corporate Scope 3 Accounting & Green Tariff PPAs in Europe',
    slug: 'navigating-corporate-scope-3-green-tariffs-europe',
    subtitle: 'Strategic ESG advisory for multinational corporations balancing CSRD mandates and volatile electricity futures.',
    content: `# Navigating Corporate Scope 3 Accounting & Green Tariff PPAs in Europe

With the European Union's **Corporate Sustainability Due Diligence Directive (CSDDD)** entering strict enforcement, Fortune 500 corporations are under unprecedented pressure to audit and decarbonize their entire value chain.

## Understanding Scope 3 Decarbonization Targets

Scope 3 indirect emissions account for over **80% of total climate impact** for manufacturing, logistics, and consulting conglomerates. Achieving net-zero compliance requires moving beyond unbundled Renewable Energy Certificates (RECs) toward **additionality-driven Power Purchase Agreements (PPAs)**.

### Comparative Framework: PPA Models

| Structure | Cost Certainty | Scope 3 Creditability | Operational Complexity |
| :--- | :--- | :--- | :--- |
| **Physical On-Site PPA** | High (Fixed Index) | 100% Direct | Medium |
| **Virtual PPA (vPPA)** | High (Financial Hedge) | 100% Additionality | High |
| **Green Tariff Utility Contract** | Moderate | 75% Indirect | Low |

## Actionable Steps for Corporate Procurement

1. **Establish Granular Hourly Matching**: Transition from annual net energy balance to 24/7 carbon-free energy (CFE) tracking.
2. **Incentivize Tier-1 Suppliers**: Require key supply chain partners to join regional solar aggregation buyers' pools.
3. **Incorporate Carbon Floor Pricing**: Model energy risk under a €120/ton ETS carbon tax scenario.`,
    summary: 'A definitive guide for C-suite sustainability executives on managing Scope 3 carbon compliance through structured PPAs and 24/7 carbon-free energy tracking.',
    category: 'ESG & Sustainability',
    tags: ['Scope 3', 'CSRD', 'Corporate PPA', 'ESG Compliance', 'Carbon Accounting'],
    status: 'published',
    author: {
      name: 'Marcus Thorne',
      role: 'Chief Sustainability Strategist',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    publishedAt: '2026-07-24',
    updatedAt: '2026-07-25',
    readTimeMinutes: 5,
    views: 2180,
    seo: {
      metaTitle: 'Corporate Scope 3 Decarbonization & PPAs in Europe | Ginosko ESG',
      metaDescription: 'Complete roadmap for corporate Scope 3 compliance, CSDDD regulations, and virtual Power Purchase Agreements.',
      focusKeywords: ['Scope 3', 'ESG Advisory', 'Corporate PPA', 'CSDDD', 'Carbon Free Energy'],
    },
  },
  {
    id: 'art-003',
    title: 'Offshore Wind Microgrids: Unlocking Island & Remote Industrial Power',
    slug: 'offshore-wind-microgrids-remote-power',
    subtitle: 'Deploying floating wind turbines with green hydrogen generation for isolated mining and maritime operations.',
    content: `# Offshore Wind Microgrids: Unlocking Island & Remote Industrial Power

Remote mining compounds, offshore oil platform decommissioning sites, and island economies have historically relied on heavy fuel oil (HFO) or diesel generators. Today, floating offshore wind coupled with localized green hydrogen production presents an economically superior alternative.

## Engineering Resilience in Extreme Environments

Floating wind platforms equipped with 15MW turbines can achieve capacity factors in excess of **55%** in North Sea and North Atlantic wave climates. When paired with high-efficiency proton exchange membrane (PEM) electrolyzers, surplus wind power is stored as clean hydrogen gas.

### Key Milestones in Remote Wind Projects
- Zero operational fuel delivery vulnerability
- 94% reduction in site emissions within 18 months
- Levelized Cost of Energy (LCOE) parity achieved at $0.092/kWh`,
    summary: 'Exploring floating wind technology and local hydrogen synthesis to replace fossil fuel generation in island and industrial microgrids.',
    category: 'Wind Infrastructure',
    tags: ['Offshore Wind', 'Hydrogen', 'Microgrids', 'Heavy Industry', 'Decarbonization'],
    status: 'published',
    author: {
      name: 'Aisha Al-Hassan',
      role: 'Head of Offshore Renewables',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    publishedAt: '2026-07-15',
    updatedAt: '2026-07-15',
    readTimeMinutes: 7,
    views: 1890,
    seo: {
      metaTitle: 'Offshore Wind Microgrids & Green Hydrogen Advisory | Ginosko',
      metaDescription: 'Discover floating offshore wind microgrid solutions engineered for heavy industry and remote operational resilience.',
      focusKeywords: ['Offshore Wind', 'Microgrid', 'Green Hydrogen', 'LCOE', 'Remote Energy'],
    },
  },
];

export const INITIAL_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'proj-101',
    title: 'Helios Apex: 350MW Hybrid Solar & 500MWh Storage Hub',
    client: 'Apex Energy Partners / Regional Utility',
    region: 'Mojave Region, USA',
    category: 'Solar Energy',
    capacityMW: 350,
    co2OffsetTonsYear: 480000,
    investmentAmount: '$420M',
    completionYear: 2025,
    description: 'Turnkey development, engineering, and grid compliance management for one of North America’s largest hybrid solar-plus-storage facilities.',
    keyOutcomes: [
      'Eliminated 100% afternoon curtailment using automated SoC dispatch',
      'Provides zero-carbon energy to 110,000 corporate and residential subscribers',
      'Achieved commercial operation 2 months ahead of scheduled interconnections',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    status: 'published',
  },
  {
    id: 'proj-102',
    title: 'Nordic Wave: 280MW Offshore Wind Interconnect',
    client: 'Scandinavian Hydro Consortium',
    region: 'North Sea, Norway',
    category: 'Wind Infrastructure',
    capacityMW: 280,
    co2OffsetTonsYear: 610000,
    investmentAmount: '$650M',
    completionYear: 2026,
    description: 'Offshore transmission optimization and environmental impact monitoring for deep-water floating wind turbines.',
    keyOutcomes: [
      'Delivered 54.2% average annual capacity factor',
      'Pioneered zero-impact seabed dynamic cable anchoring system',
      'Secured 15-year corporate virtual PPA with major tech data centers',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    status: 'published',
  },
  {
    id: 'proj-103',
    title: 'Enterprise Campus Decarbonization & Smart Grid',
    client: 'Global Logistics Hub Corporation',
    region: 'Bavaria, Germany',
    category: 'Grid Modernization',
    capacityMW: 45,
    co2OffsetTonsYear: 65000,
    investmentAmount: '$58M',
    completionYear: 2025,
    description: 'Rooftop solar expansion, EV fleet fast-charging infrastructure, and microgrid EMS controller across 12 distribution centers.',
    keyOutcomes: [
      'Reduced facility grid electricity costs by 62% year-over-year',
      'Power resiliency buffer guarantees 48 hours of autonomous operation',
      'Recognized with European Corporate Green Infrastructure Award 2025',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    status: 'published',
  },
];

export const INITIAL_SERVICES: ServiceSolution[] = [
  {
    id: 'srv-01',
    title: 'Grid-Scale Renewable Engineering',
    tagline: 'Feasibility, interconnection design, & BESS integration for utility assets.',
    description: 'End-to-end engineering consultancy covering solar PV, onshore/offshore wind, battery energy storage systems (BESS), and high-voltage substation interconnections.',
    iconName: 'Zap',
    features: [
      'Solar & Wind Resource Assessment',
      'Dynamic Line Rating (DLR) Simulation',
      'BESS Degradation & Dispatch Modeling',
      'ISO Interconnection Queue Navigation',
    ],
    metricsHighlighted: '3.8 GW Total Assets Advisory',
    category: 'Solar Energy',
  },
  {
    id: 'srv-02',
    title: 'Strategic ESG & Scope 1-3 Advisory',
    tagline: 'CSRD readiness, carbon footprint audit, & corporate PPA procurement.',
    description: 'Guiding C-suite leaders through complex global climate regulations, decarbonization pathways, carbon risk hedging, and corporate Power Purchase Agreements.',
    iconName: 'ShieldCheck',
    features: [
      'CSRD & CSDDD Compliance Audit',
      'Corporate Virtual PPA Structuring',
      '24/7 Carbon-Free Energy Matching',
      'Supply Chain Scope 3 Benchmarking',
    ],
    metricsHighlighted: '$1.2B Corporate PPAs Structured',
    category: 'ESG & Sustainability',
  },
  {
    id: 'srv-03',
    title: 'Smart Grid & Microgrid Digitalization',
    tagline: 'Telemetry controllers, edge analytics, & dynamic load balancing.',
    description: 'Implementing high-reliability edge hardware, EMS control software, and telemetry systems to convert industrial facilities into resilient, grid-interactive assets.',
    iconName: 'Cpu',
    features: [
      'Industrial Energy Management System (EMS)',
      'Islanding & Resiliency Control',
      'Automated Demand Response Integration',
      'Real-Time Battery Telemetry',
    ],
    metricsHighlighted: '99.999% Microgrid Uptime Rate',
    category: 'Grid Modernization',
  },
  {
    id: 'srv-04',
    title: 'Energy Market Trading & Risk Strategy',
    tagline: 'Merchant price hedging, ancillary services bidding, & asset valuation.',
    description: 'Quantitative modeling and revenue stack optimization for independent power producers (IPPs), infrastructure funds, and energy traders.',
    iconName: 'TrendingUp',
    features: [
      'Day-Ahead & Real-Time Market Strategy',
      'Frequency Regulation Revenue Stacking',
      'Project Finance Valuation Models',
      'Regulatory Policy Impact Analysis',
    ],
    metricsHighlighted: '+24% Average IRR Improvement',
    category: 'Energy Trading',
  },
];

export const INITIAL_MEDIA: MediaAsset[] = [
  {
    id: 'med-01',
    name: 'Mojave_Solar_BESS_Hero.jpg',
    url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    sizeBytes: 2450000,
    dimensions: '3840x2160',
    uploadedAt: '2026-08-01',
    uploadedBy: 'Elena Vance',
    tags: ['solar', 'bess', 'hero', 'mojave'],
  },
  {
    id: 'med-02',
    name: 'Ginosko_Global_Energy_Report_2026.pdf',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    type: 'document',
    sizeBytes: 8120000,
    uploadedAt: '2026-07-28',
    uploadedBy: 'Marcus Thorne',
    tags: ['pdf', 'report', 'esg', 'corporate'],
  },
  {
    id: 'med-03',
    name: 'North_Sea_Wind_Turbines.jpg',
    url: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    sizeBytes: 3100000,
    dimensions: '4000x2667',
    uploadedAt: '2026-07-20',
    uploadedBy: 'Aisha Al-Hassan',
    tags: ['wind', 'offshore', 'norway'],
  },
];

export const INITIAL_LEADS: EnterpriseLead[] = [
  {
    id: 'lead-801',
    companyName: 'AeroTech Industrial Solutions',
    contactName: 'Robert Sterling',
    email: 'r.sterling@aerotech-ind.com',
    phone: '+1 (555) 392-1049',
    projectType: 'Campus Rooftop Solar + Microgrid BESS',
    estimatedBudget: '$5M - $10M',
    timeline: 'Q3 2026',
    message: 'We operate 4 manufacturing plants across the Midwest. Seeking RFP proposal for a 12MW solar + battery storage integration to lower peak demand tariffs and meet Scope 2 goals.',
    status: 'new',
    submittedAt: '2026-08-04 14:22',
    score: 'High',
    notes: 'Key industrial target account. Scheduled initial screening call.',
  },
  {
    id: 'lead-802',
    companyName: 'Vanguard European Logistics',
    contactName: 'Sophie Van Der Meer',
    email: 'sophie.v@vanguard-logistics.eu',
    phone: '+31 20 890 1234',
    projectType: 'CSRD Scope 3 Decarbonization & PPA',
    estimatedBudget: '$10M+',
    timeline: 'Immediate',
    message: 'Require expert advisory to structure a 50GWh/year Corporate Virtual PPA in Spain or Germany to offset our European fleet charging requirements.',
    status: 'in_contact',
    submittedAt: '2026-08-02 09:15',
    score: 'High',
    notes: 'Virtual meeting held on Aug 3. Proposal drafting in progress.',
  },
  {
    id: 'lead-803',
    companyName: 'Horizon Minerals Group',
    contactName: 'David Chen',
    email: 'd.chen@horizonminerals.com',
    phone: '+61 8 9200 4411',
    projectType: 'Offshore Hybrid Wind Microgrid Feasibility',
    estimatedBudget: '$20M+',
    timeline: 'Q1 2027',
    message: 'Looking into replacing diesel generators at our Western Australia coastal processing terminal with floating wind + green hydrogen backup.',
    status: 'proposal_sent',
    submittedAt: '2026-07-29 16:40',
    score: 'High',
    notes: 'Technical feasibility deck delivered. Awaiting board decision.',
  },
];

export const CURRENT_USER: UserProfile = {
  uid: 'usr-001',
  fullName: 'Alexandre Dubois',
  email: 'a.dubois@ginosko-energy.com',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  role: 'Super Admin',
  status: 'Active',
  lastLogin: '2026-08-05T08:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-08-05T08:00:00.000Z',
  id: 'usr-001',
  name: 'Alexandre Dubois',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  department: 'Executive Content & Digital Strategy',
};

export const INITIAL_ACTIVITY_LOGS: ActivityLogItem[] = [
  {
    id: 'act-001',
    user: 'Alexandre Dubois',
    action: 'published article',
    target: 'The 2026 Grid Modernization Mandate',
    timestamp: '2 hours ago',
    type: 'publish',
  },
  {
    id: 'act-002',
    user: 'Gemini AI Copilot',
    action: 'generated SEO metadata',
    target: 'Corporate Scope 3 Accounting Article',
    timestamp: '5 hours ago',
    type: 'update',
  },
  {
    id: 'act-003',
    user: 'System Lead Capture',
    action: 'received new RFP lead',
    target: 'AeroTech Industrial Solutions ($5M-$10M)',
    timestamp: 'Yesterday at 14:22',
    type: 'lead',
  },
  {
    id: 'act-004',
    user: 'Elena Vance',
    action: 'uploaded asset',
    target: 'Mojave_Solar_BESS_Hero.jpg',
    timestamp: '3 days ago',
    type: 'create',
  },
];
