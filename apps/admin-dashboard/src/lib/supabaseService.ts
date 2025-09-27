import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fcdfwqengcmtsatrkwin.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZGZ3cWVuZ2NtdHNhdHJrd2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3MTI1MjAsImV4cCI6MjA3MzI4ODUyMH0.e0VLoxpCLdXzPX0ihTcJiXPmnf3mn9o1Go1hKYvXENE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =====================================================
// TYPES AND INTERFACES
// =====================================================

export interface Account {
  id: string;
  name: string;
  health_score: number;
  status: 'Healthy' | 'At Risk' | 'Critical';
  alerts: number;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  industry?: string;
  created_at: string;
  updated_at: string;
  metadata: any;
}

export interface Asset {
  id: string;
  name: string;
  type: 'hardware' | 'software' | 'service' | 'license';
  status: 'active' | 'inactive' | 'maintenance' | 'retired';
  account_id: string;
  assigned_to?: string;
  purchase_date?: string;
  warranty_expiry?: string;
  cost?: number;
  location?: string;
  specifications: any;
  created_at: string;
  updated_at: string;
  metadata: any;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  category: 'technical' | 'billing' | 'general' | 'feature_request' | 'bug_report';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Pending';
  created_by: string;
  customer_email?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  tags?: string[];
  attachments?: any[];
  metadata?: any;
  channel?: string;
  sla_deadline?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'draft';
  trigger_conditions: any;
  actions: any[];
  success_rate: number;
  total_runs: number;
  cost_optimization: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  metadata: any;
}

export interface WorkflowExecution {
  id: string;
  workflow_id: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  started_at: string;
  completed_at?: string;
  input_data: any;
  output_data: any;
  error_message?: string;
  execution_time_ms?: number;
  metadata: any;
}

export interface Rule {
  id: string;
  name: string;
  description?: string;
  conditions: any;
  actions: any;
  priority: number;
  is_active: boolean;
  executions: number;
  success_rate: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  metadata: any;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category?: string;
  tags: string[];
  helpfulness_score: number;
  view_count: number;
  is_published: boolean;
  author_id?: string;
  created_at: string;
  updated_at: string;
  metadata: any;
}

export interface ServiceRequest {
  id: string;
  channel: 'Email' | 'Portal' | 'Slack' | 'Phone' | 'Chat';
  count: number;
  auto_assignment_rate: number;
  auto_approved_count: number;
  duplicates_prevented: number;
  period_date: string;
  created_at: string;
  metadata: any;
}

export interface DashboardMetric {
  id: string;
  metric_name: string;
  metric_value: number;
  metric_type: 'count' | 'percentage' | 'currency' | 'duration';
  category?: string;
  period_start?: string;
  period_end?: string;
  created_at: string;
  metadata: any;
}

export interface AIModel {
  id: string;
  name: string;
  model_type: 'classification' | 'regression' | 'nlp' | 'recommendation' | 'clustering';
  version: string;
  is_active: boolean;
  accuracy_score?: number;
  config: any;
  created_at: string;
  updated_at: string;
  metadata: any;
}

export interface AIPrediction {
  id: string;
  model_id: string;
  input_data: any;
  prediction: any;
  confidence_score: number;
  actual_result?: any;
  created_at: string;
  metadata: any;
}

export interface AIInsight {
  id: string;
  insight_type: 'ticket_assignment' | 'churn_prediction' | 'upsell_opportunity' | 'workflow_optimization' | 'content_recommendation' | 'anomaly_detection';
  title: string;
  description?: string;
  confidence: number;
  data: any;
  is_actionable: boolean;
  is_implemented: boolean;
  created_by?: string;
  created_at: string;
  metadata: any;
}

export interface Integration {
  id: string;
  name: string;
  type: 'api' | 'webhook' | 'oauth' | 'sso';
  status: 'active' | 'inactive' | 'error';
  config: any;
  credentials: any;
  last_sync?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  metadata: any;
}

// =====================================================
// ACCOUNT SERVICES
// =====================================================

export const accountService = {
  // Get all accounts
  async getAllAccounts(): Promise<Account[]> {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching accounts:', error);
      return [];
    }

    return data || [];
  },

  // Get account by ID
  async getAccountById(id: string): Promise<Account | null> {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching account:', error);
      return null;
    }

    return data;
  },

  // Create account
  async createAccount(accountData: Omit<Account, 'id' | 'created_at' | 'updated_at'>): Promise<Account | null> {
    const { data, error } = await supabase
      .from('accounts')
      .insert({
        ...accountData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating account:', error);
      return null;
    }

    return data;
  },

  // Update account
  async updateAccount(id: string, updates: Partial<Account>): Promise<Account | null> {
    const { data, error } = await supabase
      .from('accounts')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating account:', error);
      return null;
    }

    return data;
  },

  // Delete account
  async deleteAccount(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('accounts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting account:', error);
      return false;
    }

    return true;
  },

  // Get account statistics
  async getAccountStats(): Promise<any> {
    const { data, error } = await supabase
      .from('accounts')
      .select('status, health_score');

    if (error) {
      console.error('Error fetching account stats:', error);
      return null;
    }

    const accounts = data || [];
    const total = accounts.length;
    const healthy = accounts.filter(a => a.status === 'Healthy').length;
    const atRisk = accounts.filter(a => a.status === 'At Risk').length;
    const critical = accounts.filter(a => a.status === 'Critical').length;
    const avgHealthScore = total > 0 ? accounts.reduce((sum, a) => sum + a.health_score, 0) / total : 0;

    return {
      total,
      healthy,
      at_risk: atRisk,
      critical,
      average_health_score: Math.round(avgHealthScore * 10) / 10
    };
  }
};

// =====================================================
// ASSET SERVICES
// =====================================================

export const assetService = {
  // Get all assets
  async getAllAssets(): Promise<Asset[]> {
    const { data, error } = await supabase
      .from('assets')
      .select(`
        *,
        accounts:account_id(name),
        assigned_user:assigned_to(id, email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching assets:', error);
      return [];
    }

    return data || [];
  },

  // Get assets by account
  async getAssetsByAccount(accountId: string): Promise<Asset[]> {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('account_id', accountId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching assets by account:', error);
      return [];
    }

    return data || [];
  },

  // Get asset by ID
  async getAssetById(id: string): Promise<Asset | null> {
    const { data, error } = await supabase
      .from('assets')
      .select(`
        *,
        accounts:account_id(name),
        assigned_user:assigned_to(id, email)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching asset:', error);
      return null;
    }

    return data;
  },

  // Create asset
  async createAsset(assetData: Omit<Asset, 'id' | 'created_at' | 'updated_at'>): Promise<Asset | null> {
    const { data, error } = await supabase
      .from('assets')
      .insert({
        ...assetData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating asset:', error);
      return null;
    }

    return data;
  },

  // Update asset
  async updateAsset(id: string, updates: Partial<Asset>): Promise<Asset | null> {
    const { data, error } = await supabase
      .from('assets')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating asset:', error);
      return null;
    }

    return data;
  },

  // Delete asset
  async deleteAsset(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting asset:', error);
      return false;
    }

    return true;
  },

  // Get asset statistics
  async getAssetStats(): Promise<any> {
    const { data, error } = await supabase
      .from('assets')
      .select('type, status, cost');

    if (error) {
      console.error('Error fetching asset stats:', error);
      return null;
    }

    const assets = data || [];
    const total = assets.length;
    const active = assets.filter(a => a.status === 'active').length;
    const totalCost = assets.reduce((sum, a) => sum + (a.cost || 0), 0);

    const typeStats = assets.reduce((acc, asset) => {
      acc[asset.type] = (acc[asset.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      active,
      total_cost: totalCost,
      type_distribution: typeStats
    };
  }
};

// =====================================================
// TICKET SERVICES
// =====================================================

export const ticketService = {
  // Get all tickets (admin view)
  async getTickets(): Promise<Ticket[]> {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tickets:', error);
      return [];
    }

    return data || [];
  },

  // Get ticket by ID
  async getTicketById(id: string): Promise<Ticket | null> {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching ticket:', error);
      return null;
    }

    return data;
  },

  // Create new ticket
  async createTicket(ticketData: Omit<Ticket, 'id' | 'created_at' | 'updated_at'>): Promise<Ticket | null> {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .insert({
          subject: ticketData.subject,
          description: ticketData.description,
          status: ticketData.status || 'Open',
          priority: ticketData.priority || 'Medium',
          category: ticketData.category || 'technical',
          channel: 'Portal',
          customer_email: 'customer@example.com',
          created_by: 'admin-user',
          sla_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating ticket:', error);
        throw new Error(`Failed to create ticket: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  },

  // Update ticket
  async updateTicket(id: string, updates: Partial<Ticket>): Promise<Ticket | null> {
    const { data, error } = await supabase
      .from('tickets')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating ticket:', error);
      return null;
    }

    return data;
  },

  // Delete ticket
  async deleteTicket(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting ticket:', error);
      return false;
    }

    return true;
  },

  // Get ticket statistics
  async getTicketStats(): Promise<any> {
    const { data, error } = await supabase
      .from('tickets')
      .select('status');

    if (error) {
      console.error('Error fetching ticket stats:', error);
      return null;
    }

    const tickets = data || [];
    const stats = tickets.reduce((acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: tickets.length,
      open: stats['Open'] || 0,
      in_progress: stats['In Progress'] || 0,
      resolved: stats['Resolved'] || 0,
      closed: stats['Closed'] || 0
    };
  }
};

// =====================================================
// WORKFLOW SERVICES
// =====================================================

export const workflowService = {
  // Get all workflows
  async getAllWorkflows(): Promise<Workflow[]> {
    const { data, error } = await supabase
      .from('workflows')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching workflows:', error);
      return [];
    }

    return data || [];
  },

  // Get workflow by ID
  async getWorkflowById(id: string): Promise<Workflow | null> {
    const { data, error } = await supabase
      .from('workflows')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching workflow:', error);
      return null;
    }

    return data;
  },

  // Create workflow
  async createWorkflow(workflowData: Omit<Workflow, 'id' | 'created_at' | 'updated_at'>): Promise<Workflow | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('workflows')
      .insert({
        ...workflowData,
        created_by: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating workflow:', error);
      return null;
    }

    return data;
  },

  // Update workflow
  async updateWorkflow(id: string, updates: Partial<Workflow>): Promise<Workflow | null> {
    const { data, error } = await supabase
      .from('workflows')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating workflow:', error);
      return null;
    }

    return data;
  },

  // Delete workflow
  async deleteWorkflow(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('workflows')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting workflow:', error);
      return false;
    }

    return true;
  },

  // Get workflow executions
  async getWorkflowExecutions(workflowId?: string): Promise<WorkflowExecution[]> {
    let query = supabase
      .from('workflow_executions')
      .select('*')
      .order('started_at', { ascending: false });

    if (workflowId) {
      query = query.eq('workflow_id', workflowId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching workflow executions:', error);
      return [];
    }

    return data || [];
  },

  // Get workflow statistics
  async getWorkflowStats(): Promise<any> {
    const { data, error } = await supabase
      .from('workflows')
      .select('status, success_rate, total_runs, cost_optimization');

    if (error) {
      console.error('Error fetching workflow stats:', error);
      return null;
    }

    const workflows = data || [];
    const active = workflows.filter(w => w.status === 'active').length;
    const avgSuccessRate = workflows.length > 0 ? workflows.reduce((sum, w) => sum + w.success_rate, 0) / workflows.length : 0;
    const totalRuns = workflows.reduce((sum, w) => sum + w.total_runs, 0);
    const totalCostOptimization = workflows.reduce((sum, w) => sum + w.cost_optimization, 0);

    return {
      total: workflows.length,
      active,
      average_success_rate: Math.round(avgSuccessRate * 10) / 10,
      total_runs: totalRuns,
      total_cost_optimization: totalCostOptimization
    };
  }
};

// =====================================================
// RULE SERVICES
// =====================================================

export const ruleService = {
  // Get all rules
  async getAllRules(): Promise<Rule[]> {
    const { data, error } = await supabase
      .from('rules')
      .select('*')
      .order('priority', { ascending: true });

    if (error) {
      console.error('Error fetching rules:', error);
      return [];
    }

    return data || [];
  },

  // Get rule by ID
  async getRuleById(id: string): Promise<Rule | null> {
    const { data, error } = await supabase
      .from('rules')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching rule:', error);
      return null;
    }

    return data;
  },

  // Create rule
  async createRule(ruleData: Omit<Rule, 'id' | 'created_at' | 'updated_at'>): Promise<Rule | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('rules')
      .insert({
        ...ruleData,
        created_by: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating rule:', error);
      return null;
    }

    return data;
  },

  // Update rule
  async updateRule(id: string, updates: Partial<Rule>): Promise<Rule | null> {
    const { data, error } = await supabase
      .from('rules')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating rule:', error);
      return null;
    }

    return data;
  },

  // Delete rule
  async deleteRule(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('rules')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting rule:', error);
      return false;
    }

    return true;
  },

  // Get rule statistics
  async getRuleStats(): Promise<any> {
    const { data, error } = await supabase
      .from('rules')
      .select('is_active, executions, success_rate');

    if (error) {
      console.error('Error fetching rule stats:', error);
      return null;
    }

    const rules = data || [];
    const active = rules.filter(r => r.is_active).length;
    const totalExecutions = rules.reduce((sum, r) => sum + r.executions, 0);
    const avgSuccessRate = rules.length > 0 ? rules.reduce((sum, r) => sum + r.success_rate, 0) / rules.length : 0;

    return {
      total: rules.length,
      active,
      total_executions: totalExecutions,
      average_success_rate: Math.round(avgSuccessRate * 10) / 10
    };
  }
};

// =====================================================
// KNOWLEDGE BASE SERVICES
// =====================================================

export const knowledgeService = {
  // Get all published articles
  async getAllArticles(): Promise<KnowledgeArticle[]> {
    const { data, error } = await supabase
      .from('knowledge_articles')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      return [];
    }

    return data || [];
  },

  // Get article by ID
  async getArticleById(id: string): Promise<KnowledgeArticle | null> {
    const { data, error } = await supabase
      .from('knowledge_articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching article:', error);
      return null;
    }

    return data;
  },

  // Search articles
  async searchArticles(query: string): Promise<KnowledgeArticle[]> {
    const { data, error } = await supabase
      .from('knowledge_articles')
      .select('*')
      .eq('is_published', true)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('helpfulness_score', { ascending: false });

    if (error) {
      console.error('Error searching articles:', error);
      return [];
    }

    return data || [];
  },

  // Create article
  async createArticle(articleData: Omit<KnowledgeArticle, 'id' | 'created_at' | 'updated_at'>): Promise<KnowledgeArticle | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('knowledge_articles')
      .insert({
        ...articleData,
        author_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating article:', error);
      return null;
    }

    return data;
  },

  // Update article
  async updateArticle(id: string, updates: Partial<KnowledgeArticle>): Promise<KnowledgeArticle | null> {
    const { data, error } = await supabase
      .from('knowledge_articles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating article:', error);
      return null;
    }

    return data;
  },

  // Delete article
  async deleteArticle(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('knowledge_articles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting article:', error);
      return false;
    }

    return true;
  },

  // Increment view count
  async incrementViewCount(id: string): Promise<boolean> {
    const { error } = await supabase.rpc('increment_view_count', {
      article_id: id
    });

    if (error) {
      console.error('Error incrementing view count:', error);
      return false;
    }

    return true;
  }
};

// =====================================================
// DASHBOARD SERVICES
// =====================================================

export const adminDashboardService = {
  // Get comprehensive dashboard data
  async getDashboardData(): Promise<any> {
    const [
      accountStats,
      assetStats,
      workflowStats,
      ruleStats,
      serviceStats,
      ticketStats,
      ratingStats
    ] = await Promise.all([
      accountService.getAccountStats(),
      assetService.getAssetStats(),
      workflowService.getWorkflowStats(),
      ruleService.getRuleStats(),
      this.getServiceRequestStats(),
      this.getTicketStats(),
      this.getRatingStats()
    ]);

    return {
      accounts: accountStats,
      assets: assetStats,
      workflows: workflowStats,
      rules: ruleStats,
      service_requests: serviceStats,
      tickets: ticketStats,
      ratings: ratingStats
    };
  },

  // Get service request statistics
  async getServiceRequestStats(): Promise<any> {
    const { data, error } = await supabase
      .from('service_requests')
      .select('*');

    if (error) {
      console.error('Error fetching service request stats:', error);
      return null;
    }

    const requests = data || [];
    const totalRequests = requests.reduce((sum, r) => sum + r.count, 0);
    const avgAutoAssignment = requests.length > 0 ? requests.reduce((sum, r) => sum + r.auto_assignment_rate, 0) / requests.length : 0;
    const totalAutoApproved = requests.reduce((sum, r) => sum + r.auto_approved_count, 0);
    const totalDuplicatesPrevented = requests.reduce((sum, r) => sum + r.duplicates_prevented, 0);

    return {
      total_requests: totalRequests,
      average_auto_assignment: Math.round(avgAutoAssignment * 10) / 10,
      total_auto_approved: totalAutoApproved,
      total_duplicates_prevented: totalDuplicatesPrevented,
      channel_breakdown: requests.reduce((acc, r) => {
        acc[r.channel] = r.count;
        return acc;
      }, {} as Record<string, number>)
    };
  },

  // Get ticket statistics
  async getTicketStats(): Promise<any> {
    const { data, error } = await supabase
      .from('tickets')
      .select('status, priority, category, created_at');

    if (error) {
      console.error('Error fetching ticket stats:', error);
      return null;
    }

    const tickets = data || [];
    const total = tickets.length;
    const open = tickets.filter(t => t.status === 'open').length;
    const inProgress = tickets.filter(t => t.status === 'in_progress').length;
    const resolved = tickets.filter(t => t.status === 'resolved').length;
    const closed = tickets.filter(t => t.status === 'closed').length;
    const pending = tickets.filter(t => t.status === 'pending').length;

    return {
      total,
      open,
      in_progress,
      resolved,
      closed,
      pending
    };
  },

  // Get rating statistics
  async getRatingStats(): Promise<any> {
    const { data, error } = await supabase
      .from('ratings')
      .select('rating, category, created_at');

    if (error) {
      console.error('Error fetching rating stats:', error);
      return null;
    }

    const ratings = data || [];
    const total = ratings.length;
    const average = total > 0 ? ratings.reduce((sum, r) => sum + r.rating, 0) / total : 0;

    return {
      total_ratings: total,
      average_rating: Math.round(average * 10) / 10,
      rating_distribution: {
        5: ratings.filter(r => r.rating === 5).length,
        4: ratings.filter(r => r.rating === 4).length,
        3: ratings.filter(r => r.rating === 3).length,
        2: ratings.filter(r => r.rating === 2).length,
        1: ratings.filter(r => r.rating === 1).length
      }
    };
  }
};

// =====================================================
// AI SERVICES
// =====================================================

export const aiService = {
  // Get all AI models
  async getAllModels(): Promise<AIModel[]> {
    const { data, error } = await supabase
      .from('ai_models')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching AI models:', error);
      return [];
    }

    return data || [];
  },

  // Get AI insights
  async getInsights(): Promise<AIInsight[]> {
    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching AI insights:', error);
      return [];
    }

    return data || [];
  },

  // Get actionable insights
  async getActionableInsights(): Promise<AIInsight[]> {
    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('is_actionable', true)
      .eq('is_implemented', false)
      .order('confidence', { ascending: false });

    if (error) {
      console.error('Error fetching actionable insights:', error);
      return [];
    }

    return data || [];
  }
};

// =====================================================
// INTEGRATION SERVICES
// =====================================================

export const integrationService = {
  // Get all integrations
  async getAllIntegrations(): Promise<Integration[]> {
    const { data, error } = await supabase
      .from('integrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching integrations:', error);
      return [];
    }

    return data || [];
  },

  // Create integration
  async createIntegration(integrationData: Omit<Integration, 'id' | 'created_at' | 'updated_at'>): Promise<Integration | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('integrations')
      .insert({
        ...integrationData,
        created_by: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating integration:', error);
      return null;
    }

    return data;
  },

  // Update integration
  async updateIntegration(id: string, updates: Partial<Integration>): Promise<Integration | null> {
    const { data, error } = await supabase
      .from('integrations')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating integration:', error);
      return null;
    }

    return data;
  },

  // Delete integration
  async deleteIntegration(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('integrations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting integration:', error);
      return false;
    }

    return true;
  }
};

// =====================================================
// REAL-TIME SUBSCRIPTIONS
// =====================================================

export const realtimeService = {
  // Subscribe to account changes
  subscribeToAccounts(callback: (payload: any) => void) {
    return supabase
      .channel('accounts')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'accounts' }, 
        callback
      )
      .subscribe();
  },

  // Subscribe to asset changes
  subscribeToAssets(callback: (payload: any) => void) {
    return supabase
      .channel('assets')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'assets' }, 
        callback
      )
      .subscribe();
  },

  // Subscribe to workflow changes
  subscribeToWorkflows(callback: (payload: any) => void) {
    return supabase
      .channel('workflows')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'workflows' }, 
        callback
      )
      .subscribe();
  },

  // Subscribe to rule changes
  subscribeToRules(callback: (payload: any) => void) {
    return supabase
      .channel('rules')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'rules' }, 
        callback
      )
      .subscribe();
  },

  // Subscribe to ticket changes
  subscribeToTickets(callback: (payload: any) => void) {
    return supabase
      .channel('tickets')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tickets' }, 
        callback
      )
      .subscribe();
  }
};

export default supabase;

// Analytics and Dashboard Data
export const analyticsService = {
  async getDashboardStats() {
    // Mock data for now - replace with actual Supabase queries
    return {
      totalUsers: 150,
      totalAccounts: 45,
      totalAssets: 200,
      totalTickets: 89,
      totalWorkflows: 12,
      totalKnowledgeArticles: 67,
      openTickets: 23,
      inProgressTickets: 15,
      resolvedTickets: 51,
      activeWorkflows: 8
    };
  },

  async getRecentActivity() {
    const { data, error } = await service
      .from('tickets')
      .select(`
        id,
        title,
        status,
        priority,
        created_at,
        created_user:users!tickets_created_by_fkey(name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  }
};




