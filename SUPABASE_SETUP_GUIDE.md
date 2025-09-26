# BSM Platform - Supabase Setup Guide

This guide will help you set up Supabase as the backend for the BSM Platform, including database schema, authentication, and real-time features.

## Prerequisites

- A Supabase account (free tier available at [supabase.com](https://supabase.com))
- Node.js and npm installed
- Git installed

## Step 1: Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `BSM Platform`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be created (2-3 minutes)

## Step 2: Get Project Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project-id.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## Step 3: Set Up Environment Variables

### For Admin Dashboard

Create/update `apps/admin-dashboard/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### For Customer Portal

Create/update `apps/customer-portal/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire content from `supabase-schema.sql` in the project root
4. Paste it into the SQL editor
5. Click "Run" to execute the schema

This will create:
- All necessary tables (users, accounts, assets, tickets, workflows, etc.)
- Row Level Security (RLS) policies
- Triggers for automatic timestamp updates
- Sample data
- Indexes for performance

## Step 5: Configure Authentication

### Enable Email Authentication

1. Go to **Authentication** > **Settings**
2. Under "Auth Providers", ensure "Email" is enabled
3. Configure email templates if needed

### Set Up Google OAuth (Optional)

1. Go to **Authentication** > **Settings**
2. Under "Auth Providers", click "Google"
3. Enable Google provider
4. Add your Google OAuth credentials:
   - **Client ID**: `YOUR_GOOGLE_CLIENT_ID`
   - **Client Secret**: `YOUR_GOOGLE_CLIENT_SECRET`
5. Add redirect URLs:
   - `http://localhost:3001/auth/google/callback`
   - `http://localhost:3000/auth/google/callback`

### Configure Site URL

1. Go to **Authentication** > **Settings**
2. Set **Site URL** to: `http://localhost:3001`
3. Add **Redirect URLs**:
   - `http://localhost:3001/**`
   - `http://localhost:3000/**`

## Step 6: Create Admin User

1. Go to **Authentication** > **Users**
2. Click "Add User"
3. Create an admin user:
   - **Email**: `admin@example.com`
   - **Password**: `password123`
   - **Email Confirm**: Check this box
4. Click "Create User"

## Step 7: Enable Realtime (Optional)

1. Go to **Database** > **Replication**
2. Enable realtime for the following tables:
   - `users`
   - `accounts`
   - `assets`
   - `tickets`
   - `workflows`
   - `knowledge_base`
   - `notifications`
   - `service_requests`
   - `integrations`
   - `rules`

## Step 8: Test the Setup

### Start the Applications

```bash
# Install dependencies
npm install

# Start both applications
npm run dev
```

### Test Admin Dashboard

1. Open `http://localhost:3001`
2. You should be redirected to the login page
3. Try logging in with:
   - **Email**: `admin@example.com`
   - **Password**: `password123`
4. You should be redirected to the admin dashboard

### Test Customer Portal

1. Open `http://localhost:3000`
2. The customer portal should load without authentication

### Test Google OAuth

1. Go to `http://localhost:3001/login`
2. Click "Sign in with Google"
3. Complete the OAuth flow
4. You should be redirected to the admin dashboard

## Step 9: Verify Database Connection

### Check Tables

1. Go to **Database** > **Tables** in Supabase dashboard
2. You should see all the tables created:
   - `users`
   - `accounts`
   - `assets`
   - `tickets`
   - `workflows`
   - `knowledge_base`
   - `notifications`
   - `service_requests`
   - `integrations`
   - `rules`
   - `rule_executions`
   - `rule_versions`
   - `workflow_executions`

### Check Sample Data

1. Go to **Database** > **Tables** > **users**
2. You should see sample users including the admin user
3. Check other tables for sample data

## Step 10: Configure Row Level Security

The schema includes RLS policies, but you may want to customize them:

1. Go to **Database** > **Tables**
2. Click on any table
3. Go to **RLS** tab
4. Review and modify policies as needed

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check that your environment variables are correct
   - Ensure you're using the anon key, not the service role key

2. **"Table doesn't exist" error**
   - Run the SQL schema again
   - Check that all tables were created successfully

3. **Authentication not working**
   - Verify Site URL and Redirect URLs in Supabase settings
   - Check that email authentication is enabled

4. **Google OAuth not working**
   - Verify Google OAuth credentials
   - Check that redirect URLs match exactly

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Visit the [Supabase Community](https://github.com/supabase/supabase/discussions)
- Check the project's GitHub issues

## Next Steps

Once Supabase is set up:

1. **Customize the schema** for your specific needs
2. **Set up email templates** for authentication
3. **Configure backup policies** for production
4. **Set up monitoring** and alerts
5. **Plan for scaling** as your user base grows

## Production Considerations

For production deployment:

1. **Use environment-specific Supabase projects**
2. **Set up proper backup strategies**
3. **Configure monitoring and alerts**
4. **Review and tighten RLS policies**
5. **Set up proper CORS policies**
6. **Use Supabase Edge Functions** for complex logic
7. **Set up proper logging and error tracking**

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Supabase documentation
3. Check the project's GitHub repository
4. Contact the development team

---

**Note**: This setup guide requires you to create your own Google OAuth application and update the credentials accordingly. The actual credentials are configured in the application code.
