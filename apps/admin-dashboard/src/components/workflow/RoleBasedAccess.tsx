import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  Settings,
  Eye,
  Edit,
  Play,
  Trash2,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Crown,
  User,
  Building2,
  Key,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  BarChart3,
  Zap,
  Database,
  Cloud,
  Mail,
  MessageSquare,
  Calendar,
  DollarSign,
  Brain,
  Target,
  Layers,
  GitCommit,
  History,
  Share2,
  Archive,
  Tag,
  Folder,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Grid3X3,
  List,
  Kanban,
  AlertCircle,
  CheckCircle2,
  Clock3,
  EyeOff,
  Bookmark,
  Star,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  GitBranch,
  Timer,
  FileText,
  Code,
  Terminal,
  Globe,
  Bot,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  TrendingUp
} from 'lucide-react';

// Role definitions
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  VIEWER: 'viewer'
};

export const PERMISSIONS = {
  // Workflow permissions
  WORKFLOW_CREATE: 'workflow:create',
  WORKFLOW_READ: 'workflow:read',
  WORKFLOW_UPDATE: 'workflow:update',
  WORKFLOW_DELETE: 'workflow:delete',
  WORKFLOW_EXECUTE: 'workflow:execute',
  WORKFLOW_APPROVE: 'workflow:approve',
  
  // Integration permissions
  INTEGRATION_CREATE: 'integration:create',
  INTEGRATION_READ: 'integration:read',
  INTEGRATION_UPDATE: 'integration:update',
  INTEGRATION_DELETE: 'integration:delete',
  INTEGRATION_CONNECT: 'integration:connect',
  
  // Analytics permissions
  ANALYTICS_READ: 'analytics:read',
  ANALYTICS_EXPORT: 'analytics:export',
  ANALYTICS_ADMIN: 'analytics:admin',
  
  // User management permissions
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_ROLE_ASSIGN: 'user:role_assign',
  
  // System permissions
  SYSTEM_CONFIG: 'system:config',
  SYSTEM_AUDIT: 'system:audit',
  SYSTEM_BACKUP: 'system:backup'
};

// Role-based permission matrix
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.ADMIN]: [
    PERMISSIONS.WORKFLOW_CREATE,
    PERMISSIONS.WORKFLOW_READ,
    PERMISSIONS.WORKFLOW_UPDATE,
    PERMISSIONS.WORKFLOW_DELETE,
    PERMISSIONS.WORKFLOW_EXECUTE,
    PERMISSIONS.WORKFLOW_APPROVE,
    PERMISSIONS.INTEGRATION_CREATE,
    PERMISSIONS.INTEGRATION_READ,
    PERMISSIONS.INTEGRATION_UPDATE,
    PERMISSIONS.INTEGRATION_DELETE,
    PERMISSIONS.INTEGRATION_CONNECT,
    PERMISSIONS.ANALYTICS_READ,
    PERMISSIONS.ANALYTICS_EXPORT,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.SYSTEM_CONFIG
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.WORKFLOW_CREATE,
    PERMISSIONS.WORKFLOW_READ,
    PERMISSIONS.WORKFLOW_UPDATE,
    PERMISSIONS.WORKFLOW_EXECUTE,
    PERMISSIONS.WORKFLOW_APPROVE,
    PERMISSIONS.INTEGRATION_READ,
    PERMISSIONS.INTEGRATION_CONNECT,
    PERMISSIONS.ANALYTICS_READ,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE
  ],
  [ROLES.USER]: [
    PERMISSIONS.WORKFLOW_READ,
    PERMISSIONS.WORKFLOW_EXECUTE,
    PERMISSIONS.INTEGRATION_READ,
    PERMISSIONS.INTEGRATION_CONNECT,
    PERMISSIONS.ANALYTICS_READ
  ],
  [ROLES.VIEWER]: [
    PERMISSIONS.WORKFLOW_READ,
    PERMISSIONS.INTEGRATION_READ,
    PERMISSIONS.ANALYTICS_READ
  ]
};

// Mock user data
const mockUsers = [
  {
    id: 'user-1',
    name: 'John Admin',
    email: 'john.admin@company.com',
    role: ROLES.SUPER_ADMIN,
    avatar: 'JA',
    department: 'IT',
    lastActive: '2024-01-15 14:30:00',
    permissions: ROLE_PERMISSIONS[ROLES.SUPER_ADMIN],
    status: 'active'
  },
  {
    id: 'user-2',
    name: 'Sarah Manager',
    email: 'sarah.manager@company.com',
    role: ROLES.MANAGER,
    avatar: 'SM',
    department: 'HR',
    lastActive: '2024-01-15 13:45:00',
    permissions: ROLE_PERMISSIONS[ROLES.MANAGER],
    status: 'active'
  },
  {
    id: 'user-3',
    name: 'Mike User',
    email: 'mike.user@company.com',
    role: ROLES.USER,
    avatar: 'MU',
    department: 'Sales',
    lastActive: '2024-01-15 12:20:00',
    permissions: ROLE_PERMISSIONS[ROLES.USER],
    status: 'active'
  },
  {
    id: 'user-4',
    name: 'Lisa Viewer',
    email: 'lisa.viewer@company.com',
    role: ROLES.VIEWER,
    avatar: 'LV',
    department: 'Finance',
    lastActive: '2024-01-15 11:15:00',
    permissions: ROLE_PERMISSIONS[ROLES.VIEWER],
    status: 'inactive'
  }
];

const roleColors = {
  [ROLES.SUPER_ADMIN]: 'bg-purple-100 text-purple-800',
  [ROLES.ADMIN]: 'bg-red-100 text-red-800',
  [ROLES.MANAGER]: 'bg-blue-100 text-blue-800',
  [ROLES.USER]: 'bg-green-100 text-green-800',
  [ROLES.VIEWER]: 'bg-gray-100 text-gray-800'
};

const roleIcons = {
  [ROLES.SUPER_ADMIN]: Crown,
  [ROLES.ADMIN]: Shield,
  [ROLES.MANAGER]: Users,
  [ROLES.USER]: User,
  [ROLES.VIEWER]: Eye
};

export default function RoleBasedAccess() {
  const [currentUser, setCurrentUser] = useState(mockUsers[0]);
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 'audit-1',
      user: 'John Admin',
      action: 'Created workflow',
      resource: 'Employee Onboarding',
      timestamp: '2024-01-15 14:30:00',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      id: 'audit-2',
      user: 'Sarah Manager',
      action: 'Executed workflow',
      resource: 'IT Incident Escalation',
      timestamp: '2024-01-15 13:45:00',
      ip: '192.168.1.101',
      status: 'success'
    },
    {
      id: 'audit-3',
      user: 'Mike User',
      action: 'Failed to delete workflow',
      resource: 'Customer Feedback Processing',
      timestamp: '2024-01-15 12:20:00',
      ip: '192.168.1.102',
      status: 'failed'
    }
  ]);

  const hasPermission = (permission: string) => {
    return currentUser.permissions.includes(permission);
  };

  const getRoleIcon = (role: string) => {
    const Icon = roleIcons[role];
    return <Icon size={16} />;
  };

  const switchUser = (user: any) => {
    setCurrentUser(user);
  };

  const updateUserRole = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, role: newRole, permissions: ROLE_PERMISSIONS[newRole] }
        : user
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Role-Based Access Control</h1>
          <p className="text-gray-600">Manage user roles, permissions, and access control</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Download size={20} />
            <span>Export Audit Log</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Current User Context */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Current User Context</h3>
              <p className="text-gray-600">Switch between different user roles to test permissions</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => switchUser(user)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  currentUser.id === user.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                  {user.avatar}
                </div>
                <span className="text-sm font-medium">{user.name}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${roleColors[user.role]}`}>
                  {user.role.replace('_', ' ')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Permission Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current User Permissions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current User Permissions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Role:</span>
              <span className={`px-2 py-1 text-xs rounded-full ${roleColors[currentUser.role]}`}>
                {getRoleIcon(currentUser.role)}
                <span className="ml-1">{currentUser.role.replace('_', ' ')}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Department:</span>
              <span className="text-gray-600">{currentUser.department}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Last Active:</span>
              <span className="text-gray-600">{currentUser.lastActive}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-3">Available Permissions:</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(PERMISSIONS).map(([key, permission]) => (
                <div key={key} className="flex items-center space-x-2">
                  {hasPermission(permission) ? (
                    <CheckCircle className="text-green-600" size={16} />
                  ) : (
                    <XCircle className="text-gray-400" size={16} />
                  )}
                  <span className={`text-sm ${hasPermission(permission) ? 'text-gray-900' : 'text-gray-500'}`}>
                    {permission}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Role Hierarchy */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Hierarchy</h3>
          <div className="space-y-3">
            {Object.entries(ROLE_PERMISSIONS).map(([role, permissions]) => {
              const Icon = roleIcons[role];
              return (
                <div key={role} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${roleColors[role]}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {role.replace('_', ' ').toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {permissions.length} permissions
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {permissions.length} perms
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button className="btn-secondary flex items-center space-x-2">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Last Active</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${roleColors[user.role]}`}>
                      {getRoleIcon(user.role)}
                      <span className="ml-1">{user.role.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{user.department}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{user.lastActive}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit size={14} className="text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Settings size={14} className="text-gray-400" />
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

      {/* Audit Logs */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Audit Logs</h3>
          <div className="flex items-center space-x-2">
            <button className="btn-secondary flex items-center space-x-2">
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {auditLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  log.status === 'success' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {log.status === 'success' ? (
                    <CheckCircle size={16} />
                  ) : (
                    <XCircle size={16} />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {log.user} {log.action} "{log.resource}"
                  </div>
                  <div className="text-sm text-gray-600">
                    IP: {log.ip} • {log.timestamp}
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                log.status === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


