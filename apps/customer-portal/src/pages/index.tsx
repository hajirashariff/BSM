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
        </div>
      </div>
    );
  }

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
