/**
 * Trust Service
 * Handles trust fund simulation and family tree projections
 */

class TrustService {
  /**
   * Calculate trust fund longevity and family growth
   * @param {Object} params - Calculation parameters
   * @returns {Object} Trust calculation results
   */
  calculate(params) {
    const {
      trustValue,
      familyUnits,
      childrenPerFamily,
      annualExpenses,
      generationGap,
      managementFee,
      trustInflationRate,
      trustTaxRate,
      expectedReturn,
      insuranceSumAssured
    } = params;

    let value = trustValue;
    let currentCostPerUnitNominal = annualExpenses;
    const cohortLifespan = 3 * generationGap; // 75 years
    const C = childrenPerFamily;

    // Convert rates to decimals
    const trustTaxRateDecimal = trustTaxRate / 100;
    const trustInflationRateDecimal = trustInflationRate / 100;
    const mgmtFeeRate = managementFee / 100;
    const returnRate = expectedReturn / 100;

    const history = [];
    const generations = [];
    let year = 0;

    // Insurance Metrics
    let cumulativePolicies = 0;
    const membersPerUnit = 2 + C;

    // Track active family units by cohort
    const activeCohorts = {};
    let totalActiveUnits = 0;

    // Helper function
    const getCohortSize = (genNum) => {
      if (genNum === 0) return familyUnits;
      return familyUnits * Math.pow(C, genNum);
    };

    // Initialize Year 0
    activeCohorts[0] = familyUnits;
    totalActiveUnits = familyUnits;
    
    // Initial policy purchase (Founders + G1 Children)
    const initialPolicyPurchase = familyUnits * membersPerUnit;
    cumulativePolicies += initialPolicyPurchase;
    
    generations.push({
      number: 0,
      year: 0,
      value: value,
      familyUnits: totalActiveUnits
    });

    history.push({
      year: 0, 
      value: value, 
      familyUnits: totalActiveUnits,
      policies: cumulativePolicies 
    });

    // Simulation loop
    while (value > 0 && year < 200) {
      year++;

      // Family Cohort Dynamics
      if (year % generationGap === 0) {
        const currentGenNum = year / generationGap;

        // Cohort Exiting (Death Logic)
        const exitYear = year - cohortLifespan;
        if (exitYear >= 0 && activeCohorts[exitYear] !== undefined) {
          const exitingSize = activeCohorts[exitYear];
          
          // Insurance Payout (2 parents per unit)
          const insurancePayout = exitingSize * 2 * insuranceSumAssured;
          value += insurancePayout;

          totalActiveUnits -= exitingSize;
          delete activeCohorts[exitYear];
        }

        // New Cohort Entering
        const newCohortSize = getCohortSize(currentGenNum);
        activeCohorts[year] = newCohortSize;
        totalActiveUnits += newCohortSize;

        // New Policy Purchase (Spouses + Children)
        const newPolicyPurchase = newCohortSize * (1 + C);
        cumulativePolicies += newPolicyPurchase;
      }

      // Financial Calculations
      const growth = value * returnRate;
      const taxableGrowth = Math.max(0, growth);
      const tax = taxableGrowth * trustTaxRateDecimal;
      const fee = value * mgmtFeeRate;
      const totalAnnualWithdrawal = currentCostPerUnitNominal * totalActiveUnits;

      // Check for depletion
      if (value + growth - tax - fee <= totalAnnualWithdrawal) {
        value = 0;
        history.push({ 
          year, 
          value,
          familyUnits: totalActiveUnits,
          policies: cumulativePolicies
        });
        
        if (year % generationGap === 0 && !generations.find(g => g.year === year)) {
          generations.push({
            number: year / generationGap,
            year: year,
            value: value,
            familyUnits: totalActiveUnits
          });
        }
        break;
      }
      
      // Update value
      value += growth - tax - totalAnnualWithdrawal - fee;
      currentCostPerUnitNominal *= (1 + trustInflationRateDecimal);

      // Add to history (for chart smoothness)
      if (year % 5 === 0 || year === 1 || year === 200) {
        history.push({ 
          year, 
          value,
          familyUnits: totalActiveUnits,
          policies: cumulativePolicies
        });
      }

      // Store generation milestone
      if (year % generationGap === 0 && !generations.find(g => g.year === year)) {
        generations.push({
          number: year / generationGap,
          year: year,
          value: value, 
          familyUnits: totalActiveUnits
        });
      }
    }

    const totalGenerations = year / generationGap;
    const finalValue = history.length > 0 ? history[history.length - 1].value : trustValue;
    const totalCumulativeSumAssured = cumulativePolicies * insuranceSumAssured;

    const insight = `Your trust fund is projected to support your family for ${totalGenerations.toFixed(1)} generations.`;

    return {
      totalGenerations,
      finalValue,
      totalPolicies: cumulativePolicies,
      totalSumAssured: totalCumulativeSumAssured,
      history,
      generations,
      insight
    };
  }
}

module.exports = new TrustService();