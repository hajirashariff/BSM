import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Server, 
  ArrowLeft, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Monitor,
  HardDrive,
  Cpu,
  Wifi,
  Database,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  Activity,
  Zap,
  Globe,
  Building2,
  User,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  XCircle
} from 'lucide-react';

interface ITAsset {
  id: string;
  name: string;
  type: 'server' | 'workstation' | 'laptop' | 'printer' | 'network' | 'storage';
  manufacturer: string;
  model: string;
  serialNumber: string;
  status: 'active' | 'maintenance' | 'retired' | 'offline';
  location: string;
  assignedTo: string;
  department: string;
  purchaseDate: string;
  warrantyExpiry: string;
  lastMaintenance: string;
  nextMaintenance: string;
  cost: number;
  specifications: {
    cpu?: string;
    ram?: string;
    storage?: string;
    os?: string;
  };
  ipAddress?: string;
  macAddress?: string;
  software: string[];
  issues: number;
  uptime: number;
}

export default function ITAssets() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<ITAsset | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ensure client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [assets, setAssets] = useState<ITAsset[]>([
    {
      id: 'AST-001',
      name: 'Web Server 01',
      type: 'server',
      manufacturer: 'Dell',
      model: 'PowerEdge R740',
      serialNumber: 'DL123456789',
      status: 'active',
      location: 'Data Center A',
      assignedTo: 'IT Department',
      department: 'Infrastructure',
      purchaseDate: '2022-03-15',
      warrantyExpiry: '2025-03-15',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      cost: 15000,
      specifications: {
        cpu: 'Intel Xeon Gold 6248R',
        ram: '64GB DDR4',
        storage: '2TB SSD',
        os: 'Ubuntu Server 22.04'
      },
      ipAddress: '192.168.1.100',
      macAddress: '00:1B:44:11:3A:B7',
      software: ['Apache', 'MySQL', 'PHP', 'Docker'],
      issues: 2,
      uptime: 99.8
    },
    {
      id: 'AST-002',
      name: 'Development Workstation',
      type: 'workstation',
      manufacturer: 'HP',
      model: 'Z4 G4',
      serialNumber: 'HP987654321',
      status: 'active',
      location: 'Office Floor 2',
      assignedTo: 'John Smith',
      department: 'Development',
      purchaseDate: '2023-01-20',
      warrantyExpiry: '2026-01-20',
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-07-05',
      cost: 3500,
      specifications: {
        cpu: 'Intel Core i7-12700K',
        ram: '32GB DDR4',
        storage: '1TB NVMe SSD',
        os: 'Windows 11 Pro'
      },
      ipAddress: '192.168.1.150',
      macAddress: '00:1B:44:11:3A:B8',
      software: ['Visual Studio', 'Docker Desktop', 'Git', 'Node.js'],
      issues: 0,
      uptime: 100
    },
    {
      id: 'AST-003',
      name: 'Network Switch Core',
      type: 'network',
      manufacturer: 'Cisco',
      model: 'Catalyst 9300',
      serialNumber: 'CS456789123',
      status: 'active',
      location: 'Network Rack 1',
      assignedTo: 'Network Team',
      department: 'Infrastructure',
      purchaseDate: '2021-11-10',
      warrantyExpiry: '2024-11-10',
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-07-12',
      cost: 8000,
      specifications: {
        cpu: 'ARM Cortex-A9',
        ram: '4GB',
        storage: '16GB Flash',
        os: 'Cisco IOS'
      },
      ipAddress: '192.168.1.1',
      macAddress: '00:1B:44:11:3A:B9',
      software: ['Cisco IOS', 'SNMP Agent'],
      issues: 1,
      uptime: 99.9
    },
    {
      id: 'AST-004',
      name: 'Storage Array',
      type: 'storage',
      manufacturer: 'NetApp',
      model: 'FAS2750',
      serialNumber: 'NA789123456',
      status: 'maintenance',
      location: 'Data Center B',
      assignedTo: 'Storage Team',
      department: 'Infrastructure',
      purchaseDate: '2020-08-05',
      warrantyExpiry: '2025-08-05',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-01-20',
      cost: 25000,
      specifications: {
        cpu: 'Intel Xeon E5-2620',
        ram: '128GB DDR4',
        storage: '50TB HDD',
        os: 'ONTAP 9.8'
      },
      ipAddress: '192.168.2.100',
      macAddress: '00:1B:44:11:3A:BA',
      software: ['ONTAP', 'SnapMirror', 'SnapVault'],
      issues: 0,
      uptime: 99.5
    },
    {
      id: 'AST-005',
      name: 'Marketing Laptop',
      type: 'laptop',
      manufacturer: 'Apple',
      model: 'MacBook Pro 16"',
      serialNumber: 'AP321654987',
      status: 'active',
      location: 'Office Floor 3',
      assignedTo: 'Sarah Johnson',
      department: 'Marketing',
      purchaseDate: '2023-06-01',
      warrantyExpiry: '2026-06-01',
      lastMaintenance: '2024-01-08',
      nextMaintenance: '2024-07-08',
      cost: 2800,
      specifications: {
        cpu: 'Apple M2 Pro',
        ram: '16GB Unified Memory',
        storage: '512GB SSD',
        os: 'macOS Ventura'
      },
      ipAddress: '192.168.1.200',
      macAddress: '00:1B:44:11:3A:BB',
      software: ['Adobe Creative Suite', 'Figma', 'Slack', 'Zoom'],
      issues: 1,
      uptime: 98.5
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'server': return <Server className="text-blue-600" size={20} />;
      case 'workstation': return <Monitor className="text-green-600" size={20} />;
      case 'laptop': return <Monitor className="text-purple-600" size={20} />;
      case 'printer': return <HardDrive className="text-orange-600" size={20} />;
      case 'network': return <Wifi className="text-indigo-600" size={20} />;
      case 'storage': return <Database className="text-red-600" size={20} />;
      default: return <Server className="text-gray-600" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'retired': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'offline': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99.5) return 'text-green-600';
    if (uptime >= 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || asset.type === filterType;
    const matchesStatus = filterStatus === 'all' || asset.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const refreshData = async () => {
    if (!isClient) return; // Only run on client side
    
    try {
      setIsRefreshing(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsRefreshing(false);
    } catch (err) {
      setError('Failed to refresh data');
      setIsRefreshing(false);
    }
  };

  const handleAssetClick = (asset: ITAsset) => {
    if (!isClient) return; // Only run on client side
    
    try {
      setError(null);
      setSelectedAsset(asset);
    } catch (err) {
      setError('Failed to open asset details');
    }
  };

  const closeAssetDetails = () => {
    if (!isClient) return; // Only run on client side
    setSelectedAsset(null);
  };

  const addNewAsset = () => {
    if (!isClient) return; // Only run on client side
    
    try {
      setError(null);
      // For now, just show an alert - in a real app, this would open a form
      alert('Add New Asset functionality would open a form here');
    } catch (err) {
      setError('Failed to open add asset form');
    }
  };

  const exportAssets = () => {
    if (!isClient) return; // Only run on client side
    
    try {
      setError(null);
      // For now, just show an alert - in a real app, this would export data
      alert('Export functionality would download asset data here');
    } catch (err) {
      setError('Failed to export assets');
    }
  };

  const totalAssets = assets.length;
  const activeAssets = assets.filter(a => a.status === 'active').length;
  const totalValue = assets.reduce((sum, asset) => sum + asset.cost, 0);
  const avgUptime = assets.reduce((sum, asset) => sum + asset.uptime, 0) / assets.length;

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <Server className="text-white animate-pulse" size={24} />
          </div>
          <p className="text-gray-600 font-medium">Loading IT Assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-6 mt-4">
          <div className="flex items-center">
            <AlertTriangle className="mr-2" size={20} />
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <XCircle size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="text-gray-600" size={20} />
              </button>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Server className="text-purple-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">IT Assets</h1>
                <p className="text-sm text-gray-600">Manage and monitor IT infrastructure</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshData}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all duration-300 ${isRefreshing ? 'animate-pulse' : ''}`}
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                <span className="text-sm font-medium">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
              
              <button 
                onClick={addNewAsset}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Plus size={16} />
                <span className="text-sm font-medium">Add Asset</span>
              </button>
              
              <button 
                onClick={exportAssets}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Download size={16} />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Assets</p>
                <p className="text-3xl font-bold text-gray-900">{totalAssets}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Server className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Assets</p>
                <p className="text-3xl font-bold text-green-600">{activeAssets}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Value</p>
                <p className="text-3xl font-bold text-blue-600">${totalValue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Avg. Uptime</p>
                <p className="text-3xl font-bold text-green-600">{avgUptime.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="server">Server</option>
                <option value="workstation">Workstation</option>
                <option value="laptop">Laptop</option>
                <option value="printer">Printer</option>
                <option value="network">Network</option>
                <option value="storage">Storage</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="retired">Retired</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assets List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">IT Assets ({filteredAssets.length})</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleAssetClick(asset)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold text-gray-900">{asset.id}</span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium border ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-2">
                      {getTypeIcon(asset.type)}
                      <h4 className="text-lg font-semibold text-gray-900">{asset.name}</h4>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{asset.manufacturer} {asset.model}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{asset.assignedTo}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Building2 size={16} />
                        <span>{asset.department}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Globe size={16} />
                        <span>{asset.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>Purchased: {asset.purchaseDate}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-1">
                        <DollarSign size={16} />
                        <span className="font-medium">${asset.cost.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Activity size={16} />
                        <span className={`font-medium ${getUptimeColor(asset.uptime)}`}>
                          {asset.uptime}% uptime
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <AlertTriangle size={16} />
                        <span>{asset.issues} issues</span>
                      </div>
                      {asset.ipAddress && (
                        <div className="flex items-center space-x-1">
                          <Wifi size={16} />
                          <span>{asset.ipAddress}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      {asset.software.slice(0, 3).map((software, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                          {software}
                        </span>
                      ))}
                      {asset.software.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{asset.software.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isClient) {
                          alert(`Asset ${asset.id} actions menu would open here`);
                        }
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Details Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(selectedAsset.type)}
                  <h2 className="text-xl font-bold text-gray-900">{selectedAsset.name}</h2>
                </div>
                <button
                  onClick={closeAssetDetails}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Asset ID</label>
                      <p className="text-gray-900">{selectedAsset.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Type</label>
                      <p className="text-gray-900 capitalize">{selectedAsset.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Manufacturer</label>
                      <p className="text-gray-900">{selectedAsset.manufacturer}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Model</label>
                      <p className="text-gray-900">{selectedAsset.model}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Serial Number</label>
                      <p className="text-gray-900 font-mono">{selectedAsset.serialNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium border ${getStatusColor(selectedAsset.status)}`}>
                        {selectedAsset.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment & Location</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Assigned To</label>
                      <p className="text-gray-900">{selectedAsset.assignedTo}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Department</label>
                      <p className="text-gray-900">{selectedAsset.department}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Location</label>
                      <p className="text-gray-900">{selectedAsset.location}</p>
                    </div>
                    {selectedAsset.ipAddress && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">IP Address</label>
                        <p className="text-gray-900 font-mono">{selectedAsset.ipAddress}</p>
                      </div>
                    )}
                    {selectedAsset.macAddress && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">MAC Address</label>
                        <p className="text-gray-900 font-mono">{selectedAsset.macAddress}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedAsset.specifications.cpu && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">CPU</label>
                      <p className="text-gray-900">{selectedAsset.specifications.cpu}</p>
                    </div>
                  )}
                  {selectedAsset.specifications.ram && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">RAM</label>
                      <p className="text-gray-900">{selectedAsset.specifications.ram}</p>
                    </div>
                  )}
                  {selectedAsset.specifications.storage && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Storage</label>
                      <p className="text-gray-900">{selectedAsset.specifications.storage}</p>
                    </div>
                  )}
                  {selectedAsset.specifications.os && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Operating System</label>
                      <p className="text-gray-900">{selectedAsset.specifications.os}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Purchase Cost</label>
                    <p className="text-2xl font-bold text-blue-600">${selectedAsset.cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Purchase Date</label>
                    <p className="text-gray-900">{selectedAsset.purchaseDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Warranty Expiry</label>
                    <p className="text-gray-900">{selectedAsset.warrantyExpiry}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Last Maintenance</label>
                    <p className="text-gray-900">{selectedAsset.lastMaintenance}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Next Maintenance</label>
                    <p className="text-gray-900">{selectedAsset.nextMaintenance}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Uptime</label>
                    <p className={`text-2xl font-bold ${getUptimeColor(selectedAsset.uptime)}`}>
                      {selectedAsset.uptime}%
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Active Issues</label>
                    <p className="text-2xl font-bold text-orange-600">{selectedAsset.issues}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Installed Software</h3>
                <div className="flex items-center space-x-2 flex-wrap">
                  {selectedAsset.software.map((software, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      {software}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-end space-x-4">
                <button 
                  onClick={closeAssetDetails}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (isClient) {
                      alert('Update Asset functionality would open an edit form here');
                    }
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Update Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
