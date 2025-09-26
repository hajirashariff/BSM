import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function GoogleAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = urlParams.get('access_token');
        const error = urlParams.get('error');
        const state = urlParams.get('state'); // This contains the account type

        if (error) {
          // Send error to parent window
          window.opener?.postMessage({
            type: 'GOOGLE_AUTH_ERROR',
            error: 'Authentication was cancelled or failed'
          }, window.location.origin);
          window.close();
          return;
        }

        if (accessToken && state) {
          // Send token to backend for verification
          const backendResponse = await fetch('http://localhost:8000/api/ai_services/auth/google/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              access_token: accessToken,
              account_type: state
            })
          });

          const result = await backendResponse.json();

          if (result.success) {
            // Send success to parent window
            window.opener?.postMessage({
              type: 'GOOGLE_AUTH_SUCCESS',
              user: result.user,
              token: result.token
            }, window.location.origin);
          } else {
            // Send error to parent window
            window.opener?.postMessage({
              type: 'GOOGLE_AUTH_ERROR',
              error: result.error || 'Authentication failed'
            }, window.location.origin);
          }
        } else {
          // Send error to parent window
          window.opener?.postMessage({
            type: 'GOOGLE_AUTH_ERROR',
            error: 'No access token received'
          }, window.location.origin);
        }

        // Close the popup
        window.close();
      } catch (err) {
        // Send error to parent window
        window.opener?.postMessage({
          type: 'GOOGLE_AUTH_ERROR',
          error: 'Authentication failed'
        }, window.location.origin);
        window.close();
      }
    };

    handleGoogleCallback();
  }, []);

  return (
    <>
      <Head>
        <title>Google Authentication - BSM Pro</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Completing Google authentication...</p>
        </div>
      </div>
    </>
  );
}
