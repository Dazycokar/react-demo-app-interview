'use client';

import { AuthProvider } from './context/AuthContext.tsx';
import NavBar from './components/common/NavBar.js';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <NavBar />
      {children}
    </AuthProvider>
  );
}
