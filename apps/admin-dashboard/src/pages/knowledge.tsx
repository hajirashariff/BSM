import React, { useState } from 'react';
import { BookOpen, FileText, Folder, TrendingUp, Eye, ThumbsUp, Search, Plus, BarChart3, CheckCircle2, Star, Edit } from 'lucide-react';

const KnowledgePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewArticleModal, setShowNewArticleModal] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const mockData = {
    articles: [
      { id: '1', title: 'Welcome to Our Platform', status: 'published', views: 1250, helpful: 90, category: 'Getting Started', featured: true },
      { id: '2', title: 'Account Setup Guide', status: 'published', views: 890, helpful: 91, category: 'Account Management', featured: true },
      { id: '3', title: 'Billing and Payment Methods', status: 'published', views: 650, helpful: 80, category: 'Billing & Payments', featured: false },
      { id: '4', title: 'API Authentication Guide', status: 'review', views: 420, helpful: 88, category: 'API Documentation', featured: false },
      { id: '5', title: 'Troubleshooting Common Issues', status: 'published', views: 1100, helpful: 89, category: 'Technical Support', featured: false }
    ],
    categories: [
      { id: '1', name: 'Getting Started', count: 1 },
      { id: '2', name: 'Account Management', count: 1 },
      { id: '3', name: 'Billing & Payments', count: 1 },
      { id: '4', name: 'Technical Support', count: 1 },
      { id: '5', name: 'API Documentation', count: 1 }
    ],
    analytics: {
      totalArticles: 5,
      publishedArticles: 4,
      totalViews: 4310,
      totalFeedback: 195
    }
  };

  const [articles, setArticles] = useState(mockData.articles);
  const [categories, setCategories] = useState(mockData.categories);
  const [newArticleForm, setNewArticleForm] = useState({
    title: '',
    category: 'Getting Started',
    content: ''
  });
  const [newCategoryForm, setNewCategoryForm] = useState({
    name: '',
    description: ''
  });

  // Handler functions
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleNewArticle = () => {
    setShowNewArticleModal(true);
  };

  const handleNewCategory = () => {
    setShowNewCategoryModal(true);
  };

  const handleEditArticle = (article: any) => {
    setSelectedArticle(article);
    alert(`Editing article: ${article.title}`);
  };

  const handleViewArticle = (article: any) => {
    alert(`Viewing article: ${article.title}\nStatus: ${article.status}\nViews: ${article.views}\nHelpful: ${article.helpful}%`);
  };

  const handleCloseModal = () => {
    setShowNewArticleModal(false);
    setShowNewCategoryModal(false);
    setSelectedArticle(null);
    setNewArticleForm({ title: '', category: 'Getting Started', content: '' });
    setNewCategoryForm({ name: '', description: '' });
  };

  const handleCreateArticle = () => {
    if (!newArticleForm.title.trim()) {
      alert('Please enter a title for the article');
      return;
    }

    const newArticle = {
      id: (articles.length + 1).toString(),
      title: newArticleForm.title,
      status: 'review',
      views: 0,
      helpful: 0,
      category: newArticleForm.category,
      featured: false
    };

    setArticles([...articles, newArticle]);
    alert('Article created successfully!');
    handleCloseModal();
  };

  const handleCreateCategory = () => {
    if (!newCategoryForm.name.trim()) {
      alert('Please enter a category name');
      return;
    }

    const newCategory = {
      id: (categories.length + 1).toString(),
      name: newCategoryForm.name,
      count: 0
    };

    setCategories([...categories, newCategory]);
    alert('Category created successfully!');
    handleCloseModal();
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'categories', label: 'Categories', icon: Folder }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Articles</p>
              <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{articles.filter(a => a.status === 'published').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{articles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <ThumbsUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.analytics.totalFeedback}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Moved Analytics Quick View into Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Searches</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-900">how to setup account</span>
              <span className="text-xs text-gray-500">3 results</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-900">billing issues</span>
              <span className="text-xs text-gray-500">2 results</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Zero Result Searches</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-900">mobile app download</span>
              <span className="text-xs text-red-500">0 results</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArticles = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button 
            onClick={handleNewArticle}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Article</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Article</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Helpful %</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleViewArticle(article)}
                          className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                        >
                          {article.title}
                        </button>
                        {article.featured && <Star className="w-4 h-4 text-yellow-500" />}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    article.status === 'published' ? 'text-green-600 bg-green-100' : 'text-blue-600 bg-blue-100'
                  }`}>
                    {article.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.views.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.helpful}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditArticle(article)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit Article"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleViewArticle(article)}
                      className="text-green-600 hover:text-green-900"
                      title="View Article"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
        <button 
          onClick={handleNewCategory}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Folder className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} articles</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // removed separate Analytics tab; content moved to Overview

  // settings tab fully removed

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'articles': return renderArticles();
      case 'categories': return renderCategories();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Manage articles, categories, and analytics</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="px-6 py-8">
        {renderTabContent()}
      </div>

      {/* New Article Modal */}
      {showNewArticleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Article</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  value={newArticleForm.title}
                  onChange={(e) => setNewArticleForm({...newArticleForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter article title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  value={newArticleForm.category}
                  onChange={(e) => setNewArticleForm({...newArticleForm, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea 
                  value={newArticleForm.content}
                  onChange={(e) => setNewArticleForm({...newArticleForm, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="Enter article content"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateArticle}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Category Modal */}
      {showNewCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input 
                  type="text" 
                  value={newCategoryForm.name}
                  onChange={(e) => setNewCategoryForm({...newCategoryForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  value={newCategoryForm.description}
                  onChange={(e) => setNewCategoryForm({...newCategoryForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder="Enter category description"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgePage;


