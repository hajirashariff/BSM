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
  ArrowUp,
  GitBranch,
  Timer,
  Mail,
  MessageSquare,
  Database,
  FileText,
  Bot,
  Brain,
  Target,
  BarChart3,
  Calendar,
  DollarSign,
  Grid3X3,
  List,
  Kanban,
  TrendingUp,
  Activity,
  Shield,
  Globe,
  Download,
  Upload,
  Star,
  Bookmark,
  MoreHorizontal,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock3,
  Layers,
  GitCommit,
  History,
  Share2,
  Lock,
  Unlock,
  EyeOff,
  Archive,
  Tag,
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  Filter as FilterIcon,
  SortAsc,
  SortDesc
} from 'lucide-react';

// Mock data for workflows
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
    template: true,
    version: '2.1.0',
    lastModified: '2024-01-10',
    workspace: 'HR Operations',
    priority: 'High',
    health: 'Excellent',
    cost: '$45.20',
    executionTime: '2.8h',
    failureCount: 3,
    lastFailure: '2024-01-05',
    permissions: {
      view: ['HR Team', 'IT Admin'],
      edit: ['HR Team'],
      execute: ['HR Team', 'Manager']
    }
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
    template: false,
    version: '1.5.2',
    lastModified: '2024-01-12',
    workspace: 'IT Operations',
    priority: 'Critical',
    health: 'Good',
    cost: '$23.50',
    executionTime: '1.5h',
    failureCount: 1,
    lastFailure: '2023-12-20',
    permissions: {
      view: ['IT Team', 'Manager'],
      edit: ['IT Admin'],
      execute: ['IT Team', 'Manager']
    }
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
    template: true,
    version: '0.9.1',
    lastModified: '2024-01-14',
    workspace: 'Procurement',
    priority: 'Medium',
    health: 'Unknown',
    cost: '$0.00',
    executionTime: 'N/A',
    failureCount: 0,
    lastFailure: 'N/A',
    permissions: {
      view: ['Procurement Team'],
      edit: ['Procurement Team'],
      execute: ['Procurement Team']
    }
  }
];

const statusColors = {
  'Active': 'bg-green-100 text-green-800',
  'Draft': 'bg-yellow-100 text-yellow-800',
  'Paused': 'bg-gray-100 text-gray-800',
  'Error': 'bg-red-100 text-red-800',
  'Archived': 'bg-gray-100 text-gray-600'
};

const priorityColors = {
  'Critical': 'bg-red-100 text-red-800',
  'High': 'bg-orange-100 text-orange-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'Low': 'bg-green-100 text-green-800'
};

const healthColors = {
  'Excellent': 'bg-green-100 text-green-800',
  'Good': 'bg-blue-100 text-blue-800',
  'Warning': 'bg-yellow-100 text-yellow-800',
  'Critical': 'bg-red-100 text-red-800',
  'Unknown': 'bg-gray-100 text-gray-800'
};

export default function WorkflowDashboard() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterWorkspace, setFilterWorkspace] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('lastModified');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedWorkflows, setSelectedWorkflows] = useState([]);

  const filteredWorkflows = workflowData.filter(workflow => {
    const matchesStatus = filterStatus === 'All' || workflow.status === filterStatus;
    const matchesCategory = filterCategory === 'All' || workflow.category === filterCategory;
    const matchesWorkspace = filterWorkspace === 'All' || workflow.workspace === filterWorkspace;
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesCategory && matchesWorkspace && matchesSearch;
  });

  const totalWorkflows = workflowData.length;
  const activeWorkflows = workflowData.filter(w => w.status === 'Active').length;
  const draftWorkflows = workflowData.filter(w => w.status === 'Draft').length;
  const totalRuns = workflowData.reduce((sum, w) => sum + w.runs, 0);
  const avgSuccessRate = Math.round(workflowData.reduce((sum, w) => sum + w.successRate, 0) / workflowData.length);
  const totalCost = workflowData.reduce((sum, w) => sum + parseFloat(w.cost.replace('$', '')), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflow</h1>
          <p className="text-gray-600">Enterprise-grade automation platform with drag-and-drop workflow builder</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Upload size={20} />
            <span>Import</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Download size={20} />
            <span>Export</span>
          </button>
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="card min-h-[120px]">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1 pr-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Total Workflows</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{totalWorkflows}</p>
              <p className="text-sm text-blue-600">+2 this month</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Workflow className="text-blue-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="card min-h-[120px]">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1 pr-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Active</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{activeWorkflows}</p>
              <p className="text-sm text-green-600">{Math.round((activeWorkflows/totalWorkflows)*100)}%</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
              <Play className="text-green-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="card min-h-[120px]">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1 pr-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Draft</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{draftWorkflows}</p>
              <p className="text-sm text-yellow-600">Pending review</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center flex-shrink-0">
              <Edit className="text-yellow-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="card min-h-[120px]">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1 pr-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Total Runs</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{totalRuns}</p>
              <p className="text-sm text-purple-600">This month</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="card min-h-[120px]">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1 pr-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{avgSuccessRate}%</p>
              <p className="text-sm text-green-600">Average</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
              <Target className="text-green-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="card min-h-[120px]">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1 pr-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">${totalCost.toFixed(2)}</p>
              <p className="text-sm text-gray-600">This month</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
              <DollarSign className="text-gray-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Insights */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Brain className="text-purple-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">AI-Powered Automation Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">
                <Zap className="text-yellow-600" size={14} />
              </div>
              <span className="font-medium">Auto-Triggers</span>
            </div>
            <p className="text-sm text-gray-600">12 AI triggers active</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                <Bot className="text-blue-600" size={14} />
              </div>
              <span className="font-medium">Smart Routing</span>
            </div>
            <p className="text-sm text-gray-600">94% accuracy rate</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                <Brain className="text-purple-600" size={14} />
              </div>
              <span className="font-medium">Sentiment Analysis</span>
            </div>
            <p className="text-sm text-gray-600">Processing 45 requests/day</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                <Target className="text-green-600" size={14} />
              </div>
              <span className="font-medium">Optimization</span>
            </div>
            <p className="text-sm text-gray-600">3 workflows optimized</p>
          </div>
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
                placeholder="Search workflows, tags, owners..."
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
              <option value="Archived">Archived</option>
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
            <select
              value={filterWorkspace}
              onChange={(e) => setFilterWorkspace(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Workspaces</option>
              <option value="HR Operations">HR Operations</option>
              <option value="IT Operations">IT Operations</option>
              <option value="Procurement">Procurement</option>
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
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-2 rounded ${viewMode === 'kanban' ? 'bg-white shadow-sm' : ''}`}
              >
                <Kanban size={16} />
              </button>
            </div>
            <button className="btn-secondary flex items-center space-x-2">
              <FilterIcon size={16} />
              <span>Advanced</span>
            </button>
          </div>
        </div>
      </div>

      {/* Workflows Grid/List View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredWorkflows.map((workflow) => (
            <div key={workflow.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Workflow size={18} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
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
                    <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[workflow.priority]}`}>
                      {workflow.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${healthColors[workflow.health]}`}>
                      {workflow.health}
                    </span>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Success Rate</p>
                      <p className="font-semibold text-gray-900">{workflow.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Runs</p>
                      <p className="font-semibold text-gray-900">{workflow.runs}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Cost</p>
                      <p className="font-semibold text-gray-900">{workflow.cost}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Version</p>
                      <p className="font-semibold text-gray-900">{workflow.version}</p>
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
                    <Users size={12} />
                    <span>{workflow.owner}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="btn-secondary text-sm">View Details</button>
                  <button className="btn-primary text-sm">Run Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Success Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Runs</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Cost</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Last Run</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkflows.map((workflow) => (
                  <tr key={workflow.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Workflow size={14} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{workflow.name}</p>
                          <p className="text-sm text-gray-600">{workflow.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[workflow.status]}`}>
                        {workflow.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {workflow.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{workflow.successRate}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{workflow.runs}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{workflow.cost}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{workflow.lastRun}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Play size={14} className="text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Eye size={14} className="text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit size={14} className="text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreHorizontal size={14} className="text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}




