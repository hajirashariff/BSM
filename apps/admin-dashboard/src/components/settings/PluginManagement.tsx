import React, { useState } from 'react';
import { 
  Puzzle, 
  Settings, 
  ExternalLink, 
  CheckCircle, 
  XCircle,
  Info,
  Download,
  Upload,
  Zap,
  Calendar,
  Bot,
  BarChart3,
  Mail,
  Shield,
  Database,
  Cloud,
  MessageSquare,
  FileText,
  Users,
  Bell
} from 'lucide-react';

export default function PluginManagement() {
  const [plugins, setPlugins] = useState([
    {
      id: 'calendar',
      name: 'Calendar Integration',
      description: 'Sync with Google Calendar, Outlook, and other calendar services',
      icon: Calendar,
      enabled: true,
      version: '1.2.0',
      category: 'Productivity'
    },
    {
      id: 'chatbot',
      name: 'AI Chatbot',
      description: 'Intelligent chatbot for customer support and ticket routing',
      icon: Bot,
      enabled: true,
      version: '2.1.0',
      category: 'AI & Automation'
    },
    {
      id: 'analytics',
      name: 'Advanced Analytics',
      description: 'Detailed reporting and analytics dashboard',
      icon: BarChart3,
      enabled: false,
      version: '1.5.0',
      category: 'Reporting'
    },
    {
      id: 'email',
      name: 'Email Integration',
      description: 'Connect with Gmail, Outlook, and other email providers',
      icon: Mail,
      enabled: true,
      version: '1.8.0',
      category: 'Communication'
    },
    {
      id: 'security',
      name: 'Security Scanner',
      description: 'Automated security scanning and vulnerability detection',
      icon: Shield,
      enabled: false,
      version: '1.0.0',
      category: 'Security'
    },
    {
      id: 'database',
      name: 'Database Connector',
      description: 'Connect to external databases and data sources',
      icon: Database,
      enabled: false,
      version: '1.3.0',
      category: 'Data'
    },
    {
      id: 'cloud',
      name: 'Cloud Storage',
      description: 'Integration with AWS S3, Google Drive, Dropbox',
      icon: Cloud,
      enabled: true,
      version: '2.0.0',
      category: 'Storage'
    },
    {
      id: 'messaging',
      name: 'Team Messaging',
      description: 'Slack, Microsoft Teams, and Discord integration',
      icon: MessageSquare,
      enabled: false,
      version: '1.1.0',
      category: 'Communication'
    },
    {
      id: 'documents',
      name: 'Document Management',
      description: 'Advanced document processing and OCR capabilities',
      icon: FileText,
      enabled: false,
      version: '1.4.0',
      category: 'Productivity'
    },
    {
      id: 'notifications',
      name: 'Smart Notifications',
      description: 'Intelligent notification management and routing',
      icon: Bell,
      enabled: true,
      version: '1.6.0',
      category: 'Communication'
    },
    {
      id: 'users',
      name: 'User Management',
      description: 'Advanced user management and SSO integration',
      icon: Users,
      enabled: true,
      version: '2.2.0',
      category: 'Administration'
    }
  ]);

  const categories = ['All', 'Productivity', 'AI & Automation', 'Reporting', 'Communication', 'Security', 'Data', 'Storage', 'Administration'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const togglePlugin = (pluginId: string) => {
    setPlugins(plugins.map(plugin => 
      plugin.id === pluginId 
        ? { ...plugin, enabled: !plugin.enabled }
        : plugin
    ));
  };

  const filteredPlugins = selectedCategory === 'All' 
    ? plugins 
    : plugins.filter(plugin => plugin.category === selectedCategory);

  const enabledPlugins = plugins.filter(plugin => plugin.enabled);
  const disabledPlugins = plugins.filter(plugin => !plugin.enabled);

  const handleInstallPlugin = (pluginId: string) => {
    console.log('Installing plugin:', pluginId);
    alert(`Installing plugin: ${pluginId} (Mock)`);
  };

  const handleManagePlugins = () => {
    console.log('Opening plugin management');
    alert('Plugin management interface coming soon!');
  };

  return (
    <div className="space-y-6">
      {/* Plugin Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Plugins</p>
              <p className="text-2xl font-bold text-gray-900">{plugins.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <Puzzle className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Enabled</p>
              <p className="text-2xl font-bold text-green-600">{enabledPlugins.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-600">{disabledPlugins.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
              <XCircle className="text-gray-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Plugin Management Actions */}
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
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleManagePlugins}
            className="btn-secondary flex items-center space-x-2"
          >
            <Settings size={20} />
            <span>Manage Plugins</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Download size={20} />
            <span>Install New Plugin</span>
          </button>
        </div>
      </div>

      {/* Plugins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlugins.map((plugin) => {
          const Icon = plugin.icon;
          return (
            <div key={plugin.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{plugin.name}</h3>
                    <p className="text-sm text-gray-500">{plugin.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {plugin.enabled ? (
                    <CheckCircle className="text-green-600" size={20} />
                  ) : (
                    <XCircle className="text-gray-400" size={20} />
                  )}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{plugin.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-gray-500">
                  Version {plugin.version}
                </div>
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={plugin.enabled}
                      onChange={() => togglePlugin(plugin.id)}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => handleInstallPlugin(plugin.id)}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Configure
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plugin Installation Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="text-blue-600 mt-0.5" size={16} />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Plugin Management</p>
            <p className="mt-1">Plugins can be installed from the marketplace or uploaded as custom packages. All plugin configurations are managed through this interface.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

