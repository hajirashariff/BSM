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
  Plug,
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

export default function WorkflowBuilder() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');

  const nodeTypes = [
    { id: 'trigger', name: 'Trigger', icon: Zap, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'action', name: 'Action', icon: Play, color: 'bg-blue-100 text-blue-800' },
    { id: 'condition', name: 'Condition', icon: GitBranch, color: 'bg-green-100 text-green-800' },
    { id: 'delay', name: 'Delay', icon: Clock, color: 'bg-purple-100 text-purple-800' },
    { id: 'notification', name: 'Notification', icon: Mail, color: 'bg-orange-100 text-orange-800' },
    { id: 'integration', name: 'Integration', icon: Plug, color: 'bg-indigo-100 text-indigo-800' }
  ];

  const workflowSteps = [
    { id: 'step1', type: 'trigger', name: 'New Employee Added', x: 100, y: 100 },
    { id: 'step2', type: 'action', name: 'Create Accounts', x: 300, y: 100 },
    { id: 'step3', type: 'action', name: 'Assign Equipment', x: 500, y: 100 },
    { id: 'step4', type: 'notification', name: 'Notify Manager', x: 700, y: 100 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Workflow Builder</h2>
          <p className="text-gray-600">Drag and drop to create automated workflows</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Download size={20} />
            <span>Export</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Upload size={20} />
            <span>Import</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Play size={20} />
            <span>Test Workflow</span>
          </button>
        </div>
      </div>

      {/* Workflow Details */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Workflow Name</label>
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              placeholder="Enter workflow name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              value={workflowDescription}
              onChange={(e) => setWorkflowDescription(e.target.value)}
              placeholder="Enter workflow description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Node Palette */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Nodes</h3>
          <div className="space-y-2">
            {nodeTypes.map((nodeType) => {
              const Icon = nodeType.icon;
              return (
                <div
                  key={nodeType.id}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  draggable
                >
                  <div className={`p-2 rounded-lg ${nodeType.color}`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{nodeType.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="lg:col-span-3">
          <div className="card h-96 bg-gray-50 relative overflow-hidden">
            <div className="absolute inset-0">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}></div>
              
              {/* Workflow Steps */}
              {workflowSteps.map((step) => {
                const nodeType = nodeTypes.find(nt => nt.type === step.type);
                const Icon = nodeType?.icon || Workflow;
                return (
                  <div
                    key={step.id}
                    className="absolute w-32 h-20 bg-white border-2 border-gray-300 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    style={{ left: step.x, top: step.y }}
                    onClick={() => setSelectedNode(step)}
                  >
                    <div className="p-2 h-full flex flex-col items-center justify-center">
                      <Icon size={20} className="text-gray-600 mb-1" />
                      <span className="text-xs text-center text-gray-700">{step.name}</span>
                    </div>
                  </div>
                );
              })}

              {/* Connection Lines */}
              <svg className="absolute inset-0 pointer-events-none">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                  </marker>
                </defs>
                <line x1="232" y1="110" x2="300" y2="110" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="432" y1="110" x2="500" y2="110" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="632" y1="110" x2="700" y2="110" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Panel */}
      {selectedNode && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Node Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Node Name</label>
              <input
                type="text"
                defaultValue={selectedNode.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Node Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="trigger">Trigger</option>
                <option value="action">Action</option>
                <option value="condition">Condition</option>
                <option value="delay">Delay</option>
                <option value="notification">Notification</option>
                <option value="integration">Integration</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}






