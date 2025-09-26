import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home as HomeIcon,
  Ticket,
  HelpCircle,
  CreditCard,
  User,
  FileText,
  Download,
  Settings as SettingsIcon,
  Bell,
  Search,
  Plus,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Activity,
  Phone,
  Mail,
  Calendar,
  BarChart3,
  PieChart,
  Users,
  Server,
  Database,
  Shield,
  Zap,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  RefreshCw,
  Filter,
  SortAsc,
  SortDesc,
  Eye,
  Edit,
  Trash2,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Paperclip,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Download as DownloadIcon,
  Upload,
  BookOpen,
  Target,
  Award,
  TrendingDown,
  Minus,
  ArrowUp,
  ArrowDown,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Octagon
} from 'lucide-react';
import AITicketCreator from '../components/AITicketCreator';
import AIAccountInsights from '../components/AIAccountInsights';
import NotificationCenter from '../components/NotificationCenter';
import { customerAnalyticsService } from '../lib/supabaseService';

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/tickets', label: 'Support Tickets', icon: Ticket },
  { href: '/help', label: 'Help Center', icon: HelpCircle },
  { href: '/account', label: 'My Account', icon: User },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

// Mock data for dashboard
const mockUser = {
  name: 'John Doe',
  role: 'Customer',
  company: 'Acme Corporation',
  avatar: null,
  lastLogin: '2024-01-20T10:30:00Z',
  timezone: 'EST'
};

// Dashboard component
const Dashboard: React.FC = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    inProgressTickets: 0,
    resolvedTickets: 0,
    totalServiceRequests: 0,
    totalAssets: 0,
    unreadNotifications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Use mock user ID for demo
        const stats = await customerAnalyticsService.getMyDashboardStats('2');
        setDashboardStats(stats);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Dynamic KPIs based on dashboard stats
  const kpis = [
    {
      id: 'active-tickets',
      title: 'Active Tickets',
      value: dashboardStats.openTickets + dashboardStats.inProgressTickets,
      change: '+1',
      changeType: 'increase',
      icon: Ticket,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-100/20',
      trend: [2, 3, 2, 4, 3, 5, 3],
      description: 'Currently open support requests'
    },
    {
      id: 'resolved-tickets',
      title: 'Resolved Tickets',
      value: dashboardStats.resolvedTickets,
      change: '+2',
      changeType: 'increase',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-100/20',
      trend: [5, 6, 7, 8, 9, 10, 8],
      description: 'Successfully resolved tickets'
    },
    {
      id: 'total-assets',
      title: 'My Assets',
      value: dashboardStats.totalAssets,
      change: '+1',
      changeType: 'increase',
      icon: Server,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-100/20',
      trend: [3, 4, 3, 5, 4, 6, 4],
      description: 'Assigned IT assets'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      value: dashboardStats.unreadNotifications,
      change: '+3',
      changeType: 'increase',
      icon: Bell,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-100/20',
      trend: [1, 2, 1, 3, 2, 4, 2],
      description: 'Unread notifications'
    }
  ];

  const mockRecentTickets = [
    {
      id: 'TKT-001',
      subject: 'Login issues with mobile app',
      status: 'Open',
      priority: 'High',
      category: 'Technical',
      assignee: 'Sarah Johnson',
      created: '2024-01-20T09:15:00Z',
      updated: '2024-01-20T10:30:00Z',
      sla: '2h 15m',
      description: 'Unable to login to mobile application on iOS device'
    },
    {
      id: 'TKT-002',
      subject: 'Password reset request',
      status: 'In Progress',
      priority: 'Medium',
      category: 'Account',
      assignee: 'Mike Chen',
      created: '2024-01-19T14:22:00Z',
      updated: '2024-01-20T08:45:00Z',
      sla: '4h 30m',
      description: 'Need assistance with password reset process'
    },
    {
      id: 'TKT-003',
      subject: 'Feature request for dashboard',
      status: 'Pending',
      priority: 'Low',
      category: 'Enhancement',
      assignee: 'Unassigned',
      created: '2024-01-18T16:30:00Z',
      updated: '2024-01-19T11:20:00Z',
      sla: '24h',
      description: 'Request to add new widget to customer dashboard'
    }
  ];

  const mockServiceHealth = [
    {
      service: 'Authentication Service',
      status: 'Operational',
      uptime: '99.9%',
      responseTime: '120ms',
      lastIncident: '2024-01-15T14:30:00Z',
      icon: Shield,
      color: 'text-green-600'
    },
    {
      service: 'API Gateway',
      status: 'Operational',
      uptime: '99.8%',
      responseTime: '85ms',
      lastIncident: '2024-01-10T09:15:00Z',
      icon: Server,
      color: 'text-green-600'
    },
    {
      service: 'Database',
      status: 'Degraded',
      uptime: '98.5%',
      responseTime: '250ms',
      lastIncident: '2024-01-20T08:00:00Z',
      icon: Database,
      color: 'text-yellow-600'
    },
    {
      service: 'File Storage',
      status: 'Operational',
      uptime: '99.7%',
      responseTime: '95ms',
      lastIncident: '2024-01-12T16:45:00Z',
      icon: FileText,
      color: 'text-green-600'
    }
  ];

  const mockKnowledgeBase = [
    {
      id: 'KB-001',
      title: 'How to reset your password',
      category: 'Account Management',
      views: 1250,
      lastUpdated: '2024-01-15T10:30:00Z',
      helpful: 89,
      tags: ['password', 'account', 'security']
    },
    {
      id: 'KB-002',
      title: 'Mobile app troubleshooting guide',
      category: 'Technical Support',
      views: 980,
      lastUpdated: '2024-01-12T14:20:00Z',
      helpful: 76,
      tags: ['mobile', 'troubleshooting', 'app']
    },
    {
      id: 'KB-003',
      title: 'Understanding your dashboard',
      category: 'Getting Started',
      views: 2100,
      lastUpdated: '2024-01-10T09:15:00Z',
      helpful: 134,
      tags: ['dashboard', 'tutorial', 'basics']
    }
  ];

  const mockAnnouncements = [
    {
      id: 'ANN-001',
      title: 'Scheduled Maintenance - January 25th',
      type: 'Maintenance',
      priority: 'High',
      content: 'We will be performing scheduled maintenance on January 25th from 2:00 AM to 4:00 AM EST. Some services may be temporarily unavailable.',
      published: '2024-01-20T10:00:00Z',
      expires: '2024-01-25T04:00:00Z'
    },
    {
      id: 'ANN-002',
      title: 'New Home Features Available',
      type: 'Feature',
      priority: 'Medium',
      content: 'We\'ve added new customizable widgets to your dashboard. Check out the new analytics and reporting features.',
      published: '2024-01-18T15:30:00Z',
      expires: null
    }
  ];

  const mockQuickActions = [
    {
      id: 'create-ticket',
      title: 'Create Support Ticket',
      description: 'Submit a new support request',
      icon: Plus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-100/20',
      href: '/tickets?action=create'
    },
    {
      id: 'view-tickets',
      title: 'View My Tickets',
      description: 'Check status of existing tickets',
      icon: Ticket,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-100/20',
      href: '/tickets'
    },
    {
      id: 'help-center',
      title: 'Help Center',
      description: 'Browse knowledge base and guides',
      icon: HelpCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-100/20',
      href: '/help'
    }
  ];

  const mockRecentActivity = [
    {
      id: 'ACT-001',
      action: 'Ticket Created',
      description: 'Created ticket TKT-001 for login issues',
      timestamp: '2024-01-20T09:15:00Z',
      type: 'ticket',
      icon: Ticket
    },
    {
      id: 'ACT-002',
      action: 'Profile Updated',
      description: 'Updated phone number in profile',
      timestamp: '2024-01-19T16:30:00Z',
      type: 'profile',
      icon: User
    },
    {
      id: 'ACT-003',
      action: 'Knowledge Base Viewed',
      description: 'Viewed article: How to reset your password',
      timestamp: '2024-01-19T14:22:00Z',
      type: 'knowledge',
      icon: BookOpen
    },
    {
      id: 'ACT-004',
      action: 'Settings Changed',
      description: 'Updated notification preferences',
      timestamp: '2024-01-18T11:45:00Z',
      type: 'settings',
      icon: SettingsIcon
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>BSM Customer Portal - Dashboard</title>
        <meta name="description" content="Business Service Management Customer Portal" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">BSM Customer Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationCenter />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{mockUser.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {mockUser.name}!</h2>
          <p className="text-gray-600">Here's what's happening with your account today.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi) => (
            <div key={kpi.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
                </div>
                <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">vs last week</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockQuickActions.map((action) => (
              <Link key={action.id} href={action.href}>
                <div className={`p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors cursor-pointer ${action.bgColor}`}>
                  <div className="flex items-center space-x-3">
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                    <div>
                      <p className="font-medium text-gray-900">{action.title}</p>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Tickets</h3>
            <Link href="/tickets" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {mockRecentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">{ticket.id}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
                      ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{ticket.subject}</p>
                  <p className="text-xs text-gray-500 mt-1">Assigned to: {ticket.assignee}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{ticket.sla}</p>
                  <p className="text-xs text-gray-400">{new Date(ticket.created).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Health */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Health</h3>
          <div className="space-y-3">
            {mockServiceHealth.map((service) => (
              <div key={service.service} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <service.icon className={`w-5 h-5 ${service.color}`} />
                  <div>
                    <p className="font-medium text-gray-900">{service.service}</p>
                    <p className="text-sm text-gray-600">Uptime: {service.uptime} • Response: {service.responseTime}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  service.status === 'Operational' ? 'bg-green-100 text-green-800' :
                  service.status === 'Degraded' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Knowledge Base */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Popular Articles</h3>
            <Link href="/help" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Browse All
            </Link>
          </div>
          <div className="space-y-3">
            {mockKnowledgeBase.map((article) => (
              <div key={article.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{article.title}</p>
                  <p className="text-sm text-gray-600">{article.category} • {article.views} views • {article.helpful} helpful</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {mockRecentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <activity.icon className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <span className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;