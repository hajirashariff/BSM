import React, { useState } from 'react';
import { 
  Brain, 
  Bot, 
  Zap, 
  Target, 
  BarChart3, 
  Settings, 
  Play, 
  Pause, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Users,
  Database,
  MessageSquare,
  FileText,
  Calendar,
  Mail,
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Filter,
  Search
} from 'lucide-react';

const aiFeatures = [
  {
    id: 'sentiment-analysis',
    name: 'Sentiment Analysis',
    description: 'Automatically analyze text sentiment and route accordingly',
    status: 'Active',
    accuracy: 94.2,
    usage: 1234,
    category: 'Text Processing',
    icon: Brain,
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'predictive-routing',
    name: 'Predictive Routing',
    description: 'AI-powered intelligent task routing based on historical data',
    status: 'Active',
    accuracy: 89.7,
    usage: 856,
    category: 'Decision Making',
    icon: Target,
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 'anomaly-detection',
    name: 'Anomaly Detection',
    description: 'Detect unusual patterns and trigger alerts automatically',
    status: 'Active',
    accuracy: 92.1,
    usage: 445,
    category: 'Monitoring',
    icon: AlertTriangle,
    color: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 'auto-categorization',
    name: 'Auto Categorization',
    description: 'Automatically categorize incoming requests and tickets',
    status: 'Active',
    accuracy: 87.3,
    usage: 2103,
    category: 'Classification',
    icon: FileText,
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'workflow-optimization',
    name: 'Workflow Optimization',
    description: 'Suggest improvements to existing workflows',
    status: 'Beta',
    accuracy: 78.9,
    usage: 234,
    category: 'Optimization',
    icon: TrendingUp,
    color: 'bg-orange-100 text-orange-800'
  },
  {
    id: 'smart-scheduling',
    name: 'Smart Scheduling',
    description: 'AI-powered optimal scheduling based on resources and priorities',
    status: 'Active',
    accuracy: 91.5,
    usage: 567,
    category: 'Scheduling',
    icon: Calendar,
    color: 'bg-indigo-100 text-indigo-800'
  }
];

const aiWorkflows = [
  {
    id: 'WF-AI-001',
    name: 'Customer Feedback Analysis',
    description: 'AI-powered sentiment analysis and automatic routing',
    status: 'Active',
    aiFeatures: ['sentiment-analysis', 'auto-categorization', 'predictive-routing'],
    accuracy: 94.2,
    runs: 1234,
    lastRun: '2024-01-15 16:45',
    successRate: 96.8,
    avgProcessingTime: '2.3 minutes'
  },
  {
    id: 'WF-AI-002',
    name: 'IT Incident Intelligence',
    description: 'Smart incident detection and escalation',
    status: 'Active',
    aiFeatures: ['anomaly-detection', 'predictive-routing'],
    accuracy: 89.7,
    runs: 856,
    lastRun: '2024-01-15 14:20',
    successRate: 92.1,
    avgProcessingTime: '1.8 minutes'
  },
  {
    id: 'WF-AI-003',
    name: 'Resource Optimization',
    description: 'AI-driven resource allocation and scheduling',
    status: 'Beta',
    aiFeatures: ['smart-scheduling', 'workflow-optimization'],
    accuracy: 78.9,
    runs: 234,
    lastRun: '2024-01-15 12:30',
    successRate: 85.2,
    avgProcessingTime: '4.2 minutes'
  }
];

export default function AIEnhancedWorkflow() {
  const [activeView, setActiveView] = useState('features');
  const [selectedFeature, setSelectedFeature] = useState(null);

  const views = [
    { id: 'features', label: 'AI Features', icon: Brain },
    { id: 'workflows', label: 'AI Workflows', icon: Bot },
    { id: 'analytics', label: 'AI Analytics', icon: BarChart3 },
    { id: 'models', label: 'Model Management', icon: Settings }
  ];

  const renderFeatures = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                    <p className="text-sm text-gray-500">{feature.category}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${feature.color}`}>
                  {feature.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-600">{feature.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <span className="text-gray-500">Accuracy:</span>
                    <span className="ml-1 font-medium text-gray-900">{feature.accuracy}%</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Usage:</span>
                    <span className="ml-1 font-medium text-gray-900">{feature.usage.toLocaleString()}</span>
                  </div>
                </div>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Configure
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderWorkflows = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">AI-Enhanced Workflows</h3>
          <p className="text-sm text-gray-500">Workflows powered by artificial intelligence</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workflow
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AI Features
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accuracy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Runs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {aiWorkflows.map((workflow) => (
                <tr key={workflow.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{workflow.name}</div>
                      <div className="text-sm text-gray-500">{workflow.description}</div>
                      <div className="text-xs text-gray-400 mt-1">ID: {workflow.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {workflow.aiFeatures.map((featureId) => {
                        const feature = aiFeatures.find(f => f.id === featureId);
                        return (
                          <span key={featureId} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {feature?.name || featureId}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{workflow.accuracy}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{workflow.runs.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Last: {workflow.lastRun}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900">{workflow.successRate}%</div>
                      <div className="ml-2 text-xs text-gray-500">({workflow.avgProcessingTime})</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total AI Features</p>
              <p className="text-2xl font-semibold text-gray-900">{aiFeatures.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Bot className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">AI Workflows</p>
              <p className="text-2xl font-semibold text-gray-900">{aiWorkflows.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Accuracy</p>
              <p className="text-2xl font-semibold text-gray-900">89.2%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Executions</p>
              <p className="text-2xl font-semibold text-gray-900">2,333</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Performance Trends</h3>
        <div className="text-center py-12">
          <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Performance Analytics</h3>
          <p className="mt-1 text-sm text-gray-500">Detailed AI performance metrics and trends coming soon</p>
        </div>
      </div>
    </div>
  );

  const renderModels = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Settings className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Model Management</h3>
        <p className="mt-1 text-sm text-gray-500">AI model configuration and training interface coming soon</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'features':
        return renderFeatures();
      case 'workflows':
        return renderWorkflows();
      case 'analytics':
        return renderAnalytics();
      case 'models':
        return renderModels();
      default:
        return renderFeatures();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI-Enhanced Workflows</h2>
          <p className="text-gray-600">Leverage artificial intelligence to automate and optimize your workflows</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Upload size={20} />
            <span>Import Model</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Create AI Workflow</span>
          </button>
        </div>
      </div>

      {/* View Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeView === view.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                <span>{view.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="min-h-screen">
        {renderContent()}
      </div>
    </div>
  );
}

