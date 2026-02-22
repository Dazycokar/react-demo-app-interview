import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';

const NavBar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
  };

  // Don't show navbar on login page
  if (pathname === '/login') return null;

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          React Demo App
        </Link>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm">{user.phoneNumber}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-blue-700 px-3 py-1 rounded hover:bg-blue-800"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
