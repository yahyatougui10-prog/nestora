"use client";

import { createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: 'user-me',
  name: 'Alex Johnson',
  email: 'alex@nestora.com',
  phone: '+212 6 12-345678',
  avatar: 'https://i.pravatar.cc/150?u=alex',
  languages: ['English', 'French', 'Arabic'],
  preferences: ['Beachfront', 'Luxury', 'Historic homes'],
  notifications: true,
  bookingNotifications: true,
  messageNotifications: true,
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('nestora-user', null);
  const isAuthenticated = user !== null;

  const login = useCallback(
    async (email: string, _password: string): Promise<boolean> => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (email && _password) {
        const loggedInUser = { ...MOCK_USER, email };
        setUser(loggedInUser);
        return true;
      }
      return false;
    },
    [setUser]
  );

  const signup = useCallback(
    async (name: string, email: string, _password: string): Promise<boolean> => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (name && email && _password) {
        const newUser: User = { ...MOCK_USER, name, email };
        setUser(newUser);
        return true;
      }
      return false;
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const updateUser = useCallback(
    (data: Partial<User>) => {
      setUser((prev) => (prev ? { ...prev, ...data } : null));
    },
    [setUser]
  );

  const value = useMemo(
    () => ({ user, isAuthenticated, login, signup, logout, updateUser }),
    [user, isAuthenticated, login, signup, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
