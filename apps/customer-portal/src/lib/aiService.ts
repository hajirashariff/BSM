// AI Service Integration for Web Portal
// This service handles all AI-related API calls and data processing

const AI_API_BASE = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:8000/api/ai';

export interface AIClassification {
  category: string;
  priority: string;
  suggested_assignee: string;
  confidence: number;
  tags: string[];
}

export interface AIAccountAnalysis {
  churn_risk: string;
  health_trend: string;
  upsell_opportunity: {
    has_opportunity: boolean;
    confidence: number;
    suggested_products: string[];
    estimated_value: string;
  };
  insights: string[];
  recommended_actions: string[];
  confidence: number;
}

export interface AIWorkflowAnalysis {
  efficiency_score: number;
  bottlenecks: string[];
  optimizations: string[];
  estimated_improvement: {
    time_reduction: string;
    error_reduction: string;
    cost_savings: string;
  };
  confidence: number;
}

export interface AIInsight {
  id: number;
  type: string;
  title: string;
  description: string;
  confidence: number;
  is_actionable: boolean;
  is_implemented: boolean;
  created_at: string;
  data: any;
}

class AIService {
  private async makeRequest<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await fetch(`${AI_API_BASE}${endpoint}`, {
        method: data ? 'POST' : 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        throw new Error(`AI API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  // Ticket Classification
  async classifyTicket(subject: string, description: string): Promise<AIClassification> {
    const result = await this.makeRequest<{
      success: boolean;
      classification: AIClassification;
      message: string;
    }>('/classify-ticket/', {
      subject,
      description,
    });

    if (!result.success) {
      throw new Error(result.message || 'Failed to classify ticket');
    }

    return result.classification;
  }

  // Account Analysis
  async analyzeAccount(accountData: any): Promise<AIAccountAnalysis> {
    const result = await this.makeRequest<{
      success: boolean;
      analysis: AIAccountAnalysis;
      message: string;
    }>('/analyze-account/', accountData);

    if (!result.success) {
      throw new Error(result.message || 'Failed to analyze account');
    }

    return result.analysis;
  }

  // Enhanced Search
  async enhanceSearch(query: string, articles: any[]): Promise<any[]> {
    const result = await this.makeRequest<{
      success: boolean;
      enhanced_results: any[];
      message: string;
    }>('/enhance-search/', {
      query,
      articles,
    });

    if (!result.success) {
      throw new Error(result.message || 'Failed to enhance search');
    }

    return result.enhanced_results;
  }

  // Content Suggestions
  async generateContentSuggestions(topic: string): Promise<string[]> {
    const result = await this.makeRequest<{
      success: boolean;
      suggestions: string[];
      message: string;
    }>('/generate-content-suggestions/', {
      topic,
    });

    if (!result.success) {
      throw new Error(result.message || 'Failed to generate content suggestions');
    }

    return result.suggestions;
  }

  // Workflow Analysis
  async analyzeWorkflow(workflowData: any): Promise<AIWorkflowAnalysis> {
    const result = await this.makeRequest<{
      success: boolean;
      analysis: AIWorkflowAnalysis;
      message: string;
    }>('/analyze-workflow/', workflowData);

    if (!result.success) {
      throw new Error(result.message || 'Failed to analyze workflow');
    }

    return result.analysis;
  }

  // Get AI Insights
  async getInsights(type?: string, limit: number = 10): Promise<AIInsight[]> {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    params.append('limit', limit.toString());

    const result = await this.makeRequest<{
      success: boolean;
      insights: AIInsight[];
      message: string;
    }>(`/insights/?${params.toString()}`);

    if (!result.success) {
      throw new Error(result.message || 'Failed to get insights');
    }

    return result.insights;
  }

  // Create AI Insight
  async createInsight(insightData: {
    type: string;
    title: string;
    description: string;
    confidence: number;
    data: any;
    is_actionable: boolean;
  }): Promise<number> {
    const result = await this.makeRequest<{
      success: boolean;
      insight_id: number;
      message: string;
    }>('/insights/create/', insightData);

    if (!result.success) {
      throw new Error(result.message || 'Failed to create insight');
    }

    return result.insight_id;
  }

  // Health Check
  async healthCheck(): Promise<{
    status: string;
    services: Record<string, string>;
  }> {
    const result = await this.makeRequest<{
      success: boolean;
      status: string;
      services: Record<string, string>;
      message: string;
    }>('/health/');

    if (!result.success) {
      throw new Error(result.message || 'AI services health check failed');
    }

    return {
      status: result.status,
      services: result.services,
    };
  }
}

export const aiService = new AIService();
export default aiService;

