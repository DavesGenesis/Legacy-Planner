'use client';

import { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import '../lib/chartConfig';
import { apiClient } from '@/lib/api';
import { PlanningState, CalculationResults } from '@/types';
import { formatCurrency, formatPercentage, getCurrentDate } from '@/lib/utils';

export default function Home() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [clientInfo, setClientInfo] = useState({
    clientName: '',
    reportDate: getCurrentDate(),
    advisorName: '',
    firmName: '',
    reportPurpose: ''
  });

  const [params, setParams] = useState<PlanningState>({
    age: 45,
    currentAssets: 5000000,
    spendRate: 3.0,
    investmentReturn: 7.0,
    taxRate: 25.0,
    inflationRate: 2.6,
    annualContribution: 50000,
    country: 'USA',
    businessRevenue: 5000000,
    profitMargin: 15.0,
    currentFamilies: 1,
    additionalFamilies: 2,
    yearsToSupport: 20,
    trustValue: 20000000,
    familyUnits: 1,
    childrenPerFamily: 2,
    annualExpenses: 150000,
    generationGap: 25,
    managementFee: 1.5,
    trustInflationRate: 2.6,
    trustTaxRate: 0.0,
    insuranceSumAssured: 1000000,
    insurancePaymentTerm: 10,
    allocations: {
      stocks: 60,
      bonds: 30,
      realEstate: 10,
      cash: 0
    },
    initialInvestment: 1000000,
    annualContributionWealth: 100000,
    investmentReturnWealth: 8.0,
    trackingYears: 30
  });

  const [results, setResults] = useState<CalculationResults | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateAll();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [params]);

  const calculateAll = async () => {
    setIsCalculating(true);
    setError(null);
    
    try {
      const data = await apiClient.calculateAll(params);
      setResults(data);
    } catch (err) {
      setError('Failed to calculate. Please check if the backend server is running on port 3001.');
      console.error('Calculation error:', err);
    } finally {
      setIsCalculating(false);
    }
  };

  const updateParam = (key: keyof PlanningState, value: any) => {
    setParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getChartOptions = (title: string) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: { color: '#9ca3af' }
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' }
      },
      y: {
        ticks: { 
          color: '#9ca3af',
          callback: (value: any) => formatCurrency(value, 0)
        },
        grid: { color: 'rgba(156, 163, 175, 0.1)' }
      }
    }
  });

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#172a46] border-r border-gray-700 p-6 no-print flex-shrink-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">
            Genesis<span className="highlight">Adv</span>
          </h1>
        </div>
        
        <nav className="space-y-2">
          {[
            { id: 'introduction', icon: '🏠', label: 'Introduction' },
            { id: 'client-info', icon: '👤', label: 'Client Information' },
            { id: 'personal-wealth', icon: '📈', label: 'Personal Wealth' },
            { id: 'trust-estate', icon: '🛡️', label: 'Trust & Estate' },
            { id: 'summary', icon: '📄', label: 'Summary' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-primary text-primary-dark font-semibold'
                  : 'text-gray-300 hover:bg-[#304566]'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-8 p-3 bg-gray-800 rounded text-xs">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${results ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span className="text-gray-400">Backend: {results ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {error && (
          <div className="mb-6 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
            ⚠️ {error}
          </div>
        )}

        {isCalculating && (
          <div className="mb-6 bg-blue-900/50 border border-blue-500 text-blue-200 px-4 py-3 rounded">
            ⏳ Calculating...
          </div>
        )}

        {/* Introduction Section */}
        {activeSection === 'introduction' && (
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">
              Comprehensive <span className="highlight">Legacy Planning</span> Suite
            </h1>
            <div className="w-32 h-1 bg-gray-400 opacity-50 mb-6"></div>
            
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              An integrated platform combining personal wealth planning, trust fund management, 
              and intergenerational equity analysis.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-[#172a46] p-6 rounded-lg border-l-4 border-primary hover:transform hover:scale-105 transition-transform">
                <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
                <h3 className="font-semibold mb-2">Intergenerational Equity</h3>
                <p className="text-sm text-gray-400">Calculate wealth preservation across generations</p>
              </div>

              <div className="bg-[#172a46] p-6 rounded-lg border-l-4 border-primary hover:transform hover:scale-105 transition-transform">
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="font-semibold mb-2">Trust Fund Simulation</h3>
                <p className="text-sm text-gray-400">Model multi-generational trust longevity</p>
              </div>

              <div className="bg-[#172a46] p-6 rounded-lg border-l-4 border-primary hover:transform hover:scale-105 transition-transform">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-sm text-gray-400">Comprehensive scenario analysis and reporting</p>
              </div>
            </div>
          </div>
        )}

        {/* Client Info Section */}
        {activeSection === 'client-info' && (
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold mb-4">
              Client <span className="highlight">Information</span>
            </h1>
            
            <div className="bg-[#172a46] rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Client Name</label>
                  <input
                    type="text"
                    value={clientInfo.clientName}
                    onChange={(e) => setClientInfo({...clientInfo, clientName: e.target.value})}
                    className="w-full bg-[#0a192f] border border-gray-600 rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-primary"
                    placeholder="Enter client full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Report Date</label>
                  <input
                    type="date"
                    value={clientInfo.reportDate}
                    onChange={(e) => setClientInfo({...clientInfo, reportDate: e.target.value})}
                    className="w-full bg-[#0a192f] border border-gray-600 rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Advisor Name</label>
                  <input
                    type="text"
                    value={clientInfo.advisorName}
                    onChange={(e) => setClientInfo({...clientInfo, advisorName: e.target.value})}
                    className="w-full bg-[#0a192f] border border-gray-600 rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-primary"
                    placeholder="Enter advisor name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Firm Name</label>
                  <input
                    type="text"
                    value={clientInfo.firmName}
                    onChange={(e) => setClientInfo({...clientInfo, firmName: e.target.value})}
                    className="w-full bg-[#0a192f] border border-gray-600 rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-primary"
                    placeholder="Enter firm name"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-800 bg-opacity-40 rounded">
                <h3 className="font-medium mb-2">Report Preview</h3>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>Prepared for: <span className="highlight">{clientInfo.clientName || 'Client Name'}</span></div>
                  <div>Date: <span className="highlight">{clientInfo.reportDate}</span></div>
                  <div>Prepared by: <span className="highlight">{clientInfo.advisorName || 'Advisor Name'}</span></div>
                  <div>Firm: <span className="highlight">{clientInfo.firmName || 'Firm Name'}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Personal Wealth Section */}
        {activeSection === 'personal-wealth' && results && (
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold mb-4">
              Personal Wealth <span className="highlight">Planning</span>
            </h1>
            
            <div className="bg-[#172a46] rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Intergenerational Equity Calculator</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium mb-3">Parameters</h3>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Your Age</label>
                      <span className="text-xs font-medium">{params.age}</span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="75"
                      value={params.age}
                      onChange={(e) => updateParam('age', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Current Assets</label>
                      <span className="text-xs font-medium">{formatCurrency(params.currentAssets)}</span>
                    </div>
                    <input
                      type="range"
                      min="500000"
                      max="50000000"
                      step="500000"
                      value={params.currentAssets}
                      onChange={(e) => updateParam('currentAssets', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Spend Rate (%)</label>
                      <span className="text-xs font-medium">{formatPercentage(params.spendRate)}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.1"
                      value={params.spendRate}
                      onChange={(e) => updateParam('spendRate', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Investment Return (%)</label>
                      <span className="text-xs font-medium">{formatPercentage(params.investmentReturn)}</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="12"
                      step="0.1"
                      value={params.investmentReturn}
                      onChange={(e) => updateParam('investmentReturn', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Tax Rate (%)</label>
                      <span className="text-xs font-medium">{formatPercentage(params.taxRate)}</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="50"
                      step="1"
                      value={params.taxRate}
                      onChange={(e) => updateParam('taxRate', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Annual Contribution</label>
                      <span className="text-xs font-medium">{formatCurrency(params.annualContribution)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500000"
                      step="10000"
                      value={params.annualContribution}
                      onChange={(e) => updateParam('annualContribution', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <h3 className="font-medium mb-3">Projection Results</h3>
                  
                  <div className="bg-gray-800 bg-opacity-40 p-4 rounded mb-4" style={{height: '300px'}}>
                    <Line
                      data={{
                        labels: Array.from({length: 41}, (_, i) => i),
                        datasets: [
                          {
                            label: 'Portfolio Value',
                            data: results.equity.portfolioValues,
                            borderColor: '#64ffda',
                            backgroundColor: 'rgba(100, 255, 218, 0.1)',
                            fill: true,
                            tension: 0.1
                          },
                          {
                            label: 'Required for Equity',
                            data: results.equity.equityRequiredValues,
                            borderColor: '#ff6496',
                            borderDash: [5, 5],
                            fill: false,
                            tension: 0.1
                          }
                        ]
                      }}
                      options={getChartOptions('Intergenerational Equity Projection')}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-800 bg-opacity-40 p-4 rounded">
                      <div className="text-xs text-gray-400 mb-2">Current</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Assets:</span>
                          <span className="font-medium">{formatCurrency(results.equity.currentAssets)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Spend:</span>
                          <span className="font-medium">{formatCurrency(results.equity.currentSpend)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 bg-opacity-40 p-4 rounded">
                      <div className="text-xs text-gray-400 mb-2">At Age {params.age + 20}</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Assets:</span>
                          <span className="font-medium">{formatCurrency(results.equity.assets20yr)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Equity:</span>
                          <span className="font-medium highlight">{formatPercentage(results.equity.equity20yr, 0)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 bg-opacity-40 p-4 rounded">
                      <div className="text-xs text-gray-400 mb-2">At Age {params.age + 40}</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Assets:</span>
                          <span className="font-medium">{formatCurrency(results.equity.assets40yr)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Equity:</span>
                          <span className="font-medium highlight">{formatPercentage(results.equity.equity40yr, 0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 bg-opacity-40 p-4 rounded flex items-start gap-3">
                    <div className="text-primary text-xl">💡</div>
                    <p className="text-sm text-gray-300">{results.equity.insight}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Growth Section */}
            <div className="bg-[#172a46] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Business Growth Requirements</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium mb-3">Business Parameters</h3>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Annual Revenue</label>
                      <span className="text-xs font-medium">{formatCurrency(params.businessRevenue)}</span>
                    </div>
                    <input
                      type="range"
                      min="500000"
                      max="50000000"
                      step="500000"
                      value={params.businessRevenue}
                      onChange={(e) => updateParam('businessRevenue', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Profit Margin (%)</label>
                      <span className="text-xs font-medium">{formatPercentage(params.profitMargin)}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="0.5"
                      value={params.profitMargin}
                      onChange={(e) => updateParam('profitMargin', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Additional Families</label>
                      <span className="text-xs font-medium">{params.additionalFamilies}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={params.additionalFamilies}
                      onChange={(e) => updateParam('additionalFamilies', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Years Until Support Needed</label>
                      <span className="text-xs font-medium">{params.yearsToSupport}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      step="1"
                      value={params.yearsToSupport}
                      onChange={(e) => updateParam('yearsToSupport', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <h3 className="font-medium mb-3">Growth Requirements</h3>
                  
                  <div className="bg-gray-800 bg-opacity-40 p-4 rounded mb-4" style={{height: '300px'}}>
                    <Line
                      data={{
                        labels: results.business.labels,
                        datasets: [
                          {
                            label: 'Projected Revenue',
                            data: results.business.projectedData,
                            borderColor: '#64ffda',
                            backgroundColor: 'rgba(100, 255, 218, 0.1)',
                            fill: true,
                            tension: 0.1
                          },
                          {
                            label: 'Required Revenue',
                            data: results.business.requiredData,
                            borderColor: '#ff6496',
                            borderDash: [5, 5],
                            fill: false,
                            tension: 0.1
                          }
                        ]
                      }}
                      options={getChartOptions('Business Growth Projection')}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-800 bg-opacity-40 p-3 rounded">
                      <div className="text-xs text-gray-400 mb-1">Current Business</div>
                      <div className="flex justify-between text-sm">
                        <span>Revenue:</span>
                        <span className="font-medium">{formatCurrency(results.business.currentRevenue)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Profit:</span>
                        <span className="font-medium">{formatCurrency(results.business.currentProfit)}</span>
                      </div>
                    </div>

                    <div className="bg-gray-800 bg-opacity-40 p-3 rounded">
                      <div className="text-xs text-gray-400 mb-1">Future Requirements</div>
                      <div className="flex justify-between text-sm">
                        <span>Revenue:</span>
                        <span className="font-medium">{formatCurrency(results.business.targetRevenue)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Profit:</span>
                        <span className="font-medium">{formatCurrency(results.business.targetProfit)}</span>
                      </div>
                    </div>

                    <div className="bg-gray-800 bg-opacity-40 p-3 rounded">
                      <div className="text-xs text-gray-400 mb-1">Growth Needs</div>
                      <div className="flex justify-between text-sm">
                        <span>Annual:</span>
                        <span className="font-medium highlight">{formatPercentage(results.business.requiredGrowthRate)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Real:</span>
                        <span className="font-medium">{formatPercentage(results.business.realGrowthRate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 bg-opacity-40 p-4 rounded flex items-start gap-3">
                    <div className="text-primary text-xl">💡</div>
                    <p className="text-sm text-gray-300">{results.business.insight}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trust Estate Section */}
        {activeSection === 'trust-estate' && results && (
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold mb-4">
              Trust & Estate <span className="highlight">Planning</span>
            </h1>
            
            <div className="bg-[#172a46] rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Trust Fund Simulator</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium mb-3">Trust Parameters</h3>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Trust Fund Value</label>
                      <span className="text-xs font-medium">{formatCurrency(params.trustValue)}</span>
                    </div>
                    <input
                      type="range"
                      min="1000000"
                      max="100000000"
                      step="1000000"
                      value={params.trustValue}
                      onChange={(e) => updateParam('trustValue', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Initial Family Units</label>
                      <span className="text-xs font-medium">{params.familyUnits}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={params.familyUnits}
                      onChange={(e) => updateParam('familyUnits', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Children per Family</label>
                      <span className="text-xs font-medium">{params.childrenPerFamily}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={params.childrenPerFamily}
                      onChange={(e) => updateParam('childrenPerFamily', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Annual Expenses per Unit</label>
                      <span className="text-xs font-medium">{formatCurrency(params.annualExpenses)}</span>
                    </div>
                    <input
                      type="range"
                      min="50000"
                      max="500000"
                      step="10000"
                      value={params.annualExpenses}
                      onChange={(e) => updateParam('annualExpenses', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Years per Generation</label>
                      <span className="text-xs font-medium">{params.generationGap}</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="35"
                      step="1"
                      value={params.generationGap}
                      onChange={(e) => updateParam('generationGap', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Management Fee (%)</label>
                      <span className="text-xs font-medium">{formatPercentage(params.managementFee)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={params.managementFee}
                      onChange={(e) => updateParam('managementFee', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Trust Inflation Rate (%)</label>
                      <span className="text-xs font-medium">{formatPercentage(params.trustInflationRate)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="8"
                      step="0.1"
                      value={params.trustInflationRate}
                      onChange={(e) => updateParam('trustInflationRate', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Trust Tax Rate (%)</label>
                      <span className="text-xs font-medium">{formatPercentage(params.trustTaxRate)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="0.1"
                      value={params.trustTaxRate}
                      onChange={(e) => updateParam('trustTaxRate', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-300">Insurance Sum Assured</label>
                      <span className="text-xs font-medium">{formatCurrency(params.insuranceSumAssured)}</span>
                    </div>
                    <input
                      type="range"
                      min="1000000"
                      max="10000000"
                      step="100000"
                      value={params.insuranceSumAssured}
                      onChange={(e) => updateParam('insuranceSumAssured', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <h3 className="font-medium mb-3">Trust Longevity</h3>
                  
                  <div className="bg-gray-800 bg-opacity-40 p-4 rounded mb-4" style={{height: '300px'}}>
                    <Line
                      data={{
                        labels: results.trust.history.map(h => h.year),
                        datasets: [
                          {
                            label: 'Trust Fund Value',
                            data: results.trust.history.map(h => h.value),
                            borderColor: '#64ffda',
                            backgroundColor: 'rgba(100, 255, 218, 0.2)',
                            fill: true,
                            tension: 0.4
                          }
                        ]
                      }}
                      options={getChartOptions('Trust Fund Projection')}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-gray-800 bg-opacity-40 p-4 rounded text-center">
                      <div className="text-xs text-gray-400 mb-1">Longevity</div>
                      <div className="text-2xl font-bold highlight">{results.trust.totalGenerations.toFixed(1)}</div>
                      <div className="text-xs">Generations</div>
                    </div>

                    <div className="bg-gray-800 bg-opacity-40 p-4 rounded text-center">
                      <div className="text-xs text-gray-400 mb-1">Final Value</div>
                      <div className="text-lg font-medium">{formatCurrency(results.trust.finalValue)}</div>
                    </div>

                    <div className="bg-gray-800 bg-opacity-40 p-4 rounded text-center">
                      <div className="text-xs text-gray-400 mb-1">Total Policies</div>
                      <div className="text-lg font-medium highlight">{results.trust.totalPolicies.toLocaleString()}</div>
                    </div>

                    <div className="bg-gray-800 bg-opacity-40 p-4 rounded text-center">
                      <div className="text-xs text-gray-400 mb-1">Sum Assured</div>
                      <div className="text-lg font-medium">{formatCurrency(results.trust.totalSumAssured)}</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 bg-opacity-40 p-4 rounded flex items-start gap-3 mb-4">
                    <div className="text-primary text-xl">💡</div>
                    <p className="text-sm text-gray-300">{results.trust.insight}</p>
                  </div>

                  {results.insurance && (
                    <div className="bg-gray-800 bg-opacity-40 p-4 rounded">
                      <h4 className="font-medium mb-3 text-sm flex items-center gap-2">
                        <span>🛡️</span>
                        <span>Whole Life Insurance Coverage</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Sum Assured:</span>
                          <span className="font-medium">{formatCurrency(results.insurance.sumAssured)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Payment Term:</span>
                          <span className="font-medium">{results.insurance.paymentTerm} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Premium/Person:</span>
                          <span className="font-medium">{formatCurrency(results.insurance.premiumPerPerson)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Premium:</span>
                          <span className="font-medium highlight">{formatCurrency(results.insurance.totalAnnualPremium)}</span>
                        </div>
                      </div>
                      <div className={`text-xs p-3 rounded ${
                        results.insurance.coverageStatus.status === 'covered' 
                          ? 'bg-green-900/30 text-green-300 border border-green-700' 
                          : 'bg-red-900/30 text-red-300 border border-red-700'
                      }`}>
                        <div className="flex items-start gap-2">
                          <span>{results.insurance.coverageStatus.status === 'covered' ? '✓' : '⚠️'}</span>
                          <span>{results.insurance.coverageStatus.message}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Asset Allocation */}
            <div className="bg-[#172a46] rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Asset Allocation Strategy</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Portfolio Mix</h3>
                  
                  {/* Pie Chart */}
                  <div className="relative h-48 w-48 mx-auto mb-4">
                    <Doughnut
                      data={{
                        labels: ['Stocks', 'Bonds', 'Real Estate', 'Cash'],
                        datasets: [{
                          data: [
                            params.allocations.stocks,
                            params.allocations.bonds,
                            params.allocations.realEstate,
                            params.allocations.cash
                          ],
                          backgroundColor: ['#64ffda', '#3b82f6', '#eab308', '#a855f7'],
                          borderWidth: 4,
                          borderColor: '#172a46'
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '70%',
                        plugins: {
                          legend: { display: false },
                          tooltip: { enabled: true }
                        }
                      }}
                    />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-xs text-gray-300">Stocks (%)</label>
                        <span className="text-xs font-medium">{params.allocations.stocks}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={params.allocations.stocks}
                        onChange={(e) => {
                          const newValue = parseInt(e.target.value);
                          const diff = newValue - params.allocations.stocks;
                          if (diff > 0 && params.allocations.cash >= diff) {
                            setParams(prev => ({
                              ...prev,
                              allocations: {
                                ...prev.allocations,
                                stocks: newValue,
                                cash: prev.allocations.cash - diff
                              }
                            }));
                          } else if (diff < 0) {
                            setParams(prev => ({
                              ...prev,
                              allocations: {
                                ...prev.allocations,
                                stocks: newValue,
                                cash: Math.min(100, prev.allocations.cash - diff)
                              }
                            }));
                          }
                        }}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-xs text-gray-300">Bonds (%)</label>
                        <span className="text-xs font-medium">{params.allocations.bonds}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={params.allocations.bonds}
                        onChange={(e) => {
                          const newValue = parseInt(e.target.value);
                          const diff = newValue - params.allocations.bonds;
                          if (diff > 0 && params.allocations.cash >= diff) {
                            setParams(prev => ({
                              ...prev,
                              allocations: {
                                ...prev.allocations,
                                bonds: newValue,
                                cash: prev.allocations.cash - diff
                              }
                            }));
                          } else if (diff < 0) {
                            setParams(prev => ({
                              ...prev,
                              allocations: {
                                ...prev.allocations,
                                bonds: newValue,
                                cash: Math.min(100, prev.allocations.cash - diff)
                              }
                            }));
                          }
                        }}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-xs text-gray-300">Real Estate (%)</label>
                        <span className="text-xs font-medium">{params.allocations.realEstate}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={params.allocations.realEstate}
                        onChange={(e) => {
                          const newValue = parseInt(e.target.value);
                          const diff = newValue - params.allocations.realEstate;
                          if (diff > 0 && params.allocations.cash >= diff) {
                            setParams(prev => ({
                              ...prev,
                              allocations: {
                                ...prev.allocations,
                                realEstate: newValue,
                                cash: prev.allocations.cash - diff
                              }
                            }));
                          } else if (diff < 0) {
                            setParams(prev => ({
                              ...prev,
                              allocations: {
                                ...prev.allocations,
                                realEstate: newValue,
                                cash: Math.min(100, prev.allocations.cash - diff)
                              }
                            }));
                          }
                        }}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-xs text-gray-300">Cash (%) - Auto</label>
                        <span className="text-xs font-medium">{params.allocations.cash}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={params.allocations.cash}
                        disabled
                        className="w-full opacity-50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Portfolio Analysis</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800 bg-opacity-40 p-4 rounded">
                      <div className="text-xs text-gray-400 mb-1">Expected Return</div>
                      <div className="text-2xl font-bold highlight">{formatPercentage(results.allocation.expectedReturn)}</div>
                    </div>

                    <div className="bg-gray-800 bg-opacity-40 p-4 rounded">
                      <div className="text-xs text-gray-400 mb-1">Risk Level</div>
                      <div className="text-xl font-medium">{results.allocation.riskLevel}</div>
                    </div>

                    <div className="bg-gray-800 bg-opacity-40 p-4 rounded">
                      <div className="text-xs text-gray-400 mb-2">Asset Breakdown</div>
                      <div className="space-y-2">
                        {results.allocation.breakdown.map((asset) => (
                          <div key={asset.asset} className="flex justify-between items-center text-sm">
                            <span>{asset.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-gray-400">{formatPercentage(asset.expectedReturn)} pa</span>
                              <span className="font-medium w-12 text-right">{asset.allocation}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Family Tree */}
            <div className="bg-[#172a46] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Family Tree Projection</h2>
              <div className="flex flex-col items-center">
                {results.trust.generations.slice(0, 5).map((gen, index) => (
                  <div key={index} className="w-full">
                    {index > 0 && (
                      <div className="h-6 w-0.5 bg-gray-600 mx-auto"></div>
                    )}
                    <div className="flex flex-col items-center py-4">
                      <div className="font-semibold text-lg mb-2">
                        {index === 0 ? 'Founder (Gen 0)' : `Generation ${gen.number}`}
                      </div>
                      <div className="text-primary font-bold mb-1">
                        Est. Value: {formatCurrency(gen.value)}
                      </div>
                      <div className="text-sm text-gray-400 mb-3">
                        ({Math.round(gen.familyUnits)} Family Units)
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        {Array.from({ length: Math.min(Math.round(gen.familyUnits), 20) }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 transition-transform hover:scale-110 ${
                              gen.value > 1
                                ? i % 2 === 0
                                  ? 'bg-gradient-to-br from-primary to-blue-400 border-primary text-primary-dark'
                                  : 'bg-gradient-to-br from-pink-500 to-purple-400 border-pink-500 text-white'
                                : 'bg-gray-600 border-gray-500 text-gray-400 opacity-60'
                            }`}
                          >
                            {gen.value > 1 ? (i % 2 === 0 ? '👨' : '👩') : '💀'}
                          </div>
                        ))}
                        {Math.round(gen.familyUnits) > 20 && (
                          <div className="text-sm text-gray-400 font-semibold">
                            +{Math.round(gen.familyUnits) - 20} more
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Summary Section */}
        {activeSection === 'summary' && results && (
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold mb-4">
              Executive <span className="highlight">Summary</span>
            </h1>
            
            <div className="bg-[#172a46] rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold highlight">{formatPercentage(results.equity.equity40yr, 0)}</div>
                  <div className="text-sm text-gray-300 mt-2">Intergenerational Equity</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold highlight">{results.trust.totalGenerations.toFixed(1)}</div>
                  <div className="text-sm text-gray-300 mt-2">Trust Generations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold highlight">{formatPercentage(results.business.requiredGrowthRate)}</div>
                  <div className="text-sm text-gray-300 mt-2">Required Business Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold highlight">{formatPercentage(results.allocation.expectedReturn)}</div>
                  <div className="text-sm text-gray-300 mt-2">Portfolio Expected Return</div>
                </div>
              </div>

              <div className="bg-gray-800 bg-opacity-40 p-6 rounded mb-6">
                <h3 className="font-medium mb-4">Key Findings</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• {results.equity.insight}</li>
                  <li>• {results.trust.insight}</li>
                  <li>• {results.business.insight}</li>
                  <li>• Portfolio allocation provides {results.allocation.riskLevel.toLowerCase()} risk-return profile</li>
                </ul>
              </div>

              <div className="bg-gray-800 bg-opacity-40 p-6 rounded mb-6">
                <h3 className="font-medium mb-4">Recommendations</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Consider increasing annual contributions to enhance long-term wealth preservation</li>
                  <li>• Review asset allocation periodically to maintain optimal risk-return balance</li>
                  <li>• Implement business growth strategies to support expanding family needs</li>
                  <li>• Regular monitoring of inflation impact on purchasing power</li>
                  <li>• Consider trust structure optimization for tax efficiency</li>
                </ul>
              </div>

              {results.scenarios && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-medium mb-4">Personal Wealth Scenarios</h3>
                    <div className="space-y-3">
                      {results.scenarios.personal.map((scenario, index) => (
                        <div key={index} className="bg-gray-800 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">{scenario.name}</span>
                            <div className="text-right">
                              <span className="font-bold text-white">{formatPercentage(scenario.equity40yr || 0, 0)}</span>
                              <span className={`block text-xs ${
                                scenario.improvementClass === 'success' ? 'text-green-400' :
                                scenario.improvementClass === 'warning' ? 'text-red-400' :
                                'text-gray-400'
                              }`}>
                                {scenario.improvement >= 0 ? '+' : ''}{formatPercentage(scenario.improvement, 0)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Trust Fund Scenarios</h3>
                    <div className="space-y-3">
                      {results.scenarios.trust.map((scenario, index) => (
                        <div key={index} className="bg-gray-800 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">{scenario.name}</span>
                            <div className="text-right">
                              <span className="font-bold text-white">{(scenario.totalGenerations || 0).toFixed(1)} gens</span>
                              <span className={`block text-xs ${
                                scenario.improvementClass === 'success' ? 'text-green-400' :
                                scenario.improvementClass === 'warning' ? 'text-red-400' :
                                'text-gray-400'
                              }`}>
                                {scenario.improvement >= 0 ? '+' : ''}{scenario.improvement.toFixed(1)} gens
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-gray-700 mb-6">
                <h3 className="font-medium mb-4">Report Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Client:</span>
                    <span className="font-medium">{clientInfo.clientName || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="font-medium">{clientInfo.reportDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Advisor:</span>
                    <span className="font-medium">{clientInfo.advisorName || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Firm:</span>
                    <span className="font-medium">{clientInfo.firmName || 'Not specified'}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.print()}
                  className="bg-gradient-to-r from-primary to-blue-600 text-primary-dark font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
                >
                  🖨️ Print Report
                </button>
                <button 
                  onClick={() => {
                    const dataStr = JSON.stringify({...params, ...clientInfo, results}, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `legacy-planning-data-${Date.now()}.json`;
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  💾 Export Data
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}