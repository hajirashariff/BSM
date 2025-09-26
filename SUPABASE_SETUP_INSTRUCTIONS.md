# 🚀 BSM Platform - Supabase Setup Instructions

## ✅ Current Status
- **Supabase Connection**: ✅ Working
- **Admin Dashboard**: ✅ Running on http://localhost:3000
- **Customer Portal**: ✅ Running on http://localhost:3001
- **Database Schema**: ⚠️ Needs to be created

## 📋 Step-by-Step Setup

### 1. Access Your Supabase Project
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `fcdfwqengcmtsatrkwin`
3. Navigate to **SQL Editor** in the left sidebar

### 2. Create Database Schema
1. In the SQL Editor, click **"New Query"**
2. Copy the entire content from `supabase-schema.sql` file
3. Paste it into the SQL Editor
4. Click **"Run"** to execute the schema

### 3. Verify Tables Created
After running the schema, you should see these tables in **Table Editor**:
- ✅ `users` - User management
- ✅ `accounts` - Account information
- ✅ `assets` - Asset management
- ✅ `tickets` - Support tickets
- ✅ `dashboard_stats` - Dashboard metrics
- ✅ `knowledge_base` - Knowledge articles
- ✅ `notifications` - User notifications
- ✅ `service_requests` - Service requests
- ✅ `workflows` - Workflow definitions
- ✅ `integrations` - Integration settings
- ✅ `rules` - Business rules

### 4. Test Data
The schema includes sample data:
- 3 users (admin, customer, agent)
- 2 accounts
- 2 assets
- 3 tickets
- Dashboard statistics
- Knowledge base articles
- Notifications

### 5. Verify Integration
1. **Admin Dashboard**: Visit http://localhost:3000
2. **Customer Portal**: Visit http://localhost:3001
3. Check browser console for: `🚀 Connected to real Supabase project for BSM Platform`
4. Verify data is loading from Supabase (not mock data)

## 🔧 Configuration Details

### Environment Variables
Both apps are configured with:
```env
NEXT_PUBLIC_SUPABASE_URL=https://fcdfwqengcmtsatrkwin.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Database Features
- **Row Level Security (RLS)**: Enabled on all tables
- **Authentication**: Supabase Auth integration
- **Real-time**: Subscriptions available
- **API**: Auto-generated REST and GraphQL APIs

## 🧪 Testing the Integration

### Test Connection
```bash
node test-supabase-connection.js
```

### Expected Output
```
✅ Supabase connection successful!
✅ Table 'users' is accessible
✅ Table 'tickets' is accessible
✅ Table 'accounts' is accessible
✅ Table 'assets' is accessible
✅ Table 'dashboard_stats' is accessible
```

## 🔐 Authentication Setup

### 1. Configure Auth Settings
1. Go to **Authentication > Settings** in Supabase
2. Set **Site URL**: `http://localhost:3000,http://localhost:3001`
3. Configure **Email Templates** if needed

### 2. Enable Auth Providers
1. Go to **Authentication > Providers**
2. Enable **Email** provider
3. Optionally enable **Google**, **GitHub**, etc.

### 3. Test Authentication
1. Create a test user in **Authentication > Users**
2. Test login flow in both apps

## 📊 Data Management

### View Data
1. Go to **Table Editor** in Supabase
2. Browse tables and verify sample data
3. Use **SQL Editor** for custom queries

### Add More Data
1. Use **Table Editor** to add records
2. Or use **SQL Editor** for bulk operations
3. Data will appear in both apps immediately

## 🚨 Troubleshooting

### Connection Issues
- Verify API keys are correct
- Check Supabase project is active
- Ensure network connectivity

### Data Not Loading
- Check browser console for errors
- Verify RLS policies are correct
- Test with SQL Editor queries

### Authentication Issues
- Check Auth settings in Supabase
- Verify site URLs are configured
- Test with different browsers

## 📈 Next Steps

1. **Complete Setup**: Run the SQL schema
2. **Test Data Flow**: Verify data appears in both apps
3. **Configure Auth**: Set up user authentication
4. **Customize**: Add your own data and configurations
5. **Deploy**: Prepare for production deployment

## 🆘 Support

- **Supabase Docs**: https://supabase.com/docs
- **Project Issues**: Check GitHub repository
- **Community**: Supabase Discord/Forum

---

**🎉 Once the schema is created, your BSM Platform will be fully integrated with Supabase!**

