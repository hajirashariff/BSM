import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { analyticsService } from '../lib/supabaseService';
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

// Dashboard component with Supabase integration
const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    kpis: {
      todayTickets: 0,
      resolvedToday: 0,
      avgResponse: '0h',
      satisfaction: 0
    },
    metrics: [
      {
        title: 'Active Tickets',
        value: 0,
        change: '+0%',
        trend: 'up',
        subtitle: 'Open service requests',
        icon: Ticket,
        color: 'blue',
        chart: [0, 0, 0, 0, 0, 0, 0]
      },
      {
        title: 'Client Accounts',
        value: 0,
        change: '+0%',
        trend: 'up',
        subtitle: 'Managed accounts',
        icon: Building2,
        color: 'green',
        chart: [0, 0, 0, 0, 0, 0, 0]
      },
      {
        title: 'IT Assets',
        value: 0,
        change: '+0%',
        trend: 'up',
        subtitle: 'Managed devices',
        icon: Server,
        color: 'purple',
        chart: [0, 0, 0, 0, 0, 0, 0]
      },
      {
        title: 'Response Time',
        value: '0h',
        change: '+0%',
        trend: 'up',
        subtitle: 'Average resolution',
        icon: Clock,
        color: 'orange',
        chart: [0, 0, 0, 0, 0, 0, 0]
      }
    ],
  accountHealth: [],
  recentActivity: [],
  loading: true
});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const stats = await analyticsService.getDashboardStats();
        const activity = await analyticsService.getRecentActivity();
        
        setDashboardData(prev => ({
          ...prev,
          metrics: [
            {
              ...prev.metrics[0],
              value: stats.totalTickets,
              change: '+8%',
              chart: [65, 45, 78, 52, 89, 67, 91]
            },
            {
              ...prev.metrics[1],
              value: stats.totalAccounts,
              change: '+16%',
              chart: [45, 67, 89, 34, 78, 56, 82]
            },
            {
              ...prev.metrics[2],
              value: stats.totalAssets,
              change: '+6%',
              chart: [78, 56, 89, 67, 45, 78, 92]
            },
            {
              ...prev.metrics[3],
              value: '2.0h',
              change: '-8%',
              trend: 'down',
              chart: [45, 67, 34, 78, 56, 89, 67]
            }
          ],
          kpis: {
            todayTickets: stats.openTickets,
            resolvedToday: stats.resolvedTickets,
            avgResponse: '3.0h',
            satisfaction: 3.6
          },
          recentActivity: activity,
          loading: false
        }));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Welcome back! Here's what's happening with your BSM platform.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.kpis.todayTickets}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.kpis.resolvedToday}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.kpis.avgResponse}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.kpis.satisfaction}/5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {dashboardData.metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${
                    metric.color === 'blue' ? 'bg-blue-100' :
                    metric.color === 'green' ? 'bg-green-100' :
                    metric.color === 'purple' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    <metric.icon className={`w-6 h-6 ${
                      metric.color === 'blue' ? 'text-blue-600' :
                      metric.color === 'green' ? 'text-green-600' :
                      metric.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{metric.title}</h3>
                    <p className="text-sm text-gray-500">{metric.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            {dashboardData.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Ticket className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">
                        {activity.created_user?.name || 'Unknown'} • {new Date(activity.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}
