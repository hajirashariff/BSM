import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminDashboard from './admin';
import CustomerDashboard from './customer-dashboard';

export default function Dashboard() {
  const { user, loading, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (!loading && user && userRole) {
      // Redirect based on role
      if (userRole === 'Admin') {
        router.push('/admin');
      } else if (userRole === 'Customer') {
        router.push('/customer-dashboard');
      }
    }
  }, [user, loading, userRole, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Show appropriate dashboard based on role
  if (userRole === 'Admin') {
    return (
      <ProtectedRoute requiredRole="Admin">
        <AdminDashboard />
      </ProtectedRoute>
    );
  } else if (userRole === 'Customer') {
    return (
      <ProtectedRoute requiredRole="Customer">
        <CustomerDashboard />
      </ProtectedRoute>
    );
  }

  return null;
}


