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
  UserCheck
} from 'lucide-react';

const ticketData = [
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
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800'
};

const statusColors: { [key: string]: string } = {
  Open: 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Approved: 'bg-green-100 text-green-800',
  Resolved: 'bg-green-100 text-green-800',
  Closed: 'bg-gray-100 text-gray-800',
  Escalated: 'bg-red-100 text-red-800'
};

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterApproval, setFilterApproval] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [insights, setInsights] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Request Management</h1>
          <p className="text-gray-600">Multichannel intake, AI-powered triage, and intelligent routing</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Create Ticket</span>
        </button>
      </div>

      {/* Multichannel Intake Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-semibold">45</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageSquare className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Portal</p>
              <p className="text-lg font-semibold">32</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Slack className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Slack</p>
              <p className="text-lg font-semibold">18</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Phone className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-lg font-semibold">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="text-purple-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">AI Insights & Automation</h3>
          </div>
          <button
            onClick={() => {
              // Generate intelligent insights based on current ticket data
              const generatedInsights = generateTicketInsights();
              setInsights(generatedInsights);
              setShowInsights(true);
            }}
            className="btn-secondary flex items-center space-x-2 text-sm"
          >
            <Brain size={16} />
            <span>Get Detailed Insights</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="text-yellow-600" size={16} />
              <span className="font-medium">Auto-Assignment</span>
            </div>
            <p className="text-sm text-gray-600">87% accuracy rate</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Bot className="text-blue-600" size={16} />
              <span className="font-medium">Rule-Based Approvals</span>
            </div>
            <p className="text-sm text-gray-600">{ticketData.filter(t => t.approvalMethod === 'rule').length} tickets auto-approved</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="text-red-600" size={16} />
              <span className="font-medium">Escalation Prediction</span>
            </div>
            <p className="text-sm text-gray-600">3 tickets flagged for escalation</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="text-green-600" size={16} />
              <span className="font-medium">Duplicate Detection</span>
            </div>
            <p className="text-sm text-gray-600">5 duplicates prevented</p>
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
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={handleSearchInputChange}
                onFocus={() => searchTerm && setShowSearchSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Approvals</option>
              <option value="rule">Rule-Based</option>
              <option value="human">Human Approval</option>
            </select>
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
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Ticket</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Subject</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Approval</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Channel</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Assignee</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Created</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => {
                const ChannelIcon = channelIcons[ticket.channel];
                return (
                  <tr key={ticket.id} className={`border-b border-gray-100 hover:bg-gray-50 ${
                    ticket.approvalMethod === 'rule' ? 'bg-blue-50/30' : ''
                  }`}>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{ticket.id}</span>
                        {ticket.aiInsights && (
                          <div title={ticket.aiInsights}>
                            <Brain size={16} className="text-purple-600" />
                          </div>
                        )}
                        {ticket.approvalMethod === 'rule' && (
                          <Bot size={16} className="text-blue-600" title="Auto-approved by Rules Engine" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{ticket.subject}</p>
                        <p className="text-sm text-gray-500">{ticket.category}</p>
                        {ticket.ruleUsed && (
                          <p className="text-xs text-blue-600 mt-1">
                            Rule: {ticket.ruleUsed}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[ticket.status]}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {ticket.approvalMethod === 'rule' ? (
                          <div className="flex items-center space-x-1">
                            <Bot size={14} className="text-blue-600" />
                            <span className="text-xs text-blue-600 font-medium">Auto</span>
                          </div>
                        ) : ticket.approvalMethod === 'human' ? (
                          <div className="flex items-center space-x-1">
                            <UserCheck size={14} className="text-green-600" />
                            <span className="text-xs text-green-600 font-medium">Human</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">Pending</span>
                        )}
                      </div>
                      {ticket.approvedAt && (
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(ticket.approvedAt).toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <ChannelIcon size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{ticket.channel}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                          <User size={12} />
                        </div>
                        <span className="text-sm text-gray-600">{ticket.assignee}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{ticket.created}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical size={16} className="text-gray-400" />
                      </button>
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
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
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
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {insights}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Plus className="text-blue-600" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Create New Ticket</h2>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter ticket subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowCreateModal(false)}
                className="btn-secondary"
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
                    customer: newTicket.customer || 'Anonymous',
                    created: new Date().toISOString().slice(0, 16).replace('T', ' '),
                    updated: new Date().toISOString().slice(0, 16).replace('T', ' '),
                    aiInsights: 'New ticket created',
                    approvalMethod: 'pending',
                    approvedBy: null,
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
                className="btn-primary flex items-center space-x-2"
              >
                <Plus size={16} />
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
    </div>
  );
}



