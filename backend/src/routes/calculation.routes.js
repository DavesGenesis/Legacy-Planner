/**
 * Calculation Routes
 * API endpoints for all calculations
 */

const express = require('express');
const router = express.Router();
const calculationController = require('../controllers/calculationController');

// Calculate all metrics
router.post('/all', calculationController.calculateAll);

// Individual calculations
router.post('/equity', calculationController.calculateEquity);
router.post('/business', calculationController.calculateBusiness);
router.post('/trust', calculationController.calculateTrust);
router.post('/wealth', calculationController.calculateWealth);

// Allocation update
router.post('/allocation/update', calculationController.updateAllocation);

module.exports = router;