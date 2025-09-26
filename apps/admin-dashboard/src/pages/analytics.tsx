import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Server,
  HardDrive,
  Monitor,
  Router,
  Smartphone,
  Printer,
  Cloud,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  MapPin,
  Building,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  RefreshCw,
  Filter,
  Eye,
  EyeOff,
  MousePointer,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Settings,
  Info
} from 'lucide-react';

// Sample data for analytics
const analyticsData = {
  overview: {
    totalAssets: 24,
    healthyAssets: 18,
    criticalAssets: 3,
    totalValue: 285000,
    avgHealthScore: 87.5,
    maintenanceDue: 5,
    warrantyExpiring: 2
  },
  healthTrends: [
    { month: 'Jan', healthy: 15, degraded: 5, critical: 2 },
    { month: 'Feb', healthy: 16, degraded: 4, critical: 2 },
    { month: 'Mar', healthy: 17, degraded: 4, critical: 1 },
    { month: 'Apr', healthy: 18, degraded: 3, critical: 1 },
    { month: 'May', healthy: 18, degraded: 3, critical: 1 },
    { month: 'Jun', healthy: 18, degraded: 3, critical: 3 }
  ],
  assetTypes: [
    { type: 'Server', count: 8, value: 120000, health: 89 },
    { type: 'Network', count: 6, value: 45000, health: 92 },
    { type: 'Storage', count: 4, value: 60000, health: 85 },
    { type: 'Laptop', count: 3, value: 30000, health: 88 },
    { type: 'Desktop', count: 2, value: 15000, health: 90 },
    { type: 'Printer', count: 1, value: 15000, health: 75 }
  ],
  costAnalysis: [
    { month: 'Jan', cost: 25000 },
    { month: 'Feb', cost: 18000 },
    { month: 'Mar', cost: 32000 },
    { month: 'Apr', cost: 15000 },
    { month: 'May', cost: 28000 },
    { month: 'Jun', cost: 22000 }
  ],
  maintenanceSchedule: [
    { asset: 'AST-001', type: 'Server', nextMaintenance: '2024-07-15', status: 'Due Soon' },
    { asset: 'AST-002', type: 'Network', nextMaintenance: '2024-07-20', status: 'Scheduled' },
    { asset: 'AST-003', type: 'Storage', nextMaintenance: '2024-08-01', status: 'Scheduled' },
    { asset: 'AST-004', type: 'Server', nextMaintenance: '2024-08-10', status: 'Scheduled' },
    { asset: 'AST-005', type: 'Laptop', nextMaintenance: '2024-08-15', status: 'Scheduled' }
  ],
  warrantyExpiry: [
    { asset: 'AST-006', type: 'Server', expiryDate: '2024-07-30', daysLeft: 15 },
    { asset: 'AST-007', type: 'Network', expiryDate: '2024-08-15', daysLeft: 31 },
    { asset: 'AST-008', type: 'Storage', expiryDate: '2024-09-01', daysLeft: 48 }
  ],
  performanceMetrics: {
    uptime: 99.2,
    responseTime: 1.2,
    incidents: 3,
    resolutionTime: 4.5,
    availability: 99.8
  }
};

const typeIcons: { [key: string]: any } = {
  'Server': Server,
  'Network': Router,
  'Storage': HardDrive,
  'Laptop': Monitor,
  'Desktop': Monitor,
  'Printer': Printer,
  'Phone': Smartphone,
  'Cloud': Cloud
};

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6M');
  const [selectedMetric, setSelectedMetric] = useState('health');
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);
  const [selectedChart, setSelectedChart] = useState('health');
  const [chartZoom, setChartZoom] = useState(1);
  const [hoveredData, setHoveredData] = useState<any>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [selectedTimeRange, setSelectedTimeRange] = useState('6M');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [realTimeData, setRealTimeData] = useState(analyticsData);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBgColor = (health: number) => {
    if (health >= 90) return 'bg-green-500';
    if (health >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Due Soon': return 'text-red-600 bg-red-100';
      case 'Scheduled': return 'text-blue-600 bg-blue-100';
      case 'Completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Real-time data updates
  useEffect(() => {
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        setRealTimeData(prev => ({
          ...prev,
          overview: {
            ...prev.overview,
            totalAssets: prev.overview.totalAssets + Math.floor(Math.random() * 3) - 1,
            healthyAssets: prev.overview.healthyAssets + Math.floor(Math.random() * 2),
            criticalAssets: Math.max(0, prev.overview.criticalAssets + Math.floor(Math.random() * 3) - 1),
            avgHealthScore: Math.min(100, prev.overview.avgHealthScore + (Math.random() * 2 - 1))
          }
        }));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoRefresh]);

  // Interactive functions
  const toggleCardExpansion = (cardId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
    }
    setExpandedCards(newExpanded);
  };

  const handleChartHover = (data: any, event: React.MouseEvent) => {
    setHoveredData(data);
    setShowTooltip(true);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleChartLeave = () => {
    setShowTooltip(false);
    setHoveredData(null);
  };

  const handleZoomIn = () => {
    setChartZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setChartZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const resetZoom = () => {
    setChartZoom(1);
  };

  const refreshData = () => {
    setRealTimeData(analyticsData);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(realTimeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const renderOverviewCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div 
        className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        onClick={() => toggleCardExpansion('totalAssets')}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Total Assets</p>
            <p className="text-3xl font-bold">{realTimeData.overview.totalAssets}</p>
          </div>
          <Server className="w-12 h-12 text-blue-200" />
        </div>
        <div className="mt-4 flex items-center text-blue-100">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="text-sm">+2 this month</span>
        </div>
        {expandedCards.has('totalAssets') && (
          <div className="mt-4 p-3 bg-blue-400 bg-opacity-30 rounded-lg">
            <p className="text-sm">Active: {realTimeData.overview.healthyAssets}</p>
            <p className="text-sm">Critical: {realTimeData.overview.criticalAssets}</p>
            <p className="text-sm">Avg Health: {realTimeData.overview.avgHealthScore.toFixed(1)}%</p>
          </div>
        )}
      </div>

      <div 
        className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        onClick={() => toggleCardExpansion('healthyAssets')}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Healthy Assets</p>
            <p className="text-3xl font-bold">{realTimeData.overview.healthyAssets}</p>
          </div>
          <CheckCircle className="w-12 h-12 text-green-200" />
        </div>
        <div className="mt-4 flex items-center text-green-100">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="text-sm">+3 this month</span>
        </div>
        {expandedCards.has('healthyAssets') && (
          <div className="mt-4 p-3 bg-green-400 bg-opacity-30 rounded-lg">
            <p className="text-sm">Health Score: {realTimeData.overview.avgHealthScore.toFixed(1)}%</p>
            <p className="text-sm">Uptime: 99.2%</p>
            <p className="text-sm">Last Check: 2 min ago</p>
          </div>
        )}
      </div>

      <div 
        className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl text-white cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        onClick={() => toggleCardExpansion('criticalAssets')}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm">Critical Assets</p>
            <p className="text-3xl font-bold">{realTimeData.overview.criticalAssets}</p>
          </div>
          <AlertTriangle className="w-12 h-12 text-red-200" />
        </div>
        <div className="mt-4 flex items-center text-red-100">
          <TrendingDown className="w-4 h-4 mr-1" />
          <span className="text-sm">+1 this month</span>
        </div>
        {expandedCards.has('criticalAssets') && (
          <div className="mt-4 p-3 bg-red-400 bg-opacity-30 rounded-lg">
            <p className="text-sm">Requires Immediate Attention</p>
            <p className="text-sm">Avg Response Time: 4.5h</p>
            <p className="text-sm">Escalated: 2 tickets</p>
          </div>
        )}
      </div>

      <div 
        className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        onClick={() => toggleCardExpansion('totalValue')}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Total Value</p>
            <p className="text-3xl font-bold">{formatCurrency(realTimeData.overview.totalValue)}</p>
          </div>
          <DollarSign className="w-12 h-12 text-purple-200" />
        </div>
        <div className="mt-4 flex items-center text-purple-100">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="text-sm">+12% this month</span>
        </div>
        {expandedCards.has('totalValue') && (
          <div className="mt-4 p-3 bg-purple-400 bg-opacity-30 rounded-lg">
            <p className="text-sm">Monthly Spend: $22,000</p>
            <p className="text-sm">ROI: 15.2%</p>
            <p className="text-sm">Depreciation: $8,500</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderHealthTrends = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Activity className="mr-2 text-blue-600" size={24} />
          Health Trends (6 Months)
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Healthy</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Degraded</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Critical</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-sm text-gray-600">{Math.round(chartZoom * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={resetZoom}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="h-64 flex items-end space-x-2 relative" style={{ transform: `scale(${chartZoom})`, transformOrigin: 'left center' }}>
        {realTimeData.healthTrends.map((month, index) => (
          <div 
            key={month.month} 
            className="flex-1 flex flex-col items-center space-y-1 group cursor-pointer"
            onMouseEnter={(e) => handleChartHover(month, e)}
            onMouseLeave={handleChartLeave}
          >
            <div className="w-full flex flex-col space-y-1">
              <div 
                className="bg-green-500 rounded-t hover:bg-green-600 transition-colors"
                style={{ height: `${(month.healthy / 20) * 200}px` }}
                title={`Healthy: ${month.healthy}`}
              ></div>
              <div 
                className="bg-yellow-500 hover:bg-yellow-600 transition-colors"
                style={{ height: `${(month.degraded / 20) * 200}px` }}
                title={`Degraded: ${month.degraded}`}
              ></div>
              <div 
                className="bg-red-500 rounded-b hover:bg-red-600 transition-colors"
                style={{ height: `${(month.critical / 20) * 200}px` }}
                title={`Critical: ${month.critical}`}
              ></div>
            </div>
            <span className="text-xs text-gray-600 mt-2 group-hover:text-gray-900 font-medium">{month.month}</span>
          </div>
        ))}
      </div>
      
      {showTooltip && hoveredData && (
        <div 
          className="fixed z-50 bg-gray-900 text-white p-3 rounded-lg shadow-lg pointer-events-none"
          style={{ 
            left: tooltipPosition.x + 10, 
            top: tooltipPosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="text-sm font-medium mb-2">{hoveredData.month}</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Healthy: {hoveredData.healthy}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Degraded: {hoveredData.degraded}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Critical: {hoveredData.critical}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAssetTypes = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <PieChart className="mr-2 text-green-600" size={24} />
        Asset Distribution by Type
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {analyticsData.assetTypes.map((asset, index) => {
            const TypeIcon = typeIcons[asset.type] || Server;
            const percentage = (asset.count / analyticsData.overview.totalAssets) * 100;
            
            return (
              <div key={asset.type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TypeIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{asset.type}</p>
                    <p className="text-sm text-gray-600">{asset.count} assets</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(asset.value)}</p>
                  <p className="text-sm text-gray-600">{percentage.toFixed(1)}%</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex items-center justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalAssets}</p>
                <p className="text-sm text-gray-600">Total Assets</p>
              </div>
            </div>
            <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
              {analyticsData.assetTypes.map((asset, index) => {
                const percentage = (asset.count / analyticsData.overview.totalAssets) * 100;
                const cumulativePercentage = analyticsData.assetTypes
                  .slice(0, index)
                  .reduce((sum, a) => sum + (a.count / analyticsData.overview.totalAssets) * 100, 0);
                
                return (
                  <circle
                    key={asset.type}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={`hsl(${index * 60}, 70%, 50%)`}
                    strokeWidth="8"
                    strokeDasharray={`${percentage * 2.51} ${100 * 2.51}`}
                    strokeDashoffset={`-${cumulativePercentage * 2.51}`}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCostAnalysis = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <LineChart className="mr-2 text-purple-600" size={24} />
        Cost Analysis (6 Months)
      </h3>
      
      <div className="h-64 flex items-end space-x-2">
        {analyticsData.costAnalysis.map((month, index) => {
          const maxCost = Math.max(...analyticsData.costAnalysis.map(m => m.cost));
          const height = (month.cost / maxCost) * 200;
          
  return (
            <div key={month.month} className="flex-1 flex flex-col items-center space-y-1">
              <div 
                className="bg-gradient-to-t from-purple-500 to-purple-400 rounded-t w-full"
                style={{ height: `${height}px` }}
              ></div>
              <span className="text-xs text-gray-600 mt-2">{month.month}</span>
              <span className="text-xs font-medium text-gray-900">{formatCurrency(month.cost)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderMaintenanceSchedule = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Calendar className="mr-2 text-orange-600" size={24} />
        Upcoming Maintenance
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Asset</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Next Maintenance</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.maintenanceSchedule.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">{item.asset}</td>
                <td className="py-3 px-4 text-gray-600">{item.type}</td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(item.nextMaintenance).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderWarrantyExpiry = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <AlertTriangle className="mr-2 text-red-600" size={24} />
        Warranty Expiring Soon
      </h3>
      
      <div className="space-y-4">
        {analyticsData.warrantyExpiry.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
    <div>
                <p className="font-medium text-gray-900">{item.asset}</p>
                <p className="text-sm text-gray-600">{item.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Expires: {new Date(item.expiryDate).toLocaleDateString()}
              </p>
              <p className="text-sm font-medium text-red-600">
                {item.daysLeft} days left
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPerformanceMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Activity className="w-6 h-6 text-green-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{analyticsData.performanceMetrics.uptime}%</p>
        <p className="text-sm text-gray-600">Uptime</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Clock className="w-6 h-6 text-blue-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{analyticsData.performanceMetrics.responseTime}s</p>
        <p className="text-sm text-gray-600">Response Time</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{analyticsData.performanceMetrics.incidents}</p>
        <p className="text-sm text-gray-600">Incidents</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Clock className="w-6 h-6 text-purple-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{analyticsData.performanceMetrics.resolutionTime}h</p>
        <p className="text-sm text-gray-600">Resolution Time</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-indigo-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{analyticsData.performanceMetrics.availability}%</p>
        <p className="text-sm text-gray-600">Availability</p>
      </div>
    </div>
  );

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 bg-white z-50 p-6 overflow-y-auto' : ''}`}>
      {/* Real-time Status Indicator */}
      {isAutoRefresh && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-700 font-medium">Live data updates enabled</span>
          <span className="text-xs text-green-600">• Updates every 5 seconds</span>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 mt-2">Comprehensive insights into your asset portfolio</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                isAutoRefresh 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isAutoRefresh ? <Pause size={16} /> : <Play size={16} />}
              <span>{isAutoRefresh ? 'Pause' : 'Live'}</span>
            </button>
            
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-2"
              title="Refresh Data"
            >
              <RefreshCw size={16} />
            </button>
          </div>
          
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1M">Last Month</option>
            <option value="3M">Last 3 Months</option>
            <option value="6M">Last 6 Months</option>
            <option value="1Y">Last Year</option>
          </select>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>
          
          <button
            onClick={exportData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export Report</span>
          </button>
          
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-2"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Asset Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Types</option>
                <option value="Server">Server</option>
                <option value="Network">Network</option>
                <option value="Storage">Storage</option>
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Healthy">Healthy</option>
                <option value="Degraded">Degraded</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overview Cards */}
      {renderOverviewCards()}

      {/* Performance Metrics */}
      {renderPerformanceMetrics()}

      {/* Health Trends */}
      {renderHealthTrends()}

      {/* Asset Types */}
      {renderAssetTypes()}

      {/* Cost Analysis */}
      {renderCostAnalysis()}

      {/* Maintenance Schedule */}
      {renderMaintenanceSchedule()}

      {/* Warranty Expiry */}
      {renderWarrantyExpiry()}
    </div>
  );
}