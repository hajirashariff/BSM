import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Ticket, 
  Building2, 
  Server, 
  Clock, 
  BarChart3,
  ArrowDown,
  ArrowUp,
  CheckCircle,
  Star,
  Calendar,
  RefreshCw,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Eye
} from 'lucide-react';

export default function BusinessDashboard() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // KPI Metrics State
  const [kpiMetrics, setKpiMetrics] = useState({
    todaysTickets: 10,
    resolvedToday: 7,
    avgResponse: 1.4,
    satisfaction: 4.4
  });

  // Detailed Metrics State
  const [detailedMetrics, setDetailedMetrics] = useState({
    activeTickets: {
      value: 225,
      trend: 12,
      trendDirection: 'up',
      status: 'active',
      chartData: [180, 195, 210, 200, 225, 240, 225]
    },
    clientAccounts: {
      value: 81,
      trend: 8,
      trendDirection: 'up',
      status: 'healthy',
      chartData: [70, 72, 75, 78, 80, 82, 81]
    },
    itAssets: {
      value: 1127,
      trend: 5,
      trendDirection: 'up',
      status: 'monitored',
      chartData: [1050, 1070, 1090, 1100, 1115, 1125, 1127]
    },
    responseTime: {
      value: 2.2,
      trend: 15,
      trendDirection: 'down',
      status: 'improving',
      chartData: [2.8, 2.6, 2.4, 2.3, 2.2, 2.1, 2.2]
    }
  });

  // Account Health Overview State
  const [accountHealthData, setAccountHealthData] = useState([
    {
      id: 1,
      name: "Contoso Ltd",
      health: 92,
      activeTickets: 3,
      renewalDate: "2024-12-15",
      status: "healthy"
    },
    {
      id: 2,
      name: "Fabrikam Inc",
      health: 78,
      activeTickets: 7,
      renewalDate: "2025-03-20",
      status: "warning"
    },
    {
      id: 3,
      name: "Adventure Works",
      health: 85,
      activeTickets: 2,
      renewalDate: "2024-11-30",
      status: "healthy"
    },
    {
      id: 4,
      name: "Northwind Corp",
      health: 95,
      activeTickets: 1,
      renewalDate: "2025-01-10",
      status: "excellent"
    }
  ]);

  // Ensure client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Real-time data updates - only run on client side
  useEffect(() => {
    if (!isClient) return; // Only run after client-side hydration
    
    const interval = setInterval(() => {
      // Simulate real-time updates
      setKpiMetrics(prev => ({
        todaysTickets: Math.max(0, prev.todaysTickets + Math.floor(Math.random() * 3) - 1),
        resolvedToday: Math.max(0, prev.resolvedToday + Math.floor(Math.random() * 2)),
        avgResponse: Math.max(0.5, prev.avgResponse + (Math.random() - 0.5) * 0.2),
        satisfaction: Math.min(5, Math.max(3, prev.satisfaction + (Math.random() - 0.5) * 0.1))
      }));

      // Update detailed metrics with small variations
      setDetailedMetrics(prev => ({
        activeTickets: {
          ...prev.activeTickets,
          value: Math.max(200, prev.activeTickets.value + Math.floor(Math.random() * 10) - 5),
          trend: Math.max(0, prev.activeTickets.trend + Math.floor(Math.random() * 6) - 3)
        },
        clientAccounts: {
          ...prev.clientAccounts,
          value: Math.max(75, prev.clientAccounts.value + Math.floor(Math.random() * 4) - 2),
          trend: Math.max(0, prev.clientAccounts.trend + Math.floor(Math.random() * 4) - 2)
        },
        itAssets: {
          ...prev.itAssets,
          value: Math.max(1100, prev.itAssets.value + Math.floor(Math.random() * 20) - 10),
          trend: Math.max(0, prev.itAssets.trend + Math.floor(Math.random() * 4) - 2)
        },
        responseTime: {
          ...prev.responseTime,
          value: Math.max(1.5, prev.responseTime.value + (Math.random() - 0.5) * 0.3),
          trend: Math.max(0, prev.responseTime.trend + Math.floor(Math.random() * 6) - 3)
        }
      }));

      // Update account health data with small variations
      setAccountHealthData(prev => prev.map(account => ({
        ...account,
        health: Math.max(60, Math.min(100, account.health + Math.floor(Math.random() * 6) - 3)),
        activeTickets: Math.max(0, account.activeTickets + Math.floor(Math.random() * 3) - 1)
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isClient]);

  const refreshData = async () => {
    if (!isClient) return; // Only run on client side
    
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update metrics with fresh data
    setKpiMetrics({
      todaysTickets: Math.floor(Math.random() * 20) + 5,
      resolvedToday: Math.floor(Math.random() * 15) + 3,
      avgResponse: Math.random() * 2 + 1,
      satisfaction: Math.random() * 1.5 + 3.5
    });

    setDetailedMetrics({
      activeTickets: {
        value: Math.floor(Math.random() * 100) + 200,
        trend: Math.floor(Math.random() * 20) + 5,
        trendDirection: 'up',
        status: 'active',
        chartData: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 150)
      },
      clientAccounts: {
        value: Math.floor(Math.random() * 20) + 70,
        trend: Math.floor(Math.random() * 15) + 3,
        trendDirection: 'up',
        status: 'healthy',
        chartData: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 60)
      },
      itAssets: {
        value: Math.floor(Math.random() * 200) + 1000,
        trend: Math.floor(Math.random() * 10) + 2,
        trendDirection: 'up',
        status: 'monitored',
        chartData: Array.from({ length: 7 }, () => Math.floor(Math.random() * 200) + 900)
      },
      responseTime: {
        value: Math.random() * 2 + 1.5,
        trend: Math.floor(Math.random() * 20) + 5,
        trendDirection: 'down',
        status: 'improving',
        chartData: Array.from({ length: 7 }, () => Math.random() * 2 + 1.5)
      }
    });

    // Update account health data with fresh data
    setAccountHealthData([
      {
        id: 1,
        name: "Contoso Ltd",
        health: Math.floor(Math.random() * 20) + 80,
        activeTickets: Math.floor(Math.random() * 5) + 1,
        renewalDate: "2024-12-15",
        status: "healthy"
      },
      {
        id: 2,
        name: "Fabrikam Inc",
        health: Math.floor(Math.random() * 30) + 70,
        activeTickets: Math.floor(Math.random() * 8) + 3,
        renewalDate: "2025-03-20",
        status: "warning"
      },
      {
        id: 3,
        name: "Adventure Works",
        health: Math.floor(Math.random() * 25) + 75,
        activeTickets: Math.floor(Math.random() * 4) + 1,
        renewalDate: "2024-11-30",
        status: "healthy"
      },
      {
        id: 4,
        name: "Northwind Corp",
        health: Math.floor(Math.random() * 15) + 85,
        activeTickets: Math.floor(Math.random() * 3) + 1,
        renewalDate: "2025-01-10",
        status: "excellent"
      }
    ]);
    
    // Trigger a re-render by updating refresh key
    setRefreshKey(prev => prev + 1);
    setIsRefreshing(false);
  };


  // Disable navigation from KPI cards per request
  const handleCardClick = (_cardType: string) => {
    return; // no-op
  };

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <BarChart3 className="text-white animate-pulse" size={24} />
          </div>
          <p className="text-gray-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Main Content */}
      <div className="p-6">
        {/* Page Title and Controls */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600 mt-1">Real-time insights and analytics</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm border">
              <Calendar className="text-gray-400" size={16} />
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="border-0 bg-transparent text-sm font-medium text-gray-700 focus:outline-none"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>

            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 ${isRefreshing ? 'animate-pulse' : ''}`}
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
              <span className="text-sm font-medium">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* KPI Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Today's Tickets */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Today's Tickets</p>
                <p className="text-3xl font-bold text-gray-900">{kpiMetrics.todaysTickets}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ticket className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          {/* Resolved Today */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Resolved Today</p>
                <p className="text-3xl font-bold text-gray-900">{kpiMetrics.resolvedToday}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          {/* Average Response */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Avg. Response</p>
                <p className="text-3xl font-bold text-gray-900">{kpiMetrics.avgResponse.toFixed(1)}h</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="text-orange-600" size={24} />
              </div>
            </div>
          </div>

          {/* Satisfaction */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Satisfaction</p>
                <p className="text-3xl font-bold text-gray-900">{kpiMetrics.satisfaction.toFixed(1)}/5</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Tickets */}
          <div 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer group"
            onClick={() => handleCardClick('active-tickets')}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Ticket className="text-blue-600" size={20} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Active Tickets</span>
                    {detailedMetrics.activeTickets.trendDirection === 'up' ? (
                      <ArrowUp className="text-green-500" size={16} />
                    ) : (
                      <ArrowDown className="text-red-500" size={16} />
                    )}
                    <span className={`text-sm font-medium ${
                      detailedMetrics.activeTickets.trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      +{detailedMetrics.activeTickets.trend}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{detailedMetrics.activeTickets.value}</p>
                  <p className="text-sm text-gray-500">Open service requests</p>
                </div>
              </div>
              <ArrowRight className="text-gray-400 group-hover:text-blue-500 transition-colors" size={16} />
            </div>
            
            {/* Mini Chart */}
            <div className="flex items-end space-x-1 h-16 mb-3">
              {detailedMetrics.activeTickets.chartData.map((value, index) => (
                <div
                  key={index}
                  className="bg-blue-500 rounded-t group-hover:bg-blue-600 transition-colors"
                  style={{
                    height: `${(value / Math.max(...detailedMetrics.activeTickets.chartData)) * 100}%`,
                    width: '12px'
                  }}
                />
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full group-hover:bg-blue-200 transition-colors">
                active
              </span>
            </div>
          </div>

          {/* Client Accounts */}
          <div 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-green-300 transition-all duration-300 cursor-pointer group"
            onClick={() => handleCardClick('client-accounts')}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Building2 className="text-green-600" size={20} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600 group-hover:text-green-600 transition-colors">Client Accounts</span>
                    {detailedMetrics.clientAccounts.trendDirection === 'up' ? (
                      <ArrowUp className="text-green-500" size={16} />
                    ) : (
                      <ArrowDown className="text-red-500" size={16} />
                    )}
                    <span className={`text-sm font-medium ${
                      detailedMetrics.clientAccounts.trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      +{detailedMetrics.clientAccounts.trend}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">{detailedMetrics.clientAccounts.value}</p>
                  <p className="text-sm text-gray-500">Managed accounts</p>
                </div>
              </div>
              <ArrowRight className="text-gray-400 group-hover:text-green-500 transition-colors" size={16} />
            </div>
            
            {/* Mini Chart */}
            <div className="flex items-end space-x-1 h-16 mb-3">
              {detailedMetrics.clientAccounts.chartData.map((value, index) => (
                <div
                  key={index}
                  className="bg-green-500 rounded-t group-hover:bg-green-600 transition-colors"
                  style={{
                    height: `${(value / Math.max(...detailedMetrics.clientAccounts.chartData)) * 100}%`,
                    width: '12px'
                  }}
                />
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full group-hover:bg-green-200 transition-colors">
                healthy
              </span>
            </div>
          </div>

          {/* IT Assets */}
          <div 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-300 cursor-pointer group"
            onClick={() => handleCardClick('it-assets')}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Server className="text-purple-600" size={20} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600 transition-colors">IT Assets</span>
                    {detailedMetrics.itAssets.trendDirection === 'up' ? (
                      <ArrowUp className="text-green-500" size={16} />
                    ) : (
                      <ArrowDown className="text-red-500" size={16} />
                    )}
                    <span className={`text-sm font-medium ${
                      detailedMetrics.itAssets.trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      +{detailedMetrics.itAssets.trend}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{detailedMetrics.itAssets.value.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Managed devices</p>
                </div>
              </div>
              <ArrowRight className="text-gray-400 group-hover:text-purple-500 transition-colors" size={16} />
            </div>
            
            {/* Mini Chart */}
            <div className="flex items-end space-x-1 h-16 mb-3">
              {detailedMetrics.itAssets.chartData.map((value, index) => (
                <div
                  key={index}
                  className="bg-purple-500 rounded-t group-hover:bg-purple-600 transition-colors"
                  style={{
                    height: `${(value / Math.max(...detailedMetrics.itAssets.chartData)) * 100}%`,
                    width: '12px'
                  }}
                />
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full group-hover:bg-purple-200 transition-colors">
                monitored
              </span>
            </div>
          </div>

          {/* Response Time */}
          <div 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-orange-300 transition-all duration-300 cursor-pointer group"
            onClick={() => handleCardClick('response-time')}
            onMouseEnter={() => setHoveredCard(4)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Clock className="text-orange-600" size={20} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600 group-hover:text-orange-600 transition-colors">Response Time</span>
                    {detailedMetrics.responseTime.trendDirection === 'down' ? (
                      <ArrowDown className="text-green-500" size={16} />
                    ) : (
                      <ArrowUp className="text-red-500" size={16} />
                    )}
                    <span className={`text-sm font-medium ${
                      detailedMetrics.responseTime.trendDirection === 'down' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      -{detailedMetrics.responseTime.trend}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors">{detailedMetrics.responseTime.value.toFixed(1)}h</p>
                  <p className="text-sm text-gray-500">Average resolution</p>
                </div>
              </div>
              <ArrowRight className="text-gray-400 group-hover:text-orange-500 transition-colors" size={16} />
            </div>
            
            {/* Mini Chart */}
            <div className="flex items-end space-x-1 h-16 mb-3">
              {detailedMetrics.responseTime.chartData.map((value, index) => (
                <div
                  key={index}
                  className="bg-orange-500 rounded-t group-hover:bg-orange-600 transition-colors"
                  style={{
                    height: `${(value / Math.max(...detailedMetrics.responseTime.chartData)) * 100}%`,
                    width: '12px'
                  }}
                />
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full group-hover:bg-orange-200 transition-colors">
                improving
              </span>
            </div>
          </div>
        </div>

        {/* Quick Access removed per request */}

        {/* Account Health Overview Section */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Account Health Overview</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accountHealthData.map((account) => (
                <div 
                  key={account.id}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => router.push(`/client-accounts/${account.id}`)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{account.name}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      account.status === 'excellent' ? 'bg-green-100 text-green-800' :
                      account.status === 'healthy' ? 'bg-blue-100 text-blue-800' :
                      account.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {account.status === 'excellent' ? 'Excellent' :
                       account.status === 'healthy' ? 'Healthy' :
                       account.status === 'warning' ? 'Warning' : 'Critical'}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Health Score</span>
                      <span className="text-sm font-semibold text-gray-900">{account.health}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          account.health >= 90 ? 'bg-green-500' :
                          account.health >= 80 ? 'bg-blue-500' :
                          account.health >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${account.health}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Tickets</span>
                      <span className="text-sm font-medium text-gray-900">{account.activeTickets}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Renewal Date</span>
                      <span className="text-sm font-medium text-gray-900">{account.renewalDate}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Last Updated</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}