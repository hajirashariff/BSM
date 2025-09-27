import { supabase, User, Account, Asset, Ticket, Workflow, KnowledgeBase, Notification, ServiceRequest, Integration, Rule } from './supabase';
import { mockSupabaseService } from './mockSupabaseService';

// Always use real Supabase service
const service = supabase;

// User Management
export const userService = {
  async getUsers(): Promise<User[]> {
    const { data, error } = await service
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const { data, error } = await service
      .from('users')
      .insert([user])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await service
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteUser(id: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Account Management
export const accountService = {
  async getAccounts(): Promise<Account[]> {
    const { data, error } = await service
      .from('accounts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createAccount(account: Omit<Account, 'id' | 'created_at' | 'updated_at'>): Promise<Account> {
    const { data, error } = await service
      .from('accounts')
      .insert([account])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateAccount(id: string, updates: Partial<Account>): Promise<Account> {
    const { data, error } = await service
      .from('accounts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteAccount(id: string): Promise<void> {
    const { error } = await supabase
      .from('accounts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Asset Management
export const assetService = {
  async getAssets(): Promise<Asset[]> {
    const { data, error } = await service
      .from('assets')
      .select(`
        *,
        assigned_user:users!assets_assigned_to_fkey(name, email),
        account:accounts!assets_account_id_fkey(name, account_type)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createAsset(asset: Omit<Asset, 'id' | 'created_at' | 'updated_at'>): Promise<Asset> {
    const { data, error } = await service
      .from('assets')
      .insert([asset])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateAsset(id: string, updates: Partial<Asset>): Promise<Asset> {
    const { data, error } = await service
      .from('assets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteAsset(id: string): Promise<void> {
    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Ticket Management
export const ticketService = {
  async getTickets(): Promise<Ticket[]> {
    const { data, error } = await service
      .from('tickets')
      .select(`
        *,
        created_user:users!tickets_created_by_fkey(name, email),
        assigned_user:users!tickets_assigned_to_fkey(name, email),
        account:accounts!tickets_account_id_fkey(name),
        asset:assets!tickets_asset_id_fkey(name, type)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createTicket(ticket: Omit<Ticket, 'id' | 'created_at' | 'updated_at'>): Promise<Ticket> {
    const { data, error } = await service
      .from('tickets')
      .insert([ticket])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTicket(id: string, updates: Partial<Ticket>): Promise<Ticket> {
    const { data, error } = await service
      .from('tickets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteTicket(id: string): Promise<void> {
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Workflow Management
export const workflowService = {
  async getWorkflows(): Promise<Workflow[]> {
    const { data, error } = await service
      .from('workflows')
      .select(`
        *,
        created_user:users!workflows_created_by_fkey(name, email)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createWorkflow(workflow: Omit<Workflow, 'id' | 'created_at' | 'updated_at'>): Promise<Workflow> {
    const { data, error } = await service
      .from('workflows')
      .insert([workflow])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateWorkflow(id: string, updates: Partial<Workflow>): Promise<Workflow> {
    const { data, error } = await service
      .from('workflows')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteWorkflow(id: string): Promise<void> {
    const { error } = await supabase
      .from('workflows')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Knowledge Base Management
export const knowledgeBaseService = {
  async getArticles(): Promise<KnowledgeBase[]> {
    const { data, error } = await service
      .from('knowledge_base')
      .select(`
        *,
        author:users!knowledge_base_author_id_fkey(name, email)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createArticle(article: Omit<KnowledgeBase, 'id' | 'created_at' | 'updated_at'>): Promise<KnowledgeBase> {
    const { data, error } = await service
      .from('knowledge_base')
      .insert([article])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateArticle(id: string, updates: Partial<KnowledgeBase>): Promise<KnowledgeBase> {
    const { data, error } = await service
      .from('knowledge_base')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteArticle(id: string): Promise<void> {
    const { error } = await supabase
      .from('knowledge_base')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async incrementViews(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_views', { article_id: id });
    if (error) throw error;
  }
};

// Notification Management
export const notificationService = {
  async getNotifications(userId?: string): Promise<Notification[]> {
    let query = supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async createNotification(notification: Omit<Notification, 'id' | 'created_at'>): Promise<Notification> {
    const { data, error } = await service
      .from('notifications')
      .insert([notification])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async markAsRead(id: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);
    
    if (error) throw error;
  },

  async markAllAsRead(userId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false);
    
    if (error) throw error;
  }
};

// Service Request Management
export const serviceRequestService = {
  async getServiceRequests(): Promise<ServiceRequest[]> {
    const { data, error } = await service
      .from('service_requests')
      .select(`
        *,
        requested_user:users!service_requests_requested_by_fkey(name, email),
        assigned_user:users!service_requests_assigned_to_fkey(name, email),
        account:accounts!service_requests_account_id_fkey(name)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createServiceRequest(request: Omit<ServiceRequest, 'id' | 'created_at' | 'updated_at'>): Promise<ServiceRequest> {
    const { data, error } = await service
      .from('service_requests')
      .insert([request])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateServiceRequest(id: string, updates: Partial<ServiceRequest>): Promise<ServiceRequest> {
    const { data, error } = await service
      .from('service_requests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteServiceRequest(id: string): Promise<void> {
    const { error } = await supabase
      .from('service_requests')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Integration Management
export const integrationService = {
  async getIntegrations(): Promise<Integration[]> {
    const { data, error } = await service
      .from('integrations')
      .select(`
        *,
        created_user:users!integrations_created_by_fkey(name, email)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createIntegration(integration: Omit<Integration, 'id' | 'created_at' | 'updated_at'>): Promise<Integration> {
    const { data, error } = await service
      .from('integrations')
      .insert([integration])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateIntegration(id: string, updates: Partial<Integration>): Promise<Integration> {
    const { data, error } = await service
      .from('integrations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteIntegration(id: string): Promise<void> {
    const { error } = await supabase
      .from('integrations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Rule Management
export const ruleService = {
  async getRules(): Promise<Rule[]> {
    const { data, error } = await service
      .from('rules')
      .select(`
        *,
        created_user:users!rules_created_by_fkey(name, email)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createRule(rule: Omit<Rule, 'id' | 'created_at' | 'updated_at'>): Promise<Rule> {
    const { data, error } = await service
      .from('rules')
      .insert([rule])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateRule(id: string, updates: Partial<Rule>): Promise<Rule> {
    const { data, error } = await service
      .from('rules')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteRule(id: string): Promise<void> {
    const { error } = await supabase
      .from('rules')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

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
