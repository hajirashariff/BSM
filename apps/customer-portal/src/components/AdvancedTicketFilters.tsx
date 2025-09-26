import React, { useState } from 'react';
import { X, Filter, Calendar, User, Tag, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { TicketFilters } from '../lib/ticketService';
import FilterDropdown from './FilterDropdown';

interface AdvancedTicketFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: TicketFilters) => void;
  currentFilters: TicketFilters;
}

const statusOptions = [
  { id: 'open', label: 'Open', icon: AlertCircle, color: 'text-blue-600' },
  { id: 'in_progress', label: 'In Progress', icon: Clock, color: 'text-yellow-600' },
  { id: 'pending', label: 'Pending', icon: Clock, color: 'text-orange-600' },
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
  { id: 'general', label: 'General Inquiry' },
  { id: 'feature_request', label: 'Feature Request' },
  { id: 'bug_report', label: 'Bug Report' },
];

const assigneeOptions = [
  { id: 'sarah-johnson', label: 'Sarah Johnson' },
  { id: 'mike-chen', label: 'Mike Chen' },
  { id: 'alex-rodriguez', label: 'Alex Rodriguez' },
  { id: 'sarah-wilson', label: 'Sarah Wilson' },
  { id: 'david-lee', label: 'David Lee' },
];

export default function AdvancedTicketFilters({ isOpen, onClose, onApplyFilters, currentFilters }: AdvancedTicketFiltersProps) {
  const [filters, setFilters] = useState<TicketFilters>(currentFilters);


  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters: TicketFilters = {
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
          <FilterDropdown
            label="Status"
            options={statusOptions.map(status => ({
              id: status.id,
              label: status.label,
              icon: status.icon,
              color: status.color
            }))}
            selectedValues={filters.status || []}
            onSelectionChange={(values) => setFilters(prev => ({ ...prev, status: values }))}
            placeholder="Select statuses..."
            searchable={true}
            multiSelect={true}
          />

          {/* Priority */}
          <FilterDropdown
            label="Priority"
            options={priorityOptions.map(priority => ({
              id: priority.id,
              label: priority.label,
              color: priority.color
            }))}
            selectedValues={filters.priority || []}
            onSelectionChange={(values) => setFilters(prev => ({ ...prev, priority: values }))}
            placeholder="Select priorities..."
            searchable={true}
            multiSelect={true}
          />

          {/* Category */}
          <FilterDropdown
            label="Category"
            options={categoryOptions.map(category => ({
              id: category.id,
              label: category.label
            }))}
            selectedValues={filters.category || []}
            onSelectionChange={(values) => setFilters(prev => ({ ...prev, category: values }))}
            placeholder="Select categories..."
            searchable={true}
            multiSelect={true}
          />

          {/* Assignee */}
          <FilterDropdown
            label="Assignee"
            options={assigneeOptions.map(assignee => ({
              id: assignee.id,
              label: assignee.label,
              icon: User
            }))}
            selectedValues={filters.assignee || []}
            onSelectionChange={(values) => setFilters(prev => ({ ...prev, assignee: values }))}
            placeholder="Select assignees..."
            searchable={true}
            multiSelect={true}
          />

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
