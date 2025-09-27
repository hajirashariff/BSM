import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, userProfileService } from '../lib/supabaseService';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  accountType: 'Customer' | 'Admin';
  verified: boolean;
  authMethod?: 'google' | 'email';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await loadUserProfile(session.user);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await loadUserProfile(session.user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (authUser: any) => {
    try {
      // Get user profile from our custom table
      const profile = await userProfileService.getCurrentUserProfile();
      
      if (profile) {
        setUser({
          id: authUser.id,
          email: authUser.email || '',
          name: profile.avatar ? `${profile.avatar}` : authUser.user_metadata?.full_name || authUser.email?.split('@')[0],
          picture: profile.avatar,
          accountType: profile.role === 'admin' ? 'Admin' : 'Customer',
          verified: true,
          authMethod: profile.auth_method
        });
      } else {
        // Create profile if it doesn't exist
        const newProfile = await userProfileService.upsertUserProfile({
          auth_method: authUser.app_metadata?.provider === 'google' ? 'google' : 'email',
          role: 'customer'
        });
        
        if (newProfile) {
          setUser({
            id: authUser.id,
            email: authUser.email || '',
            name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0],
            picture: authUser.user_metadata?.avatar_url,
            accountType: 'Customer',
            verified: true,
            authMethod: newProfile.auth_method
          });
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Fallback to basic user data
      setUser({
        id: authUser.id,
        email: authUser.email || '',
        name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0],
        picture: authUser.user_metadata?.avatar_url,
        accountType: 'Customer',
        verified: true,
        authMethod: authUser.app_metadata?.provider === 'google' ? 'google' : 'email'
      });
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (data.user) {
        await loadUserProfile(data.user);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginWithGoogle,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
