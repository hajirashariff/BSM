// Mock data for BSM Platform Dashboard
import { User, Account, Asset, Ticket, Workflow, KnowledgeBase, Notification, ServiceRequest, Integration, Rule } from './supabase';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@bsm.com',
    role: 'Admin',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    phone: '+1-555-0101',
    department: 'IT Administration',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john.doe@techcorp.com',
    role: 'Customer',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    phone: '+1-555-0102',
    department: 'Engineering',
    created_at: '2024-01-16T09:30:00Z',
    updated_at: '2024-01-16T09:30:00Z'
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane.smith@startupxyz.com',
    role: 'Customer',
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    phone: '+1-555-0103',
    department: 'Product Management',
    created_at: '2024-01-17T14:20:00Z',
    updated_at: '2024-01-17T14:20:00Z'
  },
  {
    id: '4',
    name: 'Mike Johnson',
    email: 'mike.johnson@smbsolutions.com',
    role: 'Customer',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    phone: '+1-555-0104',
    department: 'Operations',
    created_at: '2024-01-18T11:45:00Z',
    updated_at: '2024-01-18T11:45:00Z'
  },
  {
    id: '5',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@bsm.com',
    role: 'Admin',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    phone: '+1-555-0105',
    department: 'Customer Success',
    created_at: '2024-01-19T08:15:00Z',
    updated_at: '2024-01-19T08:15:00Z'
  }
];

// Mock Accounts
export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'TechCorp Inc',
    account_type: 'Enterprise',
    status: 'Active',
    industry: 'Technology',
    size: '500+',
    address: '123 Tech Street, Silicon Valley, CA 94000',
    phone: '+1-555-1000',
    email: 'contact@techcorp.com',
    website: 'https://techcorp.com',
    description: 'Leading technology company specializing in enterprise software solutions.',
    created_by: '1',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'StartupXYZ',
    account_type: 'Startup',
    status: 'Active',
    industry: 'SaaS',
    size: '10-50',
    address: '456 Innovation Ave, Austin, TX 78701',
    phone: '+1-555-2000',
    email: 'hello@startupxyz.com',
    website: 'https://startupxyz.com',
    description: 'Fast-growing SaaS startup focused on productivity tools.',
    created_by: '1',
    created_at: '2024-01-16T09:30:00Z',
    updated_at: '2024-01-16T09:30:00Z'
  },
  {
    id: '3',
    name: 'SMB Solutions',
    account_type: 'SMB',
    status: 'Active',
    industry: 'Consulting',
    size: '50-200',
    address: '789 Business Blvd, Chicago, IL 60601',
    phone: '+1-555-3000',
    email: 'info@smbsolutions.com',
    website: 'https://smbsolutions.com',
    description: 'Business consulting firm helping small and medium businesses grow.',
    created_by: '1',
    created_at: '2024-01-17T14:20:00Z',
    updated_at: '2024-01-17T14:20:00Z'
  }
];

// Mock Assets
export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Dell PowerEdge R750 Server',
    type: 'Hardware',
    category: 'Server',
    status: 'Active',
    value: 15000,
    location: 'Data Center A - Rack 12',
    assigned_to: '2',
    account_id: '1',
    purchase_date: '2024-01-10',
    warranty_expiry: '2027-01-10',
    description: 'High-performance server for production workloads',
    serial_number: 'DL-R750-001234',
    vendor: 'Dell Technologies',
    created_by: '1',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Microsoft Office 365 Business',
    type: 'Software',
    category: 'Productivity Suite',
    status: 'Active',
    value: 1200,
    location: 'Cloud',
    assigned_to: '3',
    account_id: '2',
    purchase_date: '2024-01-12',
    warranty_expiry: '2025-01-12',
    description: 'Complete productivity suite for business operations',
    serial_number: 'MS-O365-789012',
    vendor: 'Microsoft',
    created_by: '1',
    created_at: '2024-01-16T09:30:00Z',
    updated_at: '2024-01-16T09:30:00Z'
  },
  {
    id: '3',
    name: 'Cisco Catalyst 9300 Switch',
    type: 'Hardware',
    category: 'Network Equipment',
    status: 'Active',
    value: 8000,
    location: 'Network Closet - Floor 2',
    assigned_to: '4',
    account_id: '3',
    purchase_date: '2024-01-14',
    warranty_expiry: '2026-01-14',
    description: 'Enterprise-grade network switch for high-speed connectivity',
    serial_number: 'CS-9300-345678',
    vendor: 'Cisco Systems',
    created_by: '1',
    created_at: '2024-01-17T14:20:00Z',
    updated_at: '2024-01-17T14:20:00Z'
  }
];

// Mock Tickets
export const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Server Performance Issue',
    description: 'Server response time has increased significantly over the past week.',
    status: 'In Progress',
    priority: 'High',
    category: 'Performance',
    subcategory: 'Server',
    assigned_to: '1',
    created_by: '2',
    account_id: '1',
    asset_id: '1',
    due_date: '2024-01-25T17:00:00Z',
    resolution: null,
    tags: ['performance', 'server', 'urgent'],
    created_at: '2024-01-20T09:00:00Z',
    updated_at: '2024-01-20T09:00:00Z'
  },
  {
    id: '2',
    title: 'Office 365 License Renewal',
    description: 'Need to renew Office 365 licenses before expiration.',
    status: 'Open',
    priority: 'Medium',
    category: 'License',
    subcategory: 'Software',
    assigned_to: '5',
    created_by: '3',
    account_id: '2',
    asset_id: '2',
    due_date: '2024-01-30T12:00:00Z',
    resolution: null,
    tags: ['license', 'renewal', 'office365'],
    created_at: '2024-01-21T11:30:00Z',
    updated_at: '2024-01-21T11:30:00Z'
  },
  {
    id: '3',
    title: 'Network Connectivity Problem',
    description: 'Intermittent network connectivity issues reported by users.',
    status: 'Resolved',
    priority: 'Critical',
    category: 'Network',
    subcategory: 'Connectivity',
    assigned_to: '1',
    created_by: '4',
    account_id: '3',
    asset_id: '3',
    due_date: '2024-01-22T16:00:00Z',
    resolution: 'Replaced faulty network cable and updated switch firmware.',
    tags: ['network', 'connectivity', 'resolved'],
    created_at: '2024-01-19T14:15:00Z',
    updated_at: '2024-01-22T15:45:00Z'
  }
];

// Mock Workflows
export const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Auto Ticket Assignment',
    description: 'Automatically assigns tickets based on category and priority',
    status: 'Active',
    category: 'Automation',
    trigger_type: 'Ticket Created',
    conditions: { category: 'Performance', priority: 'High' },
    actions: { assign_to: 'admin', notify: true },
    execution_count: 45,
    success_rate: 98.5,
    last_executed: '2024-01-22T10:30:00Z',
    created_by: '1',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-22T10:30:00Z'
  },
  {
    id: '2',
    name: 'License Expiration Alert',
    description: 'Sends alerts when software licenses are approaching expiration',
    status: 'Active',
    category: 'Monitoring',
    trigger_type: 'Scheduled',
    conditions: { days_before_expiry: 30 },
    actions: { send_email: true, create_ticket: true },
    execution_count: 12,
    success_rate: 100,
    last_executed: '2024-01-22T08:00:00Z',
    created_by: '1',
    created_at: '2024-01-16T09:30:00Z',
    updated_at: '2024-01-22T08:00:00Z'
  }
];

// Mock Knowledge Base
export const mockKnowledgeBase: KnowledgeBase[] = [
  {
    id: '1',
    title: 'Welcome to BSM Pro',
    content: 'Welcome to our comprehensive Business Service Management platform. This guide will help you get started with managing your business services, assets, and workflows effectively.',
    category: 'Getting Started',
    tags: ['welcome', 'getting-started', 'overview'],
    status: 'Published',
    views: 156,
    helpful_votes: 23,
    not_helpful_votes: 2,
    featured: true,
    author_id: '1',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    title: 'Account Setup Guide',
    content: 'Learn how to set up your account and configure your preferences. This includes user management, role assignments, and security settings.',
    category: 'Account Management',
    tags: ['account', 'setup', 'configuration'],
    status: 'Published',
    views: 89,
    helpful_votes: 15,
    not_helpful_votes: 1,
    featured: false,
    author_id: '1',
    created_at: '2024-01-16T09:30:00Z',
    updated_at: '2024-01-19T11:20:00Z'
  },
  {
    id: '3',
    title: 'Ticket Management Best Practices',
    content: 'Understanding how to create, manage, and track service tickets effectively. Includes priority guidelines and escalation procedures.',
    category: 'Technical Support',
    tags: ['tickets', 'management', 'best-practices'],
    status: 'Published',
    views: 203,
    helpful_votes: 34,
    not_helpful_votes: 3,
    featured: true,
    author_id: '5',
    created_at: '2024-01-17T14:20:00Z',
    updated_at: '2024-01-21T16:45:00Z'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    user_id: '1',
    title: 'New High Priority Ticket',
    message: 'A new high priority ticket has been assigned to you.',
    type: 'Warning',
    read: false,
    action_url: '/tickets/1',
    created_at: '2024-01-22T10:30:00Z'
  },
  {
    id: '2',
    user_id: '1',
    title: 'License Expiration Alert',
    message: 'Office 365 licenses will expire in 30 days.',
    type: 'Info',
    read: false,
    action_url: '/assets/2',
    created_at: '2024-01-22T08:00:00Z'
  },
  {
    id: '3',
    user_id: '2',
    title: 'Ticket Resolved',
    message: 'Your network connectivity issue has been resolved.',
    type: 'Success',
    read: true,
    action_url: '/tickets/3',
    created_at: '2024-01-22T15:45:00Z'
  }
];

// Mock Service Requests
export const mockServiceRequests: ServiceRequest[] = [
  {
    id: '1',
    title: 'New User Account Request',
    description: 'Request for new user account for new employee John Smith',
    service_type: 'User Management',
    status: 'Approved',
    priority: 'Medium',
    requested_by: '2',
    assigned_to: '1',
    account_id: '1',
    due_date: '2024-01-25T17:00:00Z',
    created_at: '2024-01-20T09:00:00Z',
    updated_at: '2024-01-21T14:30:00Z'
  },
  {
    id: '2',
    title: 'Software Installation Request',
    description: 'Request to install Adobe Creative Suite on development machines',
    service_type: 'Software Installation',
    status: 'In Progress',
    priority: 'Low',
    requested_by: '3',
    assigned_to: '5',
    account_id: '2',
    due_date: '2024-01-28T12:00:00Z',
    created_at: '2024-01-21T11:30:00Z',
    updated_at: '2024-01-22T09:15:00Z'
  }
];

// Mock Integrations
export const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'Slack Integration',
    type: 'Communication',
    status: 'Active',
    configuration: { webhook_url: 'https://hooks.slack.com/...', channel: '#bsm-alerts' },
    last_sync: '2024-01-22T10:30:00Z',
    sync_status: 'Success',
    created_by: '1',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-22T10:30:00Z'
  },
  {
    id: '2',
    name: 'Microsoft Teams',
    type: 'Communication',
    status: 'Active',
    configuration: { app_id: 'ms-teams-app-123', tenant_id: 'tenant-456' },
    last_sync: '2024-01-22T08:00:00Z',
    sync_status: 'Success',
    created_by: '1',
    created_at: '2024-01-16T09:30:00Z',
    updated_at: '2024-01-22T08:00:00Z'
  }
];

// Mock Rules
export const mockRules: Rule[] = [
  {
    id: '1',
    name: 'Critical Ticket Escalation',
    description: 'Automatically escalates critical tickets to senior staff',
    category: 'Escalation',
    status: 'Active',
    priority: 1,
    conditions: { priority: 'Critical', status: 'Open' },
    actions: { escalate_to: 'admin', send_notification: true },
    execution_count: 8,
    success_rate: 100,
    last_executed: '2024-01-22T10:30:00Z',
    created_by: '1',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-22T10:30:00Z'
  },
  {
    id: '2',
    name: 'Asset Maintenance Reminder',
    description: 'Sends reminders for scheduled asset maintenance',
    category: 'Maintenance',
    status: 'Active',
    priority: 2,
    conditions: { maintenance_due: true, days_before: 7 },
    actions: { create_ticket: true, send_email: true },
    execution_count: 15,
    success_rate: 95,
    last_executed: '2024-01-22T08:00:00Z',
    created_by: '1',
    created_at: '2024-01-16T09:30:00Z',
    updated_at: '2024-01-22T08:00:00Z'
  }
];

// Dashboard Analytics Data
export const dashboardAnalytics = {
  totalUsers: mockUsers.length,
  totalAccounts: mockAccounts.length,
  totalAssets: mockAssets.length,
  totalTickets: mockTickets.length,
  activeWorkflows: mockWorkflows.filter(w => w.status === 'Active').length,
  knowledgeBaseArticles: mockKnowledgeBase.length,
  unreadNotifications: mockNotifications.filter(n => !n.read).length,
  
  ticketStats: {
    open: mockTickets.filter(t => t.status === 'Open').length,
    inProgress: mockTickets.filter(t => t.status === 'In Progress').length,
    resolved: mockTickets.filter(t => t.status === 'Resolved').length,
    closed: mockTickets.filter(t => t.status === 'Closed').length
  },
  
  priorityStats: {
    low: mockTickets.filter(t => t.priority === 'Low').length,
    medium: mockTickets.filter(t => t.priority === 'Medium').length,
    high: mockTickets.filter(t => t.priority === 'High').length,
    critical: mockTickets.filter(t => t.priority === 'Critical').length
  },
  
  assetStats: {
    active: mockAssets.filter(a => a.status === 'Active').length,
    maintenance: mockAssets.filter(a => a.status === 'Maintenance').length,
    retired: mockAssets.filter(a => a.status === 'Retired').length
  }
};

