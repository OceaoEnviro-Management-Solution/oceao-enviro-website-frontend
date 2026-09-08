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
