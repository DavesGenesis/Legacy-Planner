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

// CORS configuration for production
// CORS configuration - allow all Vercel URLs
const allowedOrigins = [
  'http://localhost:3000',
  'https://legacy-planner.vercel.app',
  'https://legacy-planner-eobsx7wb5-davesgenesis-projects.vercel.app',
  'https://legacy-planner-git-main-davesgenesis-projects.vercel.app'
];

// Also allow CORS_ORIGIN from environment variable
if (process.env.CORS_ORIGIN && !allowedOrigins.includes(process.env.CORS_ORIGIN)) {
  allowedOrigins.push(process.env.CORS_ORIGIN);
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cors(corsOptions));
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
