import React, { useState, useRef } from 'react';
import { X, Paperclip, AlertCircle, Clock, Zap, Shield, Bug, Settings, HelpCircle, Send, Upload, Trash2, File, Image, FileText } from 'lucide-react';
import { CreateTicketData } from '../lib/supabaseService';
import { storageService, FILE_VALIDATION } from '../lib/storageService';

interface TicketCreationModalProps {
  onClose: () => void;
  onSubmit: (data: CreateTicketData) => void;
}

const categories = [
  { id: 'technical', label: 'Technical Support', icon: Settings, color: 'text-blue-600' },
  { id: 'billing', label: 'Billing & Invoices', icon: Shield, color: 'text-green-600' },
  { id: 'general', label: 'General Inquiry', icon: HelpCircle, color: 'text-purple-600' },
  { id: 'feature_request', label: 'Feature Request', icon: Zap, color: 'text-orange-600' },
  { id: 'bug_report', label: 'Bug Report', icon: Bug, color: 'text-red-600' },
];

const priorities = [
  { id: 'low', label: 'Low', icon: Clock, color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900' },
  { id: 'medium', label: 'Medium', icon: AlertCircle, color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900' },
  { id: 'high', label: 'High', icon: Zap, color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900' },
  { id: 'urgent', label: 'Urgent', icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900' },
];

export default function TicketCreationModal({ onClose, onSubmit }: TicketCreationModalProps) {
  console.log('🎫 TicketCreationModal component rendered');
  const [formData, setFormData] = useState<CreateTicketData>({
    subject: '',
    description: '',
    category: 'technical',
    priority: 'medium',
    attachments: [],
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    console.log('🔍 Validating form with data:', formData);
    const newErrors: Record<string, string> = {};
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      console.log('❌ Subject validation failed: empty');
    } else if (formData.subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
      console.log('❌ Subject validation failed: too short');
    } else {
      console.log('✅ Subject validation passed');
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      console.log('❌ Description validation failed: empty');
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
      console.log('❌ Description validation failed: too short');
    } else {
      console.log('✅ Description validation passed');
    }
    
    console.log('🔍 Validation errors:', newErrors);
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('🔍 Form is valid:', isValid);
    return isValid;
  };

  const handleFileUpload = async (files: FileList) => {
    setUploadingFiles(true);
    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach(file => {
      // Validate file type
      if (!storageService.validateFileType(file)) {
        errors.push(`${file.name}: Invalid file type`);
        return;
      }

      // Validate file size
      if (!storageService.validateFileSize(file)) {
        errors.push(`${file.name}: File too large (max ${storageService.formatFileSize(FILE_VALIDATION.TICKET_ATTACHMENTS_MAX_SIZE)})`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      setErrors(prev => ({ ...prev, files: errors.join(', ') }));
    }

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...validFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          url: storageService.createPreviewUrl(file)
        }))]
      }));
    }

    setUploadingFiles(false);
  };

  const handleFileRemove = (index: number) => {
    const fileToRemove = uploadedFiles[index];
    if (fileToRemove) {
      storageService.revokePreviewUrl(storageService.createPreviewUrl(fileToRemove));
    }

    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 Form submitted, validating...');
    
    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }
    
    console.log('✅ Form validation passed');
    setIsSubmitting(true);
    
    try {
      // Prepare ticket data without file uploads for now
      const ticketData = {
        subject: formData.subject,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        tags: formData.tags,
        attachments: [] // Simplified - no file uploads for now
      };

      console.log('📤 Calling onSubmit with ticket data:', ticketData);
      // Submit ticket
      await onSubmit(ticketData);
      
      // Reset form
      setFormData({
        subject: '',
        description: '',
        category: 'technical',
        priority: 'medium',
        attachments: [],
        tags: []
      });
      setUploadedFiles([]);
      onClose();
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to create ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };



  const addTag = () => {
    const tag = newTag.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

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
              onChange={(e) => {
                setFormData(prev => ({ ...prev, subject: e.target.value }));
                if (errors.subject) {
                  setErrors(prev => ({ ...prev, subject: '' }));
                }
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-800 dark:text-zinc-100 ${
                errors.subject 
                  ? 'border-red-300 dark:border-red-700' 
                  : 'border-gray-300 dark:border-zinc-600'
              }`}
              placeholder="Brief description of your issue"
              required
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
            )}
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
              onChange={(e) => {
                setFormData(prev => ({ ...prev, description: e.target.value }));
                if (errors.description) {
                  setErrors(prev => ({ ...prev, description: '' }));
                }
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-800 dark:text-zinc-100 ${
                errors.description 
                  ? 'border-red-300 dark:border-red-700' 
                  : 'border-gray-300 dark:border-zinc-600'
              }`}
              rows={6}
              placeholder="Please provide detailed information about your issue..."
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
            )}
            <p className="mt-1 text-sm text-gray-600 dark:text-zinc-400">
              {formData.description.length}/20 characters minimum
            </p>
          </div>

          {/* File Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Attachments
            </label>
            <div className="space-y-4">
              {/* File Upload Area */}
              <div
                className="border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg p-6 text-center hover:border-primary-400 dark:hover:border-primary-500 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,application/pdf,text/*,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-zinc-500" />
                <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
                  Click to upload files or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-zinc-500">
                  Max file size: {storageService.formatFileSize(FILE_VALIDATION.TICKET_ATTACHMENTS_MAX_SIZE)}
                </p>
                {uploadingFiles && (
                  <div className="mt-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="text-sm text-primary-600">Uploading files...</p>
                  </div>
                )}
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                    Uploaded Files ({uploadedFiles.length})
                  </h4>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {file.type.startsWith('image/') ? (
                          <Image className="h-5 w-5 text-blue-500" />
                        ) : file.type === 'application/pdf' ? (
                          <FileText className="h-5 w-5 text-red-500" />
                        ) : (
                          <File className="h-5 w-5 text-gray-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-zinc-400">
                            {storageService.formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFileRemove(index)}
                        className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* File Upload Errors */}
              {errors.files && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.files}</p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Tags {formData.tags.length > 0 && `(${formData.tags.length}/5)`}
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full dark:bg-primary-900 dark:text-primary-300"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200"
                  >
                    <X size={16} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={formData.tags.length >= 5}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 disabled:opacity-50"
                placeholder={formData.tags.length >= 5 ? "Maximum 5 tags reached" : "Add a tag and press Enter"}
              />
              <button
                type="button"
                onClick={addTag}
                disabled={!newTag.trim() || formData.tags.length >= 5}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
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
                onChange={handleFileInputChange}
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
                <>
                  <Send size={16} />
                  <span>Create Ticket</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
