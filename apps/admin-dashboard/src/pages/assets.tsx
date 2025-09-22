import React, { useState } from 'react';
import { 
  Server, 
  Plus, 
  Search, 
  Filter, 
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Cpu,
  Wifi,
  Database,
  Monitor,
  Smartphone,
  Printer,
  Router,
  Cloud,
  Activity,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Link,
  Zap,
  Network
} from 'lucide-react';
import AddAssetModal from '../components/AddAssetModal';
import AssetDetailsModal from '../components/AssetDetailsModal';
import EditAssetModal from '../components/EditAssetModal';
import AdvancedFilterModal from '../components/AdvancedFilterModal';

const assetData = [
  {
    id: 'AST-001',
    name: 'Production Database Server',
    type: 'Server',
    category: 'Infrastructure',
    status: 'Healthy',
    health: 95,
    location: 'Data Center A',
    owner: 'Platform Team',
    vendor: 'Dell',
    model: 'PowerEdge R750',
    serialNumber: 'DL123456789',
    ipAddress: '192.168.1.100',
    os: 'Ubuntu 22.04 LTS',
    cpu: 'Intel Xeon E5-2680 v4',
    memory: '64GB DDR4',
    storage: '2TB SSD',
    purchaseDate: '2023-01-15',
    warrantyExpiry: '2026-01-15',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-04-10',
    dependencies: ['AST-002', 'AST-003'],
    dependents: ['AST-004', 'AST-005'],
    incidents: 2,
    uptime: '99.9%',
    tags: ['Production', 'Database', 'Critical'],
    cost: '$15,000',
    lifecycle: 'Active'
  },
  {
    id: 'AST-002',
    name: 'Load Balancer',
    type: 'Network',
    category: 'Infrastructure',
    status: 'Degraded',
    health: 78,
    location: 'Data Center A',
    owner: 'Network Team',
    vendor: 'F5 Networks',
    model: 'BIG-IP 4000',
    serialNumber: 'F5123456789',
    ipAddress: '192.168.1.101',
    os: 'F5 TMOS',
    cpu: 'Custom ASIC',
    memory: '16GB',
    storage: '500GB SSD',
    purchaseDate: '2022-06-20',
    warrantyExpiry: '2025-06-20',
    lastMaintenance: '2023-12-15',
    nextMaintenance: '2024-03-15',
    dependencies: [],
    dependents: ['AST-001', 'AST-004'],
    incidents: 5,
    uptime: '98.5%',
    tags: ['Load Balancer', 'Network', 'Critical'],
    cost: '$25,000',
    lifecycle: 'Active'
  },
  {
    id: 'AST-003',
    name: 'Backup Storage Array',
    type: 'Storage',
    category: 'Infrastructure',
    status: 'Healthy',
    health: 92,
    location: 'Data Center B',
    owner: 'Storage Team',
    vendor: 'NetApp',
    model: 'FAS2750',
    serialNumber: 'NA987654321',
    ipAddress: '192.168.2.100',
    os: 'ONTAP 9.8',
    cpu: 'Intel Xeon E5-2620',
    memory: '32GB',
    storage: '50TB Raw',
    purchaseDate: '2023-03-10',
    warrantyExpiry: '2026-03-10',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-04-05',
    dependencies: [],
    dependents: ['AST-001'],
    incidents: 1,
    uptime: '99.8%',
    tags: ['Backup', 'Storage', 'Important'],
    cost: '$45,000',
    lifecycle: 'Active'
  },
  {
    id: 'AST-004',
    name: 'Web Application Server',
    type: 'Server',
    category: 'Application',
    status: 'Healthy',
    health: 88,
    location: 'Data Center A',
    owner: 'Development Team',
    vendor: 'HP',
    model: 'ProLiant DL380',
    serialNumber: 'HP456789123',
    ipAddress: '192.168.1.102',
    os: 'CentOS 8',
    cpu: 'Intel Xeon E5-2640',
    memory: '32GB DDR4',
    storage: '1TB SSD',
    purchaseDate: '2022-11-05',
    warrantyExpiry: '2025-11-05',
    lastMaintenance: '2023-12-20',
    nextMaintenance: '2024-03-20',
    dependencies: ['AST-001', 'AST-002'],
    dependents: [],
    incidents: 3,
    uptime: '99.2%',
    tags: ['Web', 'Application', 'Production'],
    cost: '$12,000',
    lifecycle: 'Active'
  },
  {
    id: 'AST-005',
    name: 'Development Laptop - John Doe',
    type: 'Laptop',
    category: 'Endpoint',
    status: 'Healthy',
    health: 85,
    location: 'Office Floor 3',
    owner: 'John Doe',
    vendor: 'Apple',
    model: 'MacBook Pro 16"',
    serialNumber: 'MB123456789',
    ipAddress: '192.168.10.50',
    os: 'macOS Sonoma',
    cpu: 'Apple M2 Pro',
    memory: '32GB',
    storage: '1TB SSD',
    purchaseDate: '2023-08-15',
    warrantyExpiry: '2026-08-15',
    lastMaintenance: '2024-01-12',
    nextMaintenance: '2024-04-12',
    dependencies: [],
    dependents: [],
    incidents: 1,
    uptime: '95.0%',
    tags: ['Development', 'Laptop', 'Personal'],
    cost: '$3,500',
    lifecycle: 'Active'
  }
];

const statusColors = {
  'Healthy': 'bg-green-100 text-green-800',
  'Degraded': 'bg-yellow-100 text-yellow-800',
  'Critical': 'bg-red-100 text-red-800',
  'Offline': 'bg-gray-100 text-gray-800'
};

const typeIcons = {
  'Server': Server,
  'Network': Router,
  'Storage': HardDrive,
  'Laptop': Monitor,
  'Desktop': Monitor,
  'Printer': Printer,
  'Phone': Smartphone,
  'Cloud': Cloud
};

const lifecycleColors = {
  'Planning': 'bg-blue-100 text-blue-800',
  'Active': 'bg-green-100 text-green-800',
  'Maintenance': 'bg-yellow-100 text-yellow-800',
  'Retired': 'bg-gray-100 text-gray-800'
};

export default function AssetsPage() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assets, setAssets] = useState(assetData);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    healthMin: '',
    healthMax: '',
    costMin: '',
    costMax: '',
    purchaseDateFrom: '',
    purchaseDateTo: '',
    warrantyExpiryFrom: '',
    warrantyExpiryTo: '',
    location: '',
    owner: '',
    vendor: '',
    lifecycle: 'All',
    tags: [] as string[],
    dependencies: [] as string[]
  });

  const getProgressBarClass = (health: number) => {
    if (health >= 90) return 'progress-bar-90';
    if (health >= 85) return 'progress-bar-85';
    if (health >= 80) return 'progress-bar-78';
    return 'progress-bar-78';
  };

  const filteredAssets = assets.filter(asset => {
    // Basic filters
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || asset.status === filterStatus;
    const matchesType = filterType === 'All' || asset.type === filterType;
    
    // Advanced filters
    const matchesHealth = (!advancedFilters.healthMin || asset.health >= parseInt(advancedFilters.healthMin)) &&
                         (!advancedFilters.healthMax || asset.health <= parseInt(advancedFilters.healthMax));
    
    const assetCost = parseFloat(asset.cost?.replace(/[$,]/g, '') || '0');
    const matchesCost = (!advancedFilters.costMin || assetCost >= parseFloat(advancedFilters.costMin)) &&
                       (!advancedFilters.costMax || assetCost <= parseFloat(advancedFilters.costMax));
    
    const matchesPurchaseDate = (!advancedFilters.purchaseDateFrom || new Date(asset.purchaseDate) >= new Date(advancedFilters.purchaseDateFrom)) &&
                               (!advancedFilters.purchaseDateTo || new Date(asset.purchaseDate) <= new Date(advancedFilters.purchaseDateTo));
    
    const matchesWarrantyExpiry = (!advancedFilters.warrantyExpiryFrom || new Date(asset.warrantyExpiry) >= new Date(advancedFilters.warrantyExpiryFrom)) &&
                                 (!advancedFilters.warrantyExpiryTo || new Date(asset.warrantyExpiry) <= new Date(advancedFilters.warrantyExpiryTo));
    
    const matchesLocation = !advancedFilters.location || asset.location.toLowerCase().includes(advancedFilters.location.toLowerCase());
    const matchesOwner = !advancedFilters.owner || asset.owner.toLowerCase().includes(advancedFilters.owner.toLowerCase());
    const matchesVendor = !advancedFilters.vendor || asset.vendor.toLowerCase().includes(advancedFilters.vendor.toLowerCase());
    const matchesLifecycle = advancedFilters.lifecycle === 'All' || asset.lifecycle === advancedFilters.lifecycle;
    
    const matchesTags = advancedFilters.tags.length === 0 || 
                       advancedFilters.tags.some(tag => asset.tags?.includes(tag));
    
    const matchesDependencies = advancedFilters.dependencies.length === 0 || 
                               advancedFilters.dependencies.some(dep => asset.dependencies?.includes(dep));
    
    return matchesSearch && matchesStatus && matchesType && matchesHealth && matchesCost && 
           matchesPurchaseDate && matchesWarrantyExpiry && matchesLocation && matchesOwner && 
           matchesVendor && matchesLifecycle && matchesTags && matchesDependencies;
  });

  const totalAssets = assets.length;
  const healthyAssets = assets.filter(a => a.status === 'Healthy').length;
  const criticalAssets = assets.filter(a => a.status === 'Critical').length;
  const totalValue = assets.reduce((sum, asset) => sum + parseFloat(asset.cost.replace('$', '').replace(',', '')), 0);

  const handleAddAsset = (newAsset: any) => {
    setAssets(prev => [newAsset, ...prev]);
    setIsAddModalOpen(false);
  };

  const handleViewDetails = (asset: any) => {
    setSelectedAsset(asset);
    setIsDetailsModalOpen(true);
  };

  const handleEditAsset = (asset: any) => {
    setSelectedAsset(asset);
    setIsEditModalOpen(true);
  };

  const handleUpdateAsset = (updatedAsset: any) => {
    setAssets(prev => prev.map(asset => 
      asset.id === updatedAsset.id ? updatedAsset : asset
    ));
    setIsEditModalOpen(false);
    setSelectedAsset(null);
  };

  const handleDeleteAsset = (assetId: string) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      setAssets(prev => prev.filter(asset => asset.id !== assetId));
      setIsDetailsModalOpen(false);
      setSelectedAsset(null);
    }
  };

  const handleAdvancedFilterChange = (field: string, value: any) => {
    setAdvancedFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !advancedFilters.tags.includes(tag.trim())) {
      setAdvancedFilters(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setAdvancedFilters(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddDependency = (dep: string) => {
    if (dep.trim() && !advancedFilters.dependencies.includes(dep.trim())) {
      setAdvancedFilters(prev => ({
        ...prev,
        dependencies: [...prev.dependencies, dep.trim()]
      }));
    }
  };

  const handleRemoveDependency = (depToRemove: string) => {
    setAdvancedFilters(prev => ({
      ...prev,
      dependencies: prev.dependencies.filter(dep => dep !== depToRemove)
    }));
  };

  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      healthMin: '',
      healthMax: '',
      costMin: '',
      costMax: '',
      purchaseDateFrom: '',
      purchaseDateTo: '',
      warrantyExpiryFrom: '',
      warrantyExpiryTo: '',
      location: '',
      owner: '',
      vendor: '',
      lifecycle: 'All',
      tags: [],
      dependencies: []
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
          <p className="text-gray-600">Service mapping, CMDB-lite, and asset lifecycle management</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Asset</span>
        </button>
      </div>

      {/* Asset Overview KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-2xl font-bold text-gray-900">{totalAssets}</p>
              <p className="text-sm text-blue-600">+2 this month</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <Server className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Healthy Assets</p>
              <p className="text-2xl font-bold text-gray-900">{healthyAssets}</p>
              <p className="text-sm text-green-600">{Math.round((healthyAssets/totalAssets)*100)}% of total</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Issues</p>
              <p className="text-2xl font-bold text-gray-900">{criticalAssets}</p>
              <p className="text-sm text-red-600">Requires attention</p>
            </div>
            <div className="p-3 rounded-lg bg-red-50">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
              <p className="text-sm text-purple-600">Asset portfolio</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Service Mapping Visualization */}
      <div className="card bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Network className="text-indigo-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Service Mapping & Dependencies</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Link className="text-blue-600" size={16} />
              <span className="font-medium">Dependencies</span>
            </div>
            <p className="text-sm text-gray-600">15 dependency relationships mapped</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="text-red-600" size={16} />
              <span className="font-medium">Impact Analysis</span>
            </div>
            <p className="text-sm text-gray-600">3 assets with high impact risk</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="text-yellow-600" size={16} />
              <span className="font-medium">Change Impact</span>
            </div>
            <p className="text-sm text-gray-600">Real-time impact assessment</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search assets..."
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
              <option value="Healthy">Healthy</option>
              <option value="Degraded">Degraded</option>
              <option value="Critical">Critical</option>
              <option value="Offline">Offline</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Types</option>
              <option value="Server">Server</option>
              <option value="Network">Network</option>
              <option value="Storage">Storage</option>
              <option value="Laptop">Laptop</option>
              <option value="Desktop">Desktop</option>
            </select>
          </div>
          <button
            onClick={() => setIsAdvancedFilterOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Filter size={20} className="text-gray-600" />
            <span className="text-sm text-gray-700">Advanced Filters</span>
          </button>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => {
          const TypeIcon = typeIcons[asset.type] || Server;
          return (
            <div key={asset.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <TypeIcon size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
                      <p className="text-sm text-gray-600">{asset.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[asset.status]}`}>
                      {asset.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${lifecycleColors[asset.lifecycle]}`}>
                      {asset.lifecycle}
                    </span>
                  </div>

                  {/* Health Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Health Score</span>
                      <span className="text-sm text-gray-600">{asset.health}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`progress-bar ${getProgressBarClass(asset.health)} ${
                        asset.health >= 90 ? 'bg-green-500' :
                        asset.health >= 80 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                    ></div>
                    </div>
                  </div>

                  {/* Key Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Vendor</span>
                      <span className="text-sm font-medium text-gray-900">{asset.vendor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Location</span>
                      <span className="text-sm font-medium text-gray-900">{asset.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Owner</span>
                      <span className="text-sm font-medium text-gray-900">{asset.owner}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Cost</span>
                      <span className="text-sm font-medium text-gray-900">{asset.cost}</span>
                    </div>
                  </div>

                  {/* Dependencies */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Dependencies</p>
                    <div className="flex flex-wrap gap-1">
                      {asset.dependencies.length > 0 ? (
                        asset.dependencies.map((dep, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {dep}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">No dependencies</span>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {asset.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <button 
                    onClick={() => handleViewDetails(asset)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="View Details"
                  >
                    <Eye size={16} className="text-gray-400" />
                  </button>
                  <button 
                    onClick={() => handleEditAsset(asset)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Edit Asset"
                  >
                    <Edit size={16} className="text-gray-400" />
                  </button>
                  <button 
                    onClick={() => handleDeleteAsset(asset.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Delete Asset"
                  >
                    <Trash2 size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Activity size={12} />
                    <span>{asset.uptime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>Next: {asset.nextMaintenance}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleViewDetails(asset)}
                  className="btn-primary text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Asset Modal */}
      <AddAssetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddAsset={handleAddAsset}
      />

      {/* Asset Details Modal */}
      <AssetDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedAsset(null);
        }}
        asset={selectedAsset}
        onEdit={handleEditAsset}
        onDelete={handleDeleteAsset}
      />

      {/* Edit Asset Modal */}
      <EditAssetModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAsset(null);
        }}
        asset={selectedAsset}
        onUpdateAsset={handleUpdateAsset}
      />

      {/* Advanced Filter Modal */}
      <AdvancedFilterModal
        isOpen={isAdvancedFilterOpen}
        onClose={() => setIsAdvancedFilterOpen(false)}
        filters={advancedFilters}
        onFilterChange={handleAdvancedFilterChange}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onAddDependency={handleAddDependency}
        onRemoveDependency={handleRemoveDependency}
        onClearFilters={clearAdvancedFilters}
      />
    </div>
  );
}



