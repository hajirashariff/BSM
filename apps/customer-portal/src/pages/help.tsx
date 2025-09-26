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
  Phone,
  Mail,
  Calendar,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Share2,
  Bookmark,
  SortDesc,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Shield,
  Zap,
  Globe,
  Database,
  Server,
  Monitor
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/tickets', label: 'Support Tickets', icon: Ticket },
  { href: '/help', label: 'Help Center', icon: HelpCircle },
  { href: '/account', label: 'My Account', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of using our platform',
    icon: BookOpen,
    articles: 12,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-100/20',
    articles: [
      {
        id: 'welcome-to-bsm',
        title: 'Welcome to BSM Platform',
        summary: 'Get started with our Business Service Management platform and learn the fundamentals.',
        content: `# Welcome to BSM Platform

## Overview
The BSM (Business Service Management) platform is a comprehensive solution designed to streamline your business operations, manage service requests, and provide real-time insights into your organization's performance.

## Key Features
- **Service Request Management**: Create, track, and manage service requests efficiently
- **Real-time Monitoring**: Monitor key performance indicators and system health
- **User Management**: Manage user accounts, roles, and permissions
- **Reporting & Analytics**: Generate detailed reports and gain insights
- **Integration Capabilities**: Connect with third-party systems and tools

## Getting Started
1. **Account Setup**: Complete your profile information
2. **Team Configuration**: Set up your team and assign roles
3. **Service Catalog**: Configure your service offerings
4. **Workflow Setup**: Define your business processes
5. **Go Live**: Start using the platform for your daily operations

## Best Practices
- Regularly update your profile information
- Set up proper notification preferences
- Use the search functionality to find information quickly
- Bookmark frequently used articles
- Provide feedback to help us improve

## Support
If you need assistance, please contact our support team or create a support ticket through the platform.`,
        author: 'BSM Team',
        lastUpdated: '2024-01-15',
        readTime: '5 min',
        difficulty: 'Beginner',
        tags: ['getting-started', 'basics', 'overview'],
        views: 1250,
        likes: 89,
        isBookmarked: false
      },
      {
        id: 'first-login',
        title: 'Your First Login',
        summary: 'Step-by-step guide for your first login experience.',
        content: `# Your First Login

## Prerequisites
- Valid email address
- Temporary password (sent via email)
- Internet connection

## Login Process
1. Navigate to the login page
2. Enter your email address
3. Enter the temporary password
4. Click "Sign In"
5. You'll be prompted to change your password
6. Complete your profile setup

## Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

## Troubleshooting
If you're having trouble logging in:
- Check your email for the temporary password
- Ensure you're using the correct email address
- Clear your browser cache and cookies
- Try using a different browser
- Contact support if issues persist`,
        author: 'BSM Team',
        lastUpdated: '2024-01-10',
        readTime: '3 min',
        difficulty: 'Beginner',
        tags: ['login', 'authentication', 'first-time'],
        views: 980,
        likes: 67,
        isBookmarked: false
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Common issues and their solutions',
    icon: AlertTriangle,
    articles: 8,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-100/20',
    articles: [
      {
        id: 'login-issues',
        title: 'Login Issues and Solutions',
        summary: 'Resolve common login problems and authentication issues.',
        content: `# Login Issues and Solutions

## Common Login Problems

### Forgot Password
1. Click "Forgot Password" on the login page
2. Enter your email address
3. Check your email for reset instructions
4. Follow the link to create a new password

### Account Locked
If your account is locked due to multiple failed attempts:
1. Wait 15 minutes before trying again
2. Contact your administrator to unlock the account
3. Ensure you're using the correct credentials

### Browser Issues
- Clear browser cache and cookies
- Disable browser extensions temporarily
- Try incognito/private mode
- Update your browser to the latest version

### Network Issues
- Check your internet connection
- Try accessing from a different network
- Contact your IT department if on corporate network
- Check firewall settings

## Still Having Issues?
Contact our support team with:
- Your email address
- Error messages (if any)
- Browser and version
- Steps you've already tried`,
        author: 'Support Team',
        lastUpdated: '2024-01-12',
        readTime: '4 min',
        difficulty: 'Intermediate',
        tags: ['troubleshooting', 'login', 'authentication'],
        views: 2100,
        likes: 156,
        isBookmarked: false
      }
    ]
  },
  {
    id: 'account-management',
    title: 'Account Management',
    description: 'Manage your account and settings',
    icon: User,
    articles: 15,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-100/20',
    articles: [
      {
        id: 'profile-settings',
        title: 'Managing Your Profile',
        summary: 'Learn how to update your profile information and preferences.',
        content: `# Managing Your Profile

## Profile Information
Your profile contains important information that helps personalize your experience:

### Personal Details
- **Name**: Your full name as it appears in the system
- **Email**: Primary contact email (cannot be changed by users)
- **Phone**: Contact number for notifications
- **Title**: Your job title or role
- **Department**: Your organizational department

### Professional Information
- **Company**: Your organization name
- **Location**: Your work location
- **Manager**: Your direct supervisor
- **Team**: Your team or group

## Updating Your Profile
1. Navigate to Account > Profile
2. Click "Edit" to modify information
3. Update the fields you want to change
4. Click "Save" to apply changes
5. Changes are reflected immediately

## Profile Picture
- Supported formats: JPG, PNG, GIF
- Maximum size: 5MB
- Recommended dimensions: 200x200 pixels
- Click on the profile picture to upload a new one

## Privacy Settings
- Control who can see your information
- Set notification preferences
- Manage data sharing options
- Configure security settings`,
        author: 'BSM Team',
        lastUpdated: '2024-01-08',
        readTime: '6 min',
        difficulty: 'Beginner',
        tags: ['profile', 'account', 'settings'],
        views: 1800,
        likes: 134,
        isBookmarked: false
      }
    ]
  },
  {
    id: 'billing',
    title: 'Billing & Payments',
    description: 'Billing information and payment methods',
    icon: CreditCard,
    articles: 6,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-100/20',
    articles: []
  },
  {
    id: 'api',
    title: 'API Documentation',
    description: 'Integrate with our API',
    icon: FileText,
    articles: 20,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-100/20',
    articles: []
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Security best practices and guidelines',
    icon: Shield,
    articles: 10,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100 dark:bg-indigo-100/20',
    articles: []
  }
];

const featuredArticles = [
  {
    id: 'featured-1',
    title: 'How to Create Your First Service Request',
    summary: 'Step-by-step guide to creating and managing service requests effectively.',
    category: 'Getting Started',
    readTime: '3 min',
    difficulty: 'Beginner',
    views: 3200,
    likes: 245,
    isBookmarked: false
  },
  {
    id: 'featured-2',
    title: 'Understanding Your Home Page',
    summary: 'Learn how to navigate and customize your home page for maximum efficiency.',
    category: 'Getting Started',
    readTime: '4 min',
    difficulty: 'Beginner',
    views: 2800,
    likes: 198,
    isBookmarked: false
  },
  {
    id: 'featured-3',
    title: 'Troubleshooting Common Issues',
    summary: 'Quick solutions to the most frequently encountered problems.',
    category: 'Troubleshooting',
    readTime: '5 min',
    difficulty: 'Intermediate',
    views: 4500,
    likes: 312,
    isBookmarked: false
  }
];

const supportChannels = [
  {
    name: 'Email Support',
    description: 'Send us a detailed message',
    icon: Mail,
    available: true,
    responseTime: 'Within 2 hours'
  },
  {
    name: 'Phone Support',
    description: 'Speak directly with our experts',
    icon: Phone,
    available: true,
    responseTime: 'Immediate'
  }
];

export default function Help() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleArticleExpand = (articleId) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId);
  };

  const handleBookmark = (articleId) => {
    // Toggle bookmark status
    console.log('Bookmark toggled for article:', articleId);
  };

  const handleLike = (articleId) => {
    // Handle like functionality
    console.log('Liked article:', articleId);
  };

  const handleShare = (articleId) => {
    // Handle share functionality
    console.log('Shared article:', articleId);
  };

  const filteredCategories = helpCategories.filter(category => 
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allArticles = helpCategories.flatMap(category => 
    category.articles.map(article => ({ ...article, category: category.title }))
  );

  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDifficulty = filterDifficulty === 'all' || article.difficulty.toLowerCase() === filterDifficulty;
    
    return matchesSearch && matchesDifficulty;
  });

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  const ArticleCard = ({ article, isExpanded, onExpand, onBookmark, onLike, onShare }) => (
    <div className="card dark:bg-zinc-900 dark:border-zinc-800">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">
            {article.title}
          </h3>
          <p className="text-gray-600 dark:text-zinc-400 mb-3">
            {article.summary}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-zinc-400 mb-4">
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={14} />
              <span>{article.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsUp size={14} />
              <span>{article.likes}</span>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              article.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
              article.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}>
              {article.difficulty}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full dark:bg-zinc-800 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onBookmark(article.id)}
            className={`p-2 rounded-lg transition-colors ${
              article.isBookmarked
                ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
                : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900 dark:hover:text-yellow-300'
            }`}
          >
            <Bookmark size={16} />
          </button>
          <button
            onClick={() => onLike(article.id)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 dark:hover:text-blue-300 rounded-lg transition-colors"
          >
            <ThumbsUp size={16} />
          </button>
          <button
            onClick={() => onShare(article.id)}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-100 dark:hover:bg-green-900 dark:hover:text-green-300 rounded-lg transition-colors"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      <button
        onClick={() => onExpand(article.id)}
        className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">
          {isExpanded ? 'Show Less' : 'Read More'}
        </span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap text-gray-700 dark:text-zinc-300">
              {article.content}
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-zinc-400">
            <div className="flex items-center space-x-4">
              <span>By {article.author}</span>
              <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                <ExternalLink size={14} className="mr-1" />
                Open in New Tab
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Head>
        <title>Help Center - BSM Customer Portal</title>
        <meta name="description" content="Get help and support for BSM platform" />
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
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600 dark:bg-primary-900 dark:text-primary-300 dark:border-primary-400' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
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
          <header className="bg-white dark:bg-zinc-900 shadow-sm border-b border-gray-200 dark:border-zinc-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                  Help Center
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </button>

                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-zinc-700 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">Customer User</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="card dark:bg-zinc-900 dark:border-zinc-800">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search help articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-zinc-800 dark:text-zinc-100"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100"
                    >
                      <Filter size={20} />
                      <span>Filters</span>
                    </button>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-800 dark:text-zinc-100"
                    >
                      <option value="relevance">Sort by Relevance</option>
                      <option value="views">Sort by Views</option>
                      <option value="likes">Sort by Likes</option>
                      <option value="recent">Sort by Recent</option>
                    </select>
                  </div>
                </div>

                {showFilters && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Difficulty</label>
                        <select
                          value={filterDifficulty}
                          onChange={(e) => setFilterDifficulty(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-800 dark:text-zinc-100"
                        >
                          <option value="all">All Levels</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Featured Articles */}
              {!searchTerm && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-4">Featured Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredArticles.map((article) => (
                      <div key={article.id} className="card dark:bg-zinc-900 dark:border-zinc-800">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-gray-900 dark:text-zinc-100">{article.title}</h4>
                          <button
                            onClick={() => handleBookmark(article.id)}
                            className={`p-1 rounded ${
                              article.isBookmarked
                                ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
                                : 'text-gray-400 hover:text-yellow-600'
                            }`}
                          >
                            <Bookmark size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">{article.summary}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400">
                          <div className="flex items-center space-x-3">
                            <span>{article.readTime}</span>
                            <span>{article.views.toLocaleString()} views</span>
                          </div>
                          <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                            Read More
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results or Categories */}
              {searchTerm ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-4">
                    Search Results ({filteredArticles.length})
                  </h3>
                  <div className="space-y-4">
                    {filteredArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        isExpanded={expandedArticle === article.id}
                        onExpand={handleArticleExpand}
                        onBookmark={handleBookmark}
                        onLike={handleLike}
                        onShare={handleShare}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-4">Help Categories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <div
                          key={category.id}
                          className="card dark:bg-zinc-900 dark:border-zinc-800 cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                              <Icon size={24} className={category.color} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-zinc-100 mb-1">
                                {category.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-zinc-400 mb-2">
                                {category.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 dark:text-zinc-400">
                                  {category.articles.length} articles
                                </span>
                                <ChevronDown 
                                  size={16} 
                                  className={`text-gray-400 transition-transform ${
                                    selectedCategory === category.id ? 'rotate-180' : ''
                                  }`} 
                                />
                              </div>
                            </div>
                          </div>

                          {selectedCategory === category.id && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700">
                              <div className="space-y-3">
                                {category.articles.map((article) => (
                                  <ArticleCard
                                    key={article.id}
                                    article={article}
                                    isExpanded={expandedArticle === article.id}
                                    onExpand={handleArticleExpand}
                                    onBookmark={handleBookmark}
                                    onLike={handleLike}
                                    onShare={handleShare}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Support Channels */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-4">Need More Help?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {supportChannels.map((channel, index) => {
                    const Icon = channel.icon;
                    return (
                      <div key={index} className="card dark:bg-zinc-900 dark:border-zinc-800">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                            <Icon size={20} className="text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-zinc-100">{channel.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-zinc-400">{channel.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-zinc-400">
                            {channel.responseTime}
                          </span>
                          <button className={`px-3 py-1 text-sm font-medium rounded-full ${
                            channel.available
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                          }`}>
                            {channel.available ? 'Available' : 'Unavailable'}
                          </button>
                        </div>
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