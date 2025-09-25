import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  Info, 
  Edit, 
  Trash2, 
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  FileText,
  Users,
  Shield,
  Zap
} from 'lucide-react';

interface AdvancedSetting {
  id: string;
  key: string;
  value: string;
  type: 'text' | 'number' | 'select' | 'boolean';
  description: string;
  category: string;
  options?: string[];
}

export default function AdvancedSettings() {
  const [settings, setSettings] = useState<AdvancedSetting[]>([
    {
      id: 'date-format',
      key: 'Date Format',
      value: 'DD/MM/YYYY',
      type: 'select',
      description: 'Default date format for the application',
      category: 'Display',
      options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY']
    },
    {
      id: 'max-export-results',
      key: 'Max Search Results Export',
      value: '1000',
      type: 'number',
      description: 'Maximum number of results that can be exported at once',
      category: 'Performance'
    },
    {
      id: 'comment-character-limit',
      key: 'Comment Character Limit',
      value: '500',
      type: 'number',
      description: 'Maximum characters allowed in comments',
      category: 'Content'
    },
    {
      id: 'session-timeout',
      key: 'Session Timeout (minutes)',
      value: '30',
      type: 'number',
      description: 'Auto logout after specified minutes of inactivity',
      category: 'Security'
    },
    {
      id: 'enable-notifications',
      key: 'Enable Push Notifications',
      value: 'true',
      type: 'boolean',
      description: 'Allow browser push notifications',
      category: 'Communication'
    },
    {
      id: 'auto-refresh-interval',
      key: 'Auto Refresh Interval (seconds)',
      value: '60',
      type: 'number',
      description: 'How often to refresh data automatically',
      category: 'Performance'
    },
    {
      id: 'max-file-upload-size',
      key: 'Max File Upload Size (MB)',
      value: '10',
      type: 'number',
      description: 'Maximum file size for uploads',
      category: 'Storage'
    },
    {
      id: 'enable-audit-logging',
      key: 'Enable Audit Logging',
      value: 'true',
      type: 'boolean',
      description: 'Log all user actions and system changes',
      category: 'Security'
    },
    {
      id: 'default-page-size',
      key: 'Default Page Size',
      value: '25',
      type: 'select',
      description: 'Number of items per page in lists',
      category: 'Display',
      options: ['10', '25', '50', '100']
    },
    {
      id: 'enable-dark-mode',
      key: 'Enable Dark Mode',
      value: 'false',
      type: 'boolean',
      description: 'Allow users to switch to dark theme',
      category: 'Display'
    }
  ]);

  const [editingSetting, setEditingSetting] = useState<string | null>(null);
  const [newSetting, setNewSetting] = useState<Partial<AdvancedSetting>>({});

  const categories = ['All', 'Display', 'Performance', 'Content', 'Security', 'Communication', 'Storage'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSettings = selectedCategory === 'All' 
    ? settings 
    : settings.filter(setting => setting.category === selectedCategory);

  const updateSetting = (id: string, value: string) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ));
  };

  const handleSave = () => {
    console.log('Saving advanced settings:', settings);
    alert('Advanced settings saved! (Mock)');
  };

  const handleAddSetting = () => {
    if (newSetting.key && newSetting.value) {
      const setting: AdvancedSetting = {
        id: `custom-${Date.now()}`,
        key: newSetting.key!,
        value: newSetting.value!,
        type: newSetting.type || 'text',
        description: newSetting.description || '',
        category: newSetting.category || 'Custom'
      };
      setSettings([...settings, setting]);
      setNewSetting({});
    }
  };

  const handleDeleteSetting = (id: string) => {
    if (confirm('Are you sure you want to delete this setting?')) {
      setSettings(settings.filter(setting => setting.id !== id));
    }
  };

  const renderSettingValue = (setting: AdvancedSetting) => {
    if (editingSetting === setting.id) {
      switch (setting.type) {
        case 'select':
          return (
            <select
              value={setting.value}
              onChange={(e) => updateSetting(setting.id, e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              {setting.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          );
        case 'boolean':
          return (
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={setting.value === 'true'}
                onChange={(e) => updateSetting(setting.id, e.target.checked.toString())}
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          );
        default:
          return (
            <input
              type={setting.type === 'number' ? 'number' : 'text'}
              value={setting.value}
              onChange={(e) => updateSetting(setting.id, e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          );
      }
    } else {
      return (
        <span 
          className="text-sm text-gray-900 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
          onClick={() => setEditingSetting(setting.id)}
        >
          {setting.value}
        </span>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Settings</p>
              <p className="text-2xl font-bold text-gray-900">{settings.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <Settings className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Security</p>
              <p className="text-2xl font-bold text-red-600">{settings.filter(s => s.category === 'Security').length}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-50">
              <Shield className="text-red-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Performance</p>
              <p className="text-2xl font-bold text-green-600">{settings.filter(s => s.category === 'Performance').length}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <Zap className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Display</p>
              <p className="text-2xl font-bold text-purple-600">{settings.filter(s => s.category === 'Display').length}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <FileText className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={handleSave}
          className="btn-primary flex items-center space-x-2"
        >
          <Save size={20} />
          <span>Save All Settings</span>
        </button>
      </div>

      {/* Settings Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Setting
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSettings.map((setting) => (
                <tr key={setting.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{setting.key}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderSettingValue(setting)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {setting.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate">
                      {setting.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setEditingSetting(editingSetting === setting.id ? null : setting.id)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteSetting(setting.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Setting */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Custom Setting</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key</label>
            <input
              type="text"
              value={newSetting.key || ''}
              onChange={(e) => setNewSetting({...newSetting, key: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Setting key"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
            <input
              type="text"
              value={newSetting.value || ''}
              onChange={(e) => setNewSetting({...newSetting, value: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Setting value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              value={newSetting.category || ''}
              onChange={(e) => setNewSetting({...newSetting, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Category"
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleAddSetting}
              className="btn-primary flex items-center space-x-2 w-full"
            >
              <Plus size={20} />
              <span>Add Setting</span>
            </button>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="text-yellow-600 mt-0.5" size={16} />
          <div className="text-sm text-yellow-800">
            <p className="font-medium">Advanced Settings Warning</p>
            <p className="mt-1">These settings affect core system functionality. Please ensure you understand the implications before making changes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

