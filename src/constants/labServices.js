// labServices.js — All laboratory services data
// Used by: /services/laboratory-services
// Structure: Object keyed by category id → each has id, name, icon, description, items[]
// Each item: id, number, title, description, parameters (string | null)
// parameters: null = "Details adding soon" — shown only in expanded state
// Water, soil, air & noise parameters sourced from the NABL parameter list (agents/FINAL Parameter list ... .xlsx)

// Shared parameter lists — equivalent services must show identical parameters
// Air: Ambient = Indoor = Work Zone | Stack = DG Stack = Chimney = Boiler | Noise: Ambient = Indoor = Work Zone
const AMBIENT_AIR_PARAMS =
  'Particulate Matter (as PM₁₀), Particulate Matter (as PM₂.₅), Sulphur Dioxide (as SO₂), Nitrogen Dioxide (as NO₂), Ozone (as O₃), Ammonia (as NH₃)';

const STACK_PARAMS =
  'Particulate Matter (PM at 15% O₂), Sulphur Dioxide (SO₂), Oxide of Nitrogen (NOx as NO₂ at 15% O₂), Carbon Monoxide (as CO at 15% O₂), Carbon Dioxide (as CO₂), Oxygen (O₂), Ammonia (as NH₃)';

const AMBIENT_NOISE_PARAMS = 'Day Time Noise Level, Night Time Noise Level';

const DG_NOISE_PARAMS = 'Source Noise, DG Noise';

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
        parameters: AMBIENT_AIR_PARAMS,
      },
      {
        id: 2,
        number: '02',
        title: 'Indoor Air Quality Testing',
        description:
          'Testing of indoor air quality to assess occupant exposure to pollutants and ensure compliance with indoor air quality standards.',
        parameters: AMBIENT_AIR_PARAMS,
      },
      {
        id: 3,
        number: '03',
        title: 'DG Stack Emission Testing',
        description:
          'Testing of diesel generator stack emissions to measure pollutant discharge and ensure compliance with emission standards across various DG capacities.',
        parameters: STACK_PARAMS,
      },
      {
        id: 4,
        number: '04',
        title: 'Chimney Stack Testing',
        description:
          'Testing of chimney stack emissions to measure pollutant discharge and verify compliance with applicable emission standards.',
        parameters: STACK_PARAMS,
      },
      {
        id: 5,
        number: '05',
        title: 'Work Zone Air Quality Testing',
        description:
          'Testing of air quality within work zones and operational areas to assess worker exposure to pollutants and ensure occupational health standards.',
        parameters: AMBIENT_AIR_PARAMS,
      },
      {
        id: 6,
        number: '06',
        title: 'Boiler Stack Emission Testing',
        description:
          'Testing of boiler stack emissions to measure pollutant discharge and verify compliance with emission standards for various boiler capacities.',
        parameters: STACK_PARAMS,
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
          'pH at 25°C, Total Suspended Solids (as TSS), Total Dissolved Solids (as TDS), Chloride (as Cl), Chemical Oxygen Demand (as COD), Biochemical Oxygen Demand (BOD 3 Days at 27°C), Oil & Grease, Dissolved Oxygen (DO), Phosphorus (as P), Phenolic Compound (as C₆H₅OH), Nitrogen (Organic), Nitrogen (Ammonia) (as N-NH₃), Sulphate (as SO₄)',
      },
      {
        id: 2,
        number: '02',
        title: 'STP (Sewage Treatment Plant) Testing',
        description:
          'Testing of sewage treatment facility inlet and outlet for pollutant parameters to assess treatment efficiency and ensure environmental compliance.',
        parameters:
          'pH at 25°C, Total Suspended Solids (as TSS), Total Dissolved Solids (as TDS), Chloride (as Cl), Chemical Oxygen Demand (as COD), Biochemical Oxygen Demand (BOD 3 Days at 27°C), Oil & Grease, Dissolved Oxygen (DO), Phosphorus (as P), Phenolic Compound (as C₆H₅OH), Nitrogen (Organic), Nitrogen (Ammonia) (as N-NH₃), Sulphate (as SO₄)',
      },
      {
        id: 3,
        number: '03',
        title: 'RO / Drinking Water Testing',
        description:
          'Comprehensive testing of drinking water and reverse osmosis treated water for potability and safety compliance with drinking water standards.',
        parameters:
          'Temperature, Colour, Odour, Taste, pH at 25°C, Turbidity, Conductivity, Total Dissolved Solids (as TDS), Fluoride (as F), Total Alkalinity (as CaCO₃), Alkalinity (as HCO₃), Total Hardness (as CaCO₃), Calcium (as Ca), Chloride (as Cl), Carbon dioxide (as CO₂), Magnesium (as Mg), Nitrogen-Nitrate (as N-NO₃), Nitrogen (Nitrite) (as N-NO₂), Phosphorus (as P), Sulphide (as S²⁻), Chlorine Residual, Phenolic Compound (as C₆H₅OH), Sodium (as Na), Potassium (as K), Sulphate (as SO₄), Nitrogen (Ammonia) (as N-NH₃), Boron (as B), Aluminum (as Al), Cadmium (as Cd), Chromium (as Cr), Copper (as Cu), Iron (as Fe), Lead (as Pb), Manganese (as Mn), Mercury (as Hg), Selenium (as Se), Zinc (as Zn), Barium (as Ba), Beryllium (as Be), Lithium (as Li), Molybdenum (as Mo), Nickel (as Ni), Silver (as Ag), Cobalt (as Co)',
      },
      {
        id: 4,
        number: '04',
        title: 'Ground Water Testing',
        description:
          'Testing of ground water samples to assess quality and suitability for use, identifying potential contamination or compliance issues.',
        parameters:
          'Colour, Odour, Taste, pH at 25°C, Turbidity, Conductivity, Total Dissolved Solids (as TDS), Fluoride (as F), Total Alkalinity (as CaCO₃), Total Hardness (as CaCO₃), Calcium (as Ca), Chloride (as Cl), Carbon dioxide (as CO₂), Magnesium (as Mg), Nitrogen-Nitrate (as N-NO₃), Nitrogen (Nitrite) (as N-NO₂), Phosphorus (as P), Sulphide (as S²⁻), Chlorine Residual, Nitrogen (Ammonia) (as N-NH₃), Chemical Oxygen Demand (as COD), Dissolved Oxygen (DO), Sodium (as Na), Potassium (as K), Sulphate (as SO₄), Boron (as B), Aluminum (as Al), Cadmium (as Cd), Chromium (as Cr), Copper (as Cu), Iron (as Fe), Lead (as Pb), Manganese (as Mn), Mercury (as Hg), Selenium (as Se), Zinc (as Zn), Barium (as Ba), Beryllium (as Be), Lithium (as Li), Molybdenum (as Mo), Nickel (as Ni), Silver (as Ag), Cobalt (as Co)',
      },
      {
        id: 5,
        number: '05',
        title: 'Packaged Water Testing',
        description:
          'Testing of packaged drinking water to verify quality, safety and compliance with applicable packaged water standards.',
        parameters:
          'Colour, Odour, Taste, pH at 25°C, Turbidity, Total Dissolved Solids (as TDS), Fluoride (as F), Total Alkalinity (as HCO₃), Mineral Oil, Total Hardness (as CaCO₃), Calcium (as Ca), Chloride (as Cl), Magnesium (as Mg), Nitrogen-Nitrate (as N-NO₃), Nitrogen (Nitrite) (as N-NO₂), Sulphide (as S²⁻), Chlorine Residual, Phenolic Compound (as C₆H₅OH), Sodium (as Na), Potassium (as K), Sulphate (as SO₄), Boron (as B), Aluminum (as Al), Cadmium (as Cd), Chromium (as Cr), Copper (as Cu), Iron (as Fe), Lead (as Pb), Manganese (as Mn), Mercury (as Hg), Selenium (as Se), Zinc (as Zn), Barium (as Ba), Beryllium (as Be), Lithium (as Li), Molybdenum (as Mo), Nickel (as Ni), Silver (as Ag), Antimony (Sb), Cobalt (as Co)',
      },
      {
        id: 6,
        number: '06',
        title: 'Surface Water Testing',
        description:
          'Testing of surface water from ponds, rivers, lakes and other water bodies to assess water quality and suitability for intended use.',
        parameters:
          'pH at 25°C, Turbidity, Conductivity, Total Dissolved Solids (as TDS), Fluoride (as F), Total Hardness (as CaCO₃), Calcium (as Ca), Chloride (as Cl), Chemical Oxygen Demand (as COD), Biochemical Oxygen Demand (BOD 3 Days at 27°C), Oil & Grease, Dissolved Oxygen (DO), Nitrogen-Nitrate (as N-NO₃), Phosphorus (as P), Sulphate (as SO₄)',
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
        description:
          'Analysis of soil samples for physical, chemical and nutrient properties to assess soil quality and suitability for agricultural, construction and environmental purposes.',
        parameters:
          'Texture – Sand, Texture – Silt, Texture – Clay, Electrical Conductivity, pH at 25°C, Water Content (at 105°C), Water Holding Capacity, Cation Exchange Capacity, Organic Matter (OM), Organic Carbon (OC), Chloride (Cl), Soluble Sulphate (as SO₄), Total Soluble Solids, Total Kjeldahl Nitrogen (as N), Total Phosphorus (as P), Phosphorus Pentoxide (as P₂O₅), Sodium Absorption Ratio (SAR), Available Sodium (as Na), Available Potassium (as K), Exchangeable Calcium (as Ca)',
      },
      {
        id: 2,
        number: '02',
        title: 'Sludge Quality Testing',
        description:
          'Analysis of sludge from treatment plants for chemical and nutrient characteristics to support safe handling, reuse and disposal.',
        parameters:
          'pH at 25°C, Organic Matter (OM), Organic Carbon (OC), Chloride (Cl), Soluble Sulphate (as SO₄), Total Soluble Solids, Total Kjeldahl Nitrogen (as N), Total Phosphorus (as P), Phosphorus Pentoxide (as P₂O₅), Sodium Absorption Ratio (SAR), Available Sodium (as Na), Available Potassium (as K), Exchangeable Calcium (as Ca)',
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
        description:
          'Monitoring of day time and night time noise levels at outdoor locations to assess compliance with ambient noise standards.',
        parameters: AMBIENT_NOISE_PARAMS,
      },
      {
        id: 2,
        number: '02',
        title: 'Indoor Noise Testing',
        description:
          'Testing of noise levels inside buildings and facilities to assess exposure and ensure compliance with applicable noise standards.',
        parameters: AMBIENT_NOISE_PARAMS,
      },
      {
        id: 3,
        number: '03',
        title: 'DG Noise Testing',
        description:
          'Testing of diesel generator noise levels (inside and outside DG room) to assess noise exposure and ensure compliance with occupational noise standards.',
        parameters: DG_NOISE_PARAMS,
      },
      {
        id: 4,
        number: '04',
        title: 'Work Zone Noise Testing',
        description:
          'Testing of noise levels within work zones to assess worker exposure and ensure compliance with occupational noise standards.',
        parameters: AMBIENT_NOISE_PARAMS,
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
