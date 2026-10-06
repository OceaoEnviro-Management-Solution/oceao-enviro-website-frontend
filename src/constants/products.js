// products.js — Product catalogue for /products and the Home "Featured Products" section.
// Products with more than one image render as a carousel.

import PM25PM10Sensors from '../assets/images/products/PM2.5&10.jpg';
import AntismogGun from '../assets/images/products/Antismog Gun.jpg';
import AntismogGun2 from '../assets/images/products/Antismog Gun2.jpg';
import PTZCamera from '../assets/images/products/PTZ Camera.jpg';
import SolarStreetLight from '../assets/images/products/Solar Street Light.jpg';
import SolarPanel from '../assets/images/products/Solar Panel.jpg';
import DigitalFlowMeter from '../assets/images/products/Digital Flow Meter.jpg';
import Piezometer from '../assets/images/products/Piezometer.jpg';

export const PRODUCT_CATEGORIES = ['Air Quality', 'Water', 'Solar & Energy', 'Monitoring'];

export const PRODUCTS = [
  {
    id: 1,
    name: 'PM 2.5 & PM 10 Sensors',
    category: 'Air Quality',
    images: [PM25PM10Sensors],
    description:
      'Advanced particulate matter sensors for real-time monitoring of PM 2.5 and PM 10 concentrations. Essential for air quality assessment and compliance tracking.',
  },
  {
    id: 2,
    name: 'Antismog Gun',
    category: 'Air Quality',
    images: [AntismogGun, AntismogGun2],
    description:
      'High-efficiency misting system designed to suppress dust and particulates in construction sites and industrial areas. Environmentally friendly air quality management solution.',
  },
  {
    id: 3,
    name: 'PTZ Camera',
    category: 'Monitoring',
    images: [PTZCamera],
    description:
      'Pan-Tilt-Zoom camera system for remote environmental monitoring, site surveillance, and real-time observation of operational areas with high-resolution imaging.',
  },
  {
    id: 4,
    name: 'Solar Street Light',
    category: 'Solar & Energy',
    images: [SolarStreetLight],
    description:
      'Energy-efficient solar-powered lighting solution for streets, pathways, and outdoor areas. Sustainable alternative reducing operational costs and carbon footprint.',
  },
  {
    id: 5,
    name: 'Solar Panel',
    category: 'Solar & Energy',
    images: [SolarPanel],
    description:
      'High-efficiency photovoltaic panels for renewable energy generation. Ideal for powering monitoring equipment, facilities, and supporting sustainability initiatives.',
  },
  {
    id: 6,
    name: 'Digital Flow Meter',
    category: 'Water',
    images: [DigitalFlowMeter],
    description:
      'Precision flow measurement instrument for water quality monitoring, wastewater treatment, and resource management with accurate digital readings.',
  },
  {
    id: 7,
    name: 'Piezometer',
    category: 'Water',
    images: [Piezometer],
    description:
      'Groundwater monitoring device for measuring water table levels and pore water pressure. Critical tool for hydrogeological investigation and water resource assessment.',
  },
];

export const getProductById = (id) => PRODUCTS.find((product) => product.id === id);

export const getTotalProducts = () => PRODUCTS.length;

export const laboratoryCapabilities = [
  "Ambient Air Quality Monitoring",
  "Drinking Water Testing",
  "Wastewater Analysis",
  "Soil & Sediment Testing",
  "Noise Level Monitoring",
  "Emission & Stack Testing",
  "Microbial & Hazardous Waste Analysis",
  "Acoustic & Vibration Monitoring"
];
