'use client';
// contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuthContextType, AuthUser, UserRole, AuthState } from '../types/auth';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);

  const login = useCallback(async (email: string, password: string, role: UserRole) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // This is where we'll integrate UPS authentication later
      // For now, simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Placeholder validation
      if (!email.endsWith('@ups.com') && role === 'admin') {
        throw new Error('Admin must use a UPS email address');
      }

      const user: AuthUser = {
        id: '1', // This will come from UPS auth
        email,
        role,
        employeeId: role === 'admin' ? 'EMP123' : undefined,
        mailboxNumber: role === 'user' ? 'BOX123' : undefined,
      };

      setState(prev => ({ ...prev, user, isLoading: false }));
      
      // Store auth token (will be provided by UPS later)
      localStorage.setItem('auth_token', 'placeholder_token');
      
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      }));
    }
  }, []);

  const logout = useCallback(async () => {
    // This is where we'll add UPS logout logic later
    setState(initialState);
    localStorage.removeItem('auth_token');
  }, []);

  const value = {
    ...state,
    login,
    logout,
    isAuthenticated: !!state.user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}