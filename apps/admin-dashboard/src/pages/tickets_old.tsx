import React, { useState } from 'react';
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
  X
} from 'lucide-react';
import HumanApprovalChamber from '../components/HumanApprovalChamber';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  category: string;
  channel: string;
  assignee: string;
  requester: string;
  created: string;
  updated: string;
  sla: string;
  tags: string[];
  aiInsights?: string;
  sentiment: string;
  approvalMethod: string;
  approvedBy?: string;
  approvedAt?: string | null;
  ruleUsed?: string;
}

const ticketData: Ticket[] = [
  // Pending tickets for human approval
  {
    id: 'TCK-2024-P001',
    subject: 'Emergency server access request for production database',
    description: 'Need immediate access to production database to fix critical bug affecting customer transactions. This requires emergency approval.',
    priority: 'Critical',
    status: 'Pending',
    category: 'IT Support',
    channel: 'Phone',
    assignee: '',
    requester: 'DevOps Team Lead',
    created: '2024-01-15 16:30',
    updated: '2024-01-15 16:30',
    sla: '30 minutes',
    tags: ['Emergency', 'Database', 'Production', 'Critical'],
    aiInsights: 'High-risk access request. Requires manual review due to production environment.',
    sentiment: 'Urgent',
    approvalMethod: 'human',
    approvedBy: '',
    approvedAt: null
  },
  {
    id: 'TCK-2024-P002',
    subject: 'Budget approval for new software licenses - $15,000',
    description: 'Request for 100 licenses of new design software. Total cost is $15,000 which exceeds auto-approval limit of $10,000.',
    priority: 'High',
    status: 'Pending',
    category: 'Procurement',
    channel: 'Email',
    assignee: '',
    requester: 'Marketing Director',
    created: '2024-01-15 15:45',
    updated: '2024-01-15 15:45',
    sla: '4 hours',
    tags: ['Budget', 'Software', 'Licenses', 'High Value'],
    aiInsights: 'Exceeds auto-approval threshold. Requires financial review.',
    sentiment: 'Neutral',
    approvalMethod: 'human',
    approvedBy: '',
    approvedAt: null
  },
  {
    id: 'TCK-2024-P003',
    subject: 'Security policy exception request for third-party integration',
    description: 'Request to allow external API access for new customer integration. This requires security team review and approval.',
    priority: 'High',
    status: 'Pending',
    category: 'Security',
    channel: 'Portal',
    assignee: '',
    requester: 'Integration Team',
    created: '2024-01-15 14:20',
    updated: '2024-01-15 14:20',
    sla: '2 hours',
    tags: ['Security', 'API', 'Integration', 'Policy Exception'],
    aiInsights: 'Security-sensitive request. Requires manual security review.',
    sentiment: 'Neutral',
    approvalMethod: 'human',
    approvedBy: '',
    approvedAt: null
  },
  {
    id: 'TCK-2024-001',
    subject: 'VPN connectivity issues affecting remote workers',
    description: 'Users unable to connect to corporate VPN from home office',
    priority: 'High',
    status: 'Open',
    category: 'IT Support',
    channel: 'Email',
    assignee: 'John Doe',
    requester: 'Sarah Johnson',
    created: '2024-01-15 09:30',
    updated: '2024-01-15 14:20',
    sla: '4 hours',
    tags: ['VPN', 'Remote Work', 'Network'],
    aiInsights: 'Similar issues reported 3 times this week. Check firewall rules.',
    sentiment: 'Frustrated',
    approvalMethod: 'human',
    approvedBy: 'John Doe',
    approvedAt: null
  },
  {
    id: 'TCK-2024-002',
    subject: 'Email server maintenance scheduled',
    description: 'Scheduled maintenance for email server to apply security patches and performance updates.',
    priority: 'Medium',
    status: 'Approved',
    category: 'System Maintenance',
    channel: 'Portal',
    assignee: 'Jane Smith',
    requester: 'IT Operations',
    created: '2024-01-15 08:00',
    updated: '2024-01-15 16:45',
    sla: '24 hours',
    tags: ['Email', 'Maintenance', 'Scheduled'],
    aiInsights: 'Routine maintenance. No impact expected.',
    sentiment: 'Neutral',
    approvalMethod: 'rule',
    approvedBy: 'Rules Engine',
    approvedAt: '2024-01-15 08:05',
    ruleUsed: 'R-003: Standard Service Request Approval'
  },
  {
    id: 'TCK-2024-003',
    subject: 'New employee onboarding workflow',
    description: 'Request to create a new onboarding workflow for incoming employees including IT setup, access provisioning, and training schedules.',
    priority: 'Low',
    status: 'Approved',
    category: 'HR',
    channel: 'Slack',
    assignee: 'Mike Johnson',
    requester: 'HR Department',
    created: '2024-01-14 10:15',
    updated: '2024-01-15 11:30',
    sla: '48 hours',
    tags: ['Onboarding', 'HR', 'Workflow'],
    aiInsights: 'Standard onboarding process completed successfully.',
    sentiment: 'Positive',
    approvalMethod: 'human',
    approvedBy: 'Mike Johnson',
    approvedAt: '2024-01-14 10:45'
  },
  {
    id: 'TCK-2024-004',
    subject: 'Software license renewal - Adobe Creative Suite',
    description: 'Renewal request for Adobe Creative Suite licenses for the marketing team. Current licenses expire in 3 days.',
    priority: 'High',
    status: 'Approved',
    category: 'Procurement',
    channel: 'Phone',
    assignee: 'Sarah Wilson',
    requester: 'Marketing Team',
    created: '2024-01-15 13:20',
    updated: '2024-01-15 13:20',
    sla: '2 hours',
    tags: ['License', 'Adobe', 'Renewal'],
    aiInsights: 'Urgent: License expires in 3 days. Expedite approval.',
    sentiment: 'Urgent',
    approvalMethod: 'rule',
    approvedBy: 'Rules Engine',
    approvedAt: '2024-01-15 13:21',
    ruleUsed: 'R-001: High Priority Ticket Auto-Approval'
  },
  {
    id: 'TCK-2024-005',
    subject: 'Office supplies request - Stationery',
    description: 'Request for office stationery supplies including pens, notebooks, and printer paper for the office.',
    priority: 'Low',
    status: 'Approved',
    category: 'Procurement',
    channel: 'Portal',
    assignee: 'Procurement Team',
    requester: 'Office Manager',
    created: '2024-01-15 14:00',
    updated: '2024-01-15 14:02',
    sla: '24 hours',
    tags: ['Supplies', 'Stationery', 'Office'],
    aiInsights: 'Standard office supplies request under budget limit.',
    sentiment: 'Neutral',
    approvalMethod: 'rule',
    approvedBy: 'Rules Engine',
    approvedAt: '2024-01-15 14:02',
    ruleUsed: 'R-003: Standard Service Request Approval'
  },
  {
    id: 'TCK-2024-006',
    subject: 'Security incident - Unauthorized access attempt',
    description: 'Multiple failed login attempts detected from suspicious IP addresses. Security team investigation required.',
    priority: 'Critical',
    status: 'Escalated',
    category: 'Security',
    channel: 'Email',
    assignee: 'Security Team',
    requester: 'System Admin',
    created: '2024-01-15 15:30',
    updated: '2024-01-15 15:35',
    sla: '1 hour',
    tags: ['Security', 'Incident', 'Critical'],
    aiInsights: 'Critical security incident detected. Immediate attention required.',
    sentiment: 'Critical',
    approvalMethod: 'rule',
    approvedBy: 'Rules Engine',
    approvedAt: '2024-01-15 15:31',
    ruleUsed: 'R-002: Security Issue Escalation'
  }
];

const channelIcons: { [key: string]: any } = {
  Email: Mail,
  Portal: MessageSquare,
  Slack: Slack,
  Phone: Phone
};

const priorityColors: { [key: string]: string } = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-blue-100 text-blue-800',
  Low: 'bg-green-100 text-green-800'
};

const statusColors: { [key: string]: string } = {
  Open: 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Approved: 'bg-green-100 text-green-800',
  Resolved: 'bg-green-100 text-green-800',
  Closed: 'bg-gray-100 text-gray-800',
  Escalated: 'bg-red-100 text-red-800'
};

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterApproval, setFilterApproval] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [insights, setInsights] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [pendingTickets, setPendingTickets] = useState<Ticket[]>([]);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<Ticket | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Filter pending tickets
  React.useEffect(() => {
    const pending = ticketData.filter(ticket => 
      ticket.status === 'Pending' && ticket.approvalMethod === 'human'
    );
    setPendingTickets(pending);
  }, []);

  // Handlers for Human Approval Chamber
  const handleApproveTicket = (ticketId: string) => {
    console.log(`Approving ticket: ${ticketId}`);
    // In a real app, you'd call an API to update the ticket status
    alert(`Ticket ${ticketId} has been approved!`);
    // Update the ticket status
    const updatedTickets = ticketData.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: 'Approved', approvedBy: 'Admin User', approvedAt: new Date().toISOString() }
        : ticket
    );
    // Update pending tickets
    const pending = updatedTickets.filter(ticket => 
      ticket.status === 'Pending' && ticket.approvalMethod === 'human'
    );
    setPendingTickets(pending);
  };

  const handleRejectTicket = (ticketId: string) => {
    console.log(`Rejecting ticket: ${ticketId}`);
    // In a real app, you'd call an API to update the ticket status
    alert(`Ticket ${ticketId} has been rejected!`);
    // Update the ticket status
    const updatedTickets = ticketData.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: 'Rejected', approvedBy: 'Admin User', approvedAt: new Date().toISOString() }
        : ticket
    );
    // Update pending tickets
    const pending = updatedTickets.filter(ticket => 
      ticket.status === 'Pending' && ticket.approvalMethod === 'human'
    );
    setPendingTickets(pending);
  };

  const handleViewTicketDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowTicketDetails(true);
    setActiveDropdown(null);
  };

  const handleEditTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowEditModal(true);
    setActiveDropdown(null);
  };

  const handleDeleteTicket = (ticket: Ticket) => {
    setTicketToDelete(ticket);
    setShowDeleteConfirm(true);
    setActiveDropdown(null);
  };

  const confirmDeleteTicket = () => {
    if (ticketToDelete) {
      console.log(`Deleting ticket: ${ticketToDelete.id}`);
      alert(`Ticket ${ticketToDelete.id} has been deleted!`);
      // In a real app, you'd call an API to delete the ticket
      setShowDeleteConfirm(false);
      setTicketToDelete(null);
    }
  };

  const handleDuplicateTicket = (ticket: Ticket) => {
    console.log(`Duplicating ticket: ${ticket.id}`);
    alert(`Ticket ${ticket.id} has been duplicated!`);
    setActiveDropdown(null);
  };

  const handleAssignTicket = (ticket: Ticket) => {
    console.log(`Assigning ticket: ${ticket.id}`);
    alert(`Ticket ${ticket.id} assignment dialog opened!`);
    setActiveDropdown(null);
  };

  const handleEscalateTicket = (ticket: Ticket) => {
    console.log(`Escalating ticket: ${ticket.id}`);
    alert(`Ticket ${ticket.id} has been escalated!`);
    setActiveDropdown(null);
  };

  const toggleDropdown = (ticketId: string) => {
    setActiveDropdown(activeDropdown === ticketId ? null : ticketId);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'Medium',
    category: 'General',
    channel: 'Portal',
    assignee: '',
    customer: ''
  });
  const [advancedFilters, setAdvancedFilters] = useState({
    priority: 'All',
    category: 'All',
    channel: 'All',
    assignee: 'All',
    dateRange: 'All',
    createdAfter: '',
    createdBefore: ''
  });

  const getSearchSuggestions = () => {
    if (!searchTerm.trim()) return [];
    const suggestions = new Set<string>();
    ticketData.forEach(ticket => {
      if (ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())) suggestions.add(ticket.subject);
      if (ticket.id.toLowerCase().includes(searchTerm.toLowerCase())) suggestions.add(ticket.id);
      if (ticket.assignee.toLowerCase().includes(searchTerm.toLowerCase())) suggestions.add(ticket.assignee);
      if (ticket.category.toLowerCase().includes(searchTerm.toLowerCase())) suggestions.add(ticket.category);
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

  // AI-powered ticket insights generator
  const generateTicketInsights = () => {
    const totalTickets = ticketData.length;
    const openTickets = ticketData.filter(t => t.status === 'Open').length;
    const approvedTickets = ticketData.filter(t => t.status === 'Approved').length;
    const ruleApproved = ticketData.filter(t => t.approvalMethod === 'rule').length;
    const humanApproved = ticketData.filter(t => t.approvalMethod === 'human').length;
    const highPriority = ticketData.filter(t => t.priority === 'High').length;
    const criticalTickets = ticketData.filter(t => t.priority === 'Critical').length;

    const avgResponseTime = '2.3 hours';
    const escalationRate = '12%';
    const satisfactionScore = '4.2/5';

    return `📊 **Ticket Performance Analysis**

**Current Status:**
• ${totalTickets} total tickets in system
• ${openTickets} open tickets (${((openTickets/totalTickets)*100).toFixed(1)}%)
• ${approvedTickets} approved tickets (${((approvedTickets/totalTickets)*100).toFixed(1)}%)

**Automation Impact:**
• ${ruleApproved} auto-approved by rules (${((ruleApproved/totalTickets)*100).toFixed(1)}%)
• ${humanApproved} human-approved tickets (${((humanApproved/totalTickets)*100).toFixed(1)}%)
• Automation efficiency: ${((ruleApproved/(ruleApproved+humanApproved))*100).toFixed(1)}%

**Priority Distribution:**
• ${highPriority} high priority tickets
• ${criticalTickets} critical tickets requiring immediate attention

**Performance Metrics:**
• Average response time: ${avgResponseTime}
• Escalation rate: ${escalationRate}
• Customer satisfaction: ${satisfactionScore}

**AI Recommendations:**
• Consider auto-escalating tickets >4 hours old
• Implement VIP customer priority rules
• Add sentiment analysis for urgent tickets
• Create automated follow-up workflows

**Optimization Opportunities:**
• ${openTickets > 5 ? 'High open ticket volume - consider increasing automation' : 'Ticket volume is manageable'}
• ${ruleApproved < 3 ? 'Increase rule-based approvals for better efficiency' : 'Good automation coverage'}
• ${criticalTickets > 0 ? 'Critical tickets need immediate attention' : 'No critical tickets - good health'}`;
  };

  // Handle advanced filter actions
  const handleApplyAdvancedFilters = () => {
    setShowAdvancedFilters(false);
  };

  const handleClearAdvancedFilters = () => {
    setAdvancedFilters({
      priority: 'All',
      category: 'All',
      channel: 'All',
      assignee: 'All',
      dateRange: 'All',
      createdAfter: '',
      createdBefore: ''
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (advancedFilters.priority !== 'All') count++;
    if (advancedFilters.category !== 'All') count++;
    if (advancedFilters.channel !== 'All') count++;
    if (advancedFilters.assignee !== 'All') count++;
    if (advancedFilters.createdAfter) count++;
    if (advancedFilters.createdBefore) count++;
    return count;
  };

  const filteredTickets = ticketData.filter(ticket => {
    const matchesStatus = filterStatus === 'All' || ticket.status === filterStatus;
    const matchesApproval = filterApproval === 'All' || ticket.approvalMethod === filterApproval;
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (ticket.assignee && ticket.assignee.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (ticket.category && ticket.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (ticket.description && ticket.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPriority = advancedFilters.priority === 'All' || ticket.priority === advancedFilters.priority;
    const matchesCategory = advancedFilters.category === 'All' || ticket.category === advancedFilters.category;
    const matchesChannel = advancedFilters.channel === 'All' || ticket.channel === advancedFilters.channel;
    const matchesAssignee = advancedFilters.assignee === 'All' || ticket.assignee === advancedFilters.assignee;

    let matchesDateRange = true;
    if (advancedFilters.createdAfter) {
      const createdDate = new Date(ticket.created);
      const afterDate = new Date(advancedFilters.createdAfter);
      matchesDateRange = matchesDateRange && createdDate >= afterDate;
    }
    if (advancedFilters.createdBefore) {
      const createdDate = new Date(ticket.created);
      const beforeDate = new Date(advancedFilters.createdBefore);
      matchesDateRange = matchesDateRange && createdDate <= beforeDate;
    }

    return matchesStatus && matchesApproval && matchesSearch && 
           matchesPriority && matchesCategory && matchesChannel && 
           matchesAssignee && matchesDateRange;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="space-y-8 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Ticket Management
            </h1>
            <p className="text-slate-600 font-medium">Multichannel intake, AI-powered triage, and intelligent routing</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700"
          >
            <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-200" />
            <span>Create Ticket</span>
          </button>
        </div>

      {/* Multichannel Intake Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <Mail className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Email</p>
              <p className="text-2xl font-bold text-slate-800">45</p>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <MessageSquare className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Portal</p>
              <p className="text-2xl font-bold text-slate-800">32</p>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <Slack className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Slack</p>
              <p className="text-2xl font-bold text-slate-800">18</p>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <Phone className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Phone</p>
              <p className="text-2xl font-bold text-slate-800">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
                <Brain className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">AI Insights & Automation</h3>
                <p className="text-white/80">Intelligent ticket processing and automation</p>
              </div>
            </div>
            <button
              onClick={() => {
                const generatedInsights = generateTicketInsights();
                setInsights(generatedInsights);
                setShowInsights(true);
              }}
              className="group relative px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Brain size={20} className="inline mr-2 group-hover:animate-pulse" />
              <span>Get Detailed Insights</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Zap className="text-blue-300" size={20} />
                </div>
                <span className="font-semibold text-white">Auto-Assignment</span>
              </div>
              <p className="text-white/80 text-sm">87% accuracy rate</p>
            </div>
            <div className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Bot className="text-blue-300" size={20} />
                </div>
                <span className="font-semibold text-white">Rule-Based Approvals</span>
              </div>
              <p className="text-white/80 text-sm">{ticketData.filter(t => t.approvalMethod === 'rule').length} tickets auto-approved</p>
            </div>
            <div className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <AlertCircle className="text-red-300" size={20} />
                </div>
                <span className="font-semibold text-white">Escalation Prediction</span>
              </div>
              <p className="text-white/80 text-sm">3 tickets flagged for escalation</p>
            </div>
            <div className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="text-green-300" size={20} />
                </div>
                <span className="font-semibold text-white">Duplicate Detection</span>
              </div>
              <p className="text-white/80 text-sm">5 duplicates prevented</p>
            </div>
          </div>
        </div>
      </div>

      {/* Human Approval Chamber */}
      {pendingTickets.length > 0 && (
        <HumanApprovalChamber
          pendingTickets={pendingTickets}
          onApprove={handleApproveTicket}
          onReject={handleRejectTicket}
          onViewDetails={handleViewTicketDetails}
        />
      )}

      {/* Filters and Search */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={handleSearchInputChange}
                onFocus={() => searchTerm && setShowSearchSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                className="pl-12 pr-4 py-3 w-80 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 placeholder-slate-400"
              />
              
              {/* Search Suggestions */}
              {showSearchSuggestions && getSearchSuggestions().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 z-50">
                  <div className="p-3">
                    <div className="text-xs text-slate-500 px-3 py-2 border-b border-slate-100 font-medium">
                      Suggestions
                    </div>
                    {getSearchSuggestions().map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-3 py-3 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <Search size={16} className="text-slate-400" />
                          <span className="text-sm text-slate-700 font-medium">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-slate-700 font-medium"
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Approved">Approved</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
                <option value="Escalated">Escalated</option>
              </select>
              <select
                value={filterApproval}
                onChange={(e) => setFilterApproval(e.target.value)}
                className="px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-slate-700 font-medium"
              >
                <option value="All">All Approvals</option>
                <option value="rule">Rule-Based</option>
                <option value="human">Human Approval</option>
              </select>
            </div>
          </div>
          <button 
            onClick={() => setShowAdvancedFilters(true)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
              getActiveFiltersCount() > 0 
                ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' 
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter size={16} className="text-gray-400" />
            <span className="text-sm">Advanced Filters</span>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <th className="text-left py-4 px-6 font-bold text-slate-700 text-sm uppercase tracking-wider">Ticket</th>
                <th className="text-left py-4 px-6 font-bold text-slate-700 text-sm uppercase tracking-wider">Subject</th>
                <th className="text-left py-4 px-6 font-bold text-slate-700 text-sm uppercase tracking-wider">Priority</th>
                <th className="text-left py-4 px-6 font-bold text-slate-700 text-sm uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 font-bold text-slate-700 text-sm uppercase tracking-wider">Approval</th>
                <th className="text-left py-4 px-6 font-bold text-slate-700 text-sm uppercase tracking-wider">Channel</th>
                <th className="text-left py-4 px-6 font-bold text-slate-700 text-sm uppercase tracking-wider">Assignee</th>
                <th className="text-left py-4 px-6 font-bold text-slate-700 text-sm uppercase tracking-wider">Created</th>
                <th className="text-left py-4 px-6 font-bold text-slate-700 text-sm uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => {
                const ChannelIcon = channelIcons[ticket.channel];
                return (
                  <tr key={ticket.id} className={`group hover:bg-slate-50/50 transition-all duration-200 ${
                    ticket.approvalMethod === 'rule' ? 'bg-blue-50/30' : ''
                  }`}>
                    <td className="py-6 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm">
                            {ticket.id.split('-').pop()}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{ticket.id}</div>
                          <div className="flex items-center space-x-2">
                            {ticket.aiInsights && (
                              <div title={ticket.aiInsights}>
                                <Brain size={16} className="text-purple-500" />
                              </div>
                            )}
                            {ticket.approvalMethod === 'rule' && (
                              <Bot size={16} className="text-blue-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{ticket.subject}</p>
                        <p className="text-sm text-slate-500 font-medium">{ticket.category}</p>
                        {ticket.ruleUsed && (
                          <p className="text-xs text-blue-600 mt-1 font-medium">
                            Rule: {ticket.ruleUsed}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${priorityColors[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-6 px-6">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusColors[ticket.status]}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center space-x-2">
                        {ticket.approvalMethod === 'rule' ? (
                          <div className="flex items-center space-x-2">
                            <Bot size={16} className="text-blue-500" />
                            <span className="text-xs text-blue-600 font-bold">Auto</span>
                          </div>
                        ) : ticket.approvalMethod === 'human' ? (
                          <div className="flex items-center space-x-2">
                            <UserCheck size={16} className="text-green-500" />
                            <span className="text-xs text-green-600 font-bold">Human</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500 font-medium">Pending</span>
                        )}
                      </div>
                      {ticket.approvedAt && (
                        <div className="text-xs text-slate-500 mt-1 font-medium">
                          {new Date(ticket.approvedAt).toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center space-x-3">
                        <ChannelIcon size={18} className="text-slate-500" />
                        <span className="text-sm text-slate-600 font-medium">{ticket.channel}</span>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center shadow-md">
                          <User size={14} className="text-white" />
                        </div>
                        <span className="text-sm text-slate-600 font-medium">{ticket.assignee}</span>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center space-x-3">
                        <Clock size={18} className="text-slate-500" />
                        <span className="text-sm text-slate-600 font-medium">{ticket.created}</span>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="relative dropdown-container">
                        <button 
                          onClick={() => toggleDropdown(ticket.id)}
                          className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200 group"
                        >
                          <MoreVertical size={18} className="text-slate-400 group-hover:text-slate-600" />
                        </button>
                        
                        {activeDropdown === ticket.id && (
                          <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 z-50 overflow-hidden">
                            <div className="py-2">
                              <button
                                onClick={() => handleViewTicketDetails(ticket)}
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 flex items-center space-x-3 transition-colors duration-200"
                              >
                                <Eye size={18} className="text-blue-500" />
                                <span className="font-medium">View Details</span>
                              </button>
                              <button
                                onClick={() => handleEditTicket(ticket)}
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-green-50 flex items-center space-x-3 transition-colors duration-200"
                              >
                                <Edit size={18} className="text-green-500" />
                                <span className="font-medium">Edit Ticket</span>
                              </button>
                              <button
                                onClick={() => handleDuplicateTicket(ticket)}
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-purple-50 flex items-center space-x-3 transition-colors duration-200"
                              >
                                <Copy size={18} className="text-purple-500" />
                                <span className="font-medium">Duplicate</span>
                              </button>
                              <button
                                onClick={() => handleAssignTicket(ticket)}
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 flex items-center space-x-3 transition-colors duration-200"
                              >
                                <UserPlus size={18} className="text-blue-500" />
                                <span className="font-medium">Assign</span>
                              </button>
                              <button
                                onClick={() => handleEscalateTicket(ticket)}
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 flex items-center space-x-3 transition-colors duration-200"
                              >
                                <TrendingUp size={18} className="text-blue-500" />
                                <span className="font-medium">Escalate</span>
                              </button>
                              <hr className="my-2 border-slate-200" />
                              <button
                                onClick={() => handleDeleteTicket(ticket)}
                                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-200"
                              >
                                <Trash2 size={18} className="text-red-500" />
                                <span className="font-medium">Delete</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights Modal */}
      {showInsights && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Brain className="text-purple-600" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">AI Ticket Insights</h2>
              </div>
              <button
                onClick={() => setShowInsights(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {insights}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
              <button
                onClick={() => setShowInsights(false)}
                className="btn-secondary"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const generatedInsights = generateTicketInsights();
                  setInsights(generatedInsights);
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <Brain size={16} />
                <span>Refresh Insights</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden border border-white/20">
            <div className="flex items-center justify-between p-8 border-b border-slate-200 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                  <Plus className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Create New Ticket</h2>
                  <p className="text-white/80">Fill out the form below to create a new support ticket</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[calc(95vh-200px)]">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                    className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 placeholder-slate-400"
                    placeholder="Enter ticket subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Description
                  </label>
                  <textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 resize-none"
                    placeholder="Describe the issue or request"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="General">General</option>
                      <option value="Technical">Technical</option>
                      <option value="Billing">Billing</option>
                      <option value="Security">Security</option>
                      <option value="Access">Access</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Software">Software</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Channel
                    </label>
                    <select
                      value={newTicket.channel}
                      onChange={(e) => setNewTicket({...newTicket, channel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Portal">Portal</option>
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                      <option value="Slack">Slack</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assignee
                    </label>
                    <input
                      type="text"
                      value={newTicket.assignee}
                      onChange={(e) => setNewTicket({...newTicket, assignee: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Leave empty for auto-assignment"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer
                  </label>
                  <input
                    type="text"
                    value={newTicket.customer}
                    onChange={(e) => setNewTicket({...newTicket, customer: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Customer name or email"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 p-8 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const ticket = {
                    id: `TCK-2024-${String(ticketData.length + 1).padStart(3, '0')}`,
                    subject: newTicket.subject,
                    description: newTicket.description,
                    priority: newTicket.priority,
                    category: newTicket.category,
                    channel: newTicket.channel,
                    status: 'Open',
                    assignee: newTicket.assignee || 'Unassigned',
                    requester: newTicket.customer || 'Anonymous',
                    customer: newTicket.customer || 'Anonymous',
                    created: new Date().toISOString().slice(0, 16).replace('T', ' '),
                    updated: new Date().toISOString().slice(0, 16).replace('T', ' '),
                    sla: '24h',
                    tags: [],
                    sentiment: 'neutral',
                    aiInsights: 'New ticket created',
                    approvalMethod: 'pending',
                    approvedBy: '',
                    approvedAt: null
                  };
                  ticketData.unshift(ticket);
                  setNewTicket({
                    subject: '',
                    description: '',
                    priority: 'Medium',
                    category: 'General',
                    channel: 'Portal',
                    assignee: '',
                    customer: ''
                  });
                  setShowCreateModal(false);
                  alert('Ticket created successfully!');
                }}
                className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 flex items-center space-x-2"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
                <span>Create Ticket</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filters Modal */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Filter className="text-gray-600" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Advanced Filters</h2>
              </div>
              <button
                onClick={() => setShowAdvancedFilters(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={advancedFilters.priority}
                      onChange={(e) => setAdvancedFilters({...advancedFilters, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All">All Priorities</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={advancedFilters.category}
                      onChange={(e) => setAdvancedFilters({...advancedFilters, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All">All Categories</option>
                      <option value="General">General</option>
                      <option value="Technical">Technical</option>
                      <option value="Billing">Billing</option>
                      <option value="Security">Security</option>
                      <option value="Access">Access</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Software">Software</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Channel
                    </label>
                    <select
                      value={advancedFilters.channel}
                      onChange={(e) => setAdvancedFilters({...advancedFilters, channel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All">All Channels</option>
                      <option value="Portal">Portal</option>
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                      <option value="Slack">Slack</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assignee
                    </label>
                    <select
                      value={advancedFilters.assignee}
                      onChange={(e) => setAdvancedFilters({...advancedFilters, assignee: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All">All Assignees</option>
                      <option value="John Doe">John Doe</option>
                      <option value="Jane Smith">Jane Smith</option>
                      <option value="Mike Johnson">Mike Johnson</option>
                      <option value="Sarah Wilson">Sarah Wilson</option>
                      <option value="Unassigned">Unassigned</option>
                    </select>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Date Range</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Created After
                      </label>
                      <input
                        type="date"
                        value={advancedFilters.createdAfter}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, createdAfter: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Created Before
                      </label>
                      <input
                        type="date"
                        value={advancedFilters.createdBefore}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, createdBefore: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {getActiveFiltersCount() > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="text-blue-600" size={16} />
                      <span className="text-sm font-medium text-blue-800">
                        {getActiveFiltersCount()} filter{getActiveFiltersCount() > 1 ? 's' : ''} active
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleClearAdvancedFilters}
                className="btn-secondary"
              >
                Clear All Filters
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyAdvancedFilters}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Filter size={16} />
                  <span>Apply Filters</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Ticket Details Modal */}
      {showTicketDetails && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Ticket Details</h2>
              <button
                onClick={() => setShowTicketDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Ticket ID</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedTicket.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedTicket.status]}`}>
                    {selectedTicket.status}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Subject</label>
                <p className="text-lg text-gray-900">{selectedTicket.subject}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-gray-700">{selectedTicket.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Priority</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[selectedTicket.priority]}`}>
                    {selectedTicket.priority}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-gray-900">{selectedTicket.category}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Channel</label>
                  <p className="text-gray-900">{selectedTicket.channel}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Assignee</label>
                  <p className="text-gray-900">{selectedTicket.assignee || 'Unassigned'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Requester</label>
                  <p className="text-gray-900">{selectedTicket.requester}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">SLA</label>
                  <p className="text-gray-900">{selectedTicket.sla}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <p className="text-gray-900">{selectedTicket.created}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Updated</label>
                  <p className="text-gray-900">{selectedTicket.updated}</p>
                </div>
              </div>
              
              {selectedTicket.tags && selectedTicket.tags.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Tags</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedTicket.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTicket.aiInsights && (
                <div>
                  <label className="text-sm font-medium text-gray-500">AI Insights</label>
                  <p className="text-gray-700 bg-purple-50 p-3 rounded-lg">{selectedTicket.aiInsights}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowTicketDetails(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowTicketDetails(false);
                  handleEditTicket(selectedTicket);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && ticketToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Delete Ticket</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete ticket <strong>{ticketToDelete.id}</strong>? 
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteTicket}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Ticket Modal */}
      {showEditModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Edit Ticket</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={selectedTicket.subject}
                  onChange={(e) => setSelectedTicket({...selectedTicket, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={selectedTicket.description}
                  onChange={(e) => setSelectedTicket({...selectedTicket, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={selectedTicket.priority}
                    onChange={(e) => setSelectedTicket({...selectedTicket, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedTicket.status}
                    onChange={(e) => setSelectedTicket({...selectedTicket, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={selectedTicket.category}
                    onChange={(e) => setSelectedTicket({...selectedTicket, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                  <input
                    type="text"
                    value={selectedTicket.assignee || ''}
                    onChange={(e) => setSelectedTicket({...selectedTicket, assignee: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter assignee name"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Saving ticket:', selectedTicket);
                  alert('Ticket updated successfully!');
                  setShowEditModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}



