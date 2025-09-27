-- BSM Platform Database Schema
-- Run this in Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'customer', 'agent')),
    company VARCHAR(255),
    avatar_url TEXT,
    phone VARCHAR(20),
    department VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Accounts table
CREATE TABLE IF NOT EXISTS accounts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('enterprise', 'small_business', 'individual')),
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    industry VARCHAR(100),
    size VARCHAR(50),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assets table
CREATE TABLE IF NOT EXISTS assets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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