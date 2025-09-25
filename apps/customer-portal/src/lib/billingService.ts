// Billing Service - Complete billing and invoice management
export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'refunded';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  paymentMethod?: 'credit_card' | 'bank_transfer' | 'paypal' | 'check' | 'cash';
  paymentReference?: string;
  notes?: string;
  items: InvoiceItem[];
  attachments: BillingAttachment[];
  history: BillingHistory[];
  recurring?: {
    frequency: 'monthly' | 'quarterly' | 'yearly';
    nextDueDate: string;
    isActive: boolean;
  };
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: 'service' | 'product' | 'subscription' | 'support' | 'other';
  servicePeriod?: {
    startDate: string;
    endDate: string;
  };
}

export interface BillingAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

export interface BillingHistory {
  id: string;
  action: string;
  description: string;
  user: string;
  timestamp: string;
  changes?: Record<string, { from: any; to: any }>;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'credit_card' | 'bank_transfer' | 'paypal' | 'check' | 'cash';
  reference: string;
  processedAt: string;
  notes?: string;
}

export interface Subscription {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'suspended' | 'cancelled';
  startDate: string;
  endDate?: string;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  price: number;
  currency: string;
  nextBillingDate: string;
  autoRenew: boolean;
  features: string[];
}

export interface BillingFilters {
  status?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
  search?: string;
  customerId?: string;
}

export interface BillingStats {
  totalInvoices: number;
  totalRevenue: number;
  paidInvoices: number;
  overdueInvoices: number;
  pendingInvoices: number;
  averageInvoiceValue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  paymentSuccessRate: number;
}

// Mock data for development
const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    invoiceNumber: 'INV-2024-001',
    customerId: 'CUST-001',
    customerName: 'Acme Corporation',
    customerEmail: 'billing@acme.com',
    status: 'paid',
    issueDate: '2024-01-01',
    dueDate: '2024-01-31',
    paidDate: '2024-01-25',
    subtotal: 2500.00,
    taxAmount: 250.00,
    discountAmount: 0.00,
    totalAmount: 2750.00,
    currency: 'USD',
    paymentMethod: 'credit_card',
    paymentReference: 'TXN-123456789',
    notes: 'Monthly service subscription',
    items: [
      {
        id: 'item-001',
        description: 'Professional Services - Monthly Subscription',
        quantity: 1,
        unitPrice: 2500.00,
        totalPrice: 2500.00,
        category: 'subscription',
        servicePeriod: {
          startDate: '2024-01-01',
          endDate: '2024-01-31'
        }
      }
    ],
    attachments: [
      {
        id: 'att-001',
        name: 'invoice-INV-2024-001.pdf',
        type: 'application/pdf',
        size: 245760,
        url: '/attachments/invoice-INV-2024-001.pdf',
        uploadedAt: '2024-01-01T10:00:00Z'
      }
    ],
    history: [
      {
        id: 'hist-001',
        action: 'created',
        description: 'Invoice created',
        user: 'system',
        timestamp: '2024-01-01T10:00:00Z'
      },
      {
        id: 'hist-002',
        action: 'sent',
        description: 'Invoice sent to customer',
        user: 'billing@company.com',
        timestamp: '2024-01-01T10:30:00Z'
      },
      {
        id: 'hist-003',
        action: 'paid',
        description: 'Payment received via credit card',
        user: 'system',
        timestamp: '2024-01-25T14:22:00Z',
        changes: {
          status: { from: 'sent', to: 'paid' },
          paidDate: { from: null, to: '2024-01-25T14:22:00Z' }
        }
      }
    ],
    recurring: {
      frequency: 'monthly',
      nextDueDate: '2024-02-01',
      isActive: true
    }
  },
  {
    id: 'INV-002',
    invoiceNumber: 'INV-2024-002',
    customerId: 'CUST-002',
    customerName: 'TechStart Inc',
    customerEmail: 'finance@techstart.com',
    status: 'overdue',
    issueDate: '2024-01-15',
    dueDate: '2024-02-14',
    subtotal: 1800.00,
    taxAmount: 180.00,
    discountAmount: 100.00,
    totalAmount: 1880.00,
    currency: 'USD',
    notes: 'Q1 2024 services - Early payment discount applied',
    items: [
      {
        id: 'item-002',
        description: 'Custom Development Services',
        quantity: 40,
        unitPrice: 50.00,
        totalPrice: 2000.00,
        category: 'service',
        servicePeriod: {
          startDate: '2024-01-01',
          endDate: '2024-03-31'
        }
      }
    ],
    attachments: [],
    history: [
      {
        id: 'hist-004',
        action: 'created',
        description: 'Invoice created with early payment discount',
        user: 'system',
        timestamp: '2024-01-15T09:00:00Z'
      },
      {
        id: 'hist-005',
        action: 'sent',
        description: 'Invoice sent to customer',
        user: 'billing@company.com',
        timestamp: '2024-01-15T09:15:00Z'
      },
      {
        id: 'hist-006',
        action: 'overdue',
        description: 'Invoice marked as overdue',
        user: 'system',
        timestamp: '2024-02-15T00:00:00Z',
        changes: {
          status: { from: 'sent', to: 'overdue' }
        }
      }
    ]
  },
  {
    id: 'INV-003',
    invoiceNumber: 'INV-2024-003',
    customerId: 'CUST-003',
    customerName: 'Global Solutions Ltd',
    customerEmail: 'accounts@globalsolutions.com',
    status: 'sent',
    issueDate: '2024-02-01',
    dueDate: '2024-02-28',
    subtotal: 5000.00,
    taxAmount: 500.00,
    discountAmount: 0.00,
    totalAmount: 5500.00,
    currency: 'USD',
    notes: 'Annual enterprise license renewal',
    items: [
      {
        id: 'item-003',
        description: 'Enterprise License - Annual',
        quantity: 1,
        unitPrice: 5000.00,
        totalPrice: 5000.00,
        category: 'subscription',
        servicePeriod: {
          startDate: '2024-02-01',
          endDate: '2025-01-31'
        }
      }
    ],
    attachments: [
      {
        id: 'att-002',
        name: 'contract-renewal-2024.pdf',
        type: 'application/pdf',
        size: 512000,
        url: '/attachments/contract-renewal-2024.pdf',
        uploadedAt: '2024-02-01T08:00:00Z'
      }
    ],
    history: [
      {
        id: 'hist-007',
        action: 'created',
        description: 'Annual renewal invoice created',
        user: 'system',
        timestamp: '2024-02-01T08:00:00Z'
      },
      {
        id: 'hist-008',
        action: 'sent',
        description: 'Invoice sent to customer',
        user: 'billing@company.com',
        timestamp: '2024-02-01T08:30:00Z'
      }
    ],
    recurring: {
      frequency: 'yearly',
      nextDueDate: '2025-02-01',
      isActive: true
    }
  }
];

const mockSubscriptions: Subscription[] = [
  {
    id: 'SUB-001',
    name: 'Professional Services',
    description: 'Monthly professional services subscription',
    status: 'active',
    startDate: '2024-01-01',
    billingCycle: 'monthly',
    price: 2500.00,
    currency: 'USD',
    nextBillingDate: '2024-03-01',
    autoRenew: true,
    features: ['24/7 Support', 'Priority Queue', 'Advanced Analytics', 'API Access']
  },
  {
    id: 'SUB-002',
    name: 'Enterprise License',
    description: 'Annual enterprise software license',
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    billingCycle: 'yearly',
    price: 5000.00,
    currency: 'USD',
    nextBillingDate: '2025-02-01',
    autoRenew: true,
    features: ['Unlimited Users', 'Custom Integrations', 'Dedicated Support', 'SLA Guarantee']
  }
];

class BillingService {
  private invoices: Invoice[] = [...mockInvoices];
  private subscriptions: Subscription[] = [...mockSubscriptions];

  // Invoice Management
  async getInvoices(filters?: BillingFilters): Promise<Invoice[]> {
    let filteredInvoices = [...this.invoices];

    if (filters) {
      if (filters.status && filters.status.length > 0) {
        filteredInvoices = filteredInvoices.filter(invoice => 
          filters.status!.includes(invoice.status)
        );
      }

      if (filters.dateRange) {
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        filteredInvoices = filteredInvoices.filter(invoice => {
          const invoiceDate = new Date(invoice.issueDate);
          return invoiceDate >= startDate && invoiceDate <= endDate;
        });
      }

      if (filters.amountRange) {
        filteredInvoices = filteredInvoices.filter(invoice => 
          invoice.totalAmount >= filters.amountRange!.min && 
          invoice.totalAmount <= filters.amountRange!.max
        );
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredInvoices = filteredInvoices.filter(invoice => 
          invoice.invoiceNumber.toLowerCase().includes(searchTerm) ||
          invoice.customerName.toLowerCase().includes(searchTerm) ||
          invoice.customerEmail.toLowerCase().includes(searchTerm)
        );
      }

      if (filters.customerId) {
        filteredInvoices = filteredInvoices.filter(invoice => 
          invoice.customerId === filters.customerId
        );
      }
    }

    return filteredInvoices.sort((a, b) => 
      new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
    );
  }

  async getInvoice(id: string): Promise<Invoice | null> {
    return this.invoices.find(invoice => invoice.id === id) || null;
  }

  async createInvoice(invoiceData: Omit<Invoice, 'id' | 'invoiceNumber' | 'history'>): Promise<Invoice> {
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(this.invoices.length + 1).padStart(3, '0')}`;
    
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `INV-${Date.now()}`,
      invoiceNumber,
      history: [{
        id: `hist-${Date.now()}`,
        action: 'created',
        description: 'Invoice created',
        user: 'system',
        timestamp: new Date().toISOString()
      }]
    };

    this.invoices.unshift(newInvoice);
    return newInvoice;
  }

  async updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice | null> {
    const invoiceIndex = this.invoices.findIndex(invoice => invoice.id === id);
    if (invoiceIndex === -1) return null;

    const oldInvoice = { ...this.invoices[invoiceIndex] };
    const changes: Record<string, { from: any; to: any }> = {};

    // Track changes
    Object.keys(updates).forEach(key => {
      if (updates[key as keyof Invoice] !== oldInvoice[key as keyof Invoice]) {
        changes[key] = {
          from: oldInvoice[key as keyof Invoice],
          to: updates[key as keyof Invoice]
        };
      }
    });

    // Update invoice
    this.invoices[invoiceIndex] = {
      ...oldInvoice,
      ...updates
    };

    // Add history entry
    this.invoices[invoiceIndex].history.push({
      id: `hist-${Date.now()}`,
      action: 'updated',
      description: 'Invoice updated',
      user: 'system',
      timestamp: new Date().toISOString(),
      changes
    });

    return this.invoices[invoiceIndex];
  }

  async deleteInvoice(id: string): Promise<boolean> {
    const invoiceIndex = this.invoices.findIndex(invoice => invoice.id === id);
    if (invoiceIndex === -1) return false;

    this.invoices.splice(invoiceIndex, 1);
    return true;
  }

  // Subscription Management
  async getSubscriptions(): Promise<Subscription[]> {
    return this.subscriptions;
  }

  async getSubscription(id: string): Promise<Subscription | null> {
    return this.subscriptions.find(sub => sub.id === id) || null;
  }

  // Statistics
  async getBillingStats(): Promise<BillingStats> {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyInvoices = this.invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.issueDate);
      return invoiceDate.getMonth() === currentMonth && invoiceDate.getFullYear() === currentYear;
    });

    const yearlyInvoices = this.invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.issueDate);
      return invoiceDate.getFullYear() === currentYear;
    });

    const paidInvoices = this.invoices.filter(invoice => invoice.status === 'paid');
    const overdueInvoices = this.invoices.filter(invoice => invoice.status === 'overdue');
    const pendingInvoices = this.invoices.filter(invoice => ['sent', 'draft'].includes(invoice.status));

    const totalRevenue = paidInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
    const monthlyRevenue = monthlyInvoices
      .filter(invoice => invoice.status === 'paid')
      .reduce((sum, invoice) => sum + invoice.totalAmount, 0);
    const yearlyRevenue = yearlyInvoices
      .filter(invoice => invoice.status === 'paid')
      .reduce((sum, invoice) => sum + invoice.totalAmount, 0);

    const averageInvoiceValue = this.invoices.length > 0 
      ? this.invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0) / this.invoices.length 
      : 0;

    const paymentSuccessRate = this.invoices.length > 0 
      ? (paidInvoices.length / this.invoices.length) * 100 
      : 0;

    return {
      totalInvoices: this.invoices.length,
      totalRevenue,
      paidInvoices: paidInvoices.length,
      overdueInvoices: overdueInvoices.length,
      pendingInvoices: pendingInvoices.length,
      averageInvoiceValue,
      monthlyRevenue,
      yearlyRevenue,
      paymentSuccessRate
    };
  }

  // Payment Processing
  async processPayment(invoiceId: string, paymentData: Omit<Payment, 'id' | 'processedAt'>): Promise<Payment | null> {
    const invoice = this.invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return null;

    const payment: Payment = {
      ...paymentData,
      id: `PAY-${Date.now()}`,
      processedAt: new Date().toISOString()
    };

    // Update invoice status
    await this.updateInvoice(invoiceId, {
      status: 'paid',
      paidDate: payment.processedAt,
      paymentMethod: payment.method,
      paymentReference: payment.reference
    });

    return payment;
  }

  // Export functionality
  async exportInvoices(format: 'pdf' | 'csv' | 'excel', filters?: BillingFilters): Promise<string> {
    const invoices = await this.getInvoices(filters);
    // In a real implementation, this would generate actual files
    return `Exporting ${invoices.length} invoices in ${format.toUpperCase()} format...`;
  }
}

export const billingService = new BillingService();

