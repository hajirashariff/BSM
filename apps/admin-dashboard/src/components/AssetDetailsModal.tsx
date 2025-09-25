import React from 'react';
import {
  X,
  Server,
  MapPin,
  User,
  Building,
  Calendar,
  DollarSign,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  AlertTriangle,
  CheckCircle,
  Activity,
  Link,
  Tag,
  Edit,
  Trash2,
  Download,
  Share,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Shield,
  Zap
} from 'lucide-react';

interface AssetDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: any;
  onEdit?: (asset: any) => void;
  onDelete?: (assetId: string) => void;
}

const statusColors = {
  'Healthy': 'bg-green-100 text-green-800',
  'Degraded': 'bg-yellow-100 text-yellow-800',
  'Critical': 'bg-red-100 text-red-800',
  'Offline': 'bg-gray-100 text-gray-800'
};

const lifecycleColors = {
  'Planning': 'bg-blue-100 text-blue-800',
  'Active': 'bg-green-100 text-green-800',
  'Maintenance': 'bg-yellow-100 text-yellow-800',
  'Retired': 'bg-gray-100 text-gray-800'
};

const typeIcons = {
  'Server': Server,
  'Network': Wifi,
  'Storage': HardDrive,
  'Laptop': Server,
  'Desktop': Server,
  'Printer': Server,
  'Phone': Server,
  'Cloud': Server
};

export default function AssetDetailsModal({ isOpen, onClose, asset, onEdit, onDelete }: AssetDetailsModalProps) {
  if (!isOpen || !asset) return null;

  const TypeIcon = typeIcons[asset.type] || Server;

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBgColor = (health: number) => {
    if (health >= 90) return 'bg-green-500';
    if (health >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <TypeIcon size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{asset.name}</h2>
                <p className="text-blue-100">{asset.id} • {asset.type}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status & Health */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Activity className="mr-2 text-blue-600" size={20} />
                  Status & Health
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[asset.status]}`}>
                      {asset.status === 'Healthy' && <CheckCircle className="mr-1" size={16} />}
                      {asset.status === 'Degraded' && <AlertTriangle className="mr-1" size={16} />}
                      {asset.status === 'Critical' && <AlertTriangle className="mr-1" size={16} />}
                      {asset.status === 'Offline' && <X className="mr-1" size={16} />}
                      {asset.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lifecycle</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${lifecycleColors[asset.lifecycle]}`}>
                      {asset.lifecycle}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Health Score</label>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all ${getHealthBgColor(asset.health)}`}
                          style={{ width: `${asset.health}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-bold ${getHealthColor(asset.health)}`}>
                        {asset.health}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Cpu className="mr-2 text-purple-600" size={20} />
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Operating System</label>
                    <p className="text-sm text-gray-900">{asset.os || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CPU</label>
                    <p className="text-sm text-gray-900">{asset.cpu || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Memory</label>
                    <p className="text-sm text-gray-900">{asset.memory || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Storage</label>
                    <p className="text-sm text-gray-900">{asset.storage || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                    <p className="text-sm text-gray-900">{asset.ipAddress || 'Not assigned'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                    <p className="text-sm text-gray-900">{asset.serialNumber || 'Not available'}</p>
                  </div>
                </div>
              </div>

              {/* Dependencies & Relationships */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Link className="mr-2 text-indigo-600" size={20} />
                  Dependencies & Relationships
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dependencies</label>
                    <div className="flex flex-wrap gap-2">
                      {asset.dependencies && asset.dependencies.length > 0 ? (
                        asset.dependencies.map((dep: string, idx: number) => (
                          <span key={idx} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            <Link className="mr-1" size={14} />
                            {dep}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">No dependencies</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dependents</label>
                    <div className="flex flex-wrap gap-2">
                      {asset.dependents && asset.dependents.length > 0 ? (
                        asset.dependents.map((dep: string, idx: number) => (
                          <span key={idx} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            <Zap className="mr-1" size={14} />
                            {dep}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">No dependents</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Tag className="mr-2 text-green-600" size={20} />
                  Tags & Classification
                </h3>
                <div className="flex flex-wrap gap-2">
                  {asset.tags && asset.tags.length > 0 ? (
                    asset.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        <Tag className="mr-1" size={14} />
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No tags assigned</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="mr-2 text-blue-600" size={20} />
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Uptime</span>
                    <span className="text-sm font-medium text-gray-900">{asset.uptime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Incidents</span>
                    <span className="text-sm font-medium text-gray-900">{asset.incidents}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cost</span>
                    <span className="text-sm font-medium text-gray-900">{asset.cost}</span>
                  </div>
                </div>
              </div>

              {/* Location & Ownership */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="mr-2 text-green-600" size={20} />
                  Location & Ownership
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <p className="text-sm text-gray-900">{asset.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                    <p className="text-sm text-gray-900">{asset.owner}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <p className="text-sm text-gray-900">{asset.department || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Vendor Information */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Building className="mr-2 text-orange-600" size={20} />
                  Vendor Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                    <p className="text-sm text-gray-900">{asset.vendor}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                    <p className="text-sm text-gray-900">{asset.model}</p>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="mr-2 text-yellow-600" size={20} />
                  Financial Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
                    <p className="text-sm text-gray-900">{asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString() : 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Expiry</label>
                    <p className="text-sm text-gray-900">{asset.warrantyExpiry ? new Date(asset.warrantyExpiry).toLocaleDateString() : 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Maintenance Schedule */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="mr-2 text-purple-600" size={20} />
                  Maintenance Schedule
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Maintenance</label>
                    <p className="text-sm text-gray-900">{asset.lastMaintenance ? new Date(asset.lastMaintenance).toLocaleDateString() : 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Next Maintenance</label>
                    <p className="text-sm text-gray-900">{asset.nextMaintenance ? new Date(asset.nextMaintenance).toLocaleDateString() : 'Not scheduled'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 bg-gray-50 border-t">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onEdit?.(asset)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit size={16} />
              <span>Edit Asset</span>
            </button>
            <button
              onClick={() => onDelete?.(asset.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-300 flex items-center space-x-2">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button className="px-4 py-2 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-300 flex items-center space-x-2">
              <Share size={16} />
              <span>Share</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
