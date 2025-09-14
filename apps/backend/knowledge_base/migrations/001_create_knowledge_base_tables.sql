-- Knowledge Base Migration Script
-- Version: 1.0
-- Description: Creates all tables for the Knowledge Base system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE kb_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES kb_categories(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tags table
CREATE TABLE kb_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    color VARCHAR(7) DEFAULT '#3B82F6',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Articles table
CREATE TABLE kb_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    summary TEXT,
    content_markdown TEXT NOT NULL,
    content_html TEXT,
    category_id UUID REFERENCES kb_categories(id) ON DELETE SET NULL,
    author_id UUID NOT NULL, -- References users table
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
    visibility VARCHAR(20) DEFAULT 'public' CHECK (visibility IN ('public', 'internal', 'private')),
    is_featured BOOLEAN DEFAULT false,
    language VARCHAR(10) DEFAULT 'en',
    product VARCHAR(100),
    version VARCHAR(50),
    seo_title VARCHAR(500),
    seo_description TEXT,
    scheduled_publish_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    view_count INTEGER DEFAULT 0,
    helpful_count INTEGER DEFAULT 0,
    not_helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Article tags junction table
CREATE TABLE kb_article_tags (
    article_id UUID REFERENCES kb_articles(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES kb_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

-- Article revisions table for versioning
CREATE TABLE kb_article_revisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID REFERENCES kb_articles(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    content_markdown TEXT NOT NULL,
    content_html TEXT,
    summary TEXT,
    revision_number INTEGER NOT NULL,
    change_summary TEXT,
    author_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Attachments table
CREATE TABLE kb_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID REFERENCES kb_articles(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    uploaded_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Article views tracking
CREATE TABLE kb_article_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID REFERENCES kb_articles(id) ON DELETE CASCADE,
    user_id UUID, -- NULL for anonymous users
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Article feedback
CREATE TABLE kb_article_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID REFERENCES kb_articles(id) ON DELETE CASCADE,
    user_id UUID, -- NULL for anonymous users
    ip_address INET,
    is_helpful BOOLEAN NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Search queries tracking
CREATE TABLE kb_search_queries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    query TEXT NOT NULL,
    user_id UUID, -- NULL for anonymous users
    ip_address INET,
    results_count INTEGER DEFAULT 0,
    clicked_article_id UUID REFERENCES kb_articles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Article approvals workflow
CREATE TABLE kb_article_approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID REFERENCES kb_articles(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    comments TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Knowledge Base settings
CREATE TABLE kb_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_kb_articles_status ON kb_articles(status);
CREATE INDEX idx_kb_articles_category ON kb_articles(category_id);
CREATE INDEX idx_kb_articles_author ON kb_articles(author_id);
CREATE INDEX idx_kb_articles_published_at ON kb_articles(published_at);
CREATE INDEX idx_kb_articles_featured ON kb_articles(is_featured);
CREATE INDEX idx_kb_articles_slug ON kb_articles(slug);

CREATE INDEX idx_kb_article_views_article ON kb_article_views(article_id);
CREATE INDEX idx_kb_article_views_date ON kb_article_views(viewed_at);

CREATE INDEX idx_kb_article_feedback_article ON kb_article_feedback(article_id);
CREATE INDEX idx_kb_article_feedback_helpful ON kb_article_feedback(is_helpful);

CREATE INDEX idx_kb_search_queries_date ON kb_search_queries(created_at);
CREATE INDEX idx_kb_search_queries_query ON kb_search_queries(query);

-- Full-text search index for articles
CREATE INDEX idx_kb_articles_fts ON kb_articles USING gin(
    to_tsvector('english', title || ' ' || COALESCE(summary, '') || ' ' || content_markdown)
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_kb_categories_updated_at BEFORE UPDATE ON kb_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_kb_tags_updated_at BEFORE UPDATE ON kb_tags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_kb_articles_updated_at BEFORE UPDATE ON kb_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default settings
INSERT INTO kb_settings (key, value, description) VALUES
('site_title', 'Knowledge Base', 'Site title for the knowledge base'),
('site_description', 'Help and documentation for our products', 'Site description for SEO'),
('articles_per_page', '20', 'Number of articles to show per page'),
('enable_comments', 'true', 'Enable comments on articles'),
('enable_feedback', 'true', 'Enable helpful/not helpful feedback'),
('auto_publish', 'false', 'Auto-publish articles without review'),
('search_enabled', 'true', 'Enable search functionality'),
('analytics_enabled', 'true', 'Enable analytics tracking'),
('max_attachment_size', '10485760', 'Maximum attachment size in bytes (10MB)'),
('allowed_file_types', 'pdf,doc,docx,txt,jpg,jpeg,png,gif', 'Allowed file types for attachments');

-- Insert default categories
INSERT INTO kb_categories (name, slug, description) VALUES
('Getting Started', 'getting-started', 'Basic setup and getting started guides'),
('User Guide', 'user-guide', 'Detailed user documentation'),
('Troubleshooting', 'troubleshooting', 'Common issues and solutions'),
('API Reference', 'api-reference', 'API documentation and examples'),
('FAQ', 'faq', 'Frequently asked questions');

-- Insert default tags
INSERT INTO kb_tags (name, slug, color, description) VALUES
('beginner', 'beginner', '#10B981', 'Content suitable for beginners'),
('advanced', 'advanced', '#F59E0B', 'Advanced topics and features'),
('tutorial', 'tutorial', '#3B82F6', 'Step-by-step tutorials'),
('reference', 'reference', '#8B5CF6', 'Reference documentation'),
('troubleshooting', 'troubleshooting', '#EF4444', 'Problem-solving guides'),
('feature', 'feature', '#06B6D4', 'Feature explanations'),
('integration', 'integration', '#84CC16', 'Integration guides'),
('security', 'security', '#F97316', 'Security-related content');


