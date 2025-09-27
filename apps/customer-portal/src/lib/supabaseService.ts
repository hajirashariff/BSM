import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fcdfwqengcmtsatrkwin.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZGZ3cWVuZ2NtdHNhdHJrd2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3MTI1MjAsImV4cCI6MjA3MzI4ODUyMH0.e0VLoxpCLdXzPX0ihTcJiXPmnf3mn9o1Go1hKYvXENE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =====================================================
// TYPES AND INTERFACES
// =====================================================

export interface UserProfile {
  id: string;
  user_id: string;
  avatar?: string;
  phone?: string;
  location?: string;
  bio?: string;
  website?: string;
  auth_method: 'google' | 'email';
  role: 'admin' | 'agent' | 'customer' | 'viewer';
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  category: 'technical' | 'billing' | 'general' | 'feature_request' | 'bug_report';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  created_by: string;
  customer_email?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  tags?: string[];
  attachments?: any[];
  metadata?: any;
}

export interface TicketComment {
  id: string;
  ticket_id: string;
  author_id: string;
  content: string;
  is_internal: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  status: 'operational' | 'minor_issues' | 'major_issues' | 'maintenance' | 'outage';
  health_score: number;
  category: string;
  features: string[];
  last_updated: string;
  is_active: boolean;
  metadata: any;
}

export interface Rating {
  id: string;
  ticket_id?: string;
  user_id: string;
  rating: number;
  comment?: string;
  category: 'support' | 'response_time' | 'resolution' | 'overall';
  created_at: string;
  metadata: any;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'ticket_created' | 'ticket_updated' | 'ticket_resolved' | 'service_incident' | 'system_maintenance' | 'rating_received' | 'workflow_completed' | 'rule_triggered';
  title: string;
  message: string;
  is_read: boolean;
  data: any;
  created_at: string;
  metadata: any;
}

export interface DashboardMetrics {
  today_tickets: number;
  resolved: number;
  satisfaction_score: number;
  active_tickets: number;
  accounts: number;
  assets: number;
}

// =====================================================
// USER PROFILE SERVICES
// =====================================================

export const userProfileService = {
  // Get current user profile
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  },

  // Create or update user profile
  async upsertUserProfile(profileData: Partial<UserProfile>): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting user profile:', error);
      return null;
    }

    return data;
  },

  // Update user profile
  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      return null;
    }

    return data;
  }
};

// =====================================================
// TICKET SERVICES
// =====================================================

export const ticketService = {
  // Get all tickets for current user
  async getAllTickets(): Promise<Ticket[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('created_by', user.id)
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
          channel: 'Portal', // Add required channel field
          customer_email: 'customer@example.com', // Default email
          created_by: 'demo-user-id',
          sla_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating ticket:', error);
        throw new Error(`Failed to create ticket: ${error.message}`);
      }

      console.log('Ticket created successfully:', data);
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
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase.rpc('get_user_ticket_stats', {
      user_uuid: user.id
    });

    if (error) {
      console.error('Error fetching ticket stats:', error);
      return null;
    }

    return data;
  },

  // Get pending tickets for approval (admin only)
  async getPendingTickets(): Promise<Ticket[]> {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pending tickets:', error);
      return [];
    }

    return data || [];
  },

  // Approve ticket
  async approveTicket(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('tickets')
      .update({
        status: 'open',
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Error approving ticket:', error);
      return false;
    }

    return true;
  },

  // Reject ticket
  async rejectTicket(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('tickets')
      .update({
        status: 'closed',
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Error rejecting ticket:', error);
      return false;
    }

    return true;
  }
};

// =====================================================
// TICKET COMMENT SERVICES
// =====================================================

export const ticketCommentService = {
  // Get comments for a ticket
  async getTicketComments(ticketId: string): Promise<TicketComment[]> {
    const { data, error } = await supabase
      .from('ticket_comments')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching ticket comments:', error);
      return [];
    }

    return data || [];
  },

  // Add comment to ticket
  async addComment(ticketId: string, content: string, isInternal: boolean = false): Promise<TicketComment | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('ticket_comments')
      .insert({
        ticket_id: ticketId,
        author_id: user.id,
        content,
        is_internal: isInternal,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding comment:', error);
      return null;
    }

    return data;
  }
};

// =====================================================
// SERVICE SERVICES
// =====================================================

export const serviceService = {
  // Get all active services (alias for getAllServices)
  async getServices(): Promise<Service[]> {
    return this.getAllServices();
  },

  // Get all active services
  async getAllServices(): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }

    return data || [];
  },

  // Get service status overview
  async getServiceStatusOverview(): Promise<any> {
    const { data, error } = await supabase.rpc('get_service_status_overview');

    if (error) {
      console.error('Error fetching service status overview:', error);
      return null;
    }

    return data;
  },

  // Get service by ID
  async getServiceById(id: string): Promise<Service | null> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching service:', error);
      return null;
    }

    return data;
  }
};

// =====================================================
// RATING SERVICES
// =====================================================

export const ratingService = {
  // Get all ratings for current user
  async getAllRatings(): Promise<Rating[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('ratings')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching ratings:', error);
      return [];
    }

    return data || [];
  },

  // Create rating
  async createRating(ratingData: Omit<Rating, 'id' | 'created_at'>): Promise<Rating | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('ratings')
      .insert({
        ...ratingData,
        user_id: user.id,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating rating:', error);
      return null;
    }

    return data;
  },

  // Get rating statistics
  async getRatingStats(): Promise<any> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('ratings')
      .select('rating')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching rating stats:', error);
      return null;
    }

    const ratings = data || [];
    const totalRatings = ratings.length;
    const averageRating = totalRatings > 0 ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings : 0;

    return {
      total_ratings: totalRatings,
      average_rating: Math.round(averageRating * 10) / 10,
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
// NOTIFICATION SERVICES
// =====================================================

export const notificationService = {
  // Get all notifications for current user
  async getAllNotifications(): Promise<Notification[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }

    return data || [];
  },

  // Get unread notifications count
  async getUnreadCount(): Promise<number> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    if (error) {
      console.error('Error fetching unread count:', error);
      return 0;
    }

    return count || 0;
  },

  // Mark notification as read
  async markAsRead(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);

    if (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }

    return true;
  },

  // Mark all notifications as read
  async markAllAsRead(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    if (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }

    return true;
  },

  // Create notification
  async createNotification(notificationData: Omit<Notification, 'id' | 'created_at'>): Promise<Notification | null> {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        ...notificationData,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      return null;
    }

    return data;
  }
};

// =====================================================
// DASHBOARD SERVICES
// =====================================================

export const dashboardService = {
  // Get dashboard metrics
  async getDashboardMetrics(): Promise<DashboardMetrics | null> {
    const { data, error } = await supabase.rpc('get_dashboard_metrics');

    if (error) {
      console.error('Error fetching dashboard metrics:', error);
      return null;
    }

    return data;
  },

  // Get recent tickets
  async getRecentTickets(limit: number = 5): Promise<Ticket[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('created_by', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent tickets:', error);
      return [];
    }

    return data || [];
  },

  // Get recent ratings
  async getRecentRatings(limit: number = 5): Promise<Rating[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('ratings')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent ratings:', error);
      return [];
    }

    return data || [];
  }
};

// =====================================================
// REAL-TIME SUBSCRIPTIONS
// =====================================================

export const realtimeService = {
  // Subscribe to ticket changes
  subscribeToTickets(callback: (payload: any) => void) {
    return supabase
      .channel('tickets')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tickets' }, 
        callback
      )
      .subscribe();
  },

  // Subscribe to notification changes
  subscribeToNotifications(callback: (payload: any) => void) {
    const { data: { user } } = supabase.auth.getUser();
    if (!user) return null;

    return supabase
      .channel('notifications')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        }, 
        callback
      )
      .subscribe();
  },

  // Subscribe to service changes
  subscribeToServices(callback: (payload: any) => void) {
    return supabase
      .channel('services')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'services' }, 
        callback
      )
      .subscribe();
  }
};

// =====================================================
// AUTHENTICATION SERVICES
// =====================================================

export const authService = {
  // Sign in with email
  async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  // Sign up with email
  async signUpWithEmail(email: string, password: string, userData?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  // Sign in with Google
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    return { data, error };
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Listen to auth changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// =====================================================
// KNOWLEDGE BASE SERVICES
// =====================================================

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  author_id: string;
  views: number;
  helpful_votes: number;
  created_at: string;
  updated_at: string;
  featured: boolean;
  search_vector?: any;
}

export const knowledgeService = {
  // Get all published articles
  async getArticles(): Promise<KnowledgeArticle[]> {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      return [];
    }

    return data || [];
  },

  // Get featured articles
  async getFeaturedArticles(): Promise<KnowledgeArticle[]> {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('views', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching featured articles:', error);
      return [];
    }

    return data || [];
  },

  // Search articles
  async searchArticles(query: string): Promise<KnowledgeArticle[]> {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .eq('status', 'published')
      .textSearch('search_vector', query)
      .order('views', { ascending: false });

    if (error) {
      console.error('Error searching articles:', error);
      return [];
    }

    return data || [];
  },

  // Get article by ID
  async getArticleById(id: string): Promise<KnowledgeArticle | null> {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching article:', error);
      return null;
    }

    return data;
  },

  // Increment article views
  async incrementViews(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_article_views', { article_id: id });
    if (error) {
      console.error('Error incrementing views:', error);
    }
  },

  // Vote on article helpfulness
  async voteHelpful(id: string, helpful: boolean): Promise<void> {
    const { error } = await supabase.rpc('vote_article_helpful', { 
      article_id: id, 
      helpful 
    });
    if (error) {
      console.error('Error voting on article:', error);
    }
  },

  // Get categories
  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('category')
      .eq('status', 'published')
      .not('category', 'is', null);

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    const categories = [...new Set(data.map(item => item.category))];
    return categories;
  }
};

export default supabase;
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
    if (isDemo) {
      const { data, error } = await service.getDashboardAnalytics();
      if (error) throw error;
      return data;
    }
    
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
