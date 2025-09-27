-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE ticket_status AS ENUM ('pending', 'open', 'in_progress', 'resolved', 'closed');
CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE ticket_category AS ENUM ('technical', 'billing', 'general', 'feature_request', 'bug_report');
CREATE TYPE service_status AS ENUM ('operational', 'minor_issues', 'major_issues', 'maintenance', 'outage');
CREATE TYPE auth_method AS ENUM ('google', 'email');
CREATE TYPE notification_type AS ENUM ('ticket_created', 'ticket_updated', 'ticket_resolved', 'service_incident', 'system_maintenance', 'rating_received');

-- User profiles table
CREATE TABLE user_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    avatar TEXT,
    phone VARCHAR(20),
    location VARCHAR(100),
    bio TEXT,
    website TEXT,
    auth_method auth_method DEFAULT 'email',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Tickets table
CREATE TABLE tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    subject VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category ticket_category DEFAULT 'general',
    priority ticket_priority DEFAULT 'medium',
    status ticket_status DEFAULT 'pending',
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    tags JSONB DEFAULT '[]',
    attachments JSONB DEFAULT '[]'
);

-- Ticket comments table
CREATE TABLE ticket_comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status service_status DEFAULT 'operational',
    health_score INTEGER DEFAULT 100 CHECK (health_score >= 0 AND health_score <= 100),
    category VARCHAR(50),
    features JSONB DEFAULT '[]',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- Service incidents table
CREATE TABLE service_incidents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(20) CHECK (status IN ('investigating', 'identified', 'monitoring', 'resolved')),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Ratings table
CREATE TABLE ratings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    category VARCHAR(50) CHECK (category IN ('support', 'response_time', 'resolution', 'overall')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Models table
CREATE TABLE ai_models (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    model_type VARCHAR(50),
    version VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    accuracy_score FLOAT,
    config JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Predictions table
CREATE TABLE ai_predictions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    model_id UUID REFERENCES ai_models(id) ON DELETE CASCADE,
    input_data JSONB NOT NULL,
    prediction JSONB NOT NULL,
    confidence_score FLOAT NOT NULL,
    actual_result JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Insights table
CREATE TABLE ai_insights (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    insight_type VARCHAR(50) CHECK (insight_type IN ('ticket_assignment', 'churn_prediction', 'upsell_opportunity', 'workflow_optimization', 'content_recommendation')),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    confidence FLOAT NOT NULL,
    data JSONB DEFAULT '{}',
    is_actionable BOOLEAN DEFAULT TRUE,
    is_implemented BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Training Data table
CREATE TABLE ai_training_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    data_type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    labels JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    is_processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_tickets_created_by ON tickets(created_by);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_created_at ON tickets(created_at);
CREATE INDEX idx_ticket_comments_ticket_id ON ticket_comments(ticket_id);
CREATE INDEX idx_ratings_user_id ON ratings(user_id);
CREATE INDEX idx_ratings_ticket_id ON ratings(ticket_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_services_is_active ON services(is_active);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ticket_comments_updated_at BEFORE UPDATE ON ticket_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_models_updated_at BEFORE UPDATE ON ai_models FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_training_data ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON user_profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- Tickets policies
CREATE POLICY "Users can view own tickets" ON tickets FOR SELECT USING (auth.uid() = created_by);
CREATE POLICY "Users can create tickets" ON tickets FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update own tickets" ON tickets FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Admins can view all tickets" ON tickets FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- Ticket comments policies
CREATE POLICY "Users can view comments on their tickets" ON ticket_comments FOR SELECT USING (
    EXISTS (SELECT 1 FROM tickets WHERE id = ticket_id AND created_by = auth.uid())
);
CREATE POLICY "Users can create comments on their tickets" ON ticket_comments FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM tickets WHERE id = ticket_id AND created_by = auth.uid())
);
CREATE POLICY "Admins can view all comments" ON ticket_comments FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- Services policies (public read)
CREATE POLICY "Anyone can view active services" ON services FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admins can manage services" ON services FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- Ratings policies
CREATE POLICY "Users can view own ratings" ON ratings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create ratings" ON ratings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own ratings" ON ratings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all ratings" ON ratings FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can create notifications" ON notifications FOR INSERT WITH CHECK (TRUE);

-- AI models policies (admin only)
CREATE POLICY "Admins can manage AI models" ON ai_models FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- AI predictions policies (admin only)
CREATE POLICY "Admins can manage AI predictions" ON ai_predictions FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- AI insights policies
CREATE POLICY "Users can view actionable insights" ON ai_insights FOR SELECT USING (is_actionable = TRUE);
CREATE POLICY "Admins can manage insights" ON ai_insights FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- AI training data policies (admin only)
CREATE POLICY "Admins can manage training data" ON ai_training_data FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- Insert sample data
INSERT INTO services (name, description, status, health_score, category, features) VALUES
('Email Services', 'Corporate email hosting and management services', 'operational', 95, 'Communication', '["Email hosting", "Calendar integration", "Mobile sync", "Spam protection"]'),
('File Storage', 'Secure cloud storage and file sharing platform', 'operational', 88, 'Storage', '["Cloud storage", "File sharing", "Version control", "Access control"]'),
('Database Services', 'Managed database hosting and maintenance', 'operational', 92, 'Data', '["Database hosting", "Backup services", "Performance monitoring", "Security updates"]'),
('API Gateway', 'Centralized API management and routing', 'operational', 98, 'Infrastructure', '["API routing", "Rate limiting", "Authentication", "Monitoring"]'),
('CDN Services', 'Content delivery network for global performance', 'operational', 99, 'Infrastructure', '["Global CDN", "Caching", "DDoS protection", "SSL/TLS"]');

-- Insert sample AI models
INSERT INTO ai_models (name, model_type, version, is_active, accuracy_score, config) VALUES
('Ticket Classification', 'classification', '1.0', TRUE, 0.92, '{"algorithm": "BERT", "max_length": 512}'),
('Sentiment Analysis', 'nlp', '2.1', TRUE, 0.88, '{"algorithm": "RoBERTa", "threshold": 0.7}'),
('Churn Prediction', 'regression', '1.5', TRUE, 0.85, '{"algorithm": "XGBoost", "features": 50}'),
('Recommendation Engine', 'recommendation', '3.0', TRUE, 0.91, '{"algorithm": "Collaborative Filtering", "k": 10}');

-- Create functions for common operations
CREATE OR REPLACE FUNCTION get_user_ticket_stats(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total', COUNT(*),
        'open', COUNT(*) FILTER (WHERE status = 'open'),
        'in_progress', COUNT(*) FILTER (WHERE status = 'in_progress'),
        'resolved', COUNT(*) FILTER (WHERE status = 'resolved'),
        'closed', COUNT(*) FILTER (WHERE status = 'closed'),
        'pending', COUNT(*) FILTER (WHERE status = 'pending')
    ) INTO result
    FROM tickets
    WHERE created_by = user_uuid;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_service_status_overview()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_services', COUNT(*),
        'operational', COUNT(*) FILTER (WHERE status = 'operational'),
        'minor_issues', COUNT(*) FILTER (WHERE status = 'minor_issues'),
        'major_issues', COUNT(*) FILTER (WHERE status = 'major_issues'),
        'maintenance', COUNT(*) FILTER (WHERE status = 'maintenance'),
        'outage', COUNT(*) FILTER (WHERE status = 'outage'),
        'overall_status', CASE
            WHEN COUNT(*) FILTER (WHERE status = 'outage') > 0 THEN 'outage'
            WHEN COUNT(*) FILTER (WHERE status = 'major_issues') > 0 THEN 'major_issues'
            WHEN COUNT(*) FILTER (WHERE status = 'minor_issues') > 0 THEN 'minor_issues'
            WHEN COUNT(*) FILTER (WHERE status = 'maintenance') > 0 THEN 'maintenance'
            ELSE 'operational'
        END
    ) INTO result
    FROM services
    WHERE is_active = TRUE;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('server', 'network', 'application', 'database', 'storage')),
    status VARCHAR(50) NOT NULL DEFAULT 'operational' CHECK (status IN ('operational', 'degraded', 'outage', 'maintenance')),
    priority VARCHAR(50) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    location VARCHAR(255),
    ip_address INET,
    os VARCHAR(100),
    version VARCHAR(50),
    owner_id UUID REFERENCES users(id),
    account_id UUID REFERENCES accounts(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tickets table
CREATE TABLE IF NOT EXISTS tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Pending', 'Resolved', 'Closed')),
    priority VARCHAR(50) NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    category VARCHAR(100),
    subcategory VARCHAR(100),
    assigned_to UUID REFERENCES users(id),
    created_by UUID REFERENCES users(id),
    account_id UUID REFERENCES accounts(id),
    asset_id UUID REFERENCES assets(id),
    resolution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dashboard stats table
CREATE TABLE IF NOT EXISTS dashboard_stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    metric_unit VARCHAR(20),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Knowledge base table
CREATE TABLE IF NOT EXISTS knowledge_base (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    tags TEXT[],
    author_id UUID REFERENCES users(id),
    views INTEGER DEFAULT 0,
    helpful_votes INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('info', 'warning', 'error', 'success')),
    read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service requests table
CREATE TABLE IF NOT EXISTS service_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('incident', 'request', 'change', 'problem')),
    status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'assigned', 'in_progress', 'resolved', 'closed')),
    priority VARCHAR(50) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    requester_id UUID REFERENCES users(id),
    assignee_id UUID REFERENCES users(id),
    account_id UUID REFERENCES accounts(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workflows table
CREATE TABLE IF NOT EXISTS workflows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    trigger_event VARCHAR(100),
    conditions JSONB,
    actions JSONB,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Integrations table
CREATE TABLE IF NOT EXISTS integrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
    config JSONB,
    last_sync TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rules table
CREATE TABLE IF NOT EXISTS rules (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    condition JSONB NOT NULL,
    action JSONB NOT NULL,
    priority INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE rules ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can read all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Accounts policies
CREATE POLICY "Users can read accounts" ON accounts
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage accounts" ON accounts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Assets policies
CREATE POLICY "Users can read assets" ON assets
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage assets" ON assets
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Tickets policies
CREATE POLICY "Users can read own tickets" ON tickets
    FOR SELECT USING (auth.uid() = created_by OR auth.uid() = assigned_to);

CREATE POLICY "Users can create tickets" ON tickets
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own tickets" ON tickets
    FOR UPDATE USING (auth.uid() = created_by OR auth.uid() = assigned_to);

CREATE POLICY "Admins can manage all tickets" ON tickets
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Dashboard stats policies
CREATE POLICY "Users can read own stats" ON dashboard_stats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own stats" ON dashboard_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Knowledge base policies
CREATE POLICY "Everyone can read published knowledge base" ON knowledge_base
    FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can manage own articles" ON knowledge_base
    FOR ALL USING (auth.uid() = author_id);

-- Notifications policies
CREATE POLICY "Users can read own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Service requests policies
CREATE POLICY "Users can read own service requests" ON service_requests
    FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = assignee_id);

CREATE POLICY "Users can create service requests" ON service_requests
    FOR INSERT WITH CHECK (auth.uid() = requester_id);

-- Workflows policies
CREATE POLICY "Admins can manage workflows" ON workflows
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Integrations policies
CREATE POLICY "Admins can manage integrations" ON integrations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Rules policies
CREATE POLICY "Admins can manage rules" ON rules
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Insert sample data
INSERT INTO users (id, email, name, role, company, department) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'admin@bsm.com', 'Admin User', 'admin', 'BSM Corp', 'IT'),
    ('550e8400-e29b-41d4-a716-446655440001', 'customer@bsm.com', 'John Customer', 'customer', 'Customer Corp', 'Operations'),
    ('550e8400-e29b-41d4-a716-446655440002', 'agent@bsm.com', 'Support Agent', 'agent', 'BSM Corp', 'Support');

INSERT INTO accounts (id, name, type, status, industry, size, contact_email) VALUES
    ('660e8400-e29b-41d4-a716-446655440000', 'Customer Corp', 'enterprise', 'active', 'Technology', '1000+', 'contact@customer.com'),
    ('660e8400-e29b-41d4-a716-446655440001', 'Small Business Inc', 'small_business', 'active', 'Retail', '50-100', 'info@smallbiz.com');

INSERT INTO assets (id, name, type, status, priority, location, ip_address, owner_id, account_id) VALUES
    ('770e8400-e29b-41d4-a716-446655440000', 'Web Server 01', 'server', 'operational', 'high', 'Data Center A', '192.168.1.100', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000'),
    ('770e8400-e29b-41d4-a716-446655440001', 'Database Server', 'database', 'operational', 'critical', 'Data Center A', '192.168.1.101', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000');

INSERT INTO tickets (id, subject, description, status, priority, category, created_by, assigned_to, account_id) VALUES
    ('880e8400-e29b-41d4-a716-446655440000', 'Login Issue', 'Cannot access the portal', 'Open', 'High', 'Authentication', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440000'),
    ('880e8400-e29b-41d4-a716-446655440001', 'Feature Request', 'Need new dashboard widget', 'In Progress', 'Medium', 'Enhancement', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440000'),
    ('880e8400-e29b-41d4-a716-446655440002', 'Bug Report', 'Chart not displaying correctly', 'Resolved', 'High', 'Bug', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440000');

INSERT INTO dashboard_stats (user_id, metric_name, metric_value, metric_unit) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'total_tickets', 150, 'count'),
    ('550e8400-e29b-41d4-a716-446655440000', 'open_tickets', 25, 'count'),
    ('550e8400-e29b-41d4-a716-446655440000', 'resolved_tickets', 125, 'count'),
    ('550e8400-e29b-41d4-a716-446655440000', 'avg_resolution_time', 4.5, 'hours'),
    ('550e8400-e29b-41d4-a716-446655440001', 'my_tickets', 3, 'count'),
    ('550e8400-e29b-41d4-a716-446655440001', 'open_tickets', 1, 'count'),
    ('550e8400-e29b-41d4-a716-446655440001', 'resolved_tickets', 2, 'count'),
    ('550e8400-e29b-41d4-a716-446655440001', 'satisfaction_score', 4.2, 'rating');

INSERT INTO knowledge_base (id, title, content, category, tags, author_id, views, helpful_votes) VALUES
    ('990e8400-e29b-41d4-a716-446655440000', 'How to Reset Password', 'Step-by-step guide to reset your password...', 'Authentication', ARRAY['password', 'login', 'security'], '550e8400-e29b-41d4-a716-446655440000', 45, 12),
    ('990e8400-e29b-41d4-a716-446655440001', 'Creating Support Tickets', 'Learn how to create effective support tickets...', 'General', ARRAY['tickets', 'support', 'help'], '550e8400-e29b-41d4-a716-446655440000', 78, 23);

INSERT INTO notifications (id, user_id, title, message, type, read, priority) VALUES
    ('aa0e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', 'New Ticket Assigned', 'You have been assigned a new high-priority ticket', 'info', false, 'high'),
    ('aa0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'System Maintenance', 'Scheduled maintenance will occur tonight at 2 AM', 'warning', true, 'medium');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_knowledge_base_updated_at BEFORE UPDATE ON knowledge_base FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_requests_updated_at BEFORE UPDATE ON service_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON workflows FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rules_updated_at BEFORE UPDATE ON rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();