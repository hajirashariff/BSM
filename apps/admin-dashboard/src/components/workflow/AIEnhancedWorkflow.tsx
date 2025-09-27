import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Bot, 
  Zap, 
  Target, 
  BarChart3, 
  Settings, 
  Play, 
  Pause, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Users,
  Database,
  MessageSquare,
  FileText,
  Calendar,
  Mail,
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Filter,
  Search,
  X,
  Save,
  Loader2
} from 'lucide-react';

// AI Feature Configuration Interface
interface AIFeatureConfig {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Beta' | 'Inactive';
  accuracy: number;
  usage: number;
  category: string;
  icon: any;
  color: string;
  config: {
    enabled: boolean;
    threshold: number;
    autoExecute: boolean;
    notifications: boolean;
    customPrompt?: string;
    parameters?: Record<string, any>;
  };
}

// Gemini API Service
class GeminiAIService {
  private static async callGeminiAPI(prompt: string, context?: any) {
    try {
      const response = await fetch('/api/gemini-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt + (context ? `\n\nContext: ${JSON.stringify(context)}` : '')
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  static async analyzeSentiment(text: string) {
    const prompt = `Analyze the sentiment of this text and return a JSON response with:
    - sentiment: "positive", "negative", or "neutral"
    - confidence: number between 0-1
    - urgency: "low", "medium", or "high"
    - category: suggested category for routing
    
    Text: "${text}"`;
    
    return await this.callGeminiAPI(prompt);
  }

  static async predictRouting(ticketData: any) {
    const prompt = `Based on this ticket data, predict the best routing and return JSON with:
    - suggestedAssignee: team or person
    - priority: "low", "medium", "high", "critical"
    - estimatedResolutionTime: in hours
    - confidence: number between 0-1
    
    Ticket Data: ${JSON.stringify(ticketData)}`;
    
    return await this.callGeminiAPI(prompt);
  }

  static async detectAnomaly(patterns: any[]) {
    const prompt = `Analyze these patterns for anomalies and return JSON with:
    - isAnomaly: boolean
    - anomalyType: description
    - severity: "low", "medium", "high"
    - recommendedAction: suggested response
    
    Patterns: ${JSON.stringify(patterns)}`;
    
    return await this.callGeminiAPI(prompt);
  }

  static async categorizeTicket(ticketData: any) {
    const prompt = `Categorize this ticket and return JSON with:
    - category: main category
    - subcategory: specific subcategory
    - tags: array of relevant tags
    - confidence: number between 0-1
    
    Ticket: ${JSON.stringify(ticketData)}`;
    
    return await this.callGeminiAPI(prompt);
  }

  static async optimizeWorkflow(workflowData: any) {
    const prompt = `Analyze this workflow and suggest optimizations. Return JSON with:
    - bottlenecks: array of identified bottlenecks
    - suggestions: array of improvement suggestions
    - estimatedImprovement: percentage improvement expected
    - priority: "low", "medium", "high"
    
    Workflow: ${JSON.stringify(workflowData)}`;
    
    return await this.callGeminiAPI(prompt);
  }

  static async scheduleOptimally(resources: any[], tasks: any[]) {
    const prompt = `Optimize scheduling for these resources and tasks. Return JSON with:
    - schedule: optimized schedule
    - utilization: resource utilization percentage
    - conflicts: any scheduling conflicts
    - efficiency: overall efficiency score
    
    Resources: ${JSON.stringify(resources)}
    Tasks: ${JSON.stringify(tasks)}`;
    
    return await this.callGeminiAPI(prompt);
  }
}

const aiFeatures: AIFeatureConfig[] = [
  {
    id: 'sentiment-analysis',
    name: 'Sentiment Analysis',
    description: 'Automatically analyze text sentiment and route accordingly',
    status: 'Active',
    accuracy: 94.2,
    usage: 1234,
    category: 'Text Processing',
    icon: Brain,
    color: 'bg-blue-100 text-blue-800',
    config: {
      enabled: true,
      threshold: 0.8,
      autoExecute: true,
      notifications: true,
      customPrompt: 'Analyze sentiment and determine urgency level',
      parameters: {
        model: 'gemini-pro',
        maxTokens: 1000,
        temperature: 0.3
      }
    }
  },
  {
    id: 'predictive-routing',
    name: 'Predictive Routing',
    description: 'AI-powered intelligent task routing based on historical data',
    status: 'Active',
    accuracy: 89.7,
    usage: 856,
    category: 'Decision Making',
    icon: Target,
    color: 'bg-green-100 text-green-800',
    config: {
      enabled: true,
      threshold: 0.75,
      autoExecute: true,
      notifications: true,
      customPrompt: 'Route tickets to the most appropriate team based on content and history',
      parameters: {
        model: 'gemini-pro',
        maxTokens: 1500,
        temperature: 0.2
      }
    }
  },
  {
    id: 'anomaly-detection',
    name: 'Anomaly Detection',
    description: 'Detect unusual patterns and trigger alerts automatically',
    status: 'Active',
    accuracy: 92.1,
    usage: 445,
    category: 'Monitoring',
    icon: AlertTriangle,
    color: 'bg-yellow-100 text-yellow-800',
    config: {
      enabled: true,
      threshold: 0.85,
      autoExecute: true,
      notifications: true,
      customPrompt: 'Identify unusual patterns and potential issues in system data',
      parameters: {
        model: 'gemini-pro',
        maxTokens: 1200,
        temperature: 0.1
      }
    }
  },
  {
    id: 'auto-categorization',
    name: 'Auto Categorization',
    description: 'Automatically categorize incoming requests and tickets',
    status: 'Active',
    accuracy: 87.3,
    usage: 2103,
    category: 'Classification',
    icon: FileText,
    color: 'bg-purple-100 text-purple-800',
    config: {
      enabled: true,
      threshold: 0.8,
      autoExecute: true,
      notifications: false,
      customPrompt: 'Categorize tickets into appropriate categories and subcategories',
      parameters: {
        model: 'gemini-pro',
        maxTokens: 1000,
        temperature: 0.2
      }
    }
  },
  {
    id: 'workflow-optimization',
    name: 'Workflow Optimization',
    description: 'Suggest improvements to existing workflows',
    status: 'Beta',
    accuracy: 78.9,
    usage: 234,
    category: 'Optimization',
    icon: TrendingUp,
    color: 'bg-orange-100 text-orange-800',
    config: {
      enabled: true,
      threshold: 0.7,
      autoExecute: false,
      notifications: true,
      customPrompt: 'Analyze workflows and suggest optimizations for better efficiency',
      parameters: {
        model: 'gemini-pro',
        maxTokens: 2000,
        temperature: 0.4
      }
    }
  },
  {
    id: 'smart-scheduling',
    name: 'Smart Scheduling',
    description: 'AI-powered optimal scheduling based on resources and priorities',
    status: 'Active',
    accuracy: 91.5,
    usage: 567,
    category: 'Scheduling',
    icon: Calendar,
    color: 'bg-indigo-100 text-indigo-800',
    config: {
      enabled: true,
      threshold: 0.8,
      autoExecute: true,
      notifications: true,
      customPrompt: 'Optimize scheduling based on resource availability and task priorities',
      parameters: {
        model: 'gemini-pro',
        maxTokens: 1800,
        temperature: 0.3
      }
    }
  }
];

const aiWorkflows = [
  {
    id: 'WF-AI-001',
    name: 'Customer Feedback Analysis',
    description: 'AI-powered sentiment analysis and automatic routing',
    status: 'Active',
    aiFeatures: ['sentiment-analysis', 'auto-categorization', 'predictive-routing'],
    accuracy: 94.2,
    runs: 1234,
    lastRun: '2024-01-15 16:45',
    successRate: 96.8,
    avgProcessingTime: '2.3 minutes'
  },
  {
    id: 'WF-AI-002',
    name: 'IT Incident Intelligence',
    description: 'Smart incident detection and escalation',
    status: 'Active',
    aiFeatures: ['anomaly-detection', 'predictive-routing'],
    accuracy: 89.7,
    runs: 856,
    lastRun: '2024-01-15 14:20',
    successRate: 92.1,
    avgProcessingTime: '1.8 minutes'
  },
  {
    id: 'WF-AI-003',
    name: 'Resource Optimization',
    description: 'AI-driven resource allocation and scheduling',
    status: 'Beta',
    aiFeatures: ['smart-scheduling', 'workflow-optimization'],
    accuracy: 78.9,
    runs: 234,
    lastRun: '2024-01-15 12:30',
    successRate: 85.2,
    avgProcessingTime: '4.2 minutes'
  }
];

export default function AIEnhancedWorkflow() {
  const [activeView, setActiveView] = useState('features');
  const [selectedFeature, setSelectedFeature] = useState<AIFeatureConfig | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResults, setAiResults] = useState<Record<string, any>>({});
  const [testInput, setTestInput] = useState('');

  const views = [
    { id: 'features', label: 'AI Features', icon: Brain },
    { id: 'workflows', label: 'AI Workflows', icon: Bot },
    { id: 'analytics', label: 'AI Analytics', icon: BarChart3 },
    { id: 'models', label: 'Model Management', icon: Settings }
  ];

  // AI Processing Functions
  const processAI = async (featureId: string, input: any) => {
    setIsProcessing(true);
    try {
      let result;
      switch (featureId) {
        case 'sentiment-analysis':
          result = await GeminiAIService.analyzeSentiment(input);
          break;
        case 'predictive-routing':
          result = await GeminiAIService.predictRouting(input);
          break;
        case 'anomaly-detection':
          result = await GeminiAIService.detectAnomaly(input);
          break;
        case 'auto-categorization':
          result = await GeminiAIService.categorizeTicket(input);
          break;
        case 'workflow-optimization':
          result = await GeminiAIService.optimizeWorkflow(input);
          break;
        case 'smart-scheduling':
          result = await GeminiAIService.scheduleOptimally(input.resources, input.tasks);
          break;
        default:
          throw new Error('Unknown AI feature');
      }
      
      setAiResults(prev => ({ ...prev, [featureId]: result }));
      return result;
    } catch (error) {
      console.error('AI Processing Error:', error);
      setAiResults(prev => ({ 
        ...prev, 
        [featureId]: { error: 'Failed to process AI request' } 
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfigure = (feature: AIFeatureConfig) => {
    setSelectedFeature(feature);
    setShowConfigModal(true);
  };

  const handleTestFeature = async (feature: AIFeatureConfig) => {
    if (!testInput.trim()) return;
    
    const mockData = {
      text: testInput,
      ticketData: { subject: testInput, description: testInput },
      patterns: [{ data: testInput, timestamp: new Date().toISOString() }],
      workflowData: { name: testInput, steps: [] },
      resources: [{ name: 'Team A', capacity: 100 }],
      tasks: [{ name: testInput, duration: 60 }]
    };
    
    await processAI(feature.id, mockData);
  };

  const ConfigurationModal = () => {
    if (!selectedFeature) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Configure {selectedFeature.name}</h3>
            <button
              onClick={() => setShowConfigModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic Configuration */}
            <div>
              <h4 className="text-lg font-medium mb-4">Basic Configuration</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confidence Threshold
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={selectedFeature.config.threshold}
                    onChange={(e) => {
                      const updatedFeature = {
                        ...selectedFeature,
                        config: {
                          ...selectedFeature.config,
                          threshold: parseFloat(e.target.value)
                        }
                      };
                      setSelectedFeature(updatedFeature);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={selectedFeature.status}
                    onChange={(e) => {
                      const updatedFeature = {
                        ...selectedFeature,
                        status: e.target.value as 'Active' | 'Beta' | 'Inactive'
                      };
                      setSelectedFeature(updatedFeature);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Beta">Beta</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div>
              <h4 className="text-lg font-medium mb-4">Advanced Settings</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Auto Execute
                  </label>
                  <input
                    type="checkbox"
                    checked={selectedFeature.config.autoExecute}
                    onChange={(e) => {
                      const updatedFeature = {
                        ...selectedFeature,
                        config: {
                          ...selectedFeature.config,
                          autoExecute: e.target.checked
                        }
                      };
                      setSelectedFeature(updatedFeature);
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Enable Notifications
                  </label>
                  <input
                    type="checkbox"
                    checked={selectedFeature.config.notifications}
                    onChange={(e) => {
                      const updatedFeature = {
                        ...selectedFeature,
                        config: {
                          ...selectedFeature.config,
                          notifications: e.target.checked
                        }
                      };
                      setSelectedFeature(updatedFeature);
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Custom Prompt */}
            <div>
              <h4 className="text-lg font-medium mb-4">Custom Prompt</h4>
              <textarea
                value={selectedFeature.config.customPrompt || ''}
                onChange={(e) => {
                  const updatedFeature = {
                    ...selectedFeature,
                    config: {
                      ...selectedFeature.config,
                      customPrompt: e.target.value
                    }
                  };
                  setSelectedFeature(updatedFeature);
                }}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter custom prompt for this AI feature..."
              />
            </div>

            {/* Test Section */}
            <div>
              <h4 className="text-lg font-medium mb-4">Test Feature</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Input
                  </label>
                  <textarea
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter test data..."
                  />
                </div>
                <button
                  onClick={() => handleTestFeature(selectedFeature)}
                  disabled={isProcessing || !testInput.trim()}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Play size={16} />
                  )}
                  <span>{isProcessing ? 'Processing...' : 'Test Feature'}</span>
                </button>
                
                {aiResults[selectedFeature.id] && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h5 className="font-medium mb-2">AI Result:</h5>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                      {typeof aiResults[selectedFeature.id] === 'string' 
                        ? aiResults[selectedFeature.id] 
                        : JSON.stringify(aiResults[selectedFeature.id], null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Update the feature in the array
                  const featureIndex = aiFeatures.findIndex(f => f.id === selectedFeature.id);
                  if (featureIndex !== -1) {
                    aiFeatures[featureIndex] = selectedFeature;
                  }
                  setShowConfigModal(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Save size={16} />
                <span>Save Configuration</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFeatures = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                    <p className="text-sm text-gray-500">{feature.category}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${feature.color}`}>
                  {feature.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-600">{feature.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <span className="text-gray-500">Accuracy:</span>
                    <span className="ml-1 font-medium text-gray-900">{feature.accuracy}%</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Usage:</span>
                    <span className="ml-1 font-medium text-gray-900">{feature.usage.toLocaleString()}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleConfigure(feature)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                >
                  <Settings size={14} />
                  <span>Configure</span>
                </button>
              </div>
              
              {/* Quick Test Section */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Quick test..."
                    className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    onChange={(e) => setTestInput(e.target.value)}
                  />
                  <button
                    onClick={() => handleTestFeature(feature)}
                    disabled={isProcessing || !testInput.trim()}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                  >
                    {isProcessing ? (
                      <Loader2 className="animate-spin" size={12} />
                    ) : (
                      <Play size={12} />
                    )}
                    <span>Test</span>
                  </button>
                </div>
                
                {aiResults[feature.id] && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                    <div className="font-medium text-gray-700 mb-1">AI Result:</div>
                    <div className="text-gray-600 max-h-20 overflow-y-auto">
                      {typeof aiResults[feature.id] === 'string' 
                        ? aiResults[feature.id].substring(0, 100) + (aiResults[feature.id].length > 100 ? '...' : '')
                        : JSON.stringify(aiResults[feature.id]).substring(0, 100) + '...'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderWorkflows = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">AI-Enhanced Workflows</h3>
          <p className="text-sm text-gray-500">Workflows powered by artificial intelligence</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workflow
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AI Features
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accuracy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Runs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {aiWorkflows.map((workflow) => (
                <tr key={workflow.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{workflow.name}</div>
                      <div className="text-sm text-gray-500">{workflow.description}</div>
                      <div className="text-xs text-gray-400 mt-1">ID: {workflow.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {workflow.aiFeatures.map((featureId) => {
                        const feature = aiFeatures.find(f => f.id === featureId);
                        return (
                          <span key={featureId} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {feature?.name || featureId}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{workflow.accuracy}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{workflow.runs.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Last: {workflow.lastRun}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900">{workflow.successRate}%</div>
                      <div className="ml-2 text-xs text-gray-500">({workflow.avgProcessingTime})</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total AI Features</p>
              <p className="text-2xl font-semibold text-gray-900">{aiFeatures.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Bot className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">AI Workflows</p>
              <p className="text-2xl font-semibold text-gray-900">{aiWorkflows.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Accuracy</p>
              <p className="text-2xl font-semibold text-gray-900">89.2%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Executions</p>
              <p className="text-2xl font-semibold text-gray-900">2,333</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Performance Trends</h3>
        <div className="text-center py-12">
          <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Performance Analytics</h3>
          <p className="mt-1 text-sm text-gray-500">Detailed AI performance metrics and trends coming soon</p>
        </div>
      </div>
    </div>
  );

  const renderModels = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Settings className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Model Management</h3>
        <p className="mt-1 text-sm text-gray-500">AI model configuration and training interface coming soon</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'features':
        return renderFeatures();
      case 'workflows':
        return renderWorkflows();
      case 'analytics':
        return renderAnalytics();
      case 'models':
        return renderModels();
      default:
        return renderFeatures();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI-Enhanced Workflows</h2>
          <p className="text-gray-600">Leverage artificial intelligence to automate and optimize your workflows</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Upload size={20} />
            <span>Import Model</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Create AI Workflow</span>
          </button>
        </div>
      </div>

      {/* View Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeView === view.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                <span>{view.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="min-h-screen">
        {renderContent()}
      </div>

      {/* Configuration Modal */}
      {showConfigModal && <ConfigurationModal />}
    </div>
  );
}

