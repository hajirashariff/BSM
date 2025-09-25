import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plug, 
  ChevronDown, 
  ChevronRight,
  Star,
  Zap,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  RefreshCw,
  Users,
  Shield,
  Cloud,
  Database,
  Bot,
  BarChart3,
  DollarSign,
  MessageSquare,
  Monitor,
  Lock,
  GitBranch,
  Workflow,
  Target,
  Activity,
  Server,
  CreditCard,
  Video
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'connected' | 'not-connected' | 'error';
  health: 'healthy' | 'warning' | 'error';
  logo: React.ComponentType<any>;
  tags: string[];
  isRecommended?: boolean;
  isComingSoon?: boolean;
}

const integrationsData: Integration[] = [
  // CRM & Customer Platforms
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Connect with Salesforce CRM for customer data synchronization and lead management',
    category: 'CRM & Customer Platforms',
    status: 'connected',
    health: 'healthy',
    logo: Users,
    tags: ['CRM', 'Sales', 'Customer Data'],
    isRecommended: true
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Integrate with HubSpot for marketing automation and customer relationship management',
    category: 'CRM & Customer Platforms',
    status: 'not-connected',
    health: 'healthy',
    logo: Target,
    tags: ['CRM', 'Marketing', 'Automation']
  },
  {
    id: 'zoho-crm',
    name: 'Zoho CRM',
    description: 'Sync customer data and manage sales pipeline with Zoho CRM integration',
    category: 'CRM & Customer Platforms',
    status: 'not-connected',
    health: 'healthy',
    logo: Users,
    tags: ['CRM', 'Sales', 'Pipeline']
  },
  {
    id: 'dynamics',
    name: 'Microsoft Dynamics',
    description: 'Connect with Microsoft Dynamics 365 for enterprise customer relationship management',
    category: 'CRM & Customer Platforms',
    status: 'connected',
    health: 'warning',
    logo: Database,
    tags: ['CRM', 'Enterprise', 'Microsoft']
  },

  // Communication & Collaboration
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send notifications and updates directly to Slack channels and users',
    category: 'Communication & Collaboration',
    status: 'connected',
    health: 'healthy',
    logo: MessageSquare,
    tags: ['Communication', 'Notifications', 'Team'],
    isRecommended: true
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Integrate with Microsoft Teams for seamless communication and collaboration',
    category: 'Communication & Collaboration',
    status: 'not-connected',
    health: 'healthy',
    logo: Users,
    tags: ['Communication', 'Microsoft', 'Collaboration']
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Schedule and manage Zoom meetings directly from your BSM platform',
    category: 'Communication & Collaboration',
    status: 'not-connected',
    health: 'healthy',
    logo: Video,
    tags: ['Video', 'Meetings', 'Scheduling']
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    description: 'Create and join Google Meet sessions for team collaboration',
    category: 'Communication & Collaboration',
    status: 'not-connected',
    health: 'healthy',
    logo: Video,
    tags: ['Video', 'Google', 'Meetings']
  },

  // Monitoring & Incident Management
  {
    id: 'jira',
    name: 'Jira',
    description: 'Sync tickets and issues with Atlassian Jira for project management',
    category: 'Monitoring & Incident Management',
    status: 'connected',
    health: 'healthy',
    logo: Monitor,
    tags: ['Project Management', 'Tickets', 'Atlassian'],
    isRecommended: true
  },
  {
    id: 'servicenow',
    name: 'ServiceNow',
    description: 'Connect with ServiceNow for IT service management and incident tracking',
    category: 'Monitoring & Incident Management',
    status: 'not-connected',
    health: 'healthy',
    logo: Settings,
    tags: ['ITSM', 'Incidents', 'Service Management']
  },
  {
    id: 'pagerduty',
    name: 'PagerDuty',
    description: 'Send critical alerts and incidents to PagerDuty for on-call management',
    category: 'Monitoring & Incident Management',
    status: 'not-connected',
    health: 'healthy',
    logo: AlertTriangle,
    tags: ['Alerts', 'On-call', 'Incidents']
  },
  {
    id: 'datadog',
    name: 'Datadog',
    description: 'Monitor application performance and infrastructure with Datadog integration',
    category: 'Monitoring & Incident Management',
    status: 'connected',
    health: 'warning',
    logo: BarChart3,
    tags: ['Monitoring', 'APM', 'Infrastructure']
  },
  {
    id: 'newrelic',
    name: 'New Relic',
    description: 'Track application performance and errors with New Relic monitoring',
    category: 'Monitoring & Incident Management',
    status: 'not-connected',
    health: 'healthy',
    logo: Activity,
    tags: ['APM', 'Monitoring', 'Performance']
  },
  {
    id: 'opsgenie',
    name: 'OpsGenie',
    description: 'Manage on-call schedules and incident escalation with OpsGenie',
    category: 'Monitoring & Incident Management',
    status: 'not-connected',
    health: 'healthy',
    logo: Shield,
    tags: ['On-call', 'Escalation', 'Incidents']
  },

  // Cloud & Infrastructure
  {
    id: 'aws',
    name: 'Amazon Web Services',
    description: 'Connect with AWS services for cloud infrastructure management and monitoring',
    category: 'Cloud & Infrastructure',
    status: 'connected',
    health: 'healthy',
    logo: Cloud,
    tags: ['Cloud', 'AWS', 'Infrastructure'],
    isRecommended: true
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    description: 'Integrate with Microsoft Azure for cloud services and resource management',
    category: 'Cloud & Infrastructure',
    status: 'not-connected',
    health: 'healthy',
    logo: Cloud,
    tags: ['Cloud', 'Microsoft', 'Azure']
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    description: 'Connect with Google Cloud Platform for cloud computing and data analytics',
    category: 'Cloud & Infrastructure',
    status: 'not-connected',
    health: 'healthy',
    logo: Cloud,
    tags: ['Cloud', 'Google', 'Analytics']
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    description: 'Manage containerized applications and orchestration with Kubernetes',
    category: 'Cloud & Infrastructure',
    status: 'not-connected',
    health: 'healthy',
    logo: Server,
    tags: ['Containers', 'Orchestration', 'DevOps']
  },

  // DevOps & CI/CD
  {
    id: 'github',
    name: 'GitHub',
    description: 'Connect with GitHub for source code management and CI/CD workflows',
    category: 'DevOps & CI/CD',
    status: 'connected',
    health: 'healthy',
    logo: GitBranch,
    tags: ['Git', 'CI/CD', 'Source Control'],
    isRecommended: true
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'Integrate with GitLab for DevOps lifecycle management and collaboration',
    category: 'DevOps & CI/CD',
    status: 'not-connected',
    health: 'healthy',
    logo: GitBranch,
    tags: ['Git', 'DevOps', 'CI/CD']
  },
  {
    id: 'bitbucket',
    name: 'Bitbucket',
    description: 'Connect with Bitbucket for Git repository management and code collaboration',
    category: 'DevOps & CI/CD',
    status: 'not-connected',
    health: 'healthy',
    logo: GitBranch,
    tags: ['Git', 'Atlassian', 'Repository']
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    description: 'Integrate with Jenkins for continuous integration and deployment automation',
    category: 'DevOps & CI/CD',
    status: 'not-connected',
    health: 'healthy',
    logo: Workflow,
    tags: ['CI/CD', 'Automation', 'Build']
  },

  // Security & Compliance
  {
    id: 'okta',
    name: 'Okta',
    description: 'Connect with Okta for identity and access management',
    category: 'Security & Compliance',
    status: 'connected',
    health: 'healthy',
    logo: Shield,
    tags: ['SSO', 'Identity', 'Security']
  },
  {
    id: 'auth0',
    name: 'Auth0',
    description: 'Integrate with Auth0 for authentication and authorization services',
    category: 'Security & Compliance',
    status: 'not-connected',
    health: 'healthy',
    logo: Lock,
    tags: ['Authentication', 'Security', 'Identity']
  },
  {
    id: 'crowdstrike',
    name: 'CrowdStrike',
    description: 'Connect with CrowdStrike for endpoint security and threat detection',
    category: 'Security & Compliance',
    status: 'not-connected',
    health: 'healthy',
    logo: Shield,
    tags: ['Security', 'Endpoint', 'Threat Detection']
  },
  {
    id: 'splunk',
    name: 'Splunk',
    description: 'Integrate with Splunk for security information and event management',
    category: 'Security & Compliance',
    status: 'not-connected',
    health: 'healthy',
    logo: BarChart3,
    tags: ['SIEM', 'Security', 'Logging']
  },

  // Finance & Billing
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Connect with QuickBooks for accounting and financial data synchronization',
    category: 'Finance & Billing',
    status: 'not-connected',
    health: 'healthy',
    logo: DollarSign,
    tags: ['Accounting', 'Finance', 'Billing']
  },
  {
    id: 'freshbooks',
    name: 'FreshBooks',
    description: 'Integrate with FreshBooks for invoicing and expense management',
    category: 'Finance & Billing',
    status: 'not-connected',
    health: 'healthy',
    logo: DollarSign,
    tags: ['Invoicing', 'Expenses', 'Accounting']
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Connect with Stripe for payment processing and subscription management',
    category: 'Finance & Billing',
    status: 'connected',
    health: 'healthy',
    logo: CreditCard,
    tags: ['Payments', 'Subscriptions', 'Billing']
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Integrate with PayPal for payment processing and financial transactions',
    category: 'Finance & Billing',
    status: 'not-connected',
    health: 'healthy',
    logo: CreditCard,
    tags: ['Payments', 'Transactions', 'Finance']
  },

  // AI & Automation
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Connect with OpenAI for AI-powered automation and intelligent responses',
    category: 'AI & Automation',
    status: 'not-connected',
    health: 'healthy',
    logo: Bot,
    tags: ['AI', 'Automation', 'GPT'],
    isRecommended: true
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Integrate with Zapier for workflow automation and app connections',
    category: 'AI & Automation',
    status: 'not-connected',
    health: 'healthy',
    logo: Zap,
    tags: ['Automation', 'Workflows', 'Connections']
  },
  {
    id: 'n8n',
    name: 'n8n',
    description: 'Connect with n8n for visual workflow automation and process orchestration',
    category: 'AI & Automation',
    status: 'not-connected',
    health: 'healthy',
    logo: Workflow,
    tags: ['Automation', 'Workflows', 'Visual']
  },
  {
    id: 'custom-ai',
    name: 'Custom AI Bot',
    description: 'Deploy and manage custom AI bots for specialized automation tasks',
    category: 'AI & Automation',
    status: 'not-connected',
    health: 'healthy',
    logo: Bot,
    tags: ['AI', 'Custom', 'Bots'],
    isComingSoon: true
  },

  // Analytics & Reporting
  {
    id: 'powerbi',
    name: 'Power BI',
    description: 'Connect with Microsoft Power BI for advanced analytics and reporting',
    category: 'Analytics & Reporting',
    status: 'not-connected',
    health: 'healthy',
    logo: BarChart3,
    tags: ['Analytics', 'Reporting', 'Microsoft']
  },
  {
    id: 'tableau',
    name: 'Tableau',
    description: 'Integrate with Tableau for data visualization and business intelligence',
    category: 'Analytics & Reporting',
    status: 'not-connected',
    health: 'healthy',
    logo: BarChart3,
    tags: ['Analytics', 'Visualization', 'BI']
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Connect with Google Analytics for web analytics and user behavior tracking',
    category: 'Analytics & Reporting',
    status: 'connected',
    health: 'healthy',
    logo: BarChart3,
    tags: ['Analytics', 'Google', 'Web Analytics']
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    description: 'Integrate with Mixpanel for product analytics and user engagement tracking',
    category: 'Analytics & Reporting',
    status: 'not-connected',
    health: 'healthy',
    logo: BarChart3,
    tags: ['Analytics', 'Product', 'Engagement']
  }
];

const categories = [
  'CRM & Customer Platforms',
  'Communication & Collaboration',
  'Monitoring & Incident Management',
  'Cloud & Infrastructure',
  'DevOps & CI/CD',
  'Security & Compliance',
  'Finance & Billing',
  'AI & Automation',
  'Analytics & Reporting'
];

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['CRM & Customer Platforms', 'Communication & Collaboration']));
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [integrations, setIntegrations] = useState<Integration[]>(integrationsData);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleIntegration = (integrationId: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: integration.status === 'connected' ? 'not-connected' : 'connected',
            health: integration.status === 'connected' ? 'healthy' : 'healthy'
          }
        : integration
    ));
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'All' || 
                         (filterStatus === 'Connected' && integration.status === 'connected') ||
                         (filterStatus === 'Not Connected' && integration.status === 'not-connected') ||
                         (filterStatus === 'Error' && integration.status === 'error');
    
    const matchesCategory = filterCategory === 'All' || integration.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const recommendedIntegrations = integrations.filter(i => i.isRecommended);
  const comingSoonIntegrations = integrations.filter(i => i.isComingSoon);

  const handleConnectAllRecommended = () => {
    console.log('Connecting all recommended integrations...');
    setIntegrations(integrations.map(integration => 
      integration.isRecommended && integration.status === 'not-connected'
        ? { ...integration, status: 'connected', health: 'healthy' }
        : integration
    ));
    alert('All recommended integrations connected! (Mock)');
  };

  const handleDisconnectAll = () => {
    console.log('Disconnecting all integrations...');
    setIntegrations(integrations.map(integration => 
      integration.status === 'connected'
        ? { ...integration, status: 'not-connected', health: 'healthy' }
        : integration
    ));
    alert('All integrations disconnected! (Mock)');
  };

  const handleRefreshIntegrations = () => {
    console.log('Refreshing integration status...');
    alert('Integration status refreshed! (Mock)');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'not-connected':
        return <XCircle className="text-gray-400" size={16} />;
      case 'error':
        return <AlertTriangle className="text-red-600" size={16} />;
      default:
        return <XCircle className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'not-connected':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthDot = (health: string) => {
    switch (health) {
      case 'healthy':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 'warning':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      case 'error':
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect your favorite tools and services to streamline your workflow</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRefreshIntegrations}
            className="btn-secondary flex items-center space-x-2"
          >
            <RefreshCw size={20} />
            <span>Refresh</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Add Integration</span>
          </button>
        </div>
      </div>

      {/* Integration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Integrations</p>
              <p className="text-2xl font-bold text-gray-900">{integrations.length}</p>
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
              <p className="text-2xl font-bold text-green-600">{connectedCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-600">{integrations.length - connectedCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
              <XCircle className="text-gray-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recommended</p>
              <p className="text-2xl font-bold text-purple-600">{recommendedIntegrations.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <Star className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
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
              <option value="Not Connected">Not Connected</option>
              <option value="Error">Error</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <span className="text-sm text-gray-600">Advanced Filters</span>
          </div>
        </div>
      </div>

      {/* Recommended Integrations */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Star className="text-purple-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Recommended Integrations</h3>
          </div>
          <button 
            onClick={handleConnectAllRecommended}
            className="btn-primary flex items-center space-x-2"
          >
            <Star size={20} />
            <span>Connect All Recommended</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedIntegrations.map((integration) => {
            const Logo = integration.logo;
            return (
              <div key={integration.id} className="card border-2 border-purple-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Logo className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                      <p className="text-sm text-gray-500">{integration.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {integration.status === 'connected' && getHealthDot(integration.health)}
                    {getStatusIcon(integration.status)}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(integration.status)}`}>
                    {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
                  </span>
                  <div className="flex space-x-1">
                    {integration.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => toggleIntegration(integration.id)}
                    className={`text-sm font-medium px-3 py-1 rounded ${
                      integration.status === 'connected' 
                        ? 'text-red-600 hover:text-red-700' 
                        : 'text-green-600 hover:text-green-700'
                    }`}
                  >
                    {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                  </button>
                  <button 
                    onClick={() => setSelectedIntegration(integration)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Settings size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleConnectAllRecommended}
              className="btn-secondary flex items-center space-x-2"
            >
              <Star size={20} />
              <span>Connect All Recommended</span>
            </button>
            <button 
              onClick={handleDisconnectAll}
              className="btn-secondary flex items-center space-x-2"
            >
              <XCircle size={20} />
              <span>Disconnect All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Integration Categories */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryIntegrations = filteredIntegrations.filter(i => i.category === category);
          if (categoryIntegrations.length === 0) return null;
          
          const isExpanded = expandedCategories.has(category);
          
          return (
            <div key={category} className="card">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Plug className="text-gray-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                    <p className="text-sm text-gray-500">{categoryIntegrations.length} integrations</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {categoryIntegrations.filter(i => i.status === 'connected').length} connected
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="text-gray-400" size={20} />
                  ) : (
                    <ChevronRight className="text-gray-400" size={20} />
                  )}
                </div>
              </div>
              
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-200">
                  <div className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryIntegrations.map((integration) => {
                        const Logo = integration.logo;
                        return (
                          <div key={integration.id} className="card hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                  <Logo className="h-6 w-6 text-gray-600" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                                  <p className="text-sm text-gray-500">{integration.category}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {integration.status === 'connected' && getHealthDot(integration.health)}
                                {getStatusIcon(integration.status)}
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                            
                            <div className="flex items-center justify-between mb-3">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(integration.status)}`}>
                                {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
                              </span>
                              <div className="flex space-x-1">
                                {integration.tags.slice(0, 2).map((tag) => (
                                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <button 
                                onClick={() => toggleIntegration(integration.id)}
                                className={`text-sm font-medium px-3 py-1 rounded ${
                                  integration.status === 'connected' 
                                    ? 'text-red-600 hover:text-red-700' 
                                    : 'text-green-600 hover:text-green-700'
                                }`}
                              >
                                {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                              </button>
                              <button 
                                onClick={() => setSelectedIntegration(integration)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <Settings size={16} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Coming Soon Section */}
      {comingSoonIntegrations.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Coming Soon</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comingSoonIntegrations.map((integration) => {
              const Logo = integration.logo;
              return (
                <div key={integration.id} className="card opacity-60">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Logo className="h-6 w-6 text-gray-600" />
                    </div>
    <div>
                      <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                      <p className="text-sm text-gray-500">{integration.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                      Coming Soon
                    </span>
                    <div className="flex space-x-1">
                      {integration.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredIntegrations.length === 0 && (
        <div className="card text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No integrations found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms or filters</p>
        </div>
      )}

      {/* Settings Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Integration Settings</h3>
                <button 
                  onClick={() => setSelectedIntegration(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <selectedIntegration.logo className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedIntegration.name}</h4>
                    <p className="text-sm text-gray-500">{selectedIntegration.category}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                    <input
                      type="password"
                      placeholder="Enter your API key"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
                    <input
                      type="url"
                      placeholder="https://your-domain.com/webhook"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="production">Production</option>
                      <option value="staging">Staging</option>
                      <option value="development">Development</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => setSelectedIntegration(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Saved integration settings for:', selectedIntegration.name);
                      alert('Integration settings saved! (Mock)');
                      setSelectedIntegration(null);
                    }}
                    className="btn-primary"
                  >
                    Save Settings
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




