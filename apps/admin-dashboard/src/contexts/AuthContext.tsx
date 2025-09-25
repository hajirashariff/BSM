import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  role: 'Customer' | 'Admin';
}

interface AuthContextType {
  user: User | null;
  userRole: 'Customer' | 'Admin' | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'Customer' | 'Admin' | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock users for demonstration
  const mockUsers = [
    { id: '1', email: 'admin@example.com', password: 'password123', role: 'Admin' as const },
    { id: '2', email: 'customer@example.com', password: 'password123', role: 'Customer' as const },
  ];

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('bsm_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setUserRole(userData.role);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('bsm_user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error: any }> => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role
        };
        
        setUser(userData);
        setUserRole(foundUser.role);
        localStorage.setItem('bsm_user', JSON.stringify(userData));
        
        return { error: null };
      } else {
        return { error: { message: 'Invalid email or password' } };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: { message: 'An error occurred during sign in' } };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setUser(null);
      setUserRole(null);
      localStorage.removeItem('bsm_user');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value = {
    user,
    userRole,
    loading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};