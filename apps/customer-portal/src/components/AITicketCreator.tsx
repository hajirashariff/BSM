import React, { useState } from 'react';
import { 
  Brain, 
  Zap, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  User, 
  Tag,
  Loader2,
  Sparkles
} from 'lucide-react';
import aiService, { AIClassification } from '../lib/aiService';

interface AITicketCreatorProps {
  onSubmit: (ticketData: any) => void;
  onCancel: () => void;
}

const AITicketCreator: React.FC<AITicketCreatorProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: '',
    priority: '',
    assignee: ''
  });
  
  const [aiClassification, setAiClassification] = useState<AIClassification | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAIAnalysis = async () => {
    if (!formData.subject.trim() || !formData.description.trim()) {
      setAiError('Please enter both subject and description for AI analysis');
      return;
    }

    setIsAnalyzing(true);
    setAiError(null);

    try {
      const classification = await aiService.classifyTicket(
        formData.subject,
        formData.description
      );
      
      setAiClassification(classification);
      setShowAISuggestions(true);
      
      // Auto-populate form with AI suggestions
      setFormData(prev => ({
        ...prev,
        category: classification.category,
        priority: classification.priority,
        assignee: classification.suggested_assignee
      }));
      
    } catch (error) {
      console.error('AI Analysis Error:', error);
      setAiError('Failed to analyze ticket. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ticketData = {
      ...formData,
      id: `TKT-${Date.now()}`,
      status: 'Open',
      created: new Date().toISOString(),
      ai_classification: aiClassification,
      tags: aiClassification?.tags || []
    };
    
    onSubmit(ticketData);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="text-purple-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">AI-Powered Ticket Creator</h2>
              <p className="text-sm text-gray-600">Create tickets with intelligent classification and auto-assignment</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-gray-500">✕</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Brief description of the issue"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select category</option>
                  <option value="IT Support">IT Support</option>
                  <option value="System Maintenance">System Maintenance</option>
                  <option value="HR">HR</option>
                  <option value="Procurement">Procurement</option>
                  <option value="Security">Security</option>
                  <option value="Network">Network</option>
                  <option value="Software">Software</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Access">Access</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Detailed description of the issue, including steps to reproduce if applicable"
                required
              />
            </div>

            {/* AI Analysis Section */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="text-purple-600" size={20} />
                  <h3 className="text-lg font-medium text-gray-900">AI Analysis</h3>
                </div>
                <button
                  type="button"
                  onClick={handleAIAnalysis}
                  disabled={isAnalyzing || !formData.subject.trim() || !formData.description.trim()}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isAnalyzing ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Brain size={16} />
                  )}
                  <span>{isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}</span>
                </button>
              </div>

              {aiError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="text-red-600" size={16} />
                    <span className="text-red-800 text-sm">{aiError}</span>
                  </div>
                </div>
              )}

              {showAISuggestions && aiClassification && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Tag className="text-blue-600" size={16} />
                        <span className="font-medium text-blue-900">Category</span>
                      </div>
                      <p className="text-sm text-blue-800">{aiClassification.category}</p>
                    </div>
                    
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="text-orange-600" size={16} />
                        <span className="font-medium text-orange-900">Priority</span>
                      </div>
                      <p className={`text-sm px-2 py-1 rounded-full inline-block ${getPriorityColor(aiClassification.priority)}`}>
                        {aiClassification.priority}
                      </p>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="text-green-600" size={16} />
                        <span className="font-medium text-green-900">Assignee</span>
                      </div>
                      <p className="text-sm text-green-800">{aiClassification.suggested_assignee}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm font-medium text-gray-700">AI Confidence</span>
                    </div>
                    <span className={`text-sm font-semibold ${getConfidenceColor(aiClassification.confidence)}`}>
                      {Math.round(aiClassification.confidence * 100)}%
                    </span>
                  </div>

                  {aiClassification.tags.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Suggested Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {aiClassification.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Manual Override Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assignee
                </label>
                <select
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select assignee</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Mike Johnson">Mike Johnson</option>
                  <option value="Sarah Wilson">Sarah Wilson</option>
                  <option value="Alex Rodriguez">Alex Rodriguez</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Zap size={16} />
            <span>Create Ticket</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITicketCreator;

