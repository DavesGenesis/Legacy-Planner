// Asset Classes Configuration with Expected Returns
const ASSET_CLASSES = {
  stocks: { name: 'Stocks', return: 8.5 },
  bonds: { name: 'Bonds', return: 5.5 },
  realEstate: { name: 'Real Estate', return: 6.5 },
  cash: { name: 'Cash', return: 2.0 }
};

// Historical Inflation Data by Country (2004-2023 averages)
const INFLATION_DATA = {
  'USA': { 
    avg: 2.6, 
    data: [3.4, 3.2, 2.8, 3.8, -0.4, 1.6, 3.2, 2.1, 1.5, 1.6, 0.1, 1.3, 2.1, 2.4, 1.8, 1.2, 4.7, 8.0, 4.1, 3.1] 
  },
  'Singapore': { 
    avg: 2.2, 
    data: [0.5, 1.0, 2.1, 6.6, -0.4, 2.8, 5.2, 4.6, 2.4, 1.0, -0.5, -0.5, 0.6, 0.4, 0.6, -0.2, 2.3, 6.1, 4.8, 3.7] 
  },
  'China': { 
    avg: 2.6, 
    data: [1.8, 1.8, 4.8, 5.9, -0.7, 3.3, 5.4, 2.6, 2.6, 2.0, 1.4, 2.0, 1.6, 2.1, 2.9, 2.4, 0.9, 1.9, 0.7, 0.2] 
  },
  'Indonesia': { 
    avg: 6.1, 
    data: [6.4, 13.1, 6.6, 6.0, 4.8, 5.1, 5.4, 4.3, 6.4, 6.4, 4.0, 3.5, 3.8, 3.2, 2.8, 2.0, 1.6, 4.2, 3.8, 2.6] 
  },
  'Australia': { 
    avg: 2.8, 
    data: [2.7, 3.3, 2.3, 4.4, 1.8, 2.9, 3.3, 1.8, 2.5, 2.5, 1.5, 1.3, 1.9, 1.9, 1.6, 0.8, 3.0, 6.6, 5.8, 3.4] 
  },
  'Canada': { 
    avg: 2.2, 
    data: [2.2, 2.0, 2.2, 2.3, 0.3, 1.8, 2.9, 1.5, 0.9, 1.9, 1.1, 1.4, 1.6, 2.3, 1.9, 0.7, 3.4, 6.8, 3.9, 2.7] 
  },
  'UK': { 
    avg: 2.8, 
    data: [2.1, 2.3, 2.3, 3.6, 2.2, 3.3, 4.5, 2.8, 2.6, 1.5, 0.0, 0.7, 2.7, 2.5, 1.8, 0.9, 2.6, 9.1, 6.8, 3.5] 
  },
  'Hong Kong': { 
    avg: 2.5, 
    data: [1.1, 2.0, 5.3, 0.5, 2.4, 5.3, 4.1, 4.3, 4.4, 3.0, 2.4, 1.5, 1.6, 2.9, 0.3, 1.7, 2.1, 1.9, 1.7, 1.5] 
  }
};

// Default State Configuration
const DEFAULT_STATE = {
  // Personal Wealth Planning
  age: 45,
  currentAssets: 5000000,
  spendRate: 3.0,
  investmentReturn: 7.0,
  taxRate: 25.0,
  inflationRate: 2.6,
  annualContribution: 50000,
  country: 'USA',

  // Business Parameters
  businessRevenue: 5000000,
  profitMargin: 15.0,
  currentFamilies: 1,
  additionalFamilies: 2,
  yearsToSupport: 20,

  // Trust Parameters
  trustValue: 20000000,
  familyUnits: 1,
  childrenPerFamily: 2,
  annualExpenses: 150000,
  generationGap: 25,
  managementFee: 1.5,
  trustInflationRate: 2.6,
  trustTaxRate: 0.0,

  // Insurance Parameters
  insuranceSumAssured: 1000000,
  insurancePaymentTerm: 10,

  // Asset Allocation
  allocations: {
    stocks: 60,
    bonds: 30,
    realEstate: 10,
    cash: 0
  },

  // Wealth Accumulation
  initialInvestment: 1000000,
  annualContributionWealth: 100000,
  investmentReturnWealth: 8.0,
  trackingYears: 30
};

module.exports = {
  ASSET_CLASSES,
  INFLATION_DATA,
  DEFAULT_STATE
};