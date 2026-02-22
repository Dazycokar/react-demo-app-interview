'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  phoneNumber: string;
}

interface AuthContextType {
  user: User | null;
  login: (phoneNumber: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Lazy initializer to read user from localStorage
const getInitialUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      return JSON.parse(storedUser) as User;
    } catch {
      return null;
    }
  }
  return null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [loading] = useState(false);

  const login = (phoneNumber: string) => {
    const newUser = { phoneNumber };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
