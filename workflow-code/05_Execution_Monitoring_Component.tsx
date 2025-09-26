import React, { useState } from 'react';
import { 
  Activity, 
  Play, 
  Pause, 
  Stop, 
  RefreshCw, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Filter,
  Search,
  Download,
  MoreHorizontal
} from 'lucide-react';

const executionData = [
  {
    id: 'EXE-001',
    workflowId: 'WF-001',
    workflowName: 'Employee Onboarding',
    status: 'Running',
    startedAt: '2024-01-15 09:30:15',
    duration: '2m 34s',
    progress: 75,
    stepsCompleted: 5,
    totalSteps: 7,
    triggeredBy: 'John Smith',
    triggeredByType: 'Manual',
    currentStep: 'Assign Equipment',
    nextStep: 'Schedule Training',
    logs: [
      { timestamp: '09:30:15', level: 'INFO', message: 'Workflow started' },
      { timestamp: '09:30:18', level: 'INFO', message: 'Creating user accounts' },
      { timestamp: '09:30:45', level: 'SUCCESS', message: 'Accounts created successfully' },
      { timestamp: '09:31:02', level: 'INFO', message: 'Assigning equipment' }
    ]
  },
  {
    id: 'EXE-002',
    workflowId: 'WF-002',
    workflowName: 'IT Incident Escalation',
    status: 'Completed',
    startedAt: '2024-01-15 14:20:30',
    completedAt: '2024-01-15 14:22:15',
    duration: '1m 45s',
    progress: 100,
    stepsCompleted: 5,
    totalSteps: 5,
    triggeredBy: 'System Alert',
    triggeredByType: 'Automatic',
    currentStep: 'Completed',
    nextStep: 'N/A',
    logs: [
      { timestamp: '14:20:30', level: 'INFO', message: 'Critical incident detected' },
      { timestamp: '14:20:32', level: 'INFO', message: 'Notifying manager' },
      { timestamp: '14:20:45', level: 'SUCCESS', message: 'Manager notified' },
      { timestamp: '14:21:15', level: 'INFO', message: 'Escalating to senior team' },
      { timestamp: '14:22:15', level: 'SUCCESS', message: 'Workflow completed' }
    ]
  },
  {
    id: 'EXE-003',
    workflowId: 'WF-004',
    workflowName: 'Customer Feedback Processing',
    status: 'Failed',
    startedAt: '2024-01-15 16:45:20',
    failedAt: '2024-01-15 16:47:10',
    duration: '1m 50s',
    progress: 60,
    stepsCompleted: 2,
    totalSteps: 4,
    triggeredBy: 'Customer Submission',
    triggeredByType: 'Automatic',
    currentStep: 'Analyze Sentiment',
    nextStep: 'N/A',
    errorMessage: 'API connection timeout',
    logs: [
      { timestamp: '16:45:20', level: 'INFO', message: 'Customer feedback received' },
      { timestamp: '16:45:25', level: 'INFO', message: 'Starting sentiment analysis' },
      { timestamp: '16:47:10', level: 'ERROR', message: 'API connection timeout' }
    ]
  }
];

const statusColors = {
  'Running': 'bg-blue-100 text-blue-800',
  'Completed': 'bg-green-100 text-green-800',
  'Failed': 'bg-red-100 text-red-800',
  'Paused': 'bg-yellow-100 text-yellow-800',
  'Cancelled': 'bg-gray-100 text-gray-800'
};

const statusIcons = {
  'Running': Play,
  'Completed': CheckCircle,
  'Failed': XCircle,
  'Paused': Pause,
  'Cancelled': Stop
};

export default function ExecutionMonitoring() {
  const [selectedExecution, setSelectedExecution] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExecutions = executionData.filter(execution => {
    const matchesStatus = filterStatus === 'All' || execution.status === filterStatus;
    const matchesSearch = execution.workflowName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalExecutions = executionData.length;
  const runningExecutions = executionData.filter(e => e.status === 'Running').length;
  const completedExecutions = executionData.filter(e => e.status === 'Completed').length;
  const failedExecutions = executionData.filter(e => e.status === 'Failed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Execution Monitoring</h2>
          <p className="text-gray-600">Monitor and manage workflow executions in real-time</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <RefreshCw size={20} />
            <span>Refresh</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Download size={20} />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Executions</p>
              <p className="text-2xl font-bold text-gray-900">{totalExecutions}</p>
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
              <p className="text-2xl font-bold text-blue-600">{runningExecutions}</p>
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
              <p className="text-2xl font-bold text-green-600">{completedExecutions}</p>
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
              <p className="text-2xl font-bold text-red-600">{failedExecutions}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-50">
              <XCircle className="text-red-600" size={24} />
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
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <span className="text-sm text-gray-600">Advanced Filters</span>
          </div>
        </div>
      </div>

      {/* Executions Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Execution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Triggered By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Started At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExecutions.map((execution) => {
                const StatusIcon = statusIcons[execution.status];
                return (
                  <tr key={execution.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{execution.workflowName}</div>
                        <div className="text-sm text-gray-500">ID: {execution.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon size={16} className="mr-2" />
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[execution.status]}`}>
                          {execution.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${execution.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{execution.progress}%</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {execution.stepsCompleted}/{execution.totalSteps} steps
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{execution.duration}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{execution.triggeredBy}</div>
                      <div className="text-xs text-gray-500">{execution.triggeredByType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{execution.startedAt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedExecution(execution)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {execution.status === 'Running' && (
                          <button className="text-yellow-600 hover:text-yellow-900">
                            <Pause className="h-4 w-4" />
                          </button>
                        )}
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Execution Details Modal */}
      {selectedExecution && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Execution Details - {selectedExecution.workflowName}
                </h3>
                <button 
                  onClick={() => setSelectedExecution(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Execution Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">ID:</span> {selectedExecution.id}</div>
                    <div><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${statusColors[selectedExecution.status]}`}>
                        {selectedExecution.status}
                      </span>
                    </div>
                    <div><span className="font-medium">Duration:</span> {selectedExecution.duration}</div>
                    <div><span className="font-medium">Progress:</span> {selectedExecution.progress}%</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Trigger Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Triggered By:</span> {selectedExecution.triggeredBy}</div>
                    <div><span className="font-medium">Type:</span> {selectedExecution.triggeredByType}</div>
                    <div><span className="font-medium">Started At:</span> {selectedExecution.startedAt}</div>
                    {selectedExecution.completedAt && (
                      <div><span className="font-medium">Completed At:</span> {selectedExecution.completedAt}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Execution Logs</h4>
                <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                  {selectedExecution.logs.map((log, index) => (
                    <div key={index} className="flex items-start space-x-3 py-1">
                      <span className="text-xs text-gray-500 font-mono">{log.timestamp}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                        log.level === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {log.level}
                      </span>
                      <span className="text-sm text-gray-900">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setSelectedExecution(null)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button className="btn-primary">
                  Download Logs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





