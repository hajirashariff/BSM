import React, { useState } from 'react';
import { 
  Workflow, 
  Plus, 
  Search, 
  Filter, 
  Play,
  Pause,
  Edit,
  Copy,
  Trash2,
  Eye,
  Settings,
  Zap,
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowDown,
  GitBranch,
  Timer,
  Mail,
  MessageSquare,
  Database,
  FileText,
  Bot,
  Brain,
  Target,
  BarChart3
} from 'lucide-react';

const workflowData = [
  {
    id: 'WF-001',
    name: 'Employee Onboarding',
    description: 'Automated workflow for new employee setup',
    status: 'Active',
    category: 'HR',
    steps: 7,
    avgDuration: '3.2 days',
    successRate: 94,
    lastRun: '2024-01-15 09:30',
    nextRun: '2024-01-16 08:00',
    triggers: ['New employee added to HR system'],
    actions: ['Create accounts', 'Assign equipment', 'Schedule training'],
    owner: 'HR Team',
    created: '2023-06-15',
    runs: 156,
    tags: ['Onboarding', 'HR', 'Automation'],
    template: true
  },
  {
    id: 'WF-002',
    name: 'IT Incident Escalation',
    description: 'Automatic escalation for critical IT incidents',
    status: 'Active',
    category: 'IT',
    steps: 5,
    avgDuration: '2.1 hours',
    successRate: 98,
    lastRun: '2024-01-15 14:20',
    nextRun: 'On-demand',
    triggers: ['Critical incident created', 'SLA breach detected'],
    actions: ['Notify manager', 'Escalate to senior team', 'Update status'],
    owner: 'IT Operations',
    created: '2023-08-20',
    runs: 89,
    tags: ['Incident', 'Escalation', 'IT'],
    template: false
  },
  {
    id: 'WF-003',
    name: 'Software License Renewal',
    description: 'Automated license renewal and approval process',
    status: 'Draft',
    category: 'Procurement',
    steps: 6,
    avgDuration: '5.5 days',
    successRate: 0,
    lastRun: 'Never',
    nextRun: 'Not scheduled',
    triggers: ['License expiry warning (30 days)'],
    actions: ['Generate quote', 'Send approval request', 'Process payment'],
    owner: 'Procurement Team',
    created: '2024-01-10',
    runs: 0,
    tags: ['License', 'Renewal', 'Procurement'],
    template: true
  },
  {
    id: 'WF-004',
    name: 'Customer Feedback Processing',
    description: 'AI-powered sentiment analysis and routing',
    status: 'Active',
    category: 'Customer Service',
    steps: 4,
    avgDuration: '1.8 hours',
    successRate: 92,
    lastRun: '2024-01-15 16:45',
    nextRun: 'Continuous',
    triggers: ['Customer feedback submitted'],
    actions: ['Analyze sentiment', 'Route to appropriate team', 'Generate response'],
    owner: 'Customer Success',
    created: '2023-11-05',
    runs: 234,
    tags: ['Feedback', 'AI', 'Sentiment'],
    template: false
  },
  {
    id: 'WF-005',
    name: 'Asset Maintenance Reminder',
    description: 'Automated maintenance scheduling and reminders',
    status: 'Active',
    category: 'Asset Management',
    steps: 3,
    avgDuration: '1.2 days',
    successRate: 96,
    lastRun: '2024-01-15 08:00',
    nextRun: '2024-01-22 08:00',
    triggers: ['Maintenance due date approaching'],
    actions: ['Schedule maintenance', 'Notify technician', 'Update asset status'],
    owner: 'Asset Management',
    created: '2023-09-12',
    runs: 67,
    tags: ['Maintenance', 'Asset', 'Scheduling'],
    template: true
  }
];

const statusColors = {
  'Active': 'bg-green-100 text-green-800',
  'Draft': 'bg-yellow-100 text-yellow-800',
  'Paused': 'bg-gray-100 text-gray-800',
  'Error': 'bg-red-100 text-red-800'
};

const categoryIcons = {
  'HR': Users,
  'IT': Settings,
  'Procurement': FileText,
  'Customer Service': MessageSquare,
  'Asset Management': Database
};

const triggerIcons = {
  'New employee added to HR system': Users,
  'Critical incident created': AlertTriangle,
  'License expiry warning (30 days)': Timer,
  'Customer feedback submitted': MessageSquare,
  'Maintenance due date approaching': Clock
};

const actionIcons = {
  'Create accounts': Settings,
  'Assign equipment': Database,
  'Schedule training': Calendar,
  'Notify manager': Mail,
  'Escalate to senior team': ArrowUp,
  'Update status': CheckCircle,
  'Generate quote': FileText,
  'Send approval request': Mail,
  'Process payment': DollarSign,
  'Analyze sentiment': Brain,
  'Route to appropriate team': ArrowRight,
  'Generate response': Bot,
  'Schedule maintenance': Calendar,
  'Notify technician': Mail,
  'Update asset status': Database
};

export default function WorkflowsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const filteredWorkflows = workflowData.filter(workflow => {
    const matchesStatus = filterStatus === 'All' || workflow.status === filterStatus;
    const matchesCategory = filterCategory === 'All' || workflow.category === filterCategory;
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const totalWorkflows = workflowData.length;
  const activeWorkflows = workflowData.filter(w => w.status === 'Active').length;
  const totalRuns = workflowData.reduce((sum, w) => sum + w.runs, 0);
  const avgSuccessRate = Math.round(workflowData.reduce((sum, w) => sum + w.successRate, 0) / workflowData.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workflow & Automation Engine</h1>
          <p className="text-gray-600">Drag-and-drop designer, no-code automation, and AI-powered triggers</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Settings size={20} />
            <span>Templates</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Create Workflow</span>
          </button>
        </div>
      </div>

      {/* Workflow Overview KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Workflows</p>
              <p className="text-2xl font-bold text-gray-900">{totalWorkflows}</p>
              <p className="text-sm text-blue-600">+2 this month</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <Workflow className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Workflows</p>
              <p className="text-2xl font-bold text-gray-900">{activeWorkflows}</p>
              <p className="text-sm text-green-600">{Math.round((activeWorkflows/totalWorkflows)*100)}% active</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <Play className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Runs</p>
              <p className="text-2xl font-bold text-gray-900">{totalRuns}</p>
              <p className="text-sm text-purple-600">This month</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <BarChart3 className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{avgSuccessRate}%</p>
              <p className="text-sm text-green-600">Average across all workflows</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <Target className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Automation Insights */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="text-purple-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">AI-Powered Automation Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="text-yellow-600" size={16} />
              <span className="font-medium">Auto-Triggers</span>
            </div>
            <p className="text-sm text-gray-600">12 AI triggers active</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Bot className="text-blue-600" size={16} />
              <span className="font-medium">Smart Routing</span>
            </div>
            <p className="text-sm text-gray-600">94% accuracy rate</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="text-purple-600" size={16} />
              <span className="font-medium">Sentiment Analysis</span>
            </div>
            <p className="text-sm text-gray-600">Processing 45 requests/day</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="text-green-600" size={16} />
              <span className="font-medium">Optimization</span>
            </div>
            <p className="text-sm text-gray-600">3 workflows optimized</p>
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
                placeholder="Search workflows..."
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
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Paused">Paused</option>
              <option value="Error">Error</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Categories</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Procurement">Procurement</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Asset Management">Asset Management</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <span className="text-sm text-gray-600">Advanced Filters</span>
          </div>
        </div>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredWorkflows.map((workflow) => {
          const CategoryIcon = categoryIcons[workflow.category] || Workflow;
          return (
            <div key={workflow.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <CategoryIcon size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                      <p className="text-sm text-gray-600">{workflow.id}</p>
                    </div>
                    {workflow.template && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Template
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[workflow.status]}`}>
                      {workflow.status}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {workflow.category}
                    </span>
                  </div>

                  {/* Workflow Steps Visualization */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Workflow Steps</span>
                      <span className="text-sm text-gray-600">{workflow.steps} steps</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(workflow.steps, 8) }, (_, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-primary-700">{i + 1}</span>
                          </div>
                          {i < Math.min(workflow.steps, 8) - 1 && (
                            <ArrowRight size={12} className="text-gray-400 mx-1" />
                          )}
                        </div>
                      ))}
                      {workflow.steps > 8 && (
                        <span className="text-xs text-gray-500 ml-2">+{workflow.steps - 8} more</span>
                      )}
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Avg Duration</p>
                      <p className="font-semibold text-gray-900">{workflow.avgDuration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Success Rate</p>
                      <p className="font-semibold text-gray-900">{workflow.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Runs</p>
                      <p className="font-semibold text-gray-900">{workflow.runs}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Owner</p>
                      <p className="font-semibold text-gray-900">{workflow.owner}</p>
                    </div>
                  </div>

                  {/* Triggers */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Triggers</p>
                    <div className="space-y-1">
                      {workflow.triggers.slice(0, 2).map((trigger, idx) => {
                        const TriggerIcon = triggerIcons[trigger] || Zap;
                        return (
                          <div key={idx} className="flex items-center space-x-2">
                            <TriggerIcon size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600">{trigger}</span>
                          </div>
                        );
                      })}
                      {workflow.triggers.length > 2 && (
                        <span className="text-xs text-gray-500">+{workflow.triggers.length - 2} more triggers</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Actions</p>
                    <div className="flex flex-wrap gap-1">
                      {workflow.actions.slice(0, 3).map((action, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {action}
                        </span>
                      ))}
                      {workflow.actions.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{workflow.actions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {workflow.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Play size={16} className="text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Eye size={16} className="text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Edit size={16} className="text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Copy size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>Last: {workflow.lastRun}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Timer size={12} />
                    <span>Next: {workflow.nextRun}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="btn-secondary text-sm">View Details</button>
                  <button className="btn-primary text-sm">Run Now</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



