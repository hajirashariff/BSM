import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  User, 
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: 'success' | 'warning' | 'error';
  ipAddress: string;
  userAgent: string;
  details?: string;
}

export default function AuditLogsPlaceholder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());

  // Mock audit log data
  const mockAuditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25',
      user: 'admin@company.com',
      action: 'User Login',
      resource: 'Authentication',
      status: 'success',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: 'Successful login from Chrome browser'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:25:10',
      user: 'john.doe@company.com',
      action: 'Password Change',
      resource: 'User Profile',
      status: 'success',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      details: 'Password updated successfully'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:20:45',
      user: 'system',
      action: 'Failed Login Attempt',
      resource: 'Authentication',
      status: 'error',
      ipAddress: '203.0.113.45',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      details: 'Invalid credentials provided'
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:15:30',
      user: 'jane.smith@company.com',
      action: 'Data Export',
      resource: 'Reports',
      status: 'success',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: 'Exported user data report'
    },
    {
      id: '5',
      timestamp: '2024-01-15 14:10:15',
      user: 'admin@company.com',
      action: 'Permission Change',
      resource: 'User Management',
      status: 'warning',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: 'Modified user permissions for john.doe@company.com'
    }
  ];

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || log.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const toggleLogExpansion = (logId: string) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedLogs(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'warning':
        return <AlertCircle className="text-yellow-600" size={16} />;
      case 'error':
        return <AlertCircle className="text-red-600" size={16} />;
      default:
        return <Clock className="text-gray-600" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const exportLogs = () => {
    console.log('Exporting audit logs...');
    // Mock export functionality
    alert('Audit logs exported successfully! (Mock)');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Audit Logs</h3>
          <p className="text-sm text-gray-500">Monitor system activities and security events</p>
        </div>
        <button 
          onClick={exportLogs}
          className="btn-secondary flex items-center space-x-2"
        >
          <Download size={16} />
          <span>Export Logs</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search logs by user, action, or resource..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={16} />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Timestamp</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Resource</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">IP Address</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => {
                const isExpanded = expandedLogs.has(log.id);
                return (
                  <React.Fragment key={log.id}>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} className="text-gray-400" />
                          <span>{log.timestamp}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        <div className="flex items-center space-x-2">
                          <User size={14} className="text-gray-400" />
                          <span>{log.user}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{log.action}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{log.resource}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(log.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                            {log.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{log.ipAddress}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleLogExpansion(log.id)}
                          className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
                        >
                          <Eye size={14} />
                          <span>Details</span>
                          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={7} className="py-4 px-4 bg-gray-50">
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Details</h4>
                              <p className="text-sm text-gray-600">{log.details}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">User Agent</h4>
                              <p className="text-sm text-gray-600 font-mono text-xs bg-white p-2 rounded border">
                                {log.userAgent}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No audit logs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'No audit logs have been recorded yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {filteredLogs.length} of {mockAuditLogs.length} logs
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded">
            Previous
          </button>
          <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded">
            Next
          </button>
        </div>
      </div>

      {/* Information Card */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <Activity className="text-blue-600 mt-0.5" size={20} />
          <div>
            <h4 className="text-sm font-medium text-blue-800">Audit Log Information</h4>
            <ul className="mt-2 text-sm text-blue-700 space-y-1">
              <li>• Audit logs are automatically generated for all system activities</li>
              <li>• Logs are retained for 90 days by default</li>
              <li>• Sensitive operations require additional authentication</li>
              <li>• Export functionality is available for compliance reporting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
