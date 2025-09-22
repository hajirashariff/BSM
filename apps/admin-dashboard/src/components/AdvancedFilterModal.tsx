import React, { useState } from 'react';
import {
  X,
  Filter,
  Search,
  Calendar,
  DollarSign,
  Activity,
  MapPin,
  User,
  Building,
  Tag,
  Link,
  Plus,
  Trash2,
  RotateCcw
} from 'lucide-react';

interface AdvancedFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: any;
  onFilterChange: (field: string, value: any) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onAddDependency: (dep: string) => void;
  onRemoveDependency: (dep: string) => void;
  onClearFilters: () => void;
}

const lifecycles = [
  { value: 'All', label: 'All Lifecycles' },
  { value: 'Planning', label: 'Planning' },
  { value: 'Active', label: 'Active' },
  { value: 'Maintenance', label: 'Maintenance' },
  { value: 'Retired', label: 'Retired' }
];

export default function AdvancedFilterModal({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onAddTag,
  onRemoveTag,
  onAddDependency,
  onRemoveDependency,
  onClearFilters
}: AdvancedFilterModalProps) {
  const [newTag, setNewTag] = useState('');
  const [newDependency, setNewDependency] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <Filter size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Advanced Filters</h2>
                <p className="text-blue-100">Filter assets by multiple criteria</p>
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

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Health Score Range */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="mr-2 text-green-600" size={20} />
                Health Score Range
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Health
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={filters.healthMin}
                    onChange={(e) => onFilterChange('healthMin', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Health
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={filters.healthMax}
                    onChange={(e) => onFilterChange('healthMax', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="100"
                  />
                </div>
              </div>
            </div>

            {/* Cost Range */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="mr-2 text-yellow-600" size={20} />
                Cost Range
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Cost
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="number"
                      min="0"
                      value={filters.costMin}
                      onChange={(e) => onFilterChange('costMin', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Cost
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="number"
                      min="0"
                      value={filters.costMax}
                      onChange={(e) => onFilterChange('costMax', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="100000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Date Range */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="mr-2 text-purple-600" size={20} />
                Purchase Date Range
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={filters.purchaseDateFrom}
                    onChange={(e) => onFilterChange('purchaseDateFrom', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={filters.purchaseDateTo}
                    onChange={(e) => onFilterChange('purchaseDateTo', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Warranty Expiry Range */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="mr-2 text-red-600" size={20} />
                Warranty Expiry Range
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={filters.warrantyExpiryFrom}
                    onChange={(e) => onFilterChange('warrantyExpiryFrom', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={filters.warrantyExpiryTo}
                    onChange={(e) => onFilterChange('warrantyExpiryTo', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Location & Ownership */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="mr-2 text-blue-600" size={20} />
                Location & Ownership
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) => onFilterChange('location', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Data Center A"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={filters.owner}
                      onChange={(e) => onFilterChange('owner', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., John Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendor
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={filters.vendor}
                      onChange={(e) => onFilterChange('vendor', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Dell, HP"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lifecycle Stage
                  </label>
                  <select
                    value={filters.lifecycle}
                    onChange={(e) => onFilterChange('lifecycle', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {lifecycles.map(lifecycle => (
                      <option key={lifecycle.value} value={lifecycle.value}>
                        {lifecycle.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="mr-2 text-green-600" size={20} />
                Tags
              </h3>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter tag name"
                    onKeyPress={(e) => e.key === 'Enter' && (onAddTag(newTag), setNewTag(''))}
                  />
                  <button
                    onClick={() => {
                      onAddTag(newTag);
                      setNewTag('');
                    }}
                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      <Tag className="mr-1" size={14} />
                      {tag}
                      <button
                        onClick={() => onRemoveTag(tag)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Dependencies */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Link className="mr-2 text-indigo-600" size={20} />
                Dependencies
              </h3>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newDependency}
                    onChange={(e) => setNewDependency(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter asset ID (e.g., AST-001)"
                    onKeyPress={(e) => e.key === 'Enter' && (onAddDependency(newDependency), setNewDependency(''))}
                  />
                  <button
                    onClick={() => {
                      onAddDependency(newDependency);
                      setNewDependency('');
                    }}
                    className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.dependencies.map((dep: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                    >
                      <Link className="mr-1" size={14} />
                      {dep}
                      <button
                        onClick={() => onRemoveDependency(dep)}
                        className="ml-2 text-indigo-600 hover:text-indigo-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 bg-gray-50 border-t">
          <button
            onClick={onClearFilters}
            className="px-6 py-3 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-300 flex items-center space-x-2"
          >
            <RotateCcw size={16} />
            <span>Clear All Filters</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Filter size={16} />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




