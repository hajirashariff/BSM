import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TicketCreationModal from '../components/TicketCreationModal';
import ModernLayout from '../components/ModernLayout';
import {
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Plus,
  Search,
  Bell,
  Settings,
  User,
  Ticket,
  BarChart3,
  HelpCircle,
  MessageSquare,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
  Zap,
  Star,
  Eye,
  ThumbsUp,
  Share2,
  MoreVertical,
  ChevronRight,
  ExternalLink,
  Filter,
  Download,
  RefreshCw,
  Globe,
  Server,
  Database,
  Shield,
  Lock,
  Unlock,
  Wifi,
  WifiOff,
  AlertTriangle,
  Info,
  CheckCircle2,
  X,
  Home as HomeIcon,
  CreditCard,
  FileText,
  Phone,
  Mail,
  PieChart,
  Users,
  Monitor,
  Smartphone,
  Tablet,
  SortAsc,
  SortDesc,
  Edit,
  Trash2,
  ThumbsDown,
  MessageCircle,
  Paperclip
} from 'lucide-react';
<<<<<<< HEAD
import AITicketCreator from '../components/AITicketCreator';
import AIAccountInsights from '../components/AIAccountInsights';
import NotificationCenter from '../components/NotificationCenter';
import { customerAnalyticsService } from '../lib/supabaseService';
=======
>>>>>>> 26a8ddf1e04c6195c5dc469e033ccc90a87ac849

// Utility function for time formatting
const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

<<<<<<< HEAD
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
=======
// User-friendly ticket card component
const UserFriendlyTicketCard = ({ ticket }: { ticket: any }) => (
  <div className="group bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-zinc-700/50 p-5 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {ticket.subject}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
          {ticket.description}
        </p>
      </div>
      <div className="flex items-center space-x-2 ml-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          ticket.status === 'open' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
          ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        }`}>
          {ticket.status.replace('_', ' ').toUpperCase()}
        </span>
        <MoreVertical className="w-4 h-4 text-gray-400" />
      </div>
    </div>
    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
      <div className="flex items-center space-x-4">
        <span className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{formatTimeAgo(ticket.createdAt)}</span>
        </span>
        <span className="flex items-center space-x-1">
          <User className="w-4 h-4" />
          <span>{ticket.agentName || 'Unassigned'}</span>
        </span>
      </div>
      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

// User-friendly service card component
const UserFriendlyServiceCard = ({ service }: { service: any }) => (
  <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-zinc-700/50 p-4 hover:shadow-lg transition-all duration-300 cursor-pointer">
    <div className="flex items-center space-x-3 mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
        service.status === 'operational' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' :
        service.status === 'degraded' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400' :
        'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
      }`}>
        {service.status === 'operational' ? <CheckCircle className="w-5 h-5" /> :
         service.status === 'degraded' ? <AlertTriangle className="w-5 h-5" /> :
         <XCircle className="w-5 h-5" />}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white">{service.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{service.description}</p>
      </div>
    </div>
    <div className="flex items-center justify-between text-sm">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        service.status === 'operational' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
        service.status === 'degraded' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {service.status.toUpperCase()}
      </span>
      <span className="text-gray-500 dark:text-gray-400">{service.uptime}% uptime</span>
    </div>
  </div>
);

export default function HomePage() {
  const router = useRouter();
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mock data
  const ticketData = [
    {
      id: '1',
      subject: 'Login issues with mobile app',
      description: 'Unable to login using mobile app, getting authentication error when trying to access account',
      status: 'open',
      priority: 'high',
      createdAt: '2024-01-15T10:30:00Z',
      agentName: 'Sarah Johnson'
    },
    {
      id: '2',
      subject: 'Billing inquiry',
      description: 'Need clarification on the charges for this month',
      status: 'in_progress',
      priority: 'medium',
      createdAt: '2024-01-14T14:20:00Z',
      agentName: 'Mike Chen'
    },
    {
      id: '3',
      subject: 'Feature request',
      description: 'Would like to request a dark mode option for the dashboard',
      status: 'resolved',
      priority: 'low',
      createdAt: '2024-01-13T09:15:00Z',
      agentName: 'Alex Rodriguez'
    }
  ];

  const serviceData = [
    {
      name: 'API Services',
      description: 'Core API endpoints and data processing',
      status: 'operational',
      uptime: 99.9
    },
    {
      name: 'Database',
      description: 'Primary database and backup systems',
      status: 'operational',
      uptime: 99.8
    },
    {
      name: 'CDN',
      description: 'Content delivery network',
      status: 'degraded',
      uptime: 95.2
    },
    {
      name: 'Email Service',
      description: 'Email delivery and notifications',
      status: 'operational',
      uptime: 99.5
    }
  ];

  const stats = {
    totalTickets: ticketData.length,
    openTickets: ticketData.filter(t => t.status === 'open').length,
    inProgressTickets: ticketData.filter(t => t.status === 'in_progress').length,
    resolvedTickets: ticketData.filter(t => t.status === 'resolved').length
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
>>>>>>> 26a8ddf1e04c6195c5dc469e033ccc90a87ac849
        </div>
      </div>
    );
  }

<<<<<<< HEAD
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
=======
    return (
    <ModernLayout>
      <Head>
        <title>BSM Portal - Customer Dashboard</title>
        <meta name="description" content="Your comprehensive customer support portal" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Here's what's happening with your support requests today.
              </p>
          </div>
          <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Today is</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setIsTicketModalOpen(true)}
            className="group bg-blue-600 hover:bg-blue-700 rounded-lg p-6 text-white transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Create Ticket</h3>
                <p className="text-blue-100 text-sm">Get help with your issues</p>
              </div>
            </div>
          </button>

          <Link
            href="/help"
            className="group bg-blue-600 hover:bg-blue-700 rounded-lg p-6 text-white transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Get Help</h3>
                <p className="text-blue-100 text-sm">Contact support team</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tickets</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalTickets}</p>
                  </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Ticket className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Open</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.openTickets}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.inProgressTickets}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.resolvedTickets}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
                    </div>
                  </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Tickets */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Tickets</h2>
              <Link
                href="/tickets"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center space-x-1"
              >
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
            <div className="space-y-4">
              {ticketData.slice(0, 3).map((ticket) => (
                <UserFriendlyTicketCard key={ticket.id} ticket={ticket} />
                      ))}
                    </div>
                  </div>

          {/* Service Status */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Service Status</h2>
              <Link
                href="/services"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center space-x-1"
              >
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
                    </div>
            <div className="space-y-4">
              {serviceData.map((service, index) => (
                <UserFriendlyServiceCard key={index} service={service} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

      {/* Ticket Creation Modal */}
      {isTicketModalOpen && (
        <TicketCreationModal
          onClose={() => setIsTicketModalOpen(false)}
          onSubmit={(data) => {
            console.log('Ticket created:', data);
            setIsTicketModalOpen(false);
          }}
        />
      )}
    </ModernLayout>
  );
}
>>>>>>> 26a8ddf1e04c6195c5dc469e033ccc90a87ac849
