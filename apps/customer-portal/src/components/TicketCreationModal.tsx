import React, { useState } from 'react';
import { X, Paperclip, AlertCircle, Clock, Zap, Shield, Bug, Settings, HelpCircle } from 'lucide-react';

interface TicketCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ticket: TicketData) => void;
}

interface TicketData {
  subject: string;
  description: string;
  category: string;
  priority: string;
  attachments: File[];
}

const categories = [
  { id: 'technical', label: 'Technical Support', icon: Settings, color: 'text-blue-600' },
  { id: 'billing', label: 'Billing & Invoices', icon: Shield, color: 'text-green-600' },
  { id: 'access', label: 'Access & Permissions', icon: Bug, color: 'text-red-600' },
  { id: 'general', label: 'General Inquiry', icon: HelpCircle, color: 'text-purple-600' },
];

const priorities = [
  { id: 'low', label: 'Low', icon: Clock, color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900' },
  { id: 'medium', label: 'Medium', icon: AlertCircle, color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900' },
  { id: 'high', label: 'High', icon: Zap, color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900' },
  { id: 'urgent', label: 'Urgent', icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900' },
];

export default function TicketCreationModal({ isOpen, onClose, onSubmit }: TicketCreationModalProps) {
  const [formData, setFormData] = useState<TicketData>({
    subject: '',
    description: '',
    category: 'technical',
    priority: 'medium',
    attachments: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit(formData);
    setFormData({
      subject: '',
      description: '',
      category: 'technical',
      priority: 'medium',
      attachments: []
    });
    setIsSubmitting(false);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Create Support Ticket</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500 dark:text-zinc-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Subject *
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-800 dark:text-zinc-100"
              placeholder="Brief description of your issue"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-3">
              Category *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.category === category.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:border-primary-400'
                        : 'border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon size={20} className={category.color} />
                      <span className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                        {category.label}
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
              Priority *
            </label>
            <div className="grid grid-cols-4 gap-2">
              {priorities.map((priority) => {
                const Icon = priority.icon;
                return (
                  <button
                    key={priority.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, priority: priority.id }))}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      formData.priority === priority.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:border-primary-400'
                        : 'border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <Icon size={16} className={priority.color} />
                      <span className="text-xs font-medium text-gray-900 dark:text-zinc-100">
                        {priority.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-800 dark:text-zinc-100"
              rows={6}
              placeholder="Please provide detailed information about your issue..."
              required
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Attachments
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg p-4">
              <input
                type="file"
                id="attachments"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
              />
              <label
                htmlFor="attachments"
                className="flex flex-col items-center space-y-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 p-4 rounded-lg transition-colors"
              >
                <Paperclip size={24} className="text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-zinc-400">
                  Click to upload files or drag and drop
                </span>
                <span className="text-xs text-gray-500 dark:text-zinc-500">
                  PDF, DOC, DOCX, TXT, JPG, PNG, GIF (Max 10MB each)
                </span>
              </label>
            </div>

            {/* File List */}
            {formData.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-zinc-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <Paperclip size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-zinc-100">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-zinc-500">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-zinc-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-zinc-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.subject || !formData.description}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <span>Create Ticket</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
