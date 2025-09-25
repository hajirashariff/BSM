import React, { useState } from 'react';
import {
  Plug,
  Plus,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  Search,
  Filter,
  Globe,
  Shield,
  Database,
  Mail,
  MessageSquare,
  Calendar,
  DollarSign,
  Cloud,
  Code,
  Terminal,
  Bot,
  Brain,
  Zap,
  Users,
  FileText,
  GitBranch,
  Timer,
  Activity,
  BarChart3,
  TrendingUp,
  Target,
  Layers,
  GitCommit,
  History,
  Share2,
  Lock,
  Archive,
  Tag,
  Folder,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Grid3X3,
  List,
  Kanban,
  AlertCircle,
  CheckCircle2,
  Clock3,
  EyeOff,
  Unlock,
  Bookmark,
  Star,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Clock,
  CheckCircle as CheckCircleIcon,
  AlertTriangle as AlertTriangleIcon
} from 'lucide-react';

// Mock integrations data
const integrationsData = [
  {
    id: 'INT-001',
    name: 'Slack',
    type: 'Communication',
    status: 'Connected',
    description: 'Send notifications and messages to Slack channels',
    icon: MessageSquare,
    color: 'purple',
    lastSync: '2024-01-15 14:30:00',
    version: '2.1.0',
    apiVersion: 'v1.0',
    endpoints: 12,
    rateLimit: '1000/hour',
    cost: 'Free',
    category: 'Communication',
    tags: ['Notifications', 'Team Chat', 'Real-time'],
    permissions: ['read:channels', 'write:messages', 'read:users'],
    health: 'Excellent',
    usage: {
      requests: 1250,
      successRate: 99.2,
      avgResponseTime: '120ms'
    },
    config: {
      webhookUrl: 'https://hooks.slack.com/services/...',
      botToken: 'xoxb-***',
      defaultChannel: '#general'
    }
  },
  {
    id: 'INT-002',
    name: 'GitHub',
    type: 'Development',
    status: 'Connected',
    description: 'Trigger workflows on repository events and manage issues',
    icon: GitBranch,
    color: 'gray',
    lastSync: '2024-01-15 13:45:00',
    version: '1.8.2',
    apiVersion: 'v4',
    endpoints: 8,
    rateLimit: '5000/hour',
    cost: 'Free',
    category: 'Development',
    tags: ['Version Control', 'CI/CD', 'Issues'],
    permissions: ['repo:read', 'issues:write', 'pull:read'],
    health: 'Good',
    usage: {
      requests: 890,
      successRate: 98.5,
      avgResponseTime: '250ms'
    },
    config: {
      accessToken: 'ghp_***',
      repository: 'company/project',
      webhookSecret: '***'
    }
  },
  {
    id: 'INT-003',
    name: 'AWS S3',
    type: 'Cloud Storage',
    status: 'Connected',
    description: 'Store and retrieve files from Amazon S3 buckets',
    icon: Cloud,
    color: 'orange',
    lastSync: '2024-01-15 12:20:00',
    version: '3.2.1',
    apiVersion: 'v1',
    endpoints: 6,
    rateLimit: 'Unlimited',
    cost: '$0.023/GB',
    category: 'Cloud Storage',
    tags: ['File Storage', 'Backup', 'CDN'],
    permissions: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject'],
    health: 'Excellent',
    usage: {
      requests: 2100,
      successRate: 99.8,
      avgResponseTime: '180ms'
    },
    config: {
      accessKeyId: 'AKIA***',
      secretAccessKey: '***',
      region: 'us-east-1',
      bucket: 'company-workflows'
    }
  },
  {
    id: 'INT-004',
    name: 'Stripe',
    type: 'Payment',
    status: 'Connected',
    description: 'Process payments and manage subscriptions',
    icon: DollarSign,
    color: 'blue',
    lastSync: '2024-01-15 11:15:00',
    version: '2.5.0',
    apiVersion: 'v1',
    endpoints: 15,
    rateLimit: '100/hour',
    cost: '2.9% + $0.30',
    category: 'Payment',
    tags: ['Payments', 'Subscriptions', 'Billing'],
    permissions: ['charges:read', 'charges:write', 'customers:read'],
    health: 'Good',
    usage: {
      requests: 45,
      successRate: 100,
      avgResponseTime: '320ms'
    },
    config: {
      publishableKey: 'pk_test_***',
      secretKey: 'sk_test_***',
      webhookSecret: 'whsec_***'
    }
  },
  {
    id: 'INT-005',
    name: 'OpenAI',
    type: 'AI/ML',
    status: 'Connected',
    description: 'Generate text, analyze sentiment, and create embeddings',
    icon: Brain,
    color: 'green',
    lastSync: '2024-01-15 10:30:00',
    version: '1.3.0',
    apiVersion: 'v1',
    endpoints: 5,
    rateLimit: '60/minute',
    cost: '$0.002/1K tokens',
    category: 'AI/ML',
    tags: ['GPT', 'Sentiment Analysis', 'Embeddings'],
    permissions: ['completions:create', 'embeddings:create'],
    health: 'Excellent',
    usage: {
      requests: 320,
      successRate: 98.8,
      avgResponseTime: '1.2s'
    },
    config: {
      apiKey: 'sk-***',
      model: 'gpt-3.5-turbo',
      maxTokens: 1000
    }
  },
  {
    id: 'INT-006',
    name: 'PostgreSQL',
    type: 'Database',
    status: 'Error',
    description: 'Connect to PostgreSQL database for data operations',
    icon: Database,
    color: 'blue',
    lastSync: '2024-01-15 09:45:00',
    version: '2.0.1',
    apiVersion: 'v1',
    endpoints: 4,
    rateLimit: 'Unlimited',
    cost: 'Free',
    category: 'Database',
    tags: ['SQL', 'Data Storage', 'Analytics'],
    permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
    health: 'Critical',
    usage: {
      requests: 0,
      successRate: 0,
      avgResponseTime: 'N/A'
    },
    config: {
      host: 'localhost',
      port: 5432,
      database: 'workflows',
      username: 'admin',
      password: '***'
    }
  }
];

const statusColors: { [key: string]: string } = {
  'Connected': 'bg-green-100 text-green-800',
  'Error': 'bg-red-100 text-red-800',
  'Disconnected': 'bg-gray-100 text-gray-800',
  'Pending': 'bg-yellow-100 text-yellow-800'
};

const healthColors: { [key: string]: string } = {
  'Excellent': 'bg-green-100 text-green-800',
  'Good': 'bg-blue-100 text-blue-800',
  'Warning': 'bg-yellow-100 text-yellow-800',
  'Critical': 'bg-red-100 text-red-800'
};

const categoryIcons: { [key: string]: any } = {
  'Communication': MessageSquare,
  'Development': GitBranch,
  'Cloud Storage': Cloud,
  'Payment': DollarSign,
  'AI/ML': Brain,
  'Database': Database,
  'Email': Mail,
  'Calendar': Calendar,
  'Analytics': BarChart3
};

export default function Integrations() {
  const [selectedIntegration, setSelectedIntegration] = useState(integrationsData[0]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showConfig, setShowConfig] = useState(false);

  const filteredIntegrations = integrationsData.filter(integration => {
    const matchesStatus = filterStatus === 'All' || integration.status === filterStatus;
    const matchesCategory = filterCategory === 'All' || integration.category === filterCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const totalIntegrations = integrationsData.length;
  const connectedIntegrations = integrationsData.filter(i => i.status === 'Connected').length;
  const errorIntegrations = integrationsData.filter(i => i.status === 'Error').length;
  const totalRequests = integrationsData.reduce((sum, i) => sum + i.usage.requests, 0);
  const avgSuccessRate = Math.round(integrationsData.reduce((sum, i) => sum + i.usage.successRate, 0) / integrationsData.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations & Connectors</h1>
          <p className="text-gray-600">Connect your workflows with 200+ enterprise services and APIs</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Upload size={20} />
            <span>Import Config</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Download size={20} />
            <span>Export Config</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Add Integration</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Integrations</p>
              <p className="text-2xl font-bold text-gray-900">{totalIntegrations}</p>
              <p className="text-sm text-blue-600">Available</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <Plug className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Connected</p>
              <p className="text-2xl font-bold text-gray-900">{connectedIntegrations}</p>
              <p className="text-sm text-green-600">{Math.round((connectedIntegrations/totalIntegrations)*100)}%</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Errors</p>
              <p className="text-2xl font-bold text-gray-900">{errorIntegrations}</p>
              <p className="text-sm text-red-600">Need attention</p>
            </div>
            <div className="p-3 rounded-lg bg-red-50">
              <XCircle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{totalRequests.toLocaleString()}</p>
              <p className="text-sm text-purple-600">This month</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <Activity className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{avgSuccessRate}%</p>
              <p className="text-sm text-green-600">Average</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <Target className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Available</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
              <Layers className="text-gray-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Integration Categories */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Layers className="text-blue-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Integration Categories</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <MessageSquare className="text-purple-600" size={16} />
              <span className="font-medium">Communication</span>
            </div>
            <p className="text-sm text-gray-600">Slack, Teams, Discord, Email</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <GitBranch className="text-gray-600" size={16} />
              <span className="font-medium">Development</span>
            </div>
            <p className="text-sm text-gray-600">GitHub, GitLab, Bitbucket, Jira</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Cloud className="text-orange-600" size={16} />
              <span className="font-medium">Cloud Services</span>
            </div>
            <p className="text-sm text-gray-600">AWS, GCP, Azure, DigitalOcean</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="text-green-600" size={16} />
              <span className="font-medium">AI/ML Services</span>
            </div>
            <p className="text-sm text-gray-600">OpenAI, HuggingFace, Custom Models</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search integrations..."
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
              <option value="Connected">Connected</option>
              <option value="Error">Error</option>
              <option value="Disconnected">Disconnected</option>
              <option value="Pending">Pending</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Categories</option>
              <option value="Communication">Communication</option>
              <option value="Development">Development</option>
              <option value="Cloud Storage">Cloud Storage</option>
              <option value="Payment">Payment</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Database">Database</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List size={16} />
              </button>
            </div>
            <button className="btn-secondary flex items-center space-x-2">
              <Filter size={16} />
              <span>Advanced</span>
            </button>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <div key={integration.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-3 bg-${integration.color}-50 rounded-lg`}>
                        <Icon className={`text-${integration.color}-600`} size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                        <p className="text-sm text-gray-600">{integration.type}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[integration.status]}`}>
                        {integration.status}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${healthColors[integration.health]}`}>
                        {integration.health}
                      </span>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Success Rate</p>
                        <p className="font-semibold text-gray-900">{integration.usage.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Requests</p>
                        <p className="font-semibold text-gray-900">{integration.usage.requests.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Response Time</p>
                        <p className="font-semibold text-gray-900">{integration.usage.avgResponseTime}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Cost</p>
                        <p className="font-semibold text-gray-900">{integration.cost}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {integration.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Eye size={16} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Settings size={16} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <RefreshCw size={16} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>Last sync: {integration.lastSync}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe size={12} />
                      <span>v{integration.version}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="btn-secondary text-sm">Configure</button>
                    <button className="btn-primary text-sm">Test</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Integration Details */}
      {selectedIntegration && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 bg-${selectedIntegration.color}-50 rounded-lg`}>
                <selectedIntegration.icon className={`text-${selectedIntegration.color}-600`} size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedIntegration.name}</h2>
                <p className="text-gray-600">{selectedIntegration.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 text-sm rounded-full ${statusColors[selectedIntegration.status]}`}>
                {selectedIntegration.status}
              </span>
              <button className="btn-secondary">Configure</button>
              <button className="btn-primary">Test Connection</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{selectedIntegration.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span className="font-medium">{selectedIntegration.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">API Version:</span>
                  <span className="font-medium">{selectedIntegration.apiVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Endpoints:</span>
                  <span className="font-medium">{selectedIntegration.endpoints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rate Limit:</span>
                  <span className="font-medium">{selectedIntegration.rateLimit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost:</span>
                  <span className="font-medium">{selectedIntegration.cost}</span>
                </div>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Usage Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Requests:</span>
                  <span className="font-medium">{selectedIntegration.usage.requests.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-medium">{selectedIntegration.usage.successRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Response Time:</span>
                  <span className="font-medium">{selectedIntegration.usage.avgResponseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Sync:</span>
                  <span className="font-medium">{selectedIntegration.lastSync}</span>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Permissions</h3>
              <div className="space-y-2">
                {selectedIntegration.permissions.map((permission, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-600" size={16} />
                    <span className="text-sm text-gray-700">{permission}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Configuration */}
          {showConfig && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-700">
                  {JSON.stringify(selectedIntegration.config, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



