// visionMission.js — Static data for the Vision & Mission page
// Route: /about/Vision-Mission

export const visionMission = {
  page: {
    title: 'Vision & Mission',
    heroSubtitle: 'Our Purpose & Path Forward',
  },

  vision: {
    illustration: 'MountainIllustration', // Resolved to inline SVG component
    title: 'Our Vision',
    statement:
      'To be a world-class provider of adaptive environmental solutions in the global market.',
    description:
      'We envision a world where sustainable practices are the foundation of every business, and environmental stewardship drives economic growth. By leading with innovation and expertise, we aim to set new standards for environmental excellence globally.',
  },

  mission: {
    illustration: 'PathIllustration', // Resolved to inline SVG component
    title: 'Our Mission',
    statement:
      'To strengthen our position by providing extensive environmental services to our customers, stakeholders, and communities.',
    description:
      'We innovate and integrate expertise to solve emerging environmental challenges worldwide. Our mission is to deliver reliable, scientific solutions that protect ecosystems, ensure regulatory compliance, and enable sustainable business growth—creating lasting value for all stakeholders.',
  },

  pillars: [
    {
      id: 1,
      lucideIcon: 'Leaf',
      title: 'Sustainability',
      description:
        "We are committed to reducing environmental impact through responsible practices, renewable energy adoption, and circular economy principles. Sustainability is not just a goal—it's embedded in every project we undertake.",
      accentColor: '#017119',       // brand-green
      bgColor: '#E4F3E6',           // brand-green-light
    },
    {
      id: 2,
      lucideIcon: 'FlaskConical',
      title: 'Scientific Excellence',
      description:
        'Our work is grounded in rigorous science, accredited testing, and evidence-based decision-making. We maintain the highest laboratory standards and continuously invest in research to deliver solutions backed by credible data.',
      accentColor: '#0F1D75',       // brand-blue
      bgColor: '#EAEBF7',           // brand-blue-light
    },
    {
      id: 3,
      lucideIcon: 'Handshake',
      title: 'Responsible Solutions',
      description:
        'We design solutions that balance environmental protection with economic viability. Our approach considers long-term consequences, stakeholder interests, and regulatory requirements to create sustainable, implementable outcomes.',
      accentColor: '#E69500',       // brand-orange-dark
      bgColor: '#FFE7B8',           // brand-orange-light
    },
    {
      id: 4,
      lucideIcon: 'Settings2',
      title: 'Continuous Improvement',
      description:
        'We embrace innovation and learn from every project. Through feedback, process optimization, and emerging technology adoption, we continuously elevate our service quality and operational efficiency.',
      accentColor: '#014D11',       // brand-green-dark
      bgColor: '#D0EDCC',           // slightly deeper green-light
    },
  ],

  lookingAhead: {
    illustration: 'SunriseIllustration', // Resolved to inline SVG component
    label: 'Looking Ahead',
    statement: 'Building a Sustainable Future',
    description:
      'As environmental challenges evolve, so do we. By 2030, we aim to expand our impact across India and beyond—scaling our accredited laboratory capabilities, pioneering innovative consulting solutions, and empowering 500+ organizations to achieve their sustainability goals. Our vision is clear: a world where environmental responsibility and business success are inseparable.',
    cta: {
      text: 'Partner With Us',
      link: '/contact',
    },
  },
};

// Named exports for direct component consumption
export const pillars = visionMission.pillars;

export const heroData = {
  title: visionMission.page.title,
  subtitle: visionMission.page.heroSubtitle,
};
