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
  Activity,
  Layers,
  Shield,
  Globe,
  Code,
  Terminal,
  Cloud,
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
  TrendingUp,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock3,
  EyeOff,
  Unlock,
  Bookmark,
  Star,
  Download,
  Upload
} from 'lucide-react';

// Import workflow components
import WorkflowDashboard from '../components/workflow/WorkflowDashboard';
import WorkflowBuilder from '../components/workflow/WorkflowBuilder';
import ExecutionMonitoring from '../components/workflow/ExecutionMonitoring';
import WorkflowTemplates from '../components/workflow/WorkflowTemplates';
import RoleBasedAccess from '../components/workflow/RoleBasedAccess';
import AIEnhancedWorkflow from '../components/workflow/AIEnhancedWorkflow';

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

const statusColors: { [key: string]: string } = {
  'Active': 'bg-green-100 text-green-800',
  'Draft': 'bg-yellow-100 text-yellow-800',
  'Paused': 'bg-gray-100 text-gray-800',
  'Error': 'bg-red-100 text-red-800'
};

const categoryIcons: { [key: string]: any } = {
  'HR': Users,
  'IT': Settings,
  'Procurement': FileText,
  'Customer Service': MessageSquare,
  'Asset Management': Database
};

const triggerIcons: { [key: string]: any } = {
  'New employee added to HR system': Users,
  'Critical incident created': AlertTriangle,
  'License expiry warning (30 days)': Timer,
  'Customer feedback submitted': MessageSquare,
  'Maintenance due date approaching': Clock
};

const actionIcons: { [key: string]: any } = {
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
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: BarChart3 },
    { id: 'builder', label: 'Workflow Builder', icon: Workflow },
    { id: 'executions', label: 'Executions', icon: Activity },
    { id: 'templates', label: 'Templates', icon: Layers },
    { id: 'ai-features', label: 'AI Features', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'rbac', label: 'Access Control', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <WorkflowDashboard />;
      case 'builder':
        return <WorkflowBuilder />;
      case 'executions':
        return <ExecutionMonitoring />;
      case 'templates':
        return <WorkflowTemplates />;
      case 'ai-features':
        return <AIEnhancedWorkflow />;
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Advanced Analytics</h3>
              <p className="mt-1 text-sm text-gray-500">Coming soon - Detailed workflow analytics and insights</p>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Shield className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Security & Governance</h3>
              <p className="mt-1 text-sm text-gray-500">Coming soon - Advanced security controls and compliance</p>
            </div>
          </div>
        );
      case 'rbac':
        return <RoleBasedAccess />;
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Settings className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Workflow Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Coming soon - Global workflow configuration</p>
            </div>
          </div>
        );
      default:
        return <WorkflowDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
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
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Create Workflow</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
                        );
                      })}
        </nav>
                </div>
                
      {/* Tab Content */}
      <div className="min-h-screen">
        {renderTabContent()}
      </div>
    </div>
  );
}



