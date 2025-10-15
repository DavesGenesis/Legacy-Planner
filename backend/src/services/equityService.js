/**
 * Equity Service
 * Handles intergenerational equity calculations
 */

class EquityService {
  /**
   * Calculate intergenerational equity projection
   * @param {Object} params - Calculation parameters
   * @returns {Object} Equity calculation results
   */
  calculate(params) {
    const {
      currentAssets,
      spendRate,
      investmentReturn,
      taxRate,
      inflationRate,
      annualContribution
    } = params;

    // Convert percentages to decimals
    const spendRateDecimal = spendRate / 100;
    const returnRateDecimal = investmentReturn / 100;
    const taxRateDecimal = taxRate / 100;
    const inflationRateDecimal = inflationRate / 100;

    const initialSpend = currentAssets * spendRateDecimal;

    // Calculate portfolio values over 40 years
    const portfolioValues = [currentAssets];
    const equityRequiredValues = [currentAssets];

    for (let year = 1; year <= 40; year++) {
      const prev = portfolioValues[year - 1];
      const netReturn = prev * returnRateDecimal * (1 - taxRateDecimal);
      const spending = prev * spendRateDecimal;
      portfolioValues.push(prev + netReturn - spending + annualContribution);
      equityRequiredValues.push(currentAssets * Math.pow((1 + inflationRateDecimal), year));
    }

    // Calculate key milestones
    const assets20yr = portfolioValues[20];
    const spend20yr = assets20yr * spendRateDecimal;
    const equity20yr = (assets20yr / equityRequiredValues[20]) * 100;

    const assets40yr = portfolioValues[40];
    const spend40yr = assets40yr * spendRateDecimal;
    const equity40yr = (assets40yr / equityRequiredValues[40]) * 100;

    // Generate insight
    const children = Math.floor(equity40yr / 100);
    let insight = `With your current settings, you can provide full intergenerational equity for ${children} children.`;
    if (equity40yr < 100) {
      insight = 'With your current settings, you will not be able to provide full intergenerational equity.';
    }

    return {
      currentAssets,
      currentSpend: initialSpend,
      assets20yr,
      spend20yr,
      equity20yr,
      assets40yr,
      spend40yr,
      equity40yr,
      portfolioValues,
      equityRequiredValues,
      insight,
      childrenSupported: children
    };
  }
}

module.exports = new EquityService();