import React, { useState } from 'react';
import {
  X,
  Server,
  Router,
  HardDrive,
  Monitor,
  Printer,
  Smartphone,
  Cloud,
  Calendar,
  MapPin,
  User,
  Building,
  Tag,
  Link,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Cpu,
  HardDrive as StorageIcon,
  Wifi,
  ChevronRight,
  ChevronLeft,
  Save,
  Eye,
  Zap,
  Shield,
  Activity
} from 'lucide-react';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAsset: (asset: any) => void;
}

const assetTypes = [
  { value: 'Server', label: 'Server', icon: Server, color: 'bg-blue-100 text-blue-600', description: 'Physical or virtual servers' },
  { value: 'Network', label: 'Network Device', icon: Router, color: 'bg-green-100 text-green-600', description: 'Routers, switches, firewalls' },
  { value: 'Storage', label: 'Storage', icon: HardDrive, color: 'bg-purple-100 text-purple-600', description: 'Storage arrays, NAS, SAN' },
  { value: 'Laptop', label: 'Laptop', icon: Monitor, color: 'bg-orange-100 text-orange-600', description: 'Portable computers' },
  { value: 'Desktop', label: 'Desktop', icon: Monitor, color: 'bg-gray-100 text-gray-600', description: 'Workstation computers' },
  { value: 'Printer', label: 'Printer', icon: Printer, color: 'bg-pink-100 text-pink-600', description: 'Printing devices' },
  { value: 'Phone', label: 'Phone', icon: Smartphone, color: 'bg-indigo-100 text-indigo-600', description: 'Mobile devices' },
  { value: 'Cloud', label: 'Cloud Service', icon: Cloud, color: 'bg-cyan-100 text-cyan-600', description: 'Cloud-based services' }
];

const categories = [
  { value: 'Infrastructure', label: 'Infrastructure', icon: Server, color: 'bg-blue-50 text-blue-700' },
  { value: 'Application', label: 'Application', icon: Activity, color: 'bg-green-50 text-green-700' },
  { value: 'Endpoint', label: 'Endpoint', icon: Monitor, color: 'bg-orange-50 text-orange-700' },
  { value: 'Network', label: 'Network', icon: Router, color: 'bg-purple-50 text-purple-700' },
  { value: 'Security', label: 'Security', icon: Shield, color: 'bg-red-50 text-red-700' },
  { value: 'Storage', label: 'Storage', icon: HardDrive, color: 'bg-gray-50 text-gray-700' },
  { value: 'Database', label: 'Database', icon: HardDrive, color: 'bg-indigo-50 text-indigo-700' },
  { value: 'Monitoring', label: 'Monitoring', icon: Activity, color: 'bg-yellow-50 text-yellow-700' }
];

const statuses = [
  { value: 'Healthy', label: 'Healthy', color: 'text-green-600', bgColor: 'bg-green-100', icon: CheckCircle },
  { value: 'Degraded', label: 'Degraded', color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: AlertTriangle },
  { value: 'Critical', label: 'Critical', color: 'text-red-600', bgColor: 'bg-red-100', icon: AlertTriangle },
  { value: 'Offline', label: 'Offline', color: 'text-gray-600', bgColor: 'bg-gray-100', icon: X }
];

const lifecycles = [
  { value: 'Planning', label: 'Planning', color: 'bg-blue-100 text-blue-800' },
  { value: 'Active', label: 'Active', color: 'bg-green-100 text-green-800' },
  { value: 'Maintenance', label: 'Maintenance', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'Retired', label: 'Retired', color: 'bg-gray-100 text-gray-800' }
];

const vendors = [
  'Dell', 'HP', 'IBM', 'Cisco', 'Juniper', 'F5 Networks', 'NetApp', 'EMC',
  'Apple', 'Microsoft', 'VMware', 'AWS', 'Azure', 'Google Cloud', 'Oracle',
  'Intel', 'AMD', 'NVIDIA', 'Samsung', 'Lenovo', 'Other'
];

const stepTitles = [
  'Basic Information',
  'Location & Ownership',
  'Technical Details',
  'Dependencies & Tags'
];

export default function AddAssetModal({ isOpen, onClose, onAddAsset }: AddAssetModalProps) {
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    type: 'Server',
    category: 'Infrastructure',
    status: 'Healthy',
    lifecycle: 'Active',
    description: '',
    
    // Location & Ownership
    location: '',
    owner: '',
    department: '',
    
    // Vendor Information
    vendor: '',
    model: '',
    serialNumber: '',
    
    // Technical Specifications
    ipAddress: '',
    os: '',
    cpu: '',
    memory: '',
    storage: '',
    
    // Financial Information
    cost: '',
    purchaseDate: '',
    warrantyExpiry: '',
    
    // Maintenance
    lastMaintenance: '',
    nextMaintenance: '',
    
    // Dependencies & Tags
    dependencies: [] as string[],
    tags: [] as string[],
    
    // Additional
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [newDependency, setNewDependency] = useState('');
  const [newTag, setNewTag] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const totalSteps = 4;

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Asset name is required';
      // Type, category, and status have default values, so they should always be valid
    }

    if (step === 2) {
      if (!formData.location.trim()) newErrors.location = 'Location is required';
      if (!formData.owner.trim()) newErrors.owner = 'Owner is required';
      if (!formData.vendor.trim()) newErrors.vendor = 'Vendor is required';
      if (!formData.model.trim()) newErrors.model = 'Model is required';
    }

    if (step === 3) {
      if (!formData.cost.trim()) newErrors.cost = 'Cost is required';
      if (!formData.purchaseDate) newErrors.purchaseDate = 'Purchase date is required';
      if (!formData.warrantyExpiry) newErrors.warrantyExpiry = 'Warranty expiry is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    console.log('Current step:', currentStep);
    console.log('Form data:', formData);
    const isValid = validateStep(currentStep);
    console.log('Validation result:', isValid);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleAddDependency = () => {
    if (newDependency.trim() && !formData.dependencies.includes(newDependency.trim())) {
      setFormData(prev => ({
        ...prev,
        dependencies: [...prev.dependencies, newDependency.trim()]
      }));
      setNewDependency('');
    }
  };

  const handleRemoveDependency = (index: number) => {
    setFormData(prev => ({
      ...prev,
      dependencies: prev.dependencies.filter((_, i) => i !== index)
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Generate unique ID
      const newId = `AST-${String(Date.now()).slice(-6)}`;
      
      // Calculate health score based on status
      const healthScore = formData.status === 'Healthy' ? 95 : 
                         formData.status === 'Degraded' ? 75 : 
                         formData.status === 'Critical' ? 45 : 0;

      const newAsset = {
        id: newId,
        ...formData,
        health: healthScore,
        incidents: 0,
        uptime: '99.9%',
        dependents: [],
        cost: formData.cost.startsWith('$') ? formData.cost : `$${formData.cost}`,
        createdAt: new Date().toISOString()
      };

      onAddAsset(newAsset);
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        type: 'Server',
        category: 'Infrastructure',
        status: 'Healthy',
        lifecycle: 'Active',
        description: '',
        location: '',
        owner: '',
        department: '',
        vendor: '',
        model: '',
        serialNumber: '',
        ipAddress: '',
        os: '',
        cpu: '',
        memory: '',
        storage: '',
        cost: '',
        purchaseDate: '',
        warrantyExpiry: '',
        lastMaintenance: '',
        nextMaintenance: '',
        dependencies: [],
        tags: [],
        notes: ''
      });
      setCurrentStep(1);
      setErrors({});
      setShowPreview(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Asset Type Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Server className="mr-2 text-blue-600" size={20} />
          Asset Type & Category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {assetTypes.map(type => {
            const Icon = type.icon;
            return (
              <button
                key={type.value}
                onClick={() => handleInputChange('type', type.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.type === type.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`p-3 rounded-lg ${type.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">{type.label}</p>
                    <p className="text-xs text-gray-500">{type.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">Category</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.value}
                onClick={() => handleInputChange('category', category.value)}
                className={`p-3 rounded-lg border transition-all ${
                  formData.category === category.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon size={16} />
                  <span className="text-sm font-medium">{category.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asset Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Production Database Server"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map(status => {
                const Icon = status.icon;
                return (
                  <button
                    key={status.value}
                    onClick={() => handleInputChange('status', status.value)}
                    className={`p-3 rounded-lg border transition-all ${
                      formData.status === status.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon size={16} className={status.color} />
                      <span className="text-sm font-medium">{status.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lifecycle Stage
            </label>
            <select
              value={formData.lifecycle}
              onChange={(e) => handleInputChange('lifecycle', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {lifecycles.map(lifecycle => (
                <option key={lifecycle.value} value={lifecycle.value}>
                  {lifecycle.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the asset..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Location & Ownership */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="mr-2 text-blue-600" size={20} />
          Location & Ownership
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Data Center A, Office Floor 3"
              />
            </div>
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Owner *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={formData.owner}
                onChange={(e) => handleInputChange('owner', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.owner ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., John Doe, Platform Team"
              />
            </div>
            {errors.owner && <p className="text-red-500 text-sm mt-1">{errors.owner}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., IT, Engineering, Operations"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Information */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building className="mr-2 text-green-600" size={20} />
          Vendor Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vendor *
            </label>
            <select
              value={formData.vendor}
              onChange={(e) => handleInputChange('vendor', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.vendor ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Vendor</option>
              {vendors.map(vendor => (
                <option key={vendor} value={vendor}>
                  {vendor}
                </option>
              ))}
            </select>
            {errors.vendor && <p className="text-red-500 text-sm mt-1">{errors.vendor}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model *
            </label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.model ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., PowerEdge R750, MacBook Pro 16 inch"
            />
            {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serial Number
            </label>
            <input
              type="text"
              value={formData.serialNumber}
              onChange={(e) => handleInputChange('serialNumber', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., DL123456789"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IP Address
            </label>
            <div className="relative">
              <Wifi className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={formData.ipAddress}
                onChange={(e) => handleInputChange('ipAddress', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 192.168.1.100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Technical Specifications */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Cpu className="mr-2 text-purple-600" size={20} />
          Technical Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operating System
            </label>
            <input
              type="text"
              value={formData.os}
              onChange={(e) => handleInputChange('os', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Ubuntu 22.04 LTS, Windows Server 2022"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CPU
            </label>
            <div className="relative">
              <Cpu className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={formData.cpu}
                onChange={(e) => handleInputChange('cpu', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Intel Xeon E5-2680 v4"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Memory
            </label>
            <input
              type="text"
              value={formData.memory}
              onChange={(e) => handleInputChange('memory', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 64GB DDR4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Storage
            </label>
            <div className="relative">
              <StorageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={formData.storage}
                onChange={(e) => handleInputChange('storage', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 2TB SSD, 50TB Raw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Financial Information */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DollarSign className="mr-2 text-yellow-600" size={20} />
          Financial Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cost *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={formData.cost}
                onChange={(e) => handleInputChange('cost', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cost ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 15000 or $15,000"
              />
            </div>
            {errors.cost && <p className="text-red-500 text-sm mt-1">{errors.cost}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purchase Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.purchaseDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.purchaseDate && <p className="text-red-500 text-sm mt-1">{errors.purchaseDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Warranty Expiry *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="date"
                value={formData.warrantyExpiry}
                onChange={(e) => handleInputChange('warrantyExpiry', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.warrantyExpiry ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.warrantyExpiry && <p className="text-red-500 text-sm mt-1">{errors.warrantyExpiry}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Maintenance
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="date"
                value={formData.lastMaintenance}
                onChange={(e) => handleInputChange('lastMaintenance', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next Maintenance
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="date"
                value={formData.nextMaintenance}
                onChange={(e) => handleInputChange('nextMaintenance', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      {/* Dependencies */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Link className="mr-2 text-indigo-600" size={20} />
          Dependencies & Relationships
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dependencies
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newDependency}
                onChange={(e) => setNewDependency(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter asset ID (e.g., AST-001)"
                onKeyPress={(e) => e.key === 'Enter' && handleAddDependency()}
              />
              <button
                type="button"
                onClick={handleAddDependency}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Zap size={16} />
                <span>Add</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.dependencies.map((dep, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  <Link size={14} className="mr-2" />
                  {dep}
                  <button
                    type="button"
                    onClick={() => handleRemoveDependency(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter tag (e.g., Production, Critical)"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Tag size={16} />
                <span>Add</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  <Tag size={14} className="mr-2" />
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="mr-2 text-gray-600" size={20} />
          Additional Notes
        </h3>
        <textarea
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Any additional notes or special considerations..."
        />
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <Server size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Add New Asset</h2>
                <p className="text-blue-100">Step {currentStep} of {totalSteps} - {stepTitles[currentStep - 1]}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      i + 1 <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div
                      className={`w-16 h-1 mx-2 transition-all ${
                        i + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 pb-4 relative">
          {/* Error Summary */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="text-red-600" size={20} />
                <h3 className="text-sm font-medium text-red-800">Please fix the following errors:</h3>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
          
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 bg-gray-50 border-t flex-shrink-0 shadow-lg">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-300"
            >
              Cancel
            </button>
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                  Object.keys(errors).length > 0
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <span>{Object.keys(errors).length > 0 ? 'Fix Errors' : 'Next'}</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Save size={16} />
                <span>Create Asset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

