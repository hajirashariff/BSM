import React, { useState, useEffect } from 'react';
import { 
  Ticket, 
  Plus, 
  Filter, 
  Search, 
  MoreVertical, 
  Clock, 
  User, 
  AlertCircle,
  CheckCircle,
  XCircle,
  MessageSquare,
  Mail,
  Phone,
  Slack,
  Zap,
  Brain,
  Bot,
  UserCheck,
  Eye,
  Edit,
  Trash2,
  Copy,
  UserPlus,
  TrendingUp,
  X,
  RefreshCw
} from 'lucide-react';
import HumanApprovalChamber from '../components/HumanApprovalChamber';
import { ticketService, realtimeService, Ticket as SupabaseTicket } from '../lib/supabaseService';

interface TicketFilters {
  status?: string[];
  priority?: string[];
  category?: string[];
  channel?: string[];
  assignee?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<SupabaseTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<SupabaseTicket[]>([]);
  const [pendingTickets, setPendingTickets] = useState<SupabaseTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<TicketFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupabaseTicket | null>(null);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Load tickets from Supabase
  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);
        const allTickets = await ticketService.getTickets();
        setTickets(allTickets || []);
        
        // Filter pending tickets for human approval
        const pending = (allTickets || []).filter((ticket: SupabaseTicket) => 
          ticket.status === 'Open' || ticket.status === 'Pending'
        );
        setPendingTickets(pending);
      } catch (error) {
        console.error('Error loading tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  // Set up real-time subscriptions
  useEffect(() => {
    const ticketSubscription = realtimeService.subscribeToTickets((payload: any) => {
      console.log('Ticket update received:', payload);
      // Reload tickets when changes occur
      loadTickets();
    });

    return () => {
      ticketSubscription?.unsubscribe();
    };
  }, []);

  // Function to reload tickets
  const loadTickets = async () => {
    try {
      const allTickets = await ticketService.getTickets();
      setTickets(allTickets || []);
      
      // Filter pending tickets for human approval
      const pending = (allTickets || []).filter((ticket: SupabaseTicket) => 
        ticket.status === 'Open' || ticket.status === 'Pending'
      );
      setPendingTickets(pending);
    } catch (error) {
      console.error('Error loading tickets:', error);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...tickets];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(ticket =>
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (filters.status?.length) {
      filtered = filtered.filter(ticket => filters.status!.includes(ticket.status));
    }

    // Priority filter
    if (filters.priority?.length) {
      filtered = filtered.filter(ticket => filters.priority!.includes(ticket.priority));
    }

    // Category filter
    if (filters.category?.length) {
      filtered = filtered.filter(ticket => filters.category!.includes(ticket.category));
    }

    // Channel filter
    if (filters.channel?.length) {
      filtered = filtered.filter(ticket => filters.channel!.includes(ticket.channel || 'Portal'));
    }

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sortBy as keyof SupabaseTicket];
      const bValue = b[sortBy as keyof SupabaseTicket];
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredTickets(filtered);
  }, [tickets, searchQuery, filters, sortBy, sortOrder]);

  const handleApproveTicket = async (ticketId: string) => {
    try {
      await ticketService.updateTicket(ticketId, { status: 'In Progress' });
      await loadTickets();
    } catch (error) {
      console.error('Error approving ticket:', error);
    }
  };

  const handleRejectTicket = async (ticketId: string) => {
    try {
      await ticketService.updateTicket(ticketId, { status: 'Closed' });
      await loadTickets();
    } catch (error) {
      console.error('Error rejecting ticket:', error);
    }
  };

  // Convert SupabaseTicket to HumanApprovalChamber Ticket format
  const convertToApprovalTicket = (ticket: SupabaseTicket) => ({
    id: ticket.id,
    subject: ticket.subject,
    description: ticket.description,
    priority: ticket.priority,
    status: ticket.status,
    category: ticket.category,
    channel: ticket.channel || 'Portal',
    assignee: ticket.assigned_to || '',
    requester: ticket.customer_email || 'Unknown',
    created: ticket.created_at,
    updated: ticket.updated_at,
    sla: ticket.sla_deadline || '',
    tags: ticket.tags || [],
    aiInsights: 'AI analysis pending',
    sentiment: 'Neutral',
    approvalMethod: 'human',
    approvedBy: '',
    approvedAt: null
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-red-600 bg-red-100';
      case 'In Progress': return 'text-yellow-600 bg-yellow-100';
      case 'Resolved': return 'text-green-600 bg-green-100';
      case 'Closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'text-blue-600 bg-blue-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Urgent': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Email': return Mail;
      case 'Phone': return Phone;
      case 'Chat': return MessageSquare;
      case 'Portal': return Ticket;
      case 'Slack': return Slack;
      default: return Ticket;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
              <h1 className="text-2xl font-bold text-gray-900">Ticket Management</h1>
              <p className="text-gray-600">Manage and track all support tickets</p>
        </div>
            <div className="flex items-center gap-4">
        <button 
                onClick={loadTickets}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" />
                Create Ticket
        </button>
            </div>
          </div>
        </div>
      </div>

      {/* Human Approval Chamber */}
      {pendingTickets.length > 0 && (
        <div className="px-6 py-4">
          <HumanApprovalChamber
            pendingTickets={pendingTickets.map(convertToApprovalTicket)}
            onApprove={handleApproveTicket}
            onReject={handleRejectTicket}
            onViewDetails={(ticket) => {
              // Find the original SupabaseTicket
              const originalTicket = pendingTickets.find(t => t.id === ticket.id);
              if (originalTicket) {
                setSelectedTicket(originalTicket);
                setShowTicketDetails(true);
              }
            }}
          />
        </div>
      )}

      {/* Filters */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                  </div>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Channel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
              </tr>
            </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => {
                  const ChannelIcon = getChannelIcon(ticket.channel || 'Portal');
                return (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
                          <div className="text-sm text-gray-500">#{ticket.id}</div>
                      </div>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ticket.category}
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ChannelIcon className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-900">{ticket.channel || 'Portal'}</span>
                      </div>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(ticket.created_at).toLocaleDateString()}
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setShowTicketDetails(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Ticket Details Modal */}
      {showTicketDetails && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedTicket.subject}</h2>
              <button
                  onClick={() => setShowTicketDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
              </button>
            </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="text-sm text-gray-900 mt-1">{selectedTicket.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedTicket.status)}`}>
                      {selectedTicket.status}
                    </span>
                </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Priority</h3>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p className="text-sm text-gray-900">{selectedTicket.category}</p>
                </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Channel</h3>
                    <p className="text-sm text-gray-900">{selectedTicket.channel || 'Portal'}</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
