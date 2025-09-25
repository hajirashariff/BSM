import React, { useState, useCallback, useEffect } from 'react';
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
  Position,
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Play,
  Pause,
  Save,
  Eye,
  Zap,
  Timer,
  Users,
  AlertTriangle,
  GitBranch,
  Layers,
  Plus,
  Minus,
  Maximize,
  Minimize,
  Grid3X3,
  RefreshCw,
  XCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
  FileText,
  Edit3,
  Info,
  CheckCircle,
  X,
  Trash,
} from 'lucide-react';

// Transition State Interfaces
interface TransitionCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface TransitionAction {
  id: string;
  type: 'notification' | 'log' | 'update_field';
  config: any;
}

interface TransitionState {
  id: string;
  label: string;
  description: string;
  conditions: TransitionCondition[];
  conditionLogic: 'AND' | 'OR';
  priority: number;
  timeout?: number;
  fallbackNodeId?: string;
  preActions: TransitionAction[];
  status: 'active' | 'failed' | 'pending';
  color: string;
}

// Palette Items
const paletteItems = {
  conditions: [
    { id: 'priority', label: 'Priority', icon: AlertTriangle, color: 'red' },
    { id: 'department', label: 'Department', icon: Users, color: 'blue' },
    { id: 'status', label: 'Status', icon: CheckCircle, color: 'green' },
    { id: 'sla', label: 'SLA', icon: Timer, color: 'yellow' },
    { id: 'custom', label: 'Custom Field', icon: Settings, color: 'purple' },
  ],
  actions: [
    { id: 'notify', label: 'Notify', icon: Bell, color: 'blue' },
    { id: 'update', label: 'Update Field', icon: Edit3, color: 'green' },
    { id: 'escalate', label: 'Escalate', icon: AlertTriangle, color: 'red' },
    { id: 'log', label: 'Log Entry', icon: FileText, color: 'gray' },
  ],
};

// Simple Node Components
function TriggerNode({ data, isConnectable, selected }: any) {
  return (
    <div className={`px-3 py-2 shadow-md rounded-md bg-white border-2 min-w-[160px] transition-all duration-300 ${
      selected ? 'border-blue-500 shadow-blue-100' : 'border-blue-200'
    }`}>
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ background: '#3B82F6', width: 6, height: 6 }}
        isConnectable={isConnectable}
      />
      <div className="flex items-center space-x-1.5 mb-1">
        <div className="p-0.5 rounded-full bg-blue-50">
          <Zap className="text-blue-600" size={12} />
        </div>
        <div className="font-semibold text-blue-600 text-xs">Trigger</div>
      </div>
      <div className="text-xs font-medium text-gray-800 leading-tight">{data.label}</div>
      <div className="text-xs text-gray-500 mt-0.5 leading-tight">{data.description}</div>
    </div>
  );
}

function ActionNode({ data, isConnectable, selected }: any) {
  return (
    <div className={`px-3 py-2 shadow-md rounded-md bg-white border-2 min-w-[160px] transition-all duration-300 ${
      selected ? 'border-green-500 shadow-green-100' : 'border-green-200'
    }`}>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ background: '#10B981', width: 6, height: 6 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ background: '#10B981', width: 6, height: 6 }}
        isConnectable={isConnectable}
      />
      <div className="flex items-center space-x-1.5 mb-1">
        <div className="p-0.5 rounded-full bg-green-50">
          <Play className="text-green-600" size={12} />
        </div>
        <div className="font-semibold text-green-600 text-xs">Action</div>
      </div>
      <div className="text-xs font-medium text-gray-800 leading-tight">{data.label}</div>
      <div className="text-xs text-gray-500 mt-0.5 leading-tight">{data.description}</div>
    </div>
  );
}

function ConditionNode({ data, isConnectable, selected }: any) {
  return (
    <div className={`px-3 py-2 shadow-md rounded-md bg-white border-2 min-w-[160px] transition-all duration-300 ${
      selected ? 'border-yellow-500 shadow-yellow-100' : 'border-yellow-200'
    }`}>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ background: '#F59E0B', width: 6, height: 6 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{ background: '#F59E0B', width: 6, height: 6 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ background: '#F59E0B', width: 6, height: 6 }}
        isConnectable={isConnectable}
      />
      <div className="flex items-center space-x-1.5 mb-1">
        <div className="p-0.5 rounded-full bg-yellow-50">
          <GitBranch className="text-yellow-600" size={12} />
        </div>
        <div className="font-semibold text-yellow-600 text-xs">Condition</div>
      </div>
      <div className="text-xs font-medium text-gray-800 leading-tight">{data.label}</div>
      <div className="text-xs text-gray-500 mt-0.5 leading-tight">{data.description}</div>
    </div>
  );
}

// Node Types
const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
};

// Initial nodes and edges
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 30 },
    data: { 
      label: 'New Employee Added',
      description: 'Triggered when HR adds new employee',
      type: 'webhook'
    },
  },
  {
    id: '2',
    type: 'action',
    position: { x: 250, y: 140 },
    data: { 
      label: 'Create Accounts',
      description: 'Create email, Slack, and system accounts',
      type: 'api'
    },
  },
  {
    id: '3',
    type: 'action',
    position: { x: 250, y: 250 },
    data: { 
      label: 'Assign Equipment',
      description: 'Assign laptop and office equipment',
      type: 'database'
    },
  },
  {
    id: '4',
    type: 'condition',
    position: { x: 250, y: 360 },
    data: { 
      label: 'Department Check',
      description: 'Check if employee is in IT department',
      type: 'condition'
    },
  },
  {
    id: '5',
    type: 'action',
    position: { x: 120, y: 470 },
    data: { 
      label: 'Schedule Training',
      description: 'Schedule IT-specific training',
      type: 'calendar'
    },
  },
  {
    id: '6',
    type: 'action',
    position: { x: 380, y: 470 },
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
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: '#94A3B8', strokeWidth: 2 },
    data: {
      transitionState: {
        id: 't1-2',
        label: 'Account Creation',
        description: 'Transition to create user accounts',
        conditions: [],
        conditionLogic: 'AND',
        priority: 1,
        status: 'active',
        color: '#94A3B8',
        preActions: [],
      }
    }
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: '#94A3B8', strokeWidth: 2 },
    data: {
      transitionState: {
        id: 't2-3',
        label: 'Equipment Assignment',
        description: 'Transition to assign equipment',
        conditions: [],
        conditionLogic: 'AND',
        priority: 1,
        status: 'active',
        color: '#94A3B8',
        preActions: [],
      }
    }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: '#94A3B8', strokeWidth: 2 },
    data: {
      transitionState: {
        id: 't3-4',
        label: 'Department Check',
        description: 'Transition to check department',
        conditions: [],
        conditionLogic: 'AND',
        priority: 1,
        status: 'active',
        color: '#94A3B8',
        preActions: [],
      }
    }
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    sourceHandle: 'left',
    targetHandle: 'top',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: '#3B82F6', strokeWidth: 2 },
    label: 'Yes ⚡',
    labelStyle: { fill: '#3B82F6', fontWeight: 600 },
    data: {
      transitionState: {
        id: 't4-5',
        label: 'IT Training Path',
        description: 'Transition for IT department employees',
        conditions: [
          {
            id: 'cond1',
            field: 'department',
            operator: '=',
            value: 'IT'
          }
        ],
        conditionLogic: 'AND',
        priority: 1,
        status: 'active',
        color: '#3B82F6',
        preActions: [],
      }
    }
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    sourceHandle: 'right',
    targetHandle: 'top',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: '#10B981', strokeWidth: 2 },
    label: 'No ⚡',
    labelStyle: { fill: '#10B981', fontWeight: 600 },
    data: {
      transitionState: {
        id: 't4-6',
        label: 'General Welcome',
        description: 'Transition for non-IT department employees',
        conditions: [
          {
            id: 'cond2',
            field: 'department',
            operator: '!=',
            value: 'IT'
          }
        ],
        conditionLogic: 'AND',
        priority: 1,
        status: 'active',
        color: '#10B981',
        preActions: [],
      }
    }
  },
];

// Simple Transition Dialogue Box Component
function TransitionDialogueBox({ 
  isOpen, 
  onClose, 
  transition, 
  onSave, 
  onDelete 
}: {
  isOpen: boolean;
  onClose: () => void;
  transition: TransitionState | null;
  onSave: (transition: TransitionState) => void;
  onDelete: () => void;
}) {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  
  useEffect(() => {
    if (transition) {
      setLabel(transition.label);
      setDescription(transition.description);
    }
  }, [transition]);

  if (!isOpen || !transition) {
    return null;
  }

  const handleSave = () => {
    onSave({
      ...transition,
      label,
      description,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Transition Configuration</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transition Label</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Escalate to Manager"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Describe what this transition does..."
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Current Conditions</h3>
            {transition.conditions.length > 0 ? (
              <div className="space-y-2">
                {transition.conditions.map((condition, index) => (
                  <div key={condition.id} className="text-sm text-gray-600">
                    {condition.field} {condition.operator} {condition.value}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No conditions set</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onDelete}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash size={16} />
            <span>Delete Transition</span>
          </button>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Transition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Workflow Builder Component
function WorkflowBuilderContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [isTransitionDialogueOpen, setIsTransitionDialogueOpen] = useState(false);
  const [currentTransition, setCurrentTransition] = useState<TransitionState | null>(null);
  const [isPaletteCollapsed, setIsPaletteCollapsed] = useState(false);
  const [workflowName, setWorkflowName] = useState('Employee Onboarding');
  const [workflowDescription, setWorkflowDescription] = useState('Automated workflow for new employee setup');
  const [isRunning, setIsRunning] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const reactFlowInstance = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: '#94A3B8', strokeWidth: 2 },
        data: {
          transitionState: {
            id: `t${params.source}-${params.target}`,
            label: 'New Transition',
            description: 'Configure this transition',
            conditions: [],
            conditionLogic: 'AND',
            priority: 1,
            status: 'active',
            color: '#94A3B8',
            preActions: [],
          }
        }
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onNodeClick = useCallback((event: any, node: any) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const onEdgeClick = useCallback((event: any, edge: any) => {
    event.stopPropagation();
    setSelectedEdge(edge);
    setSelectedNode(null);
    
    const transitionState = edge.data?.transitionState || {
      id: edge.id,
      label: edge.label || 'Transition',
      description: 'Configure this transition',
      conditions: [],
      conditionLogic: 'AND',
      priority: 1,
      status: 'active',
      color: edge.style?.stroke || '#94A3B8',
      preActions: [],
    };
    
    setCurrentTransition(transitionState);
    setIsTransitionDialogueOpen(true);
  }, []);

  const handleTransitionSave = useCallback((transition: TransitionState) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === selectedEdge?.id
          ? {
              ...edge,
              data: { ...edge.data, transitionState: transition },
              style: {
                ...edge.style,
                stroke: transition.status === 'failed' ? '#EF4444' : 
                       transition.conditions.length > 0 ? '#3B82F6' : '#94A3B8',
                strokeWidth: transition.status === 'failed' ? 3 : 2,
              },
              label: transition.conditions.length > 0 ? `${transition.label} ⚡` : transition.label,
              labelStyle: { fill: transition.status === 'failed' ? '#EF4444' : '#374151', fontWeight: 600 },
            }
          : edge
      )
    );
    setIsTransitionDialogueOpen(false);
    setSelectedEdge(null);
    setCurrentTransition(null);
  }, [selectedEdge, setEdges]);

  const handleTransitionCancel = useCallback(() => {
    setIsTransitionDialogueOpen(false);
    setSelectedEdge(null);
    setCurrentTransition(null);
  }, []);

  const handleTransitionDelete = useCallback(() => {
    if (selectedEdge) {
      setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge.id));
    }
    setIsTransitionDialogueOpen(false);
    setSelectedEdge(null);
    setCurrentTransition(null);
  }, [selectedEdge, setEdges]);

  const handleSave = () => {
    console.log('Saving workflow:', { nodes, edges, workflowName, workflowDescription });
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 3000);
  };

  const handleAutoArrange = () => {
    const layoutedNodes = nodes.map((node, index) => ({
      ...node,
      position: {
        x: 300 + (index % 2) * 300,
        y: 50 + Math.floor(index / 2) * 200,
      },
    }));
    setNodes(layoutedNodes);
    reactFlowInstance.fitView();
  };

  const handleZoomIn = () => {
    reactFlowInstance.zoomIn();
  };

  const handleZoomOut = () => {
    reactFlowInstance.zoomOut();
  };

  const handleFitView = () => {
    reactFlowInstance.fitView();
  };

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`flex bg-gray-50 transition-all duration-300 ${isFullScreen ? 'fixed inset-0 z-50 h-screen' : 'h-screen'}`}>
      {/* Palette Sidebar */}
      {!isFullScreen && (
        <div className={`bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ${
          isPaletteCollapsed ? 'w-12' : 'w-64'
        }`}>
          {isPaletteCollapsed ? (
            <div className="p-2">
              <button
                onClick={() => setIsPaletteCollapsed(false)}
                className="w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Expand Palette"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Palette</h3>
                <button
                  onClick={() => setIsPaletteCollapsed(true)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Collapse Palette"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>
              
              {/* Conditions */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <GitBranch size={14} className="mr-2" />
                  Conditions
                </h4>
                <div className="space-y-2">
                  {paletteItems.conditions.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('application/json', JSON.stringify({
                            type: 'condition',
                            id: item.id,
                            label: item.label,
                          }));
                        }}
                      >
                        <div className="p-1 rounded-full bg-gray-100">
                          <IconComponent className="text-gray-600" size={14} />
                        </div>
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Play size={14} className="mr-2" />
                  Actions
                </h4>
                <div className="space-y-2">
                  {paletteItems.actions.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('application/json', JSON.stringify({
                            type: 'action',
                            id: item.id,
                            label: item.label,
                          }));
                        }}
                      >
                        <div className="p-1 rounded-full bg-gray-100">
                          <IconComponent className="text-gray-600" size={14} />
                        </div>
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
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
              {/* Layout Controls */}
              <div className="flex items-center space-x-1 border-r border-gray-200 pr-4">
                <button
                  onClick={handleAutoArrange}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Auto Arrange"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Zoom In"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Zoom Out"
                >
                  <Minus size={16} />
                </button>
                <button
                  onClick={handleFitView}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Fit View"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={handleFullScreen}
                  className={`p-2 rounded-lg transition-colors ${
                    isFullScreen 
                      ? 'text-blue-600 bg-blue-100 hover:bg-blue-200' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
                >
                  {isFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
                </button>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
              <button 
                onClick={handleSave} 
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
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
            onEdgeClick={onEdgeClick}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
            minZoom={0.1}
            maxZoom={2}
            panOnDrag={true}
            selectNodesOnDrag={false}
            nodesDraggable={true}
            nodesConnectable={true}
            elementsSelectable={true}
            deleteKeyCode={['Backspace', 'Delete']}
            multiSelectionKeyCode={['Meta', 'Ctrl']}
          >
            <Controls 
              position="top-right"
              showZoom={false}
              showFitView={false}
              showInteractive={false}
            />
            <MiniMap 
              position="bottom-left"
              nodeColor={(node) => {
                switch (node.type) {
                  case 'trigger': return '#3B82F6';
                  case 'action': return '#10B981';
                  case 'condition': return '#F59E0B';
                  default: return '#94A3B8';
                }
              }}
              maskColor="rgba(0, 0, 0, 0.1)"
            />
            <Background 
              variant="dots" 
              gap={20} 
              size={1.5} 
              color="#E5E7EB"
              className="opacity-50"
            />
          </ReactFlow>
        </div>

        {/* Properties Panel */}
        {selectedNode && !isFullScreen && (
          <div className="w-80 bg-white border-l border-gray-200 p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Node Properties</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <XCircle size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Type:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedNode.type === 'trigger' ? 'bg-blue-100 text-blue-800' :
                  selectedNode.type === 'action' ? 'bg-green-100 text-green-800' :
                  selectedNode.type === 'condition' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedNode.type?.charAt(0).toUpperCase() + selectedNode.type?.slice(1)}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={() => {
                    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
                    setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
                    setSelectedNode(null);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Delete Node</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transition Dialogue Box */}
      <TransitionDialogueBox
        isOpen={isTransitionDialogueOpen}
        onClose={handleTransitionCancel}
        transition={currentTransition}
        onSave={handleTransitionSave}
        onDelete={handleTransitionDelete}
      />
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
