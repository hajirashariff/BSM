import React, { useState } from 'react';
import { X, AlertCircle, Target, Save } from 'lucide-react';

interface RiskOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: string) => void;
  type: 'risk' | 'opportunity';
  existingItem?: string;
  isEdit?: boolean;
}

export default function RiskOpportunityModal({ 
  isOpen, 
  onClose, 
  onSave, 
  type, 
  existingItem = '', 
  isEdit = false 
}: RiskOpportunityModalProps) {
  const [item, setItem] = useState(existingItem);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!item.trim()) {
      setError(`${type === 'risk' ? 'Risk factor' : 'Opportunity'} is required`);
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSave(item.trim());
    setItem('');
    onClose();
  };

  const handleClose = () => {
    setItem('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  const isRisk = type === 'risk';
  const Icon = isRisk ? AlertCircle : Target;
  const title = isEdit 
    ? `Edit ${isRisk ? 'Risk Factor' : 'Opportunity'}`
    : `Add ${isRisk ? 'Risk Factor' : 'Opportunity'}`;
  const description = isEdit
    ? `Update ${isRisk ? 'risk factor' : 'opportunity'} information`
    : `Add a new ${isRisk ? 'risk factor' : 'opportunity'} for this account`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isRisk ? 'bg-red-100' : 'bg-green-100'}`}>
              <Icon className={isRisk ? 'text-red-600' : 'text-green-600'} size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600">{description}</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRisk ? 'Risk Factor' : 'Opportunity'} *
            </label>
            <textarea
              value={item}
              onChange={(e) => setItem(e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={
                isRisk 
                  ? 'Describe the risk factor (e.g., High ticket volume, Payment delays, Low satisfaction)'
                  : 'Describe the opportunity (e.g., Upsell: Additional licenses, Reference customer, Training program)'
              }
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-lg transition-colors flex items-center space-x-2 ${
                isRisk 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <Save size={16} />
              <span>{isEdit ? 'Update' : 'Add'} {isRisk ? 'Risk' : 'Opportunity'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
