import React, { useState } from 'react';
import { 
  Search, 
  Palette, 
  Globe, 
  Puzzle, 
  Settings as SettingsIcon, 
  Shield, 
  Users, 
  Home, 
  FileText, 
  Download,
  ChevronDown,
  ChevronRight,
  Info,
  Save,
  Upload,
  Eye,
  EyeOff,
  Clock,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Import individual settings components
import SearchSettings from '../components/settings/SearchSettings';
import BrandingSettings from '../components/settings/BrandingSettings';
import LocalizationSettings from '../components/settings/LocalizationSettings';
import PluginManagement from '../components/settings/PluginManagement';
import AdvancedSettings from '../components/settings/AdvancedSettings';
import RolePermissionsSettings from '../components/settings/RolePermissionsSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import AuditLogsPlaceholder from '../components/settings/AuditLogsPlaceholder';
import DataExportBackup from '../components/settings/DataExportBackup';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType<any>;
  description: string;
  expanded: boolean;
}

export default function SettingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['branding', 'localization']));

  const settingsSections: SettingsSection[] = [
    {
      id: 'branding',
      title: 'Profile & Branding',
      icon: Palette,
      component: BrandingSettings,
      description: 'Configure app appearance, logo, and theme settings',
      expanded: expandedSections.has('branding')
    },
    {
      id: 'localization',
      title: 'Localization & Language',
      icon: Globe,
      component: LocalizationSettings,
      description: 'Language settings and translation options',
      expanded: expandedSections.has('localization')
    },
    {
      id: 'plugins',
      title: 'Plugin & Integration Management',
      icon: Puzzle,
      component: PluginManagement,
      description: 'Manage plugins, integrations, and add-ons',
      expanded: expandedSections.has('plugins')
    },
    {
      id: 'advanced',
      title: 'Advanced Settings',
      icon: SettingsIcon,
      component: AdvancedSettings,
      description: 'System properties and advanced configuration',
      expanded: expandedSections.has('advanced')
    },
    {
      id: 'permissions',
      title: 'Permissions & Role Management',
      icon: Users,
      component: RolePermissionsSettings,
      description: 'Configure user roles and permissions',
      expanded: expandedSections.has('permissions')
    },
    {
      id: 'dashboard',
      title: 'Dashboard & Landing Page',
      icon: Home,
      component: () => (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Default Landing Page</h3>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Choose default landing page</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="dashboard">Dashboard</option>
                  <option value="tickets">Tickets</option>
                  <option value="workflows">Workflows</option>
                  <option value="analytics">Analytics</option>
                  <option value="settings">Settings</option>
                </select>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Use Dashboard Summary on Login</label>
                    <p className="text-xs text-gray-500">Show summary cards on dashboard</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Show Recent Activity</label>
                    <p className="text-xs text-gray-500">Display recent tickets and workflows</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      description: 'Configure dashboard and landing page settings',
      expanded: expandedSections.has('dashboard')
    },
    {
      id: 'security',
      title: 'Security & Authentication',
      icon: Shield,
      component: SecuritySettings,
      description: 'Password policies, MFA, and security settings',
      expanded: expandedSections.has('security')
    },
    {
      id: 'audit',
      title: 'Audit & Logs',
      icon: FileText,
      component: AuditLogsPlaceholder,
      description: 'View system audit logs and changes',
      expanded: expandedSections.has('audit')
    },
    {
      id: 'export',
      title: 'Data Export & Backup',
      icon: Download,
      component: DataExportBackup,
      description: 'Export settings and backup data',
      expanded: expandedSections.has('export')
    }
  ];

  const filteredSections = settingsSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleSaveAll = () => {
    console.log('Saving all settings...');
    // Mock save functionality
    alert('All settings saved successfully! (Mock)');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure branding, fields, roles, and security for your BSM portal</p>
        </div>
        <button 
          onClick={handleSaveAll}
          className="btn-primary flex items-center space-x-2"
        >
          <Save size={20} />
          <span>Save All Changes</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="card">
        <SearchSettings 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {filteredSections.map((section) => {
          const Icon = section.icon;
          const Component = section.component;
          const isExpanded = expandedSections.has(section.id);
          
          return (
            <div key={section.id} className="card">
              <div 
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Icon className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isExpanded ? (
                    <ChevronDown className="text-gray-400" size={24} />
                  ) : (
                    <ChevronRight className="text-gray-400" size={24} />
                  )}
                </div>
              </div>
              
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="pt-6">
                    <Component />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredSections.length === 0 && (
        <div className="card text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No settings found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}