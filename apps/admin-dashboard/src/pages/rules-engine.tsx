import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Settings, Plus, Edit3, Trash2, Play, Pause, Eye, Copy, Save, AlertCircle, CheckCircle, Clock, Filter, Key, Shield, Zap, MessageCircle, Send, Bot, User } from 'lucide-react';

type RuleCondition = {
  id: string;
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'not_equals' | 'starts_with' | 'ends_with';
  value: string;
};

type RuleAction = {
  id: string;
  type: 'approve' | 'reject' | 'assign' | 'escalate' | 'notify' | 'set_priority';
  value: string;
  target?: string;
};

type Rule = {
  id: string;
  name: string;
  description: string;
  category: 'Ticket Approval' | 'Priority Assignment' | 'Auto Assignment' | 'Escalation' | 'Notification' | 'Custom';
  status: 'Active' | 'Inactive' | 'Draft';
  priority: number;
  conditions: RuleCondition[];
  actions: RuleAction[];
  createdAt: string;
  updatedAt: string;
  lastExecuted?: string;
  executionCount: number;
  successRate: number;
};

// Mock data for rules
const initialRules: Rule[] = [
  {
    id: 'R-001',
    name: 'High Priority Ticket Auto-Approval',
    description: 'Automatically approve high priority tickets from VIP customers',
    category: 'Ticket Approval',
    status: 'Active',
    priority: 1,
    conditions: [
      { id: 'c1', field: 'priority', operator: 'equals', value: 'High' },
      { id: 'c2', field: 'customer_type', operator: 'equals', value: 'VIP' },
      { id: 'c3', field: 'ticket_type', operator: 'equals', value: 'Service Request' }
    ],
    actions: [
      { id: 'a1', type: 'approve', value: 'auto' },
      { id: 'a2', type: 'notify', value: 'Customer notified of approval', target: 'customer' }
    ],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:22:00Z',
    lastExecuted: '2024-01-25T09:15:00Z',
    executionCount: 45,
    successRate: 98.2
  },
  {
    id: 'R-002',
    name: 'Security Issue Escalation',
    description: 'Automatically escalate security-related tickets to security team',
    category: 'Escalation',
    status: 'Active',
    priority: 2,
    conditions: [
      { id: 'c1', field: 'category', operator: 'contains', value: 'security' },
      { id: 'c2', field: 'severity', operator: 'equals', value: 'Critical' }
    ],
    actions: [
      { id: 'a1', type: 'escalate', value: 'Security Team', target: 'security-team' },
      { id: 'a2', type: 'set_priority', value: 'Critical' }
    ],
    createdAt: '2024-01-10T08:45:00Z',
    updatedAt: '2024-01-18T16:30:00Z',
    lastExecuted: '2024-01-25T11:45:00Z',
    executionCount: 12,
    successRate: 100
  },
  {
    id: 'R-003',
    name: 'Standard Service Request Approval',
    description: 'Auto-approve standard service requests under $500',
    category: 'Ticket Approval',
    status: 'Active',
    priority: 3,
    conditions: [
      { id: 'c1', field: 'ticket_type', operator: 'equals', value: 'Service Request' },
      { id: 'c2', field: 'estimated_cost', operator: 'less_than', value: '500' },
      { id: 'c3', field: 'complexity', operator: 'equals', value: 'Low' }
    ],
    actions: [
      { id: 'a1', type: 'approve', value: 'auto' },
      { id: 'a2', type: 'assign', value: 'Service Team', target: 'service-team' }
    ],
    createdAt: '2024-01-12T13:20:00Z',
    updatedAt: '2024-01-22T10:15:00Z',
    lastExecuted: '2024-01-25T08:30:00Z',
    executionCount: 78,
    successRate: 94.9
  }
];

const fieldOptions = [
  { value: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
  { value: 'category', label: 'Category', type: 'text' },
  { value: 'ticket_type', label: 'Ticket Type', type: 'select', options: ['Service Request', 'Incident', 'Change Request', 'Problem'] },
  { value: 'customer_type', label: 'Customer Type', type: 'select', options: ['Standard', 'Premium', 'VIP', 'Enterprise'] },
  { value: 'severity', label: 'Severity', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
  { value: 'estimated_cost', label: 'Estimated Cost', type: 'number' },
  { value: 'complexity', label: 'Complexity', type: 'select', options: ['Low', 'Medium', 'High'] },
  { value: 'department', label: 'Department', type: 'select', options: ['IT', 'HR', 'Finance', 'Operations'] },
  { value: 'location', label: 'Location', type: 'text' },
  { value: 'urgency', label: 'Urgency', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] }
];

const operatorOptions = [
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Not Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'starts_with', label: 'Starts With' },
  { value: 'ends_with', label: 'Ends With' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'less_than', label: 'Less Than' }
];

const actionTypes = [
  { value: 'approve', label: 'Approve', color: 'green' },
  { value: 'reject', label: 'Reject', color: 'red' },
  { value: 'assign', label: 'Assign', color: 'blue' },
  { value: 'escalate', label: 'Escalate', color: 'orange' },
  { value: 'notify', label: 'Notify', color: 'purple' },
  { value: 'set_priority', label: 'Set Priority', color: 'amber' }
];

// API Configuration using local proxy
const API_ENDPOINTS = {
  AI_ANALYSIS: '/api/gemini-proxy',
  RULE_VALIDATION: '/api/gemini-proxy',
  SMART_SUGGESTIONS: '/api/gemini-proxy'
};

export default function RulesEnginePage() {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Inactive' | 'Draft'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, type: 'user' | 'bot', message: string, timestamp: Date}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const filteredRules = useMemo(() => {
    return rules.filter(rule => {
      const matchesStatus = filter === 'All' || rule.status === filter;
      const matchesCategory = categoryFilter === 'All' || rule.category === categoryFilter;
      const matchesSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           rule.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [rules, filter, categoryFilter, searchQuery]);

  const toggleRuleStatus = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, status: rule.status === 'Active' ? 'Inactive' : 'Active' }
        : rule
    ));
  };

  const deleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
    if (selectedRule?.id === ruleId) {
      setSelectedRule(null);
    }
  };

  const duplicateRule = (rule: Rule) => {
    const newRule: Rule = {
      ...rule,
      id: `R-${Math.floor(1000 + Math.random() * 9000)}`,
      name: `${rule.name} (Copy)`,
      status: 'Draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      executionCount: 0,
      successRate: 0,
      lastExecuted: undefined
    };
    setRules(prev => [newRule, ...prev]);
  };

  // AI-powered rule analysis and suggestions (with fallback simulation)
  const analyzeRulesWithAI = async () => {
    setIsAnalyzing(true);
    setApiStatus('testing');
    
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const rulesSummary = rules.map(rule => ({
        name: rule.name,
        category: rule.category,
        conditions: rule.conditions.length,
        actions: rule.actions.length,
        status: rule.status,
        executionCount: rule.executionCount,
        successRate: rule.successRate
      }));

      // Generate smart suggestions based on rule analysis
      const suggestions = generateSmartSuggestionsFromRules(rulesSummary);
      setAiSuggestions(suggestions);
      setApiStatus('connected');
      
    } catch (error) {
      console.error('AI Analysis Error:', error);
      setApiStatus('disconnected');
      setAiSuggestions([
        'AI service temporarily unavailable. Using intelligent fallback suggestions.',
        'Consider reviewing rule performance manually.',
        'Ensure all rules have proper error handling.'
      ]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Generate intelligent suggestions based on rule analysis
  const generateSmartSuggestionsFromRules = (rulesSummary: any[]) => {
    const suggestions = [];
    
    // Analyze rule patterns
    const activeRules = rulesSummary.filter(r => r.status === 'Active');
    const inactiveRules = rulesSummary.filter(r => r.status === 'Inactive');
    const avgSuccessRate = rulesSummary.reduce((sum, r) => sum + r.successRate, 0) / rulesSummary.length;
    
    // Suggestion 1: Performance optimization
    if (avgSuccessRate < 90) {
      suggestions.push(`Performance Alert: Average success rate is ${avgSuccessRate.toFixed(1)}%. Consider reviewing and optimizing underperforming rules for better accuracy.`);
    } else {
      suggestions.push(`Excellent Performance: Your rules are performing well with ${avgSuccessRate.toFixed(1)}% average success rate. Consider adding more complex rules for advanced automation.`);
    }
    
    // Suggestion 2: Rule utilization
    if (inactiveRules.length > 0) {
      suggestions.push(`Optimization Opportunity: You have ${inactiveRules.length} inactive rules. Review and activate high-value rules to improve automation coverage.`);
    } else {
      suggestions.push(`Rule Utilization: All rules are active. Consider creating specialized rules for edge cases and exception handling.`);
    }
    
    // Suggestion 3: Coverage analysis
    const categories = [...new Set(rulesSummary.map(r => r.category))];
    if (categories.length < 4) {
      suggestions.push(`Coverage Enhancement: Currently covering ${categories.length} categories. Consider adding rules for Priority Assignment, Escalation, and Notification workflows.`);
    } else {
      suggestions.push(`Comprehensive Coverage: Great rule distribution across ${categories.length} categories. Focus on fine-tuning existing rules for maximum efficiency.`);
    }
    
    return suggestions;
  };

  const validateRuleWithAI = async (rule: Rule) => {
    try {
      // Simulate AI validation with intelligent analysis
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const validationResults = [];
      
      // Check rule completeness
      if (rule.conditions.length === 0) {
        validationResults.push('⚠️ No conditions defined - rule will always execute');
      }
      if (rule.actions.length === 0) {
        validationResults.push('⚠️ No actions defined - rule has no effect');
      }
      
      // Check for logical consistency
      const hasConflictConditions = rule.conditions.some(cond => 
        rule.conditions.some(other => 
          other.id !== cond.id && 
          cond.field === other.field && 
          cond.operator === 'equals' && 
          other.operator === 'not_equals' && 
          cond.value === other.value
        )
      );
      
      if (hasConflictConditions) {
        validationResults.push('⚠️ Conflicting conditions detected - rule may never execute');
      }
      
      // Check performance implications
      if (rule.conditions.length > 5) {
        validationResults.push('💡 Consider simplifying conditions for better performance');
      }
      
      // Check security concerns
      const hasSecurityFields = rule.conditions.some(cond => 
        ['security', 'access', 'permission', 'auth'].some(term => 
          cond.field.toLowerCase().includes(term)
        )
      );
      
      if (hasSecurityFields) {
        validationResults.push('🔒 Security-related rule detected - ensure proper authorization checks');
      }
      
      // Generate overall assessment
      if (validationResults.length === 0) {
        return '✅ Rule validation completed successfully. No issues found.';
      } else {
        return `Validation completed:\n${validationResults.join('\n')}`;
      }
      
    } catch (error) {
      console.error('Rule validation error:', error);
      return 'Unable to validate rule. Please check manually.';
    }
  };

  const generateSmartSuggestions = async (context: string) => {
    try {
      // Simulate AI-powered suggestions based on context
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const suggestions = [];
      
      if (context.toLowerCase().includes('ticket')) {
        suggestions.push({
          title: 'Auto-Priority Assignment',
          description: 'Create rules to automatically assign priority based on customer type and issue category'
        });
        suggestions.push({
          title: 'SLA Escalation',
          description: 'Implement automatic escalation rules for tickets approaching SLA deadlines'
        });
        suggestions.push({
          title: 'Duplicate Detection',
          description: 'Add rules to detect and merge duplicate tickets automatically'
        });
      } else if (context.toLowerCase().includes('approval')) {
        suggestions.push({
          title: 'Multi-Level Approval',
          description: 'Implement cascading approval rules for different budget thresholds'
        });
        suggestions.push({
          title: 'Emergency Override',
          description: 'Create emergency approval rules for critical business operations'
        });
        suggestions.push({
          title: 'Approval Analytics',
          description: 'Add rules to track and analyze approval patterns for optimization'
        });
      } else {
        suggestions.push({
          title: 'Smart Routing',
          description: 'Implement intelligent routing rules based on workload and expertise'
        });
        suggestions.push({
          title: 'Predictive Escalation',
          description: 'Create rules that predict and prevent escalation scenarios'
        });
        suggestions.push({
          title: 'Resource Optimization',
          description: 'Add rules to optimize resource allocation based on demand patterns'
        });
      }
      
      return suggestions;
      
    } catch (error) {
      console.error('Smart suggestions error:', error);
      return [];
    }
  };

  // Chatbot functionality with API integration
  const sendChatMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      message: message.trim(),
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    try {
      // Prepare context about current rules for the AI
      const rulesContext = rules.map(rule => ({
        name: rule.name,
        category: rule.category,
        status: rule.status,
        conditions: rule.conditions.length,
        actions: rule.actions.length,
        executionCount: rule.executionCount,
        successRate: rule.successRate
      }));

      const systemPrompt = `You are a helpful Rules Engine assistant for a Business Service Management (BSM) system. 
      
Current Rules Context:
${JSON.stringify(rulesContext, null, 2)}

You help users with:
- Creating and managing business rules
- Analyzing rule performance
- Troubleshooting rule issues
- Best practices for automation
- Ticket approval workflows
- Rule optimization suggestions

Always provide practical, actionable advice based on the current rule context. Be concise but helpful.`;

      const userPrompt = `User Question: ${message.trim()}

Please provide a helpful response about rules engine management, considering the current rules context above.`;

      const response = await fetch(API_ENDPOINTS.AI_ANALYSIS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{
                text: systemPrompt
              }]
            },
            {
              parts: [{
                text: userPrompt
              }]
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        const botMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot' as const,
          message: aiResponse || 'I apologize, but I couldn\'t generate a response. Please try again.',
          timestamp: new Date()
        };
        
        setChatMessages(prev => [...prev, botMessage]);
        setApiStatus('connected');
      } else {
        throw new Error(`API request failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Chat API Error:', error);
      
      // Try simplified API call as fallback
      try {
        const simpleResponse = await fetch(API_ENDPOINTS.AI_ANALYSIS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{
                  text: `You are a helpful Rules Engine assistant. User question: ${message.trim()}. Provide a helpful response about rules engine management.`
                }]
              }
            ]
          })
        });

        if (simpleResponse.ok) {
          const data = await simpleResponse.json();
          const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
          
          const botMessage = {
            id: (Date.now() + 1).toString(),
            type: 'bot' as const,
            message: aiResponse || 'I apologize, but I couldn\'t generate a response. Please try again.',
            timestamp: new Date()
          };
          
          setChatMessages(prev => [...prev, botMessage]);
          setApiStatus('connected');
          return;
        }
      } catch (simpleError) {
        console.error('Simple API Error:', simpleError);
      }
      
      // Final fallback to local response
      const fallbackResponse = generateChatResponse(message.trim());
      const botMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot' as const,
        message: `🤖 AI Assistant (Local Mode):\n\n${fallbackResponse}`,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, botMessage]);
      setApiStatus('disconnected');
    } finally {
      setIsTyping(false);
    }
  };

  // Enhanced fallback response generator with intelligent analysis
  const generateChatResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    // Rule creation and management
    if (message.includes('rule') || message.includes('create') || message.includes('new')) {
      const categories = [...new Set(rules.map(r => r.category))];
      return `🎯 **Creating New Rules**

To create a rule, click "Create Rule" and set up IF-THEN logic:

**Example Rule:**
IF Priority = "High" AND Customer Type = "VIP"
THEN Approve automatically AND Notify customer

**Available Categories:** ${categories.join(', ')}

**Best Practices:**
• Keep conditions simple and clear
• Test rules with sample data
• Set appropriate priority levels
• Add meaningful descriptions

Would you like help with a specific rule type?`;
    }
    
    // Performance analysis
    if (message.includes('performance') || message.includes('optimize') || message.includes('analyze')) {
      const activeRules = rules.filter(r => r.status === 'Active').length;
      const inactiveRules = rules.filter(r => r.status === 'Inactive').length;
      const avgSuccess = rules.reduce((sum, r) => sum + r.successRate, 0) / rules.length;
      const totalExecutions = rules.reduce((sum, r) => sum + r.executionCount, 0);
      
      const topPerformer = rules.reduce((best, rule) => 
        rule.successRate > best.successRate ? rule : best, rules[0]);
      
      return `📊 **Rules Performance Analysis**

**Current Status:**
• ${activeRules} active rules (processing requests)
• ${inactiveRules} inactive rules (disabled)
• ${avgSuccess.toFixed(1)}% average success rate
• ${totalExecutions} total executions

**Top Performer:** "${topPerformer?.name}" (${topPerformer?.successRate}% success)

**Optimization Tips:**
• Review rules with <90% success rate
• Activate high-value inactive rules
• Consider combining similar rules
• Monitor execution patterns

Need specific optimization advice?`;
    }
    
    // Help and guidance
    if (message.includes('help') || message.includes('how') || message.includes('guide')) {
      return `🤖 **Rules Engine Assistant Guide**

**What I can help with:**
• **Rule Creation:** Step-by-step guidance for new rules
• **Performance Analysis:** Insights on rule effectiveness
• **Troubleshooting:** Debug rule issues and conflicts
• **Best Practices:** Optimization recommendations
• **Categories:** Ticket Approval, Escalation, Notifications

**Quick Actions:**
• Type "create [category]" for specific rule help
• Ask "performance" for detailed analysis
• Say "status" for current rule overview
• Use "optimize" for improvement suggestions

**Example Questions:**
• "How do I create a ticket approval rule?"
• "What's my rule performance?"
• "Help me optimize my rules"
• "Show me inactive rules"

What specific area would you like help with?`;
    }
    
    // Ticket and approval specific
    if (message.includes('ticket') || message.includes('approval') || message.includes('approve')) {
      const ticketRules = rules.filter(r => r.category === 'Ticket Approval');
      const escalationRules = rules.filter(r => r.category === 'Escalation');
      
      return `🎫 **Ticket & Approval Rules**

**Current Setup:**
• ${ticketRules.length} ticket approval rules
• ${escalationRules.length} escalation rules

**Smart Suggestions:**
• **VIP Auto-Approval:** IF Customer Type = "VIP" AND Amount < $1000 THEN Approve
• **Security Escalation:** IF Category contains "security" THEN Escalate to Security Team
• **SLA Monitoring:** IF Days since creation > 2 THEN Escalate

**Approval Workflows:**
• Simple approvals: Single condition rules
• Complex approvals: Multi-level conditions
• Emergency overrides: High-priority bypass rules

**Best Practices:**
• Set clear approval thresholds
• Include audit trails
• Handle edge cases
• Regular rule reviews

Want help creating a specific approval rule?`;
    }
    
    // Status and overview
    if (message.includes('status') || message.includes('active') || message.includes('overview')) {
      const activeCount = rules.filter(r => r.status === 'Active').length;
      const inactiveCount = rules.filter(r => r.status === 'Inactive').length;
      const draftCount = rules.filter(r => r.status === 'Draft').length;
      
      const categories = [...new Set(rules.map(r => r.category))];
      
      return `📋 **Rules Engine Overview**

**Rule Status:**
• 🟢 ${activeCount} active rules (processing requests)
• 🔴 ${inactiveCount} inactive rules (disabled)
• 🟡 ${draftCount} draft rules (not ready)

**Coverage by Category:**
${categories.map(cat => {
  const count = rules.filter(r => r.category === cat).length;
  const active = rules.filter(r => r.category === cat && r.status === 'Active').length;
  return `• ${cat}: ${count} rules (${active} active)`;
}).join('\n')}

**Recent Activity:**
• Total executions: ${rules.reduce((sum, r) => sum + r.executionCount, 0)}
• Average success rate: ${(rules.reduce((sum, r) => sum + r.successRate, 0) / rules.length).toFixed(1)}%

**Quick Actions:**
• Click any rule to view/edit details
• Use filters to find specific rules
• Toggle rule status with play/pause buttons
• Duplicate rules for similar scenarios

Need help with a specific rule or category?`;
    }
    
    // Default intelligent response
    return `🤖 **Smart Rules Assistant**

I'm here to help optimize your Rules Engine! Based on your current setup, here are some suggestions:

**Your Current Rules:** ${rules.length} total rules
**Active Rules:** ${rules.filter(r => r.status === 'Active').length}
**Categories:** ${[...new Set(rules.map(r => r.category))].join(', ')}

**Popular Questions:**
• "How do I create a new rule?"
• "Show me rule performance"
• "Help with ticket approvals"
• "Optimize my rules"
• "What's my rule status?"

**Smart Features:**
• Context-aware responses
• Performance analysis
• Rule optimization tips
• Best practice guidance

What would you like to explore?`;
  };

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rule Based Decisions Engine</h1>
          <p className="text-gray-600 mt-1">Create and manage automated decision rules for ticket processing</p>
        </div>
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          Create Rule
        </button>
      </div>

      {/* API Status & AI Features */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Key className="text-purple-600" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI-Powered Rules Engine</h3>
              <p className="text-sm text-gray-600">Enhanced with Google AI API integration</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
              apiStatus === 'connected' ? 'bg-green-100 text-green-800' :
              apiStatus === 'testing' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                apiStatus === 'connected' ? 'bg-green-500' :
                apiStatus === 'testing' ? 'bg-yellow-500 animate-pulse' :
                'bg-red-500'
              }`} />
              <span className="capitalize">{apiStatus}</span>
            </div>
            <button
              onClick={analyzeRulesWithAI}
              disabled={isAnalyzing}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              <Zap size={16} />
              <span>{isAnalyzing ? 'Analyzing...' : 'AI Analysis'}</span>
            </button>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="btn-secondary flex items-center space-x-2"
            >
              <MessageCircle size={16} />
              <span>AI Chat Assistant</span>
            </button>
          </div>
        </div>
        
        {aiSuggestions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-purple-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield size={16} className="text-purple-600" />
                  <span className="font-medium text-sm">AI Suggestion {index + 1}</span>
                </div>
                <p className="text-sm text-gray-600">{suggestion}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          title="Total Rules" 
          value={rules.length} 
          icon={<Settings size={20} />} 
          color="blue" 
        />
        <StatCard 
          title="Active Rules" 
          value={rules.filter(r => r.status === 'Active').length} 
          icon={<Play size={20} />} 
          color="green" 
        />
        <StatCard 
          title="Total Executions" 
          value={rules.reduce((sum, r) => sum + r.executionCount, 0)} 
          icon={<CheckCircle size={20} />} 
          color="emerald" 
        />
        <StatCard 
          title="Avg Success Rate" 
          value={`${(rules.reduce((sum, r) => sum + r.successRate, 0) / rules.length).toFixed(1)}%`} 
          icon={<AlertCircle size={20} />} 
          color="amber" 
        />
        <StatCard 
          title="AI Status" 
          value={apiStatus === 'connected' ? 'Connected' : 'Offline'} 
          icon={<Key size={20} />} 
          color={apiStatus === 'connected' ? 'green' : 'red'} 
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 w-64"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Draft">Draft</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="All">All Categories</option>
            <option value="Ticket Approval">Ticket Approval</option>
            <option value="Priority Assignment">Priority Assignment</option>
            <option value="Auto Assignment">Auto Assignment</option>
            <option value="Escalation">Escalation</option>
            <option value="Notification">Notification</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
      </div>

      {/* Rules List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rules Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Rules ({filteredRules.length})</h3>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {filteredRules.map((rule) => (
              <RuleCard
                key={rule.id}
                rule={rule}
                isSelected={selectedRule?.id === rule.id}
                onClick={() => setSelectedRule(rule)}
                onToggleStatus={() => toggleRuleStatus(rule.id)}
                onEdit={() => setIsEditOpen(true)}
                onDelete={() => deleteRule(rule.id)}
                onDuplicate={() => duplicateRule(rule)}
              />
            ))}
          </div>
        </div>

        {/* Rule Details */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Rule Details</h3>
          </div>
          <div className="p-6">
            {selectedRule ? (
              <RuleDetails rule={selectedRule} />
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Settings size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Select a rule to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Assistant */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-50 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot size={20} className="text-blue-600" />
              <h3 className="font-semibold text-gray-900">AI Rules Assistant</h3>
              <div className={`w-2 h-2 rounded-full ${
                apiStatus === 'connected' ? 'bg-green-500' :
                apiStatus === 'testing' ? 'bg-yellow-500 animate-pulse' :
                'bg-blue-500'
              }`} title={`Status: ${apiStatus === 'connected' ? 'AI Connected' : apiStatus === 'testing' ? 'Connecting...' : 'Smart Assistant Mode'}`} />
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Bot size={32} className="mx-auto mb-2 text-blue-600" />
                <p className="text-sm">Hi! I'm your AI-powered Rules Engine assistant.</p>
                <p className="text-xs">Smart assistant with intelligent rule analysis - Ask me anything about creating or managing rules!</p>
                <div className="mt-3 text-xs">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full ${
                    apiStatus === 'connected' ? 'bg-green-100 text-green-800' :
                    apiStatus === 'testing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                      apiStatus === 'connected' ? 'bg-green-500' :
                      apiStatus === 'testing' ? 'bg-yellow-500 animate-pulse' :
                      'bg-blue-500'
                    }`} />
                    {apiStatus === 'connected' ? 'AI Connected' : 
                     apiStatus === 'testing' ? 'Connecting...' : 'Smart Mode'}
                  </div>
                </div>
              </div>
            )}
            
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {msg.type === 'bot' && <Bot size={16} className="mt-0.5 text-blue-600 flex-shrink-0" />}
                    {msg.type === 'user' && <User size={16} className="mt-0.5 text-blue-100 flex-shrink-0" />}
                    <div className="whitespace-pre-wrap">{msg.message}</div>
                  </div>
                  <div className={`text-xs mt-1 ${
                    msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot size={16} className="text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage(chatInput)}
                placeholder="Ask about rules, performance, or help... (Powered by AI)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={() => sendChatMessage(chatInput)}
                disabled={!chatInput.trim() || isTyping}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isTyping ? (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Rule Modal */}
      {isCreateOpen && (
        <CreateRuleModal
          onClose={() => setIsCreateOpen(false)}
          onCreate={(newRule) => {
            setRules(prev => [newRule, ...prev]);
            setIsCreateOpen(false);
          }}
        />
      )}

      {/* Edit Rule Modal */}
      {isEditOpen && selectedRule && (
        <EditRuleModal
          rule={selectedRule}
          onClose={() => setIsEditOpen(false)}
          onSave={(updatedRule) => {
            setRules(prev => prev.map(rule => 
              rule.id === updatedRule.id ? updatedRule : rule
            ));
            setSelectedRule(updatedRule);
            setIsEditOpen(false);
          }}
        />
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800'
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="opacity-60">{icon}</div>
      </div>
    </div>
  );
}

function RuleCard({ 
  rule, 
  isSelected, 
  onClick, 
  onToggleStatus, 
  onEdit, 
  onDelete, 
  onDuplicate 
}: {
  rule: Rule;
  isSelected: boolean;
  onClick: () => void;
  onToggleStatus: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}) {
  const statusColor = {
    Active: 'bg-green-100 text-green-800 border-green-200',
    Inactive: 'bg-gray-100 text-gray-800 border-gray-200',
    Draft: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };

  const categoryColor = {
    'Ticket Approval': 'bg-blue-100 text-blue-800',
    'Priority Assignment': 'bg-purple-100 text-purple-800',
    'Auto Assignment': 'bg-emerald-100 text-emerald-800',
    'Escalation': 'bg-orange-100 text-orange-800',
    'Notification': 'bg-pink-100 text-pink-800',
    'Custom': 'bg-gray-100 text-gray-800'
  };

  return (
    <div 
      className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{rule.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleStatus();
            }}
            className={`p-1 rounded ${rule.status === 'Active' ? 'text-green-600 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            {rule.status === 'Active' ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 text-red-600 hover:bg-red-100 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2 py-1 text-xs rounded-full border ${statusColor[rule.status]}`}>
          {rule.status}
        </span>
        <span className={`px-2 py-1 text-xs rounded-full ${categoryColor[rule.category]}`}>
          {rule.category}
        </span>
        <span className="text-xs text-gray-500">Priority: {rule.priority}</span>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{rule.conditions.length} conditions • {rule.actions.length} actions</span>
        <span>Executed {rule.executionCount} times</span>
      </div>
    </div>
  );
}

function RuleDetails({ rule }: { rule: Rule }) {
  const [validationResult, setValidationResult] = useState<string>('');
  const [isValidating, setIsValidating] = useState(false);

  const validateRule = async () => {
    setIsValidating(true);
    try {
      // Simulate AI validation with realistic analysis
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const validationResults = [];
      
      // Check rule completeness
      if (rule.conditions.length === 0) {
        validationResults.push('⚠️ No conditions defined - rule will always execute');
      }
      if (rule.actions.length === 0) {
        validationResults.push('⚠️ No actions defined - rule has no effect');
      }
      
      // Check for logical consistency
      const hasConflictConditions = rule.conditions.some(cond => 
        rule.conditions.some(other => 
          other.id !== cond.id && 
          cond.field === other.field && 
          cond.operator === 'equals' && 
          other.operator === 'not_equals' && 
          cond.value === other.value
        )
      );
      
      if (hasConflictConditions) {
        validationResults.push('⚠️ Conflicting conditions detected - rule may never execute');
      }
      
      // Check performance implications
      if (rule.conditions.length > 5) {
        validationResults.push('💡 Consider simplifying conditions for better performance');
      }
      
      // Generate overall assessment
      if (validationResults.length === 0) {
        setValidationResult('✅ Rule validation completed successfully. No issues found.');
      } else {
        setValidationResult(`Validation completed:\n${validationResults.join('\n')}`);
      }
    } catch (error) {
      setValidationResult('Unable to validate rule. Please check manually.');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Rule Info */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-900">Rule Information</h4>
          <button
            onClick={validateRule}
            disabled={isValidating}
            className="btn-secondary flex items-center space-x-1 text-xs"
          >
            <Shield size={14} />
            <span>{isValidating ? 'Validating...' : 'AI Validate'}</span>
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <div><span className="font-medium">Name:</span> {rule.name}</div>
          <div><span className="font-medium">Description:</span> {rule.description}</div>
          <div><span className="font-medium">Category:</span> {rule.category}</div>
          <div><span className="font-medium">Priority:</span> {rule.priority}</div>
          <div><span className="font-medium">Status:</span> 
            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
              rule.status === 'Active' ? 'bg-green-100 text-green-800' :
              rule.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {rule.status}
            </span>
          </div>
        </div>
        
        {validationResult && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Shield size={14} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-800">AI Validation Result</span>
            </div>
            <p className="text-xs text-blue-700">{validationResult}</p>
          </div>
        )}
      </div>

      {/* Conditions */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Conditions (IF)</h4>
        <div className="space-y-2">
          {rule.conditions.map((condition, index) => {
            const field = fieldOptions.find(f => f.value === condition.field);
            return (
              <div key={condition.id} className="flex items-center gap-2 text-sm bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500">IF</span>
                <span className="font-medium">{field?.label || condition.field}</span>
                <span className="text-gray-500">{operatorOptions.find(op => op.value === condition.operator)?.label}</span>
                <span className="font-medium text-blue-600">"{condition.value}"</span>
                {index < rule.conditions.length - 1 && <span className="text-gray-400">AND</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Actions (THEN)</h4>
        <div className="space-y-2">
          {rule.actions.map((action, index) => {
            const actionType = actionTypes.find(a => a.value === action.type);
            return (
              <div key={action.id} className="flex items-center gap-2 text-sm bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500">THEN</span>
                <span className={`px-2 py-1 text-xs rounded-full bg-${actionType?.color}-100 text-${actionType?.color}-800`}>
                  {actionType?.label}
                </span>
                <span className="font-medium">{action.value}</span>
                {action.target && <span className="text-gray-500">to {action.target}</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Statistics</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Executions:</span>
            <span className="ml-2 font-medium">{rule.executionCount}</span>
          </div>
          <div>
            <span className="text-gray-500">Success Rate:</span>
            <span className="ml-2 font-medium">{rule.successRate}%</span>
          </div>
          <div>
            <span className="text-gray-500">Last Executed:</span>
            <span className="ml-2 font-medium">
              {rule.lastExecuted ? new Date(rule.lastExecuted).toLocaleString() : 'Never'}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Created:</span>
            <span className="ml-2 font-medium">{new Date(rule.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateRuleModal({ onClose, onCreate }: { onClose: () => void; onCreate: (rule: Rule) => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Rule['category']>('Ticket Approval');
  const [priority, setPriority] = useState(1);
  const [conditions, setConditions] = useState<RuleCondition[]>([]);
  const [actions, setActions] = useState<RuleAction[]>([]);

  const addCondition = () => {
    const newCondition: RuleCondition = {
      id: `c${Date.now()}`,
      field: 'priority',
      operator: 'equals',
      value: ''
    };
    setConditions(prev => [...prev, newCondition]);
  };

  const updateCondition = (id: string, updates: Partial<RuleCondition>) => {
    setConditions(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const removeCondition = (id: string) => {
    setConditions(prev => prev.filter(c => c.id !== id));
  };

  const addAction = () => {
    const newAction: RuleAction = {
      id: `a${Date.now()}`,
      type: 'approve',
      value: '',
      target: ''
    };
    setActions(prev => [...prev, newAction]);
  };

  const updateAction = (id: string, updates: Partial<RuleAction>) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const removeAction = (id: string) => {
    setActions(prev => prev.filter(a => a.id !== id));
  };

  const handleCreate = () => {
    if (!name.trim() || conditions.length === 0 || actions.length === 0) return;

    const newRule: Rule = {
      id: `R-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      description: description.trim(),
      category,
      status: 'Draft',
      priority,
      conditions,
      actions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      executionCount: 0,
      successRate: 0
    };

    onCreate(newRule);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white w-full max-w-4xl mx-4 rounded-lg shadow-xl border border-gray-200 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Create New Rule</h3>
        </div>
        
        <div className="p-6 space-y-6">
          {/* AI Assistant Section */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Key size={16} className="text-purple-600" />
              <span className="font-medium text-gray-900">AI-Powered Rule Assistant</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-purple-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield size={14} className="text-green-600" />
                  <span className="text-sm font-medium">Smart Validation</span>
                </div>
                <p className="text-xs text-gray-600">AI will validate your rule for conflicts and optimization opportunities</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap size={14} className="text-blue-600" />
                  <span className="text-sm font-medium">Performance Analysis</span>
                </div>
                <p className="text-xs text-gray-600">Get insights on rule performance and execution patterns</p>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter rule name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Rule['category'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="Ticket Approval">Ticket Approval</option>
                <option value="Priority Assignment">Priority Assignment</option>
                <option value="Auto Assignment">Auto Assignment</option>
                <option value="Escalation">Escalation</option>
                <option value="Notification">Notification</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              rows={3}
              placeholder="Describe what this rule does"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <input
              type="number"
              value={priority}
              onChange={(e) => setPriority(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              min="1"
              max="10"
            />
          </div>

          {/* Conditions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-gray-900">Conditions (IF)</h4>
              <button
                onClick={addCondition}
                className="btn-secondary flex items-center gap-2"
              >
                <Plus size={16} />
                Add Condition
              </button>
            </div>
            <div className="space-y-3">
              {conditions.map((condition, index) => (
                <div key={condition.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">IF</span>
                  <select
                    value={condition.field}
                    onChange={(e) => updateCondition(condition.id, { field: e.target.value })}
                    className="px-3 py-1 border border-gray-300 rounded bg-white"
                  >
                    {fieldOptions.map(field => (
                      <option key={field.value} value={field.value}>{field.label}</option>
                    ))}
                  </select>
                  <select
                    value={condition.operator}
                    onChange={(e) => updateCondition(condition.id, { operator: e.target.value as any })}
                    className="px-3 py-1 border border-gray-300 rounded bg-white"
                  >
                    {operatorOptions.map(op => (
                      <option key={op.value} value={op.value}>{op.label}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={condition.value}
                    onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
                    className="px-3 py-1 border border-gray-300 rounded"
                    placeholder="Value"
                  />
                  {index < conditions.length - 1 && <span className="text-sm text-gray-500">AND</span>}
                  <button
                    onClick={() => removeCondition(condition.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-gray-900">Actions (THEN)</h4>
              <button
                onClick={addAction}
                className="btn-secondary flex items-center gap-2"
              >
                <Plus size={16} />
                Add Action
              </button>
            </div>
            <div className="space-y-3">
              {actions.map((action, index) => (
                <div key={action.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">THEN</span>
                  <select
                    value={action.type}
                    onChange={(e) => updateAction(action.id, { type: e.target.value as any })}
                    className="px-3 py-1 border border-gray-300 rounded bg-white"
                  >
                    {actionTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={action.value}
                    onChange={(e) => updateAction(action.id, { value: e.target.value })}
                    className="px-3 py-1 border border-gray-300 rounded"
                    placeholder="Action value"
                  />
                  <button
                    onClick={() => removeAction(action.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!name.trim() || conditions.length === 0 || actions.length === 0}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Rule
          </button>
        </div>
      </div>
    </div>
  );
}

function EditRuleModal({ rule, onClose, onSave }: { rule: Rule; onClose: () => void; onSave: (rule: Rule) => void }) {
  const [name, setName] = useState(rule.name);
  const [description, setDescription] = useState(rule.description);
  const [category, setCategory] = useState(rule.category);
  const [priority, setPriority] = useState(rule.priority);
  const [status, setStatus] = useState(rule.status);
  const [conditions, setConditions] = useState(rule.conditions);
  const [actions, setActions] = useState(rule.actions);

  const handleSave = () => {
    const updatedRule: Rule = {
      ...rule,
      name: name.trim(),
      description: description.trim(),
      category,
      priority,
      status,
      conditions,
      actions,
      updatedAt: new Date().toISOString()
    };

    onSave(updatedRule);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white w-full max-w-4xl mx-4 rounded-lg shadow-xl border border-gray-200 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Edit Rule</h3>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Rule['category'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="Ticket Approval">Ticket Approval</option>
                <option value="Priority Assignment">Priority Assignment</option>
                <option value="Auto Assignment">Auto Assignment</option>
                <option value="Escalation">Escalation</option>
                <option value="Notification">Notification</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Rule['status'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <input
                type="number"
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                min="1"
                max="10"
              />
            </div>
          </div>

          {/* Show existing conditions and actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Current Conditions</h4>
              <div className="space-y-2">
                {conditions.map((condition, index) => {
                  const field = fieldOptions.find(f => f.value === condition.field);
                  return (
                    <div key={condition.id} className="text-sm bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-500">IF</span> {field?.label} {operatorOptions.find(op => op.value === condition.operator)?.label} "{condition.value}"
                      {index < conditions.length - 1 && <span className="text-gray-400 ml-2">AND</span>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Current Actions</h4>
              <div className="space-y-2">
                {actions.map((action, index) => {
                  const actionType = actionTypes.find(a => a.value === action.type);
                  return (
                    <div key={action.id} className="text-sm bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-500">THEN</span> <span className="font-medium">{actionType?.label}</span> {action.value}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <AlertCircle size={16} className="inline mr-2" />
              To modify conditions and actions, please use the rule builder interface. This edit modal shows current configuration.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
