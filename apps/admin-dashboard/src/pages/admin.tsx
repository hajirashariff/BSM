import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
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
  Eye,
  Users,
  Brain,
  Workflow,
  BookOpen,
  Plug,
  Settings,
  Activity,
  Zap,
  Shield,
  Globe,
  Database,
  FileText,
  Bot,
  Target,
  DollarSign,
  Layers,
  Code,
  Terminal,
  Cloud,
  GitCommit,
  History,
  Share2,
  Lock,
  Archive,
  Tag,
  Folder,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Grid3X3,
  List,
  Kanban,
  TrendingDown,
  RefreshCcw,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock3,
  EyeOff,
  Unlock,
  Bookmark,
  Download,
  Upload,
  Bell,
  Search,
  User,
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  Loader2, 
  X
} from 'lucide-react';

// Mock data for the dashboard
const dashboardData = {
  kpis: {
    todayTickets: 13,
    resolvedToday: 9,
    avgResponse: '3.0h',
    satisfaction: 3.6
  },
  metrics: [
    {
      title: 'Active Tickets',
      value: 201,
      change: '+8%',
      trend: 'up',
      subtitle: 'Open service requests',
      icon: Ticket,
      color: 'blue',
      chart: [65, 45, 78, 52, 89, 67, 91]
    },
    {
      title: 'Client Accounts',
      value: 79,
      change: '+16%',
      trend: 'up',
      subtitle: 'Managed accounts',
      icon: Building2,
      color: 'green',
      chart: [45, 67, 89, 34, 78, 56, 82]
    },
    {
      title: 'IT Assets',
      value: 1128,
      change: '+6%',
      trend: 'up',
      subtitle: 'Managed devices',
      icon: Server,
      color: 'purple',
      chart: [78, 56, 89, 67, 45, 78, 92]
    },
    {
      title: 'Response Time',
      value: '2.0h',
      change: '-8%',
      trend: 'down',
      subtitle: 'Average resolution',
      icon: Clock,
      color: 'orange',
      chart: [45, 67, 34, 78, 56, 89, 67]
    }
  ],
  accountHealth: [
    {
      name: 'Contoso Ltd',
      status: 'Healthy',
      healthScore: 77,
      activeTickets: 4,
      renewalDate: '2024-12-15',
      lastUpdated: '2 hours ago',
      color: 'blue'
    },
    {
      name: 'Fabrikam Inc',
      status: 'Warning',
      healthScore: 85,
      activeTickets: 7,
      renewalDate: '2025-03-20',
      lastUpdated: '2 hours ago',
      color: 'yellow'
    },
    {
      name: 'Adventure Works',
      status: 'Healthy',
      healthScore: 86,
      activeTickets: 3,
      renewalDate: '2024-11-30',
      lastUpdated: '2 hours ago',
      color: 'blue'
    },
    {
      name: 'Northwind Corp',
      status: 'Excellent',
      healthScore: 94,
      activeTickets: 3,
      renewalDate: '2025-01-10',
      lastUpdated: '2 hours ago',
      color: 'green'
    }
  ],
  recentActivity: [
    { id: 1, type: 'ticket', message: 'New ticket #TCK-2024-001 created', time: '5 min ago', icon: Ticket },
    { id: 2, type: 'account', message: 'Account health updated for Contoso Ltd', time: '12 min ago', icon: Building2 },
    { id: 3, type: 'workflow', message: 'Workflow "Employee Onboarding" completed', time: '18 min ago', icon: Workflow },
    { id: 4, type: 'asset', message: 'New server added to inventory', time: '25 min ago', icon: Server },
    { id: 5, type: 'user', message: 'New user John Doe registered', time: '32 min ago', icon: Users }
  ],
  systemStatus: {
    workflows: { active: 12, total: 15, status: 'healthy' },
    integrations: { active: 8, total: 10, status: 'warning' },
    knowledgeBase: { articles: 156, views: 2340, status: 'healthy' },
    rulesEngine: { rules: 45, active: 42, status: 'healthy' }
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy': return 'text-green-600 bg-green-100';
    case 'warning': return 'text-yellow-600 bg-yellow-100';
    case 'critical': return 'text-red-600 bg-red-100';
    case 'excellent': return 'text-green-600 bg-green-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getHealthColor = (score: number) => {
  if (score >= 90) return 'bg-green-500';
  if (score >= 80) return 'bg-blue-500';
  if (score >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
};

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState<string | null>(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const MiniChart = ({ data, color }: { data: number[], color: string }) => {
    const max = Math.max(...data);
    const colorClasses = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500'
    };

    return (
      <div className="flex items-end space-x-1 h-8">
        {data.map((value, index) => (
          <div
            key={index}
            className={`w-1 ${colorClasses[color as keyof typeof colorClasses]} rounded-t`}
            style={{ height: `${(value / max) * 100}%` }}
          />
        ))}
      </div>
    );
  };

  return (
    <ProtectedRoute requiredRole="Admin">
      <div className="space-y-6">
      {/* Header */}
        <div className="flex items-center justify-between">
              <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Real-time insights and analytics</p>
              </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.kpis.todayTickets}</p>
      </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.kpis.resolvedToday}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Response</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.kpis.avgResponse}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
        </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.kpis.satisfaction}/5</p>
            </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
                        </div>
            </div>
          </div>
      </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {dashboardData.metrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    metric.color === 'blue' ? 'bg-blue-100' :
                    metric.color === 'green' ? 'bg-green-100' :
                    metric.color === 'purple' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    <metric.icon className={`w-5 h-5 ${
                      metric.color === 'blue' ? 'text-blue-600' :
                      metric.color === 'green' ? 'text-green-600' :
                      metric.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">{metric.subtitle}</p>
                <div className="flex items-center justify-between">
                  <MiniChart data={metric.chart} color={metric.color} />
                  <span className="text-xs text-gray-400 capitalize">{metric.color}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Account Health Overview */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Account Health Overview</h2>
            <p className="text-gray-600 mt-1">Monitor client account health and performance</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardData.accountHealth.map((account, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setShowAccountDetails(showAccountDetails === account.name ? null : account.name)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{account.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(account.status.toLowerCase())}`}>
                      {account.status}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Health Score</span>
                        <span className="font-medium">{account.healthScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getHealthColor(account.healthScore)}`}
                          style={{ width: `${account.healthScore}%` }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Tickets:</span>
                        <span className="font-medium ml-1">{account.activeTickets}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Renewal:</span>
                        <span className="font-medium ml-1">{account.renewalDate}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Updated {account.lastUpdated}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Status */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">System Status</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Workflow className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Workflow Engine</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{dashboardData.systemStatus.workflows.active}/{dashboardData.systemStatus.workflows.total}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(dashboardData.systemStatus.workflows.status)}`}>
                    {dashboardData.systemStatus.workflows.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Plug className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Integrations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{dashboardData.systemStatus.integrations.active}/{dashboardData.systemStatus.integrations.total}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(dashboardData.systemStatus.integrations.status)}`}>
                    {dashboardData.systemStatus.integrations.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">Knowledge Base</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{dashboardData.systemStatus.knowledgeBase.articles} articles</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(dashboardData.systemStatus.knowledgeBase.status)}`}>
                    {dashboardData.systemStatus.knowledgeBase.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Brain className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">Rules Engine</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{dashboardData.systemStatus.rulesEngine.active}/{dashboardData.systemStatus.rulesEngine.rules}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(dashboardData.systemStatus.rulesEngine.status)}`}>
                    {dashboardData.systemStatus.rulesEngine.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <activity.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <button className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Plus className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium">New Ticket</span>
              </button>
              <button className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Building2 className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium">Add Account</span>
              </button>
              <button className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Server className="w-6 h-6 text-purple-600" />
                <span className="text-sm font-medium">Add Asset</span>
              </button>
              <button className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Workflow className="w-6 h-6 text-orange-600" />
                <span className="text-sm font-medium">Create Workflow</span>
              </button>
              <button className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="w-6 h-6 text-indigo-600" />
                <span className="text-sm font-medium">Add User</span>
              </button>
              <button className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <BarChart3 className="w-6 h-6 text-pink-600" />
                <span className="text-sm font-medium">View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
