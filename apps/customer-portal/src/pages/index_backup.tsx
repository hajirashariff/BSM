import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TicketCreationModal from '../components/TicketCreationModal';
import ModernLayout from '../components/ModernLayout';
import { useAuth } from '../contexts/AuthContext';
import { ticketService, dashboardService, realtimeService } from '../lib/supabaseService';
import {
  Plus,
  Ticket,
  Star,
  Server,
  HelpCircle,
  Bell,
  Search,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
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

// Dashboard component
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    console.log('🔍 Dashboard: User data:', user);
  }, [user]);

  // Dynamic data from Supabase
  const [stats, setStats] = useState({
    openTickets: 0,
    inProgressTickets: 0,
    resolvedTickets: 0,
    totalTickets: 0
  });

  const [recentTickets, setRecentTickets] = useState<any[]>([]);
  const [dashboardMetrics, setDashboardMetrics] = useState<any>(null);

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Load ticket statistics
        const ticketStats = await ticketService.getTicketStats();
        if (ticketStats) {
          setStats({
            openTickets: ticketStats.open || 0,
            inProgressTickets: ticketStats.in_progress || 0,
            resolvedTickets: ticketStats.resolved || 0,
            totalTickets: ticketStats.total || 0
          });
        }

        // Load recent tickets
        const recent = await dashboardService.getRecentTickets(3);
        setRecentTickets(recent);

        // Load dashboard metrics
        const metrics = await dashboardService.getDashboardMetrics();
        setDashboardMetrics(metrics);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    if (isClient) {
      loadDashboardData();
    }
  }, [isClient, user]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!isClient) return;

    const ticketSubscription = realtimeService.subscribeToTickets((payload) => {
      console.log('Ticket update received:', payload);
      // Reload ticket data when changes occur
      loadDashboardData();
    });

    return () => {
      ticketSubscription?.unsubscribe();
    };
  }, [isClient]);

  // Function to reload all dashboard data
  const loadDashboardData = async () => {
    try {
      // Load ticket statistics
      const ticketStats = await ticketService.getTicketStats();
      if (ticketStats) {
        setStats({
          openTickets: ticketStats.open || 0,
          inProgressTickets: ticketStats.in_progress || 0,
          resolvedTickets: ticketStats.resolved || 0,
          totalTickets: ticketStats.total || 0
        });
      }

      // Load recent tickets
      const recent = await dashboardService.getRecentTickets(3);
      setRecentTickets(recent);

      // Load dashboard metrics
      const metrics = await dashboardService.getDashboardMetrics();
      setDashboardMetrics(metrics);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const quickActions = [
    {
      name: 'Create Ticket',
      icon: Plus,
      action: () => {
        console.log('🎫 Create Ticket button clicked');
        setIsTicketModalOpen(true);
        console.log('🎫 Modal state set to true');
      },
      description: 'Get help with your issues'
    },
    {
      name: 'View Tickets',
      icon: Ticket,
      action: () => router.push('/tickets'),
      description: 'Check your support requests'
    },
    {
      name: 'Rate Service',
      icon: Star,
      action: () => router.push('/ratings'),
      description: 'Rate your experience'
    },
    {
      name: 'System Status',
      icon: Server,
      action: () => router.push('/services'),
      description: 'Check service status'
    },
    {
      name: 'Get Help',
      icon: HelpCircle,
      action: () => router.push('/help'),
      description: 'Find answers and support'
    },
    {
      name: 'Refresh',
      icon: RefreshCw,
      action: () => {
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      },
      description: 'Refresh the page'
    }
  ];

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
        <title>Customer Portal - Dashboard</title>
        <meta name="description" content="BSM Customer Portal Dashboard" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your support tickets and access our services
          </p>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="group bg-blue-600 hover:bg-blue-700 rounded-lg p-6 text-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold">{action.name}</h3>
                  <p className="text-blue-100 text-sm">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
      </div>
      
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalTickets}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
                    </div>
                  </div>
                </div>

        {/* Recent Tickets */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Tickets</h2>
                          <Link
              href="/tickets"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
                        View All
                      </Link>
                    </div>
          
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">{ticket.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      ticket.status === 'open' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : ticket.status === 'in-progress'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {ticket.status.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      ticket.priority === 'high' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : ticket.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Created {formatTimeAgo(ticket.createdAt)} • Updated {formatTimeAgo(ticket.updatedAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Paperclip className="w-4 h-4" />
                      </button>
                </div>
                      </div>
                    ))}
                  </div>
                </div>
        </div>

      {/* Ticket Creation Modal */}
      {isTicketModalOpen && (
        <>
          {console.log('🎫 Rendering TicketCreationModal')}
          <TicketCreationModal
          onClose={() => setIsTicketModalOpen(false)}
          onSubmit={async (ticketData) => {
            console.log('🎫 Starting ticket creation process...');
            console.log('📋 Ticket data received:', ticketData);
            
            try {
              // Create ticket using Supabase service
              console.log('🔄 Calling ticketService.createTicket...');
              const newTicket = await ticketService.createTicket({
                subject: ticketData.subject,
                description: ticketData.description,
                category: ticketData.category,
                priority: ticketData.priority,
                tags: ticketData.tags,
                attachments: ticketData.attachments,
                metadata: {}
              });
              
              console.log('📤 Ticket service response:', newTicket);
              
              if (newTicket) {
                console.log('✅ Ticket created successfully:', newTicket);
                setIsTicketModalOpen(false);
                
                // Refresh all dashboard data immediately
                console.log('🔄 Refreshing dashboard data...');
                await loadDashboardData();
                
                // Show success message
                alert('Ticket created successfully!');
                console.log('🎉 Ticket creation process completed successfully!');
              } else {
                console.error('❌ Ticket service returned null/undefined');
                throw new Error('Failed to create ticket - service returned null');
              }
            } catch (error) {
              console.error('❌ Error creating ticket:', error);
              console.error('❌ Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
              });
              alert(`Failed to create ticket: ${error.message}`);
            }
          }}
        />
      )}
    </ModernLayout>
  );
};

export default Dashboard;