import imgEnvironmentalMonitoring from '../assets/images/homePage/serviceSection/Environmental-Monitoring.avif';
import imgLaboratoryServices from '../assets/images/homePage/serviceSection/Laboratory-Services.jpeg';
import imgConsultancy from '../assets/images/homePage/Consultancy.jpeg';
import imgFireSafetyAudits from '../assets/images/homePage/serviceSection/Fire-Safety-Audits.jpeg';
import imgWasteManagement from '../assets/images/homePage/serviceSection/Waste-Management.avif';

export const services = [
  {
    id: 1,
    title: "Environmental Services",
    description: "End-to-end environmental assessment and compliance support covering EIA, environmental clearances, biodiversity studies, audits, social assessments, and statutory consents.",
    image: imgEnvironmentalMonitoring
  },
  {
    id: 2,
    title: "Laboratory Services",
    description: "NABL-accredited testing for ambient air, noise, soil, water, wastewater, DG stack emissions, and DG noise monitoring.",
    image: imgLaboratoryServices
  },
  {
    id: 3,
    title: "Water Resource Management",
    description: "Sustainable water management solutions covering groundwater permissions, rainwater harvesting, and hydrological and hydrogeological investigations.",
    image: imgConsultancy
  },
  {
    id: 4,
    title: "Products",
    description: "Specialized environmental monitoring and telemetry products designed to support reliable field measurement, data collection, and monitoring applications.",
    image: imgFireSafetyAudits
  },
  {
    id: 5,
    title: "Green Resource & Energy",
    description: "Sustainable resource planning with support for GRIHA ratings and traffic studies to promote environmentally responsible and efficient development.",
    image: imgWasteManagement
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE DETAIL PAGES DATA
// Used by: /services, /services/environmental-services, etc.
// The `services` array above is used by the Home page — do not remove it.
// ─────────────────────────────────────────────────────────────────────────────

export const SERVICE_CATEGORIES = [
  {
    id: 'environmental-services',
    name: 'Environmental Services',
    slug: 'environmental-services',
    description: 'Comprehensive environmental assessment and compliance support for projects and operations.',
    hero: {
      title: 'Environmental Services',
      subtitle: 'Assessment, Compliance & Support',
      eyebrow: 'Our Services',
    },
    intro:
      'Our Environmental Services team provides comprehensive assessment and compliance support for projects across industries. We help identify environmental considerations, support regulatory requirements, and develop mitigation strategies to ensure sustainable project outcomes.',
    items: [
      {
        id: 1,
        number: '01',
        title: 'Environment Impact Assessment (EIA)',
        description:
          "Assessment of a proposed project's potential environmental impacts to support planning, mitigation and applicable regulatory requirements.",
        keyAreas: [
          'Baseline environmental assessment',
          'Impact identification and assessment',
          'Mitigation and environmental management planning',
          'Regulatory requirement support',
        ],
      },
      {
        id: 2,
        number: '02',
        title: 'Environment Clearance (EC)',
        description:
          'Support for environmental clearance requirements, documentation and applicable regulatory submission processes for development projects.',
        keyAreas: [
          'Applicability and requirement assessment',
          'Documentation and proposal preparation',
          'Regulatory submission support',
          'Compliance requirement support',
        ],
      },
      {
        id: 3,
        number: '03',
        title: 'Ecological and Biodiversity Survey',
        description:
          'Assessment of ecological features, biodiversity and sensitive environmental receptors relevant to a project area.',
        keyAreas: [
          'Flora and fauna assessment',
          'Habitat and ecological features',
          'Sensitive receptor identification',
          'Ecological impact considerations',
        ],
      },
      {
        id: 4,
        number: '04',
        title: 'EHS Audit',
        description:
          'Assessment of environmental, health and safety practices against applicable requirements and site-specific controls.',
        keyAreas: [
          'Environmental compliance review',
          'Health and safety practices',
          'Site inspection and observations',
          'Corrective-action identification',
        ],
      },
      {
        id: 5,
        number: '05',
        title: 'Environmental Compliances',
        description:
          'Support for reviewing and maintaining environmental compliance requirements applicable to projects and operations.',
        keyAreas: [
          'Applicable environmental requirements',
          'Compliance review',
          'Periodic compliance support',
          'Gap identification',
        ],
      },
      {
        id: 6,
        number: '06',
        title: 'Risk & Hazardous Assessment Studies',
        description:
          'Assessment of risks associated with hazardous materials, activities and project conditions.',
        keyAreas: [
          'Hazard identification',
          'Risk assessment',
          'Potential consequence evaluation',
          'Risk reduction measures',
        ],
      },
      {
        id: 7,
        number: '07',
        title: 'Wild Life Clearance',
        description:
          'Support for wildlife clearance requirements where a project involves applicable wildlife or protected-area considerations.',
        keyAreas: [
          'Applicability assessment',
          'Project-area documentation',
          'Clearance process support',
          'Regulatory coordination support',
        ],
      },
      {
        id: 8,
        number: '08',
        title: 'Forest Clearance (FC)',
        description:
          'Support for projects requiring applicable forest clearance processes, documentation and regulatory submissions.',
        keyAreas: [
          'Applicability assessment',
          'Project and land-use documentation',
          'Clearance proposal support',
          'Regulatory submission support',
        ],
      },
      {
        id: 9,
        number: '09',
        title: 'Green Building Certification (GRIHA, IGBC & LEED)',
        description:
          'Support for green building assessment and certification requirements under applicable rating systems such as GRIHA, IGBC and LEED.',
        keyAreas: [
          'Rating-system requirement review',
          'Sustainability criteria assessment',
          'Documentation support',
          'Certification process support',
        ],
      },
      {
        id: 10,
        number: '10',
        title: 'Traffic Study Assessment',
        description:
          'Assessment of traffic and mobility conditions associated with a proposed development to support project planning and applicable requirements.',
        keyAreas: [
          'Traffic and access assessment',
          'Existing and projected traffic conditions',
          'Traffic impact considerations',
          'Access and circulation recommendations',
        ],
      },
      {
        id: 11,
        number: '11',
        title: 'Sustainability and ESG Advisory and Assessment',
        description:
          'Advisory and assessment support for evaluating sustainability performance and relevant environmental and ESG considerations.',
        keyAreas: [
          'Sustainability performance assessment',
          'Environmental aspects and indicators',
          'ESG-related gap assessment',
          'Improvement recommendations',
        ],
      },
      {
        id: 12,
        number: '12',
        title: 'Environmental Due Diligence',
        description:
          'Review of environmental aspects, liabilities and compliance considerations associated with a site, asset or transaction.',
        keyAreas: [
          'Environmental compliance review',
          'Site and operational assessment',
          'Potential environmental liabilities',
          'Risk and gap identification',
        ],
      },
    ],
  },

  {
    id: 'social-assessment-studies',
    name: 'Social Assessment Studies',
    slug: 'social-assessment-studies',
    description: 'Comprehensive social impact assessment and stakeholder engagement support.',
    hero: {
      title: 'Social Assessment Studies',
      subtitle: 'Impact Assessment & Stakeholder Support',
      eyebrow: 'Our Services',
    },
    intro:
      'Our Social Assessment team provides comprehensive impact assessment and stakeholder engagement support for projects. We help identify social considerations, assess impacts on communities and vulnerable groups, and develop strategies to support sustainable and inclusive project outcomes.',
    items: [
      {
        id: 1,
        number: '01',
        title: 'Social Impact Assessment',
        description:
          'Assessment of the social impacts of a proposed project on affected communities and stakeholders.',
        keyAreas: [
          'Baseline social conditions',
          'Impact identification',
          'Stakeholder and community assessment',
          'Mitigation and management measures',
        ],
      },
      {
        id: 2,
        number: '02',
        title: 'Social Audits',
        description:
          'Assessment of social performance, practices and compliance against applicable requirements or defined criteria.',
        keyAreas: [
          'Document and record review',
          'Stakeholder-related assessment',
          'Social compliance review',
          'Findings and recommendations',
        ],
      },
      {
        id: 3,
        number: '03',
        title: 'Land Acquisition & Resettlement Assessment',
        description:
          'Assessment of social impacts and resettlement considerations associated with land acquisition for projects.',
        keyAreas: [
          'Affected households and communities',
          'Land and livelihood impacts',
          'Resettlement considerations',
          'Mitigation and support measures',
        ],
      },
      {
        id: 4,
        number: '04',
        title: 'Baseline Socio-Economic Survey',
        description:
          'Collection and assessment of baseline socio-economic information for communities and project-affected areas.',
        keyAreas: [
          'Demographic profile',
          'Socio-economic conditions',
          'Livelihood and income profile',
          'Community-level baseline information',
        ],
      },
      {
        id: 5,
        number: '05',
        title: 'Vulnerable Group Assessment',
        description:
          'Assessment of vulnerable groups that may experience different or disproportionate social impacts from a project.',
        keyAreas: [
          'Identification of vulnerable groups',
          'Socio-economic conditions',
          'Potential project impacts',
          'Targeted mitigation considerations',
        ],
      },
      {
        id: 6,
        number: '06',
        title: 'Livelihood Assessment',
        description:
          'Assessment of livelihood conditions and potential livelihood impacts associated with project activities or land acquisition.',
        keyAreas: [
          'Existing livelihood patterns',
          'Income and occupation profile',
          'Potential livelihood impacts',
          'Livelihood restoration considerations',
        ],
      },
      {
        id: 7,
        number: '07',
        title: 'Community Health & Safety Assessment',
        description:
          'Assessment of potential project-related risks and impacts affecting the health and safety of surrounding communities.',
        keyAreas: [
          'Community health considerations',
          'Safety risk identification',
          'Potential project-related impacts',
          'Mitigation and management measures',
        ],
      },
      {
        id: 8,
        number: '08',
        title: 'Social Risk Assessment',
        description:
          'Identification and assessment of social risks associated with projects, communities and stakeholders.',
        keyAreas: [
          'Social risk identification',
          'Stakeholder and community considerations',
          'Risk assessment',
          'Mitigation and monitoring measures',
        ],
      },
      {
        id: 9,
        number: '09',
        title: 'CSR / Community Development Assessment',
        description:
          'Assessment of community needs and development priorities to support focused CSR or community development initiatives.',
        keyAreas: [
          'Community needs assessment',
          'Priority development areas',
          'Stakeholder consultation',
          'Recommendations for community initiatives',
        ],
      },
      {
        id: 10,
        number: '10',
        title: 'Stakeholder Engagement & Consultation',
        description:
          'Facilitation and support for stakeholder engagement and community consultation processes.',
        keyAreas: [
          'Stakeholder identification and mapping',
          'Engagement strategy development',
          'Consultation facilitation',
          'Documentation and reporting',
        ],
      },
    ],
  },

  {
    id: 'statutory-noc',
    name: 'Statutory NOCs / Permissions / Clearances',
    slug: 'statutory-noc',
    description: 'Support for regulatory approvals and statutory clearance processes.',
    hero: {
      title: 'Statutory NOCs & Permissions',
      subtitle: 'Regulatory Approvals & Clearances',
      eyebrow: 'Our Services',
    },
    intro:
      'Our Statutory Services team provides comprehensive support for obtaining regulatory approvals and statutory clearances. We help identify applicable requirements, prepare documentation, and manage submissions to relevant authorities to ensure timely project approvals.',
    items: [
      {
        id: 1,
        number: '01',
        title: 'Consent To Establish (CTE)',
        description:
          'Support for obtaining applicable Consent to Establish requirements before establishing or expanding regulated projects or facilities.',
        keyAreas: [
          'Applicability assessment',
          'Application and documentation support',
          'Regulatory submission support',
          'Compliance-related inputs',
        ],
      },
      {
        id: 2,
        number: '02',
        title: 'Consent To Operate (CTO)',
        description:
          'Support for applicable Consent to Operate requirements for projects or facilities commencing or continuing regulated operations.',
        keyAreas: [
          'Applicability assessment',
          'Documentation and application support',
          'Regulatory submission support',
          'Compliance-related inputs',
        ],
      },
      {
        id: 3,
        number: '03',
        title: 'Height Clearance from AAI/IAF',
        description:
          'Support for applicable height-clearance requirements for projects where aviation-related restrictions or approvals apply.',
        keyAreas: [
          'Applicability assessment',
          'Project and structure information',
          'Documentation support',
          'Regulatory submission support',
        ],
      },
      {
        id: 4,
        number: '04',
        title: 'Tree Felling / Transplantation NOC',
        description:
          'Support for applicable permissions and documentation related to tree felling or transplantation for project development.',
        keyAreas: [
          'Tree inventory / project information',
          'Applicability assessment',
          'Permission documentation',
          'Regulatory submission support',
        ],
      },
      {
        id: 5,
        number: '05',
        title: 'Fire NOC',
        description:
          'Support for applicable fire safety approval and NOC requirements for projects and facilities.',
        keyAreas: [
          'Requirement assessment',
          'Documentation support',
          'Coordination for applicable approval process',
          'Compliance-related inputs',
        ],
      },
      {
        id: 6,
        number: '06',
        title: 'Mining Permit',
        description:
          'Support for applicable permissions and documentation associated with mining activities and project requirements.',
        keyAreas: [
          'Applicability assessment',
          'Project and site documentation',
          'Permission / application support',
          'Regulatory submission support',
        ],
      },
      {
        id: 7,
        number: '07',
        title: 'Water / Sewerage / Storm Water NOCs',
        description:
          'Support for applicable permissions or NOCs related to domestic water, sewerage and storm-water arrangements.',
        keyAreas: [
          'Water requirement assessment',
          'System and project documentation',
          'Applicable NOC / permission support',
          'Regulatory submission inputs',
        ],
      },
    ],
  },

  {
    id: 'water-resource-management',
    name: 'Water Resource Management',
    slug: 'water-resource-management',
    description: 'Water resource assessment and groundwater management support.',
    hero: {
      title: 'Water Resource Management',
      subtitle: 'Assessment & Groundwater Support',
      eyebrow: 'Our Services',
    },
    intro:
      'Our Water Resource Management team provides comprehensive water assessment and management support. We help evaluate groundwater resources, plan water conservation measures, and support regulatory compliance for water-related project requirements.',
    items: [
      {
        id: 1,
        number: '01',
        title: 'Ground Water Permission from CGWA & State Authority',
        description:
          'Support for applicable groundwater permission requirements from CGWA and relevant state authorities.',
        keyAreas: [
          'Groundwater requirement assessment',
          'Project and water-use documentation',
          'Permission application support',
          'Regulatory submission support',
        ],
      },
      {
        id: 2,
        number: '02',
        title: 'Rain Water Harvesting and Artificial Recharge Study',
        description:
          'Assessment and planning support for rainwater harvesting and artificial groundwater recharge measures.',
        keyAreas: [
          'Site and water-flow assessment',
          'Rainwater harvesting potential',
          'Artificial recharge considerations',
          'Recommendations and planning inputs',
        ],
      },
      {
        id: 3,
        number: '03',
        title: 'Hydrological and Hydrogeological Investigation',
        description:
          'Investigation of surface-water and groundwater conditions to support water-resource planning and project requirements.',
        keyAreas: [
          'Hydrological assessment',
          'Hydrogeological assessment',
          'Water-resource characterization',
          'Investigation findings and recommendations',
        ],
      },
    ],
  },
];

// ── Helper functions ──────────────────────────────────────────────────────────

/** Find a service category by its URL slug */
export const getCategoryBySlug = (slug) => {
  return SERVICE_CATEGORIES.find((cat) => cat.slug === slug);
};

/** Return all categories except the current one (for Explore Other Services) */
export const getOtherCategories = (currentSlug) => {
  return SERVICE_CATEGORIES.filter((cat) => cat.slug !== currentSlug);
};

/** Grid column config used by ServicesHubMega */
export const SERVICES_GRID_CONFIG = {
  columns: 3,
  columnResponsive: { desktop: 3, tablet: 2, mobile: 1 },
};
