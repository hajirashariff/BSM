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
  ThumbsUp
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: HomeIcon },
  { href: '/tickets', label: 'Support Tickets', icon: Ticket },
  { href: '/help', label: 'Help Center', icon: HelpCircle },
  { href: '/billing', label: 'Billing & Invoices', icon: CreditCard },
  { href: '/account', label: 'My Account', icon: User },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/downloads', label: 'Downloads', icon: Download },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const articles = [
  {
    id: 'KB-001',
    title: 'How to Reset Your Password',
    description: 'Step-by-step guide to resetting your account password',
    category: 'Account Management',
    tags: ['password', 'security', 'login'],
    views: 1250,
    likes: 89,
    rating: 4.8,
    lastUpdated: '2024-01-10',
    author: 'Support Team',
    isFeatured: true
  },
  {
    id: 'KB-002',
    title: 'Email Configuration Guide',
    description: 'Complete guide to configuring email settings',
    category: 'Email Services',
    tags: ['email', 'configuration', 'setup'],
    views: 890,
    likes: 67,
    rating: 4.6,
    lastUpdated: '2024-01-08',
    author: 'Technical Team',
    isFeatured: false
  },
  {
    id: 'KB-003',
    title: 'File Storage Best Practices',
    description: 'Tips and best practices for using file storage services',
    category: 'Storage',
    tags: ['storage', 'files', 'best-practices'],
    views: 650,
    likes: 45,
    rating: 4.4,
    lastUpdated: '2024-01-05',
    author: 'Storage Team',
    isFeatured: true
  },
  {
    id: 'KB-004',
    title: 'API Integration Tutorial',
    description: 'How to integrate with our API services',
    category: 'Development',
    tags: ['api', 'integration', 'development'],
    views: 420,
    likes: 32,
    rating: 4.7,
    lastUpdated: '2024-01-03',
    author: 'Dev Team',
    isFeatured: false
  },
  {
    id: 'KB-005',
    title: 'Troubleshooting Common Issues',
    description: 'Solutions to frequently encountered problems',
    category: 'Troubleshooting',
    tags: ['troubleshooting', 'issues', 'solutions'],
    views: 1100,
    likes: 78,
    rating: 4.5,
    lastUpdated: '2024-01-01',
    author: 'Support Team',
    isFeatured: true
  },
  {
    id: 'KB-006',
    title: 'Security Guidelines',
    description: 'Important security practices and guidelines',
    category: 'Security',
    tags: ['security', 'guidelines', 'safety'],
    views: 750,
    likes: 56,
    rating: 4.9,
    lastUpdated: '2023-12-28',
    author: 'Security Team',
    isFeatured: false
  }
];

const categories = [
  'All Categories',
  'Account Management',
  'Email Services',
  'Storage',
  'Development',
  'Troubleshooting',
  'Security'
];

export default function Knowledge() {
  const router = useRouter();
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredArticles = articles.filter(article => {
    const categoryMatch = filterCategory === 'All Categories' || article.category === filterCategory;
    const searchMatch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return categoryMatch && searchMatch;
  });

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

  const featuredArticles = articles.filter(article => article.isFeatured);

  return (
    <>
      <Head>
        <title>Knowledge Base - BSM Customer Portal</title>
        <meta name="description" content="Browse knowledge base articles and guides" />
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
                  Knowledge Base
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <button className="btn-primary flex items-center space-x-2">
                  <Plus size={20} />
                  <span>Suggest Article</span>
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
              {/* Featured Articles */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredArticles.map((article) => (
                    <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">
                          Featured
                        </span>
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <Star size={14} className="fill-current" />
                          <span className="text-sm font-medium">{article.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{article.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{article.views} views</span>
                        <span>{article.likes} likes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filters */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Browse Articles</h3>
                  <button className="btn-secondary text-sm flex items-center space-x-2">
                    <Filter size={16} />
                    <span>Advanced Filters</span>
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="input-field w-48"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Articles List */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Articles ({filteredArticles.length})
                  </h3>
                  <button className="btn-secondary text-sm flex items-center space-x-2">
                    <SortAsc size={16} />
                    <span>Sort by Rating</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {filteredArticles.map((article) => (
                    <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{article.title}</h4>
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                              {article.category}
                            </span>
                            {article.isFeatured && (
                              <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{article.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span>By {article.author}</span>
                            <span>Updated {article.lastUpdated}</span>
                            <div className="flex items-center space-x-1">
                              <Eye size={14} />
                              <span>{article.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ThumbsUp size={14} />
                              <span>{article.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-yellow-500">
                              <Star size={14} className="fill-current" />
                              <span>{article.rating}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {article.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="btn-secondary text-sm">Read More</button>
                          <button className="btn-primary text-sm">Bookmark</button>
                        </div>
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
