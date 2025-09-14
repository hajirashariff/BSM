import React, { useState } from 'react';
import { Search, BookOpen, Star, ThumbsUp, ThumbsDown, Clock, User, TrendingUp, ArrowLeft } from 'lucide-react';

const KnowledgePage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const mockArticles = [
    {
      id: '1',
      title: 'Welcome to Our Platform',
      summary: 'Get started with our platform and learn the basics of navigation and key features.',
      content: 'Welcome to our comprehensive business management platform! This guide will help you get started and make the most of our features.',
      category: 'Getting Started',
      author: 'Admin User',
      view_count: 1250,
      helpful_count: 45,
      not_helpful_count: 5,
      helpfulness_rate: 90,
      created_at: '2024-01-15T10:00:00Z',
      is_featured: true
    },
    {
      id: '2',
      title: 'Account Setup Guide',
      summary: 'Complete guide to setting up your account and configuring your profile.',
      content: 'This comprehensive guide will walk you through setting up your account and configuring your profile for optimal use.',
      category: 'Account Management',
      author: 'Admin User',
      view_count: 890,
      helpful_count: 32,
      not_helpful_count: 3,
      helpfulness_rate: 91.4,
      created_at: '2024-01-10T09:00:00Z',
      is_featured: true
    },
    {
      id: '3',
      title: 'Billing and Payment Methods',
      summary: 'Learn how to manage your billing, payment methods, and subscription plans.',
      content: 'Manage your subscription, payment methods, and billing information with ease.',
      category: 'Billing & Payments',
      author: 'Admin User',
      view_count: 650,
      helpful_count: 28,
      not_helpful_count: 7,
      helpfulness_rate: 80,
      created_at: '2024-01-12T13:00:00Z',
      is_featured: false
    }
  ];

  const featuredArticles = mockArticles.filter(article => article.is_featured);
  const filteredArticles = searchQuery 
    ? mockArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockArticles;

  const renderArticleDetail = (article) => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => setSelectedArticle(null)}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {article.author}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {new Date(article.created_at).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {article.view_count} views
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">{article.summary}</p>
          <div className="text-gray-800">
            {article.content}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Was this article helpful?
        </h3>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200">
            <ThumbsUp className="w-4 h-4" />
            <span>Yes</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200">
            <ThumbsDown className="w-4 h-4" />
            <span>No</span>
          </button>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          {article.helpful_count} people found this helpful out of {article.helpful_count + article.not_helpful_count} responses
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="space-y-8">
      {featuredArticles.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-yellow-400"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-700">Featured</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.view_count} views</span>
                  <span className="text-green-600 font-medium">
                    {article.helpfulness_rate}% helpful
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Articles</h2>
        <div className="space-y-4">
          {mockArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{article.summary}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {article.view_count} views
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-green-600 font-medium">
                      {article.helpfulness_rate}% helpful
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSearchResults = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Search Results for "{searchQuery}"
        </h2>
        <span className="text-sm text-gray-500">
          {filteredArticles.length} results found
        </span>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-500">Try adjusting your search terms or browse our categories.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{article.summary}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {article.view_count} views
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-green-600 font-medium">
                      {article.helpfulness_rate}% helpful
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
              <p className="text-sm text-gray-500">Find answers and get help</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {selectedArticle ? (
            renderArticleDetail(selectedArticle)
          ) : searchQuery ? (
            renderSearchResults()
          ) : (
            renderHome()
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgePage;


