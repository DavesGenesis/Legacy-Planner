# 🏛️ Comprehensive Legacy Planning Suite

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)

A professional-grade wealth transfer analysis platform combining personal wealth planning, trust fund management, and intergenerational equity analysis. Built to help financial advisors and wealth managers create comprehensive legacy plans for their clients.

## 🌟 Live Demo

**Frontend:** [https://legacy-planner-eobsx7wb5-davesgenesis-projects.vercel.app](https://legacy-planner-eobsx7wb5-davesgenesis-projects.vercel.app)

**Backend API:** [https://legacy-planner.onrender.com](https://legacy-planner.onrender.com)

---

## ✨ Features

### 💰 Personal Wealth Planning
- **Intergenerational Equity Calculator** - Calculate wealth preservation across generations
- **Investment Return Projections** - 40-year portfolio value forecasting
- **Inflation Impact Analysis** - Real vs nominal value tracking
- **Multi-country Support** - Inflation data for USA, Singapore, China, Indonesia, Australia, Canada, UK, Hong Kong

### 🛡️ Trust & Estate Planning
- **Trust Fund Simulator** - Model multi-generational trust longevity
- **Family Growth Projections** - Dynamic family tree visualization
- **Asset Allocation Strategy** - Portfolio optimization with risk analysis
- **Whole Life Insurance Integration** - Coverage planning and premium calculations

### 📊 Business Growth Analysis
- **Revenue Requirements** - Calculate growth needed to support expanding families
- **Profit Margin Optimization** - Business profitability analysis
- **Multi-family Support Planning** - Scale business to support multiple generations

### 📈 Advanced Analytics
- **Wealth Accumulation Tracker** - Compound growth projections
- **Scenario Analysis** - What-if comparisons for major decisions
- **Global Inflation Comparison** - 20-year historical data visualization
- **Interactive Charts** - Real-time calculations with Chart.js

### 📄 Professional Reporting
- **Executive Summaries** - Key findings and recommendations
- **Client Information Management** - Professional report generation
- **Data Export** - JSON export for further analysis
- **Print-friendly Reports** - Optimized for PDF generation

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
│                  Deployed on Vercel                      │
│  - React Components                                      │
│  - Chart.js Visualizations                               │
│  - Tailwind CSS Styling                                  │
│  - TypeScript                                            │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS/JSON
                       │ API Calls
┌──────────────────────▼──────────────────────────────────┐
│                 Backend API (Node.js)                    │
│                  Deployed on Render                      │
│  - Express.js Server                                     │
│  - RESTful API                                           │
│  - Financial Calculations Engine                         │
│  - CORS Security                                         │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- Next.js 14 (React Framework)
- TypeScript
- Tailwind CSS
- Chart.js (react-chartjs-2)
- Lucide React (Icons)

**Backend:**
- Node.js 18+
- Express.js
- CORS
- Helmet (Security)
- Compression

**Deployment:**
- Frontend: Vercel (with automatic deployments)
- Backend: Render (free tier with auto-scaling)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/DavesGenesis/Legacy-Planner.git
cd Legacy-Planner
```

#### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

Start backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:3001`

#### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Start frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

#### 4. Open Application

Visit `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
Legacy-Planner/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── constants.js          # Asset classes, inflation data
│   │   ├── controllers/
│   │   │   └── calculationController.js  # Business logic
│   │   ├── routes/
│   │   │   └── calculation.routes.js     # API endpoints
│   │   ├── services/
│   │   │   ├── equityService.js      # Wealth calculations
│   │   │   ├── trustService.js       # Trust fund logic
│   │   │   ├── businessService.js    # Business growth
│   │   │   └── allocationService.js  # Portfolio allocation
│   │   ├── app.js                    # Express app configuration
│   │   └── server.js                 # Server entry point
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # Main application page
│   │   │   ├── layout.tsx            # Root layout
│   │   │   └── globals.css           # Global styles
│   │   ├── lib/
│   │   │   ├── api.ts                # API client
│   │   │   ├── chartConfig.ts        # Chart.js setup
│   │   │   └── utils.ts              # Utility functions
│   │   └── types/
│   │       └── index.ts              # TypeScript types
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── .env.local
│
└── README.md
```

---

## 🔌 API Endpoints

### Base URL
```
Production: https://legacy-planner.onrender.com/api
Local: http://localhost:3001/api
```

### Endpoints

#### 1. Calculate All Metrics
```http
POST /calculations/all
Content-Type: application/json

{
  "age": 45,
  "currentAssets": 5000000,
  "spendRate": 3.0,
  "investmentReturn": 7.0,
  "taxRate": 25.0,
  "inflationRate": 2.6,
  "annualContribution": 50000,
  "country": "USA",
  "businessRevenue": 5000000,
  "profitMargin": 15.0,
  "currentFamilies": 1,
  "additionalFamilies": 2,
  "yearsToSupport": 20,
  "trustValue": 20000000,
  "familyUnits": 1,
  "childrenPerFamily": 2,
  "annualExpenses": 150000,
  "generationGap": 25,
  "managementFee": 1.5,
  "trustInflationRate": 2.6,
  "trustTaxRate": 0.0,
  "insuranceSumAssured": 1000000,
  "insurancePaymentTerm": 10,
  "allocations": {
    "stocks": 60,
    "bonds": 30,
    "realEstate": 10,
    "cash": 0
  },
  "initialInvestment": 1000000,
  "annualContributionWealth": 100000,
  "investmentReturnWealth": 8.0,
  "trackingYears": 30
}
```

#### 2. Get Constants
```http
GET /constants
```

Returns asset classes, inflation data, and default values.

#### 3. Health Check
```http
GET /health
```

Returns API status and timestamp.

#### 4. Individual Calculations
```http
POST /calculations/equity
POST /calculations/business
POST /calculations/trust
POST /calculations/wealth
POST /calculations/allocation/update
```

---

## 🎨 Key Features Explained

### Intergenerational Equity
Calculates if your wealth can support multiple children with the same lifestyle across generations. Takes into account:
- Investment returns after fees
- Tax rates
- Inflation
- Annual spending rates
- Additional contributions

### Trust Fund Longevity
Models how long a trust fund will last supporting growing family units:
- Dynamic family growth (exponential)
- Generation gaps (default 25 years)
- Cohort lifecycle (75 years lifespan)
- Management fees
- Inflation-adjusted expenses
- Whole life insurance integration

### Asset Allocation
Interactive portfolio builder with:
- Real-time allocation adjustments
- Expected return calculations
- Risk level assessment
- Cash as balancing asset

### Business Growth Requirements
Determines annual growth rate needed to:
- Support current families
- Add additional families in the future
- Maintain lifestyle standards
- Account for inflation

---

## 🔒 Security Features

- **CORS Protection** - Configured to allow only specific origins
- **Helmet.js** - Security headers for Express
- **Input Validation** - Server-side validation of all inputs
- **HTTPS Only** - Production deployments use SSL
- **Environment Variables** - Sensitive data stored securely
- **Rate Limiting** - API rate limits (can be configured)

---

## 🌍 Deployment

### Frontend (Vercel)

**Automatic Deployment:**
- Every push to `main` branch triggers auto-deployment
- Preview deployments for pull requests

**Manual Deployment:**
```bash
cd frontend
npm run build
vercel --prod
```

**Environment Variables Required:**
```
NEXT_PUBLIC_API_URL=https://legacy-planner.onrender.com/api
```

### Backend (Render)

**Automatic Deployment:**
- Connected to GitHub repository
- Auto-deploys on push to `main` branch

**Environment Variables Required:**
```
PORT=10000
NODE_ENV=production
CORS_ORIGIN=https://legacy-planner-eobsx7wb5-davesgenesis-projects.vercel.app
```

**Important Notes:**
- Free tier spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free tier limit

---

## 🧪 Testing

### Manual Testing

**Test Backend API:**
```bash
curl -X POST https://legacy-planner.onrender.com/api/calculations/all \
  -H "Content-Type: application/json" \
  -d '{"age":45,"currentAssets":5000000}'
```

**Test Health Endpoint:**
```bash
curl https://legacy-planner.onrender.com/api/health
```

### Browser Testing

1. Open Developer Tools (F12)
2. Go to Network tab
3. Use the application
4. Check for failed requests
5. Verify API responses

---

## 🐛 Troubleshooting

### Frontend Issues

**Problem:** Blank page or calculations not loading

**Solution:**
1. Check browser console (F12) for errors
2. Verify `NEXT_PUBLIC_API_URL` is set correctly
3. Check Network tab for failed API calls
4. Ensure backend is awake (visit health endpoint)

### Backend Issues

**Problem:** 502 Bad Gateway

**Solution:**
1. Check Render logs for errors
2. Verify all dependencies are installed
3. Check environment variables are set
4. Ensure PORT is set to 10000

### CORS Issues

**Problem:** CORS policy error in console

**Solution:**
1. Update `CORS_ORIGIN` in Render environment variables
2. Use exact Vercel URL (including preview URL if testing)
3. Check backend logs for CORS errors

### Slow First Load

**Problem:** First request takes 30-60 seconds

**Solution:**
- This is normal for Render free tier
- Backend spins down after 15 minutes inactivity
- Consider using UptimeRobot to keep it alive
- Or upgrade to paid plan ($7/month)

---

## 🛠️ Development

### Code Style

- TypeScript for frontend
- ESLint for linting
- Prettier for formatting (recommended)

### Adding New Features

1. **Backend:** Add calculation logic to appropriate service
2. **Backend:** Add controller method
3. **Backend:** Add route
4. **Frontend:** Update types
5. **Frontend:** Update API client
6. **Frontend:** Add UI components
7. **Test** locally
8. **Commit** and push (auto-deploys)

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-calculation

# Make changes and commit
git add .
git commit -m "Add new calculation feature"

# Push to GitHub
git push origin feature/new-calculation

# Create pull request on GitHub
# After review, merge to main
# Auto-deploys to production
```

---

## 📊 Performance

### Frontend
- **Lighthouse Score:** 90+ (Performance)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Bundle Size:** Optimized with Next.js

### Backend
- **Response Time:** < 200ms (warm)
- **Cold Start:** 30-60s (free tier)
- **Throughput:** Handles 100+ concurrent requests

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Guidelines

- Write clear commit messages
- Add comments for complex logic
- Update README if needed
- Test thoroughly before submitting

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**DavesGenesis**
- GitHub: [@DavesGenesis](https://github.com/DavesGenesis)
- Project Link: [https://github.com/DavesGenesis/Legacy-Planner](https://github.com/DavesGenesis/Legacy-Planner)

---

## 🙏 Acknowledgments

- Built with Next.js and Express.js
- Charts powered by Chart.js
- UI styled with Tailwind CSS
- Deployed on Vercel and Render
- Icons from Lucide React

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review troubleshooting guide above

---

## 🗺️ Roadmap

### Planned Features
- [ ] PDF report generation with charts
- [ ] User authentication
- [ ] Save/load scenarios
- [ ] Historical data tracking
- [ ] Multi-currency support
- [ ] Tax optimization strategies
- [ ] Estate tax calculations
- [ ] Charitable giving strategies

### Future Enhancements
- [ ] Mobile app version
- [ ] Advisor dashboard
- [ ] Client portal
- [ ] Advanced scenario comparisons
- [ ] Monte Carlo simulations
- [ ] Integration with financial data APIs

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**

---

*Last Updated: October 2025*
