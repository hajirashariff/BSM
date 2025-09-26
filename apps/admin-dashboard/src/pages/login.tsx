import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2, CheckCircle, User, Shield } from 'lucide-react';

export default function LoginPage() {
  const [accountType, setAccountType] = useState<'Customer' | 'Admin'>('Admin');
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: 'admin@example.com',
    password: 'password123',
    confirmPassword: '',
    keepLoggedIn: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { signIn } = useAuth();

  // Load Google API script
  useEffect(() => {
    const loadGoogleAPI = () => {
      if (typeof window !== 'undefined' && !window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    };

    loadGoogleAPI();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleAccountTypeChange = (type: 'Customer' | 'Admin') => {
    setAccountType(type);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isSignup) {
        // Sign up logic
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        // Mock signup - in a real app, this would create a new user
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        
        setSuccess(`${accountType} account created successfully! You can now sign in.`);
        
        setTimeout(() => {
          setIsSignup(false);
          setSuccess('');
        }, 3000);
      } else {
        // Sign in logic - Mock authentication for demo
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        
        // Create mock user data
        const mockUser = {
          id: 'user_' + Date.now(),
          email: formData.email,
          name: formData.email.split('@')[0],
          accountType: accountType,
          verified: true,
          authMethod: 'email'
        };

        console.log('🔍 Email Auth: Created mock user:', mockUser);

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', 'mock_token_' + Date.now());
        localStorage.setItem('authMethod', 'email');
        
        console.log('🔍 Email Auth: Stored user data in localStorage');

        setSuccess(`Successfully signed in as ${accountType}!`);

        // Redirect based on account type
        setTimeout(() => {
          if (accountType === 'Admin') {
            router.push('/admin');
          } else {
            // Redirect to customer portal on port 3000
            window.location.href = 'http://localhost:3000';
          }
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || (isSignup ? 'An error occurred during signup' : 'Invalid email or password'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Check if Google API is available
      if (typeof window !== 'undefined' && window.google) {
        // Use Google Identity Services
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: '301055350173-9up9t5job4gssg2c0dtt4m4rge2nlnvs.apps.googleusercontent.com',
          scope: 'email profile',
          callback: async (response: any) => {
            try {
              if (response.access_token) {
                // Get user info from Google
                const userInfoResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`);
                const userInfo = await userInfoResponse.json();

                if (userInfo.email) {
                  // Create mock user data
                  const mockUser = {
                    id: userInfo.id || 'google_' + Date.now(),
                    email: userInfo.email,
                    name: userInfo.name || userInfo.email.split('@')[0],
                    picture: userInfo.picture,
                    accountType: accountType,
                    verified: true,
                    authMethod: 'google'
                  };

                  console.log('🔍 Google Auth: User info from Google:', userInfo);
                  console.log('🔍 Google Auth: Created mock user:', mockUser);

                  setSuccess(`Successfully authenticated with Google as ${accountType}!`);
                  
                  // Store user data in localStorage
                  localStorage.setItem('user', JSON.stringify(mockUser));
                  localStorage.setItem('token', response.access_token);
                  localStorage.setItem('authMethod', 'google');
                  
                  console.log('🔍 Google Auth: Stored user data in localStorage');
                  
                  // Redirect based on account type
                  setTimeout(() => {
                    if (accountType === 'Admin') {
                      router.push('/admin');
                    } else {
                      // Redirect to customer portal on port 3000
                      window.location.href = 'http://localhost:3000';
                    }
                  }, 1500);
                } else {
                  setError('Failed to get user information from Google');
                }
              } else {
                setError('Failed to get access token from Google');
              }
            } catch (err: any) {
              setError('Google authentication failed. Please try again.');
            } finally {
              setLoading(false);
            }
          }
        });

        client.requestAccessToken();
      } else {
        // Fallback: Use popup window approach
        const googleAuthUrl = `https://accounts.google.com/oauth/authorize?` +
          `client_id=301055350173-9up9t5job4gssg2c0dtt4m4rge2nlnvs.apps.googleusercontent.com&` +
          `redirect_uri=${encodeURIComponent(`${window.location.origin}/auth/google/callback`)}&` +
          `scope=email profile&` +
          `response_type=token&` +
          `state=${accountType}`;

        const popup = window.open(googleAuthUrl, 'googleAuth', 'width=500,height=600');
        
        if (!popup) {
          setError('Please allow popups for Google authentication');
          setLoading(false);
          return;
        }

        // Listen for popup response
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            setLoading(false);
          }
        }, 1000);

        // Listen for message from popup
        const messageListener = (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;
          
          if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageListener);
            popup.close();
            
            // Handle successful authentication
            setSuccess(`Successfully authenticated with Google as ${accountType}!`);
            localStorage.setItem('user', JSON.stringify(event.data.user));
            localStorage.setItem('token', event.data.token);
            localStorage.setItem('authMethod', 'google');
            
            setTimeout(() => {
              if (accountType === 'Admin') {
                router.push('/admin');
              } else {
                // Redirect to customer portal on port 3000
                window.location.href = 'http://localhost:3000';
              }
            }, 1500);
            
            setLoading(false);
          } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageListener);
            popup.close();
            setError(event.data.error);
            setLoading(false);
          }
        };

        window.addEventListener('message', messageListener);
      }
    } catch (err: any) {
      setError('Google authentication failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>BSM Pro - Login</title>
        <meta name="description" content="Login to BSM Pro platform" />
      </Head>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
      />
      <div className="min-h-screen flex">
      {/* Left Column - Authentication Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">BSM</span>
            </div>
            <h2 className="mt-8 text-4xl font-bold text-gray-900">
              {isSignup ? `Create ${accountType} Account` : `Welcome Back, ${accountType}`}
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              {isSignup ? 'Join our platform and get started' : 'Sign in to your account'}
            </p>
          </div>

          {/* Account Type Selector */}
          <div className="bg-gray-50 rounded-lg p-1">
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => handleAccountTypeChange('Customer')}
                className={`flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  accountType === 'Customer'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="h-4 w-4 mr-2" />
                Customer
              </button>
              <button
                type="button"
                onClick={() => handleAccountTypeChange('Admin')}
                className={`flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  accountType === 'Admin'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 text-center">
              {accountType === 'Customer' 
                ? 'Access your personal dashboard and services.'
                : 'Access the admin panel to manage the platform.'
              }
            </p>
          </div>

          {/* Authentication Form */}
          <form className="mt-12 space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div className="ml-3">
                    <p className="text-sm text-green-800">{success}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-12 pr-3 py-4 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={isSignup ? "new-password" : "current-password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder={isSignup ? "Create a password" : "Enter your password"}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm Password (only for signup) */}
              {isSignup && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-6 w-6 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="Confirm your password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Keep me logged in (only for login) */}
              {!isSignup && (
                <div className="flex items-center">
                  <input
                    id="keepLoggedIn"
                    name="keepLoggedIn"
                    type="checkbox"
                    checked={formData.keepLoggedIn}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="keepLoggedIn" className="ml-2 block text-sm text-gray-700">
                    Keep me logged in
                  </label>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    {isSignup ? `Creating ${accountType} Account...` : `Signing in as ${accountType}...`}
                  </>
                ) : (
                  isSignup ? `Sign up as ${accountType}` : `Sign in as ${accountType}`
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google Auth */}
            <div>
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full flex justify-center py-4 px-6 border border-gray-300 rounded-lg shadow-sm text-lg font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isSignup ? `Sign up with Google` : `Sign in with Google`}
              </button>
            </div>

            {/* Toggle between Login/Signup */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isSignup ? 'Already have an account?' : 'Need an account?'}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setError('');
                    setSuccess('');
                    setFormData(prev => ({ ...prev, confirmPassword: '' }));
                  }}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {isSignup ? 'Sign in' : 'Create one'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column - Background Image */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-6">
              {isSignup ? 'Join BSM Platform' : 'Welcome Back'}
            </h1>
            <p className="text-xl mb-8 opacity-90">
              {isSignup 
                ? 'Start your journey with us today'
                : 'Access your BSM dashboard'
              }
            </p>
            <div className="space-y-4 text-left max-w-md">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span>{accountType === 'Customer' ? 'Manage your personal services' : 'Manage the entire platform'}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span>{accountType === 'Customer' ? 'Track your requests and tickets' : 'Monitor system performance'}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span>{accountType === 'Customer' ? 'Get support when you need it' : 'Configure system settings'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
