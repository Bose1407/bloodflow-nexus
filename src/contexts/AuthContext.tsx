import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI, setAuthToken } from '@/services/api';
import { toast } from '@/hooks/use-toast';

export type UserRole = 'patient' | 'hospital' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  bloodGroup?: string;
  phone?: string;
  address?: string;
  verified?: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app start
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setAuthToken(token);
          const response = await authAPI.getProfile();
          setUser(response.data.user);
        } catch (error) {
          console.error('Auth initialization failed:', error);
          setAuthToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      setLoading(true);
      const response = await authAPI.login({ email, password, role });
      const { token, user: userData } = response.data;
      
      setAuthToken(token);
      setUser(userData);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}!`,
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      const { token, user: newUser } = response.data;
      
      setAuthToken(token);
      setUser(newUser);
      
      toast({
        title: "Registration Successful",
        description: `Welcome to Blood Bank, ${newUser.name}!`,
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast({
        title: "Registration Failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const updateProfile = async (data: any) => {
    try {
      const response = await authAPI.updateProfile(data);
      setUser(response.data.user);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Profile update failed';
      toast({
        title: "Update Failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};