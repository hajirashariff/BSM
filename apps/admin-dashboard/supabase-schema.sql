-- Create users table for Supabase Admin Portal
-- Run this SQL in your Supabase SQL editor

-- Create users table first
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'Customer' CHECK (role IN ('Customer', 'Admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security AFTER creating the table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime for users table
ALTER PUBLICATION supabase_realtime ADD TABLE users;

-- Insert sample data (optional)
INSERT INTO users (name, email, role) VALUES
  ('Admin User', 'admin@example.com', 'Admin'),
  ('John Doe', 'john.doe@example.com', 'Customer'),
  ('Jane Smith', 'jane.smith@example.com', 'Customer'),
  ('Mike Johnson', 'mike.johnson@example.com', 'Customer')
ON CONFLICT (email) DO NOTHING;

-- Create policies for Row Level Security
-- Allow authenticated users to read all users
CREATE POLICY "Allow authenticated users to read users" ON users
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert users
CREATE POLICY "Allow authenticated users to insert users" ON users
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update users
CREATE POLICY "Allow authenticated users to update users" ON users
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete users
CREATE POLICY "Allow authenticated users to delete users" ON users
  FOR DELETE USING (auth.role() = 'authenticated');
