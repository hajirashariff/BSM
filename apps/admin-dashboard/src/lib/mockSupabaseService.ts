// Mock Supabase Service for BSM Platform
import { 
  mockUsers, 
  mockAccounts, 
  mockAssets, 
  mockTickets, 
  mockWorkflows, 
  mockKnowledgeBase, 
  mockNotifications, 
  mockServiceRequests, 
  mockIntegrations, 
  mockRules,
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

  async createUser(userData: any) {
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      ...userData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockUsers.push(newUser);
    return { data: newUser, error: null };
  }

  async updateUser(id: string, updates: any) {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return { data: null, error: new Error('User not found') };
    }
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates, updated_at: new Date().toISOString() };
    return { data: mockUsers[userIndex], error: null };
  }

  async deleteUser(id: string) {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return { data: null, error: new Error('User not found') };
    }
    const deletedUser = mockUsers.splice(userIndex, 1)[0];
    return { data: deletedUser, error: null };
  }

  // Accounts
  async getAccounts() {
    return { data: mockAccounts, error: null };
  }

  async getAccount(id: string) {
    const account = mockAccounts.find(a => a.id === id);
    return { data: account || null, error: account ? null : new Error('Account not found') };
  }

  async createAccount(accountData: any) {
    const newAccount = {
      id: (mockAccounts.length + 1).toString(),
      ...accountData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockAccounts.push(newAccount);
    return { data: newAccount, error: null };
  }

  async updateAccount(id: string, updates: any) {
    const accountIndex = mockAccounts.findIndex(a => a.id === id);
    if (accountIndex === -1) {
      return { data: null, error: new Error('Account not found') };
    }
    mockAccounts[accountIndex] = { ...mockAccounts[accountIndex], ...updates, updated_at: new Date().toISOString() };
    return { data: mockAccounts[accountIndex], error: null };
  }

  async deleteAccount(id: string) {
    const accountIndex = mockAccounts.findIndex(a => a.id === id);
    if (accountIndex === -1) {
      return { data: null, error: new Error('Account not found') };
    }
    const deletedAccount = mockAccounts.splice(accountIndex, 1)[0];
    return { data: deletedAccount, error: null };
  }

  // Assets
  async getAssets() {
    return { data: mockAssets, error: null };
  }

  async getAsset(id: string) {
    const asset = mockAssets.find(a => a.id === id);
    return { data: asset || null, error: asset ? null : new Error('Asset not found') };
  }

  async createAsset(assetData: any) {
    const newAsset = {
      id: (mockAssets.length + 1).toString(),
      ...assetData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockAssets.push(newAsset);
    return { data: newAsset, error: null };
  }

  async updateAsset(id: string, updates: any) {
    const assetIndex = mockAssets.findIndex(a => a.id === id);
    if (assetIndex === -1) {
      return { data: null, error: new Error('Asset not found') };
    }
    mockAssets[assetIndex] = { ...mockAssets[assetIndex], ...updates, updated_at: new Date().toISOString() };
    return { data: mockAssets[assetIndex], error: null };
  }

  async deleteAsset(id: string) {
    const assetIndex = mockAssets.findIndex(a => a.id === id);
    if (assetIndex === -1) {
      return { data: null, error: new Error('Asset not found') };
    }
    const deletedAsset = mockAssets.splice(assetIndex, 1)[0];
    return { data: deletedAsset, error: null };
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

  async deleteTicket(id: string) {
    const ticketIndex = mockTickets.findIndex(t => t.id === id);
    if (ticketIndex === -1) {
      return { data: null, error: new Error('Ticket not found') };
    }
    const deletedTicket = mockTickets.splice(ticketIndex, 1)[0];
    return { data: deletedTicket, error: null };
  }

  // Workflows
  async getWorkflows() {
    return { data: mockWorkflows, error: null };
  }

  async getWorkflow(id: string) {
    const workflow = mockWorkflows.find(w => w.id === id);
    return { data: workflow || null, error: workflow ? null : new Error('Workflow not found') };
  }

  async createWorkflow(workflowData: any) {
    const newWorkflow = {
      id: (mockWorkflows.length + 1).toString(),
      ...workflowData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockWorkflows.push(newWorkflow);
    return { data: newWorkflow, error: null };
  }

  async updateWorkflow(id: string, updates: any) {
    const workflowIndex = mockWorkflows.findIndex(w => w.id === id);
    if (workflowIndex === -1) {
      return { data: null, error: new Error('Workflow not found') };
    }
    mockWorkflows[workflowIndex] = { ...mockWorkflows[workflowIndex], ...updates, updated_at: new Date().toISOString() };
    return { data: mockWorkflows[workflowIndex], error: null };
  }

  async deleteWorkflow(id: string) {
    const workflowIndex = mockWorkflows.findIndex(w => w.id === id);
    if (workflowIndex === -1) {
      return { data: null, error: new Error('Workflow not found') };
    }
    const deletedWorkflow = mockWorkflows.splice(workflowIndex, 1)[0];
    return { data: deletedWorkflow, error: null };
  }

  // Knowledge Base
  async getKnowledgeBase() {
    return { data: mockKnowledgeBase, error: null };
  }

  async getKnowledgeBaseArticle(id: string) {
    const article = mockKnowledgeBase.find(kb => kb.id === id);
    return { data: article || null, error: article ? null : new Error('Article not found') };
  }

  async createKnowledgeBaseArticle(articleData: any) {
    const newArticle = {
      id: (mockKnowledgeBase.length + 1).toString(),
      ...articleData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockKnowledgeBase.push(newArticle);
    return { data: newArticle, error: null };
  }

  async updateKnowledgeBaseArticle(id: string, updates: any) {
    const articleIndex = mockKnowledgeBase.findIndex(kb => kb.id === id);
    if (articleIndex === -1) {
      return { data: null, error: new Error('Article not found') };
    }
    mockKnowledgeBase[articleIndex] = { ...mockKnowledgeBase[articleIndex], ...updates, updated_at: new Date().toISOString() };
    return { data: mockKnowledgeBase[articleIndex], error: null };
  }

  async deleteKnowledgeBaseArticle(id: string) {
    const articleIndex = mockKnowledgeBase.findIndex(kb => kb.id === id);
    if (articleIndex === -1) {
      return { data: null, error: new Error('Article not found') };
    }
    const deletedArticle = mockKnowledgeBase.splice(articleIndex, 1)[0];
    return { data: deletedArticle, error: null };
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

  async createNotification(notificationData: any) {
    const newNotification = {
      id: (mockNotifications.length + 1).toString(),
      ...notificationData,
      created_at: new Date().toISOString()
    };
    mockNotifications.push(newNotification);
    return { data: newNotification, error: null };
  }

  async updateNotification(id: string, updates: any) {
    const notificationIndex = mockNotifications.findIndex(n => n.id === id);
    if (notificationIndex === -1) {
      return { data: null, error: new Error('Notification not found') };
    }
    mockNotifications[notificationIndex] = { ...mockNotifications[notificationIndex], ...updates };
    return { data: mockNotifications[notificationIndex], error: null };
  }

  async deleteNotification(id: string) {
    const notificationIndex = mockNotifications.findIndex(n => n.id === id);
    if (notificationIndex === -1) {
      return { data: null, error: new Error('Notification not found') };
    }
    const deletedNotification = mockNotifications.splice(notificationIndex, 1)[0];
    return { data: deletedNotification, error: null };
  }

  // Service Requests
  async getServiceRequests() {
    return { data: mockServiceRequests, error: null };
  }

  async getServiceRequest(id: string) {
    const serviceRequest = mockServiceRequests.find(sr => sr.id === id);
    return { data: serviceRequest || null, error: serviceRequest ? null : new Error('Service request not found') };
  }

  async createServiceRequest(serviceRequestData: any) {
    const newServiceRequest = {
      id: (mockServiceRequests.length + 1).toString(),
      ...serviceRequestData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockServiceRequests.push(newServiceRequest);
    return { data: newServiceRequest, error: null };
  }

  async updateServiceRequest(id: string, updates: any) {
    const serviceRequestIndex = mockServiceRequests.findIndex(sr => sr.id === id);
    if (serviceRequestIndex === -1) {
      return { data: null, error: new Error('Service request not found') };
    }
    mockServiceRequests[serviceRequestIndex] = { ...mockServiceRequests[serviceRequestIndex], ...updates, updated_at: new Date().toISOString() };
    return { data: mockServiceRequests[serviceRequestIndex], error: null };
  }

  async deleteServiceRequest(id: string) {
    const serviceRequestIndex = mockServiceRequests.findIndex(sr => sr.id === id);
    if (serviceRequestIndex === -1) {
      return { data: null, error: new Error('Service request not found') };
    }
    const deletedServiceRequest = mockServiceRequests.splice(serviceRequestIndex, 1)[0];
    return { data: deletedServiceRequest, error: null };
  }

  // Integrations
  async getIntegrations() {
    return { data: mockIntegrations, error: null };
  }

  async getIntegration(id: string) {
    const integration = mockIntegrations.find(i => i.id === id);
    return { data: integration || null, error: integration ? null : new Error('Integration not found') };
  }

  async createIntegration(integrationData: any) {
    const newIntegration = {
      id: (mockIntegrations.length + 1).toString(),
      ...integrationData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockIntegrations.push(newIntegration);
    return { data: newIntegration, error: null };
  }

  async updateIntegration(id: string, updates: any) {
    const integrationIndex = mockIntegrations.findIndex(i => i.id === id);
    if (integrationIndex === -1) {
      return { data: null, error: new Error('Integration not found') };
    }
    mockIntegrations[integrationIndex] = { ...mockIntegrations[integrationIndex], ...updates, updated_at: new Date().toISOString() };
    return { data: mockIntegrations[integrationIndex], error: null };
  }

  async deleteIntegration(id: string) {
    const integrationIndex = mockIntegrations.findIndex(i => i.id === id);
    if (integrationIndex === -1) {
      return { data: null, error: new Error('Integration not found') };
    }
    const deletedIntegration = mockIntegrations.splice(integrationIndex, 1)[0];
    return { data: deletedIntegration, error: null };
  }

  // Rules
  async getRules() {
    return { data: mockRules, error: null };
  }

  async getRule(id: string) {
    const rule = mockRules.find(r => r.id === id);
    return { data: rule || null, error: rule ? null : new Error('Rule not found') };
  }

  async createRule(ruleData: any) {
    const newRule = {
      id: (mockRules.length + 1).toString(),
      ...ruleData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockRules.push(newRule);
    return { data: newRule, error: null };
  }

  async updateRule(id: string, updates: any) {
    const ruleIndex = mockRules.findIndex(r => r.id === id);
    if (ruleIndex === -1) {
      return { data: null, error: new Error('Rule not found') };
    }
    mockRules[ruleIndex] = { ...mockRules[ruleIndex], ...updates, updated_at: new Date().toISOString() };
    return { data: mockRules[ruleIndex], error: null };
  }

  async deleteRule(id: string) {
    const ruleIndex = mockRules.findIndex(r => r.id === id);
    if (ruleIndex === -1) {
      return { data: null, error: new Error('Rule not found') };
    }
    const deletedRule = mockRules.splice(ruleIndex, 1)[0];
    return { data: deletedRule, error: null };
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
    return { data: { user: mockUsers[0] }, error: null };
  }
}

// Export singleton instance
export const mockSupabaseService = new MockSupabaseService();

