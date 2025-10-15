/**
 * Allocation Service
 * Handles asset allocation calculations
 */

const { ASSET_CLASSES } = require('../config/constants');

class AllocationService {
  /**
   * Calculate expected return based on asset allocation
   * @param {Object} allocations - Asset allocation percentages
   * @returns {Number} Expected return percentage
   */
  calculateExpectedReturn(allocations) {
    let weightedReturn = 0;
    
    Object.entries(allocations).forEach(([key, allocation]) => {
      if (ASSET_CLASSES[key]) {
        weightedReturn += (allocation / 100) * ASSET_CLASSES[key].return;
      }
    });
    
    return weightedReturn;
  }

  /**
   * Determine risk level based on expected return
   * @param {Number} expectedReturn - Expected return percentage
   * @returns {String} Risk level
   */
  getRiskLevel(expectedReturn) {
    if (expectedReturn <= 6) return 'Conservative';
    if (expectedReturn <= 8) return 'Moderate';
    return 'Aggressive';
  }

  /**
   * Get complete allocation analysis
   * @param {Object} allocations - Asset allocation percentages
   * @returns {Object} Allocation analysis results
   */
  analyze(allocations) {
    const expectedReturn = this.calculateExpectedReturn(allocations);
    const riskLevel = this.getRiskLevel(expectedReturn);

    // Validate allocations sum to 100
    const total = Object.values(allocations).reduce((sum, val) => sum + val, 0);
    const isValid = Math.abs(total - 100) < 0.01; // Allow for floating point errors

    return {
      expectedReturn,
      riskLevel,
      allocations,
      isValid,
      total,
      breakdown: Object.entries(allocations).map(([key, value]) => ({
        asset: key,
        name: ASSET_CLASSES[key]?.name || key,
        allocation: value,
        expectedReturn: ASSET_CLASSES[key]?.return || 0
      }))
    };
  }

  /**
   * Update allocation ensuring total equals 100%
   * @param {Object} currentAllocations - Current allocations
   * @param {String} changedAsset - Asset that was changed
   * @param {Number} newValue - New value for changed asset
   * @returns {Object} Updated allocations
   */
  updateAllocation(currentAllocations, changedAsset, newValue) {
    const allocations = { ...currentAllocations };
    const oldValue = allocations[changedAsset];
    
    if (changedAsset === 'cash') {
      return allocations; // Cash is passive, cannot be directly changed
    }

    const difference = newValue - oldValue;
    
    if (difference > 0) {
      // Increasing asset: deduct from cash
      const availableCash = allocations.cash;
      
      if (availableCash >= difference) {
        allocations[changedAsset] = newValue;
        allocations.cash -= difference;
      } else {
        // Not enough cash
        const effectiveIncrease = availableCash;
        allocations[changedAsset] = oldValue + effectiveIncrease;
        allocations.cash = 0;
      }
    } else if (difference < 0) {
      // Decreasing asset: add to cash
      const amountToAdd = Math.abs(difference);
      allocations[changedAsset] = Math.max(0, newValue);
      allocations.cash = Math.min(100, allocations.cash + amountToAdd);
    }

    return allocations;
  }
}

module.exports = new AllocationService();