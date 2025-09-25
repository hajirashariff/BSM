import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Building2, 
  ArrowLeft, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Users,
  Phone,
  Mail,
  Globe,
  Calendar,
  DollarSign,
  Star,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  XCircle
} from 'lucide-react';

interface ClientAccount {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  status: 'active' | 'inactive' | 'suspended' | 'prospect';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  monthlyRevenue: number;
  contractStart: string;
  contractEnd: string;
  services: string[];
  lastContact: string;
  satisfaction: number;
  totalTickets: number;
  openTickets: number;
  location: string;
}

export default function ClientAccounts() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTier, setFilterTier] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientAccount | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [newClientForm, setNewClientForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    location: '',
    tier: 'bronze' as 'bronze' | 'silver' | 'gold' | 'platinum',
    services: [] as string[],
    monthlyRevenue: 0
  });

  // Ensure client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [clients, setClients] = useState<ClientAccount[]>([
    {
      id: 'CL-001',
      companyName: 'TechCorp Inc.',
      contactPerson: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      website: 'www.techcorp.com',
      industry: 'Technology',
      status: 'active',
      tier: 'gold',
      monthlyRevenue: 15000,
      contractStart: '2023-01-15',
      contractEnd: '2024-12-31',
      services: ['IT Support', 'Cloud Services', 'Security'],
      lastContact: '2024-01-15',
      satisfaction: 4.8,
      totalTickets: 45,
      openTickets: 3,
      location: 'New York, NY'
    },
    {
      id: 'CL-002',
      companyName: 'Global Solutions Ltd.',
      contactPerson: 'David Brown',
      email: 'david.brown@globalsolutions.com',
      phone: '+1 (555) 234-5678',
      website: 'www.globalsolutions.com',
      industry: 'Consulting',
      status: 'active',
      tier: 'platinum',
      monthlyRevenue: 25000,
      contractStart: '2022-06-01',
      contractEnd: '2025-05-31',
      services: ['Managed IT', 'Consulting', 'Training'],
      lastContact: '2024-01-16',
      satisfaction: 4.9,
      totalTickets: 78,
      openTickets: 1,
      location: 'Los Angeles, CA'
    },
    {
      id: 'CL-003',
      companyName: 'DataFlow Systems',
      contactPerson: 'Robert Davis',
      email: 'robert.davis@dataflow.com',
      phone: '+1 (555) 345-6789',
      website: 'www.dataflow.com',
      industry: 'Data Analytics',
      status: 'active',
      tier: 'silver',
      monthlyRevenue: 8000,
      contractStart: '2023-08-01',
      contractEnd: '2024-07-31',
      services: ['Database Management', 'Backup Services'],
      lastContact: '2024-01-14',
      satisfaction: 4.2,
      totalTickets: 23,
      openTickets: 2,
      location: 'Chicago, IL'
    },
    {
      id: 'CL-004',
      companyName: 'Office Solutions Co.',
      contactPerson: 'Jennifer Lee',
      email: 'jennifer.lee@officesolutions.com',
      phone: '+1 (555) 456-7890',
      website: 'www.officesolutions.com',
      industry: 'Office Services',
      status: 'active',
      tier: 'bronze',
      monthlyRevenue: 3500,
      contractStart: '2023-11-01',
      contractEnd: '2024-10-31',
      services: ['Hardware Support', 'Software Installation'],
      lastContact: '2024-01-12',
      satisfaction: 4.5,
      totalTickets: 12,
      openTickets: 0,
      location: 'Miami, FL'
    },
    {
      id: 'CL-005',
      companyName: 'Creative Agency Pro',
      contactPerson: 'Mark Thompson',
      email: 'mark.thompson@creativeagency.com',
      phone: '+1 (555) 567-8901',
      website: 'www.creativeagency.com',
      industry: 'Marketing',
      status: 'prospect',
      tier: 'bronze',
      monthlyRevenue: 0,
      contractStart: '',
      contractEnd: '',
      services: ['Software Management'],
      lastContact: '2024-01-10',
      satisfaction: 0,
      totalTickets: 0,
      openTickets: 0,
      location: 'Seattle, WA'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      case 'prospect': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'bronze': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSatisfactionColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    const matchesTier = filterTier === 'all' || client.tier === filterTier;
    
    return matchesSearch && matchesStatus && matchesTier;
  });

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  };

  const getSearchSuggestions = () => {
    if (!searchTerm.trim()) return [];
    
    const suggestions = new Set<string>();
    
    clients.forEach(client => {
      if (client.companyName.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(client.companyName);
      }
      if (client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(client.contactPerson);
      }
      if (client.industry.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(client.industry);
      }
      if (client.location.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(client.location);
      }
    });
    
    return Array.from(suggestions).slice(0, 5);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSearchSuggestions(false);
  };

  const refreshData = async () => {
    if (!isClient) return; // Only run on client side
    
    setIsRefreshing(true);
    setIsLoading(true);
    
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update clients with realistic data changes
      setClients(prev => prev.map(client => {
        const randomChange = Math.random();
        const isPositiveChange = randomChange > 0.5;
        
        return {
          ...client,
          lastContact: new Date().toISOString().split('T')[0],
          satisfaction: Math.max(3, Math.min(5, client.satisfaction + (isPositiveChange ? 0.1 : -0.1))),
          openTickets: Math.max(0, client.openTickets + (isPositiveChange ? 1 : -1)),
          monthlyRevenue: Math.max(0, client.monthlyRevenue + Math.floor(Math.random() * 1000) - 500),
          // Randomly update status for prospects
          status: client.status === 'prospect' && Math.random() > 0.8 ? 'active' : client.status
        };
      }));
      
      // Show success message
      console.log('✅ Client data refreshed successfully');
      
    } catch (error) {
      console.error('❌ Failed to refresh client data:', error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  const handleClientClick = (client: ClientAccount) => {
    setSelectedClient(client);
  };

  const closeClientDetails = () => {
    setSelectedClient(null);
  };

  const handleEditClient = (client: ClientAccount) => {
    // TODO: Implement edit functionality
    console.log('Edit client:', client.id);
  };

  const handleDeleteClient = (client: ClientAccount) => {
    if (window.confirm(`Are you sure you want to delete ${client.companyName}?`)) {
      setClients(prev => prev.filter(c => c.id !== client.id));
      if (selectedClient?.id === client.id) {
        setSelectedClient(null);
      }
    }
  };

  const handleNewClient = () => {
    setShowNewClientModal(true);
  };

  const closeNewClientModal = () => {
    setShowNewClientModal(false);
    setNewClientForm({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      website: '',
      industry: '',
      location: '',
      tier: 'bronze',
      services: [],
      monthlyRevenue: 0
    });
  };

  const handleFormChange = (field: string, value: any) => {
    setNewClientForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddService = (service: string) => {
    if (service.trim() && !newClientForm.services.includes(service.trim())) {
      setNewClientForm(prev => ({
        ...prev,
        services: [...prev.services, service.trim()]
      }));
    }
  };

  const handleRemoveService = (serviceToRemove: string) => {
    setNewClientForm(prev => ({
      ...prev,
      services: prev.services.filter(service => service !== serviceToRemove)
    }));
  };

  const handleSubmitNewClient = () => {
    if (!newClientForm.companyName || !newClientForm.contactPerson || !newClientForm.email) {
      alert('Please fill in all required fields (Company Name, Contact Person, Email)');
      return;
    }

    const newClient: ClientAccount = {
      id: `CL-${String(clients.length + 1).padStart(3, '0')}`,
      companyName: newClientForm.companyName,
      contactPerson: newClientForm.contactPerson,
      email: newClientForm.email,
      phone: newClientForm.phone,
      website: newClientForm.website,
      industry: newClientForm.industry,
      status: 'prospect',
      tier: newClientForm.tier,
      monthlyRevenue: newClientForm.monthlyRevenue,
      contractStart: '',
      contractEnd: '',
      services: newClientForm.services,
      lastContact: new Date().toISOString().split('T')[0],
      satisfaction: 0,
      totalTickets: 0,
      openTickets: 0,
      location: newClientForm.location
    };

    setClients(prev => [...prev, newClient]);
    closeNewClientModal();
    console.log('✅ New client added successfully:', newClient.id);
  };

  const handleExportData = () => {
    try {
      // Prepare CSV data
      const csvHeaders = [
        'Client ID',
        'Company Name',
        'Contact Person',
        'Email',
        'Phone',
        'Website',
        'Industry',
        'Status',
        'Tier',
        'Monthly Revenue',
        'Contract Start',
        'Contract End',
        'Services',
        'Last Contact',
        'Satisfaction',
        'Total Tickets',
        'Open Tickets',
        'Location'
      ];

      const csvData = filteredClients.map(client => [
        client.id,
        client.companyName,
        client.contactPerson,
        client.email,
        client.phone,
        client.website,
        client.industry,
        client.status,
        client.tier,
        client.monthlyRevenue,
        client.contractStart,
        client.contractEnd,
        client.services.join('; '),
        client.lastContact,
        client.satisfaction,
        client.totalTickets,
        client.openTickets,
        client.location
      ]);

      // Create CSV content
      const csvContent = [
        csvHeaders.join(','),
        ...csvData.map(row => row.map(field => `"${field}"`).join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `client-accounts-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('✅ Client data exported successfully');
    } catch (error) {
      console.error('❌ Failed to export client data:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  const totalRevenue = clients.reduce((sum, client) => sum + client.monthlyRevenue, 0);
  const activeClients = clients.filter(c => c.status === 'active').length;
  const avgSatisfaction = clients.filter(c => c.satisfaction > 0).reduce((sum, c) => sum + c.satisfaction, 0) / clients.filter(c => c.satisfaction > 0).length;

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <Building2 className="text-white animate-pulse" size={24} />
          </div>
          <p className="text-gray-600 font-medium">Loading Client Accounts...</p>
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
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Building2 className="text-green-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Client Accounts</h1>
                <p className="text-sm text-gray-600">Manage client relationships and accounts</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshData}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all duration-300 ${isRefreshing ? 'animate-pulse' : ''}`}
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                <span className="text-sm font-medium">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
              
              <button 
                onClick={handleNewClient}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Plus size={16} />
                <span className="text-sm font-medium">New Client</span>
              </button>
              
              <button 
                onClick={handleExportData}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Download size={16} />
                <span className="text-sm font-medium">Export</span>
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
                <p className="text-sm font-medium text-gray-600 mb-1">Total Clients</p>
                <p className="text-3xl font-bold text-gray-900">{clients.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Building2 className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Clients</p>
                <p className="text-3xl font-bold text-green-600">{activeClients}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Monthly Revenue</p>
                <p className="text-3xl font-bold text-blue-600">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Avg. Satisfaction</p>
                <p className="text-3xl font-bold text-yellow-600">{avgSatisfaction.toFixed(1)}/5</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="text-yellow-600" size={24} />
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
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  onFocus={() => searchTerm && setShowSearchSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                
                {/* Search Suggestions */}
                {showSearchSuggestions && getSearchSuggestions().length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-2">
                      <div className="text-xs text-gray-500 px-3 py-2 border-b border-gray-100">
                        Suggestions
                      </div>
                      {getSearchSuggestions().map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <Search size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-700">{suggestion}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="prospect">Prospect</option>
              </select>
              
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Tiers</option>
                <option value="platinum">Platinum</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="bronze">Bronze</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clients List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Client Accounts ({filteredClients.length})</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="inline-flex items-center space-x-2 text-gray-600">
                  <RefreshCw className="animate-spin" size={20} />
                  <span>Loading clients...</span>
                </div>
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="p-6 text-center">
                <div className="text-gray-500">
                  <Building2 className="mx-auto mb-4" size={48} />
                  <p className="text-lg font-medium">No clients found</p>
                  <p className="text-sm">Try adjusting your search or filter criteria</p>
                </div>
              </div>
            ) : (
              filteredClients.map((client) => (
              <div
                key={client.id}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleClientClick(client)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold text-gray-900">{client.id}</span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium border ${getStatusColor(client.status)}`}>
                        {client.status}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium border ${getTierColor(client.tier)}`}>
                        {client.tier}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{client.companyName}</h4>
                    <p className="text-gray-600 mb-3">{client.industry} • {client.location}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Users size={16} />
                        <span>{client.contactPerson}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Mail size={16} />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone size={16} />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>Last contact: {client.lastContact}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-1">
                        <DollarSign size={16} />
                        <span className="font-medium">${client.monthlyRevenue.toLocaleString()}/mo</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star size={16} />
                        <span className={`font-medium ${getSatisfactionColor(client.satisfaction)}`}>
                          {client.satisfaction > 0 ? `${client.satisfaction}/5` : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{client.openTickets} open tickets</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      {client.services.map((service, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClient(client);
                      }}
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      title="Edit Client"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClient(client);
                      }}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      title="Delete Client"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Client Details Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{selectedClient.companyName}</h2>
                <button
                  onClick={closeClientDetails}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Client ID</label>
                      <p className="text-gray-900">{selectedClient.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Industry</label>
                      <p className="text-gray-900">{selectedClient.industry}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Location</label>
                      <p className="text-gray-900">{selectedClient.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Website</label>
                      <p className="text-blue-600 hover:underline">{selectedClient.website}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium border ${getStatusColor(selectedClient.status)}`}>
                        {selectedClient.status}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Tier</label>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium border ${getTierColor(selectedClient.tier)}`}>
                        {selectedClient.tier}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Contact Person</label>
                      <p className="text-gray-900">{selectedClient.contactPerson}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-blue-600 hover:underline">{selectedClient.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="text-gray-900">{selectedClient.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Contact</label>
                      <p className="text-gray-900">{selectedClient.lastContact}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Satisfaction Rating</label>
                      <div className="flex items-center space-x-2">
                        <Star className={`${getSatisfactionColor(selectedClient.satisfaction)}`} size={16} />
                        <span className={`font-medium ${getSatisfactionColor(selectedClient.satisfaction)}`}>
                          {selectedClient.satisfaction > 0 ? `${selectedClient.satisfaction}/5` : 'Not rated'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Monthly Revenue</label>
                    <p className="text-2xl font-bold text-green-600">${selectedClient.monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Contract Start</label>
                    <p className="text-gray-900">{selectedClient.contractStart || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Contract End</label>
                    <p className="text-gray-900">{selectedClient.contractEnd || 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
                <div className="flex items-center space-x-2">
                  {selectedClient.services.map((service, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Total Tickets</label>
                    <p className="text-2xl font-bold text-blue-600">{selectedClient.totalTickets}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Open Tickets</label>
                    <p className="text-2xl font-bold text-orange-600">{selectedClient.openTickets}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-end space-x-4">
                <button 
                  onClick={closeClientDetails}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => handleEditClient(selectedClient)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Client
                </button>
                <button 
                  onClick={() => handleDeleteClient(selectedClient)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Client
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Client Modal */}
      {showNewClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add New Client</h2>
                <button
                  onClick={closeNewClientModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={newClientForm.companyName}
                    onChange={(e) => handleFormChange('companyName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    value={newClientForm.contactPerson}
                    onChange={(e) => handleFormChange('contactPerson', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter contact person name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={newClientForm.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newClientForm.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={newClientForm.website}
                    onChange={(e) => handleFormChange('website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter website URL"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={newClientForm.industry}
                    onChange={(e) => handleFormChange('industry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter industry"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newClientForm.location}
                    onChange={(e) => handleFormChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tier
                  </label>
                  <select
                    value={newClientForm.tier}
                    onChange={(e) => handleFormChange('tier', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Revenue
                  </label>
                  <input
                    type="number"
                    value={newClientForm.monthlyRevenue}
                    onChange={(e) => handleFormChange('monthlyRevenue', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter monthly revenue"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {newClientForm.services.map((service, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center space-x-2">
                      <span>{service}</span>
                      <button
                        onClick={() => handleRemoveService(service)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <XCircle size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add service"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddService(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      handleAddService(input.value);
                      input.value = '';
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-end space-x-4">
                <button 
                  onClick={closeNewClientModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmitNewClient}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Client
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
