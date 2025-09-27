import { createClient } from '@supabase/supabase-js';

// Real Supabase project for BSM Platform
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fcdfwqengcmtsatrkwin.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZGZ3cWVuZ2NtdHNhdHJrd2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3MTI1MjAsImV4cCI6MjA3MzI4ODUyMH0.e0VLoxpCLdXzPX0ihTcJiXPmnf3mn9o1Go1hKYvXENE';

// Check if we're using real Supabase
const isRealSupabase = supabaseUrl === 'https://fcdfwqengcmtsatrkwin.supabase.co';

if (isRealSupabase) {
  console.log('🚀 Connected to real Supabase project for BSM Platform');
} else {
  console.log('⚠️ Using fallback Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for BSM Platform
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'Customer' | 'Admin';
          avatar_url?: string;
          phone?: string;
          department?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role?: 'Customer' | 'Admin';
          avatar_url?: string;
          phone?: string;
          department?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: 'Customer' | 'Admin';
          avatar_url?: string;
          phone?: string;
          department?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      accounts: {
        Row: {
          id: string;
          name: string;
          account_type: 'Enterprise' | 'SMB' | 'Startup' | 'Individual';
          status: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
          industry?: string;
          size?: string;
          address?: string;
          phone?: string;
          email?: string;
          website?: string;
          description?: string;
          created_by?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          account_type: 'Enterprise' | 'SMB' | 'Startup' | 'Individual';
          status?: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
          industry?: string;
          size?: string;
          address?: string;
          phone?: string;
          email?: string;
          website?: string;
          description?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          account_type?: 'Enterprise' | 'SMB' | 'Startup' | 'Individual';
          status?: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
          industry?: string;
          size?: string;
          address?: string;
          phone?: string;
          email?: string;
          website?: string;
          description?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      assets: {
        Row: {
          id: string;
          name: string;
          type: 'Hardware' | 'Software' | 'Service' | 'License' | 'Document';
          category?: string;
          status: 'Active' | 'Inactive' | 'Maintenance' | 'Retired';
          value?: number;
          location?: string;
          assigned_to?: string;
          account_id?: string;
          purchase_date?: string;
          warranty_expiry?: string;
          description?: string;
          serial_number?: string;
          vendor?: string;
          created_by?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: 'Hardware' | 'Software' | 'Service' | 'License' | 'Document';
          category?: string;
          status?: 'Active' | 'Inactive' | 'Maintenance' | 'Retired';
          value?: number;
          location?: string;
          assigned_to?: string;
          account_id?: string;
          purchase_date?: string;
          warranty_expiry?: string;
          description?: string;
          serial_number?: string;
          vendor?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: 'Hardware' | 'Software' | 'Service' | 'License' | 'Document';
          category?: string;
          status?: 'Active' | 'Inactive' | 'Maintenance' | 'Retired';
          value?: number;
          location?: string;
          assigned_to?: string;
          account_id?: string;
          purchase_date?: string;
          warranty_expiry?: string;
          description?: string;
          serial_number?: string;
          vendor?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      tickets: {
        Row: {
          id: string;
          title: string;
          description?: string;
          status: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Cancelled';
          priority: 'Low' | 'Medium' | 'High' | 'Critical';
          category?: string;
          subcategory?: string;
          assigned_to?: string;
          created_by?: string;
          account_id?: string;
          asset_id?: string;
          due_date?: string;
          resolution?: string;
          tags?: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string;
          status?: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Cancelled';
          priority?: 'Low' | 'Medium' | 'High' | 'Critical';
          category?: string;
          subcategory?: string;
          assigned_to?: string;
          created_by?: string;
          account_id?: string;
          asset_id?: string;
          due_date?: string;
          resolution?: string;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          status?: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Cancelled';
          priority?: 'Low' | 'Medium' | 'High' | 'Critical';
          category?: string;
          subcategory?: string;
          assigned_to?: string;
          created_by?: string;
          account_id?: string;
          asset_id?: string;
          due_date?: string;
          resolution?: string;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      workflows: {
        Row: {
          id: string;
          name: string;
          description?: string;
          status: 'Draft' | 'Active' | 'Inactive' | 'Archived';
          category?: string;
          trigger_type?: string;
          conditions?: any;
          actions?: any;
          execution_count: number;
          success_rate: number;
          last_executed?: string;
          created_by?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string;
          status?: 'Draft' | 'Active' | 'Inactive' | 'Archived';
          category?: string;
          trigger_type?: string;
          conditions?: any;
          actions?: any;
          execution_count?: number;
          success_rate?: number;
          last_executed?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          status?: 'Draft' | 'Active' | 'Inactive' | 'Archived';
          category?: string;
          trigger_type?: string;
          conditions?: any;
          actions?: any;
          execution_count?: number;
          success_rate?: number;
          last_executed?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      knowledge_base: {
        Row: {
          id: string;
          title: string;
          content: string;
          category?: string;
          tags?: string[];
          status: 'Draft' | 'Published' | 'Archived';
          views: number;
          helpful_votes: number;
          not_helpful_votes: number;
          featured: boolean;
          author_id?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          category?: string;
          tags?: string[];
          status?: 'Draft' | 'Published' | 'Archived';
          views?: number;
          helpful_votes?: number;
          not_helpful_votes?: number;
          featured?: boolean;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          category?: string;
          tags?: string[];
          status?: 'Draft' | 'Published' | 'Archived';
          views?: number;
          helpful_votes?: number;
          not_helpful_votes?: number;
          featured?: boolean;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id?: string;
          title: string;
          message?: string;
          type: 'Info' | 'Warning' | 'Error' | 'Success';
          read: boolean;
          action_url?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          title: string;
          message?: string;
          type: 'Info' | 'Warning' | 'Error' | 'Success';
          read?: boolean;
          action_url?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: 'Info' | 'Warning' | 'Error' | 'Success';
          read?: boolean;
          action_url?: string;
          created_at?: string;
        };
      };
      service_requests: {
        Row: {
          id: string;
          title: string;
          description?: string;
          service_type?: string;
          status: 'Pending' | 'Approved' | 'Rejected' | 'In Progress' | 'Completed';
          priority: 'Low' | 'Medium' | 'High' | 'Critical';
          requested_by?: string;
          assigned_to?: string;
          account_id?: string;
          due_date?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string;
          service_type?: string;
          status?: 'Pending' | 'Approved' | 'Rejected' | 'In Progress' | 'Completed';
          priority?: 'Low' | 'Medium' | 'High' | 'Critical';
          requested_by?: string;
          assigned_to?: string;
          account_id?: string;
          due_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          service_type?: string;
          status?: 'Pending' | 'Approved' | 'Rejected' | 'In Progress' | 'Completed';
          priority?: 'Low' | 'Medium' | 'High' | 'Critical';
          requested_by?: string;
          assigned_to?: string;
          account_id?: string;
          due_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      integrations: {
        Row: {
          id: string;
          name: string;
          type: string;
          status: 'Active' | 'Inactive' | 'Error' | 'Pending';
          configuration?: any;
          last_sync?: string;
          sync_status?: string;
          created_by?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          status?: 'Active' | 'Inactive' | 'Error' | 'Pending';
          configuration?: any;
          last_sync?: string;
          sync_status?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          status?: 'Active' | 'Inactive' | 'Error' | 'Pending';
          configuration?: any;
          last_sync?: string;
          sync_status?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      rules: {
        Row: {
          id: string;
          name: string;
          description?: string;
          category?: string;
          status: 'Draft' | 'Active' | 'Inactive';
          priority: number;
          conditions: any;
          actions: any;
          execution_count: number;
          success_rate: number;
          last_executed?: string;
          created_by?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string;
          category?: string;
          status?: 'Draft' | 'Active' | 'Inactive';
          priority?: number;
          conditions: any;
          actions: any;
          execution_count?: number;
          success_rate?: number;
          last_executed?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          category?: string;
          status?: 'Draft' | 'Active' | 'Inactive';
          priority?: number;
          conditions?: any;
          actions?: any;
          execution_count?: number;
          success_rate?: number;
          last_executed?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Export types for all tables
export type User = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

export type Account = Database['public']['Tables']['accounts']['Row'];
export type AccountInsert = Database['public']['Tables']['accounts']['Insert'];
export type AccountUpdate = Database['public']['Tables']['accounts']['Update'];

export type Asset = Database['public']['Tables']['assets']['Row'];
export type AssetInsert = Database['public']['Tables']['assets']['Insert'];
export type AssetUpdate = Database['public']['Tables']['assets']['Update'];

export type Ticket = Database['public']['Tables']['tickets']['Row'];
export type TicketInsert = Database['public']['Tables']['tickets']['Insert'];
export type TicketUpdate = Database['public']['Tables']['tickets']['Update'];

export type Workflow = Database['public']['Tables']['workflows']['Row'];
export type WorkflowInsert = Database['public']['Tables']['workflows']['Insert'];
export type WorkflowUpdate = Database['public']['Tables']['workflows']['Update'];

export type KnowledgeBase = Database['public']['Tables']['knowledge_base']['Row'];
export type KnowledgeBaseInsert = Database['public']['Tables']['knowledge_base']['Insert'];
export type KnowledgeBaseUpdate = Database['public']['Tables']['knowledge_base']['Update'];

export type Notification = Database['public']['Tables']['notifications']['Row'];
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert'];
export type NotificationUpdate = Database['public']['Tables']['notifications']['Update'];

export type ServiceRequest = Database['public']['Tables']['service_requests']['Row'];
export type ServiceRequestInsert = Database['public']['Tables']['service_requests']['Insert'];
export type ServiceRequestUpdate = Database['public']['Tables']['service_requests']['Update'];

export type Integration = Database['public']['Tables']['integrations']['Row'];
export type IntegrationInsert = Database['public']['Tables']['integrations']['Insert'];
export type IntegrationUpdate = Database['public']['Tables']['integrations']['Update'];

export type Rule = Database['public']['Tables']['rules']['Row'];
export type RuleInsert = Database['public']['Tables']['rules']['Insert'];
export type RuleUpdate = Database['public']['Tables']['rules']['Update'];
