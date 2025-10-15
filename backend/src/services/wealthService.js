/**
 * Wealth Service
 * Handles wealth accumulation tracking calculations
 */

class WealthService {
  /**
   * Calculate wealth accumulation over time
   * @param {Object} params - Calculation parameters
   * @returns {Object} Wealth calculation results
   */
  calculate(params) {
    const {
      initialInvestment,
      annualContribution,
      investmentReturn,
      inflationRate,
      trackingYears
    } = params;

    // Convert percentages to decimals
    const returnRate = investmentReturn / 100;
    const inflationRateDecimal = inflationRate / 100;

    const nominalValues = [initialInvestment];
    const realValues = [initialInvestment];
    const labels = [0];

    for (let year = 1; year <= trackingYears; year++) {
      const prevNominal = nominalValues[year - 1];
      const growth = prevNominal * returnRate;
      const newNominal = prevNominal + growth + annualContribution;
      nominalValues.push(newNominal);

      const realValue = newNominal / Math.pow((1 + inflationRateDecimal), year);
      realValues.push(realValue);
      
      labels.push(year);
    }

    const finalNominal = nominalValues[trackingYears];
    const finalReal = realValues[trackingYears];
    const growthMultiple = finalNominal / initialInvestment;

    const insight = `Your investment will grow to ${this.formatCurrency(finalNominal)} in ${trackingYears} years, representing a ${growthMultiple.toFixed(1)}x multiple of your initial investment.`;

    return {
      finalNominal,
      finalReal,
      growthMultiple,
      nominalValues,
      realValues,
      labels,
      insight
    };
  }

  formatCurrency(value) {
    if (value >= 1000000) {
      return '$' + (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return '$' + (value / 1000).toFixed(1) + 'K';
    }
    return '$' + value.toLocaleString('en-US');
  }
}

module.exports = new WealthService();