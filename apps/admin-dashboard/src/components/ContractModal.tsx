import React, { useState } from 'react';
import { X, FileText, Save, Calendar, DollarSign, User, Building2 } from 'lucide-react';

interface Contract {
  id: string;
  contractNumber: string;
  name: string;
  value: string;
  startDate: string;
  endDate: string;
  status: string;
  type: string;
  renewalTerms: string;
  paymentTerms: string;
  description: string;
  assignedTo: string;
  notes: string;
}

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contract: Contract) => void;
  accountName: string;
  existingContract?: Contract | null;
  isEdit?: boolean;
}

export default function ContractModal({ 
  isOpen, 
  onClose, 
  onSave, 
  accountName, 
  existingContract = null, 
  isEdit = false 
}: ContractModalProps) {
  const [formData, setFormData] = useState<Contract>({
    id: existingContract?.id || `CTR-${String(Date.now()).slice(-6)}`,
    contractNumber: existingContract?.contractNumber || '',
    name: existingContract?.name || `${accountName} Service Contract`,
    value: existingContract?.value || '',
    startDate: existingContract?.startDate || new Date().toISOString().split('T')[0],
    endDate: existingContract?.endDate || '',
    status: existingContract?.status || 'Active',
    type: existingContract?.type || 'Service Agreement',
    renewalTerms: existingContract?.renewalTerms || 'Annual',
    paymentTerms: existingContract?.paymentTerms || 'Net 30',
    description: existingContract?.description || '',
    assignedTo: existingContract?.assignedTo || '',
    notes: existingContract?.notes || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const contractTypes = [
    'Service Agreement',
    'Support Contract',
    'License Agreement',
    'Maintenance Contract',
    'SLA Agreement',
    'Consulting Agreement',
    'Custom Contract'
  ];

  const contractStatuses = [
    'Draft',
    'Active',
    'Expired',
    'Renewed',
    'Terminated',
    'Pending Renewal'
  ];

  const renewalTerms = [
    'Monthly',
    'Quarterly',
    'Semi-Annual',
    'Annual',
    'Bi-Annual',
    'One-time',
    'Custom'
  ];

  const paymentTerms = [
    'Net 15',
    'Net 30',
    'Net 45',
    'Net 60',
    'Due on Receipt',
    'Prepaid',
    'Custom'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.contractNumber.trim()) newErrors.contractNumber = 'Contract number is required';
    if (!formData.name.trim()) newErrors.name = 'Contract name is required';
    if (!formData.value.trim()) newErrors.value = 'Contract value is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';

    // Date validation
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate <= startDate) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    // Value validation
    if (formData.value && !/^\$?[\d,]+(\.\d{2})?$/.test(formData.value.replace(/[$,]/g, ''))) {
      newErrors.value = 'Please enter a valid contract value (e.g., $100,000)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSave(formData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      id: `CTR-${String(Date.now()).slice(-6)}`,
      contractNumber: '',
      name: `${accountName} Service Contract`,
      value: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      status: 'Active',
      type: 'Service Agreement',
      renewalTerms: 'Annual',
      paymentTerms: 'Net 30',
      description: '',
      assignedTo: '',
      notes: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {isEdit ? 'Edit Contract' : 'Add Contract'}
              </h2>
              <p className="text-sm text-gray-600">
                {isEdit ? 'Update contract information' : `Add a new contract for ${accountName}`}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Building2 size={20} className="text-blue-600" />
              <span>Basic Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contract Number *
                </label>
                <input
                  type="text"
                  value={formData.contractNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, contractNumber: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contractNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="CTR-2024-001"
                />
                {errors.contractNumber && <p className="text-red-500 text-xs mt-1">{errors.contractNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contract Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Service Level Agreement"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contract Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {contractTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {contractStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <DollarSign size={20} className="text-blue-600" />
              <span>Financial Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contract Value *
                </label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.value ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="$100,000"
                />
                {errors.value && <p className="text-red-500 text-xs mt-1">{errors.value}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Terms
                </label>
                <select
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData(prev => ({ ...prev, paymentTerms: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {paymentTerms.map(term => (
                    <option key={term} value={term}>{term}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Calendar size={20} className="text-blue-600" />
              <span>Contract Dates</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Renewal Terms
                </label>
                <select
                  value={formData.renewalTerms}
                  onChange={(e) => setFormData(prev => ({ ...prev, renewalTerms: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {renewalTerms.map(term => (
                    <option key={term} value={term}>{term}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned To
                </label>
                <input
                  type="text"
                  value={formData.assignedTo}
                  onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contract Manager Name"
                />
              </div>
            </div>
          </div>

          {/* Description and Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <FileText size={20} className="text-blue-600" />
              <span>Additional Information</span>
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contract Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the contract terms and services"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional notes, special terms, or important information"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save size={16} />
              <span>{isEdit ? 'Update' : 'Add'} Contract</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
