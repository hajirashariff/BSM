import React, { useState } from 'react';
import { 
  Download, 
  Upload, 
  Database, 
  FileText, 
  Settings, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Info,
  HardDrive,
  Cloud,
  Archive,
  RefreshCw,
  Calendar,
  User
} from 'lucide-react';

interface BackupItem {
  id: string;
  name: string;
  type: 'settings' | 'data' | 'full';
  size: string;
  createdAt: string;
  status: 'completed' | 'in-progress' | 'failed';
  description: string;
}

export default function DataExportBackup() {
  const [exportType, setExportType] = useState('settings');
  const [backupType, setBackupType] = useState('full');
  const [includeUserData, setIncludeUserData] = useState(false);
  const [includeAuditLogs, setIncludeAuditLogs] = useState(true);
  const [compressionEnabled, setCompressionEnabled] = useState(true);

  const [backups, setBackups] = useState<BackupItem[]>([
    {
      id: '1',
      name: 'Full System Backup - Jan 15, 2024',
      type: 'full',
      size: '2.3 GB',
      createdAt: '2024-01-15 02:00:00',
      status: 'completed',
      description: 'Complete system backup including all data, settings, and configurations'
    },
    {
      id: '2',
      name: 'Settings Export - Jan 14, 2024',
      type: 'settings',
      size: '15.2 MB',
      createdAt: '2024-01-14 18:30:00',
      status: 'completed',
      description: 'System settings and configuration export'
    },
    {
      id: '3',
      name: 'User Data Backup - Jan 13, 2024',
      type: 'data',
      size: '856.7 MB',
      createdAt: '2024-01-13 23:45:00',
      status: 'completed',
      description: 'User accounts, profiles, and related data'
    },
    {
      id: '4',
      name: 'Full System Backup - Jan 12, 2024',
      type: 'full',
      size: '2.1 GB',
      createdAt: '2024-01-12 02:00:00',
      status: 'completed',
      description: 'Complete system backup including all data, settings, and configurations'
    }
  ]);

  const handleExportSettings = () => {
    console.log('Exporting settings...', {
      type: exportType,
      includeUserData,
      includeAuditLogs,
      compressionEnabled
    });
    
    // Mock export process
    alert('Settings export initiated! This will trigger data export (coming soon).');
  };

  const handleBackupData = () => {
    console.log('Creating backup...', {
      type: backupType,
      includeUserData,
      includeAuditLogs,
      compressionEnabled
    });
    
    // Mock backup process
    alert('Data backup initiated! This will trigger data backup (coming soon).');
  };

  const handleDownloadBackup = (backupId: string) => {
    console.log('Downloading backup:', backupId);
    alert(`Downloading backup ${backupId}... (Mock)`);
  };

  const handleDeleteBackup = (backupId: string) => {
    if (confirm('Are you sure you want to delete this backup?')) {
      setBackups(backups.filter(backup => backup.id !== backupId));
      console.log('Backup deleted:', backupId);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'in-progress':
        return <RefreshCw className="text-blue-600 animate-spin" size={16} />;
      case 'failed':
        return <AlertTriangle className="text-red-600" size={16} />;
      default:
        return <Info className="text-gray-600" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'settings':
        return <Settings className="text-blue-600" size={16} />;
      case 'data':
        return <Database className="text-green-600" size={16} />;
      case 'full':
        return <HardDrive className="text-purple-600" size={16} />;
      default:
        return <FileText className="text-gray-600" size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Export/Backup Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Backups</p>
              <p className="text-2xl font-bold text-gray-900">{backups.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <Archive className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Size</p>
              <p className="text-2xl font-bold text-gray-900">5.2 GB</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <HardDrive className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Backup</p>
              <p className="text-2xl font-bold text-purple-600">2 days ago</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <Clock className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Export Settings */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Settings</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Export Type</label>
              <select
                value={exportType}
                onChange={(e) => setExportType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="settings">Settings Only</option>
                <option value="data">Data Only</option>
                <option value="full">Full Export</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Format</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
                <option value="xml">XML</option>
                <option value="zip">ZIP Archive</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Include Options</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={includeUserData}
                  onChange={(e) => setIncludeUserData(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Include User Data</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={includeAuditLogs}
                  onChange={(e) => setIncludeAuditLogs(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Include Audit Logs</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={compressionEnabled}
                  onChange={(e) => setCompressionEnabled(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Enable Compression</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={handleExportSettings}
              className="btn-primary flex items-center space-x-2"
            >
              <Download size={20} />
              <span>Export Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Backup Data */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup Data</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Backup Type</label>
              <select
                value={backupType}
                onChange={(e) => setBackupType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="full">Full System Backup</option>
                <option value="incremental">Incremental Backup</option>
                <option value="differential">Differential Backup</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Storage Location</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="local">Local Storage</option>
                <option value="cloud">Cloud Storage</option>
                <option value="external">External Drive</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Backup Schedule</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="manual">Manual Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  defaultValue="02:00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Retention (Days)</label>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="1"
                  max="365"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={handleBackupData}
              className="btn-primary flex items-center space-x-2"
            >
              <Upload size={20} />
              <span>Backup Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Backup History */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Backup
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {backups.map((backup) => (
                <tr key={backup.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(backup.type)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{backup.name}</div>
                        <div className="text-xs text-gray-500 max-w-xs truncate">{backup.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {backup.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{backup.size}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar className="text-gray-400" size={14} />
                      <span className="text-sm text-gray-900">{backup.createdAt}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(backup.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(backup.status)}`}>
                        {backup.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleDownloadBackup(backup.id)}
                        className="text-primary-600 hover:text-primary-900"
                        disabled={backup.status !== 'completed'}
                      >
                        <Download size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteBackup(backup.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Archive size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="text-blue-600 mt-0.5" size={16} />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Data Export & Backup</p>
            <p className="mt-1">Regular backups ensure data safety and compliance. Exports can be used for migration, analysis, or archival purposes. All operations are logged for audit purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}





