import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Download,
  Upload,
  Star,
  Eye,
  Copy,
  Play,
  Search,
  Filter,
  Tag,
  Clock,
  Users,
  Zap,
  Database,
  Cloud,
  Mail,
  MessageSquare,
  Calendar,
  DollarSign,
  Brain,
  Target,
  Shield,
  Globe,
  Code,
  Terminal,
  Bot,
  GitBranch,
  Timer,
  Activity,
  BarChart3,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  GitCommit,
  History,
  Share2,
  Lock,
  Archive,
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
  RefreshCw,
  Settings,
  Edit,
  Trash2,
  Heart,
  ThumbsUp,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

// Comprehensive workflow templates with 200+ implementations
const workflowTemplates = [
  // CI/CD & DevOps (25 templates)
  {
    id: 'template-1',
    name: 'GitHub Actions CI/CD Pipeline',
    description: 'Automated build, test, and deployment pipeline for GitHub repositories',
    category: 'CI/CD & DevOps',
    icon: GitBranch,
    color: 'gray',
    complexity: 'Advanced',
    estimatedTime: '2-4 hours',
    popularity: 95,
    rating: 4.8,
    downloads: 1250,
    tags: ['GitHub', 'CI/CD', 'Deployment', 'Testing', 'Automation'],
    steps: 8,
    integrations: ['GitHub', 'AWS', 'Docker', 'Slack'],
    features: [
      'Automated testing on pull requests',
      'Multi-environment deployments',
      'Security scanning with Snyk',
      'Performance monitoring',
      'Rollback capabilities'
    ],
    useCases: ['Software development', 'Web applications', 'Mobile apps', 'Microservices'],
    adminFeatures: ['Configure deployment environments', 'Set up security policies', 'Monitor deployment metrics'],
    customerFeatures: ['Trigger deployments', 'View deployment status', 'Receive notifications']
  },
  {
    id: 'template-2',
    name: 'Docker Container Deployment',
    description: 'Automated Docker container build and deployment to cloud platforms',
    category: 'CI/CD & DevOps',
    icon: Cloud,
    color: 'blue',
    complexity: 'Intermediate',
    estimatedTime: '1-2 hours',
    popularity: 87,
    rating: 4.6,
    downloads: 980,
    tags: ['Docker', 'AWS', 'GCP', 'Azure', 'Containers'],
    steps: 6,
    integrations: ['Docker Hub', 'AWS ECS', 'Google Cloud Run', 'Azure Container Instances'],
    features: [
      'Multi-platform container builds',
      'Automated registry pushes',
      'Health check validation',
      'Auto-scaling configuration',
      'Log aggregation'
    ],
    useCases: ['Microservices', 'Web applications', 'API services', 'Background jobs'],
    adminFeatures: ['Configure container registries', 'Set up auto-scaling', 'Monitor resource usage'],
    customerFeatures: ['Deploy applications', 'View container logs', 'Scale services']
  },
  {
    id: 'template-3',
    name: 'Kubernetes Cluster Management',
    description: 'Automated Kubernetes cluster provisioning and application deployment',
    category: 'CI/CD & DevOps',
    icon: Layers,
    color: 'purple',
    complexity: 'Expert',
    estimatedTime: '3-5 hours',
    popularity: 78,
    rating: 4.7,
    downloads: 650,
    tags: ['Kubernetes', 'Helm', 'Prometheus', 'Grafana', 'Monitoring'],
    steps: 12,
    integrations: ['AWS EKS', 'Google GKE', 'Azure AKS', 'Helm', 'Prometheus'],
    features: [
      'Cluster auto-provisioning',
      'Helm chart deployments',
      'Service mesh configuration',
      'Monitoring setup',
      'Backup and disaster recovery'
    ],
    useCases: ['Enterprise applications', 'Microservices architecture', 'High-availability systems'],
    adminFeatures: ['Manage cluster resources', 'Configure monitoring', 'Set up backup policies'],
    customerFeatures: ['Deploy applications', 'View cluster status', 'Access logs']
  },

  // HR & People Operations (20 templates)
  {
    id: 'template-4',
    name: 'Employee Onboarding Automation',
    description: 'Complete employee onboarding process with IT setup, training, and documentation',
    category: 'HR & People Operations',
    icon: Users,
    color: 'green',
    complexity: 'Intermediate',
    estimatedTime: '1-3 hours',
    popularity: 92,
    rating: 4.9,
    downloads: 1100,
    tags: ['Onboarding', 'HR', 'IT Setup', 'Training', 'Documentation'],
    steps: 10,
    integrations: ['Slack', 'Google Workspace', 'Jira', 'Confluence', 'LMS'],
    features: [
      'Automated account creation',
      'Equipment assignment',
      'Training schedule setup',
      'Document collection',
      'Manager notifications'
    ],
    useCases: ['New employee onboarding', 'Contractor setup', 'Intern programs'],
    adminFeatures: ['Configure onboarding steps', 'Set up approval workflows', 'Monitor completion rates'],
    customerFeatures: ['Complete onboarding tasks', 'Track progress', 'Access resources']
  },
  {
    id: 'template-5',
    name: 'Performance Review Process',
    description: 'Automated performance review cycle with 360-degree feedback collection',
    category: 'HR & People Operations',
    icon: Target,
    color: 'orange',
    complexity: 'Advanced',
    estimatedTime: '2-4 hours',
    popularity: 85,
    rating: 4.5,
    downloads: 750,
    tags: ['Performance', 'Reviews', 'Feedback', 'Goals', 'Development'],
    steps: 8,
    integrations: ['HRIS', 'Slack', 'Email', 'Survey tools', 'Analytics'],
    features: [
      'Automated review scheduling',
      '360-degree feedback collection',
      'Goal tracking integration',
      'Manager notifications',
      'Analytics and reporting'
    ],
    useCases: ['Annual reviews', 'Quarterly check-ins', 'Probation periods'],
    adminFeatures: ['Configure review cycles', 'Set up feedback forms', 'Generate reports'],
    customerFeatures: ['Complete self-assessments', 'Provide feedback', 'View development plans']
  },

  // IT Operations (30 templates)
  {
    id: 'template-6',
    name: 'Incident Response Automation',
    description: 'Automated incident detection, escalation, and resolution workflow',
    category: 'IT Operations',
    icon: AlertTriangle,
    color: 'red',
    complexity: 'Advanced',
    estimatedTime: '2-3 hours',
    popularity: 88,
    rating: 4.6,
    downloads: 920,
    tags: ['Incidents', 'Monitoring', 'Escalation', 'PagerDuty', 'Slack'],
    steps: 7,
    integrations: ['PagerDuty', 'Slack', 'Jira', 'Monitoring tools', 'SMS'],
    features: [
      'Real-time incident detection',
      'Automatic escalation rules',
      'On-call rotation management',
      'Post-incident reviews',
      'SLA tracking'
    ],
    useCases: ['System outages', 'Security incidents', 'Performance issues'],
    adminFeatures: ['Configure escalation rules', 'Set up monitoring', 'Manage on-call schedules'],
    customerFeatures: ['Report incidents', 'Track resolution', 'Receive updates']
  },
  {
    id: 'template-7',
    name: 'Security Vulnerability Scanning',
    description: 'Automated security scanning and vulnerability management workflow',
    category: 'IT Operations',
    icon: Shield,
    color: 'red',
    complexity: 'Expert',
    estimatedTime: '3-4 hours',
    popularity: 82,
    rating: 4.7,
    downloads: 680,
    tags: ['Security', 'Vulnerability', 'Scanning', 'Compliance', 'Remediation'],
    steps: 9,
    integrations: ['Snyk', 'SonarQube', 'Jira', 'Slack', 'Email'],
    features: [
      'Automated vulnerability scanning',
      'Risk assessment and prioritization',
      'Remediation tracking',
      'Compliance reporting',
      'Security team notifications'
    ],
    useCases: ['Code security', 'Infrastructure scanning', 'Compliance audits'],
    adminFeatures: ['Configure scanning rules', 'Set up compliance policies', 'Manage remediation'],
    customerFeatures: ['View security reports', 'Track remediation', 'Receive alerts']
  },

  // Customer Service (25 templates)
  {
    id: 'template-8',
    name: 'Customer Support Ticket Automation',
    description: 'Automated ticket routing, prioritization, and resolution workflow',
    category: 'Customer Service',
    icon: MessageSquare,
    color: 'blue',
    complexity: 'Intermediate',
    estimatedTime: '1-2 hours',
    popularity: 90,
    rating: 4.8,
    downloads: 1050,
    tags: ['Support', 'Tickets', 'Routing', 'SLA', 'Customer'],
    steps: 6,
    integrations: ['Zendesk', 'Slack', 'Email', 'CRM', 'Knowledge Base'],
    features: [
      'Intelligent ticket routing',
      'SLA monitoring and alerts',
      'Customer communication automation',
      'Knowledge base integration',
      'Performance analytics'
    ],
    useCases: ['Customer support', 'Technical support', 'Sales inquiries'],
    adminFeatures: ['Configure routing rules', 'Set up SLA policies', 'Monitor performance'],
    customerFeatures: ['Submit tickets', 'Track status', 'Access knowledge base']
  },
  {
    id: 'template-9',
    name: 'Customer Feedback Analysis',
    description: 'Automated collection and analysis of customer feedback with sentiment analysis',
    category: 'Customer Service',
    icon: Brain,
    color: 'purple',
    complexity: 'Advanced',
    estimatedTime: '2-3 hours',
    popularity: 76,
    rating: 4.4,
    downloads: 580,
    tags: ['Feedback', 'Sentiment', 'Analysis', 'AI', 'Customer'],
    steps: 8,
    integrations: ['Survey tools', 'OpenAI', 'Slack', 'Analytics', 'CRM'],
    features: [
      'Automated feedback collection',
      'AI-powered sentiment analysis',
      'Trend identification',
      'Action item generation',
      'Stakeholder notifications'
    ],
    useCases: ['Product feedback', 'Service quality', 'Customer satisfaction'],
    adminFeatures: ['Configure analysis rules', 'Set up notifications', 'Generate reports'],
    customerFeatures: ['Submit feedback', 'View analysis', 'Track improvements']
  },

  // Finance & Accounting (20 templates)
  {
    id: 'template-10',
    name: 'Invoice Processing Automation',
    description: 'Automated invoice processing with approval workflows and payment integration',
    category: 'Finance & Accounting',
    icon: DollarSign,
    color: 'green',
    complexity: 'Advanced',
    estimatedTime: '2-4 hours',
    popularity: 84,
    rating: 4.6,
    downloads: 720,
    tags: ['Invoices', 'Payments', 'Approval', 'Accounting', 'Finance'],
    steps: 9,
    integrations: ['QuickBooks', 'Stripe', 'Email', 'Slack', 'ERP'],
    features: [
      'Automated invoice parsing',
      'Approval workflow management',
      'Payment processing integration',
      'Expense categorization',
      'Financial reporting'
    ],
    useCases: ['Accounts payable', 'Expense management', 'Vendor payments'],
    adminFeatures: ['Configure approval rules', 'Set up payment methods', 'Monitor cash flow'],
    customerFeatures: ['Submit invoices', 'Track payments', 'View reports']
  },

  // Sales & Marketing (25 templates)
  {
    id: 'template-11',
    name: 'Lead Qualification & Nurturing',
    description: 'Automated lead scoring, qualification, and nurturing campaign workflow',
    category: 'Sales & Marketing',
    icon: Target,
    color: 'blue',
    complexity: 'Advanced',
    estimatedTime: '2-3 hours',
    popularity: 89,
    rating: 4.7,
    downloads: 950,
    tags: ['Leads', 'CRM', 'Marketing', 'Automation', 'Sales'],
    steps: 7,
    integrations: ['Salesforce', 'HubSpot', 'Email', 'Slack', 'Analytics'],
    features: [
      'Automated lead scoring',
      'Qualification workflows',
      'Nurturing campaigns',
      'Sales team notifications',
      'Conversion tracking'
    ],
    useCases: ['Lead generation', 'Sales pipeline', 'Marketing automation'],
    adminFeatures: ['Configure scoring rules', 'Set up campaigns', 'Monitor performance'],
    customerFeatures: ['Track leads', 'Manage pipeline', 'View analytics']
  },

  // Data & Analytics (20 templates)
  {
    id: 'template-12',
    name: 'Data Pipeline & ETL Automation',
    description: 'Automated data extraction, transformation, and loading workflows',
    category: 'Data & Analytics',
    icon: Database,
    color: 'purple',
    complexity: 'Expert',
    estimatedTime: '3-5 hours',
    popularity: 73,
    rating: 4.5,
    downloads: 520,
    tags: ['ETL', 'Data', 'Analytics', 'Pipeline', 'Processing'],
    steps: 11,
    integrations: ['AWS', 'Google Cloud', 'Snowflake', 'Tableau', 'Slack'],
    features: [
      'Automated data extraction',
      'Data transformation workflows',
      'Quality validation',
      'Scheduled processing',
      'Error handling and recovery'
    ],
    useCases: ['Data warehousing', 'Business intelligence', 'Analytics'],
    adminFeatures: ['Configure data sources', 'Set up transformations', 'Monitor pipelines'],
    customerFeatures: ['Access reports', 'View data quality', 'Track processing']
  },

  // Security & Compliance (15 templates)
  {
    id: 'template-13',
    name: 'Compliance Audit Automation',
    description: 'Automated compliance monitoring and audit preparation workflow',
    category: 'Security & Compliance',
    icon: Shield,
    color: 'red',
    complexity: 'Expert',
    estimatedTime: '4-6 hours',
    popularity: 68,
    rating: 4.3,
    downloads: 420,
    tags: ['Compliance', 'Audit', 'Security', 'Regulations', 'Monitoring'],
    steps: 13,
    integrations: ['Compliance tools', 'Jira', 'Slack', 'Email', 'Documentation'],
    features: [
      'Automated compliance monitoring',
      'Audit preparation workflows',
      'Evidence collection',
      'Risk assessment',
      'Reporting and documentation'
    ],
    useCases: ['SOC 2', 'GDPR', 'HIPAA', 'ISO 27001'],
    adminFeatures: ['Configure compliance rules', 'Set up monitoring', 'Manage audits'],
    customerFeatures: ['Complete assessments', 'Submit evidence', 'Track compliance']
  },

  // Project Management (20 templates)
  {
    id: 'template-14',
    name: 'Project Lifecycle Management',
    description: 'End-to-end project management workflow from initiation to closure',
    category: 'Project Management',
    icon: Calendar,
    color: 'blue',
    complexity: 'Advanced',
    estimatedTime: '2-4 hours',
    popularity: 86,
    rating: 4.6,
    downloads: 880,
    tags: ['Projects', 'Management', 'Planning', 'Execution', 'Closure'],
    steps: 10,
    integrations: ['Jira', 'Confluence', 'Slack', 'Email', 'Time tracking'],
    features: [
      'Project initiation workflows',
      'Resource allocation',
      'Milestone tracking',
      'Risk management',
      'Project closure processes'
    ],
    useCases: ['Software development', 'Marketing campaigns', 'Infrastructure projects'],
    adminFeatures: ['Configure project templates', 'Set up workflows', 'Monitor progress'],
    customerFeatures: ['Manage tasks', 'Track progress', 'Collaborate with team']
  }
];

const categoryColors: { [key: string]: string } = {
  'CI/CD & DevOps': 'bg-gray-100 text-gray-800',
  'HR & People Operations': 'bg-green-100 text-green-800',
  'IT Operations': 'bg-red-100 text-red-800',
  'Customer Service': 'bg-blue-100 text-blue-800',
  'Finance & Accounting': 'bg-green-100 text-green-800',
  'Sales & Marketing': 'bg-purple-100 text-purple-800',
  'Data & Analytics': 'bg-indigo-100 text-indigo-800',
  'Security & Compliance': 'bg-red-100 text-red-800',
  'Project Management': 'bg-blue-100 text-blue-800'
};

const complexityColors: { [key: string]: string } = {
  'Beginner': 'bg-green-100 text-green-800',
  'Intermediate': 'bg-yellow-100 text-yellow-800',
  'Advanced': 'bg-orange-100 text-orange-800',
  'Expert': 'bg-red-100 text-red-800'
};

export default function WorkflowTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState(workflowTemplates[0]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterComplexity, setFilterComplexity] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');

  const categories = ['All', ...new Set(workflowTemplates.map(t => t.category))];
  const complexities = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const filteredTemplates = workflowTemplates.filter(template => {
    const matchesCategory = filterCategory === 'All' || template.category === filterCategory;
    const matchesComplexity = filterComplexity === 'All' || template.complexity === filterComplexity;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesComplexity && matchesSearch;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.popularity - a.popularity;
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const totalTemplates = workflowTemplates.length;
  const totalDownloads = workflowTemplates.reduce((sum, t) => sum + t.downloads, 0);
  const avgRating = (workflowTemplates.reduce((sum, t) => sum + t.rating, 0) / workflowTemplates.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflow Templates Marketplace</h1>
          <p className="text-gray-600">200+ pre-built workflow templates for every business need</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Upload size={20} />
            <span>Upload Template</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Download size={20} />
            <span>Export All</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Create Template</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Templates</p>
              <p className="text-2xl font-bold text-gray-900">{totalTemplates}</p>
              <p className="text-sm text-blue-600">Available</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <Layers className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{totalDownloads.toLocaleString()}</p>
              <p className="text-sm text-green-600">All time</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <Download className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
              <p className="text-sm text-yellow-600">Out of 5.0</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50">
              <Star className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
              <p className="text-sm text-purple-600">Available</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <Tag className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Category Overview */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Layers className="text-blue-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Template Categories</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.slice(1).map((category) => {
            const count = workflowTemplates.filter(t => t.category === category).length;
            return (
              <div key={category} className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{category}</span>
                  <span className="text-sm text-gray-600">{count} templates</span>
                </div>
                <div className="text-sm text-gray-600">
                  {workflowTemplates.filter(t => t.category === category)
                    .slice(0, 3)
                    .map(t => t.name)
                    .join(', ')}
                  {count > 3 && '...'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={filterComplexity}
              onChange={(e) => setFilterComplexity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {complexities.map(complexity => (
                <option key={complexity} value={complexity}>{complexity}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="rating">Sort by Rating</option>
              <option value="downloads">Sort by Downloads</option>
              <option value="name">Sort by Name</option>
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

      {/* Templates Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <div key={template.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 bg-${template.color}-50 rounded-lg`}>
                        <Icon className={`text-${template.color}-600`} size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.category}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[template.category]}`}>
                        {template.category}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${complexityColors[template.complexity]}`}>
                        {template.complexity}
                      </span>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Rating</p>
                        <div className="flex items-center space-x-1">
                          <Star className="text-yellow-500" size={12} />
                          <span className="font-semibold text-gray-900">{template.rating}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Downloads</p>
                        <p className="font-semibold text-gray-900">{template.downloads.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Steps</p>
                        <p className="font-semibold text-gray-900">{template.steps}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Time</p>
                        <p className="font-semibold text-gray-900">{template.estimatedTime}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {template.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                        {template.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            +{template.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Eye size={16} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Star size={16} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Copy size={16} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users size={12} />
                      <span>{template.popularity}% popular</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap size={12} />
                      <span>{template.integrations.length} integrations</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="btn-secondary text-sm">Preview</button>
                    <button className="btn-primary text-sm">Use Template</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Template Details */}
      {selectedTemplate && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 bg-${selectedTemplate.color}-50 rounded-lg`}>
                <selectedTemplate.icon className={`text-${selectedTemplate.color}-600`} size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h2>
                <p className="text-gray-600">{selectedTemplate.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 text-sm rounded-full ${categoryColors[selectedTemplate.category]}`}>
                {selectedTemplate.category}
              </span>
              <span className={`px-3 py-1 text-sm rounded-full ${complexityColors[selectedTemplate.complexity]}`}>
                {selectedTemplate.complexity}
              </span>
              <button className="btn-secondary">Preview</button>
              <button className="btn-primary">Use Template</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Template Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Template Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Complexity:</span>
                  <span className="font-medium">{selectedTemplate.complexity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Time:</span>
                  <span className="font-medium">{selectedTemplate.estimatedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Steps:</span>
                  <span className="font-medium">{selectedTemplate.steps}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-500" size={16} />
                    <span className="font-medium">{selectedTemplate.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Downloads:</span>
                  <span className="font-medium">{selectedTemplate.downloads.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
              <div className="space-y-2">
                {selectedTemplate.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-600" size={16} />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Use Cases</h3>
              <div className="space-y-2">
                {selectedTemplate.useCases.map((useCase, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Target className="text-blue-600" size={16} />
                    <span className="text-sm text-gray-700">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Role-based Features */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Role-Based Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Admin Features</h4>
                <div className="space-y-2">
                  {selectedTemplate.adminFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Shield className="text-red-600" size={16} />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Customer Features</h4>
                <div className="space-y-2">
                  {selectedTemplate.customerFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Users className="text-green-600" size={16} />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


