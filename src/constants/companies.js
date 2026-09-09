// companies.js — Static data for the Company Profile page
// Two divisions of Oceao Enviro, rendered via tabbed interface

export const companies = [
  {
    id: 'management-solutions',
    name: 'Management Solutions',
    fullName: 'OCEAO-ENVIRO Management Solutions (India) Pvt. Ltd.',
    founded: 2015,
    tagline: 'Environment Engineering & Project Management Consultancy',
    whoWeAre:
      'A multi-disciplinary Environmental, Engineering & Project Management consulting organization providing comprehensive environmental solutions. We integrate global expertise with local knowledge to deliver sustainable solutions that exceed client expectations through unwavering commitment, reliability, and exceptional quality.',

    // Icon (Lucide) used as illustration placeholder in Who We Are section
    illustration: 'Building2',
    // Layout: icon on left for this company
    illustrationSide: 'left',

    keyBadge: 'Pan-India Presence',
    keyBadgeIcon: 'Globe',

    capabilities: [
      {
        id: 1,
        title: 'Environmental Impact Assessment & Compliance',
        description:
          'EIA, environmental commissioning, statutory clearances, consent to establish & operate',
        icon: 'FileText',
      },
      {
        id: 2,
        title: 'Water Management Solutions',
        description:
          'STP/ETP design & installation, rainwater harvesting, water conservation systems',
        icon: 'Droplet',
      },
      {
        id: 3,
        title: 'Waste Management & Pollution Control',
        description:
          'Solid waste, hazardous waste, e-waste management, river pollution abatement',
        icon: 'Trash2',
      },
      {
        id: 4,
        title: 'Safety, Health & Environment (SHE)',
        description:
          'EHS audits, policy design, compliance training, occupational health management',
        icon: 'Shield',
      },
    ],

    stats: [
      { value: '2015', label: 'Founded', icon: 'Calendar' },
      { value: 'Pan-India', label: 'Presence', icon: 'MapPin' },
      { value: '9', label: 'Major Cities', icon: 'Building' },
      { value: '100+', label: 'Clients Served', icon: 'Users' },
    ],

    // Certifications section: not shown for this company
    certifications: false,

    ctaText: 'Explore Our Services',
    ctaLink: '/services',
  },

  {
    id: 'research-labs',
    name: 'Research & Laboratories',
    fullName: 'OCEAO-ENVIRO Research & Analytics Laboratories (India) Pvt. Ltd.',
    founded: 2015,
    tagline: 'NABL Accredited & MoEF&CC Recognized Laboratory',
    whoWeAre:
      "India's leading NABL-accredited analytical laboratory providing comprehensive environmental testing and monitoring services. Our state-of-the-art facilities and certified professionals deliver accurate, reliable results that meet international standards for environmental compliance and research.",

    // Icon (Lucide) used as illustration placeholder in Who We Are section
    illustration: 'FlaskConical',
    // Layout: icon on right for this company (alternating)
    illustrationSide: 'right',

    keyBadge: 'NABL Accredited',
    keyBadgeIcon: 'BadgeCheck',

    capabilities: [
      {
        id: 1,
        title: 'NABL Accredited Testing',
        description:
          'Ambient air, water quality, soil analysis per ISO/IEC 17025:2017 standards',
        icon: 'FlaskConical',
      },
      {
        id: 2,
        title: 'Environmental Monitoring',
        description:
          'Real-time air, water, noise & DG set emissions monitoring with automated alerts',
        icon: 'Activity',
      },
      {
        id: 3,
        title: 'Laboratory Services',
        description:
          'Ambient air, drinking water, wastewater, soil, RO water, stack emission testing',
        icon: 'TestTube',
      },
      {
        id: 4,
        title: 'Research & Analytics',
        description:
          'Socio-economic research, data analysis, scientific studies for environmental projects',
        icon: 'BarChart3',
      },
    ],

    stats: [
      { value: '2015', label: 'Founded', icon: 'Calendar' },
      { value: 'NABL, QCI-NABET, ISO', label: 'Certifications', icon: 'BadgeCheck' },
      { value: 'All Major', label: 'Parameters Tested', icon: 'TestTube' },
      { value: '100+', label: 'Clients Served', icon: 'Users' },
    ],

    // Certifications section: shown only for Research & Labs
    certifications: true,
    certificationsList: [
      { name: 'NABL Accredited', icon: 'BadgeCheck' },
      { name: 'QCI-NABET Certified', icon: 'Award' },
      { name: 'ISO 14001 Certified', icon: 'ShieldCheck' },
      { name: 'ISO 45001 Certified', icon: 'ShieldCheck' },
      { name: 'ISO 9001 Certified', icon: 'ShieldCheck' }
    ],

    ctaText: 'View Laboratory Services',
    ctaLink: '/services',
  },
];

// ─── Shared Data ────────────────────────────────────────────────────────────

export const coreValues = [
  {
    icon: 'CheckCircle',
    title: 'Reliability',
    description: 'Consistent, dependable service delivery',
  },
  {
    icon: 'Trophy',
    title: 'Excellence',
    description: 'Exceptional quality in every solution',
  },
  {
    icon: 'Zap',
    title: 'Efficiency',
    description: 'On-time delivery, optimized processes',
  },
  {
    icon: 'Globe',
    title: 'Sustainability',
    description: 'Environmental protection and growth',
  },
];

export const companyMotto = 'Be a Part of Sustainability';

export const sharedPresence = {
  panIndia: true,
  locations: [
    'New Delhi',
    'Ghaziabad',
    'Jammu',
    'Bhopal'
  ],
  description:
    'With offices in multiple cities across India, we serve clients across the nation in every major industry and sector.',
};

export const industriesServed = [
  { label: 'Government & PSUs', color: 'blue' },
  { label: 'Construction & Real Estate', color: 'orange' },
  { label: 'Manufacturing', color: 'green' },
  { label: 'Infrastructure & Transportation', color: 'blue' },
  { label: 'Energy & Utilities', color: 'orange' },
  { label: 'Brick & Ceramic Industries', color: 'green' },
  { label: 'Healthcare', color: 'blue' },
  { label: 'Education & Research', color: 'orange' },
];
