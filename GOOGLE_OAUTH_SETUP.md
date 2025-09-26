# Google OAuth Setup Guide

## Overview
This guide will help you set up Google OAuth authentication for the BSM Pro platform.

## Prerequisites
- Google Cloud Console account
- Access to create OAuth 2.0 credentials

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)

## Step 2: Configure OAuth Consent Screen

1. In Google Cloud Console, go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have Google Workspace)
3. Fill in the required information:
   - App name: "BSM Pro"
   - User support email: your email
   - Developer contact information: your email
4. Add scopes:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
5. Add test users (for development)

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - `http://localhost:3001/auth/google/callback` (for development)
   - `https://yourdomain.com/auth/google/callback` (for production)
5. Copy the Client ID

## Step 4: Update Configuration

### Frontend Configuration
Update the client ID in the following files:

1. **Login Page** (`apps/admin-dashboard/src/pages/login.tsx`):
   ```typescript
   // Replace this line:
   client_id: 'your-google-client-id.apps.googleusercontent.com'
   
   // With your actual client ID:
   client_id: 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com'
   ```

2. **Google Auth URL** (same file):
   ```typescript
   // Replace this line:
   client_id=your-google-client-id.apps.googleusercontent.com&
   
   // With your actual client ID:
   client_id=YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com&
   ```

### Backend Configuration
Update the backend configuration in `apps/backend/ai_services/views.py`:

```python
# In the google_auth_config function, update:
config = {
    'client_id': 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com',
    'redirect_uri': 'http://localhost:3001/auth/google/callback',
    'scope': 'email profile',
    'response_type': 'code'
}
```

## Step 5: Environment Variables (Optional)

For production, you can use environment variables:

### Frontend (.env.local)
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com
```

### Backend (.env)
```
GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
```

## Step 6: Test the Integration

1. Start the development servers:
   ```bash
   npm run dev
   ```

2. Navigate to the login page: `http://localhost:3001/login`

3. Click "Sign in with Google"

4. Complete the OAuth flow

## Step 7: Production Deployment

1. Update redirect URIs in Google Cloud Console
2. Update client IDs in your production code
3. Ensure HTTPS is enabled
4. Update CORS settings if needed

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI"**
   - Check that the redirect URI in Google Console matches exactly
   - Ensure no trailing slashes

2. **"Access blocked"**
   - Add your email as a test user in OAuth consent screen
   - Check if the app is in testing mode

3. **"Client ID not found"**
   - Verify the client ID is correct
   - Check if the project is active

4. **CORS errors**
   - Ensure backend allows requests from frontend domain
   - Check if backend is running on correct port

### Debug Mode

Enable debug logging by adding this to your browser console:
```javascript
localStorage.setItem('debug', 'google-auth');
```

## Security Considerations

1. **Never expose client secrets** in frontend code
2. **Use HTTPS** in production
3. **Validate tokens** on the backend
4. **Implement proper session management**
5. **Add rate limiting** to prevent abuse

## Additional Features

### Admin Email Whitelist
The backend includes an admin email whitelist. Update this in `apps/backend/ai_services/views.py`:

```python
admin_emails = ['admin@example.com', 'admin@bsm.com', 'your-admin@email.com']
```

### User Profile Integration
After successful authentication, user data is stored in localStorage. You can extend this to:
- Store in a proper database
- Implement JWT tokens
- Add user roles and permissions
- Sync with your existing user system

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify Google Cloud Console configuration
3. Test with different browsers
4. Check network requests in browser dev tools

## Next Steps

1. Implement proper user management
2. Add more OAuth providers (Microsoft, GitHub, etc.)
3. Implement proper session management
4. Add two-factor authentication
5. Implement account linking
