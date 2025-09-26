import { supabase, User, Account, Asset, Ticket, KnowledgeBase, Notification, ServiceRequest } from './supabase';

// Customer-specific services
export const customerService = {
  async getProfile(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Ticket Management for Customers
export const customerTicketService = {
  async getMyTickets(userId: string): Promise<Ticket[]> {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        assigned_user:users!tickets_assigned_to_fkey(name, email),
        account:accounts!tickets_account_id_fkey(name),
        asset:assets!tickets_asset_id_fkey(name, type)
      `)
      .eq('created_by', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createTicket(ticket: Omit<Ticket, 'id' | 'created_at' | 'updated_at'>): Promise<Ticket> {
    const { data, error } = await supabase
      .from('tickets')
      .insert([ticket])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTicket(id: string, updates: Partial<Ticket>): Promise<Ticket> {
    const { data, error } = await supabase
      .from('tickets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getTicketById(id: string): Promise<Ticket | null> {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        created_user:users!tickets_created_by_fkey(name, email),
        assigned_user:users!tickets_assigned_to_fkey(name, email),
        account:accounts!tickets_account_id_fkey(name),
        asset:assets!tickets_asset_id_fkey(name, type)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Knowledge Base for Customers
export const customerKnowledgeService = {
  async getPublishedArticles(): Promise<KnowledgeBase[]> {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select(`
        *,
        author:users!knowledge_base_author_id_fkey(name, email)
      `)
      .eq('status', 'Published')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getFeaturedArticles(): Promise<KnowledgeBase[]> {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select(`
        *,
        author:users!knowledge_base_author_id_fkey(name, email)
      `)
      .eq('status', 'Published')
      .eq('featured', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getArticlesByCategory(category: string): Promise<KnowledgeBase[]> {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select(`
        *,
        author:users!knowledge_base_author_id_fkey(name, email)
      `)
      .eq('status', 'Published')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async searchArticles(query: string): Promise<KnowledgeBase[]> {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select(`
        *,
        author:users!knowledge_base_author_id_fkey(name, email)
      `)
      .eq('status', 'Published')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getArticleById(id: string): Promise<KnowledgeBase | null> {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select(`
        *,
        author:users!knowledge_base_author_id_fkey(name, email)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async incrementViews(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_views', { article_id: id });
    if (error) throw error;
  },

  async voteHelpful(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_helpful_votes', { article_id: id });
    if (error) throw error;
  },

  async voteNotHelpful(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_not_helpful_votes', { article_id: id });
    if (error) throw error;
  }
};

// Notifications for Customers
export const customerNotificationService = {
  async getMyNotifications(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getUnreadCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false);
    
    if (error) throw error;
    return count || 0;
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

// Service Requests for Customers
export const customerServiceRequestService = {
  async getMyServiceRequests(userId: string): Promise<ServiceRequest[]> {
    const { data, error } = await supabase
      .from('service_requests')
      .select(`
        *,
        assigned_user:users!service_requests_assigned_to_fkey(name, email),
        account:accounts!service_requests_account_id_fkey(name)
      `)
      .eq('requested_by', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createServiceRequest(request: Omit<ServiceRequest, 'id' | 'created_at' | 'updated_at'>): Promise<ServiceRequest> {
    const { data, error } = await supabase
      .from('service_requests')
      .insert([request])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getServiceRequestById(id: string): Promise<ServiceRequest | null> {
    const { data, error } = await supabase
      .from('service_requests')
      .select(`
        *,
        requested_user:users!service_requests_requested_by_fkey(name, email),
        assigned_user:users!service_requests_assigned_to_fkey(name, email),
        account:accounts!service_requests_account_id_fkey(name)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Assets for Customers
export const customerAssetService = {
  async getMyAssets(userId: string): Promise<Asset[]> {
    const { data, error } = await supabase
      .from('assets')
      .select(`
        *,
        account:accounts!assets_account_id_fkey(name, account_type)
      `)
      .eq('assigned_to', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getAssetById(id: string): Promise<Asset | null> {
    const { data, error } = await supabase
      .from('assets')
      .select(`
        *,
        assigned_user:users!assets_assigned_to_fkey(name, email),
        account:accounts!assets_account_id_fkey(name, account_type)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Customer Dashboard Analytics
export const customerAnalyticsService = {
  async getMyDashboardStats(userId: string) {
    const [
      ticketsResult,
      openTicketsResult,
      inProgressTicketsResult,
      resolvedTicketsResult,
      serviceRequestsResult,
      assetsResult,
      notificationsResult
    ] = await Promise.all([
      supabase.from('tickets').select('id', { count: 'exact' }).eq('created_by', userId),
      supabase.from('tickets').select('id', { count: 'exact' }).eq('created_by', userId).eq('status', 'Open'),
      supabase.from('tickets').select('id', { count: 'exact' }).eq('created_by', userId).eq('status', 'In Progress'),
      supabase.from('tickets').select('id', { count: 'exact' }).eq('created_by', userId).eq('status', 'Resolved'),
      supabase.from('service_requests').select('id', { count: 'exact' }).eq('requested_by', userId),
      supabase.from('assets').select('id', { count: 'exact' }).eq('assigned_to', userId),
      supabase.from('notifications').select('id', { count: 'exact' }).eq('user_id', userId).eq('read', false)
    ]);

    return {
      totalTickets: ticketsResult.count || 0,
      openTickets: openTicketsResult.count || 0,
      inProgressTickets: inProgressTicketsResult.count || 0,
      resolvedTickets: resolvedTicketsResult.count || 0,
      totalServiceRequests: serviceRequestsResult.count || 0,
      totalAssets: assetsResult.count || 0,
      unreadNotifications: notificationsResult.count || 0
    };
  },

  async getMyRecentActivity(userId: string) {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        id,
        title,
        status,
        priority,
        created_at
      `)
      .eq('created_by', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    return data || [];
  }
};
