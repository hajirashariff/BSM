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
  Calendar
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

const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of using our platform',
    icon: '🚀',
    articles: 12,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    id: 'account-management',
    title: 'Account Management',
    description: 'Manage your account settings and profile',
    icon: '👤',
    articles: 8,
    color: 'bg-green-50 text-green-600'
  },
  {
    id: 'billing-payments',
    title: 'Billing & Payments',
    description: 'Understanding billing and payment options',
    icon: '💳',
    articles: 15,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    id: 'technical-support',
    title: 'Technical Support',
    description: 'Troubleshooting and technical issues',
    icon: '🔧',
    articles: 20,
    color: 'bg-orange-50 text-orange-600'
  },
  {
    id: 'api-integration',
    title: 'API & Integration',
    description: 'Developer resources and API documentation',
    icon: '⚙️',
    articles: 25,
    color: 'bg-indigo-50 text-indigo-600'
  },
  {
    id: 'security-privacy',
    title: 'Security & Privacy',
    description: 'Security best practices and privacy policies',
    icon: '🔒',
    articles: 10,
    color: 'bg-red-50 text-red-600'
  }
];

const popularArticles = [
  {
    id: 'help-001',
    title: 'How to Create Your First Support Ticket',
    description: 'Step-by-step guide to creating and managing support tickets',
    category: 'Getting Started',
    views: 1250,
    rating: 4.8,
    lastUpdated: '2024-01-10'
  },
  {
    id: 'help-002',
    title: 'Understanding Your Billing Statement',
    description: 'Learn how to read and understand your monthly billing statement',
    category: 'Billing & Payments',
    views: 890,
    rating: 4.6,
    lastUpdated: '2024-01-08'
  },
  {
    id: 'help-003',
    title: 'Password Reset and Security',
    description: 'How to reset your password and secure your account',
    category: 'Security & Privacy',
    views: 1100,
    rating: 4.7,
    lastUpdated: '2024-01-05'
  },
  {
    id: 'help-004',
    title: 'API Authentication Guide',
    description: 'Complete guide to API authentication and integration',
    category: 'API & Integration',
    views: 650,
    rating: 4.5,
    lastUpdated: '2024-01-03'
  }
];

const contactOptions = [
  {
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    icon: MessageSquare,
    available: true,
    responseTime: '2-5 minutes'
  },
  {
    title: 'Email Support',
    description: 'Send us an email and we\'ll respond within 24 hours',
    icon: Mail,
    available: true,
    responseTime: '24 hours'
  },
  {
    title: 'Phone Support',
    description: 'Call us for urgent issues and complex problems',
    icon: Phone,
    available: true,
    responseTime: 'Immediate'
  }
];

export default function Help() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
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
        <title>Help Center - BSM Customer Portal</title>
        <meta name="description" content="Get help and support for your account" />
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
                  Help Center
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search help articles..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <button className="btn-primary flex items-center space-x-2">
                  <MessageSquare size={20} />
                  <span>Live Chat</span>
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
              {/* Hero Section */}
              <div className="card bg-gradient-to-r from-primary-50 to-blue-50">
                <div className="text-center py-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">How can we help you today?</h1>
                  <p className="text-lg text-gray-600 mb-6">Find answers, get support, and learn how to make the most of our platform</p>
                  <div className="flex justify-center space-x-4">
                    <button className="btn-primary flex items-center space-x-2">
                      <MessageSquare size={20} />
                      <span>Start Live Chat</span>
                    </button>
                    <button className="btn-secondary flex items-center space-x-2">
                      <Ticket size={20} />
                      <span>Create Support Ticket</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Help Categories */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {helpCategories.map((category) => (
                    <div key={category.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{category.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{category.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{category.articles} articles</span>
                            <ExternalLink size={16} className="text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Articles */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Articles</h3>
                <div className="space-y-4">
                  {popularArticles.map((article) => (
                    <div key={article.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{article.title}</h4>
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {article.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Eye size={14} />
                            <span>{article.views} views</span>
                          </span>
                          <span className="flex items-center space-x-1 text-yellow-500">
                            <Star size={14} className="fill-current" />
                            <span>{article.rating}</span>
                          </span>
                          <span>Updated {article.lastUpdated}</span>
                        </div>
                      </div>
                      <button className="btn-secondary text-sm">Read More</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Support */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Still need help?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {contactOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg text-center">
                        <div className={`w-12 h-12 ${option.available ? 'bg-primary-50 text-primary-600' : 'bg-gray-50 text-gray-400'} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                          <Icon size={24} />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{option.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                        <div className="text-xs text-gray-500 mb-3">
                          Response time: {option.responseTime}
                        </div>
                        <button 
                          className={`w-full ${option.available ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
                          disabled={!option.available}
                        >
                          {option.available ? 'Contact Now' : 'Unavailable'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
