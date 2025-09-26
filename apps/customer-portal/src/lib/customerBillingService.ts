// Customer Billing Service - Subscription and billing management

export interface CustomerSubscription {
  id: string;
  planName: string;
  description?: string;
  planType: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended' | 'cancelled' | 'expired';
  billingCycle: 'monthly' | 'yearly';
  price: number;
  currency: string;
  startDate: string;
  endDate?: string;
  nextBillingDate: string;
  autoRenew: boolean;
  canPause?: boolean;
  canCancel?: boolean;
  canUpgrade?: boolean;
  canDowngrade?: boolean;
  features: string[];
  usage: {
    current: number;
    limit: number;
    unit: string;
  };
  paymentMethod: {
    type: 'card' | 'bank' | 'paypal';
    last4: string;
    brand?: string;
  };
  invoices: Invoice[];
}

export interface Invoice {
  id: string;
  number: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  items: InvoiceItem[];
  downloadUrl?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface BillingAddress {
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal';
  brand?: string;
  last4: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  billingAddress: BillingAddress;
}

// Mock data for development
export const mockSubscription: CustomerSubscription = {
  id: 'sub_123456789',
  planName: 'Professional Plan',
  description: 'Advanced features for growing businesses with priority support and analytics',
  planType: 'professional',
  status: 'active',
  billingCycle: 'monthly',
  price: 99.99,
  currency: 'USD',
  startDate: '2024-01-01',
  nextBillingDate: '2024-02-01',
  autoRenew: true,
  canPause: true,
  canCancel: true,
  canUpgrade: true,
  canDowngrade: true,
  features: [
    'Unlimited tickets',
    'Priority support',
    'Advanced analytics',
    'API access',
    'Custom branding'
  ],
  usage: {
    current: 1250,
    limit: 5000,
    unit: 'tickets'
  },
  paymentMethod: {
    type: 'card',
    last4: '4242',
    brand: 'visa'
  },
  invoices: [
    {
      id: 'inv_001',
      number: 'INV-2024-001',
      amount: 99.99,
      currency: 'USD',
      status: 'paid',
      issueDate: '2024-01-01',
      dueDate: '2024-01-31',
      paidDate: '2024-01-01',
      items: [
        {
          description: 'Professional Plan - Monthly',
          quantity: 1,
          unitPrice: 99.99,
          total: 99.99
        }
      ],
      downloadUrl: '/invoices/inv_001.pdf'
    }
  ]
};

// Service functions
export const getSubscription = async (): Promise<CustomerSubscription> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSubscription), 500);
  });
};

export const cancelSubscription = async (id: string): Promise<void> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
};

export const pauseSubscription = async (id: string): Promise<void> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
};

export const resumeSubscription = async (id: string): Promise<void> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
};

export const getInvoices = async (): Promise<Invoice[]> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSubscription.invoices), 500);
  });
};

export const downloadInvoice = async (invoiceId: string): Promise<string> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(`/invoices/${invoiceId}.pdf`), 500);
  });
};
