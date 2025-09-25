import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Home as HomeIcon, 
  Ticket as TicketIcon, 
  HelpCircle,
  CreditCard,
  User,
  FileText,
  MessageSquare,
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
  Filter,
  SortAsc,
  SortDesc,
  Eye,
  Edit,
  Trash2,
  MessageCircle,
  Paperclip,
  Star,
  X,
  ChevronDown,
  MoreVertical,
  RefreshCw
} from 'lucide-react';
import { ticketService, Ticket, TicketFilters, CreateTicketData } from '../lib/ticketService';
import TicketCreationModal from '../components/TicketCreationModal';
import TicketDetailsModal from '../components/TicketDetailsModal';
import AdvancedTicketFilters from '../components/AdvancedTicketFilters';
import FilterDropdown from '../components/FilterDropdown';

const navItems = [
  { href: '/', label: 'Dashboard', icon: HomeIcon },
  { href: '/tickets', label: 'Support Tickets', icon: TicketIcon },
  { href: '/help', label: 'Help Center', icon: HelpCircle },
  { href: '/account', label: 'My Account', icon: User },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

const statusOptions = [
  { id: 'open', label: 'Open', icon: AlertTriangle, color: 'text-blue-600' },
  { id: 'in_progress', label: 'In Progress', icon: Clock, color: 'text-yellow-600' },
  { id: 'pending', label: 'Pending', icon: Clock, color: 'text-orange-600' },
  { id: 'resolved', label: 'Resolved', icon: CheckCircle, color: 'text-green-600' },
  { id: 'closed', label: 'Closed', icon: X, color: 'text-gray-600' },
];

const priorityOptions = [
  { id: 'low', label: 'Low', color: 'text-green-600' },
  { id: 'medium', label: 'Medium', color: 'text-yellow-600' },
  { id: 'high', label: 'High', color: 'text-orange-600' },
  { id: 'urgent', label: 'Urgent', color: 'text-red-600' },
];

const categoryOptions = [
  { id: 'technical', label: 'Technical Support' },
  { id: 'billing', label: 'Billing & Invoices' },
  { id: 'general', label: 'General Inquiry' },
  { id: 'feature_request', label: 'Feature Request' },
  { id: 'bug_report', label: 'Bug Report' },
];

const priorityColors = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
};

const statusColors = {
  open: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  in_progress: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
};

export default function TicketsPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'created' | 'updated' | 'priority' | 'status' | 'subject'>('updated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [advancedFilters, setAdvancedFilters] = useState<TicketFilters>({});
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
    overdue: 0
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setIsClient(true);
    loadTickets();
  }, []);

  useEffect(() => {
    if (isClient) {
      applyFilters();
    }
  }, [tickets, searchTerm, advancedFilters, sortBy, sortOrder]);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const [ticketsData, statsData] = await Promise.all([
        ticketService.getTickets(),
        ticketService.getTicketStats()
      ]);
      setTickets(ticketsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshTickets = async () => {
    setRefreshing(true);
    await loadTickets();
    setRefreshing(false);
  };

  const applyFilters = async () => {
    try {
      // Combine search term with advanced filters
      const combinedFilters: TicketFilters = {
        ...advancedFilters,
        searchTerm: searchTerm || undefined
      };

      // Use the ticket service's built-in filtering
      const filtered = await ticketService.getTickets(combinedFilters);
      
      // Apply client-side sorting
      const sorted = filtered.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (sortBy) {
          case 'created':
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
            break;
          case 'updated':
            aValue = new Date(a.updatedAt).getTime();
            bValue = new Date(b.updatedAt).getTime();
            break;
          case 'priority':
            const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
            aValue = priorityOrder[a.priority as keyof typeof priorityOrder];
            bValue = priorityOrder[b.priority as keyof typeof priorityOrder];
            break;
          case 'status':
            const statusOrder = { open: 1, in_progress: 2, pending: 3, resolved: 4, closed: 5 };
            aValue = statusOrder[a.status as keyof typeof statusOrder];
            bValue = statusOrder[b.status as keyof typeof statusOrder];
            break;
          case 'subject':
            aValue = a.subject.toLowerCase();
            bValue = b.subject.toLowerCase();
            break;
          default:
            return 0;
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      setFilteredTickets(sorted);
    } catch (error) {
      console.error('Error applying filters:', error);
      // Fallback to client-side filtering
      let filtered = [...tickets];

      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(ticket =>
          ticket.subject.toLowerCase().includes(term) ||
          ticket.description.toLowerCase().includes(term) ||
          ticket.id.toLowerCase().includes(term) ||
          ticket.tags.some(tag => tag.toLowerCase().includes(term))
        );
      }

      // Apply advanced filters
      if (advancedFilters.status && advancedFilters.status.length > 0) {
        filtered = filtered.filter(ticket => advancedFilters.status!.includes(ticket.status));
      }
      if (advancedFilters.priority && advancedFilters.priority.length > 0) {
        filtered = filtered.filter(ticket => advancedFilters.priority!.includes(ticket.priority));
      }
      if (advancedFilters.category && advancedFilters.category.length > 0) {
        filtered = filtered.filter(ticket => advancedFilters.category!.includes(ticket.category));
      }
      if (advancedFilters.tags && advancedFilters.tags.length > 0) {
        filtered = filtered.filter(ticket =>
          advancedFilters.tags!.some(tag => ticket.tags.includes(tag))
        );
      }
      if (advancedFilters.dateRange) {
        const startDate = new Date(advancedFilters.dateRange.start);
        const endDate = new Date(advancedFilters.dateRange.end);
        filtered = filtered.filter(ticket => {
          const ticketDate = new Date(ticket.createdAt);
          return ticketDate >= startDate && ticketDate <= endDate;
        });
      }

      setFilteredTickets(filtered);
    }
  };

  const handleCreateTicket = async (data: CreateTicketData) => {
    try {
      const newTicket = await ticketService.createTicket(data, 'customer@example.com');
      setTickets(prev => [newTicket, ...prev]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowDetailsModal(true);
  };

  const handleEditTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowDetailsModal(true);
  };

  const handleDeleteTicket = async (ticketId: string) => {
    if (confirm('Are you sure you want to delete this ticket?')) {
      try {
        await ticketService.deleteTicket(ticketId);
        setTickets(prev => prev.filter(t => t.id !== ticketId));
      } catch (error) {
        console.error('Error deleting ticket:', error);
      }
    }
  };

  const handleApplyAdvancedFilters = (filters: TicketFilters) => {
    setAdvancedFilters(filters);
    setShowFiltersModal(false);
  };

  const handleQuickFilter = (type: 'status' | 'priority' | 'category', value: string) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [type]: prev[type]?.includes(value) 
        ? prev[type]!.filter(v => v !== value)
        : [...(prev[type] || []), value]
    }));
  };

  const handleRemoveFilter = (type: 'status' | 'priority' | 'category' | 'tags', value: string) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [type]: prev[type]?.filter(v => v !== value) || []
    }));
  };

  const clearAllFilters = () => {
    setAdvancedFilters({});
    setSearchTerm('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (advancedFilters.status?.length) count += advancedFilters.status.length;
    if (advancedFilters.priority?.length) count += advancedFilters.priority.length;
    if (advancedFilters.category?.length) count += advancedFilters.category.length;
    if (advancedFilters.tags?.length) count += advancedFilters.tags.length;
    if (advancedFilters.dateRange) count += 1;
    return count;
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <Head>
        <title>Support Tickets - Customer Portal</title>
        <meta name="description" content="Manage your support tickets" />
      </Head>

      <div className="flex">
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
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600 dark:bg-zinc-800 dark:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">Support Tickets</h1>
                  <p className="text-gray-600 dark:text-zinc-400">Manage and track your support requests</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={refreshTickets}
                    disabled={refreshing}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50"
                  >
                    <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
                  </button>
                  
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Plus size={20} />
                    <span>Create Ticket</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Stats Cards */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-zinc-400">Total Tickets</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-zinc-100">{stats.total}</p>
                  </div>
                  <TicketIcon className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-zinc-400">Open</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.open}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-zinc-400">In Progress</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.inProgress}</p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-zinc-400">Resolved</p>
                    <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-zinc-400">Closed</p>
                    <p className="text-2xl font-bold text-gray-600">{stats.closed}</p>
                  </div>
                  <X className="h-8 w-8 text-gray-600" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-zinc-400">Overdue</p>
                    <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                  </div>
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 p-4 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                        placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowFiltersModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    <Filter size={20} />
                    <span>Filters</span>
                    {getActiveFiltersCount() > 0 && (
                      <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getActiveFiltersCount()}
                      </span>
                    )}
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                    >
                      <option value="updated">Sort by Updated</option>
                      <option value="created">Sort by Created</option>
                      <option value="priority">Sort by Priority</option>
                      <option value="status">Sort by Status</option>
                      <option value="subject">Sort by Subject</option>
                    </select>
                    
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                      {sortOrder === 'asc' ? <SortAsc size={20} /> : <SortDesc size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Filter Dropdowns */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <FilterDropdown
                  label="Status"
                  options={statusOptions.map(status => ({
                    id: status.id,
                    label: status.label,
                    icon: status.icon,
                    color: status.color
                  }))}
                  selectedValues={advancedFilters.status || []}
                  onSelectionChange={(values) => setAdvancedFilters(prev => ({ ...prev, status: values }))}
                  placeholder="All statuses"
                  searchable={true}
                  multiSelect={true}
                />
                
                <FilterDropdown
                  label="Priority"
                  options={priorityOptions.map(priority => ({
                    id: priority.id,
                    label: priority.label,
                    color: priority.color
                  }))}
                  selectedValues={advancedFilters.priority || []}
                  onSelectionChange={(values) => setAdvancedFilters(prev => ({ ...prev, priority: values }))}
                  placeholder="All priorities"
                  searchable={true}
                  multiSelect={true}
                />
                
                <FilterDropdown
                  label="Category"
                  options={categoryOptions.map(category => ({
                    id: category.id,
                    label: category.label
                  }))}
                  selectedValues={advancedFilters.category || []}
                  onSelectionChange={(values) => setAdvancedFilters(prev => ({ ...prev, category: values }))}
                  placeholder="All categories"
                  searchable={true}
                  multiSelect={true}
                />
              </div>

              {/* Active Filters */}
              {getActiveFiltersCount() > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600 dark:text-zinc-400 mr-2">Active filters:</span>
                  {advancedFilters.status?.map(status => (
                    <span
                      key={status}
                      className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300"
                    >
                      Status: {status}
                      <button
                        onClick={() => handleRemoveFilter('status', status)}
                        className="ml-2 hover:text-blue-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  {advancedFilters.priority?.map(priority => (
                    <span
                      key={priority}
                      className="inline-flex items-center px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full dark:bg-orange-900 dark:text-orange-300"
                    >
                      Priority: {priority}
                      <button
                        onClick={() => handleRemoveFilter('priority', priority)}
                        className="ml-2 hover:text-orange-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  {advancedFilters.category?.map(category => (
                    <span
                      key={category}
                      className="inline-flex items-center px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-300"
                    >
                      Category: {category}
                      <button
                        onClick={() => handleRemoveFilter('category', category)}
                        className="ml-2 hover:text-green-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Tickets List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-zinc-400">Loading tickets...</p>
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="p-8 text-center">
                  <TicketIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-2">No tickets found</h3>
                  <p className="text-gray-600 dark:text-zinc-400 mb-4">
                    {searchTerm || getActiveFiltersCount() > 0 
                      ? 'Try adjusting your search or filters'
                      : 'You haven\'t created any tickets yet'
                    }
                  </p>
                  {!searchTerm && getActiveFiltersCount() === 0 && (
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Create your first ticket
                    </button>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-zinc-800">
                  {filteredTickets.map((ticket) => (
                    <div key={ticket.id} className="p-6 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                              {ticket.subject}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[ticket.priority]}`}>
                              {ticket.priority}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[ticket.status]}`}>
                              {ticket.status.replace('_', ' ')}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-zinc-400">
                              {ticket.id}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 dark:text-zinc-400 mb-3 line-clamp-2">
                            {ticket.description}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-zinc-400">
                            <div className="flex items-center space-x-1">
                              <Calendar size={16} />
                              <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock size={16} />
                              <span>Updated {new Date(ticket.updatedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle size={16} />
                              <span>{ticket.comments.length} comments</span>
                            </div>
                            {ticket.attachments.length > 0 && (
                              <div className="flex items-center space-x-1">
                                <Paperclip size={16} />
                                <span>{ticket.attachments.length} attachments</span>
                              </div>
                            )}
                          </div>
                          
                          {ticket.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {ticket.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded dark:bg-zinc-800 dark:text-zinc-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleViewTicket(ticket)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
                            title="View ticket"
                          >
                            <Eye size={20} />
                          </button>
                          <button
                            onClick={() => handleEditTicket(ticket)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
                            title="Edit ticket"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteTicket(ticket.id)}
                            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900"
                            title="Delete ticket"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <TicketCreationModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateTicket}
        />
      )}

      {showDetailsModal && selectedTicket && (
        <TicketDetailsModal
          isOpen={showDetailsModal}
          ticket={selectedTicket}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedTicket(null);
          }}
          onUpdate={async (ticketId, updates) => {
            try {
              const updatedTicket = await ticketService.updateTicket(ticketId, updates);
              if (updatedTicket) {
                setTickets(prev => prev.map(t => t.id === updatedTicket.id ? updatedTicket : t));
                setSelectedTicket(updatedTicket);
              }
            } catch (error) {
              console.error('Error updating ticket:', error);
            }
          }}
          onAddComment={async (ticketId, comment) => {
            try {
              await ticketService.addCommentToTicket(ticketId, comment);
              // Refresh the ticket data
              const updatedTicket = await ticketService.getTicketById(ticketId);
              if (updatedTicket) {
                setTickets(prev => prev.map(t => t.id === updatedTicket.id ? updatedTicket : t));
                setSelectedTicket(updatedTicket);
              }
            } catch (error) {
              console.error('Error adding comment:', error);
            }
          }}
        />
      )}

      {showFiltersModal && (
        <AdvancedTicketFilters
          filters={advancedFilters}
          onClose={() => setShowFiltersModal(false)}
          onApply={handleApplyAdvancedFilters}
        />
      )}
    </div>
  );
}