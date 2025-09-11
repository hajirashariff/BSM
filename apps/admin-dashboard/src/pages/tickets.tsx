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
  Brain
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
    sentiment: 'Frustrated'
  },
  {
    id: 'TCK-2024-002',
    subject: 'Email server maintenance scheduled',
    priority: 'Medium',
    status: 'In Progress',
    category: 'System Maintenance',
    channel: 'Portal',
    assignee: 'Jane Smith',
    requester: 'IT Operations',
    created: '2024-01-15 08:00',
    updated: '2024-01-15 16:45',
    sla: '24 hours',
    tags: ['Email', 'Maintenance', 'Scheduled'],
    aiInsights: 'Routine maintenance. No impact expected.',
    sentiment: 'Neutral'
  },
  {
    id: 'TCK-2024-003',
    subject: 'New employee onboarding workflow',
    priority: 'Low',
    status: 'Resolved',
    category: 'HR',
    channel: 'Slack',
    assignee: 'Mike Johnson',
    requester: 'HR Department',
    created: '2024-01-14 10:15',
    updated: '2024-01-15 11:30',
    sla: '48 hours',
    tags: ['Onboarding', 'HR', 'Workflow'],
    aiInsights: 'Standard onboarding process completed successfully.',
    sentiment: 'Positive'
  },
  {
    id: 'TCK-2024-004',
    subject: 'Software license renewal - Adobe Creative Suite',
    priority: 'High',
    status: 'Open',
    category: 'Procurement',
    channel: 'Phone',
    assignee: 'Sarah Wilson',
    requester: 'Marketing Team',
    created: '2024-01-15 13:20',
    updated: '2024-01-15 13:20',
    sla: '2 hours',
    tags: ['License', 'Adobe', 'Renewal'],
    aiInsights: 'Urgent: License expires in 3 days. Expedite approval.',
    sentiment: 'Urgent'
  }
];

const channelIcons = {
  Email: Mail,
  Portal: MessageSquare,
  Slack: Slack,
  Phone: Phone
};

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800'
};

const statusColors = {
  Open: 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Resolved: 'bg-green-100 text-green-800',
  Closed: 'bg-gray-100 text-gray-800'
};

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = ticketData.filter(ticket => {
    const matchesStatus = filterStatus === 'All' || ticket.status === filterStatus;
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Request Management</h1>
          <p className="text-gray-600">Multichannel intake, AI-powered triage, and intelligent routing</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
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
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="text-purple-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">AI Insights & Automation</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="text-yellow-600" size={16} />
              <span className="font-medium">Auto-Assignment</span>
            </div>
            <p className="text-sm text-gray-600">87% accuracy rate</p>
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
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <span className="text-sm text-gray-600">Advanced Filters</span>
          </div>
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
                  <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{ticket.id}</span>
                        {ticket.aiInsights && (
                          <Brain size={16} className="text-purple-600" title={ticket.aiInsights} />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{ticket.subject}</p>
                        <p className="text-sm text-gray-500">{ticket.category}</p>
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
    </div>
  );
}



