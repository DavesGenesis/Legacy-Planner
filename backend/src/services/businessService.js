/**
 * Business Service
 * Handles business growth requirement calculations
 */

class BusinessService {
  /**
   * Calculate business growth requirements
   * @param {Object} params - Calculation parameters
   * @returns {Object} Business calculation results
   */
  calculate(params) {
    const {
      businessRevenue,
      profitMargin,
      currentFamilies,
      additionalFamilies,
      yearsToSupport,
      inflationRate
    } = params;

    // Convert percentages to decimals
    const profitMarginDecimal = profitMargin / 100;
    const inflationRateDecimal = inflationRate / 100;

    const totalFamilies = currentFamilies + additionalFamilies;
    const currentProfit = businessRevenue * profitMarginDecimal;
    const currentIncomePerFamily = currentProfit / currentFamilies;
    const futureIncomePerFamily = currentIncomePerFamily * Math.pow((1 + inflationRateDecimal), yearsToSupport);
    const targetProfit = futureIncomePerFamily * totalFamilies;
    const targetRevenue = targetProfit / profitMarginDecimal;
    const requiredGrowthRate = Math.pow(targetRevenue / businessRevenue, 1 / yearsToSupport) - 1;
    const realGrowthRate = requiredGrowthRate - inflationRateDecimal;

    // Generate projection data
    const labels = [];
    const projectedData = [];
    const requiredData = [];

    for (let y = 0; y <= yearsToSupport; y++) {
      labels.push(y);
      projectedData.push(businessRevenue * Math.pow((1 + requiredGrowthRate), y));
      requiredData.push(businessRevenue + ((targetRevenue - businessRevenue) * (y / yearsToSupport)));
    }

    // Generate insight
    const insight = `Your business needs to grow at ${(requiredGrowthRate * 100).toFixed(1)}% annually to support ${totalFamilies} families in ${yearsToSupport} years.`;

    return {
      currentRevenue: businessRevenue,
      currentProfit,
      targetRevenue,
      targetProfit,
      requiredGrowthRate: requiredGrowthRate * 100,
      realGrowthRate: realGrowthRate * 100,
      labels,
      projectedData,
      requiredData,
      insight,
      totalFamilies
    };
  }
}

module.exports = new BusinessService();