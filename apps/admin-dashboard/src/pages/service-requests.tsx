import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  ArrowLeft,
  Plus,
  Mail,
  MessageSquare,
  Slack,
  Phone,
  Brain,
  Zap,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Eye,
  Edit,
  Download,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Target,
  BarChart3,
  Activity,
  XCircle,
  ArrowRight,
  Star,
  Award,
  Shield,
  Globe,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  Monitor,
  DollarSign,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Settings,
  Bell,
  Calendar,
  Upload,
  FileText
} from 'lucide-react';

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  channel: 'email' | 'portal' | 'slack' | 'phone';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  assignedTo: string;
  customer: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
}

interface ChannelMetrics {
  [key: string]: number;
  email: number;
  portal: number;
  slack: number;
  phone: number;
}

interface AIInsights {
  autoAssignment: {
    accuracy: number;
    totalAssigned: number;
  };
  escalationPrediction: {
    flaggedTickets: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
  duplicateDetection: {
    duplicatesPrevented: number;
    savingsHours: number;
  };
}

export default function ServiceRequestsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChannel, setFilterChannel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    channel: 'email',
    priority: 'medium',
    status: 'new',
    customer: '',
    category: '',
    assignee: '',
    email: '',
    phone: '',
    department: '',
    location: '',
    tags: [] as string[],
    dueDate: '',
    attachments: [] as File[],
    createdAt: new Date().toISOString().slice(0, 16)
  });

  // Ensure client-side rendering to prevent hydration mismatch
  useEffect(() => {
    console.log('Setting isClient to true');
    setIsClient(true);
  }, []);

  // Sample data
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    {
      id: 'SR-001',
      title: 'Email server connectivity issues',
      description: 'Users unable to send emails from Outlook',
      channel: 'email',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'Alice Johnson',
      customer: 'TechCorp Inc.',
      createdAt: '2023-10-27 09:30',
      updatedAt: '2023-10-27 10:15',
      category: 'Infrastructure',
      tags: ['email', 'outlook', 'connectivity']
    },
    {
      id: 'SR-002',
      title: 'Portal login problems',
      description: 'Customer portal login not working',
      channel: 'portal',
      priority: 'medium',
      status: 'new',
      assignedTo: 'Bob Smith',
      customer: 'Global Solutions',
      createdAt: '2023-10-27 10:45',
      updatedAt: '2023-10-27 10:45',
      category: 'Authentication',
      tags: ['portal', 'login', 'authentication']
    },
    {
      id: 'SR-003',
      title: 'Slack integration request',
      description: 'Need Slack integration for team notifications',
      channel: 'slack',
      priority: 'low',
      status: 'new',
      assignedTo: 'Charlie Brown',
      customer: 'StartupXYZ',
      createdAt: '2023-10-27 11:20',
      updatedAt: '2023-10-27 11:20',
      category: 'Integration',
      tags: ['slack', 'integration', 'notifications']
    },
    {
      id: 'SR-004',
      title: 'Phone system down',
      description: 'VoIP phone system not responding',
      channel: 'phone',
      priority: 'urgent',
      status: 'in-progress',
      assignedTo: 'Diana Prince',
      customer: 'Enterprise Corp',
      createdAt: '2023-10-27 08:15',
      updatedAt: '2023-10-27 09:30',
      category: 'Infrastructure',
      tags: ['phone', 'voip', 'system']
    },
    {
      id: 'SR-005',
      title: 'Email delivery delays',
      description: 'Emails taking too long to be delivered',
      channel: 'email',
      priority: 'medium',
      status: 'new',
      assignedTo: 'Eve Wilson',
      customer: 'Marketing Pro',
      createdAt: '2023-10-27 12:00',
      updatedAt: '2023-10-27 12:00',
      category: 'Email Service',
      tags: ['email', 'delivery', 'performance']
    },
    {
      id: 'SR-006',
      title: 'Portal dashboard not loading',
      description: 'Customer dashboard shows blank page',
      channel: 'portal',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'Frank Miller',
      customer: 'DataCorp',
      createdAt: '2023-10-27 11:45',
      updatedAt: '2023-10-27 12:30',
      category: 'Portal Issues',
      tags: ['portal', 'dashboard', 'loading']
    },
    {
      id: 'SR-007',
      title: 'Slack bot configuration',
      description: 'Need help configuring Slack bot for notifications',
      channel: 'slack',
      priority: 'low',
      status: 'resolved',
      assignedTo: 'Grace Lee',
      customer: 'TechStart',
      createdAt: '2023-10-26 16:20',
      updatedAt: '2023-10-27 09:15',
      category: 'Bot Configuration',
      tags: ['slack', 'bot', 'configuration']
    },
    {
      id: 'SR-008',
      title: 'Phone call quality issues',
      description: 'Poor call quality during conference calls',
      channel: 'phone',
      priority: 'medium',
      status: 'new',
      assignedTo: 'Henry Davis',
      customer: 'Business Solutions',
      createdAt: '2023-10-27 13:15',
      updatedAt: '2023-10-27 13:15',
      category: 'Call Quality',
      tags: ['phone', 'quality', 'conference']
    }
  ]);

  const [channelMetrics, setChannelMetrics] = useState<ChannelMetrics>({
    email: 45,
    portal: 32,
    slack: 18,
    phone: 12
  });

  const [aiInsights, setAiInsights] = useState<AIInsights>({
    autoAssignment: {
      accuracy: 87,
      totalAssigned: 156
    },
    escalationPrediction: {
      flaggedTickets: 3,
      riskLevel: 'medium'
    },
    duplicateDetection: {
      duplicatesPrevented: 5,
      savingsHours: 12
    }
  });

  // Filter service requests
  const filteredRequests = serviceRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = filterChannel === 'all' || request.channel === filterChannel;
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || request.priority === filterPriority;
    
    return matchesSearch && matchesChannel && matchesStatus && matchesPriority;
  });

  const refreshData = async () => {
    if (!isClient) return;
    
    try {
      setIsRefreshing(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate data updates
      setChannelMetrics(prev => ({
        email: Math.max(0, prev.email + Math.floor(Math.random() * 6) - 3),
        portal: Math.max(0, prev.portal + Math.floor(Math.random() * 4) - 2),
        slack: Math.max(0, prev.slack + Math.floor(Math.random() * 3) - 1),
        phone: Math.max(0, prev.phone + Math.floor(Math.random() * 2) - 1)
      }));

      setAiInsights(prev => ({
        autoAssignment: {
          accuracy: Math.min(100, Math.max(80, prev.autoAssignment.accuracy + Math.floor(Math.random() * 6) - 3)),
          totalAssigned: prev.autoAssignment.totalAssigned + Math.floor(Math.random() * 3)
        },
        escalationPrediction: {
          flaggedTickets: Math.max(0, prev.escalationPrediction.flaggedTickets + Math.floor(Math.random() * 3) - 1),
          riskLevel: prev.escalationPrediction.riskLevel
        },
        duplicateDetection: {
          duplicatesPrevented: prev.duplicateDetection.duplicatesPrevented + Math.floor(Math.random() * 2),
          savingsHours: prev.duplicateDetection.savingsHours + Math.floor(Math.random() * 3)
        }
      }));
      
      setIsRefreshing(false);
    } catch (err) {
      setError('Failed to refresh data');
      setIsRefreshing(false);
    }
  };

  const handleRequestClick = (request: ServiceRequest) => {
    if (!isClient) return;
    
    try {
      setError(null);
      setSelectedRequest(request);
    } catch (err) {
      setError('Failed to open request details');
    }
  };

  const closeRequestDetails = () => {
    if (!isClient) return;
    setSelectedRequest(null);
  };

  const createNewTicket = () => {
    console.log('Create Ticket clicked, isClient:', isClient);
    
    if (!isClient) {
      console.log('Not client side yet, returning');
      return;
    }
    
    try {
      setError(null);
      console.log('Opening create ticket modal');
      setShowCreateModal(true);
    } catch (err) {
      console.error('Error in createNewTicket:', err);
      setError('Failed to open create ticket form');
    }
  };

  const handleChannelClick = (channel: string) => {
    console.log('Channel clicked:', channel, 'isClient:', isClient);
    
    if (!isClient) {
      console.log('Not client side yet, returning');
      return;
    }
    
    try {
      setError(null);
      console.log('Setting filter channel to:', channel);
      setFilterChannel(channel);
      // Scroll to the service requests list
      const requestsSection = document.getElementById('service-requests-list');
      if (requestsSection) {
        console.log('Scrolling to requests section');
        requestsSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log('Requests section not found');
      }
    } catch (err) {
      console.error('Error in handleChannelClick:', err);
      setError('Failed to filter by channel');
    }
  };

  const clearChannelFilter = () => {
    if (!isClient) return;
    
    try {
      setError(null);
      setFilterChannel('all');
    } catch (err) {
      setError('Failed to clear channel filter');
    }
  };

  const getSearchSuggestions = () => {
    if (!searchTerm.trim()) return [];
    
    const suggestions = new Set<string>();
    
    serviceRequests.forEach(request => {
      if (request.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(request.title);
      }
      if (request.customer.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(request.customer);
      }
      if (request.category.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(request.category);
      }
      if (request.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(request.assignedTo);
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

  const handleAIInsightClick = (insightType: string) => {
    console.log('AI Insight clicked:', insightType, 'isClient:', isClient);
    
    if (!isClient) {
      console.log('Not client side yet, returning');
      return;
    }
    
    try {
      setError(null);
      console.log('Showing AI insight details for:', insightType);
      
      // Create detailed modal for AI insights
      const insightDetails = {
        'auto-assignment': {
          title: 'Auto-Assignment Analytics',
          content: `• 87% accuracy rate (up from 82% last month)
• 156 tickets auto-assigned this week
• Machine learning model trained on 10,000+ tickets
• Reduces assignment time by 75%
• Top performing categories: Infrastructure (92%), Authentication (89%)
• Average response time improvement: 2.3 hours`,
          action: 'View Assignment Analytics'
        },
        'escalation-prediction': {
          title: 'Escalation Prediction Panel',
          content: `• 3 tickets flagged for escalation
• Risk level: Medium (down from High last week)
• Average prediction accuracy: 92%
• Prevents 85% of escalations
• Flagged tickets: SR-001, SR-004, SR-006
• Risk factors: High priority, Multiple channels, Customer history`,
          action: 'View Flagged Tickets'
        },
        'duplicate-detection': {
          title: 'Duplicate Detection Report',
          content: `• 5 duplicates prevented this week
• 12 hours saved (valued at $2,400)
• 95% detection accuracy
• Saves $2,400 monthly on average
• Top duplicate patterns: Email connectivity, Portal login
• Machine learning confidence: 98%`,
          action: 'View Duplicate Analysis'
        }
      };
      
      const details = insightDetails[insightType as keyof typeof insightDetails];
      if (details) {
        const result = confirm(`${details.title}\n\n${details.content}\n\nClick OK to ${details.action.toLowerCase()}`);
        if (result) {
          // Navigate to relevant analytics page or show detailed modal
          alert(`${details.action} functionality would open here.\n\nThis would typically show:\n• Detailed charts and graphs\n• Historical data trends\n• Performance metrics\n• Actionable insights`);
        }
      }
    } catch (err) {
      console.error('Error in handleAIInsightClick:', err);
      setError('Failed to open AI insight details');
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!newTicket.title.trim()) {
      errors.title = 'Subject is required';
    }
    
    if (!newTicket.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!newTicket.customer.trim()) {
      errors.customer = 'Customer is required';
    }
    
    if (!newTicket.assignee.trim()) {
      errors.assignee = 'Assignee is required';
    }
    
    if (!newTicket.priority) {
      errors.priority = 'Priority is required';
    }
    
    if (!newTicket.status) {
      errors.status = 'Status is required';
    }
    
    if (!newTicket.channel) {
      errors.channel = 'Channel is required';
    }
    
    if (newTicket.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newTicket.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (newTicket.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(newTicket.phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (newTicket.dueDate && new Date(newTicket.dueDate) < new Date()) {
      errors.dueDate = 'Due date cannot be in the past';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormChange = (field: string, value: any) => {
    setNewTicket(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !newTicket.tags.includes(tag.trim())) {
      setNewTicket(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewTicket(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setNewTicket(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index: number) => {
    setNewTicket(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleCreateTicket = async () => {
    if (!isClient) return;
    
    try {
      setError(null);
      
      // Validate form
      if (!validateForm()) {
        return;
      }
      
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create new ticket
      const ticketId = `SR-${String(serviceRequests.length + 1).padStart(3, '0')}`;
      const newServiceRequest: ServiceRequest = {
        id: ticketId,
        title: newTicket.title,
        description: newTicket.description,
        channel: newTicket.channel as 'email' | 'portal' | 'slack' | 'phone',
        priority: newTicket.priority as 'low' | 'medium' | 'high' | 'urgent',
        status: newTicket.status as 'new' | 'in-progress' | 'resolved' | 'closed',
        assignedTo: newTicket.assignee,
        customer: newTicket.customer,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
        category: newTicket.category || 'General',
        tags: newTicket.tags.length > 0 ? newTicket.tags : [newTicket.channel, newTicket.priority]
      };
      
      // Add to service requests
      setServiceRequests(prev => [newServiceRequest, ...prev]);
      
      // Update channel metrics
      setChannelMetrics(prev => ({
        ...prev,
        [newTicket.channel]: prev[newTicket.channel] + 1
      }));
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        closeCreateModal();
        setSubmitSuccess(false);
      }, 2000);
      
    } catch (err) {
      setError('Failed to create ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeCreateModal = () => {
    if (!isClient) return;
    setShowCreateModal(false);
    setSubmitSuccess(false);
    setFormErrors({});
    setNewTicket({
      title: '',
      description: '',
      channel: 'email',
      priority: 'medium',
      status: 'new',
      customer: '',
      category: '',
      assignee: '',
      email: '',
      phone: '',
      department: '',
      location: '',
      tags: [],
      dueDate: '',
      attachments: [],
      createdAt: new Date().toISOString().slice(0, 16)
    });
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail size={20} className="text-blue-500" />;
      case 'portal': return <MessageSquare size={20} className="text-green-500" />;
      case 'slack': return <Slack size={20} className="text-purple-500" />;
      case 'phone': return <Phone size={20} className="text-orange-500" />;
      default: return <MessageSquare size={20} className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRequests = serviceRequests.length;
  const newRequests = serviceRequests.filter(r => r.status === 'new').length;
  const inProgressRequests = serviceRequests.filter(r => r.status === 'in-progress').length;
  const resolvedRequests = serviceRequests.filter(r => r.status === 'resolved').length;

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <MessageSquare className="text-white animate-pulse" size={24} />
          </div>
          <p className="text-gray-600 font-medium">Loading Service Requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-6 mt-4">
          <div className="flex items-center">
            <AlertTriangle className="mr-2" size={20} />
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <XCircle size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                <span className="font-medium">Back to Home</span>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Service Request Management</h1>
                <p className="text-gray-600">Multichannel intake, AI-powered triage, and intelligent routing</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  if (!isClient) return;
                  
                  try {
                    // Generate CSV data
                    const csvHeaders = ['ID', 'Title', 'Description', 'Channel', 'Priority', 'Status', 'Customer', 'Assigned To', 'Created At', 'Category'];
                    const csvData = filteredRequests.map(request => [
                      request.id,
                      request.title,
                      request.description,
                      request.channel,
                      request.priority,
                      request.status,
                      request.customer,
                      request.assignedTo,
                      request.createdAt,
                      request.category
                    ]);
                    
                    const csvContent = [csvHeaders, ...csvData]
                      .map(row => row.map(field => `"${field}"`).join(','))
                      .join('\n');
                    
                    // Create and download file
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `service-requests-${new Date().toISOString().split('T')[0]}.csv`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    
                    alert(`Exported ${filteredRequests.length} service requests to CSV file`);
                  } catch (err) {
                    setError('Failed to export data');
                  }
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Download size={16} />
                <span className="text-sm font-medium">Export</span>
              </button>
              <button
                onClick={refreshData}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all duration-300 ${isRefreshing ? 'animate-pulse' : ''}`}
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                <span className="text-sm font-medium">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
              <button
                onClick={createNewTicket}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Plus size={16} />
                <span className="text-sm font-medium">Create Ticket</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Service Request Management Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Request Management</h2>
          
          {/* Channel Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div 
              onClick={() => handleChannelClick('email')}
              className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                filterChannel === 'email' 
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail size={24} className="text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-2xl font-bold text-gray-900">{channelMetrics.email}</p>
                    {filterChannel === 'email' && (
                      <p className="text-xs text-blue-600 font-medium">Active Filter</p>
                    )}
                  </div>
                </div>
                <div className="text-blue-500">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => handleChannelClick('portal')}
              className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                filterChannel === 'portal' 
                  ? 'border-green-500 bg-green-50 ring-2 ring-green-200' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare size={24} className="text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Portal</p>
                    <p className="text-2xl font-bold text-gray-900">{channelMetrics.portal}</p>
                    {filterChannel === 'portal' && (
                      <p className="text-xs text-green-600 font-medium">Active Filter</p>
                    )}
                  </div>
                </div>
                <div className="text-green-500">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => handleChannelClick('slack')}
              className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                filterChannel === 'slack' 
                  ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Slack size={24} className="text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Slack</p>
                    <p className="text-2xl font-bold text-gray-900">{channelMetrics.slack}</p>
                    {filterChannel === 'slack' && (
                      <p className="text-xs text-purple-600 font-medium">Active Filter</p>
                    )}
                  </div>
                </div>
                <div className="text-purple-500">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => handleChannelClick('phone')}
              className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                filterChannel === 'phone' 
                  ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' 
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Phone size={24} className="text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="text-2xl font-bold text-gray-900">{channelMetrics.phone}</p>
                    {filterChannel === 'phone' && (
                      <p className="text-xs text-orange-600 font-medium">Active Filter</p>
                    )}
                  </div>
                </div>
                <div className="text-orange-500">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Channel Filter Status */}
          {filterChannel !== 'all' && (
            <div className="mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getChannelIcon(filterChannel)}
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Showing requests from {filterChannel.charAt(0).toUpperCase() + filterChannel.slice(1)} channel
                    </p>
                    <p className="text-xs text-blue-700">
                      {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''} found
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearChannelFilter}
                  className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <XCircle size={14} />
                  <span>Clear Filter</span>
                </button>
              </div>
            </div>
          )}

          {/* Request Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-3xl font-bold text-gray-900">{totalRequests}</p>
                </div>
                <BarChart3 size={32} className="text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Requests</p>
                  <p className="text-3xl font-bold text-gray-900">{newRequests}</p>
                </div>
                <Clock size={32} className="text-yellow-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-3xl font-bold text-gray-900">{inProgressRequests}</p>
                </div>
                <Activity size={32} className="text-orange-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold text-gray-900">{resolvedRequests}</p>
                </div>
                <CheckCircle size={32} className="text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights & Automation Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center mb-6">
              <Brain size={24} className="text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">AI Insights & Automation</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                onClick={() => handleAIInsightClick('auto-assignment')}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-yellow-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Zap size={24} className="text-yellow-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Auto-Assignment</h3>
                  </div>
                  <ArrowRight size={16} className="text-yellow-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{aiInsights.autoAssignment.accuracy}% accuracy rate</p>
                <p className="text-sm text-gray-600 mt-2">{aiInsights.autoAssignment.totalAssigned} tickets auto-assigned</p>
                <p className="text-xs text-yellow-600 font-medium mt-2">Click for details</p>
              </div>
              
              <div 
                onClick={() => handleAIInsightClick('escalation-prediction')}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-red-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle size={24} className="text-red-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Escalation Prediction</h3>
                  </div>
                  <ArrowRight size={16} className="text-red-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{aiInsights.escalationPrediction.flaggedTickets} tickets flagged for escalation</p>
                <p className="text-sm text-gray-600 mt-2">Risk level: {aiInsights.escalationPrediction.riskLevel}</p>
                <p className="text-xs text-red-600 font-medium mt-2">Click for details</p>
              </div>
              
              <div 
                onClick={() => handleAIInsightClick('duplicate-detection')}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-green-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-green-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Duplicate Detection</h3>
                  </div>
                  <ArrowRight size={16} className="text-green-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{aiInsights.duplicateDetection.duplicatesPrevented} duplicates prevented</p>
                <p className="text-sm text-gray-600 mt-2">{aiInsights.duplicateDetection.savingsHours} hours saved</p>
                <p className="text-xs text-green-600 font-medium mt-2">Click for details</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-1/3">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={handleSearchInputChange}
                onFocus={() => searchTerm && setShowSearchSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
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
            <div className="relative w-full md:w-1/4">
              <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                value={filterChannel}
                onChange={(e) => setFilterChannel(e.target.value)}
              >
                <option value="all">All Channels</option>
                <option value="email">Email</option>
                <option value="portal">Portal</option>
                <option value="slack">Slack</option>
                <option value="phone">Phone</option>
              </select>
            </div>
            <div className="relative w-full md:w-1/4">
              <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="relative w-full md:w-1/4">
              <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Service Requests List */}
        <div id="service-requests-list" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Service Requests</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => handleRequestClick(request)}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getChannelIcon(request.channel)}
                      <h4 className="text-lg font-semibold text-gray-900">{request.title}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{request.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Customer: {request.customer}</span>
                      <span>Assigned to: {request.assignedTo}</span>
                      <span>Created: {request.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestClick(request);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isClient) {
                          alert(`Edit Request: ${request.id}\n\nThis would open an edit form with:\n• Title: ${request.title}\n• Description: ${request.description}\n• Priority: ${request.priority}\n• Status: ${request.status}\n• Assigned to: ${request.assignedTo}\n\nEdit functionality would be implemented here.`);
                        }
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit Request"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredRequests.length === 0 && (
            <div className="p-6 text-center text-gray-500">No service requests found matching your criteria.</div>
          )}
        </div>
      </div>

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
          <div className="relative p-8 bg-white w-full max-w-2xl mx-auto rounded-xl shadow-lg">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Request Details: {selectedRequest.id}</h3>
              <button onClick={closeRequestDetails} className="text-gray-400 hover:text-gray-600">
                <XCircle size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {getChannelIcon(selectedRequest.channel)}
                <h4 className="text-xl font-semibold text-gray-900">{selectedRequest.title}</h4>
              </div>
              <p className="text-gray-700">{selectedRequest.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Priority</p>
                  <span className={`px-2 py-1 text-sm font-semibold rounded-full ${getPriorityColor(selectedRequest.priority)}`}>
                    {selectedRequest.priority}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span className={`px-2 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer</p>
                  <p className="text-gray-900">{selectedRequest.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Assigned To</p>
                  <p className="text-gray-900">{selectedRequest.assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p className="text-gray-900">{selectedRequest.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Updated</p>
                  <p className="text-gray-900">{selectedRequest.updatedAt}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={closeRequestDetails}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (isClient) {
                    alert(`Update Request: ${selectedRequest.id}\n\nThis would open an edit form with:\n• Title: ${selectedRequest.title}\n• Description: ${selectedRequest.description}\n• Priority: ${selectedRequest.priority}\n• Status: ${selectedRequest.status}\n• Assigned to: ${selectedRequest.assignedTo}\n• Customer: ${selectedRequest.customer}\n• Category: ${selectedRequest.category}\n\nUpdate functionality would allow:\n• Changing status and priority\n• Reassigning to different team member\n• Adding comments and updates\n• Adding/removing tags\n• Updating resolution details`);
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Create Ticket Modal */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeCreateModal();
            }
          }}
        >
          <div className="relative bg-white w-full max-w-4xl mx-auto rounded-xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Plus size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Create New Ticket</h2>
                    <p className="text-sm text-gray-500">Fill in the details below to create a new service request</p>
                  </div>
                </div>
                <button
                  onClick={closeCreateModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <XCircle size={20} className="text-gray-400" />
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* Success Message */}
              {submitSuccess && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle size={20} className="text-green-600 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-green-800">Ticket Created Successfully!</h3>
                      <p className="text-sm text-green-700">Your service request has been submitted and will be processed shortly.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Core Ticket Fields */}
                <div className="space-y-6">
                  {/* Core Ticket Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Ticket Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={newTicket.title}
                          onChange={(e) => handleFormChange('title', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            formErrors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Enter ticket subject"
                        />
                        {formErrors.title && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={newTicket.priority}
                          onChange={(e) => handleFormChange('priority', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            formErrors.priority ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                        {formErrors.priority && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.priority}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={newTicket.status || 'new'}
                          onChange={(e) => handleFormChange('status', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            formErrors.status ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                        {formErrors.status && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.status}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Channel <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={newTicket.channel}
                          onChange={(e) => handleFormChange('channel', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            formErrors.channel ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                        >
                          <option value="email">Email</option>
                          <option value="portal">Portal</option>
                          <option value="slack">Slack</option>
                          <option value="phone">Phone</option>
                        </select>
                        {formErrors.channel && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.channel}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Assignee <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={newTicket.assignee}
                          onChange={(e) => handleFormChange('assignee', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            formErrors.assignee ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select assignee</option>
                          <option value="John Doe">John Doe</option>
                          <option value="Jane Smith">Jane Smith</option>
                          <option value="Mike Johnson">Mike Johnson</option>
                          <option value="Sarah Wilson">Sarah Wilson</option>
                          <option value="Alice Johnson">Alice Johnson</option>
                          <option value="Bob Smith">Bob Smith</option>
                          <option value="Charlie Brown">Charlie Brown</option>
                          <option value="Diana Prince">Diana Prince</option>
                          <option value="Eve Wilson">Eve Wilson</option>
                          <option value="Frank Miller">Frank Miller</option>
                        </select>
                        {formErrors.assignee && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.assignee}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Created Date
                        </label>
                        <input
                          type="datetime-local"
                          value={newTicket.createdAt || new Date().toISOString().slice(0, 16)}
                          onChange={(e) => handleFormChange('createdAt', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          readOnly
                        />
                        <p className="mt-1 text-xs text-gray-500">Auto-generated when ticket is created</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="notifyCustomer"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="notifyCustomer" className="text-sm text-gray-700">
                          Notify customer via email
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="createFollowUp"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="createFollowUp" className="text-sm text-gray-700">
                          Create follow-up reminder
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="escalateToManager"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="escalateToManager" className="text-sm text-gray-700">
                          Escalate to manager if urgent
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Additional Information */}
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Detailed Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={newTicket.description}
                        onChange={(e) => handleFormChange('description', e.target.value)}
                        rows={6}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                          formErrors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Describe the issue or request in detail"
                      />
                      {formErrors.description && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Customer Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={newTicket.customer}
                          onChange={(e) => handleFormChange('customer', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            formErrors.customer ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Enter customer name"
                        />
                        {formErrors.customer && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.customer}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={newTicket.email}
                          onChange={(e) => handleFormChange('email', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="customer@example.com"
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={newTicket.phone}
                          onChange={(e) => handleFormChange('phone', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            formErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="+1 (555) 123-4567"
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Category and Additional Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <input
                          type="text"
                          value={newTicket.category}
                          onChange={(e) => handleFormChange('category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="e.g., IT Support, HR, Procurement"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department
                        </label>
                        <input
                          type="text"
                          value={newTicket.department}
                          onChange={(e) => handleFormChange('department', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="e.g., Engineering, Sales, Support"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Due Date
                        </label>
                        <input
                          type="date"
                          value={newTicket.dueDate}
                          onChange={(e) => handleFormChange('dueDate', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            formErrors.dueDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        {formErrors.dueDate && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.dueDate}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="text-red-500">*</span> Required fields
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={closeCreateModal}
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateTicket}
                    disabled={isSubmitting || !validateForm()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        <span>Create Ticket</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}