import React, { useState } from 'react';
import { X, Filter, Calendar, User, Tag, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

interface AdvancedTicketFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  currentFilters: FilterState;
}

interface FilterState {
  status: string[];
  priority: string[];
  category: string[];
  assignee: string[];
  dateRange: {
    start: string;
    end: string;
  };
  searchTerm: string;
}

const statusOptions = [
  { id: 'open', label: 'Open', icon: AlertCircle, color: 'text-blue-600' },
  { id: 'in-progress', label: 'In Progress', icon: Clock, color: 'text-yellow-600' },
  { id: 'resolved', label: 'Resolved', icon: CheckCircle, color: 'text-green-600' },
  { id: 'closed', label: 'Closed', icon: XCircle, color: 'text-gray-600' },
];

const priorityOptions = [
  { id: 'low', label: 'Low', color: 'text-green-600' },
  { id: 'medium', label: 'Medium', color: 'text-yellow-600' },
  { id: 'high', label: 'High', color: 'text-orange-600' },
  { id: 'urgent', label: 'Urgent', color: 'text-red-600' },
];

const categoryOptions = [
  { id: 'technical', label: 'Technical Support' },
  { id: 'billing', label: 'Billing & Invoices' },
  { id: 'access', label: 'Access & Permissions' },
  { id: 'general', label: 'General Inquiry' },
];

const assigneeOptions = [
  { id: 'sarah-johnson', label: 'Sarah Johnson' },
  { id: 'mike-chen', label: 'Mike Chen' },
  { id: 'alex-rodriguez', label: 'Alex Rodriguez' },
  { id: 'sarah-wilson', label: 'Sarah Wilson' },
  { id: 'david-lee', label: 'David Lee' },
];

export default function AdvancedTicketFilters({ isOpen, onClose, onApplyFilters, currentFilters }: AdvancedTicketFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(currentFilters);

  const handleStatusToggle = (statusId: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(statusId)
        ? prev.status.filter(id => id !== statusId)
        : [...prev.status, statusId]
    }));
  };

  const handlePriorityToggle = (priorityId: string) => {
    setFilters(prev => ({
      ...prev,
      priority: prev.priority.includes(priorityId)
        ? prev.priority.filter(id => id !== priorityId)
        : [...prev.priority, priorityId]
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(categoryId)
        ? prev.category.filter(id => id !== categoryId)
        : [...prev.category, categoryId]
    }));
  };

  const handleAssigneeToggle = (assigneeId: string) => {
    setFilters(prev => ({
      ...prev,
      assignee: prev.assignee.includes(assigneeId)
        ? prev.assignee.filter(id => id !== assigneeId)
        : [...prev.assignee, assigneeId]
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters: FilterState = {
      status: [],
      priority: [],
      category: [],
      assignee: [],
      dateRange: { start: '', end: '' },
      searchTerm: ''
    };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Advanced Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500 dark:text-zinc-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Term */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Search in tickets
            </label>
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-800 dark:text-zinc-100"
              placeholder="Search by subject, description, or ticket ID..."
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-3">
              Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              {statusOptions.map((status) => {
                const Icon = status.icon;
                return (
                  <button
                    key={status.id}
                    onClick={() => handleStatusToggle(status.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      filters.status.includes(status.id)
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:border-primary-400'
                        : 'border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon size={16} className={status.color} />
                      <span className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                        {status.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-3">
              Priority
            </label>
            <div className="grid grid-cols-4 gap-2">
              {priorityOptions.map((priority) => (
                <button
                  key={priority.id}
                  onClick={() => handlePriorityToggle(priority.id)}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    filters.priority.includes(priority.id)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:border-primary-400'
                      : 'border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600'
                  }`}
                >
                  <span className={`text-sm font-medium ${priority.color}`}>
                    {priority.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-3">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categoryOptions.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    filters.category.includes(category.id)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:border-primary-400'
                      : 'border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                    {category.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-3">
              Assignee
            </label>
            <div className="space-y-2">
              {assigneeOptions.map((assignee) => (
                <button
                  key={assignee.id}
                  onClick={() => handleAssigneeToggle(assignee.id)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    filters.assignee.includes(assignee.id)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:border-primary-400'
                      : 'border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-gray-500 dark:text-zinc-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                      {assignee.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-3">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-zinc-400 mb-1">From</label>
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-zinc-400 mb-1">To</label>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 dark:border-zinc-700 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-gray-700 dark:text-zinc-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          >
            Clear All
          </button>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-zinc-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center space-x-2"
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
