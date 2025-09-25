// Frontend API service for AI-Enhanced Workflow System
// This file provides TypeScript interfaces and API calls for the workflow system

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'trigger' | 'action' | 'condition' | 'delay' | 'notification';
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: string[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'archived';
  steps: WorkflowStep[];
  triggers: string[];
  createdAt: Date;
  updatedAt: Date;
  lastRun?: Date;
  runCount: number;
  successRate: number;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  steps: Array<{
    stepId: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
    startTime?: Date;
    endTime?: Date;
    output?: any;
    error?: string;
  }>;
  input: any;
  output?: any;
  error?: string;
}

export interface AIInsight {
  id: string;
  type: 'optimization' | 'anomaly' | 'prediction' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  suggestedActions: string[];
  createdAt: Date;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  steps: WorkflowStep[];
  estimatedDuration: string;
  complexity: 'simple' | 'medium' | 'complex';
  useCases: string[];
}

// API Service Class
export class AIWorkflowAPI {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/workflows') {
    this.baseUrl = baseUrl;
  }

  // Workflow CRUD operations
  async getWorkflows(): Promise<Workflow[]> {
    const response = await fetch(`${this.baseUrl}/`);
    if (!response.ok) throw new Error('Failed to fetch workflows');
    return response.json();
  }

  async getWorkflow(id: string): Promise<Workflow> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch workflow');
    return response.json();
  }

  async createWorkflow(workflow: Partial<Workflow>): Promise<Workflow> {
    const response = await fetch(`${this.baseUrl}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workflow),
    });
    if (!response.ok) throw new Error('Failed to create workflow');
    return response.json();
  }

  async updateWorkflow(id: string, workflow: Partial<Workflow>): Promise<Workflow> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workflow),
    });
    if (!response.ok) throw new Error('Failed to update workflow');
    return response.json();
  }

  async deleteWorkflow(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete workflow');
  }

  // Workflow execution
  async executeWorkflow(id: string, input?: any): Promise<WorkflowExecution> {
    const response = await fetch(`${this.baseUrl}/${id}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });
    if (!response.ok) throw new Error('Failed to execute workflow');
    return response.json();
  }

  async getExecutions(workflowId?: string): Promise<WorkflowExecution[]> {
    const url = workflowId ? `${this.baseUrl}/${workflowId}/executions` : `${this.baseUrl}/executions`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch executions');
    return response.json();
  }

  async getExecution(id: string): Promise<WorkflowExecution> {
    const response = await fetch(`${this.baseUrl}/executions/${id}`);
    if (!response.ok) throw new Error('Failed to fetch execution');
    return response.json();
  }

  // AI Insights
  async getAIInsights(workflowId?: string): Promise<AIInsight[]> {
    const url = workflowId ? `${this.baseUrl}/${workflowId}/insights` : `${this.baseUrl}/insights`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch AI insights');
    return response.json();
  }

  async generateAIInsights(workflowId: string): Promise<AIInsight[]> {
    const response = await fetch(`${this.baseUrl}/${workflowId}/generate-insights`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to generate AI insights');
    return response.json();
  }

  // Templates
  async getTemplates(): Promise<WorkflowTemplate[]> {
    const response = await fetch(`${this.baseUrl}/templates`);
    if (!response.ok) throw new Error('Failed to fetch templates');
    return response.json();
  }

  async createFromTemplate(templateId: string, name: string): Promise<Workflow> {
    const response = await fetch(`${this.baseUrl}/templates/${templateId}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Failed to create workflow from template');
    return response.json();
  }

  // Analytics
  async getWorkflowAnalytics(workflowId?: string): Promise<any> {
    const url = workflowId ? `${this.baseUrl}/${workflowId}/analytics` : `${this.baseUrl}/analytics`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch analytics');
    return response.json();
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: Date }> {
    const response = await fetch(`${this.baseUrl}/health`);
    if (!response.ok) throw new Error('Health check failed');
    return response.json();
  }
}

// Export default instance
export const workflowAPI = new AIWorkflowAPI();
