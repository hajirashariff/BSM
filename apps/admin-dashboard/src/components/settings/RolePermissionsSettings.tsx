import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Eye, 
  Edit, 
  Save, 
  ChevronDown, 
  ChevronRight,
  CheckCircle,
  XCircle,
  Info,
  Settings,
  UserCheck,
  UserX,
  Crown,
  User
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  permissions: string[];
  userCount: number;
}

export default function RolePermissionsSettings() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access and control',
      icon: Crown,
      color: 'bg-red-100 text-red-800',
      permissions: ['view-branding', 'change-settings', 'manage-plugins', 'manage-users', 'view-audit-logs', 'export-data'],
      userCount: 3
    },
    {
      id: 'agent',
      name: 'Agent',
      description: 'Support agent with ticket management access',
      icon: UserCheck,
      color: 'bg-blue-100 text-blue-800',
      permissions: ['view-branding', 'manage-tickets', 'view-analytics'],
      userCount: 12
    },
    {
      id: 'customer',
      name: 'Customer',
      description: 'End user with limited access',
      icon: User,
      color: 'bg-green-100 text-green-800',
      permissions: ['view-branding'],
      userCount: 156
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Team manager with reporting access',
      icon: Settings,
      color: 'bg-purple-100 text-purple-800',
      permissions: ['view-branding', 'view-analytics', 'manage-team'],
      userCount: 8
    }
  ]);

  const [expandedRoles, setExpandedRoles] = useState<Set<string>>(new Set(['admin']));

  const permissions: Permission[] = [
    { id: 'view-branding', name: 'Can View Branding', description: 'View company branding and theme settings', category: 'Branding' },
    { id: 'change-settings', name: 'Can Change Settings', description: 'Modify system settings and configurations', category: 'System' },
    { id: 'manage-plugins', name: 'Can Manage Plugins', description: 'Install, configure, and manage plugins', category: 'System' },
    { id: 'manage-users', name: 'Can Manage Users', description: 'Create, edit, and delete user accounts', category: 'Users' },
    { id: 'view-audit-logs', name: 'Can View Audit Logs', description: 'Access system audit logs and activity history', category: 'Security' },
    { id: 'export-data', name: 'Can Export Data', description: 'Export system data and reports', category: 'Data' },
    { id: 'manage-tickets', name: 'Can Manage Tickets', description: 'Create, update, and resolve support tickets', category: 'Support' },
    { id: 'view-analytics', name: 'Can View Analytics', description: 'Access analytics and reporting dashboards', category: 'Analytics' },
    { id: 'manage-team', name: 'Can Manage Team', description: 'Manage team members and assignments', category: 'Team' }
  ];

  const toggleRoleExpansion = (roleId: string) => {
    const newExpanded = new Set(expandedRoles);
    if (newExpanded.has(roleId)) {
      newExpanded.delete(roleId);
    } else {
      newExpanded.add(roleId);
    }
    setExpandedRoles(newExpanded);
  };

  const togglePermission = (roleId: string, permissionId: string) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const hasPermission = role.permissions.includes(permissionId);
        return {
          ...role,
          permissions: hasPermission 
            ? role.permissions.filter(p => p !== permissionId)
            : [...role.permissions, permissionId]
        };
      }
      return role;
    }));
  };

  const handleSave = () => {
    console.log('Saving role permissions:', roles);
    alert('Role permissions saved! (Mock)');
  };

  const getPermissionById = (id: string) => permissions.find(p => p.id === id);

  return (
    <div className="space-y-6">
      {/* Role Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <div key={role.id} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{role.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{role.userCount}</p>
                  <p className="text-xs text-gray-500">{role.permissions.length} permissions</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <Icon className="text-gray-600" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Role Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Role Permissions</h3>
          <button 
            onClick={handleSave}
            className="btn-primary flex items-center space-x-2"
          >
            <Save size={20} />
            <span>Save Permissions</span>
          </button>
        </div>

        <div className="space-y-4">
          {roles.map((role) => {
            const Icon = role.icon;
            const isExpanded = expandedRoles.has(role.id);
            
            return (
              <div key={role.id} className="card">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleRoleExpansion(role.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="text-gray-600" size={20} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-semibold text-gray-900">{role.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${role.color}`}>
                          {role.userCount} users
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{role.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{role.permissions.length} permissions</span>
                    {isExpanded ? (
                      <ChevronDown className="text-gray-400" size={20} />
                    ) : (
                      <ChevronRight className="text-gray-400" size={20} />
                    )}
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-200">
                    <div className="pt-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-3">Permissions</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {permissions.map((permission) => {
                          const hasPermission = role.permissions.includes(permission.id);
                          return (
                            <div 
                              key={permission.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium text-gray-900">{permission.name}</span>
                                  <div className="group relative">
                                    <Info className="text-gray-400 cursor-help" size={14} />
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                      {permission.description}
                                    </div>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500">{permission.category}</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer" 
                                  checked={hasPermission}
                                  onChange={() => togglePermission(role.id, permission.id)}
                                />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Permission Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Permission Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {permissions.map((permission) => {
            const rolesWithPermission = roles.filter(role => role.permissions.includes(permission.id));
            return (
              <div key={permission.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{permission.name}</span>
                  <span className="text-xs text-gray-500">{rolesWithPermission.length} roles</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{permission.description}</p>
                <div className="flex flex-wrap gap-1">
                  {rolesWithPermission.map(role => (
                    <span key={role.id} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white text-gray-700">
                      {role.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="text-blue-600 mt-0.5" size={16} />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Role-Based Access Control</p>
            <p className="mt-1">Permissions are inherited by users assigned to each role. Changes to role permissions will affect all users in that role immediately.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

