# Comprehensive Legacy Planning Suite

A full-stack web application for professional wealth transfer analysis, trust fund management, and intergenerational equity planning.

## 📁 Project Structure

```
legacy-planner/
├── backend/                    # Node.js API Server
│   ├── src/
│   │   ├── config/
│   │   │   └── constants.js   # Asset classes, inflation data, defaults
│   │   ├── controllers/
│   │   │   └── calculationController.js
│   │   ├── services/
│   │   │   ├── equityService.js      # Intergenerational equity
│   │   │   ├── businessService.js    # Business growth calculations
│   │   │   ├── trustService.js       # Trust fund simulation
│   │   │   ├── wealthService.js      # Wealth accumulation
│   │   │   ├── insuranceService.js   # Insurance calculations
│   │   │   ├── allocationService.js  # Asset allocation
│   │   │   └── scenarioService.js    # What-if scenarios
│   │   ├── routes/
│   │   │   └── calculation.routes.js
│   │   ├── app.js             # Express configuration
│   │   └── server.js          # Server entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/                   # Next.js Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx       # Main dashboard
│   │   │   ├── layout.tsx     # Root layout
│   │   │   └── globals.css    # Global styles
│   │   ├── components/
│   │   │   ├── Navigation.tsx
│   │   │   ├── ClientInfo.tsx
│   │   │   ├── PersonalWealth.tsx
│   │   │   ├── TrustEstate.tsx
│   │   │   ├── AdvancedAnalytics.tsx
│   │   │   └── SummaryReports.tsx
│   │   ├── lib/
│   │   │   ├── api.ts         # API client
│   │   │   └── utils.ts       # Utility functions
│   │   └── types/
│   │       └── index.ts       # TypeScript definitions
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd legacy-planner
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Copy environment variables
   cp .env.example .env
   
   # Edit .env if needed (default port is 3001)
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   
   # The frontend will connect to http://localhost:3001/api by default
   ```

### Running the Application

You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
The API server will start on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
The web application will start on `http://localhost:3000`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Features

### Core Capabilities

1. **Intergenerational Equity Calculator**
   - Calculate wealth preservation across generations
   - Account for inflation, taxes, and spending rates
   - Project portfolio values over 40+ years

2. **Business Growth Analysis**
   - Determine required growth rates to support multiple families
   - Account for inflation and profit margins
   - Visualize revenue projections

3. **Trust Fund Simulator**
   - Model multi-generational trust longevity
   - Dynamic family growth with configurable children per family
   - Account for management fees, taxes, and inflation
   - Whole life insurance integration with automatic payouts

4. **Asset Allocation Strategy**
   - Interactive portfolio allocation tool
   - Expected return calculations based on asset mix
   - Risk level assessment

5. **Wealth Accumulation Tracker**
   - Compound growth projections
   - Inflation-adjusted values
   - Multiple time horizon analysis

6. **What-If Scenario Analysis**
   - Personal wealth scenarios
   - Trust fund scenarios
   - Side-by-side comparisons

7. **Professional Report Generation**
   - PDF export with client information
   - Comprehensive data visualization
   - Executive summary and recommendations

## 🔧 API Endpoints

### Calculations

- `POST /api/calculations/all` - Calculate all metrics
- `POST /api/calculations/equity` - Personal wealth equity
- `POST /api/calculations/business` - Business growth requirements
- `POST /api/calculations/trust` - Trust fund simulation
- `POST /api/calculations/wealth` - Wealth accumulation
- `POST /api/calculations/allocation/update` - Update asset allocation

### System

- `GET /api/constants` - Get asset classes, inflation data, and defaults
- `GET /api/health` - Health check endpoint

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Compression** - Response compression

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization
- **jsPDF** - PDF generation
- **Lucide React** - Icon library

## 📊 Calculation Services

### Equity Service
Calculates intergenerational equity by projecting portfolio values over time, accounting for:
- Investment returns and tax rates
- Annual spending and contributions
- Inflation adjustments
- 20-year and 40-year milestones

### Business Service
Determines business growth requirements by:
- Calculating current and target profit levels
- Accounting for family expansion
- Adjusting for inflation
- Computing required annual growth rates

### Trust Service
Simulates trust fund longevity through:
- Multi-generational family modeling
- Dynamic cohort entry and exit (birth/death)
- Insurance payout integration
- Management fees and tax calculations
- Inflation-adjusted expenses

### Insurance Service
Calculates insurance premiums and coverage:
- Premium per person based on sum assured
- Total family coverage requirements
- Coverage adequacy validation
- Deficit calculations

### Allocation Service
Manages asset allocation:
- Expected return calculations based on asset mix
- Risk level assessment
- Automatic rebalancing with cash as buffer
- Portfolio validation

### Wealth Service
Tracks wealth accumulation:
- Compound growth projections
- Nominal vs. inflation-adjusted values
- Multiple time horizons
- Growth multiple calculations

### Scenario Service
Runs what-if analyses:
- Personal wealth scenarios (asset changes, spend rates, returns)
- Trust fund scenarios (additional capital, expense changes, fees)
- Comparative impact analysis

## 🎨 Frontend Components

### Navigation
Sidebar navigation with sections:
- Introduction
- Client Information
- Personal Wealth
- Trust & Estate
- Advanced Analytics
- Summary & Reports

### Client Info
Form for capturing:
- Client details
- Report metadata
- Advisor information

### Personal Wealth
Interactive calculators for:
- Intergenerational equity
- Business growth requirements
- Real-time chart updates

### Trust Estate
Components for:
- Trust fund simulation
- Asset allocation strategy
- Family tree visualization
- Insurance coverage

### Advanced Analytics
Tools for:
- Wealth accumulation tracking
- Global inflation comparison
- Scenario analysis

### Summary Reports
Features for:
- Executive summary
- Key findings and recommendations
- PDF report generation
- Data export

## 🔒 Security Features

- **Helmet.js** - HTTP security headers
- **CORS** - Controlled cross-origin access
- **Input validation** - API request validation
- **Error handling** - Comprehensive error management

## 🧪 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Next.js with fast refresh
```

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend
Set `NEXT_PUBLIC_API_URL` if backend is on a different host:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Chart.js for data visualization
- Next.js team for the amazing framework
- Express.js community for the robust backend framework

## 📞 Support

For issues and questions:
- Open an issue in the repository
- Check existing documentation
- Review API endpoints in the code

---

**Built with ❤️ for financial advisors and wealth planners** 🏗️ Architecture

This project has been refactored into a modern full-stack architecture with clear separation of concerns:

- **Backend**: Node.js + Express API server handling all calculations and business logic
- **Frontend**: Next.js 14 with React for the user interface and data visualization
- **Communication**: RESTful API with JSON data exchange

##