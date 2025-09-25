import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  BarChart3,
  Target,
  Zap,
  X
} from 'lucide-react';
import AddAccountModal from '../components/AddAccountModal';
import AccountDetailsModal from '../components/AccountDetailsModal';

const accountData = [
  {
    id: 'ACC-001',
    name: 'Contoso Ltd',
    industry: 'Technology',
    size: 'Enterprise',
    health: 92,
    healthTrend: 'up',
    revenue: '₹19.9Cr',
    renewal: '2024-12-15',
    status: 'Active',
    tickets: 3,
    openTickets: 1,
    resolvedTickets: 2,
    avgResolutionTime: '4.2h',
    satisfaction: 4.8,
    stakeholders: [
      { name: 'John Smith', role: 'CTO', email: 'john@contoso.com', phone: '+1-555-0123' },
      { name: 'Sarah Johnson', role: 'IT Director', email: 'sarah@contoso.com', phone: '+1-555-0124' }
    ],
    lastActivity: '2024-01-15',
    riskFactors: [],
    opportunities: ['Upsell: Additional licenses', 'Renewal: 3 months']
  },
  {
    id: 'ACC-002',
    name: 'Fabrikam Inc',
    industry: 'Manufacturing',
    size: 'Mid-Market',
    health: 78,
    healthTrend: 'down',
    revenue: '₹7.4Cr',
    renewal: '2025-03-20',
    status: 'At Risk',
    tickets: 7,
    openTickets: 4,
    resolvedTickets: 3,
    avgResolutionTime: '8.5h',
    satisfaction: 3.2,
    stakeholders: [
      { name: 'Mike Chen', role: 'VP Operations', email: 'mike@fabrikam.com', phone: '+1-555-0125' }
    ],
    lastActivity: '2024-01-10',
    riskFactors: ['High ticket volume', 'Low satisfaction', 'Delayed payments'],
    opportunities: ['Support improvement', 'Training program']
  },
  {
    id: 'ACC-003',
    name: 'Adventure Works',
    industry: 'Retail',
    size: 'Enterprise',
    health: 85,
    healthTrend: 'stable',
    revenue: '₹14.9Cr',
    renewal: '2024-11-30',
    status: 'Active',
    tickets: 2,
    openTickets: 0,
    resolvedTickets: 2,
    avgResolutionTime: '2.1h',
    satisfaction: 4.6,
    stakeholders: [
      { name: 'Lisa Wang', role: 'Head of IT', email: 'lisa@adventure.com', phone: '+1-555-0126' },
      { name: 'David Brown', role: 'Operations Manager', email: 'david@adventure.com', phone: '+1-555-0127' }
    ],
    lastActivity: '2024-01-14',
    riskFactors: [],
    opportunities: ['Expand to new regions', 'Additional services']
  },
  {
    id: 'ACC-004',
    name: 'Northwind Corp',
    industry: 'Finance',
    size: 'Enterprise',
    health: 95,
    healthTrend: 'up',
    revenue: '₹26.6Cr',
    renewal: '2025-01-10',
    status: 'Champion',
    tickets: 1,
    openTickets: 0,
    resolvedTickets: 1,
    avgResolutionTime: '1.8h',
    satisfaction: 4.9,
    stakeholders: [
      { name: 'Robert Taylor', role: 'CISO', email: 'robert@northwind.com', phone: '+1-555-0128' },
      { name: 'Emily Davis', role: 'IT Manager', email: 'emily@northwind.com', phone: '+1-555-0129' }
    ],
    lastActivity: '2024-01-15',
    riskFactors: [],
    opportunities: ['Reference customer', 'Case study', 'Upsell: Premium support']
  }
];

const healthColors: { [key: string]: string } = {
  'Champion': 'bg-green-100 text-green-800',
  'Active': 'bg-blue-100 text-blue-800',
  'At Risk': 'bg-yellow-100 text-yellow-800',
  'Critical': 'bg-red-100 text-red-800'
};

export default function AccountsPage() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState(accountData);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    healthScore: { min: 0, max: 100 },
    revenue: { min: 0, max: 10000000 },
    satisfaction: { min: 0, max: 5 },
    ticketCount: { min: 0, max: 100 },
    industry: '',
    size: '',
    renewalDate: { start: '', end: '' },
    lastActivity: { start: '', end: '' },
    hasRiskFactors: null as boolean | null, // null, true, false
    hasOpportunities: null as boolean | null, // null, true, false
    stakeholderCount: { min: 0, max: 20 }
  });

  const getProgressBarClass = (health: number) => {
    if (health >= 90) return 'progress-bar-90';
    if (health >= 85) return 'progress-bar-85';
    if (health >= 80) return 'progress-bar-78';
    return 'progress-bar-78';
  };

  const filteredAccounts = accounts.filter(account => {
    // Basic filters
    const matchesStatus = filterStatus === 'All' || account.status === filterStatus;
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Advanced filters
    const matchesHealthScore = account.health >= advancedFilters.healthScore.min && 
                              account.health <= advancedFilters.healthScore.max;
    
    const accountRevenue = parseFloat(account.revenue.replace('$', '').replace('M', '')) * 1000000;
    const matchesRevenue = accountRevenue >= advancedFilters.revenue.min && 
                          accountRevenue <= advancedFilters.revenue.max;
    
    const matchesSatisfaction = account.satisfaction >= advancedFilters.satisfaction.min && 
                               account.satisfaction <= advancedFilters.satisfaction.max;
    
    const matchesTicketCount = account.tickets >= advancedFilters.ticketCount.min && 
                              account.tickets <= advancedFilters.ticketCount.max;
    
    const matchesIndustry = !advancedFilters.industry || 
                           account.industry.toLowerCase().includes(advancedFilters.industry.toLowerCase());
    
    const matchesSize = !advancedFilters.size || 
                       account.size.toLowerCase().includes(advancedFilters.size.toLowerCase());
    
    const matchesRenewalDate = !advancedFilters.renewalDate.start || 
                              (new Date(account.renewal) >= new Date(advancedFilters.renewalDate.start) &&
                               (!advancedFilters.renewalDate.end || new Date(account.renewal) <= new Date(advancedFilters.renewalDate.end)));
    
    const matchesLastActivity = !advancedFilters.lastActivity.start || 
                               (new Date(account.lastActivity) >= new Date(advancedFilters.lastActivity.start) &&
                                (!advancedFilters.lastActivity.end || new Date(account.lastActivity) <= new Date(advancedFilters.lastActivity.end)));
    
    const matchesRiskFactors = advancedFilters.hasRiskFactors === null || 
                              (advancedFilters.hasRiskFactors ? account.riskFactors.length > 0 : account.riskFactors.length === 0);
    
    const matchesOpportunities = advancedFilters.hasOpportunities === null || 
                                (advancedFilters.hasOpportunities ? account.opportunities.length > 0 : account.opportunities.length === 0);
    
    const matchesStakeholderCount = account.stakeholders.length >= advancedFilters.stakeholderCount.min && 
                                   account.stakeholders.length <= advancedFilters.stakeholderCount.max;
    
    return matchesStatus && matchesSearch && matchesHealthScore && matchesRevenue && 
           matchesSatisfaction && matchesTicketCount && matchesIndustry && matchesSize && 
           matchesRenewalDate && matchesLastActivity && matchesRiskFactors && 
           matchesOpportunities && matchesStakeholderCount;
  });

  const totalRevenue = accounts.reduce((sum, acc) => sum + parseFloat(acc.revenue.replace('₹', '').replace('Cr', '')), 0);
  const avgHealth = Math.round(accounts.reduce((sum, acc) => sum + acc.health, 0) / accounts.length);
  const renewalRisk = accounts.filter(acc => acc.status === 'At Risk' || acc.status === 'Critical').length;

  const handleAddAccount = (newAccount: any) => {
    setAccounts(prev => [newAccount, ...prev]);
    setIsAddModalOpen(false);
  };

  const handleViewDetails = (account: any) => {
    setSelectedAccount(account);
    setIsDetailsModalOpen(true);
  };

  const handleUpdateAccount = (updatedAccount: any) => {
    setAccounts(prev => prev.map(acc => 
      acc.id === updatedAccount.id ? updatedAccount : acc
    ));
  };

  const handleDeleteAccount = (accountId: string) => {
    setAccounts(prev => prev.filter(acc => acc.id !== accountId));
    setIsDetailsModalOpen(false);
  };

  // Icon functionality handlers
  const handleExternalLink = (account: any) => {
    // In a real app, this would open the account's external profile or website
    const accountUrl = `https://crm.company.com/accounts/${account.id}`;
    window.open(accountUrl, '_blank');
    console.log(`Opening external link for ${account.name}: ${accountUrl}`);
  };

  const handleEmailContact = (account: any) => {
    // Get primary stakeholder email or show email options
    const primaryStakeholder = account.stakeholders[0];
    if (primaryStakeholder && primaryStakeholder.email) {
      const subject = `Re: ${account.name} - Account Discussion`;
      const body = `Hello ${primaryStakeholder.name},\n\nI hope this email finds you well. I wanted to reach out regarding your account with us.\n\nBest regards,\nYour Account Manager`;
      const mailtoUrl = `mailto:${primaryStakeholder.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    } else {
      // Show email options modal or alert
      alert(`Email options for ${account.name}:\n\n${account.stakeholders.map((s: any) => `• ${s.name} (${s.role}): ${s.email}`).join('\n')}`);
    }
  };

  // Advanced filter handlers
  const handleAdvancedFilterChange = (filterType: string, value: any) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleResetFilters = () => {
    setAdvancedFilters({
      healthScore: { min: 0, max: 100 },
      revenue: { min: 0, max: 10000000 },
      satisfaction: { min: 0, max: 5 },
      ticketCount: { min: 0, max: 100 },
      industry: '',
      size: '',
      renewalDate: { start: '', end: '' },
      lastActivity: { start: '', end: '' },
      hasRiskFactors: null,
      hasOpportunities: null,
      stakeholderCount: { min: 0, max: 20 }
    });
  };

  const handleApplyFilters = () => {
    setIsAdvancedFilterOpen(false);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (advancedFilters.healthScore.min > 0 || advancedFilters.healthScore.max < 100) count++;
    if (advancedFilters.revenue.min > 0 || advancedFilters.revenue.max < 10000000) count++;
    if (advancedFilters.satisfaction.min > 0 || advancedFilters.satisfaction.max < 5) count++;
    if (advancedFilters.ticketCount.min > 0 || advancedFilters.ticketCount.max < 100) count++;
    if (advancedFilters.industry) count++;
    if (advancedFilters.size) count++;
    if (advancedFilters.renewalDate.start || advancedFilters.renewalDate.end) count++;
    if (advancedFilters.lastActivity.start || advancedFilters.lastActivity.end) count++;
    if (advancedFilters.hasRiskFactors !== null) count++;
    if (advancedFilters.hasOpportunities !== null) count++;
    if (advancedFilters.stakeholderCount.min > 0 || advancedFilters.stakeholderCount.max < 20) count++;
    return count;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Management</h1>
          <p className="text-gray-600">Deep B2B account management with health scoring and stakeholder mapping</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Account</span>
        </button>
      </div>

      {/* Account Overview KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toFixed(1)}Cr</p>
              <p className="text-sm text-green-600">+12% from last quarter</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Health</p>
              <p className="text-2xl font-bold text-gray-900">{avgHealth}%</p>
              <p className="text-sm text-green-600">+3% from last month</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <BarChart3 className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">At Risk Accounts</p>
              <p className="text-2xl font-bold text-gray-900">{renewalRisk}</p>
              <p className="text-sm text-red-600">Requires attention</p>
            </div>
            <div className="p-3 rounded-lg bg-red-50">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Renewals</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-yellow-600">Next 30 days</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50">
              <Calendar className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Insights */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Zap className="text-blue-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">AI-Powered Account Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="text-green-600" size={16} />
              <span className="font-medium">Upsell Opportunities</span>
            </div>
            <p className="text-sm text-gray-600">₹10.0Cr potential revenue identified</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="text-red-600" size={16} />
              <span className="font-medium">Churn Risk</span>
            </div>
            <p className="text-sm text-gray-600">2 accounts flagged for intervention</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="text-blue-600" size={16} />
              <span className="font-medium">Growth Potential</span>
            </div>
            <p className="text-sm text-gray-600">15% expansion opportunity</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Status</option>
              <option value="Champion">Champion</option>
              <option value="Active">Active</option>
              <option value="At Risk">At Risk</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <button 
            onClick={() => setIsAdvancedFilterOpen(true)}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Filter size={20} className="text-gray-400" />
            <span>Advanced Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAccounts.map((account) => (
          <div key={account.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{account.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${healthColors[account.status]}`}>
                    {account.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{account.industry} • {account.size}</p>
                
                {/* Health Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Health Score</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-600">{account.health}%</span>
                      {account.healthTrend === 'up' ? (
                        <TrendingUp className="text-green-600" size={16} />
                      ) : account.healthTrend === 'down' ? (
                        <TrendingDown className="text-red-600" size={16} />
                      ) : (
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`progress-bar ${getProgressBarClass(account.health)} ${
                        account.health >= 90 ? 'bg-green-500' :
                        account.health >= 80 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="font-semibold text-gray-900">{account.revenue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Renewal</p>
                    <p className="font-semibold text-gray-900">{account.renewal}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tickets</p>
                    <p className="font-semibold text-gray-900">{account.tickets}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Satisfaction</p>
                    <p className="font-semibold text-gray-900">{account.satisfaction}/5</p>
                  </div>
                </div>

                {/* Stakeholders */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Stakeholders</p>
                  <div className="space-y-1">
                    {account.stakeholders.slice(0, 2).map((stakeholder, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Users size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{stakeholder.name}</span>
                        <span className="text-xs text-gray-500">({stakeholder.role})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Factors / Opportunities */}
                <div className="mb-4">
                  {account.riskFactors.length > 0 && (
                    <div className="mb-2">
                      <p className="text-sm font-medium text-red-700 mb-1">Risk Factors</p>
                      <div className="flex flex-wrap gap-1">
                        {account.riskFactors.map((risk, idx) => (
                          <span key={idx} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                            {risk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {account.opportunities.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-green-700 mb-1">Opportunities</p>
                      <div className="flex flex-wrap gap-1">
                        {account.opportunities.map((opp, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            {opp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => handleExternalLink(account)}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                  title="Open in CRM"
                >
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>
                <button 
                  onClick={() => handleEmailContact(account)}
                  className="p-2 hover:bg-green-50 rounded-lg transition-colors group"
                  title="Send Email"
                >
                  <Mail size={16} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Clock size={14} className="text-gray-400" />
                <span className="text-xs text-gray-500">Last activity: {account.lastActivity}</span>
              </div>
              <button 
                onClick={() => handleViewDetails(account)}
                className="btn-primary text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Account Modal */}
      <AddAccountModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddAccount={handleAddAccount}
      />

      {/* Account Details Modal */}
      <AccountDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        account={selectedAccount}
        onUpdateAccount={handleUpdateAccount}
        onDeleteAccount={handleDeleteAccount}
      />

      {/* Advanced Filter Modal */}
      {isAdvancedFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Filter className="text-blue-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Advanced Filters</h2>
                  <p className="text-sm text-gray-600">Filter accounts by multiple criteria</p>
                </div>
              </div>
              <button
                onClick={() => setIsAdvancedFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Health Score Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Health Score Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={advancedFilters.healthScore.min}
                      onChange={(e) => handleAdvancedFilterChange('healthScore', { ...advancedFilters.healthScore, min: parseInt(e.target.value) || 0 })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={advancedFilters.healthScore.max}
                      onChange={(e) => handleAdvancedFilterChange('healthScore', { ...advancedFilters.healthScore, max: parseInt(e.target.value) || 100 })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Revenue Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Revenue Range ($)</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      value={advancedFilters.revenue.min}
                      onChange={(e) => handleAdvancedFilterChange('revenue', { ...advancedFilters.revenue, min: parseInt(e.target.value) || 0 })}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      min="0"
                      value={advancedFilters.revenue.max}
                      onChange={(e) => handleAdvancedFilterChange('revenue', { ...advancedFilters.revenue, max: parseInt(e.target.value) || 10000000 })}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Satisfaction Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Satisfaction Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={advancedFilters.satisfaction.min}
                      onChange={(e) => handleAdvancedFilterChange('satisfaction', { ...advancedFilters.satisfaction, min: parseFloat(e.target.value) || 0 })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={advancedFilters.satisfaction.max}
                      onChange={(e) => handleAdvancedFilterChange('satisfaction', { ...advancedFilters.satisfaction, max: parseFloat(e.target.value) || 5 })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Ticket Count Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Ticket Count Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      value={advancedFilters.ticketCount.min}
                      onChange={(e) => handleAdvancedFilterChange('ticketCount', { ...advancedFilters.ticketCount, min: parseInt(e.target.value) || 0 })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      min="0"
                      value={advancedFilters.ticketCount.max}
                      onChange={(e) => handleAdvancedFilterChange('ticketCount', { ...advancedFilters.ticketCount, max: parseInt(e.target.value) || 100 })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Industry</label>
                  <input
                    type="text"
                    value={advancedFilters.industry}
                    onChange={(e) => handleAdvancedFilterChange('industry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Technology, Manufacturing"
                  />
                </div>

                {/* Company Size */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Company Size</label>
                  <select
                    value={advancedFilters.size}
                    onChange={(e) => handleAdvancedFilterChange('size', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Sizes</option>
                    <option value="Startup">Startup</option>
                    <option value="Small">Small</option>
                    <option value="Mid-Market">Mid-Market</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>

                {/* Renewal Date Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Renewal Date Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      value={advancedFilters.renewalDate.start}
                      onChange={(e) => handleAdvancedFilterChange('renewalDate', { ...advancedFilters.renewalDate, start: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="date"
                      value={advancedFilters.renewalDate.end}
                      onChange={(e) => handleAdvancedFilterChange('renewalDate', { ...advancedFilters.renewalDate, end: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Last Activity Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Last Activity Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      value={advancedFilters.lastActivity.start}
                      onChange={(e) => handleAdvancedFilterChange('lastActivity', { ...advancedFilters.lastActivity, start: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="date"
                      value={advancedFilters.lastActivity.end}
                      onChange={(e) => handleAdvancedFilterChange('lastActivity', { ...advancedFilters.lastActivity, end: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Risk Factors */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Has Risk Factors</label>
                  <select
                    value={advancedFilters.hasRiskFactors === null ? '' : advancedFilters.hasRiskFactors.toString()}
                    onChange={(e) => handleAdvancedFilterChange('hasRiskFactors', e.target.value === '' ? null : e.target.value === 'true')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Accounts</option>
                    <option value="true">Has Risk Factors</option>
                    <option value="false">No Risk Factors</option>
                  </select>
                </div>

                {/* Opportunities */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Has Opportunities</label>
                  <select
                    value={advancedFilters.hasOpportunities === null ? '' : advancedFilters.hasOpportunities.toString()}
                    onChange={(e) => handleAdvancedFilterChange('hasOpportunities', e.target.value === '' ? null : e.target.value === 'true')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Accounts</option>
                    <option value="true">Has Opportunities</option>
                    <option value="false">No Opportunities</option>
                  </select>
                </div>

                {/* Stakeholder Count Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Stakeholder Count Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      value={advancedFilters.stakeholderCount.min}
                      onChange={(e) => handleAdvancedFilterChange('stakeholderCount', { ...advancedFilters.stakeholderCount, min: parseInt(e.target.value) || 0 })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      min="0"
                      value={advancedFilters.stakeholderCount.max}
                      onChange={(e) => handleAdvancedFilterChange('stakeholderCount', { ...advancedFilters.stakeholderCount, max: parseInt(e.target.value) || 20 })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset All Filters
              </button>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsAdvancedFilterOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Filters ({getActiveFilterCount()})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



