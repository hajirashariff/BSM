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
  ThumbsUp,
  Calendar
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

const analyticsData = {
  tickets: {
    total: 45,
    open: 12,
    inProgress: 8,
    resolved: 25,
    avgResolutionTime: '2.3 days',
    satisfactionScore: 4.7
  },
  services: {
    totalServices: 6,
    operational: 5,
    minorIssues: 1,
    avgUptime: 98.5,
    healthScore: 94.2
  },
  knowledge: {
    totalArticles: 156,
    views: 12500,
    likes: 890,
    avgRating: 4.6,
    topCategory: 'Account Management'
  },
  activity: {
    logins: 45,
    searches: 23,
    downloads: 12,
    lastActive: '2 hours ago'
  }
};

const monthlyData = [
  { month: 'Jan', tickets: 35, resolved: 32, satisfaction: 4.5 },
  { month: 'Feb', tickets: 42, resolved: 38, satisfaction: 4.6 },
  { month: 'Mar', tickets: 38, resolved: 35, satisfaction: 4.4 },
  { month: 'Apr', tickets: 45, resolved: 40, satisfaction: 4.7 },
  { month: 'May', tickets: 52, resolved: 48, satisfaction: 4.8 },
  { month: 'Jun', tickets: 48, resolved: 45, satisfaction: 4.6 }
];

const topArticles = [
  { title: 'How to Reset Your Password', views: 1250, rating: 4.8, category: 'Account Management' },
  { title: 'Email Configuration Guide', views: 890, rating: 4.6, category: 'Email Services' },
  { title: 'Troubleshooting Common Issues', views: 1100, rating: 4.5, category: 'Troubleshooting' },
  { title: 'File Storage Best Practices', views: 650, rating: 4.4, category: 'Storage' },
  { title: 'Security Guidelines', views: 750, rating: 4.9, category: 'Security' }
];

const serviceMetrics = [
  { name: 'Email Services', uptime: 99.9, responseTime: '120ms', health: 95 },
  { name: 'File Storage', uptime: 98.5, responseTime: '250ms', health: 88 },
  { name: 'Database', uptime: 99.2, responseTime: '180ms', health: 92 },
  { name: 'API Gateway', uptime: 99.8, responseTime: '95ms', health: 98 }
];

export default function Analytics() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('6 months');
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
        <title>Analytics - BSM Customer Portal</title>
        <meta name="description" content="View analytics and insights for your account" />
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
                  Analytics
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Calendar size={20} className="text-gray-400" />
                  <select 
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="1 month">Last Month</option>
                    <option value="3 months">Last 3 Months</option>
                    <option value="6 months">Last 6 Months</option>
                    <option value="1 year">Last Year</option>
                  </select>
                </div>
                
                <button className="btn-secondary flex items-center space-x-2">
                  <Download size={20} />
                  <span>Export Report</span>
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
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                      <p className="text-2xl font-bold text-gray-900">{analyticsData.tickets.total}</p>
                      <p className="text-sm text-green-600">+12% from last month</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                      <Ticket size={24} />
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                      <p className="text-2xl font-bold text-gray-900">94%</p>
                      <p className="text-sm text-green-600">+5% from last month</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 text-green-600">
                      <CheckCircle size={24} />
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
                      <p className="text-2xl font-bold text-gray-900">{analyticsData.tickets.avgResolutionTime}</p>
                      <p className="text-sm text-red-600">-20% from last month</p>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
                      <Clock size={24} />
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Satisfaction Score</p>
                      <p className="text-2xl font-bold text-gray-900">{analyticsData.tickets.satisfactionScore}/5</p>
                      <p className="text-sm text-green-600">+0.2 from last month</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                      <Star size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts and Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Trends */}
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
                    <button className="btn-secondary text-sm">View Details</button>
                  </div>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{data.month}</span>
                            <span className="text-sm text-gray-600">{data.tickets} tickets</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(data.tickets / 60) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                            <span>Resolved: {data.resolved}</span>
                            <span>Rating: {data.satisfaction}/5</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Health */}
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Service Health</h3>
                    <button className="btn-secondary text-sm">View All</button>
                  </div>
                  <div className="space-y-4">
                    {serviceMetrics.map((service, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{service.name}</span>
                            <span className="text-sm text-gray-600">{service.health}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                service.health >= 95 ? 'bg-green-500' :
                                service.health >= 90 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${service.health}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                            <span>Uptime: {service.uptime}%</span>
                            <span>Response: {service.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Articles */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Top Knowledge Base Articles</h3>
                  <button className="btn-secondary text-sm">View All</button>
                </div>
                <div className="space-y-3">
                  {topArticles.map((article, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{article.title}</span>
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {article.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Eye size={14} />
                            <span>{article.views} views</span>
                          </span>
                          <span className="flex items-center space-x-1 text-yellow-500">
                            <Star size={14} className="fill-current" />
                            <span>{article.rating}</span>
                          </span>
                        </div>
                      </div>
                      <button className="btn-secondary text-sm">View</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Summary */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{analyticsData.activity.logins}</div>
                    <div className="text-sm text-gray-600">Logins Today</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{analyticsData.activity.searches}</div>
                    <div className="text-sm text-gray-600">Searches</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{analyticsData.activity.downloads}</div>
                    <div className="text-sm text-gray-600">Downloads</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{analyticsData.knowledge.views}</div>
                    <div className="text-sm text-gray-600">KB Views</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
