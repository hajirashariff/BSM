import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Ticket, 
  ArrowLeft, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Phone,
  Mail,
  Building2,
  Star,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw
} from 'lucide-react';

interface TicketData {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  customer: string;
  company: string;
  created: string;
  updated: string;
  category: string;
  estimatedTime: string;
  actualTime?: string;
  tags: string[];
}

export default function ActiveTickets() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [tickets, setTickets] = useState<TicketData[]>([
    {
      id: 'TK-001',
      title: 'Email server connectivity issues',
      description: 'Users reporting inability to send/receive emails. Error messages indicate SMTP connection failures.',
      status: 'in-progress',
      priority: 'high',
      assignee: 'John Smith',
      customer: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      created: '2024-01-15',
      updated: '2024-01-16',
      category: 'Email Services',
      estimatedTime: '4 hours',
      actualTime: '2.5 hours',
      tags: ['email', 'server', 'connectivity']
    },
    {
      id: 'TK-002',
      title: 'VPN access problems',
      description: 'Remote employees unable to connect to company VPN. Authentication failures reported.',
      status: 'open',
      priority: 'urgent',
      assignee: 'Mike Wilson',
      customer: 'David Brown',
      company: 'Global Solutions Ltd.',
      created: '2024-01-16',
      updated: '2024-01-16',
      category: 'Network Security',
      estimatedTime: '6 hours',
      tags: ['vpn', 'security', 'remote']
    },
    {
      id: 'TK-003',
      title: 'Database backup verification',
      description: 'Routine backup verification needed for production database. Last backup status unclear.',
      status: 'open',
      priority: 'medium',
      assignee: 'Lisa Chen',
      customer: 'Robert Davis',
      company: 'DataFlow Systems',
      created: '2024-01-15',
      updated: '2024-01-15',
      category: 'Database Management',
      estimatedTime: '3 hours',
      tags: ['database', 'backup', 'verification']
    },
    {
      id: 'TK-004',
      title: 'Printer configuration update',
      description: 'Update printer drivers and configuration for new office location.',
      status: 'resolved',
      priority: 'low',
      assignee: 'Tom Anderson',
      customer: 'Jennifer Lee',
      company: 'Office Solutions Co.',
      created: '2024-01-14',
      updated: '2024-01-16',
      category: 'Hardware Support',
      estimatedTime: '2 hours',
      actualTime: '1.5 hours',
      tags: ['printer', 'hardware', 'configuration']
    },
    {
      id: 'TK-005',
      title: 'Software license renewal',
      description: 'Annual software license renewal for Microsoft Office 365 and Adobe Creative Suite.',
      status: 'open',
      priority: 'medium',
      assignee: 'Amy Rodriguez',
      customer: 'Mark Thompson',
      company: 'Creative Agency Pro',
      created: '2024-01-13',
      updated: '2024-01-15',
      category: 'Software Management',
      estimatedTime: '1 hour',
      tags: ['licensing', 'software', 'renewal']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertTriangle className="text-red-500" size={16} />;
      case 'high': return <AlertTriangle className="text-orange-500" size={16} />;
      case 'medium': return <Clock className="text-yellow-500" size={16} />;
      case 'low': return <CheckCircle className="text-green-500" size={16} />;
      default: return <Clock className="text-gray-500" size={16} />;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const refreshData = async () => {
    if (!isClient) return; // Only run on client side
    
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleTicketClick = (ticket: TicketData) => {
    setSelectedTicket(ticket);
  };

  const closeTicketDetails = () => {
    setSelectedTicket(null);
  };

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <Ticket className="text-white animate-pulse" size={24} />
          </div>
          <p className="text-gray-600 font-medium">Loading Active Tickets...</p>
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
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Ticket className="text-blue-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Active Tickets</h1>
                <p className="text-sm text-gray-600">Manage and track service requests</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshData}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all duration-300 ${isRefreshing ? 'animate-pulse' : ''}`}
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                <span className="text-sm font-medium">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                <Plus size={16} />
                <span className="text-sm font-medium">New Ticket</span>
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
                <p className="text-sm font-medium text-gray-600 mb-1">Total Tickets</p>
                <p className="text-3xl font-bold text-gray-900">{tickets.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ticket className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Open</p>
                <p className="text-3xl font-bold text-blue-600">{tickets.filter(t => t.status === 'open').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600">{tickets.filter(t => t.status === 'in-progress').length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Resolved</p>
                <p className="text-3xl font-bold text-green-600">{tickets.filter(t => t.status === 'resolved').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
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
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Tickets ({filteredTickets.length})</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleTicketClick(ticket)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold text-gray-900">{ticket.id}</span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium border ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium border ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{ticket.title}</h4>
                    <p className="text-gray-600 mb-3 line-clamp-2">{ticket.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{ticket.assignee}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Building2 size={16} />
                        <span>{ticket.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{ticket.created}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{ticket.estimatedTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      {ticket.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {getPriorityIcon(ticket.priority)}
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

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{selectedTicket.title}</h2>
                <button
                  onClick={closeTicketDetails}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Ticket ID</label>
                      <p className="text-gray-900">{selectedTicket.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium border ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Priority</label>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium border ${getPriorityColor(selectedTicket.priority)}`}>
                        {selectedTicket.priority}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Category</label>
                      <p className="text-gray-900">{selectedTicket.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Estimated Time</label>
                      <p className="text-gray-900">{selectedTicket.estimatedTime}</p>
                    </div>
                    {selectedTicket.actualTime && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Actual Time</label>
                        <p className="text-gray-900">{selectedTicket.actualTime}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Customer</label>
                      <p className="text-gray-900">{selectedTicket.customer}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Company</label>
                      <p className="text-gray-900">{selectedTicket.company}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Assigned To</label>
                      <p className="text-gray-900">{selectedTicket.assignee}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Created</label>
                      <p className="text-gray-900">{selectedTicket.created}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Updated</label>
                      <p className="text-gray-900">{selectedTicket.updated}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedTicket.description}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex items-center space-x-2">
                  {selectedTicket.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-end space-x-4">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
