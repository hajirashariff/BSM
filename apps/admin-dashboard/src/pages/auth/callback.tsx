import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.push('/login?error=auth_failed');
          return;
        }

        if (data.session?.user) {
          // Check if user exists in our users table
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('role')
            .eq('id', data.session.user.id)
            .single();

          if (userError && userError.code === 'PGRST116') {
            // User doesn't exist in our table, create them
            const { error: insertError } = await supabase
              .from('users')
              .insert([{
                id: data.session.user.id,
                email: data.session.user.email,
                role: 'Customer', // Default role for OAuth users
                name: data.session.user.user_metadata?.full_name || data.session.user.email?.split('@')[0]
              }]);

            if (insertError) {
              console.error('Error creating user:', insertError);
              router.push('/login?error=user_creation_failed');
              return;
            }

            // Redirect to customer dashboard
            router.push('/customer-dashboard');
          } else if (userData) {
            // User exists, redirect based on role
            if (userData.role === 'Admin') {
              router.push('/admin');
            } else {
              router.push('/customer-dashboard');
            }
          } else {
            router.push('/login?error=unknown_error');
          }
        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        router.push('/login?error=unexpected_error');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing sign in...</h2>
        <p className="text-gray-600">Please wait while we redirect you.</p>
      </div>
    </div>
  );
}
