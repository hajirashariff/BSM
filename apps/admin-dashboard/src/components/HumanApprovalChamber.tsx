import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  AlertTriangle,
  Eye,
  ThumbsUp,
  ThumbsDown,
  UserCheck,
  Calendar,
  Tag
} from 'lucide-react';

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
}

interface HumanApprovalChamberProps {
  pendingTickets: Ticket[];
  onApprove: (ticketId: string) => void;
  onReject: (ticketId: string) => void;
  onViewDetails: (ticket: Ticket) => void;
}

const HumanApprovalChamber: React.FC<HumanApprovalChamberProps> = ({
  pendingTickets,
  onApprove,
  onReject,
  onViewDetails
}) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getPriorityColor = (priority: string) => {
    const priorityMap: { [key: string]: string } = {
      'Low': 'text-blue-600 bg-blue-100',
      'Medium': 'text-yellow-600 bg-yellow-100',
      'High': 'text-orange-600 bg-orange-100',
      'Critical': 'text-red-600 bg-red-100'
    };
    return priorityMap[priority] || 'text-gray-600 bg-gray-100';
  };

  const getChannelIcon = (channel: string) => {
    const channelMap: { [key: string]: any } = {
      'Email': '📧',
      'Portal': '💬',
      'Slack': '💬',
      'Phone': '📞'
    };
    return channelMap[channel] || '📋';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!isClient) {
    return (
      <div className="card bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (pendingTickets.length === 0) {
    return (
      <div className="card bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            All Caught Up! 🎉
          </h3>
          <p className="text-gray-600">
            No tickets pending human approval at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-200 via-indigo-200 to-cyan-200 rounded-3xl p-8 shadow-2xl">
      <div className="absolute inset-0 bg-white/10"></div>
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg">
              <UserCheck className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Human Approval Chamber
              </h2>
              <p className="text-gray-600">
                Review and approve tickets requiring human intervention
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-800 font-medium">
                Active
              </span>
            </div>
            <div className="px-6 py-3 bg-white/30 backdrop-blur-sm text-blue-600 rounded-xl text-sm font-semibold shadow-lg">
              {pendingTickets.length} Pending
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-6">
          {pendingTickets.map((ticket) => (
            <div key={ticket.id} className="group bg-white/20 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-[1.02] border border-white/30">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="font-mono text-sm text-gray-600 bg-white/30 px-3 py-1 rounded-lg">
                      #{ticket.id}
                    </span>
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                    <span className="text-sm text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDate(ticket.created)}
                    </span>
                    <span className="text-sm text-gray-600 flex items-center">
                      {getChannelIcon(ticket.channel)} {ticket.channel}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    {ticket.subject}
                  </h4>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {ticket.description}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{ticket.requester}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4" />
                      <span>{ticket.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>SLA: {ticket.sla}</span>
                    </div>
                  </div>

                  {ticket.tags && ticket.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {ticket.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-white/30 text-gray-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 ml-6">
                  <button
                    onClick={() => onViewDetails(ticket)}
                    className="p-3 text-gray-600 hover:text-gray-800 hover:bg-white/30 transition-all duration-200 rounded-xl"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onApprove(ticket.id)}
                    className="group inline-flex items-center px-6 py-3 bg-green-100 backdrop-blur-sm text-green-600 font-semibold rounded-xl hover:bg-green-200 transition-all duration-200 hover:scale-105 shadow-lg border border-green-200"
                  >
                    <ThumbsUp className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Approve
                  </button>
                  <button
                    onClick={() => onReject(ticket.id)}
                    className="group inline-flex items-center px-6 py-3 bg-red-100 backdrop-blur-sm text-red-600 font-semibold rounded-xl hover:bg-red-200 transition-all duration-200 hover:scale-105 shadow-lg border border-red-200"
                  >
                    <ThumbsDown className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-white/30">
          <div className="flex items-center justify-between">
            <div className="text-gray-600 font-medium">
              {pendingTickets.length} ticket{pendingTickets.length !== 1 ? 's' : ''} pending approval
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to approve all pending tickets?')) {
                    pendingTickets.forEach(ticket => onApprove(ticket.id));
                  }
                }}
                className="group inline-flex items-center px-6 py-3 bg-green-100 backdrop-blur-sm text-green-600 font-semibold rounded-xl hover:bg-green-200 transition-all duration-200 hover:scale-105 shadow-lg border border-green-200"
              >
                <CheckCircle className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Approve All
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reject all pending tickets?')) {
                    pendingTickets.forEach(ticket => onReject(ticket.id));
                  }
                }}
                className="group inline-flex items-center px-6 py-3 bg-red-100 backdrop-blur-sm text-red-600 font-semibold rounded-xl hover:bg-red-200 transition-all duration-200 hover:scale-105 shadow-lg border border-red-200"
              >
                <XCircle className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Reject All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanApprovalChamber;
