import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Home as HomeIcon, 
  Ticket, 
  HelpCircle,
  CreditCard,
  User,
  FileText,
  MessageSquare,
  Download,
  Settings,
  Bell,
  Search,
  Plus,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Activity,
  Filter,
  SortAsc,
  ExternalLink,
  Star,
  Eye,
  ThumbsUp,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Receipt,
  CreditCard as CardIcon
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: HomeIcon },
  { href: '/tickets', label: 'Support Tickets', icon: Ticket },
  { href: '/help', label: 'Help Center', icon: HelpCircle },
  { href: '/billing', label: 'Billing & Invoices', icon: CreditCard },
  { href: '/account', label: 'My Account', icon: User },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/chat', label: 'Live Chat', icon: MessageSquare },
  { href: '/downloads', label: 'Downloads', icon: Download },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const invoices = [
  {
    id: 'INV-2024-001',
    date: '2024-01-15',
    amount: 299.99,
    status: 'Paid',
    dueDate: '2024-01-30',
    description: 'Monthly subscription - Pro Plan'
  },
  {
    id: 'INV-2024-002',
    date: '2023-12-15',
    amount: 299.99,
    status: 'Paid',
    dueDate: '2023-12-30',
    description: 'Monthly subscription - Pro Plan'
  },
  {
    id: 'INV-2024-003',
    date: '2023-11-15',
    amount: 299.99,
    status: 'Paid',
    dueDate: '2023-11-30',
    description: 'Monthly subscription - Pro Plan'
  },
  {
    id: 'INV-2024-004',
    date: '2023-10-15',
    amount: 299.99,
    status: 'Paid',
    dueDate: '2023-10-30',
    description: 'Monthly subscription - Pro Plan'
  }
];

const paymentMethods = [
  {
    id: 'pm_1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  },
  {
    id: 'pm_2',
    type: 'card',
    last4: '5555',
    brand: 'Mastercard',
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false
  }
];

const billingSummary = {
  currentPlan: 'Pro Plan',
  monthlyAmount: 299.99,
  nextBillingDate: '2024-02-15',
  totalSpent: 1199.96,
  usage: {
    apiCalls: 125000,
    apiCallsLimit: 200000,
    storage: 45.2,
    storageLimit: 100
  }
};

export default function Billing() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Billing & Invoices - BSM Customer Portal</title>
        <meta name="description" content="Manage your billing and view invoices" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BSM</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-zinc-100">Customer Portal</h1>
            </div>
          </div>
          
          <nav className="px-4 pb-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const active = router.pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                        active 
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

        </aside>

        {/* Main Content */}
        <div className="ml-64">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Billing & Invoices
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="btn-primary flex items-center space-x-2">
                  <Download size={20} />
                  <span>Download All</span>
                </button>
                
                <button className="btn-secondary flex items-center space-x-2">
                  <Plus size={20} />
                  <span>Add Payment Method</span>
                </button>
                
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Customer User</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <div className="space-y-6">
              {/* Billing Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Current Plan</p>
                      <p className="text-2xl font-bold text-gray-900">{billingSummary.currentPlan}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary-50 text-primary-600">
                      <CreditCard size={24} />
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Amount</p>
                      <p className="text-2xl font-bold text-gray-900">${billingSummary.monthlyAmount}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 text-green-600">
                      <DollarSign size={24} />
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Next Billing</p>
                      <p className="text-2xl font-bold text-gray-900">{billingSummary.nextBillingDate}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                      <Calendar size={24} />
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Spent</p>
                      <p className="text-2xl font-bold text-gray-900">${billingSummary.totalSpent}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                      <Receipt size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Overview */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">API Calls</span>
                      <span className="text-sm text-gray-600">
                        {billingSummary.usage.apiCalls.toLocaleString()} / {billingSummary.usage.apiCallsLimit.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(billingSummary.usage.apiCalls / billingSummary.usage.apiCallsLimit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Storage</span>
                      <span className="text-sm text-gray-600">
                        {billingSummary.usage.storage}GB / {billingSummary.usage.storageLimit}GB
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(billingSummary.usage.storage / billingSummary.usage.storageLimit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Invoices */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
                  <button className="btn-secondary text-sm">View All</button>
                </div>
                
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Receipt size={20} className="text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{invoice.id}</h4>
                          <p className="text-sm text-gray-600">{invoice.description}</p>
                          <p className="text-xs text-gray-500">Date: {invoice.date}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">${invoice.amount}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="btn-secondary text-sm">View</button>
                        <button className="btn-primary text-sm">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                  <button className="btn-primary text-sm">Add New</button>
                </div>
                
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <CardIcon size={20} className="text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">{method.brand} •••• {method.last4}</h4>
                            {method.isDefault && (
                              <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">Expires {method.expiryMonth}/{method.expiryYear}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="btn-secondary text-sm">Edit</button>
                        <button className="btn-secondary text-sm">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
