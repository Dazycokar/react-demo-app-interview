'use client';

import { AuthProvider } from './context/AuthContext';
import NavBar from './components/common/NavBar';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <NavBar />
      {children}
    </AuthProvider>
  );
}
