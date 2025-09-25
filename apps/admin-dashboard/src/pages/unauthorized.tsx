import React from 'react';
import { useRouter } from 'next/router';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => router.push('/')}
            className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Dashboard
          </button>
          
          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-700">
            If you believe you should have access to this page, please contact your system administrator or support team.
          </p>
        </div>
      </div>
    </div>
  );
}
