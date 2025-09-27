import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  AlertTriangle,
  Eye,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Ticket } from '../lib/ticketService';

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
      'low': 'text-blue-600 bg-blue-100',
      'medium': 'text-yellow-600 bg-yellow-100',
      'high': 'text-orange-600 bg-orange-100',
      'urgent': 'text-red-600 bg-red-100'
    };
    return priorityMap[priority] || 'text-gray-600 bg-gray-100';
  };

  const getPriorityLabel = (priority: string) => {
    const priorityMap: { [key: string]: string } = {
      'low': 'Low',
      'medium': 'Medium',
      'high': 'High',
      'urgent': 'Urgent'
    };
    return priorityMap[priority] || priority;
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
      <div className="bg-white dark:bg-zinc-900 shadow-sm rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 dark:bg-zinc-700 rounded"></div>
            <div className="h-16 bg-gray-200 dark:bg-zinc-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (pendingTickets.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-6">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-2">
            All Caught Up!
          </h3>
          <p className="text-gray-500 dark:text-zinc-400">
            No tickets pending human approval at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100">
                Human Approval Chamber
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                Active
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium">
              {pendingTickets.length} Pending
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-zinc-400 mt-2">
          Review and approve tickets that require human intervention before processing.
        </p>
      </div>

      {/* Tickets List */}
      <div className="divide-y divide-gray-200 dark:divide-zinc-800">
        {pendingTickets.map((ticket) => (
          <div key={ticket.id} className="p-6 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm font-mono text-gray-500 dark:text-zinc-400">
                    #{ticket.id}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                    {getPriorityLabel(ticket.priority)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-zinc-400">
                    {formatDate(ticket.createdAt)}
                  </span>
                </div>
                
                <h4 className="text-sm font-medium text-gray-900 dark:text-zinc-100 mb-1 truncate">
                  {ticket.subject}
                </h4>
                
                <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2 mb-2">
                  {ticket.description}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-zinc-400">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{ticket.createdBy}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{ticket.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onViewDetails(ticket)}
                  className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-md"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onApprove(ticket.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  <ThumbsUp className="w-3 h-3 mr-1" />
                  Approve
                </button>
                <button
                  onClick={() => onReject(ticket.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  <ThumbsDown className="w-3 h-3 mr-1" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-zinc-400">
            {pendingTickets.length} ticket{pendingTickets.length !== 1 ? 's' : ''} pending approval
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to approve all pending tickets?')) {
                  pendingTickets.forEach(ticket => onApprove(ticket.id));
                }
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve All
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reject all pending tickets?')) {
                  pendingTickets.forEach(ticket => onReject(ticket.id));
                }
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanApprovalChamber;
