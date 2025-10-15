/**
 * Express Application Configuration
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const calculationRoutes = require('./routes/calculation.routes');
const { INFLATION_DATA, ASSET_CLASSES, DEFAULT_STATE } = require('./config/constants');

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/calculations', calculationRoutes);

// Get constants
app.get('/api/constants', (req, res) => {
  res.json({
    success: true,
    data: {
      assetClasses: ASSET_CLASSES,
      inflationData: INFLATION_DATA,
      defaultState: DEFAULT_STATE
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Legacy Planner API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

module.exports = app;