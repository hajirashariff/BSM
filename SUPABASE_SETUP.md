# BSM Platform - Supabase Backend Setup

## Overview
This project uses Supabase as the backend instead of Django. Supabase provides:
- PostgreSQL database
- Authentication
- Real-time subscriptions
- API auto-generation
- Row Level Security (RLS)

## Current Status
✅ **Demo Mode Active**: Both apps are running with mock data
✅ **Admin Dashboard**: http://localhost:3000
✅ **Customer Portal**: http://localhost:3001
❌ **Django Backend**: Removed (not needed)

## Supabase Configuration

### 1. Demo Configuration (Current)
Both apps are configured with demo Supabase credentials:
- **URL**: `https://bsm-demo.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (demo key)
- **Status**: Mock data services active

### 2. Production Setup (Next Steps)

#### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

#### Step 2: Update Environment Variables
Create `.env.local` files in both apps:

**Admin Dashboard** (`apps/admin-dashboard/.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Customer Portal** (`apps/customer-portal/.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Step 3: Database Schema
Run the SQL schema in your Supabase SQL editor:

```sql
-- BSM Platform Database Schema
-- Run this in Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'customer', 'agent')),
    company VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tickets table
CREATE TABLE tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Pending', 'Resolved', 'Closed')),
    priority VARCHAR(50) NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    category VARCHAR(100),
    assigned_to UUID REFERENCES users(id),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dashboard stats table
CREATE TABLE dashboard_stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    metric_unit VARCHAR(20),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_stats ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Tickets policies
CREATE POLICY "Users can read own tickets" ON tickets
    FOR SELECT USING (auth.uid() = created_by OR auth.uid() = assigned_to);

CREATE POLICY "Users can create tickets" ON tickets
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own tickets" ON tickets
    FOR UPDATE USING (auth.uid() = created_by OR auth.uid() = assigned_to);

-- Dashboard stats policies
CREATE POLICY "Users can read own stats" ON dashboard_stats
    FOR SELECT USING (auth.uid() = user_id);

-- Insert sample data
INSERT INTO users (id, email, name, role, company) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'admin@bsm.com', 'Admin User', 'admin', 'BSM Corp'),
    ('550e8400-e29b-41d4-a716-446655440001', 'customer@bsm.com', 'John Customer', 'customer', 'Customer Corp'),
    ('550e8400-e29b-41d4-a716-446655440002', 'agent@bsm.com', 'Support Agent', 'agent', 'BSM Corp');

INSERT INTO tickets (subject, description, status, priority, category, created_by, assigned_to) VALUES
    ('Login Issue', 'Cannot access the portal', 'Open', 'High', 'Authentication', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002'),
    ('Feature Request', 'Need new dashboard widget', 'In Progress', 'Medium', 'Enhancement', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002'),
    ('Bug Report', 'Chart not displaying correctly', 'Resolved', 'High', 'Bug', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002');

INSERT INTO dashboard_stats (user_id, metric_name, metric_value, metric_unit) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'total_tickets', 150, 'count'),
    ('550e8400-e29b-41d4-a716-446655440000', 'open_tickets', 25, 'count'),
    ('550e8400-e29b-41d4-a716-446655440000', 'resolved_tickets', 125, 'count'),
    ('550e8400-e29b-41d4-a716-446655440000', 'avg_resolution_time', 4.5, 'hours'),
    ('550e8400-e29b-41d4-a716-446655440001', 'my_tickets', 3, 'count'),
    ('550e8400-e29b-41d4-a716-446655440001', 'open_tickets', 1, 'count'),
    ('550e8400-e29b-41d4-a716-446655440001', 'resolved_tickets', 2, 'count'),
    ('550e8400-e29b-41d4-a716-446655440001', 'satisfaction_score', 4.2, 'rating');
```

#### Step 4: Authentication Setup
1. Go to Authentication > Settings in Supabase
2. Configure your site URL: `http://localhost:3000` and `http://localhost:3001`
3. Set up email templates if needed
4. Configure OAuth providers if needed

#### Step 5: Test Connection
1. Restart both apps: `npm run dev`
2. Check browser console for "🚀 Using demo Supabase configuration" message
3. Verify data is loading from Supabase instead of mock data

## File Structure
```
BSM-1/
├── apps/
│   ├── admin-dashboard/          # Admin dashboard (port 3000)
│   │   ├── src/lib/
│   │   │   ├── supabase.ts       # Supabase client
│   │   │   ├── supabaseService.ts # Data service layer
│   │   │   ├── mockData.ts       # Mock data
│   │   │   └── mockSupabaseService.ts # Mock service
│   │   └── .env.local            # Environment variables
│   └── customer-portal/          # Customer portal (port 3001)
│       ├── src/lib/
│       │   ├── supabase.ts       # Supabase client
│       │   ├── supabaseService.ts # Data service layer
│       │   ├── mockData.ts       # Mock data
│       │   └── mockSupabaseService.ts # Mock service
│       └── .env.local            # Environment variables
└── SUPABASE_SETUP.md            # This file
```

## Development Commands
```bash
# Start admin dashboard
cd apps/admin-dashboard && npm run dev

# Start customer portal
cd apps/customer-portal && npm run dev

# Install dependencies
npm install

# Build for production
npm run build
```

## Troubleshooting

### Mock Data Still Showing
- Check if `.env.local` files exist and have correct values
- Restart the development servers
- Check browser console for Supabase connection messages

### Authentication Issues
- Verify Supabase project URL and keys
- Check RLS policies are correctly set up
- Ensure user is authenticated before accessing protected data

### Database Connection Issues
- Verify Supabase project is active
- Check network connectivity
- Review Supabase dashboard for any service issues

## Next Steps
1. Set up real Supabase project
2. Configure authentication
3. Implement user management
4. Add real-time features
5. Deploy to production

## Support
- Supabase Documentation: https://supabase.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Project Issues: Check GitHub repository

