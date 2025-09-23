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
  MessageSquare,
  Download,
  Settings,
  Bell,
  Search,
  Plus,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Activity,
  Filter,
  SortAsc,
  Eye,
  Edit,
  MoreVertical,
  X
} from 'lucide-react';
import TicketCreationModal from '../components/TicketCreationModal';
import TicketDetailsModal from '../components/TicketDetailsModal';
import AdvancedTicketFilters from '../components/AdvancedTicketFilters';

const navItems = [
  { href: '/', label: 'Dashboard', icon: HomeIcon },
  { href: '/tickets', label: 'Support Tickets', icon: Ticket },
  { href: '/help', label: 'Help Center', icon: HelpCircle },
  { href: '/billing', label: 'Billing & Invoices', icon: CreditCard },
  { href: '/account', label: 'My Account', icon: User },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/chat', label: 'Live Chat', icon: MessageSquare },
  { href: '/downloads', label: 'Downloads', icon: Download },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const initialTickets = [
  { 
    id: 'TCK-2024-001', 
    subject: 'Email server configuration issue', 
    priority: 'High', 
    status: 'In Progress', 
    assignee: 'Sarah Johnson', 
    created: '2024-01-15T10:30:00Z',
    updated: '2024-01-15T14:20:00Z',
    description: 'Unable to send emails from the new server configuration. This is affecting our daily operations and customer communications.',
    category: 'technical',
    comments: [
      {
        id: '1',
        author: 'Sarah Johnson',
        content: 'I\'ve identified the issue with the SMTP configuration. Working on a fix now.',
        timestamp: '2024-01-15T11:00:00Z',
        isInternal: false
      }
    ],
    attachments: [
      {
        id: '1',
        name: 'smtp-config.log',
        size: 1024000,
        url: '/attachments/smtp-config.log'
      }
    ]
  },
  { 
    id: 'TCK-2024-002', 
    subject: 'Password reset not working', 
    priority: 'Medium', 
    status: 'Open', 
    assignee: 'Mike Chen', 
    created: '2024-01-14T09:15:00Z',
    updated: '2024-01-14T09:15:00Z',
    description: 'Password reset functionality is not working for some users. They receive the reset email but the link doesn\'t work.',
    category: 'technical',
    comments: [],
    attachments: []
  },
  { 
    id: 'TCK-2024-003', 
    subject: 'Database performance optimization', 
    priority: 'Low', 
    status: 'Resolved', 
    assignee: 'Alex Rodriguez', 
    created: '2024-01-13T16:45:00Z',
    updated: '2024-01-14T10:30:00Z',
    description: 'Database queries are running slowly and need optimization. This is impacting system performance.',
    category: 'technical',
    comments: [
      {
        id: '2',
        author: 'Alex Rodriguez',
        content: 'Optimized the problematic queries and added proper indexing. Performance should be improved now.',
        timestamp: '2024-01-14T10:30:00Z',
        isInternal: false
      }
    ],
    attachments: []
  },
  { 
    id: 'TCK-2024-004', 
    subject: 'Software license renewal', 
    priority: 'High', 
    status: 'Open', 
    assignee: 'Sarah Wilson', 
    created: '2024-01-12T14:20:00Z',
    updated: '2024-01-12T14:20:00Z',
    description: 'Need to renew software licenses before expiration. This is urgent as licenses expire in 2 weeks.',
    category: 'billing',
    comments: [],
    attachments: []
  },
  { 
    id: 'TCK-2024-005', 
    subject: 'User access permissions', 
    priority: 'Medium', 
    status: 'In Progress', 
    assignee: 'David Lee', 
    created: '2024-01-11T11:30:00Z',
    updated: '2024-01-15T09:15:00Z',
    description: 'Request for additional user access permissions for the new project team.',
    category: 'access',
    comments: [
      {
        id: '3',
        author: 'David Lee',
        content: 'I\'ve reviewed the access requirements. Setting up the appropriate permissions now.',
        timestamp: '2024-01-15T09:15:00Z',
        isInternal: false
      }
    ],
    attachments: []
  },
];

export default function Tickets() {
  const router = useRouter();
  const [tickets, setTickets] = useState(initialTickets);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [isClient, setIsClient] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created');
  const [sortOrder, setSortOrder] = useState('desc');
  const [advancedFilters, setAdvancedFilters] = useState({
    status: [],
    priority: [],
    category: [],
    assignee: [],
    dateRange: { start: '', end: '' },
    searchTerm: ''
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    // Basic filters
    const statusMatch = filterStatus === 'All' || ticket.status === filterStatus;
    const priorityMatch = filterPriority === 'All' || ticket.priority === filterPriority;
    const searchMatch = !searchTerm || 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Advanced filters
    const advancedStatusMatch = advancedFilters.status.length === 0 || 
      advancedFilters.status.some(filterStatus => {
        const ticketStatus = ticket.status.toLowerCase().replace(' ', '-');
        return ticketStatus === filterStatus;
      });
    
    const advancedPriorityMatch = advancedFilters.priority.length === 0 || 
      advancedFilters.priority.some(filterPriority => {
        return ticket.priority.toLowerCase() === filterPriority;
      });
    
    const advancedCategoryMatch = advancedFilters.category.length === 0 || 
      advancedFilters.category.some(filterCategory => {
        return ticket.category === filterCategory;
      });
    
    const advancedAssigneeMatch = advancedFilters.assignee.length === 0 || 
      advancedFilters.assignee.some(filterAssignee => {
        const ticketAssignee = ticket.assignee.toLowerCase().replace(' ', '-');
        return ticketAssignee === filterAssignee;
      });
    
    // Date range filter
    const dateMatch = !advancedFilters.dateRange.start || !advancedFilters.dateRange.end ||
      (new Date(ticket.created) >= new Date(advancedFilters.dateRange.start) &&
       new Date(ticket.created) <= new Date(advancedFilters.dateRange.end));
    
    // Advanced search term filter
    const advancedSearchMatch = !advancedFilters.searchTerm || 
      ticket.subject.toLowerCase().includes(advancedFilters.searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(advancedFilters.searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(advancedFilters.searchTerm.toLowerCase());
    
    return statusMatch && priorityMatch && searchMatch && 
           advancedStatusMatch && advancedPriorityMatch && 
           advancedCategoryMatch && advancedAssigneeMatch &&
           dateMatch && advancedSearchMatch;
  }).sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'created':
        aValue = new Date(a.created).getTime();
        bValue = new Date(b.created).getTime();
        break;
      case 'updated':
        aValue = new Date(a.updated).getTime();
        bValue = new Date(b.updated).getTime();
        break;
      case 'priority':
        const priorityOrder = { 'Urgent': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        aValue = priorityOrder[a.priority] || 0;
        bValue = priorityOrder[b.priority] || 0;
        break;
      case 'status':
        const statusOrder = { 'Open': 1, 'In Progress': 2, 'Resolved': 3, 'Closed': 4 };
        aValue = statusOrder[a.status] || 0;
        bValue = statusOrder[b.status] || 0;
        break;
      case 'subject':
        aValue = a.subject.toLowerCase();
        bValue = b.subject.toLowerCase();
        break;
      default:
        aValue = new Date(a.created).getTime();
        bValue = new Date(b.created).getTime();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleCreateTicket = (ticketData) => {
    const newTicket = {
      id: `TCK-2024-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: ticketData.subject,
      description: ticketData.description,
      category: ticketData.category,
      priority: ticketData.priority,
      status: 'Open',
      assignee: 'Unassigned',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      comments: [],
      attachments: ticketData.attachments.map((file, index) => ({
        id: String(index + 1),
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file)
      }))
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const handleUpdateTicket = (ticketId, updates) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, ...updates, updated: new Date().toISOString() }
        : ticket
    ));
  };

  const handleAddComment = (ticketId, comment) => {
    const newComment = {
      id: String(Date.now()),
      author: 'Customer User',
      content: comment,
      timestamp: new Date().toISOString(),
      isInternal: false
    };
    
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            comments: [...ticket.comments, newComment],
            updated: new Date().toISOString()
          }
        : ticket
    ));
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowDetailsModal(true);
  };

  const handleApplyAdvancedFilters = (filters) => {
    setAdvancedFilters(filters);
  };

  const handleQuickFilter = (type, value) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value) 
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const handleRemoveFilter = (type, value) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }));
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-zinc-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>My Tickets - BSM Customer Portal</title>
        <meta name="description" content="View and manage your support tickets" />
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
        <div className="ml-64">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                  My Tickets
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search tickets..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:ring-primary-400 dark:focus:border-primary-400"
                  />
                </div>
                
                <button 
                  onClick={() => setShowFiltersModal(true)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Filter size={20} />
                  <span>Filters</span>
                  {(advancedFilters.status.length > 0 || advancedFilters.priority.length > 0 || 
                    advancedFilters.category.length > 0 || advancedFilters.assignee.length > 0 ||
                    advancedFilters.dateRange.start || advancedFilters.dateRange.end ||
                    advancedFilters.searchTerm) && (
                    <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                      {[
                        advancedFilters.status.length,
                        advancedFilters.priority.length,
                        advancedFilters.category.length,
                        advancedFilters.assignee.length,
                        advancedFilters.dateRange.start ? 1 : 0,
                        advancedFilters.searchTerm ? 1 : 0
                      ].reduce((a, b) => a + b, 0)}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Create Ticket</span>
                </button>
                
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center dark:bg-zinc-700">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">Customer User</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6 bg-gray-50 dark:bg-zinc-950">
            <div className="space-y-6">
              {/* Filters */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Filters</h3>
                  <div className="flex items-center space-x-2">
                    {(advancedFilters.status.length > 0 || advancedFilters.priority.length > 0 || 
                      advancedFilters.category.length > 0 || advancedFilters.assignee.length > 0 ||
                      advancedFilters.dateRange.start || advancedFilters.dateRange.end ||
                      advancedFilters.searchTerm) && (
                      <button 
                        onClick={() => setAdvancedFilters({
                          status: [],
                          priority: [],
                          category: [],
                          assignee: [],
                          dateRange: { start: '', end: '' },
                          searchTerm: ''
                        })}
                        className="btn-secondary text-sm flex items-center space-x-2"
                      >
                        <X size={16} />
                        <span>Clear All</span>
                      </button>
                    )}
                    <button 
                      onClick={() => setShowFiltersModal(true)}
                      className="btn-secondary text-sm flex items-center space-x-2"
                    >
                      <Filter size={16} />
                      <span>Advanced Filters</span>
                    </button>
                  </div>
                </div>
                
                {/* Active Filters Display */}
                {(advancedFilters.status.length > 0 || advancedFilters.priority.length > 0 || 
                  advancedFilters.category.length > 0 || advancedFilters.assignee.length > 0 ||
                  advancedFilters.dateRange.start || advancedFilters.dateRange.end ||
                  advancedFilters.searchTerm) && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Active Filters:</h4>
                    <div className="flex flex-wrap gap-2">
                      {advancedFilters.status.map(status => (
                        <span key={status} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full flex items-center space-x-1">
                          <span>Status: {status.replace('-', ' ')}</span>
                          <button
                            onClick={() => handleRemoveFilter('status', status)}
                            className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                      {advancedFilters.priority.map(priority => (
                        <span key={priority} className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full flex items-center space-x-1">
                          <span>Priority: {priority}</span>
                          <button
                            onClick={() => handleRemoveFilter('priority', priority)}
                            className="hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded-full p-0.5"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                      {advancedFilters.category.map(category => (
                        <span key={category} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full flex items-center space-x-1">
                          <span>Category: {category}</span>
                          <button
                            onClick={() => handleRemoveFilter('category', category)}
                            className="hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                      {advancedFilters.assignee.map(assignee => (
                        <span key={assignee} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full flex items-center space-x-1">
                          <span>Assignee: {assignee.replace('-', ' ')}</span>
                          <button
                            onClick={() => handleRemoveFilter('assignee', assignee)}
                            className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                      {(advancedFilters.dateRange.start || advancedFilters.dateRange.end) && (
                        <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded-full flex items-center space-x-1">
                          <span>Date: {advancedFilters.dateRange.start} to {advancedFilters.dateRange.end}</span>
                          <button
                            onClick={() => setAdvancedFilters(prev => ({ ...prev, dateRange: { start: '', end: '' } }))}
                            className="hover:bg-orange-200 dark:hover:bg-orange-800 rounded-full p-0.5"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      )}
                      {advancedFilters.searchTerm && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full flex items-center space-x-1">
                          <span>Search: "{advancedFilters.searchTerm}"</span>
                          <button
                            onClick={() => setAdvancedFilters(prev => ({ ...prev, searchTerm: '' }))}
                            className="hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-0.5"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  {/* Quick Filter Buttons */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Quick Filters:</h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleQuickFilter('status', 'open')}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                          advancedFilters.status.includes('open')
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700'
                            : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-300 dark:border-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-700'
                        }`}
                      >
                        Open Tickets
                      </button>
                      <button
                        onClick={() => handleQuickFilter('status', 'in-progress')}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                          advancedFilters.status.includes('in-progress')
                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700'
                            : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-300 dark:border-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-700'
                        }`}
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => handleQuickFilter('priority', 'high')}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                          advancedFilters.priority.includes('high')
                            ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700'
                            : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-300 dark:border-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-700'
                        }`}
                      >
                        High Priority
                      </button>
                      <button
                        onClick={() => handleQuickFilter('priority', 'urgent')}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                          advancedFilters.priority.includes('urgent')
                            ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-700'
                            : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-300 dark:border-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-700'
                        }`}
                      >
                        Urgent
                      </button>
                      <button
                        onClick={() => handleQuickFilter('category', 'technical')}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                          advancedFilters.category.includes('technical')
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700'
                            : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-300 dark:border-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-700'
                        }`}
                      >
                        Technical
                      </button>
                    </div>
                  </div>

                  {/* Basic Filters */}
                  <div className="flex items-center space-x-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Status</label>
                      <select 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="input-field w-40"
                      >
                        <option value="All">All Status</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Priority</label>
                      <select 
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="input-field w-40"
                      >
                        <option value="All">All Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tickets List */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">
                    Tickets ({filteredTickets.length})
                  </h3>
                  <div className="flex items-center space-x-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="input-field w-32 text-sm"
                    >
                      <option value="created">Created Date</option>
                      <option value="updated">Updated Date</option>
                      <option value="priority">Priority</option>
                      <option value="status">Status</option>
                      <option value="subject">Subject</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="btn-secondary text-sm flex items-center space-x-2"
                    >
                      <SortAsc size={16} className={sortOrder === 'desc' ? 'rotate-180' : ''} />
                      <span>{sortOrder === 'asc' ? 'Asc' : 'Desc'}</span>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredTickets.map((ticket) => (
                    <div key={ticket.id} className="border border-gray-200 dark:border-zinc-700 rounded-lg p-4 hover:shadow-md transition-shadow dark:bg-zinc-800">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-medium text-gray-900 dark:text-zinc-100">{ticket.id}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              ticket.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                              ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                              ticket.priority === 'Low' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            }`}>
                              {ticket.priority}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              ticket.status === 'Open' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                              ticket.status === 'Resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                            }`}>
                              {ticket.status}
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 capitalize">
                              {ticket.category}
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">{ticket.subject}</h4>
                          <p className="text-gray-600 dark:text-zinc-300 mb-3 line-clamp-2">{ticket.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-zinc-400">
                            <span>Assigned to: {ticket.assignee}</span>
                            <span>Created: {new Date(ticket.created).toLocaleDateString()}</span>
                            {ticket.comments && ticket.comments.length > 0 && (
                              <span className="flex items-center space-x-1">
                                <MessageSquare size={14} />
                                <span>{ticket.comments.length} comments</span>
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleViewTicket(ticket)}
                            className="btn-secondary text-sm flex items-center space-x-1"
                          >
                            <Eye size={14} />
                            <span>View</span>
                          </button>
                          <button className="btn-primary text-sm flex items-center space-x-1">
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredTickets.length === 0 && (
                    <div className="text-center py-8">
                      <Ticket size={48} className="mx-auto text-gray-400 dark:text-zinc-600 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-2">No tickets found</h3>
                      <p className="text-gray-500 dark:text-zinc-400 mb-4">
                        {searchTerm || advancedFilters.status.length > 0 || advancedFilters.priority.length > 0
                          ? 'Try adjusting your filters or search terms.'
                          : 'You don\'t have any support tickets yet.'}
                      </p>
                      {!searchTerm && advancedFilters.status.length === 0 && advancedFilters.priority.length === 0 && (
                        <button 
                          onClick={() => setShowCreateModal(true)}
                          className="btn-primary"
                        >
                          Create Your First Ticket
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <TicketCreationModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateTicket}
        />
      )}

      {showDetailsModal && selectedTicket && (
        <TicketDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          ticket={selectedTicket}
          onUpdate={handleUpdateTicket}
          onAddComment={handleAddComment}
        />
      )}

      {showFiltersModal && (
        <AdvancedTicketFilters
          isOpen={showFiltersModal}
          onClose={() => setShowFiltersModal(false)}
          onApplyFilters={handleApplyAdvancedFilters}
          currentFilters={advancedFilters}
        />
      )}
    </>
  );
}
