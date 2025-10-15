// Type definitions for Legacy Planner

export interface ClientInfo {
  clientName: string;
  reportDate: string;
  advisorName: string;
  firmName: string;
  reportPurpose: string;
}

export interface PlanningState {
  // Personal Wealth
  age: number;
  currentAssets: number;
  spendRate: number;
  investmentReturn: number;
  taxRate: number;
  inflationRate: number;
  annualContribution: number;
  country: string;

  // Business
  businessRevenue: number;
  profitMargin: number;
  currentFamilies: number;
  additionalFamilies: number;
  yearsToSupport: number;

  // Trust
  trustValue: number;
  familyUnits: number;
  childrenPerFamily: number;
  annualExpenses: number;
  generationGap: number;
  managementFee: number;
  trustInflationRate: number;
  trustTaxRate: number;

  // Insurance
  insuranceSumAssured: number;
  insurancePaymentTerm: number;

  // Allocation
  allocations: {
    stocks: number;
    bonds: number;
    realEstate: number;
    cash: number;
  };

  // Wealth Accumulation
  initialInvestment: number;
  annualContributionWealth: number;
  investmentReturnWealth: number;
  trackingYears: number;
}

export interface EquityResult {
  currentAssets: number;
  currentSpend: number;
  assets20yr: number;
  spend20yr: number;
  equity20yr: number;
  assets40yr: number;
  spend40yr: number;
  equity40yr: number;
  portfolioValues: number[];
  equityRequiredValues: number[];
  insight: string;
  childrenSupported: number;
}

export interface BusinessResult {
  currentRevenue: number;
  currentProfit: number;
  targetRevenue: number;
  targetProfit: number;
  requiredGrowthRate: number;
  realGrowthRate: number;
  labels: number[];
  projectedData: number[];
  requiredData: number[];
  insight: string;
  totalFamilies: number;
}

export interface TrustResult {
  totalGenerations: number;
  finalValue: number;
  totalPolicies: number;
  totalSumAssured: number;
  history: Array<{
    year: number;
    value: number;
    familyUnits: number;
    policies: number;
  }>;
  generations: Array<{
    number: number;
    year: number;
    value: number;
    familyUnits: number;
  }>;
  insight: string;
}

export interface WealthResult {
  finalNominal: number;
  finalReal: number;
  growthMultiple: number;
  nominalValues: number[];
  realValues: number[];
  labels: number[];
  insight: string;
}

export interface InsuranceResult {
  sumAssured: number;
  paymentTerm: number;
  premiumPerPerson: number;
  totalAnnualPremium: number;
  totalInsurableMembers: number;
  coverageStatus: {
    status: string;
    message: string;
    class: string;
    deficit?: number;
  };
}

export interface AllocationResult {
  expectedReturn: number;
  riskLevel: string;
  allocations: {
    stocks: number;
    bonds: number;
    realEstate: number;
    cash: number;
  };
  isValid: boolean;
  total: number;
  breakdown: Array<{
    asset: string;
    name: string;
    allocation: number;
    expectedReturn: number;
  }>;
}

export interface ScenarioResult {
  name: string;
  equity40yr?: number;
  totalGenerations?: number;
  improvement: number;
  improvementClass: string;
}

export interface CalculationResults {
  equity: EquityResult;
  business: BusinessResult;
  trust: TrustResult;
  wealth: WealthResult;
  insurance: InsuranceResult;
  allocation: AllocationResult;
  scenarios: {
    personal: ScenarioResult[];
    trust: ScenarioResult[];
  };
}

export interface AssetClass {
  name: string;
  return: number;
}

export interface InflationData {
  avg: number;
  data: number[];
}