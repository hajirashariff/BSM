# Supabase Admin Portal Setup

This admin portal is now integrated with Supabase for authentication and database management.

## Setup Instructions

### 1. Supabase Project Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to **SQL Editor**
3. Run the SQL script from `supabase-schema.sql` to create the users table and set up RLS policies

### 2. Environment Variables

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy your project URL and anon key
3. Update the `.env.local` file with your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
```

### 3. Authentication Setup

1. In Supabase dashboard, go to **Authentication** > **Users**
2. Create a test admin user:
   - Email: `admin@example.com`
   - Password: `password123`
   - Or use any email/password combination

### 4. Enable Realtime (Optional)

1. In Supabase dashboard, go to **Database** > **Replication**
2. Enable realtime for the `users` table
3. This will allow real-time updates when users are added/edited/deleted

## Features Implemented

✅ **Authentication**
- Login page with email/password
- Protected routes
- Session management
- Logout functionality

✅ **Admin Dashboard**
- Users management table
- CRUD operations (Create, Read, Update, Delete)
- Real-time updates
- Loading and error states
- Success/error messages

✅ **UI/UX**
- Clean, professional design with Tailwind CSS
- Responsive layout
- Modal forms for user management
- Status indicators and badges

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication context
├── components/
│   └── ProtectedRoute.tsx       # Route protection component
├── lib/
│   └── supabase.ts              # Supabase client configuration
├── pages/
│   ├── _app.tsx                 # App wrapper with AuthProvider
│   ├── index.tsx                # Main dashboard (redirects to admin)
│   ├── login.tsx                # Login page
│   └── admin.tsx                 # Admin dashboard with user management
└── supabase-schema.sql          # Database schema
```

## Usage

1. Start the development server: `npm run dev:admin`
2. Navigate to `http://localhost:3001`
3. You'll be redirected to the login page
4. Use your Supabase user credentials to log in
5. Access the admin dashboard with full CRUD functionality

## Security Features

- Row Level Security (RLS) enabled on users table
- Authentication required for all operations
- Protected routes that redirect to login if not authenticated
- Secure environment variable handling

## Next Steps

- Customize the UI to match your brand
- Add more user fields as needed
- Implement user roles and permissions
- Add data validation and error handling
- Set up email verification for new users
- Add audit logging for user actions
