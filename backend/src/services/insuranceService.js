/**
 * Insurance Service
 * Handles insurance premium and coverage calculations
 */

class InsuranceService {
  /**
   * Calculate insurance premiums and coverage
   * @param {Object} params - Calculation parameters
   * @returns {Object} Insurance calculation results
   */
  calculate(params) {
    const {
      insuranceSumAssured,
      insurancePaymentTerm,
      childrenPerFamily,
      annualExpenses
    } = params;

    // Premium / year / 5 = Premium per Person
    const premiumPerPerson = (insuranceSumAssured / insurancePaymentTerm) / 5;
    
    // Family Size for Premium: 2 parents + N children
    const totalInsurableMembers = 2 + childrenPerFamily;
    
    // Total Annual Premium needed for the initial family unit
    const totalAnnualPremiumNeeded = premiumPerPerson * totalInsurableMembers;

    // Coverage Validation Check
    const isSufficient = annualExpenses >= totalAnnualPremiumNeeded;
    const deficit = isSufficient ? 0 : totalAnnualPremiumNeeded - annualExpenses;

    let coverageStatus;
    if (isSufficient) {
      coverageStatus = {
        status: 'covered',
        message: `Annual Premium (${this.formatCurrency(totalAnnualPremiumNeeded)}) is FULLY COVERED by Annual Expenses.`,
        class: 'success'
      };
    } else {
      coverageStatus = {
        status: 'deficit',
        message: `WARNING: Annual Expenses are insufficient. Deficit: ${this.formatCurrency(deficit)}.`,
        class: 'warning',
        deficit
      };
    }

    return {
      sumAssured: insuranceSumAssured,
      paymentTerm: insurancePaymentTerm,
      premiumPerPerson,
      totalAnnualPremium: totalAnnualPremiumNeeded,
      totalInsurableMembers,
      coverageStatus
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

module.exports = new InsuranceService();