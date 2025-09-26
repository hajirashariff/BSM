// Ticket Service - Full CRUD operations for support tickets
export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'general' | 'feature_request' | 'bug_report';
  assignee?: string;
  createdBy: string;
  createdByEmail?: string;
  createdByAvatar?: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  tags: string[];
  attachments: Attachment[];
  comments: Comment[];
  history: TicketHistory[];
  estimatedTime?: string;
  actualTime?: string;
  satisfaction?: number;
  escalationLevel: number;
  slaStatus: 'on_time' | 'at_risk' | 'breached';
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  authorRole: 'customer' | 'agent' | 'admin';
  createdAt: string;
  isInternal: boolean;
  attachments?: Attachment[];
}

export interface TicketHistory {
  id: string;
  action: string;
  description: string;
  user: string;
  timestamp: string;
  changes?: Record<string, { from: any; to: any }>;
}

export interface TicketFilters {
  status?: string[];
  priority?: string[];
  category?: string[];
  assignee?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  search?: string;
  tags?: string[];
}

export interface CreateTicketData {
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'general' | 'feature_request' | 'bug_report';
  attachments?: File[];
  tags?: string[];
  createdBy?: string;
  createdByEmail?: string;
  createdByAvatar?: string;
}

export interface UpdateTicketData {
  subject?: string;
  description?: string;
  status?: Ticket['status'];
  priority?: Ticket['priority'];
  category?: Ticket['category'];
  assignee?: string;
  dueDate?: string;
  tags?: string[];
}

// Mock data for development
const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    subject: 'Unable to access billing portal',
    description: 'I am unable to log into the billing portal. Getting a 404 error when trying to access the billing section.',
    status: 'open',
    priority: 'high',
    category: 'billing',
    assignee: 'support@company.com',
    createdBy: 'customer@example.com',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    dueDate: '2024-01-17T18:00:00Z',
    tags: ['billing', 'login', 'urgent'],
    attachments: [
      {
        id: 'att-001',
        name: 'error-screenshot.png',
        size: 245760,
        type: 'image/png',
        url: '/attachments/error-screenshot.png',
        uploadedAt: '2024-01-15T10:35:00Z',
        uploadedBy: 'customer@example.com'
      }
    ],
    comments: [
      {
        id: 'cmt-001',
        content: 'I have the same issue. Please help resolve this quickly.',
        author: 'customer@example.com',
        authorRole: 'customer',
        createdAt: '2024-01-15T10:30:00Z',
        isInternal: false
      },
      {
        id: 'cmt-002',
        content: 'Thank you for reporting this. I am investigating the billing portal issue. Will update you shortly.',
        author: 'support@company.com',
        authorRole: 'agent',
        createdAt: '2024-01-15T11:00:00Z',
        isInternal: false
      }
    ],
    history: [
      {
        id: 'hist-001',
        action: 'created',
        description: 'Ticket created by customer',
        user: 'customer@example.com',
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        id: 'hist-002',
        action: 'assigned',
        description: 'Ticket assigned to support team',
        user: 'system',
        timestamp: '2024-01-15T10:31:00Z',
        changes: {
          assignee: { from: null, to: 'support@company.com' }
        }
      }
    ],
    estimatedTime: '2 hours',
    escalationLevel: 0,
    slaStatus: 'on_time'
  },
  {
    id: 'TKT-002',
    subject: 'Feature request: Dark mode for mobile app',
    description: 'It would be great to have a dark mode option in the mobile application. This would help with battery life and reduce eye strain.',
    status: 'in_progress',
    priority: 'medium',
    category: 'feature_request',
    assignee: 'dev@company.com',
    createdBy: 'customer@example.com',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    dueDate: '2024-01-25T18:00:00Z',
    tags: ['mobile', 'ui', 'feature'],
    attachments: [],
    comments: [
      {
        id: 'cmt-003',
        content: 'This is a great suggestion! Our development team is working on this feature.',
        author: 'dev@company.com',
        authorRole: 'agent',
        createdAt: '2024-01-15T09:15:00Z',
        isInternal: false
      }
    ],
    history: [
      {
        id: 'hist-003',
        action: 'created',
        description: 'Feature request submitted',
        user: 'customer@example.com',
        timestamp: '2024-01-14T14:20:00Z'
      },
      {
        id: 'hist-004',
        action: 'status_changed',
        description: 'Status changed to in_progress',
        user: 'dev@company.com',
        timestamp: '2024-01-15T09:15:00Z',
        changes: {
          status: { from: 'open', to: 'in_progress' }
        }
      }
    ],
    estimatedTime: '1 week',
    escalationLevel: 0,
    slaStatus: 'on_time'
  },
  {
    id: 'TKT-003',
    subject: 'Bug: Data not syncing between devices',
    description: 'When I update my profile on the web portal, the changes are not reflected in the mobile app. This is causing confusion.',
    status: 'resolved',
    priority: 'high',
    category: 'bug_report',
    assignee: 'dev@company.com',
    createdBy: 'customer@example.com',
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-15T12:30:00Z',
    dueDate: '2024-01-16T18:00:00Z',
    tags: ['sync', 'bug', 'mobile', 'web'],
    attachments: [
      {
        id: 'att-002',
        name: 'sync-issue-video.mp4',
        size: 2048576,
        type: 'video/mp4',
        url: '/attachments/sync-issue-video.mp4',
        uploadedAt: '2024-01-13T16:50:00Z',
        uploadedBy: 'customer@example.com'
      }
    ],
    comments: [
      {
        id: 'cmt-004',
        content: 'I can reproduce this issue. Working on a fix.',
        author: 'dev@company.com',
        authorRole: 'agent',
        createdAt: '2024-01-14T10:00:00Z',
        isInternal: false
      },
      {
        id: 'cmt-005',
        content: 'Fix has been deployed. Please test and let me know if the issue persists.',
        author: 'dev@company.com',
        authorRole: 'agent',
        createdAt: '2024-01-15T12:30:00Z',
        isInternal: false
      }
    ],
    history: [
      {
        id: 'hist-005',
        action: 'created',
        description: 'Bug report submitted',
        user: 'customer@example.com',
        timestamp: '2024-01-13T16:45:00Z'
      },
      {
        id: 'hist-006',
        action: 'status_changed',
        description: 'Status changed to resolved',
        user: 'dev@company.com',
        timestamp: '2024-01-15T12:30:00Z',
        changes: {
          status: { from: 'in_progress', to: 'resolved' }
        }
      }
    ],
    estimatedTime: '4 hours',
    actualTime: '3.5 hours',
    satisfaction: 5,
    escalationLevel: 0,
    slaStatus: 'on_time'
  }
];

class TicketService {
  private tickets: Ticket[] = [...mockTickets];

  // Get all tickets with optional filtering
  async getTickets(filters?: TicketFilters): Promise<Ticket[]> {
    let filteredTickets = [...this.tickets];

    if (filters) {
      if (filters.status && filters.status.length > 0) {
        filteredTickets = filteredTickets.filter(ticket => 
          filters.status!.includes(ticket.status)
        );
      }

      if (filters.priority && filters.priority.length > 0) {
        filteredTickets = filteredTickets.filter(ticket => 
          filters.priority!.includes(ticket.priority)
        );
      }

      if (filters.category && filters.category.length > 0) {
        filteredTickets = filteredTickets.filter(ticket => 
          filters.category!.includes(ticket.category)
        );
      }

      if (filters.assignee && filters.assignee.length > 0) {
        filteredTickets = filteredTickets.filter(ticket => 
          ticket.assignee && filters.assignee!.includes(ticket.assignee)
        );
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredTickets = filteredTickets.filter(ticket => 
          ticket.subject.toLowerCase().includes(searchTerm) ||
          ticket.description.toLowerCase().includes(searchTerm) ||
          ticket.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }

      if (filters.dateRange) {
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        filteredTickets = filteredTickets.filter(ticket => {
          const ticketDate = new Date(ticket.createdAt);
          return ticketDate >= startDate && ticketDate <= endDate;
        });
      }

      if (filters.tags && filters.tags.length > 0) {
        filteredTickets = filteredTickets.filter(ticket => 
          filters.tags!.some(tag => ticket.tags.includes(tag))
        );
      }
    }

    return filteredTickets.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  // Get single ticket by ID
  async getTicket(id: string): Promise<Ticket | null> {
    return this.tickets.find(ticket => ticket.id === id) || null;
  }

  // Create new ticket
  async createTicket(data: CreateTicketData): Promise<Ticket> {
    const newTicket: Ticket = {
      id: `TKT-${String(this.tickets.length + 1).padStart(3, '0')}`,
      subject: data.subject,
      description: data.description,
      status: 'open',
      priority: data.priority,
      category: data.category,
      createdBy: data.createdBy || 'Unknown User',
      createdByEmail: data.createdByEmail,
      createdByAvatar: data.createdByAvatar,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: this.calculateDueDate(data.priority),
      tags: data.tags || [],
      attachments: data.attachments ? data.attachments.map((file, index) => ({
        id: `att-${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
        uploadedBy: data.createdBy || 'Unknown User'
      })) : [],
      comments: [],
      history: [{
        id: `hist-${Date.now()}`,
        action: 'created',
        description: 'Ticket created',
        user: data.createdBy || 'Unknown User',
        timestamp: new Date().toISOString()
      }],
      escalationLevel: 0,
      slaStatus: 'on_time'
    };

    this.tickets.unshift(newTicket);
    return newTicket;
  }

  // Update ticket
  async updateTicket(id: string, data: UpdateTicketData, updatedBy: string): Promise<Ticket | null> {
    const ticketIndex = this.tickets.findIndex(ticket => ticket.id === id);
    if (ticketIndex === -1) return null;

    const oldTicket = { ...this.tickets[ticketIndex] };
    const changes: Record<string, { from: any; to: any }> = {};

    // Track changes
    Object.keys(data).forEach(key => {
      if (data[key as keyof UpdateTicketData] !== oldTicket[key as keyof Ticket]) {
        changes[key] = {
          from: oldTicket[key as keyof Ticket],
          to: data[key as keyof UpdateTicketData]
        };
      }
    });

    // Update ticket
    this.tickets[ticketIndex] = {
      ...oldTicket,
      ...data,
      updatedAt: new Date().toISOString()
    };

    // Add history entry
    this.tickets[ticketIndex].history.push({
      id: `hist-${Date.now()}`,
      action: 'updated',
      description: 'Ticket updated',
      user: updatedBy,
      timestamp: new Date().toISOString(),
      changes
    });

    return this.tickets[ticketIndex];
  }

  // Add comment to ticket
  async addComment(ticketId: string, content: string, author: string, authorRole: 'customer' | 'agent' | 'admin', isInternal: boolean = false): Promise<Comment | null> {
    const ticketIndex = this.tickets.findIndex(ticket => ticket.id === ticketId);
    if (ticketIndex === -1) return null;

    const comment: Comment = {
      id: `cmt-${Date.now()}`,
      content,
      author,
      authorRole,
      createdAt: new Date().toISOString(),
      isInternal
    };

    this.tickets[ticketIndex].comments.push(comment);
    this.tickets[ticketIndex].updatedAt = new Date().toISOString();

    // Add history entry
    this.tickets[ticketIndex].history.push({
      id: `hist-${Date.now()}`,
      action: 'commented',
      description: isInternal ? 'Internal comment added' : 'Comment added',
      user: author,
      timestamp: new Date().toISOString()
    });

    return comment;
  }

  // Delete ticket
  async deleteTicket(id: string): Promise<boolean> {
    const ticketIndex = this.tickets.findIndex(ticket => ticket.id === id);
    if (ticketIndex === -1) return false;

    this.tickets.splice(ticketIndex, 1);
    return true;
  }

  // Get ticket statistics
  async getTicketStats(): Promise<{
    total: number;
    open: number;
    inProgress: number;
    resolved: number;
    closed: number;
    overdue: number;
  }> {
    const now = new Date();
    const overdue = this.tickets.filter(ticket => 
      ticket.dueDate && new Date(ticket.dueDate) < now && 
      !['resolved', 'closed'].includes(ticket.status)
    ).length;

    return {
      total: this.tickets.length,
      open: this.tickets.filter(t => t.status === 'open').length,
      inProgress: this.tickets.filter(t => t.status === 'in_progress').length,
      resolved: this.tickets.filter(t => t.status === 'resolved').length,
      closed: this.tickets.filter(t => t.status === 'closed').length,
      overdue
    };
  }

  // Calculate due date based on priority
  private calculateDueDate(priority: string): string {
    const now = new Date();
    let hoursToAdd = 72; // Default 3 days

    switch (priority) {
      case 'urgent':
        hoursToAdd = 4;
        break;
      case 'high':
        hoursToAdd = 24;
        break;
      case 'medium':
        hoursToAdd = 48;
        break;
      case 'low':
        hoursToAdd = 72;
        break;
    }

    const dueDate = new Date(now.getTime() + hoursToAdd * 60 * 60 * 1000);
    return dueDate.toISOString();
  }
}

export const ticketService = new TicketService();

