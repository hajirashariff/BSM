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

const mockKPIs = [
  {
    id: 'active-tickets',
    title: 'Active Tickets',
    value: '3',
    change: '+1',
    changeType: 'increase',
    icon: Ticket,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-100/20',
    trend: [2, 3, 2, 4, 3, 5, 3],
    description: 'Currently open support requests'
  },
  {
    id: 'resolved-this-month',
    title: 'Resolved This Month',
    value: '8',
    change: '+2',
    changeType: 'increase',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-100/20',
    trend: [5, 6, 7, 8, 9, 10, 8],
    description: 'Successfully resolved tickets'
  },
  {
    id: 'avg-response-time',
    title: 'Avg Response Time',
    value: '2.1h',
    change: '-15%',
    changeType: 'decrease',
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-100/20',
    trend: [3.2, 2.8, 2.5, 2.3, 2.1, 2.0, 2.1],
    description: 'Average time to first response'
  },
  {
    id: 'satisfaction-score',
    title: 'Satisfaction Score',
    value: '4.8/5',
    change: '+0.3',
    changeType: 'increase',
    icon: Star,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-100/20',
    trend: [4.2, 4.3, 4.5, 4.6, 4.7, 4.8, 4.8],
    description: 'Customer satisfaction rating'
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
  },
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

export default function Dashboard() {
  const router = useRouter();
  const [showAITicketCreator, setShowAITicketCreator] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState(['kpis', 'tickets', 'health', 'knowledge', 'activity']);
  const [widgetSettings, setWidgetSettings] = useState({});
  const [expandedNotifications, setExpandedNotifications] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle click outside to close notifications
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNotifications) {
        const target = event.target as Element;
        if (!target.closest('[data-notification-dropdown]') && !target.closest('[data-notification-bell]')) {
          setShowNotifications(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);


  const handleCreateAITicket = () => {
    setShowAITicketCreator(true);
  };

  const handleTicketSubmit = (ticketData: any) => {
    console.log('New ticket created:', ticketData);
    // Here you would typically send the ticket data to your backend API
    // For now, we'll just log it and show a success message
    alert(`Ticket ${ticketData.id} created successfully!`);
  };

  // Mock notification data
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'New Ticket Assigned',
      message: 'You have been assigned to ticket TKT-001: Login issues with mobile app',
      type: 'ticket' as const,
      timestamp: '2024-01-20T10:30:00Z',
      read: false,
      actionUrl: '/tickets',
      priority: 'high' as const
    },
    {
      id: 'notif-2',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST. During this time, some features may be temporarily unavailable. We apologize for any inconvenience and appreciate your patience. The maintenance includes security updates, performance improvements, and new feature deployments. All services will be fully restored by 4:00 AM EST.',
      type: 'system' as const,
      timestamp: '2024-01-20T09:15:00Z',
      read: false,
      priority: 'medium' as const
    },
    {
      id: 'notif-3',
      title: 'Password Reset Required',
      message: 'Your password will expire in 7 days. Please update it soon.',
      type: 'reminder' as const,
      timestamp: '2024-01-19T14:22:00Z',
      read: true,
      actionUrl: '/settings',
      priority: 'low' as const
    }
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 'ann-1',
      title: 'New Home Features Available',
      type: 'info' as const,
      message: 'We\'ve added new customizable widgets and improved analytics to your dashboard.',
      startDate: '2024-01-18T00:00:00Z',
      endDate: '2024-02-18T00:00:00Z',
      targetRoles: ['customer'],
      isDismissible: true
    }
  ]);

  const handleNotificationClick = (notification: any) => {
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleDismissAnnouncement = (announcementId: string) => {
    setAnnouncements(prev => 
      prev.filter(ann => ann.id !== announcementId)
    );
  };

  const toggleNotificationExpansion = (notificationId: string) => {
    setExpandedNotifications(prev => {
      const newSet = new Set(prev);
      if (newSet.has(notificationId)) {
        newSet.delete(notificationId);
      } else {
        newSet.add(notificationId);
      }
      return newSet;
    });
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'In Progress': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Pending': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'Resolved': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getServiceStatusColor = (status: string) => {
    switch (status) {
      case 'Operational': return 'text-green-600';
      case 'Degraded': return 'text-yellow-600';
      case 'Outage': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  const KPICard = ({ kpi }: { kpi: any }) => {
    const Icon = kpi.icon;
    return (
      <div className="card dark:bg-zinc-900 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
            <Icon size={24} className={kpi.color} />
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              {kpi.changeType === 'increase' ? (
                <ArrowUp size={16} className="text-green-600" />
              ) : (
                <ArrowDown size={16} className="text-red-600" />
              )}
              <span className={`text-sm font-medium ${
                kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mb-2">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">{kpi.value}</h3>
          <p className="text-sm font-medium text-gray-600 dark:text-zinc-400">{kpi.title}</p>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-zinc-500">{kpi.description}</p>
        
        {/* Mini trend chart */}
        <div className="mt-3 flex items-end space-x-1 h-8">
          {kpi.trend.map((value: any, index: number) => (
            <div
              key={index}
              className="flex-1 bg-primary-100 dark:bg-primary-900/30 rounded-sm"
              style={{ height: `${(value / Math.max(...kpi.trend)) * 100}%` }}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  const TicketCard = ({ ticket }: { ticket: any }) => (
    <div className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-zinc-100 mb-1">{ticket.subject}</h4>
          <p className="text-sm text-gray-600 dark:text-zinc-400">{ticket.description}</p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
            {ticket.status}
          </span>
          <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400">
        <div className="flex items-center space-x-4">
          <span>#{ticket.id}</span>
          <span>{ticket.category}</span>
          <span>SLA: {ticket.sla}</span>
        </div>
        <span>{formatTimeAgo(ticket.updated)}</span>
      </div>
    </div>
  );

  const ServiceHealthCard = ({ service }: { service: any }) => {
    const Icon = service.icon;
    return (
      <div className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Icon size={20} className={getServiceStatusColor(service.status)} />
            <h4 className="font-medium text-gray-900 dark:text-zinc-100">{service.service}</h4>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            service.status === 'Operational' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
            service.status === 'Degraded' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
          }`}>
            {service.status}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-zinc-400">Uptime</span>
            <p className="font-medium text-gray-900 dark:text-zinc-100">{service.uptime}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-zinc-400">Response Time</span>
            <p className="font-medium text-gray-900 dark:text-zinc-100">{service.responseTime}</p>
          </div>
        </div>
      </div>
    );
  };

  const KnowledgeBaseCard = ({ article }: { article: any }) => (
    <div className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
      <h4 className="font-medium text-gray-900 dark:text-zinc-100 mb-2">{article.title}</h4>
      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-zinc-400 mb-2">
        <span>{article.category}</span>
        <span>{article.views} views</span>
        <span>{article.helpful} helpful</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {article.tags.map((tag: any, index: number) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full dark:bg-zinc-800 dark:text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  const ActivityCard = ({ activity }: { activity: any }) => {
    const Icon = activity.icon;
    return (
      <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg transition-colors">
        <div className="w-8 h-8 bg-gray-100 dark:bg-zinc-700 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon size={16} className="text-gray-600 dark:text-zinc-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">{activity.action}</p>
          <p className="text-sm text-gray-600 dark:text-zinc-400">{activity.description}</p>
          <p className="text-xs text-gray-500 dark:text-zinc-500">{formatTimeAgo(activity.timestamp)}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Home - BSM Customer Portal</title>
        <meta name="description" content="Customer Portal Home" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BSM</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-zinc-100">Customer Portal</h1>
            </div>
          </div>
          
          <nav className="px-4 pb-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const active = router.pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                        active 
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600 dark:bg-zinc-800 dark:text-zinc-100 dark:border-primary-400' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="ml-64 flex flex-col min-h-screen">
          <header className="h-16 flex items-center justify-between px-6 bg-white shadow-sm border-b border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">Home</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-zinc-400">
                <Calendar size={16} />
                <span>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleCreateAITicket}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Create Ticket</span>
              </button>

              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                data-notification-bell
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
              >
                <Bell size={20} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center dark:bg-zinc-700">
                  <User size={16} />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">{mockUser.name}</p>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">{mockUser.role}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 bg-gray-50 dark:bg-zinc-950">
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="card dark:bg-zinc-900 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-1">
                      Welcome back, {mockUser.name}!
                    </h3>
                    <p className="text-gray-600 dark:text-zinc-400">
                      Here's what's happening with your account today.
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-zinc-400">
                    <p>Last login: {formatTimeAgo(mockUser.lastLogin)}</p>
                    <p>Company: {mockUser.company}</p>
                  </div>
                </div>
              </div>

              {/* KPI Cards */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Key Metrics</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300">
                      <RefreshCw size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockKPIs.map((kpi) => (
                    <KPICard key={kpi.id} kpi={kpi} />
                  ))}
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Recent Tickets */}
                  <div className="card dark:bg-zinc-900 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Recent Tickets</h3>
                      <Link href="/tickets" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {mockRecentTickets.map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                      ))}
                    </div>
                  </div>

                  {/* Service Health */}
                  <div className="card dark:bg-zinc-900 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Service Health</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-zinc-400">All Systems Operational</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockServiceHealth.map((service) => (
                        <ServiceHealthCard key={service.service} service={service} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div className="card dark:bg-zinc-900 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {mockQuickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                          <Link
                            key={action.id}
                            href={action.href}
                            className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors text-center"
                          >
                            <div className={`w-10 h-10 ${action.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                              <Icon size={20} className={action.color} />
                            </div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-zinc-100 mb-1">{action.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-zinc-400">{action.description}</p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Knowledge Base */}
                  <div className="card dark:bg-zinc-900 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Popular Articles</h3>
                      <Link href="/help" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {mockKnowledgeBase.map((article) => (
                        <KnowledgeBaseCard key={article.id} article={article} />
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="card dark:bg-zinc-900 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Recent Activity</h3>
                      <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        View All
                      </button>
                    </div>
                    <div className="space-y-1">
                      {mockRecentActivity.map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Announcements */}
              {mockAnnouncements.length > 0 && (
                <div className="card dark:bg-zinc-900 dark:border-zinc-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-4">Announcements</h3>
                  <div className="space-y-3">
                    {mockAnnouncements.map((announcement) => (
                      <div key={announcement.id} className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-zinc-100">{announcement.title}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            announcement.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                            announcement.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          }`}>
                            {announcement.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-zinc-400 mb-2">{announcement.content}</p>
                        <p className="text-xs text-gray-500 dark:text-zinc-500">
                          Published {formatTimeAgo(announcement.published)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Notification Dropdown */}
        {showNotifications && (
          <div 
            data-notification-dropdown
            className="fixed top-16 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-gray-500">✕</span>
                </button>
              </div>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-4">🔔</div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No notifications</h4>
                  <p className="text-gray-500 text-sm">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => {
                        handleNotificationClick(notification);
                        handleMarkAsRead(notification.id);
                      }}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {new Date(notification.timestamp).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p className={expandedNotifications.has(notification.id) ? '' : 'line-clamp-2'}>
                              {notification.message}
                            </p>
                            {notification.message.length > 100 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleNotificationExpansion(notification.id);
                                }}
                                className="text-blue-600 hover:text-blue-700 text-xs font-medium mt-1"
                              >
                                {expandedNotifications.has(notification.id) ? 'Read Less' : 'Read More'}
                              </button>
                            )}
                          </div>
                          {notification.priority === 'high' && (
                            <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              High Priority
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {notifications.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                  }}
                  className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
        )}

        {/* Modals */}
        {showAITicketCreator && (
          <AITicketCreator
            isOpen={showAITicketCreator}
            onClose={() => setShowAITicketCreator(false)}
            onSubmit={handleTicketSubmit}
          />
        )}

      </div>
    </>
  );
}