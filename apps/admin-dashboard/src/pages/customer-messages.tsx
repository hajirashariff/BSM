import React, { useState } from 'react';
import { 
  MessageSquare, 
  User, 
  Building, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Info,
  Search,
  Filter,
  MoreVertical,
  Reply,
  UserPlus,
  Archive,
  Trash2,
  Eye,
  Download,
  Tag,
  X
} from 'lucide-react';
import { useNotifications, CustomerMessage } from '../contexts/NotificationContext';

export default function CustomerMessagesPage() {
  const { customerMessages, updateCustomerMessageStatus, assignCustomerMessage, respondToCustomerMessage } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'new' | 'in_progress' | 'responded' | 'resolved' | 'closed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'urgent' | 'high' | 'medium' | 'low'>('all');
  const [serviceFilter, setServiceFilter] = useState<'all' | 'consultation' | 'support' | 'implementation' | 'maintenance' | 'custom'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<CustomerMessage | null>(null);
  const [responseText, setResponseText] = useState('');

  const getStatusIcon = (status: CustomerMessage['status']) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="text-red-500" size={16} />;
      case 'in_progress':
        return <Clock className="text-yellow-500" size={16} />;
      case 'responded':
        return <CheckCircle className="text-blue-500" size={16} />;
      case 'resolved':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'closed':
        return <Archive className="text-gray-500" size={16} />;
      default:
        return <Info className="text-gray-500" size={16} />;
    }
  };

  const getPriorityBadge = (priority: CustomerMessage['priority']) => {
    const styles = {
      urgent: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[priority]}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  const getServiceTypeBadge = (serviceType: CustomerMessage['serviceType']) => {
    const styles = {
      consultation: 'bg-blue-100 text-blue-800',
      support: 'bg-red-100 text-red-800',
      implementation: 'bg-green-100 text-green-800',
      maintenance: 'bg-yellow-100 text-yellow-800',
      custom: 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[serviceType]}`}>
        {serviceType.toUpperCase()}
      </span>
    );
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredMessages = customerMessages.filter(message => {
    const matchesFilter = filter === 'all' || message.status === filter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;
    const matchesService = serviceFilter === 'all' || message.serviceType === serviceFilter;
    const matchesSearch = searchTerm === '' || 
      message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesPriority && matchesService && matchesSearch;
  });

  const handleStatusChange = (messageId: string, newStatus: CustomerMessage['status']) => {
    updateCustomerMessageStatus(messageId, newStatus);
  };

  const handleAssign = (messageId: string) => {
    const assignedTo = prompt('Assign to (enter team member name):');
    if (assignedTo) {
      assignCustomerMessage(messageId, assignedTo);
    }
  };

  const handleRespond = (messageId: string) => {
    if (responseText.trim()) {
      respondToCustomerMessage(messageId, responseText);
      setResponseText('');
      setSelectedMessage(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <MessageSquare className="mr-3 text-blue-600" size={32} />
            </div>
            <p className="text-gray-600 mt-2">
              Manage customer inquiries, requirements, and service requests
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <MessageSquare size={16} />
              <span>New Message</span>
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <AlertCircle className="text-red-500 mr-2" size={16} />
            {customerMessages.filter(m => m.status === 'new').length} new
          </span>
          <span className="flex items-center">
            <Clock className="text-yellow-500 mr-2" size={16} />
            {customerMessages.filter(m => m.status === 'in_progress').length} in progress
          </span>
          <span className="flex items-center">
            <CheckCircle className="text-green-500 mr-2" size={16} />
            {customerMessages.filter(m => m.status === 'resolved').length} resolved
          </span>
          <span>Total: {customerMessages.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="responded">Responded</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          
          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          {/* Service Type Filter */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Services</option>
            <option value="consultation">Consultation</option>
            <option value="support">Support</option>
            <option value="implementation">Implementation</option>
            <option value="maintenance">Maintenance</option>
            <option value="custom">Custom</option>
          </select>
          
          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} />
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {filteredMessages.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No messages found</h3>
                <p>Try adjusting your filters or check back later for new messages.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                      message.status === 'new' ? 'bg-blue-50/30 border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(message.status)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className={`text-lg font-semibold ${message.status === 'new' ? 'text-gray-900' : 'text-gray-700'}`}>
                                {message.customerName}
                              </h3>
                              {message.status === 'new' && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2 mb-2">
                              {message.company && (
                                <span className="flex items-center text-sm text-gray-600">
                                  <Building size={14} className="mr-1" />
                                  {message.company}
                                </span>
                              )}
                              <span className="flex items-center text-sm text-gray-600">
                                <Mail size={14} className="mr-1" />
                                {message.customerEmail}
                              </span>
                              {message.customerPhone && (
                                <span className="flex items-center text-sm text-gray-600">
                                  <Phone size={14} className="mr-1" />
                                  {message.customerPhone}
                                </span>
                              )}
                            </div>
                            
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {message.message}
                            </p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock size={14} className="mr-1" />
                                {formatTimeAgo(message.timestamp)}
                              </span>
                              {getServiceTypeBadge(message.serviceType)}
                              {getPriorityBadge(message.priority)}
                              {message.budget && (
                                <span className="flex items-center">
                                  <DollarSign size={14} className="mr-1" />
                                  {message.budget}
                                </span>
                              )}
                              {message.timeline && (
                                <span className="flex items-center">
                                  <Calendar size={14} className="mr-1" />
                                  {message.timeline}
                                </span>
                              )}
                            </div>
                            
                            {/* Requirements */}
                            {message.requirements.length > 0 && (
                              <div className="mt-2">
                                <div className="flex flex-wrap gap-1">
                                  {message.requirements.map((req, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                      {req}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAssign(message.id);
                              }}
                              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                              title="Assign"
                            >
                              <UserPlus size={16} className="text-gray-400" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMessage(message);
                              }}
                              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye size={16} className="text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Details Panel */}
        <div className="lg:col-span-1">
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Message Details</h3>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{selectedMessage.customerName}</h4>
                  <p className="text-sm text-gray-600">{selectedMessage.customerEmail}</p>
                  {selectedMessage.company && (
                    <p className="text-sm text-gray-600">{selectedMessage.company}</p>
                  )}
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Message</h5>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {selectedMessage.message}
                  </p>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Requirements</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedMessage.requirements.map((req, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Service Type:</span>
                    <p className="text-gray-600">{selectedMessage.serviceType}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Priority:</span>
                    <p className="text-gray-600">{selectedMessage.priority}</p>
                  </div>
                  {selectedMessage.budget && (
                    <div>
                      <span className="font-medium text-gray-900">Budget:</span>
                      <p className="text-gray-600">{selectedMessage.budget}</p>
                    </div>
                  )}
                  {selectedMessage.timeline && (
                    <div>
                      <span className="font-medium text-gray-900">Timeline:</span>
                      <p className="text-gray-600">{selectedMessage.timeline}</p>
                    </div>
                  )}
                </div>
                
                {/* Status Management */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Status</h5>
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => handleStatusChange(selectedMessage.id, e.target.value as CustomerMessage['status'])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="responded">Responded</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                
                {/* Response */}
                {selectedMessage.status === 'new' || selectedMessage.status === 'in_progress' ? (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Response</h5>
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Type your response here..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                    />
                    <button
                      onClick={() => handleRespond(selectedMessage.id)}
                      disabled={!responseText.trim()}
                      className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Reply size={16} className="inline mr-2" />
                      Send Response
                    </button>
                  </div>
                ) : selectedMessage.response ? (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Response</h5>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {selectedMessage.response}
                    </p>
                    {selectedMessage.responseDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        Responded: {formatTimeAgo(selectedMessage.responseDate)}
                      </p>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center text-gray-500">
              <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


