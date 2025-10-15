/**
 * Scenario Service
 * Handles what-if scenario analysis
 */

const equityService = require('./equityService');
const trustService = require('./trustService');

class ScenarioService {
  /**
   * Run personal wealth scenarios
   * @param {Object} baseParams - Base calculation parameters
   * @returns {Array} Scenario results
   */
  runPersonalScenarios(baseParams) {
    const baseEquity = equityService.calculate(baseParams);

    const scenarios = [
      { 
        name: 'Increase Assets by $1M', 
        params: { ...baseParams, currentAssets: baseParams.currentAssets + 1000000 } 
      },
      { 
        name: 'Reduce Spend Rate to 2%', 
        params: { ...baseParams, spendRate: 2.0 } 
      },
      { 
        name: 'Increase Return to 9%', 
        params: { ...baseParams, investmentReturn: 9.0 } 
      },
      { 
        name: 'Add $100K Annual Contribution', 
        params: { ...baseParams, annualContribution: baseParams.annualContribution + 100000 } 
      }
    ];

    return scenarios.map(scenario => {
      const result = equityService.calculate(scenario.params);
      const improvement = result.equity40yr - baseEquity.equity40yr;

      return {
        name: scenario.name,
        equity40yr: result.equity40yr,
        improvement,
        improvementClass: improvement > 10 ? 'success' : improvement < -10 ? 'warning' : 'neutral'
      };
    });
  }

  /**
   * Run trust fund scenarios
   * @param {Object} baseParams - Base calculation parameters
   * @returns {Array} Scenario results
   */
  runTrustScenarios(baseParams) {
    const baseTrust = trustService.calculate(baseParams);

    const scenarios = [
      { 
        name: 'Add $5M to Trust', 
        params: { ...baseParams, trustValue: baseParams.trustValue + 5000000 } 
      },
      { 
        name: 'Reduce Expenses by 20%', 
        params: { ...baseParams, annualExpenses: baseParams.annualExpenses * 0.8 } 
      },
      { 
        name: 'Lower Mgmt Fee to 1%', 
        params: { ...baseParams, managementFee: 1.0 } 
      },
      { 
        name: 'Aggressive Portfolio (8.5% return)', 
        params: { ...baseParams, expectedReturn: 8.5 } 
      }
    ];

    return scenarios.map(scenario => {
      const result = trustService.calculate(scenario.params);
      const improvement = result.totalGenerations - baseTrust.totalGenerations;

      return {
        name: scenario.name,
        totalGenerations: result.totalGenerations,
        improvement,
        improvementClass: improvement > 0.1 ? 'success' : improvement < -0.1 ? 'warning' : 'neutral'
      };
    });
  }
}

module.exports = new ScenarioService();