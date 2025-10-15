/**
 * Calculation Controller
 * Handles all calculation-related API requests
 */

const equityService = require('../services/equityService');
const businessService = require('../services/businessService');
const trustService = require('../services/trustService');
const wealthService = require('../services/wealthService');
const insuranceService = require('../services/insuranceService');
const allocationService = require('../services/allocationService');
const scenarioService = require('../services/scenarioService');

class CalculationController {
  /**
   * Calculate all metrics
   */
  async calculateAll(req, res) {
    try {
      const params = req.body;

      // Calculate expected return from allocations
      const expectedReturn = allocationService.calculateExpectedReturn(params.allocations);

      // Calculate insurance
      const insurance = insuranceService.calculate({
        insuranceSumAssured: params.insuranceSumAssured,
        insurancePaymentTerm: params.insurancePaymentTerm,
        childrenPerFamily: params.childrenPerFamily,
        annualExpenses: params.annualExpenses
      });

      // Calculate equity
      const equity = equityService.calculate({
        currentAssets: params.currentAssets,
        spendRate: params.spendRate,
        investmentReturn: params.investmentReturn,
        taxRate: params.taxRate,
        inflationRate: params.inflationRate,
        annualContribution: params.annualContribution
      });

      // Calculate business
      const business = businessService.calculate({
        businessRevenue: params.businessRevenue,
        profitMargin: params.profitMargin,
        currentFamilies: params.currentFamilies,
        additionalFamilies: params.additionalFamilies,
        yearsToSupport: params.yearsToSupport,
        inflationRate: params.inflationRate
      });

      // Calculate trust
      const trust = trustService.calculate({
        trustValue: params.trustValue,
        familyUnits: params.familyUnits,
        childrenPerFamily: params.childrenPerFamily,
        annualExpenses: params.annualExpenses,
        generationGap: params.generationGap,
        managementFee: params.managementFee,
        trustInflationRate: params.trustInflationRate,
        trustTaxRate: params.trustTaxRate,
        expectedReturn: expectedReturn,
        insuranceSumAssured: params.insuranceSumAssured
      });

      // Calculate wealth
      const wealth = wealthService.calculate({
        initialInvestment: params.initialInvestment,
        annualContribution: params.annualContributionWealth,
        investmentReturn: params.investmentReturnWealth,
        inflationRate: params.inflationRate,
        trackingYears: params.trackingYears
      });

      // Calculate allocation
      const allocation = allocationService.analyze(params.allocations);

      // Run scenarios
      const personalScenarios = scenarioService.runPersonalScenarios({
        currentAssets: params.currentAssets,
        spendRate: params.spendRate,
        investmentReturn: params.investmentReturn,
        taxRate: params.taxRate,
        inflationRate: params.inflationRate,
        annualContribution: params.annualContribution
      });

      const trustScenarios = scenarioService.runTrustScenarios({
        trustValue: params.trustValue,
        familyUnits: params.familyUnits,
        childrenPerFamily: params.childrenPerFamily,
        annualExpenses: params.annualExpenses,
        generationGap: params.generationGap,
        managementFee: params.managementFee,
        trustInflationRate: params.trustInflationRate,
        trustTaxRate: params.trustTaxRate,
        expectedReturn: expectedReturn,
        insuranceSumAssured: params.insuranceSumAssured
      });

      res.json({
        success: true,
        data: {
          equity,
          business,
          trust,
          wealth,
          insurance,
          allocation,
          scenarios: {
            personal: personalScenarios,
            trust: trustScenarios
          }
        }
      });
    } catch (error) {
      console.error('Calculation error:', error);
      res.status(500).json({
        success: false,
        error: 'Calculation failed',
        message: error.message
      });
    }
  }

  /**
   * Calculate equity only
   */
  async calculateEquity(req, res) {
    try {
      const result = equityService.calculate(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Calculate business only
   */
  async calculateBusiness(req, res) {
    try {
      const result = businessService.calculate(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Calculate trust only
   */
  async calculateTrust(req, res) {
    try {
      const result = trustService.calculate(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Calculate wealth only
   */
  async calculateWealth(req, res) {
    try {
      const result = wealthService.calculate(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Update allocation
   */
  async updateAllocation(req, res) {
    try {
      const { currentAllocations, changedAsset, newValue } = req.body;
      const updatedAllocations = allocationService.updateAllocation(
        currentAllocations,
        changedAsset,
        newValue
      );
      const analysis = allocationService.analyze(updatedAllocations);
      res.json({ success: true, data: analysis });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = new CalculationController();