import React, { useState } from 'react';
import {
  Play,
  Pause,
  Square,
  RefreshCw,
  Eye,
  Download,
  Filter,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  BarChart3,
  TrendingUp,
  Users,
  Zap,
  Timer,
  Database,
  Mail,
  Globe,
  Shield,
  Target,
  Brain,
  Bot,
  Calendar,
  DollarSign,
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
  GitBranch,
  MessageSquare,
  FileText,
  Settings,
  Code,
  Terminal,
  Cloud
} from 'lucide-react';

// Mock execution data
const executionData = [
  {
    id: 'EXEC-001',
    workflowId: 'WF-001',
    workflowName: 'Employee Onboarding',
    status: 'Completed',
    startTime: '2024-01-15 09:30:00',
    endTime: '2024-01-15 12:15:00',
    duration: '2h 45m',
    steps: 7,
    completedSteps: 7,
    failedSteps: 0,
    successRate: 100,
    cost: '$12.50',
    triggeredBy: 'HR System',
    triggeredByUser: 'john.doe@company.com',
    environment: 'Production',
    version: '2.1.0',
    logs: [
      { timestamp: '09:30:00', level: 'INFO', message: 'Workflow started', step: 'Trigger' },
      { timestamp: '09:30:15', level: 'INFO', message: 'Creating email account', step: 'Create Accounts' },
      { timestamp: '09:30:45', level: 'INFO', message: 'Email account created successfully', step: 'Create Accounts' },
      { timestamp: '09:31:00', level: 'INFO', message: 'Assigning equipment', step: 'Assign Equipment' },
      { timestamp: '09:31:30', level: 'INFO', message: 'Equipment assigned successfully', step: 'Assign Equipment' },
      { timestamp: '09:32:00', level: 'INFO', message: 'Checking department', step: 'Department Check' },
      { timestamp: '09:32:15', level: 'INFO', message: 'Employee is in IT department', step: 'Department Check' },
      { timestamp: '09:32:30', level: 'INFO', message: 'Scheduling IT training', step: 'Schedule Training' },
      { timestamp: '09:33:00', level: 'INFO', message: 'Training scheduled successfully', step: 'Schedule Training' },
      { timestamp: '12:15:00', level: 'SUCCESS', message: 'Workflow completed successfully', step: 'Complete' }
    ],
    metrics: {
      totalSteps: 7,
      completedSteps: 7,
      failedSteps: 0,
      skippedSteps: 0,
      avgStepTime: '23m 30s',
      totalCost: '$12.50',
      resourceUsage: {
        cpu: '45%',
        memory: '2.1GB',
        storage: '150MB'
      }
    }
  },
  {
    id: 'EXEC-002',
    workflowId: 'WF-002',
    workflowName: 'IT Incident Escalation',
    status: 'Running',
    startTime: '2024-01-15 14:20:00',
    endTime: null,
    duration: '1h 15m',
    steps: 5,
    completedSteps: 3,
    failedSteps: 0,
    successRate: 100,
    cost: '$8.75',
    triggeredBy: 'Monitoring System',
    triggeredByUser: 'system',
    environment: 'Production',
    version: '1.5.2',
    logs: [
      { timestamp: '14:20:00', level: 'INFO', message: 'Critical incident detected', step: 'Trigger' },
      { timestamp: '14:20:15', level: 'INFO', message: 'Notifying manager', step: 'Notify Manager' },
      { timestamp: '14:20:45', level: 'INFO', message: 'Manager notified successfully', step: 'Notify Manager' },
      { timestamp: '14:21:00', level: 'INFO', message: 'Escalating to senior team', step: 'Escalate Team' },
      { timestamp: '14:21:30', level: 'INFO', message: 'Senior team notified', step: 'Escalate Team' },
      { timestamp: '14:22:00', level: 'INFO', message: 'Updating incident status', step: 'Update Status' }
    ],
    metrics: {
      totalSteps: 5,
      completedSteps: 3,
      failedSteps: 0,
      skippedSteps: 0,
      avgStepTime: '15m 00s',
      totalCost: '$8.75',
      resourceUsage: {
        cpu: '32%',
        memory: '1.8GB',
        storage: '95MB'
      }
    }
  },
  {
    id: 'EXEC-003',
    workflowId: 'WF-004',
    workflowName: 'Customer Feedback Processing',
    status: 'Failed',
    startTime: '2024-01-15 16:45:00',
    endTime: '2024-01-15 17:30:00',
    duration: '45m',
    steps: 4,
    completedSteps: 2,
    failedSteps: 1,
    successRate: 50,
    cost: '$5.25',
    triggeredBy: 'Customer Portal',
    triggeredByUser: 'customer@example.com',
    environment: 'Production',
    version: '1.2.1',
    logs: [
      { timestamp: '16:45:00', level: 'INFO', message: 'Customer feedback received', step: 'Trigger' },
      { timestamp: '16:45:15', level: 'INFO', message: 'Analyzing sentiment', step: 'Analyze Sentiment' },
      { timestamp: '16:46:00', level: 'INFO', message: 'Sentiment analysis completed', step: 'Analyze Sentiment' },
      { timestamp: '16:46:15', level: 'INFO', message: 'Routing to appropriate team', step: 'Route Team' },
      { timestamp: '17:30:00', level: 'ERROR', message: 'Failed to generate response: API timeout', step: 'Generate Response' }
    ],
    metrics: {
      totalSteps: 4,
      completedSteps: 2,
      failedSteps: 1,
      skippedSteps: 1,
      avgStepTime: '11m 15s',
      totalCost: '$5.25',
      resourceUsage: {
        cpu: '28%',
        memory: '1.5GB',
        storage: '80MB'
      }
    }
  }
];

const statusColors = {
  'Running': 'bg-blue-100 text-blue-800',
  'Completed': 'bg-green-100 text-green-800',
  'Failed': 'bg-red-100 text-red-800',
  'Paused': 'bg-yellow-100 text-yellow-800',
  'Cancelled': 'bg-gray-100 text-gray-800'
};

const logLevelColors = {
  'INFO': 'text-blue-600',
  'SUCCESS': 'text-green-600',
  'WARNING': 'text-yellow-600',
  'ERROR': 'text-red-600',
  'DEBUG': 'text-gray-600'
};

export default function ExecutionMonitoring() {
  const [selectedExecution, setSelectedExecution] = useState(executionData[0]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterWorkflow, setFilterWorkflow] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [logFilter, setLogFilter] = useState('All');
  const [isRealTime, setIsRealTime] = useState(true);

  const filteredExecutions = executionData.filter(execution => {
    const matchesStatus = filterStatus === 'All' || execution.status === filterStatus;
    const matchesWorkflow = filterWorkflow === 'All' || execution.workflowName === filterWorkflow;
    const matchesSearch = execution.workflowName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.triggeredBy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesWorkflow && matchesSearch;
  });

  const filteredLogs = selectedExecution?.logs.filter(log => 
    logFilter === 'All' || log.level === logFilter
  ) || [];

  const totalExecutions = executionData.length;
  const runningExecutions = executionData.filter(e => e.status === 'Running').length;
  const completedExecutions = executionData.filter(e => e.status === 'Completed').length;
  const failedExecutions = executionData.filter(e => e.status === 'Failed').length;
  const avgSuccessRate = Math.round(executionData.reduce((sum, e) => sum + e.successRate, 0) / executionData.length);
  const totalCost = executionData.reduce((sum, e) => sum + parseFloat(e.cost.replace('$', '')), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Execution Monitoring</h1>
          <p className="text-gray-600">Real-time workflow execution tracking and analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsRealTime(!isRealTime)}
            className={`btn-secondary flex items-center space-x-2 ${isRealTime ? 'bg-green-100 text-green-700' : ''}`}
          >
            <Activity size={16} />
            <span>{isRealTime ? 'Live' : 'Paused'}</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Download size={16} />
            <span>Export Logs</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Executions</p>
              <p className="text-2xl font-bold text-gray-900">{totalExecutions}</p>
              <p className="text-sm text-blue-600">Today</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <Activity className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Running</p>
              <p className="text-2xl font-bold text-gray-900">{runningExecutions}</p>
              <p className="text-sm text-blue-600">Active now</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <Play className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedExecutions}</p>
              <p className="text-sm text-green-600">Success</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-gray-900">{failedExecutions}</p>
              <p className="text-sm text-red-600">Errors</p>
            </div>
            <div className="p-3 rounded-lg bg-red-50">
              <XCircle className="text-red-600" size={24} />
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
              <p className="text-sm font-medium text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900">${totalCost.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Today</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
              <DollarSign className="text-gray-600" size={24} />
            </div>
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
                placeholder="Search executions..."
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
              <option value="Running">Running</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
              <option value="Paused">Paused</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={filterWorkflow}
              onChange={(e) => setFilterWorkflow(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Workflows</option>
              <option value="Employee Onboarding">Employee Onboarding</option>
              <option value="IT Incident Escalation">IT Incident Escalation</option>
              <option value="Customer Feedback Processing">Customer Feedback Processing</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid3X3 size={16} />
              </button>
            </div>
            <button className="btn-secondary flex items-center space-x-2">
              <Filter size={16} />
              <span>Advanced</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Executions List */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Executions</h3>
            <div className="space-y-3">
              {filteredExecutions.map((execution) => (
                <div
                  key={execution.id}
                  onClick={() => setSelectedExecution(execution)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedExecution?.id === execution.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Activity size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{execution.workflowName}</h4>
                        <p className="text-sm text-gray-600">{execution.id}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[execution.status]}`}>
                      {execution.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Duration:</span>
                      <span className="ml-2 font-medium">{execution.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Cost:</span>
                      <span className="ml-2 font-medium">{execution.cost}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Steps:</span>
                      <span className="ml-2 font-medium">{execution.completedSteps}/{execution.steps}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Success Rate:</span>
                      <span className="ml-2 font-medium">{execution.successRate}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Started: {execution.startTime} • Triggered by: {execution.triggeredBy}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Execution Details */}
        {selectedExecution && (
          <div className="space-y-6">
            {/* Execution Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Execution Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[selectedExecution.status]}`}>
                    {selectedExecution.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{selectedExecution.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost:</span>
                  <span className="font-medium">{selectedExecution.cost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-medium">{selectedExecution.successRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Environment:</span>
                  <span className="font-medium">{selectedExecution.environment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span className="font-medium">{selectedExecution.version}</span>
                </div>
              </div>
            </div>

            {/* Step Progress */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Step Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Completed Steps</span>
                  <span>{selectedExecution.completedSteps}/{selectedExecution.steps}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(selectedExecution.completedSteps / selectedExecution.steps) * 100}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Failed:</span>
                    <span className="ml-2 font-medium text-red-600">{selectedExecution.failedSteps}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Avg Step Time:</span>
                    <span className="ml-2 font-medium">{selectedExecution.metrics.avgStepTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resource Usage */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Usage</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CPU</span>
                    <span>{selectedExecution.metrics.resourceUsage.cpu}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: selectedExecution.metrics.resourceUsage.cpu }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Memory</span>
                    <span>{selectedExecution.metrics.resourceUsage.memory}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Storage</span>
                    <span>{selectedExecution.metrics.resourceUsage.storage}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: '40%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Execution Logs */}
      {selectedExecution && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Execution Logs</h3>
            <div className="flex items-center space-x-2">
              <select
                value={logFilter}
                onChange={(e) => setLogFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="All">All Levels</option>
                <option value="INFO">Info</option>
                <option value="SUCCESS">Success</option>
                <option value="WARNING">Warning</option>
                <option value="ERROR">Error</option>
                <option value="DEBUG">Debug</option>
              </select>
              <button className="btn-secondary flex items-center space-x-2">
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
          
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
            {filteredLogs.map((log, index) => (
              <div key={index} className="flex items-start space-x-3 py-1">
                <span className="text-gray-500 text-xs mt-1">{log.timestamp}</span>
                <span className={`text-xs font-medium ${logLevelColors[log.level]}`}>
                  [{log.level}]
                </span>
                <span className="text-blue-400 text-xs mt-1">{log.step}</span>
                <span className="flex-1">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



