import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Clock, 
  ArrowLeft, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock3,
  Timer,
  BarChart3,
  Activity,
  Eye,
  Edit,
  Download,
  RefreshCw,
  Calendar,
  User,
  Building2,
  Star,
  Target,
  Zap,
  Award,
  XCircle
} from 'lucide-react';

interface ResponseTimeMetric {
  id: string;
  category: string;
  avgResponseTime: number;
  targetTime: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  tickets: number;
  resolved: number;
  slaCompliance: number;
  lastUpdated: string;
}

interface ResponseTimeDetail {
  id: string;
  ticketId: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  responseTime: number;
  resolutionTime: number;
  assignedTo: string;
  customer: string;
  company: string;
  created: string;
  resolved: string;
  status: 'resolved' | 'in-progress' | 'pending';
}

export default function ResponseTime() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<ResponseTimeMetric | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [metrics, setMetrics] = useState<ResponseTimeMetric[]>([
    {
      id: 'RT-001',
      category: 'Email Services',
      avgResponseTime: 1.2,
      targetTime: 2.0,
      trend: 'down',
      trendPercentage: 15,
      status: 'excellent',
      tickets: 45,
      resolved: 42,
      slaCompliance: 98.5,
      lastUpdated: '2024-01-16'
    },
    {
      id: 'RT-002',
      category: 'Network Issues',
      avgResponseTime: 2.8,
      targetTime: 4.0,
      trend: 'down',
      trendPercentage: 8,
      status: 'good',
      tickets: 23,
      resolved: 20,
      slaCompliance: 92.3,
      lastUpdated: '2024-01-16'
    },
    {
      id: 'RT-003',
      category: 'Hardware Support',
      avgResponseTime: 3.5,
      targetTime: 6.0,
      trend: 'stable',
      trendPercentage: 0,
      status: 'good',
      tickets: 18,
      resolved: 15,
      slaCompliance: 88.9,
      lastUpdated: '2024-01-15'
    },
    {
      id: 'RT-004',
      category: 'Software Issues',
      avgResponseTime: 4.2,
      targetTime: 4.0,
      trend: 'up',
      trendPercentage: 12,
      status: 'warning',
      tickets: 32,
      resolved: 28,
      slaCompliance: 85.2,
      lastUpdated: '2024-01-16'
    },
    {
      id: 'RT-005',
      category: 'Security Incidents',
      avgResponseTime: 0.8,
      targetTime: 1.0,
      trend: 'down',
      trendPercentage: 25,
      status: 'excellent',
      tickets: 8,
      resolved: 8,
      slaCompliance: 100,
      lastUpdated: '2024-01-16'
    }
  ]);

  const [details, setDetails] = useState<ResponseTimeDetail[]>([
    {
      id: 'RTD-001',
      ticketId: 'TK-001',
      category: 'Email Services',
      priority: 'high',
      responseTime: 0.5,
      resolutionTime: 2.5,
      assignedTo: 'John Smith',
      customer: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      created: '2024-01-15',
      resolved: '2024-01-16',
      status: 'resolved'
    },
    {
      id: 'RTD-002',
      ticketId: 'TK-002',
      category: 'Network Issues',
      priority: 'urgent',
      responseTime: 1.2,
      resolutionTime: 3.8,
      assignedTo: 'Mike Wilson',
      customer: 'David Brown',
      company: 'Global Solutions Ltd.',
      created: '2024-01-16',
      resolved: '2024-01-16',
      status: 'resolved'
    },
    {
      id: 'RTD-003',
      ticketId: 'TK-003',
      category: 'Hardware Support',
      priority: 'medium',
      responseTime: 2.1,
      resolutionTime: 4.2,
      assignedTo: 'Lisa Chen',
      customer: 'Robert Davis',
      company: 'DataFlow Systems',
      created: '2024-01-15',
      resolved: '2024-01-16',
      status: 'resolved'
    },
    {
      id: 'RTD-004',
      ticketId: 'TK-004',
      category: 'Software Issues',
      priority: 'medium',
      responseTime: 3.5,
      resolutionTime: 5.8,
      assignedTo: 'Tom Anderson',
      customer: 'Jennifer Lee',
      company: 'Office Solutions Co.',
      created: '2024-01-14',
      resolved: '2024-01-16',
      status: 'resolved'
    },
    {
      id: 'RTD-005',
      ticketId: 'TK-005',
      category: 'Security Incidents',
      priority: 'urgent',
      responseTime: 0.3,
      resolutionTime: 1.2,
      assignedTo: 'Amy Rodriguez',
      customer: 'Mark Thompson',
      company: 'Creative Agency Pro',
      created: '2024-01-13',
      resolved: '2024-01-15',
      status: 'resolved'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="text-red-500" size={16} />;
      case 'down': return <TrendingDown className="text-green-500" size={16} />;
      case 'stable': return <Activity className="text-gray-500" size={16} />;
      default: return <Activity className="text-gray-500" size={16} />;
    }
  };

  const filteredMetrics = metrics.filter(metric => {
    const matchesSearch = metric.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || metric.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || metric.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const refreshData = async () => {
    if (!isClient) return; // Only run on client side
    
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleMetricClick = (metric: ResponseTimeMetric) => {
    setSelectedMetric(metric);
  };

  const closeMetricDetails = () => {
    setSelectedMetric(null);
  };

  const avgResponseTime = metrics.reduce((sum, metric) => sum + metric.avgResponseTime, 0) / metrics.length;
  const avgSlaCompliance = metrics.reduce((sum, metric) => sum + metric.slaCompliance, 0) / metrics.length;
  const totalTickets = metrics.reduce((sum, metric) => sum + metric.tickets, 0);
  const totalResolved = metrics.reduce((sum, metric) => sum + metric.resolved, 0);

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <Clock className="text-white animate-pulse" size={24} />
          </div>
          <p className="text-gray-600 font-medium">Loading Response Time Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="text-gray-600" size={20} />
              </button>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="text-orange-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Response Time Analytics</h1>
                <p className="text-sm text-gray-600">Monitor and analyze response time performance</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshData}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all duration-300 ${isRefreshing ? 'animate-pulse' : ''}`}
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                <span className="text-sm font-medium">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                <Download size={16} />
                <span className="text-sm font-medium">Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Avg. Response Time</p>
                <p className="text-3xl font-bold text-gray-900">{avgResponseTime.toFixed(1)}h</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="text-orange-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">SLA Compliance</p>
                <p className="text-3xl font-bold text-green-600">{avgSlaCompliance.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Tickets</p>
                <p className="text-3xl font-bold text-blue-600">{totalTickets}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Resolved</p>
                <p className="text-3xl font-bold text-purple-600">{totalResolved}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Email Services">Email Services</option>
                <option value="Network Issues">Network Issues</option>
                <option value="Hardware Support">Hardware Support</option>
                <option value="Software Issues">Software Issues</option>
                <option value="Security Incidents">Security Incidents</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Metrics List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Response Time Metrics ({filteredMetrics.length})</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredMetrics.map((metric) => (
              <div
                key={metric.id}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleMetricClick(metric)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold text-gray-900">{metric.id}</span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium border ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{metric.category}</h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Avg. Response Time</p>
                        <p className="text-xl font-bold text-gray-900">{metric.avgResponseTime}h</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Target Time</p>
                        <p className="text-xl font-bold text-blue-600">{metric.targetTime}h</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">SLA Compliance</p>
                        <p className="text-xl font-bold text-green-600">{metric.slaCompliance}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tickets</p>
                        <p className="text-xl font-bold text-purple-600">{metric.tickets}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(metric.trend)}
                        <span className={`font-medium ${
                          metric.trend === 'down' ? 'text-green-600' : 
                          metric.trend === 'up' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {metric.trendPercentage > 0 ? '+' : ''}{metric.trendPercentage}%
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle size={16} />
                        <span>{metric.resolved} resolved</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>Updated: {metric.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Details Modal */}
      {selectedMetric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{selectedMetric.category}</h2>
                <button
                  onClick={closeMetricDetails}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Average Response Time</label>
                      <p className="text-2xl font-bold text-gray-900">{selectedMetric.avgResponseTime} hours</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Target Response Time</label>
                      <p className="text-2xl font-bold text-blue-600">{selectedMetric.targetTime} hours</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Performance Status</label>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium border ${getStatusColor(selectedMetric.status)}`}>
                        {selectedMetric.status}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Trend</label>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(selectedMetric.trend)}
                        <span className={`font-medium ${
                          selectedMetric.trend === 'down' ? 'text-green-600' : 
                          selectedMetric.trend === 'up' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {selectedMetric.trendPercentage > 0 ? '+' : ''}{selectedMetric.trendPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Statistics</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Total Tickets</label>
                      <p className="text-2xl font-bold text-gray-900">{selectedMetric.tickets}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Resolved Tickets</label>
                      <p className="text-2xl font-bold text-green-600">{selectedMetric.resolved}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">SLA Compliance</label>
                      <p className="text-2xl font-bold text-blue-600">{selectedMetric.slaCompliance}%</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Updated</label>
                      <p className="text-gray-900">{selectedMetric.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tickets</h3>
                <div className="space-y-3">
                  {details.filter(detail => detail.category === selectedMetric.category).map((detail) => (
                    <div key={detail.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{detail.ticketId}</span>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium border ${getPriorityColor(detail.priority)}`}>
                          {detail.priority}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Response Time</p>
                          <p className="font-medium">{detail.responseTime}h</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Resolution Time</p>
                          <p className="font-medium">{detail.resolutionTime}h</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Assigned To</p>
                          <p className="font-medium">{detail.assignedTo}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Customer</p>
                          <p className="font-medium">{detail.customer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-end space-x-4">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
