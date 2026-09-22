// labServices.js — All laboratory services data
// Used by: /services/laboratory-services
// Structure: Object keyed by category id → each has id, name, icon, description, items[]
// Each item: id, number, title, description, parameters (string | null)
// parameters: null = "Details adding soon" — shown only in expanded state

export const LAB_SERVICES_DATA = {
  air: {
    id: 'air',
    name: 'Air',
    icon: '💨',
    description: 'Air quality monitoring and emission testing across various sources and environments.',
    items: [
      {
        id: 1,
        number: '01',
        title: 'Ambient Air Quality Monitoring',
        description:
          'Testing of ambient air quality at outdoor locations to assess atmospheric pollution levels and compliance with air quality standards.',
        parameters: 'PM-2.5, PM-10, SO2, NO2, CO, O3, NH3, Pb',
      },
      {
        id: 2,
        number: '02',
        title: 'Indoor Air Quality Testing',
        description: 'Details adding soon',
        parameters: null,
      },
      {
        id: 3,
        number: '03',
        title: 'DG Stack Emission Testing',
        description:
          'Testing of diesel generator stack emissions to measure pollutant discharge and ensure compliance with emission standards across various DG capacities.',
        parameters: 'PM, SO2, CO, NO2, NMHC, HC, Smoke',
      },
      {
        id: 4,
        number: '04',
        title: 'Chimney Stack Testing',
        description: 'Details adding soon',
        parameters: null,
      },
      {
        id: 5,
        number: '05',
        title: 'Work Zone Air Quality Testing',
        description:
          'Testing of air quality within work zones and operational areas to assess worker exposure to pollutants and ensure occupational health standards.',
        parameters: 'PM-2.5, PM-10, SO2, NO2, CO, TVOC, Ammonia, O3 & Air Flow rate',
      },
      {
        id: 6,
        number: '06',
        title: 'Boiler Stack Emission Testing',
        description:
          'Testing of boiler stack emissions to measure pollutant discharge and verify compliance with emission standards for various boiler capacities.',
        parameters: 'PM, SO2, CO, NO2, NMHC, HC',
      },
    ],
  },

  water: {
    id: 'water',
    name: 'Water',
    icon: '💧',
    description: 'Comprehensive water quality testing for various sources and treatment processes.',
    items: [
      {
        id: 1,
        number: '01',
        title: 'ETP (Effluent Treatment Plant) Testing',
        description:
          'Testing of waste water treatment facility inlet and outlet for pollutant parameters to assess treatment effectiveness and regulatory compliance.',
        parameters:
          'pH, Colour, Conductivity, Temperature, Oil & Grease, Odour, TSS, TDS, COD, BOD5 days, Total Hardness, Chloride, Sulphate, Phenolic Compound, Hexavalent Chromium, Lead, Copper, Mercury, Manganese, Zinc, Nickel, Cadmium, Iron, Chromium, Antimony, Selenium, Cobalt, Total Coliform, E.Coli., Sulphide as S²⁻',
      },
      {
        id: 2,
        number: '02',
        title: 'STP (Sewage Treatment Plant) Testing',
        description:
          'Testing of sewage treatment facility inlet and outlet for pollutant parameters to assess treatment efficiency and ensure environmental compliance.',
        parameters:
          'pH, Colour, Conductivity, Oil & Grease, Odour, TSS, TDS, COD, BOD5 days, Total Nitrogen, Ammonical Nitrogen, Hexavalent Chromium, Lead, Mercury, Zinc, Nickel, Arsenic, Antimony, Total Coliform, E.Coli.',
      },
      {
        id: 3,
        number: '03',
        title: 'RO / Drinking Water Testing',
        description:
          'Comprehensive testing of drinking water and reverse osmosis treated water for potability and safety compliance with drinking water standards.',
        parameters:
          'All Drinking Water Parameters (IS 10500) including: Chemical, Metal, Chloramine (as Cl₂), Anionic Detergents (as MBAS), Arsenic (as As), Hexavalent Chromium (as Cr⁶⁺), Cyanide (as CN⁻)',
      },
      {
        id: 4,
        number: '04',
        title: 'Ground Water Testing',
        description:
          'Testing of ground water samples to assess quality and suitability for use, identifying potential contamination or compliance issues.',
        parameters:
          'pH, Colour, Odour, Turbidity, TDS, Total Hardness, Total Alkalinity, Silica, Dissolved Iron, Total Coliform, E.Coli.',
      },
      {
        id: 5,
        number: '05',
        title: 'Packaged Water Testing',
        description: 'Details adding soon',
        parameters: null,
      },
      {
        id: 6,
        number: '06',
        title: 'Surface Water Testing',
        description: 'Details adding soon',
        parameters: null,
      },
    ],
  },

  soil: {
    id: 'soil',
    name: 'Soil',
    icon: '🌱',
    description: 'Soil and sludge quality assessment for environmental and operational purposes.',
    items: [
      {
        id: 1,
        number: '01',
        title: 'Soil Quality Testing',
        description: 'Details adding soon',
        parameters: null,
      },
      {
        id: 2,
        number: '02',
        title: 'Sludge Quality Testing',
        description: 'Details adding soon',
        parameters: null,
      },
    ],
  },

  noise: {
    id: 'noise',
    name: 'Noise',
    icon: '🔊',
    description: 'Noise level monitoring and assessment across different environments and sources.',
    items: [
      {
        id: 1,
        number: '01',
        title: 'Ambient Noise Monitoring',
        description: 'Details adding soon',
        parameters: null,
      },
      {
        id: 2,
        number: '02',
        title: 'Indoor Noise Testing',
        description: 'Details adding soon',
        parameters: null,
      },
      {
        id: 3,
        number: '03',
        title: 'DG Noise Testing',
        description:
          'Testing of diesel generator noise levels (inside and outside DG room) to assess noise exposure and ensure compliance with occupational noise standards.',
        parameters: 'Noise Level dB (Inside & Outside DG Room)',
      },
      {
        id: 4,
        number: '04',
        title: 'Work Zone Noise Testing',
        description: 'Details adding soon',
        parameters: null,
      },
    ],
  },
};

// ── Helper functions ──────────────────────────────────────────────────────────

/** Returns array of {id, name, icon, description} for all 4 categories */
export const getAllLabCategories = () => {
  return Object.values(LAB_SERVICES_DATA).map((cat) => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon,
    description: cat.description,
  }));
};

/** Returns full category object (with items[]) by id */
export const getLabCategoryById = (categoryId) => {
  return LAB_SERVICES_DATA[categoryId] ?? null;
};

/** Flat array of all items across all categories — useful for future search */
export const getAllLabItems = () => {
  return Object.values(LAB_SERVICES_DATA).flatMap((cat) =>
    cat.items.map((item) => ({ ...item, categoryId: cat.id, categoryName: cat.name }))
  );
};
