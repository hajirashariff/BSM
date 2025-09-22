import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  Calendar,
  Users,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Clock,
  ExternalLink,
  Edit,
  Trash2,
  Plus,
  FileText,
  Activity,
  Target,
  Zap,
  Shield,
  Star,
  MessageSquare,
  Settings,
  Download,
  Share2,
  Bell,
  Heart,
  Flag,
  Ticket
} from 'lucide-react';
import StakeholderModal from './StakeholderModal';
import RiskOpportunityModal from './RiskOpportunityModal';
import TicketModal from './TicketModal';
import ContractModal from './ContractModal';

interface Stakeholder {
  name: string;
  role: string;
  email: string;
  phone: string;
}

interface Account {
  id: string;
  name: string;
  industry: string;
  size: string;
  health: number;
  healthTrend: string;
  revenue: string;
  renewal: string;
  status: string;
  tickets: number;
  openTickets: number;
  resolvedTickets: number;
  avgResolutionTime: string;
  satisfaction: number;
  stakeholders: Stakeholder[];
  lastActivity: string;
  riskFactors: string[];
  opportunities: string[];
  website?: string;
  description?: string;
  address?: string;
  annualRevenue?: string;
  employeeCount?: string;
  contractValue?: string;
  contractStartDate?: string;
  contractEndDate?: string;
}

interface AccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account | null;
  onUpdateAccount: (updatedAccount: Account) => void;
  onDeleteAccount: (accountId: string) => void;
}

export default function AccountDetailsModal({ 
  isOpen, 
  onClose, 
  account, 
  onUpdateAccount, 
  onDeleteAccount 
}: AccountDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Account | null>(null);
  
  // Modal states
  const [isStakeholderModalOpen, setIsStakeholderModalOpen] = useState(false);
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [editingStakeholder, setEditingStakeholder] = useState<Stakeholder | null>(null);
  const [editingRisk, setEditingRisk] = useState<string>('');
  const [editingOpportunity, setEditingOpportunity] = useState<string>('');
  const [editingContract, setEditingContract] = useState<any>(null);
  const [timePeriod, setTimePeriod] = useState('6months');
  const [isSettingsEditModalOpen, setIsSettingsEditModalOpen] = useState(false);
  const [settingsData, setSettingsData] = useState({
    general: {
      name: '',
      industry: '',
      size: '',
      website: '',
      description: ''
    },
    notifications: {
      emailTickets: true,
      contractRenewal: true,
      healthAlerts: false,
      riskNotifications: true,
      weeklyReports: false
    },
    security: {
      accountStatus: 'Active',
      healthScore: 92,
      viewDetails: true,
      editInfo: true,
      createTickets: true,
      deleteAccount: false
    }
  });

  if (!isOpen || !account) return null;

  const healthColors = {
    'Champion': 'bg-green-100 text-green-800',
    'Active': 'bg-blue-100 text-blue-800',
    'At Risk': 'bg-yellow-100 text-yellow-800',
    'Critical': 'bg-red-100 text-red-800'
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBgColor = (health: number) => {
    if (health >= 90) return 'bg-green-500';
    if (health >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'stakeholders', label: 'Stakeholders', icon: Users },
    { id: 'contracts', label: 'Contracts', icon: FileText },
    { id: 'tickets', label: 'Tickets', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'risks', label: 'Risks & Opportunities', icon: AlertCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleEdit = () => {
    setEditData({ ...account });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editData) {
      onUpdateAccount(editData);
      setIsEditing(false);
      setEditData(null);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${account.name}? This action cannot be undone.`)) {
      onDeleteAccount(account.id);
      onClose();
    }
  };

  // Stakeholder handlers
  const handleAddStakeholder = () => {
    setEditingStakeholder(null);
    setIsStakeholderModalOpen(true);
  };

  const handleEditStakeholder = (stakeholder: Stakeholder) => {
    setEditingStakeholder(stakeholder);
    setIsStakeholderModalOpen(true);
  };

  const handleSaveStakeholder = (stakeholder: Stakeholder) => {
    if (editingStakeholder) {
      // Edit existing stakeholder
      const updatedAccount = {
        ...account,
        stakeholders: account.stakeholders.map(s => 
          s.name === editingStakeholder.name && s.email === editingStakeholder.email 
            ? stakeholder 
            : s
        )
      };
      onUpdateAccount(updatedAccount);
    } else {
      // Add new stakeholder
      const updatedAccount = {
        ...account,
        stakeholders: [...account.stakeholders, stakeholder]
      };
      onUpdateAccount(updatedAccount);
    }
    setIsStakeholderModalOpen(false);
    setEditingStakeholder(null);
  };

  const handleDeleteStakeholder = (stakeholder: Stakeholder) => {
    if (window.confirm(`Are you sure you want to delete ${stakeholder.name}?`)) {
      const updatedAccount = {
        ...account,
        stakeholders: account.stakeholders.filter(s => 
          !(s.name === stakeholder.name && s.email === stakeholder.email)
        )
      };
      onUpdateAccount(updatedAccount);
    }
  };

  // Risk/Opportunity handlers
  const handleAddRisk = () => {
    setEditingRisk('');
    setIsRiskModalOpen(true);
  };

  const handleAddOpportunity = () => {
    setEditingOpportunity('');
    setIsOpportunityModalOpen(true);
  };

  const handleEditRisk = (risk: string) => {
    setEditingRisk(risk);
    setIsRiskModalOpen(true);
  };

  const handleEditOpportunity = (opportunity: string) => {
    setEditingOpportunity(opportunity);
    setIsOpportunityModalOpen(true);
  };

  const handleSaveRisk = (risk: string) => {
    if (editingRisk) {
      // Edit existing risk
      const updatedAccount = {
        ...account,
        riskFactors: account.riskFactors.map(r => r === editingRisk ? risk : r)
      };
      onUpdateAccount(updatedAccount);
    } else {
      // Add new risk
      const updatedAccount = {
        ...account,
        riskFactors: [...account.riskFactors, risk]
      };
      onUpdateAccount(updatedAccount);
    }
    setIsRiskModalOpen(false);
    setEditingRisk('');
  };

  const handleSaveOpportunity = (opportunity: string) => {
    if (editingOpportunity) {
      // Edit existing opportunity
      const updatedAccount = {
        ...account,
        opportunities: account.opportunities.map(o => o === editingOpportunity ? opportunity : o)
      };
      onUpdateAccount(updatedAccount);
    } else {
      // Add new opportunity
      const updatedAccount = {
        ...account,
        opportunities: [...account.opportunities, opportunity]
      };
      onUpdateAccount(updatedAccount);
    }
    setIsOpportunityModalOpen(false);
    setEditingOpportunity('');
  };

  const handleDeleteRisk = (risk: string) => {
    if (window.confirm(`Are you sure you want to delete this risk factor?`)) {
      const updatedAccount = {
        ...account,
        riskFactors: account.riskFactors.filter(r => r !== risk)
      };
      onUpdateAccount(updatedAccount);
    }
  };

  const handleDeleteOpportunity = (opportunity: string) => {
    if (window.confirm(`Are you sure you want to delete this opportunity?`)) {
      const updatedAccount = {
        ...account,
        opportunities: account.opportunities.filter(o => o !== opportunity)
      };
      onUpdateAccount(updatedAccount);
    }
  };

  // Ticket handlers
  const handleCreateTicket = () => {
    setIsTicketModalOpen(true);
  };

  const handleSaveTicket = (ticket: any) => {
    // In a real app, this would create a ticket in the backend
    console.log('New ticket created:', ticket);
    // For now, we'll just show an alert
    alert(`Ticket ${ticket.id} created successfully for ${account.name}`);
  };

  // Contact handlers
  const handleEmailContact = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handlePhoneContact = (phone: string) => {
    window.open(`tel:${phone}`, '_blank');
  };

  // Contract handlers
  const handleAddContract = () => {
    setEditingContract(null);
    setIsContractModalOpen(true);
  };

  const handleEditContract = (contract: any) => {
    setEditingContract(contract);
    setIsContractModalOpen(true);
  };

  const handleSaveContract = (contract: any) => {
    // In a real app, this would save to the backend
    console.log('Contract saved:', contract);
    alert(`Contract ${contract.contractNumber} ${editingContract ? 'updated' : 'created'} successfully for ${account.name}`);
    setIsContractModalOpen(false);
    setEditingContract(null);
  };

  // Account action handlers
  const handleExportAccount = () => {
    const accountData = {
      name: account.name,
      industry: account.industry,
      size: account.size,
      health: account.health,
      status: account.status,
      revenue: account.revenue,
      stakeholders: account.stakeholders,
      tickets: account.tickets,
      satisfaction: account.satisfaction,
      lastActivity: account.lastActivity
    };
    
    const dataStr = JSON.stringify(accountData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${account.name}-account-data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShareAccount = () => {
    const shareUrl = `${window.location.origin}/accounts/${account.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Account share link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy share link. Please try again.');
    });
  };

  const handleGenerateReport = () => {
    alert(`Generating detailed report for ${account.name}...\n\nThis would typically create a comprehensive PDF report including:\n- Account overview\n- Performance metrics\n- Stakeholder information\n- Contract details\n- Risk analysis\n- Recommendations`);
  };

  const handleDeleteAccountAction = () => {
    if (window.confirm(`Are you sure you want to permanently delete ${account.name}? This action cannot be undone and will remove all associated data.`)) {
      onDeleteAccount(account.id);
    }
  };

  // Settings edit handlers
  const handleEditSettings = () => {
    // Initialize settings data with current account data
    setSettingsData({
      general: {
        name: account.name,
        industry: account.industry,
        size: account.size,
        website: account.website || '',
        description: account.description || ''
      },
      notifications: {
        emailTickets: true,
        contractRenewal: true,
        healthAlerts: false,
        riskNotifications: true,
        weeklyReports: false
      },
      security: {
        accountStatus: account.status,
        healthScore: account.health,
        viewDetails: true,
        editInfo: true,
        createTickets: true,
        deleteAccount: false
      }
    });
    setIsSettingsEditModalOpen(true);
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to the backend
    console.log('Settings saved:', settingsData);
    alert('Settings updated successfully!');
    setIsSettingsEditModalOpen(false);
  };

  const handleSettingsChange = (section: string, field: string, value: any) => {
    setSettingsData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Account Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{account.name}</h2>
              <p className="text-gray-600">{account.industry} • {account.size}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`px-3 py-1 text-sm rounded-full ${healthColors[account.status]}`}>
                  {account.status}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Health Score:</span>
                  <span className={`font-semibold ${getHealthColor(account.health)}`}>
                    {account.health}%
                  </span>
                  {account.healthTrend === 'up' ? (
                    <TrendingUp className="text-green-600" size={16} />
                  ) : account.healthTrend === 'down' ? (
                    <TrendingDown className="text-red-600" size={16} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg">
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg">
              <Download size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg">
              <Bell size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{account.revenue}</p>
            </div>
            <DollarSign className="text-green-600" size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Health Score</p>
              <p className="text-2xl font-bold text-gray-900">{account.health}%</p>
            </div>
            <BarChart3 className="text-blue-600" size={24} />
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getHealthBgColor(account.health)}`}
              style={{ width: `${account.health}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{account.tickets}</p>
              <p className="text-xs text-gray-500">{account.openTickets} open</p>
            </div>
            <MessageSquare className="text-purple-600" size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{account.satisfaction}/5</p>
            </div>
            <Star className="text-yellow-600" size={24} />
          </div>
        </div>
      </div>

      {/* Contract Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Contract Value</p>
            <p className="text-lg font-semibold text-gray-900">{account.contractValue || account.revenue}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Start Date</p>
            <p className="text-lg font-semibold text-gray-900">{account.contractStartDate || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">End Date</p>
            <p className="text-lg font-semibold text-gray-900">{account.contractEndDate || account.renewal}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm text-gray-900">Account health updated</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-sm text-gray-900">New ticket created</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="text-sm text-gray-900">Contract renewal reminder sent</p>
              <p className="text-xs text-gray-500">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStakeholders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Stakeholders</h3>
        <button 
          onClick={handleAddStakeholder}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Stakeholder</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {account.stakeholders.map((stakeholder, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={20} className="text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{stakeholder.name}</h4>
                  <p className="text-sm text-gray-600">{stakeholder.role}</p>
                  <p className="text-sm text-gray-500">{stakeholder.email}</p>
                  {stakeholder.phone && (
                    <p className="text-sm text-gray-500">{stakeholder.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleEmailContact(stakeholder.email)}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="Send Email"
                >
                  <Mail size={16} className="text-gray-600" />
                </button>
                {stakeholder.phone && (
                  <button 
                    onClick={() => handlePhoneContact(stakeholder.phone)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Call"
                  >
                    <Phone size={16} className="text-gray-600" />
                  </button>
                )}
                <button 
                  onClick={() => handleEditStakeholder(stakeholder)}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="Edit"
                >
                  <Edit size={16} className="text-gray-600" />
                </button>
                <button 
                  onClick={() => handleDeleteStakeholder(stakeholder)}
                  className="p-1 hover:bg-red-100 rounded"
                  title="Delete"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContracts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Contract Details</h3>
        <button 
          onClick={handleAddContract}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Contract</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Current Contract</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Contract ID:</span>
                <span className="font-medium">CTR-{account.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Value:</span>
                <span className="font-medium">{account.contractValue || account.revenue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium">{account.contractStartDate || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">End Date:</span>
                <span className="font-medium">{account.contractEndDate || account.renewal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 text-xs rounded-full ${healthColors[account.status]}`}>
                  {account.status}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contract History</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-900">Contract renewed</p>
                  <p className="text-xs text-gray-500">6 months ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-900">Contract modified</p>
                  <p className="text-xs text-gray-500">1 year ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-900">Contract created</p>
                  <p className="text-xs text-gray-500">2 years ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
        <button 
          onClick={handleCreateTicket}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Create Ticket</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{account.tickets}</p>
            </div>
            <MessageSquare className="text-blue-600" size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{account.openTickets}</p>
            </div>
            <Clock className="text-yellow-600" size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Resolution</p>
              <p className="text-2xl font-bold text-gray-900">{account.avgResolutionTime}</p>
            </div>
            <Activity className="text-green-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900">Recent Tickets</h4>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { id: 'TKT-001', title: 'Login issues with new system', status: 'Open', priority: 'High', created: '2 hours ago' },
            { id: 'TKT-002', title: 'Feature request: Export functionality', status: 'In Progress', priority: 'Medium', created: '1 day ago' },
            { id: 'TKT-003', title: 'Password reset not working', status: 'Resolved', priority: 'High', created: '3 days ago' }
          ].map((ticket) => (
            <div key={ticket.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-900">{ticket.title}</h5>
                  <p className="text-sm text-gray-500">#{ticket.id} • {ticket.created}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
                    ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {ticket.status}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                    ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => {
    // Dynamic data based on time period
    const getDataForPeriod = (period: string) => {
      switch (period) {
        case '6months':
          return {
            healthScoreData: [
              { month: 'Jan', score: 85 },
              { month: 'Feb', score: 88 },
              { month: 'Mar', score: 82 },
              { month: 'Apr', score: 90 },
              { month: 'May', score: 87 },
              { month: 'Jun', score: 92 }
            ],
            ticketVolumeData: [
              { month: 'Jan', tickets: 12 },
              { month: 'Feb', tickets: 8 },
              { month: 'Mar', tickets: 15 },
              { month: 'Apr', tickets: 6 },
              { month: 'May', tickets: 10 },
              { month: 'Jun', tickets: 4 }
            ],
            satisfactionData: [
              { month: 'Jan', rating: 4.2 },
              { month: 'Feb', rating: 4.5 },
              { month: 'Mar', rating: 4.1 },
              { month: 'Apr', rating: 4.7 },
              { month: 'May', rating: 4.3 },
              { month: 'Jun', rating: 4.8 }
            ],
            revenueData: [
              { month: 'Jan', revenue: 45000 },
              { month: 'Feb', revenue: 52000 },
              { month: 'Mar', revenue: 48000 },
              { month: 'Apr', revenue: 61000 },
              { month: 'May', revenue: 55000 },
              { month: 'Jun', revenue: 67000 }
            ]
          };
        case '12months':
          return {
            healthScoreData: [
              { month: 'Jul', score: 78 },
              { month: 'Aug', score: 82 },
              { month: 'Sep', score: 85 },
              { month: 'Oct', score: 88 },
              { month: 'Nov', score: 90 },
              { month: 'Dec', score: 87 },
              { month: 'Jan', score: 85 },
              { month: 'Feb', score: 88 },
              { month: 'Mar', score: 82 },
              { month: 'Apr', score: 90 },
              { month: 'May', score: 87 },
              { month: 'Jun', score: 92 }
            ],
            ticketVolumeData: [
              { month: 'Jul', tickets: 18 },
              { month: 'Aug', tickets: 14 },
              { month: 'Sep', tickets: 16 },
              { month: 'Oct', tickets: 12 },
              { month: 'Nov', tickets: 9 },
              { month: 'Dec', tickets: 7 },
              { month: 'Jan', tickets: 12 },
              { month: 'Feb', tickets: 8 },
              { month: 'Mar', tickets: 15 },
              { month: 'Apr', tickets: 6 },
              { month: 'May', tickets: 10 },
              { month: 'Jun', tickets: 4 }
            ],
            satisfactionData: [
              { month: 'Jul', rating: 3.8 },
              { month: 'Aug', rating: 4.0 },
              { month: 'Sep', rating: 4.1 },
              { month: 'Oct', rating: 4.3 },
              { month: 'Nov', rating: 4.4 },
              { month: 'Dec', rating: 4.2 },
              { month: 'Jan', rating: 4.2 },
              { month: 'Feb', rating: 4.5 },
              { month: 'Mar', rating: 4.1 },
              { month: 'Apr', rating: 4.7 },
              { month: 'May', rating: 4.3 },
              { month: 'Jun', rating: 4.8 }
            ],
            revenueData: [
              { month: 'Jul', revenue: 38000 },
              { month: 'Aug', revenue: 42000 },
              { month: 'Sep', revenue: 45000 },
              { month: 'Oct', revenue: 48000 },
              { month: 'Nov', revenue: 52000 },
              { month: 'Dec', revenue: 49000 },
              { month: 'Jan', revenue: 45000 },
              { month: 'Feb', revenue: 52000 },
              { month: 'Mar', revenue: 48000 },
              { month: 'Apr', revenue: 61000 },
              { month: 'May', revenue: 55000 },
              { month: 'Jun', revenue: 67000 }
            ]
          };
        case '2years':
          return {
            healthScoreData: [
              { month: '2022 Q1', score: 72 },
              { month: '2022 Q2', score: 75 },
              { month: '2022 Q3', score: 78 },
              { month: '2022 Q4', score: 80 },
              { month: '2023 Q1', score: 82 },
              { month: '2023 Q2', score: 85 },
              { month: '2023 Q3', score: 88 },
              { month: '2023 Q4', score: 90 },
              { month: '2024 Q1', score: 87 },
              { month: '2024 Q2', score: 92 }
            ],
            ticketVolumeData: [
              { month: '2022 Q1', tickets: 25 },
              { month: '2022 Q2', tickets: 22 },
              { month: '2022 Q3', tickets: 20 },
              { month: '2022 Q4', tickets: 18 },
              { month: '2023 Q1', tickets: 16 },
              { month: '2023 Q2', tickets: 14 },
              { month: '2023 Q3', tickets: 12 },
              { month: '2023 Q4', tickets: 10 },
              { month: '2024 Q1', tickets: 8 },
              { month: '2024 Q2', tickets: 6 }
            ],
            satisfactionData: [
              { month: '2022 Q1', rating: 3.5 },
              { month: '2022 Q2', rating: 3.7 },
              { month: '2022 Q3', rating: 3.8 },
              { month: '2022 Q4', rating: 4.0 },
              { month: '2023 Q1', rating: 4.1 },
              { month: '2023 Q2', rating: 4.2 },
              { month: '2023 Q3', rating: 4.3 },
              { month: '2023 Q4', rating: 4.4 },
              { month: '2024 Q1', rating: 4.5 },
              { month: '2024 Q2', rating: 4.6 }
            ],
            revenueData: [
              { month: '2022 Q1', revenue: 32000 },
              { month: '2022 Q2', revenue: 35000 },
              { month: '2022 Q3', revenue: 38000 },
              { month: '2022 Q4', revenue: 40000 },
              { month: '2023 Q1', revenue: 42000 },
              { month: '2023 Q2', revenue: 45000 },
              { month: '2023 Q3', revenue: 48000 },
              { month: '2023 Q4', revenue: 52000 },
              { month: '2024 Q1', revenue: 55000 },
              { month: '2024 Q2', revenue: 60000 }
            ]
          };
        default:
          return {
            healthScoreData: [],
            ticketVolumeData: [],
            satisfactionData: [],
            revenueData: []
          };
      }
    };

    const data = getDataForPeriod(timePeriod);
    const { healthScoreData, ticketVolumeData, satisfactionData, revenueData } = data;

    const maxHealth = Math.max(...healthScoreData.map(d => d.score));
    const maxTickets = Math.max(...ticketVolumeData.map(d => d.tickets));
    const maxSatisfaction = Math.max(...satisfactionData.map(d => d.rating));
    const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

    // Export functionality
    const handleExportReport = () => {
      const reportData = {
        accountName: account.name,
        timePeriod: timePeriod,
        generatedAt: new Date().toISOString(),
        summary: {
          currentHealth: account.health,
          totalTickets: account.tickets,
          satisfaction: account.satisfaction,
          revenue: account.revenue
        },
        charts: {
          healthScoreTrend: healthScoreData,
          ticketVolume: ticketVolumeData,
          satisfactionTrend: satisfactionData,
          revenueTrend: revenueData
        },
        metrics: {
          averageHealth: Math.round(healthScoreData.reduce((a, b) => a + b.score, 0) / healthScoreData.length),
          totalTicketsInPeriod: ticketVolumeData.reduce((a, b) => a + b.tickets, 0),
          averageSatisfaction: (satisfactionData.reduce((a, b) => a + b.rating, 0) / satisfactionData.length).toFixed(1),
          totalRevenue: revenueData.reduce((a, b) => a + b.revenue, 0)
        }
      };

      const dataStr = JSON.stringify(reportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${account.name}-analytics-report-${timePeriod}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      alert(`Analytics report exported successfully!\n\nReport includes:\n- ${timePeriod} of data\n- All chart data\n- Key metrics and trends\n- Generated on ${new Date().toLocaleDateString()}`);
    };

    const getTimePeriodLabel = (period: string) => {
      switch (period) {
        case '6months': return 'Last 6 months';
        case '12months': return 'Last 12 months';
        case '2years': return 'Last 2 years';
        default: return 'Last 6 months';
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Account Analytics</h3>
          <div className="flex items-center space-x-2">
            <select 
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="6months">Last 6 months</option>
              <option value="12months">Last 12 months</option>
              <option value="2years">Last 2 years</option>
            </select>
            <button 
              onClick={handleExportReport}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1"
            >
              <Download size={14} />
              <span>Export Report</span>
            </button>
          </div>
        </div>
        
        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Current Health</p>
                <p className="text-2xl font-bold text-green-800">{account.health}%</p>
                <p className="text-xs text-green-600">+5% from last month</p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Tickets</p>
                <p className="text-2xl font-bold text-blue-800">{account.tickets}</p>
                <p className="text-xs text-blue-600">{account.openTickets} open</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Satisfaction</p>
                <p className="text-2xl font-bold text-purple-800">{account.satisfaction}/5</p>
                <p className="text-xs text-purple-600">+0.3 from last month</p>
              </div>
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Revenue</p>
                <p className="text-2xl font-bold text-orange-800">${account.revenue.toLocaleString()}</p>
                <p className="text-xs text-orange-600">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Health Score Trend Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Health Score Trend</span>
              </h4>
              <span className="text-sm text-gray-500">{getTimePeriodLabel(timePeriod)}</span>
            </div>
            <div className="h-64 relative">
              <div className="absolute inset-0 flex items-end justify-between px-2">
                {healthScoreData.map((point, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div 
                      className="bg-green-500 rounded-t w-8 transition-all duration-500 hover:bg-green-600"
                      style={{ height: `${(point.score / maxHealth) * 200}px` }}
                      title={`${point.month}: ${point.score}%`}
                    ></div>
                    <span className="text-xs text-gray-600">{point.month}</span>
                  </div>
                ))}
              </div>
              <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-gray-400">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-600">Average: {Math.round(healthScoreData.reduce((a, b) => a + b.score, 0) / healthScoreData.length)}%</span>
              <span className="text-green-600 font-medium">+7% improvement</span>
            </div>
          </div>
          
          {/* Ticket Volume Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <Ticket className="w-5 h-5 text-blue-600" />
                <span>Ticket Volume</span>
              </h4>
              <span className="text-sm text-gray-500">{getTimePeriodLabel(timePeriod)}</span>
            </div>
            <div className="h-64 relative">
              <div className="absolute inset-0 flex items-end justify-between px-2">
                {ticketVolumeData.map((point, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div 
                      className="bg-blue-500 rounded-t w-8 transition-all duration-500 hover:bg-blue-600"
                      style={{ height: `${(point.tickets / maxTickets) * 200}px` }}
                      title={`${point.month}: ${point.tickets} tickets`}
                    ></div>
                    <span className="text-xs text-gray-600">{point.month}</span>
                  </div>
                ))}
              </div>
              <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-gray-400">
                <span>{maxTickets}</span>
                <span>{Math.round(maxTickets * 0.75)}</span>
                <span>{Math.round(maxTickets * 0.5)}</span>
                <span>{Math.round(maxTickets * 0.25)}</span>
                <span>0</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-600">Total: {ticketVolumeData.reduce((a, b) => a + b.tickets, 0)} tickets</span>
              <span className="text-blue-600 font-medium">-33% decrease</span>
            </div>
          </div>
          
          {/* Satisfaction Trend Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <Star className="w-5 h-5 text-purple-600" />
                <span>Satisfaction Trend</span>
              </h4>
              <span className="text-sm text-gray-500">{getTimePeriodLabel(timePeriod)}</span>
            </div>
            <div className="h-64 relative">
              <div className="absolute inset-0 flex items-end justify-between px-2">
                {satisfactionData.map((point, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div 
                      className="bg-purple-500 rounded-t w-8 transition-all duration-500 hover:bg-purple-600"
                      style={{ height: `${(point.rating / maxSatisfaction) * 200}px` }}
                      title={`${point.month}: ${point.rating}/5`}
                    ></div>
                    <span className="text-xs text-gray-600">{point.month}</span>
                  </div>
                ))}
              </div>
              <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-gray-400">
                <span>5.0</span>
                <span>4.5</span>
                <span>4.0</span>
                <span>3.5</span>
                <span>3.0</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-600">Average: {(satisfactionData.reduce((a, b) => a + b.rating, 0) / satisfactionData.length).toFixed(1)}/5</span>
              <span className="text-purple-600 font-medium">+0.6 improvement</span>
            </div>
          </div>
          
          {/* Revenue Trend Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-orange-600" />
                <span>Revenue Trend</span>
              </h4>
              <span className="text-sm text-gray-500">{getTimePeriodLabel(timePeriod)}</span>
            </div>
            <div className="h-64 relative">
              <div className="absolute inset-0 flex items-end justify-between px-2">
                {revenueData.map((point, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div 
                      className="bg-orange-500 rounded-t w-8 transition-all duration-500 hover:bg-orange-600"
                      style={{ height: `${(point.revenue / maxRevenue) * 200}px` }}
                      title={`${point.month}: $${point.revenue.toLocaleString()}`}
                    ></div>
                    <span className="text-xs text-gray-600">{point.month}</span>
                  </div>
                ))}
              </div>
              <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-gray-400">
                <span>${(maxRevenue / 1000).toFixed(0)}k</span>
                <span>${(maxRevenue * 0.75 / 1000).toFixed(0)}k</span>
                <span>${(maxRevenue * 0.5 / 1000).toFixed(0)}k</span>
                <span>${(maxRevenue * 0.25 / 1000).toFixed(0)}k</span>
                <span>$0</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-600">Total: ${revenueData.reduce((a, b) => a + b.revenue, 0).toLocaleString()}</span>
              <span className="text-orange-600 font-medium">+49% growth</span>
            </div>
          </div>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span>Response Times</span>
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Response</span>
                <span className="font-semibold text-gray-900">2.3 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Resolution</span>
                <span className="font-semibold text-gray-900">{account.avgResolutionTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">SLA Compliance</span>
                <span className="font-semibold text-green-600">98.5%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-600" />
              <span>Stakeholder Engagement</span>
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Stakeholders</span>
                <span className="font-semibold text-gray-900">{account.stakeholders.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Engagement Rate</span>
                <span className="font-semibold text-blue-600">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Contact</span>
                <span className="font-semibold text-gray-900">2 days ago</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-gray-600" />
              <span>Performance Goals</span>
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Health Score Goal</span>
                <span className="font-semibold text-green-600">90% ✓</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Satisfaction Goal</span>
                <span className="font-semibold text-green-600">4.5/5 ✓</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Revenue Goal</span>
                <span className="font-semibold text-yellow-600">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRisksOpportunities = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk Factors */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <AlertCircle className="text-red-600" size={20} />
              <span>Risk Factors</span>
            </h3>
            <button 
              onClick={handleAddRisk}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Risk</span>
            </button>
          </div>

          <div className="space-y-2">
            {account.riskFactors.length > 0 ? (
              account.riskFactors.map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-red-800">{risk}</span>
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={() => handleEditRisk(risk)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteRisk(risk)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                      title="Delete"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No risk factors identified</p>
              </div>
            )}
          </div>
        </div>

        {/* Opportunities */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Target className="text-green-600" size={20} />
              <span>Opportunities</span>
            </h3>
            <button 
              onClick={handleAddOpportunity}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Opportunity</span>
            </button>
          </div>

          <div className="space-y-2">
            {account.opportunities.length > 0 ? (
              account.opportunities.map((opportunity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-green-800">{opportunity}</span>
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={() => handleEditOpportunity(opportunity)}
                      className="p-1 text-green-600 hover:bg-green-100 rounded"
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteOpportunity(opportunity)}
                      className="p-1 text-green-600 hover:bg-green-100 rounded"
                      title="Delete"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Target size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No opportunities identified</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
        <button 
          onClick={handleEditSettings}
          className="btn-primary flex items-center space-x-2"
        >
          <Edit size={16} />
          <span>Edit Settings</span>
        </button>
      </div>

      {/* General Settings */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Building2 size={20} className="text-blue-600" />
          <span>General Information</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
            <input
              type="text"
              value={account.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              value={account.industry}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
            <input
              type="text"
              value={account.size}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              value={account.website || 'Not provided'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={account.description || 'No description provided'}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
      </div>

      {/* Contact Settings */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Users size={20} className="text-blue-600" />
          <span>Contact Information</span>
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Contact</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={account.stakeholders[0]?.name || 'Not assigned'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
              <input
                type="email"
                value={account.stakeholders[0]?.email || 'Not provided'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Stakeholders</label>
            <input
              type="text"
              value={`${account.stakeholders.length} stakeholders`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Bell size={20} className="text-blue-600" />
          <span>Notification Preferences</span>
        </h4>
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" defaultChecked />
                <div>
                  <span className="text-sm font-medium text-gray-700">Email notifications for new tickets</span>
                  <p className="text-xs text-gray-500">Get notified when new support tickets are created</p>
                </div>
              </div>
              <span className="text-xs text-green-600 font-medium">Enabled</span>
            </label>
            
            <label className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" defaultChecked />
                <div>
                  <span className="text-sm font-medium text-gray-700">Contract renewal reminders</span>
                  <p className="text-xs text-gray-500">Receive alerts before contract expiration</p>
                </div>
              </div>
              <span className="text-xs text-green-600 font-medium">Enabled</span>
            </label>
            
            <label className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <div>
                  <span className="text-sm font-medium text-gray-700">Health score alerts</span>
                  <p className="text-xs text-gray-500">Get notified when account health changes</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium">Disabled</span>
            </label>
            
            <label className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" defaultChecked />
                <div>
                  <span className="text-sm font-medium text-gray-700">Risk factor notifications</span>
                  <p className="text-xs text-gray-500">Alert when new risk factors are identified</p>
                </div>
              </div>
              <span className="text-xs text-green-600 font-medium">Enabled</span>
            </label>
            
            <label className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <div>
                  <span className="text-sm font-medium text-gray-700">Weekly summary reports</span>
                  <p className="text-xs text-gray-500">Receive weekly account performance summaries</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium">Disabled</span>
            </label>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Shield size={20} className="text-blue-600" />
          <span>Security & Access</span>
        </h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 text-sm rounded-full ${healthColors[account.status]}`}>
                  {account.status}
                </span>
                <span className="text-xs text-gray-500">Last updated: {account.lastActivity}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Health Score</label>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-gray-900">{account.health}%</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      account.health >= 90 ? 'bg-green-500' :
                      account.health >= 80 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${account.health}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <h5 className="text-sm font-medium text-gray-700 mb-3">Access Controls</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">View account details</span>
                <span className="text-xs text-green-600 font-medium">Allowed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Edit account information</span>
                <span className="text-xs text-green-600 font-medium">Allowed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Create tickets</span>
                <span className="text-xs text-green-600 font-medium">Allowed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Delete account</span>
                <span className="text-xs text-red-600 font-medium">Restricted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Settings */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <BarChart3 size={20} className="text-blue-600" />
          <span>Performance Metrics</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{account.tickets}</div>
            <div className="text-sm text-gray-600">Total Tickets</div>
            <div className="text-xs text-gray-500">{account.openTickets} open</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{account.satisfaction}/5</div>
            <div className="text-sm text-gray-600">Satisfaction</div>
            <div className="text-xs text-gray-500">Average rating</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{account.avgResolutionTime}</div>
            <div className="text-sm text-gray-600">Resolution Time</div>
            <div className="text-xs text-gray-500">Average</div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Settings size={20} className="text-blue-600" />
          <span>Account Actions</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={handleExportAccount}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={20} className="text-blue-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Export Account Data</div>
              <div className="text-sm text-gray-500">Download account information as JSON</div>
            </div>
          </button>
          
          <button 
            onClick={handleShareAccount}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 size={20} className="text-blue-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Share Account</div>
              <div className="text-sm text-gray-500">Generate shareable link for account</div>
            </div>
          </button>
          
          <button 
            onClick={handleGenerateReport}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText size={20} className="text-blue-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Generate Report</div>
              <div className="text-sm text-gray-500">Create detailed account report</div>
            </div>
          </button>
          
          <button 
            onClick={handleDeleteAccountAction}
            className="flex items-center space-x-3 p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={20} className="text-red-600" />
            <div className="text-left">
              <div className="font-medium text-red-900">Delete Account</div>
              <div className="text-sm text-red-500">Permanently remove this account</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'stakeholders': return renderStakeholders();
      case 'contracts': return renderContracts();
      case 'tickets': return renderTickets();
      case 'analytics': return renderAnalytics();
      case 'risks': return renderRisksOpportunities();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{account.name}</h2>
              <p className="text-sm text-gray-600">Account Details</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              title="Delete Account"
            >
              <Trash2 size={20} className="text-red-600" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {renderTabContent()}
        </div>
      </div>

      {/* Modals */}
      <StakeholderModal
        isOpen={isStakeholderModalOpen}
        onClose={() => setIsStakeholderModalOpen(false)}
        onSave={handleSaveStakeholder}
        stakeholder={editingStakeholder}
        isEdit={!!editingStakeholder}
      />

      <RiskOpportunityModal
        isOpen={isRiskModalOpen}
        onClose={() => setIsRiskModalOpen(false)}
        onSave={handleSaveRisk}
        type="risk"
        existingItem={editingRisk}
        isEdit={!!editingRisk}
      />

      <RiskOpportunityModal
        isOpen={isOpportunityModalOpen}
        onClose={() => setIsOpportunityModalOpen(false)}
        onSave={handleSaveOpportunity}
        type="opportunity"
        existingItem={editingOpportunity}
        isEdit={!!editingOpportunity}
      />

      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        onSave={handleSaveTicket}
        accountName={account.name}
      />

      <ContractModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        onSave={handleSaveContract}
        accountName={account.name}
        existingContract={editingContract}
        isEdit={!!editingContract}
      />

      {/* Settings Edit Modal */}
      {isSettingsEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Settings className="text-blue-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Edit Account Settings</h2>
                  <p className="text-sm text-gray-600">Configure account preferences and settings</p>
                </div>
              </div>
              <button
                onClick={() => setIsSettingsEditModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="space-y-8">
                {/* General Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Building2 size={20} className="text-blue-600" />
                    <span>General Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                      <input
                        type="text"
                        value={settingsData.general.name}
                        onChange={(e) => handleSettingsChange('general', 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <input
                        type="text"
                        value={settingsData.general.industry}
                        onChange={(e) => handleSettingsChange('general', 'industry', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                      <input
                        type="text"
                        value={settingsData.general.size}
                        onChange={(e) => handleSettingsChange('general', 'size', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="url"
                        value={settingsData.general.website}
                        onChange={(e) => handleSettingsChange('general', 'website', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={settingsData.general.description}
                      onChange={(e) => handleSettingsChange('general', 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter account description..."
                    />
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Bell size={20} className="text-blue-600" />
                    <span>Notification Preferences</span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: 'emailTickets', label: 'Email notifications for new tickets', description: 'Get notified when new support tickets are created' },
                      { key: 'contractRenewal', label: 'Contract renewal reminders', description: 'Receive alerts before contract expiration' },
                      { key: 'healthAlerts', label: 'Health score alerts', description: 'Get notified when account health changes' },
                      { key: 'riskNotifications', label: 'Risk factor notifications', description: 'Alert when new risk factors are identified' },
                      { key: 'weeklyReports', label: 'Weekly summary reports', description: 'Receive weekly account performance summaries' }
                    ].map((item) => (
                      <label key={item.key} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={settingsData.notifications[item.key as keyof typeof settingsData.notifications] as boolean}
                            onChange={(e) => handleSettingsChange('notifications', item.key, e.target.checked)}
                            className="rounded"
                          />
                          <div>
                            <span className="text-sm font-medium text-gray-700">{item.label}</span>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-medium ${settingsData.notifications[item.key as keyof typeof settingsData.notifications] ? 'text-green-600' : 'text-gray-500'}`}>
                          {settingsData.notifications[item.key as keyof typeof settingsData.notifications] ? 'Enabled' : 'Disabled'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Shield size={20} className="text-blue-600" />
                    <span>Security & Access</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                      <select
                        value={settingsData.security.accountStatus}
                        onChange={(e) => handleSettingsChange('security', 'accountStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Health Score</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={settingsData.security.healthScore}
                        onChange={(e) => handleSettingsChange('security', 'healthScore', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Access Controls</h4>
                    <div className="space-y-2">
                      {[
                        { key: 'viewDetails', label: 'View account details' },
                        { key: 'editInfo', label: 'Edit account information' },
                        { key: 'createTickets', label: 'Create tickets' },
                        { key: 'deleteAccount', label: 'Delete account' }
                      ].map((item) => (
                        <label key={item.key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{item.label}</span>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={settingsData.security[item.key as keyof typeof settingsData.security] as boolean}
                              onChange={(e) => handleSettingsChange('security', item.key, e.target.checked)}
                              className="rounded"
                            />
                            <span className={`text-xs font-medium ${settingsData.security[item.key as keyof typeof settingsData.security] ? 'text-green-600' : 'text-red-600'}`}>
                              {settingsData.security[item.key as keyof typeof settingsData.security] ? 'Allowed' : 'Restricted'}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setIsSettingsEditModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
