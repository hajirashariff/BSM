import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const DebugPage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [localStorageData, setLocalStorageData] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      const authMethod = localStorage.getItem('authMethod');
      
      setLocalStorageData({
        user: userData ? JSON.parse(userData) : null,
        token,
        authMethod
      });
    }
  }, []);

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Debug Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Auth Context Data */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Auth Context Data</h2>
            <div className="space-y-2">
              <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
              <p><strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
              <p><strong>User:</strong></p>
              <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>

          {/* LocalStorage Data */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">LocalStorage Data</h2>
            <div className="space-y-2">
              <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                {JSON.stringify(localStorageData, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* User Display */}
        {user && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">User Information Display</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {user.picture && (
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-2xl font-bold">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">Account Type: {user.accountType}</p>
                  <p className="text-sm text-gray-500">Auth Method: {user.authMethod || 'email'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugPage;
