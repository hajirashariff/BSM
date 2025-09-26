import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function GoogleCallback() {
  const router = useRouter();

  useEffect(() => {
    // Handle Google OAuth callback
    const handleCallback = () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = urlParams.get('access_token');
        const state = urlParams.get('state');
        const error = urlParams.get('error');

        if (error) {
          // Send error to parent window
          if (window.opener) {
            window.opener.postMessage({
              type: 'GOOGLE_AUTH_ERROR',
              error: 'Authentication failed: ' + error
            }, window.location.origin);
          }
          window.close();
          return;
        }

        if (accessToken) {
          // Get user info from Google
          fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`)
            .then(response => response.json())
            .then(userInfo => {
              if (userInfo.email) {
                // Create mock user data
                const mockUser = {
                  id: userInfo.id || 'google_' + Date.now(),
                  email: userInfo.email,
                  name: userInfo.name || userInfo.email.split('@')[0],
                  picture: userInfo.picture,
                  accountType: state || 'Customer',
                  verified: true
                };

                // Send success to parent window
                if (window.opener) {
                  window.opener.postMessage({
                    type: 'GOOGLE_AUTH_SUCCESS',
                    user: mockUser,
                    token: accessToken
                  }, window.location.origin);
                }
                window.close();
              } else {
                throw new Error('Failed to get user information');
              }
            })
            .catch(err => {
              // Send error to parent window
              if (window.opener) {
                window.opener.postMessage({
                  type: 'GOOGLE_AUTH_ERROR',
                  error: 'Failed to get user information from Google'
                }, window.location.origin);
              }
              window.close();
            });
        } else {
          // Send error to parent window
          if (window.opener) {
            window.opener.postMessage({
              type: 'GOOGLE_AUTH_ERROR',
              error: 'No access token received'
            }, window.location.origin);
          }
          window.close();
        }
      } catch (err) {
        // Send error to parent window
        if (window.opener) {
          window.opener.postMessage({
            type: 'GOOGLE_AUTH_ERROR',
            error: 'Authentication failed'
          }, window.location.origin);
        }
        window.close();
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing Google authentication...</p>
      </div>
    </div>
  );
}