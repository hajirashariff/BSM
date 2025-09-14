import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  NodeToolbar,
  Position,
  MarkerType,
  ReactFlowProvider,
  ReactFlowInstance,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Play,
  Pause,
  Save,
  Undo,
  Redo,
  Settings,
  Eye,
  Download,
  Upload,
  Zap,
  Clock,
  Mail,
  Database,
  FileText,
  Bot,
  Brain,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Users,
  Shield,
  Globe,
  Code,
  Terminal,
  Cloud,
  GitBranch,
  Timer,
  MessageSquare,
  Calendar,
  DollarSign,
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
  Plus,
  Trash2,
  Copy,
  Edit,
  MoreHorizontal,
  Search,
  Filter,
  Grid3X3,
  List,
  Kanban,
  TrendingUp,
  Activity,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock3,
  EyeOff,
  Unlock,
  Bookmark,
  Star
} from 'lucide-react';

// Node Types
const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  delay: DelayNode,
  approval: ApprovalNode,
  subworkflow: SubWorkflowNode,
  error: ErrorNode,
};

// Custom Node Components
function TriggerNode({ data, isConnectable }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-blue-200 min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Zap className="text-blue-600" size={16} />
        <div className="font-bold text-blue-600">Trigger</div>
      </div>
      <div className="text-sm text-gray-700">{data.label}</div>
      <div className="text-xs text-gray-500 mt-1">{data.description}</div>
    </div>
  );
}

function ActionNode({ data, isConnectable }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-200 min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Play className="text-green-600" size={16} />
        <div className="font-bold text-green-600">Action</div>
      </div>
      <div className="text-sm text-gray-700">{data.label}</div>
      <div className="text-xs text-gray-500 mt-1">{data.description}</div>
    </div>
  );
}

function ConditionNode({ data, isConnectable }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-yellow-200 min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <GitBranch className="text-yellow-600" size={16} />
        <div className="font-bold text-yellow-600">Condition</div>
      </div>
      <div className="text-sm text-gray-700">{data.label}</div>
      <div className="text-xs text-gray-500 mt-1">{data.description}</div>
    </div>
  );
}

function DelayNode({ data, isConnectable }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-purple-200 min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Timer className="text-purple-600" size={16} />
        <div className="font-bold text-purple-600">Delay</div>
      </div>
      <div className="text-sm text-gray-700">{data.label}</div>
      <div className="text-xs text-gray-500 mt-1">{data.description}</div>
    </div>
  );
}

function ApprovalNode({ data, isConnectable }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-orange-200 min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Users className="text-orange-600" size={16} />
        <div className="font-bold text-orange-600">Approval</div>
      </div>
      <div className="text-sm text-gray-700">{data.label}</div>
      <div className="text-xs text-gray-500 mt-1">{data.description}</div>
    </div>
  );
}

function SubWorkflowNode({ data, isConnectable }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-indigo-200 min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Layers className="text-indigo-600" size={16} />
        <div className="font-bold text-indigo-600">Sub-Workflow</div>
      </div>
      <div className="text-sm text-gray-700">{data.label}</div>
      <div className="text-xs text-gray-500 mt-1">{data.description}</div>
    </div>
  );
}

function ErrorNode({ data, isConnectable }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-red-200 min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <AlertTriangle className="text-red-600" size={16} />
        <div className="font-bold text-red-600">Error Handler</div>
      </div>
      <div className="text-sm text-gray-700">{data.label}</div>
      <div className="text-xs text-gray-500 mt-1">{data.description}</div>
    </div>
  );
}

// Initial nodes and edges
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 25 },
    data: { 
      label: 'New Employee Added',
      description: 'Triggered when HR adds new employee',
      type: 'webhook'
    },
  },
  {
    id: '2',
    type: 'action',
    position: { x: 100, y: 125 },
    data: { 
      label: 'Create Accounts',
      description: 'Create email, Slack, and system accounts',
      type: 'api'
    },
  },
  {
    id: '3',
    type: 'action',
    position: { x: 400, y: 125 },
    data: { 
      label: 'Assign Equipment',
      description: 'Assign laptop and office equipment',
      type: 'database'
    },
  },
  {
    id: '4',
    type: 'condition',
    position: { x: 250, y: 225 },
    data: { 
      label: 'Department Check',
      description: 'Check if employee is in IT department',
      type: 'condition'
    },
  },
  {
    id: '5',
    type: 'action',
    position: { x: 100, y: 325 },
    data: { 
      label: 'Schedule Training',
      description: 'Schedule IT-specific training',
      type: 'calendar'
    },
  },
  {
    id: '6',
    type: 'action',
    position: { x: 400, y: 325 },
    data: { 
      label: 'Send Welcome Email',
      description: 'Send general welcome email',
      type: 'email'
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

// Node Palette Component
function NodePalette() {
  const nodeTypes = [
    { type: 'trigger', label: 'Trigger', icon: Zap, color: 'blue', description: 'Start workflow execution' },
    { type: 'action', label: 'Action', icon: Play, color: 'green', description: 'Perform an action' },
    { type: 'condition', label: 'Condition', icon: GitBranch, color: 'yellow', description: 'Branch based on condition' },
    { type: 'delay', label: 'Delay', icon: Timer, color: 'purple', description: 'Wait for specified time' },
    { type: 'approval', label: 'Approval', icon: Users, color: 'orange', description: 'Human approval required' },
    { type: 'subworkflow', label: 'Sub-Workflow', icon: Layers, color: 'indigo', description: 'Call another workflow' },
    { type: 'error', label: 'Error Handler', icon: AlertTriangle, color: 'red', description: 'Handle errors' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Node Palette</h3>
      <div className="space-y-2">
        {nodeTypes.map((nodeType) => {
          const Icon = nodeType.icon;
          return (
            <div
              key={nodeType.type}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              draggable
            >
              <div className={`p-2 bg-${nodeType.color}-100 rounded-lg`}>
                <Icon className={`text-${nodeType.color}-600`} size={16} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{nodeType.label}</div>
                <div className="text-xs text-gray-500">{nodeType.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Main Workflow Builder Component
function WorkflowBuilderContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [workflowName, setWorkflowName] = useState('Employee Onboarding');
  const [workflowDescription, setWorkflowDescription] = useState('Automated workflow for new employee setup');
  const [isSimulationMode, setIsSimulationMode] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const handleSave = () => {
    console.log('Saving workflow:', { nodes, edges, workflowName, workflowDescription });
    // Save logic here
  };

  const handleRun = () => {
    setIsRunning(true);
    // Run logic here
    setTimeout(() => setIsRunning(false), 3000);
  };

  const handleSimulate = () => {
    setIsSimulationMode(!isSimulationMode);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Node Palette */}
      <NodePalette />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <input
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="text-xl font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0"
                />
                <input
                  type="text"
                  value={workflowDescription}
                  onChange={(e) => setWorkflowDescription(e.target.value)}
                  className="text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 w-full"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSimulate}
                className={`btn-secondary flex items-center space-x-2 ${isSimulationMode ? 'bg-blue-100 text-blue-700' : ''}`}
              >
                <Eye size={16} />
                <span>Simulate</span>
              </button>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="btn-primary flex items-center space-x-2"
              >
                {isRunning ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    <span>Run</span>
                  </>
                )}
              </button>
              <button onClick={handleSave} className="btn-secondary flex items-center space-x-2">
                <Save size={16} />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* React Flow Canvas */}
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>

        {/* Properties Panel */}
        {selectedNode && (
          <div className="w-80 bg-white border-l border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Node Properties</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input
                  type="text"
                  value={selectedNode.data.label}
                  onChange={(e) => {
                    setNodes((nds) =>
                      nds.map((node) =>
                        node.id === selectedNode.id
                          ? { ...node, data: { ...node.data, label: e.target.value } }
                          : node
                      )
                    );
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={selectedNode.data.description}
                  onChange={(e) => {
                    setNodes((nds) =>
                      nds.map((node) =>
                        node.id === selectedNode.id
                          ? { ...node, data: { ...node.data, description: e.target.value } }
                          : node
                      )
                    );
                  }}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={selectedNode.data.type}
                  onChange={(e) => {
                    setNodes((nds) =>
                      nds.map((node) =>
                        node.id === selectedNode.id
                          ? { ...node, data: { ...node.data, type: e.target.value } }
                          : node
                      )
                    );
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="webhook">Webhook</option>
                  <option value="api">API Call</option>
                  <option value="database">Database</option>
                  <option value="email">Email</option>
                  <option value="calendar">Calendar</option>
                  <option value="condition">Condition</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Export Component
export default function WorkflowBuilder() {
  return (
    <ReactFlowProvider>
      <WorkflowBuilderContent />
    </ReactFlowProvider>
  );
}



