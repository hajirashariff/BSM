import React, { useState } from 'react';

interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  lastUpdated: string;
  helpful: number;
  views: number;
  isExpanded?: boolean;
}

interface KnowledgeBaseProps {
  articles: KnowledgeArticle[];
  onArticleClick: (article: KnowledgeArticle) => void;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ articles, onArticleClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());

  const categories = ['all', ...Array.from(new Set(articles.map(article => article.category)))];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (articleId: string) => {
    const newExpanded = new Set(expandedArticles);
    if (newExpanded.has(articleId)) {
      newExpanded.delete(articleId);
    } else {
      newExpanded.add(articleId);
    }
    setExpandedArticles(newExpanded);
  };

  const markHelpful = (articleId: string) => {
    // In a real app, this would make an API call
    console.log(`Marked article ${articleId} as helpful`);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
          Knowledge Base & Resource Center
        </h2>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Find answers, tutorials, and troubleshooting guides for self-service support
        </p>
      </div>

      {/* Search and Filter */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              placeholder="Search articles, tags, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 40px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: '#ffffff'
              }}
            />
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '16px',
              color: '#9ca3af'
            }}>
              🔍
            </span>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: '#ffffff',
              minWidth: '150px'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
          <span>{filteredArticles.length} articles found</span>
          <span>•</span>
          <span>{articles.reduce((sum, article) => sum + article.views, 0)} total views</span>
          <span>•</span>
          <span>{articles.reduce((sum, article) => sum + article.helpful, 0)} helpful votes</span>
        </div>
      </div>

      {/* Articles List */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            {/* Article Header */}
            <div
              style={{
                padding: '20px',
                cursor: 'pointer',
                borderBottom: expandedArticles.has(article.id) ? '1px solid #e5e7eb' : 'none'
              }}
              onClick={() => {
                toggleExpanded(article.id);
                onArticleClick(article);
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0, flex: 1 }}>
                  {article.title}
                </h3>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1',
                  marginLeft: '12px'
                }}>
                  {article.category}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
                <span>Updated: {article.lastUpdated}</span>
                <span>Views: {article.views}</span>
                <span>Helpful: {article.helpful}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  {expandedArticles.has(article.id) ? 'Click to collapse' : 'Click to expand'}
                </span>
                <span style={{ fontSize: '16px', color: '#9ca3af' }}>
                  {expandedArticles.has(article.id) ? '▼' : '▶'}
                </span>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedArticles.has(article.id) && (
              <div style={{ padding: '0 20px 20px 20px' }}>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.6', color: '#374151' }}>
                    {article.content}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markHelpful(article.id);
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#f0fdf4',
                      color: '#16a34a',
                      border: '1px solid #bbf7d0',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    👍 Helpful ({article.helpful})
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // In a real app, this would open a share dialog
                      navigator.clipboard.writeText(window.location.href);
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    📤 Share
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
            No articles found
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            Try adjusting your search terms or browse different categories
          </p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;
