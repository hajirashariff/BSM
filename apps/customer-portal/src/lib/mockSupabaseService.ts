// Mock Supabase Service for BSM Platform Customer Portal
import { 
  mockUsers, 
  mockAccounts, 
  mockAssets, 
  mockTickets, 
  mockKnowledgeBase, 
  mockNotifications,
  dashboardAnalytics 
} from './mockData';

// Mock Supabase client that returns our mock data
export class MockSupabaseService {
  // Users
  async getUsers() {
    return { data: mockUsers, error: null };
  }

  async getUser(id: string) {
    const user = mockUsers.find(u => u.id === id);
    return { data: user || null, error: user ? null : new Error('User not found') };
  }

  // Accounts
  async getAccounts() {
    return { data: mockAccounts, error: null };
  }

  async getAccount(id: string) {
    const account = mockAccounts.find(a => a.id === id);
    return { data: account || null, error: account ? null : new Error('Account not found') };
  }

  // Assets
  async getAssets() {
    return { data: mockAssets, error: null };
  }

  async getAsset(id: string) {
    const asset = mockAssets.find(a => a.id === id);
    return { data: asset || null, error: asset ? null : new Error('Asset not found') };
  }

  // Tickets
  async getTickets() {
    return { data: mockTickets, error: null };
  }

  async getTicket(id: string) {
    const ticket = mockTickets.find(t => t.id === id);
    return { data: ticket || null, error: ticket ? null : new Error('Ticket not found') };
  }

  async createTicket(ticketData: any) {
    const newTicket = {
      id: (mockTickets.length + 1).toString(),
      ...ticketData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockTickets.push(newTicket);
    return { data: newTicket, error: null };
  }

  async updateTicket(id: string, updates: any) {
    const ticketIndex = mockTickets.findIndex(t => t.id === id);
    if (ticketIndex === -1) {
      return { data: null, error: new Error('Ticket not found') };
    }
    mockTickets[ticketIndex] = { ...mockTickets[ticketIndex], ...updates, updated_at: new Date().toISOString() };
    return { data: mockTickets[ticketIndex], error: null };
  }

  // Knowledge Base
  async getKnowledgeBase() {
    return { data: mockKnowledgeBase, error: null };
  }

  async getKnowledgeBaseArticle(id: string) {
    const article = mockKnowledgeBase.find(kb => kb.id === id);
    return { data: article || null, error: article ? null : new Error('Article not found') };
  }

  // Notifications
  async getNotifications(userId?: string) {
    const notifications = userId ? mockNotifications.filter(n => n.user_id === userId) : mockNotifications;
    return { data: notifications, error: null };
  }

  async getNotification(id: string) {
    const notification = mockNotifications.find(n => n.id === id);
    return { data: notification || null, error: notification ? null : new Error('Notification not found') };
  }

  async updateNotification(id: string, updates: any) {
    const notificationIndex = mockNotifications.findIndex(n => n.id === id);
    if (notificationIndex === -1) {
      return { data: null, error: new Error('Notification not found') };
    }
    mockNotifications[notificationIndex] = { ...mockNotifications[notificationIndex], ...updates };
    return { data: mockNotifications[notificationIndex], error: null };
  }

  // Dashboard Analytics
  async getDashboardAnalytics() {
    return { data: dashboardAnalytics, error: null };
  }

  // Auth (mock)
  async signIn(email: string, password: string) {
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      return { data: { user, session: { access_token: 'mock-token' } }, error: null };
    }
    return { data: null, error: new Error('Invalid credentials') };
  }

  async signOut() {
    return { error: null };
  }

  async getCurrentUser() {
    return { data: { user: mockUsers[1] }, error: null }; // Return John Doe as current user
  }
}

// Export singleton instance
export const mockSupabaseService = new MockSupabaseService();

