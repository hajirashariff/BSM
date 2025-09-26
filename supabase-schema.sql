-- BSM Platform Complete Database Schema
-- Run this SQL in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'Customer' CHECK (role IN ('Customer', 'Admin')),
  avatar_url TEXT,
  phone VARCHAR(20),
  department VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  account_type VARCHAR(50) NOT NULL CHECK (account_type IN ('Enterprise', 'SMB', 'Startup', 'Individual')),
  status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Suspended', 'Pending')),
  industry VARCHAR(100),
  size VARCHAR(50),
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  description TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assets table
CREATE TABLE IF NOT EXISTS assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('Hardware', 'Software', 'Service', 'License', 'Document')),
  category VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Maintenance', 'Retired')),
  value DECIMAL(15,2),
  location VARCHAR(255),
  assigned_to UUID REFERENCES users(id),
  account_id UUID REFERENCES accounts(id),
  purchase_date DATE,
  warranty_expiry DATE,
  description TEXT,
  serial_number VARCHAR(255),
  vendor VARCHAR(255),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed', 'Cancelled')),
  priority VARCHAR(50) DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
  category VARCHAR(100),
  subcategory VARCHAR(100),
  assigned_to UUID REFERENCES users(id),
  created_by UUID REFERENCES users(id),
  account_id UUID REFERENCES accounts(id),
  asset_id UUID REFERENCES assets(id),
  due_date TIMESTAMP WITH TIME ZONE,
  resolution TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workflows table
CREATE TABLE IF NOT EXISTS workflows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'Draft' CHECK (status IN ('Draft', 'Active', 'Inactive', 'Archived')),
  category VARCHAR(100),
  trigger_type VARCHAR(100),
  conditions JSONB,
  actions JSONB,
  execution_count INTEGER DEFAULT 0,
  success_rate DECIMAL(5,2) DEFAULT 0,
  last_executed TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workflow_executions table
CREATE TABLE IF NOT EXISTS workflow_executions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_id UUID REFERENCES workflows(id),
  status VARCHAR(50) NOT NULL CHECK (status IN ('Success', 'Failure', 'Running', 'Cancelled')),
  input_data JSONB,
  output_data JSONB,
  error_message TEXT,
  execution_time_ms INTEGER,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create knowledge_base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100),
  tags TEXT[],
  status VARCHAR(50) DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published', 'Archived')),
  views INTEGER DEFAULT 0,
  helpful_votes INTEGER DEFAULT 0,
  not_helpful_votes INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  message TEXT,
  type VARCHAR(50) NOT NULL CHECK (type IN ('Info', 'Warning', 'Error', 'Success')),
  read BOOLEAN DEFAULT FALSE,
  action_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create service_requests table
CREATE TABLE IF NOT EXISTS service_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  service_type VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected', 'In Progress', 'Completed')),
  priority VARCHAR(50) DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
  requested_by UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  account_id UUID REFERENCES accounts(id),
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create integrations table
CREATE TABLE IF NOT EXISTS integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'Inactive' CHECK (status IN ('Active', 'Inactive', 'Error', 'Pending')),
  configuration JSONB,
  last_sync TIMESTAMP WITH TIME ZONE,
  sync_status VARCHAR(50),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rules table
CREATE TABLE IF NOT EXISTS rules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Draft' CHECK (status IN ('Draft', 'Active', 'Inactive')),
  priority INTEGER DEFAULT 0,
  conditions JSONB NOT NULL,
  actions JSONB NOT NULL,
  execution_count INTEGER DEFAULT 0,
  success_rate DECIMAL(5,2) DEFAULT 0,
  last_executed TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rule_executions table
CREATE TABLE IF NOT EXISTS rule_executions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_id UUID REFERENCES rules(id),
  status VARCHAR(50) NOT NULL CHECK (status IN ('Success', 'Failure')),
  input_data JSONB,
  output_data JSONB,
  error_message TEXT,
  execution_time_ms INTEGER,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rule_versions table
CREATE TABLE IF NOT EXISTS rule_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_id UUID REFERENCES rules(id),
  version VARCHAR(20) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Draft' CHECK (status IN ('Draft', 'Active', 'Inactive')),
  priority INTEGER DEFAULT 0,
  conditions JSONB NOT NULL,
  actions JSONB NOT NULL,
  change_reason TEXT,
  modified_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at 
    BEFORE UPDATE ON accounts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assets_updated_at 
    BEFORE UPDATE ON assets 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at 
    BEFORE UPDATE ON tickets 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflows_updated_at 
    BEFORE UPDATE ON workflows 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_knowledge_base_updated_at 
    BEFORE UPDATE ON knowledge_base 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_requests_updated_at 
    BEFORE UPDATE ON service_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integrations_updated_at 
    BEFORE UPDATE ON integrations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rules_updated_at 
    BEFORE UPDATE ON rules 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE rule_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rule_versions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users
CREATE POLICY "Allow authenticated users to read users" ON users
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert users" ON users
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update users" ON users
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete users" ON users
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for accounts
CREATE POLICY "Allow authenticated users to read accounts" ON accounts
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert accounts" ON accounts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update accounts" ON accounts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete accounts" ON accounts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for assets
CREATE POLICY "Allow authenticated users to read assets" ON assets
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert assets" ON assets
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update assets" ON assets
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete assets" ON assets
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for tickets
CREATE POLICY "Allow authenticated users to read tickets" ON tickets
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert tickets" ON tickets
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update tickets" ON tickets
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete tickets" ON tickets
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for workflows
CREATE POLICY "Allow authenticated users to read workflows" ON workflows
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert workflows" ON workflows
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update workflows" ON workflows
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete workflows" ON workflows
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for knowledge_base
CREATE POLICY "Allow authenticated users to read knowledge_base" ON knowledge_base
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert knowledge_base" ON knowledge_base
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update knowledge_base" ON knowledge_base
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete knowledge_base" ON knowledge_base
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for notifications
CREATE POLICY "Allow users to read their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their own notifications" ON notifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Allow users to delete their own notifications" ON notifications
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for service_requests
CREATE POLICY "Allow authenticated users to read service_requests" ON service_requests
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert service_requests" ON service_requests
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update service_requests" ON service_requests
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete service_requests" ON service_requests
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for integrations
CREATE POLICY "Allow authenticated users to read integrations" ON integrations
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert integrations" ON integrations
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update integrations" ON integrations
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete integrations" ON integrations
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for rules
CREATE POLICY "Allow authenticated users to read rules" ON rules
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert rules" ON rules
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update rules" ON rules
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete rules" ON rules
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for rule_executions
CREATE POLICY "Allow authenticated users to read rule_executions" ON rule_executions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert rule_executions" ON rule_executions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create RLS policies for rule_versions
CREATE POLICY "Allow authenticated users to read rule_versions" ON rule_versions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert rule_versions" ON rule_versions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE users;
ALTER PUBLICATION supabase_realtime ADD TABLE accounts;
ALTER PUBLICATION supabase_realtime ADD TABLE assets;
ALTER PUBLICATION supabase_realtime ADD TABLE tickets;
ALTER PUBLICATION supabase_realtime ADD TABLE workflows;
ALTER PUBLICATION supabase_realtime ADD TABLE knowledge_base;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE service_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE integrations;
ALTER PUBLICATION supabase_realtime ADD TABLE rules;

-- Insert sample data
INSERT INTO users (name, email, role) VALUES
  ('Admin User', 'admin@example.com', 'Admin'),
  ('John Doe', 'john.doe@example.com', 'Customer'),
  ('Jane Smith', 'jane.smith@example.com', 'Customer'),
  ('Mike Johnson', 'mike.johnson@example.com', 'Customer'),
  ('Sarah Wilson', 'sarah.wilson@example.com', 'Admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample accounts
INSERT INTO accounts (name, account_type, status, industry, size, email, created_by) VALUES
  ('TechCorp Inc', 'Enterprise', 'Active', 'Technology', '500+', 'contact@techcorp.com', (SELECT id FROM users WHERE email = 'admin@example.com')),
  ('StartupXYZ', 'Startup', 'Active', 'SaaS', '10-50', 'hello@startupxyz.com', (SELECT id FROM users WHERE email = 'admin@example.com')),
  ('SMB Solutions', 'SMB', 'Active', 'Consulting', '50-200', 'info@smbsolutions.com', (SELECT id FROM users WHERE email = 'admin@example.com'))
ON CONFLICT DO NOTHING;

-- Insert sample knowledge base articles
INSERT INTO knowledge_base (title, content, category, status, author_id) VALUES
  ('Welcome to BSM Pro', 'Welcome to our comprehensive Business Service Management platform. This guide will help you get started.', 'Getting Started', 'Published', (SELECT id FROM users WHERE email = 'admin@example.com')),
  ('Account Setup Guide', 'Learn how to set up your account and configure your preferences.', 'Account Management', 'Published', (SELECT id FROM users WHERE email = 'admin@example.com')),
  ('Ticket Management', 'Understanding how to create, manage, and track service tickets.', 'Technical Support', 'Published', (SELECT id FROM users WHERE email = 'admin@example.com'))
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_accounts_type ON accounts(account_type);
CREATE INDEX IF NOT EXISTS idx_accounts_status ON accounts(status);
CREATE INDEX IF NOT EXISTS idx_assets_type ON assets(type);
CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_created_by ON tickets(created_by);
CREATE INDEX IF NOT EXISTS idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_workflows_status ON workflows(status);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_status ON knowledge_base(status);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category ON knowledge_base(category);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_rules_status ON rules(status);
CREATE INDEX IF NOT EXISTS idx_rule_executions_rule_id ON rule_executions(rule_id);
CREATE INDEX IF NOT EXISTS idx_rule_versions_rule_id ON rule_versions(rule_id);

-- Create functions for knowledge base analytics
CREATE OR REPLACE FUNCTION increment_views(article_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE knowledge_base 
  SET views = views + 1 
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_helpful_votes(article_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE knowledge_base 
  SET helpful_votes = helpful_votes + 1 
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_not_helpful_votes(article_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE knowledge_base 
  SET not_helpful_votes = not_helpful_votes + 1 
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;
