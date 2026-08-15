// src/constants/certifications.js

export const certifications = [
  {
    id: 1,
    category: "QCI-NABET",
    name: "QCI - NABET Accreditation",
    pdfUrl: "/src/assets/images/certifications/QCI-NABET.pdf",
    alt: "QCI NABET Certificate",
    description: "Our laboratory is accredited by the Quality Council of India (QCI) under the National Accreditation Board for Testing and Calibration Laboratories (NABET). This accreditation ensures compliance with ISO/IEC 17025:2017 standards for laboratory competence, impartiality, and operational excellence. It validates our commitment to providing reliable, internationally recognized testing and analytical services."
  },
  {
    id: 2,
    category: "ISO",
    name: "ISO 14001:2015 Certification",
    pdfUrl: "/src/assets/images/certifications/ISO-14001.pdf",
    alt: "ISO 14001 Environmental Management Certificate",
    description: "ISO 14001:2015 certification demonstrates our commitment to environmental management and sustainability. This certification establishes our systematic approach to identifying environmental aspects, managing risks, and minimizing our ecological footprint. It reflects our dedication to protecting the environment while delivering high-quality solutions to our clients."
  },
  {
    id: 3,
    category: "ISO",
    name: "ISO 45001:2018 Certification",
    pdfUrl: "/src/assets/images/certifications/ISO-45001.pdf",
    alt: "ISO 45001 Occupational Health & Safety Certificate",
    description: "ISO 45001:2018 certification certifies our robust occupational health and safety management system. This international standard ensures we maintain the highest standards of worker safety, hazard identification, and risk mitigation. Our certification demonstrates our commitment to creating a safe working environment for all employees and stakeholders."
  },
  {
    id: 4,
    category: "ISO",
    name: "ISO 9001:2015 Certification",
    pdfUrl: "/src/assets/images/certifications/ISO-9001.pdf",
    alt: "ISO 9001 Quality Management Certificate",
    description: "ISO 9001:2015 certification validates our comprehensive quality management system. This certification ensures consistent delivery of high-quality products and services through systematic processes, continuous improvement, and customer focus. It reflects our commitment to excellence in every aspect of our operations."
  },
  {
    id: 5,
    category: "NABL",
    name: "ISO/IEC 17025:2017 Certificate",
    pdfUrl: "/src/assets/images/certifications/NABL.pdf",
    alt: "NABL ISO/IEC 17025:2017 Certificate",
    description: "ISO/IEC 17025:2017 certification from NABL (National Accreditation Board for Testing and Calibration Laboratories) accredits our laboratory's technical competence and impartiality. This accreditation ensures our testing methods meet international standards, our results are accurate and reliable, and our laboratory operates under rigorous quality assurance protocols."
  },
  {
    id: 6,
    category: "Startup India",
    name: "Startup India Certificate - OEM Solutions",
    pdfUrl: "/src/assets/images/certifications/Startup India Certificate_OEMSIPL.pdf",
    alt: "Startup India Certificate - OEM Solutions",
    description: "Our recognition as a Startup India certified entity by the Government of India validates our innovative approach to environmental solutions and sustainable business practices. This certification supports emerging enterprises in driving economic growth, job creation, and technological advancement in the environmental sector."
  },
  {
    id: 7,
    category: "Startup India",
    name: "Startup India Certificate - Laboratory",
    pdfUrl: "/src/assets/images/certifications/LAB_Startup Certificate.pdf",
    alt: "Startup India Certificate - Laboratory",
    description: "Our laboratory division's recognition under the Startup India scheme demonstrates our commitment to innovation in analytical services and environmental testing. This certification highlights our role in advancing India's environmental compliance infrastructure and supporting sustainable development goals."
  }
];

export const certifications_HP = [
  {
    id: 1,
    category: "QCI-NABET",
    name: "QCI - NABET Accreditation",
    pdfUrl: "/src/assets/images/certifications/QCI-NABET.pdf",
    alt: "QCI NABET Certificate",
    description: "Our laboratory is accredited by the Quality Council of India (QCI) under the National Accreditation Board for Testing and Calibration Laboratories (NABET). This accreditation ensures compliance with ISO/IEC 17025:2017 standards for laboratory competence, impartiality, and operational excellence. It validates our commitment to providing reliable, internationally recognized testing and analytical services."
  },
  {
    id: 2,
    category: "NABL",
    name: "ISO/IEC 17025:2017 Certificate",
    pdfUrl: "/src/assets/images/certifications/NABL.pdf",
    alt: "NABL ISO/IEC 17025:2017 Certificate",
    description: "ISO/IEC 17025:2017 certification from NABL (National Accreditation Board for Testing and Calibration Laboratories) accredits our laboratory's technical competence and impartiality. This accreditation ensures our testing methods meet international standards, our results are accurate and reliable, and our laboratory operates under rigorous quality assurance protocols."
  }

]

// Computed categories with dynamic counts
export const certificateCategories = [
  { id: 'qci-nabet', label: 'QCI-NABET', count: certifications.filter(c => c.category === 'QCI-NABET').length },
  { id: 'iso', label: 'ISO', count: certifications.filter(c => c.category === 'ISO').length },
  { id: 'nabl', label: 'NABL', count: certifications.filter(c => c.category === 'NABL').length },
  { id: 'startup-india', label: 'Startup India', count: certifications.filter(c => c.category === 'Startup India').length }
];
