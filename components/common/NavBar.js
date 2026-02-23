import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../app/context/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const NavBar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.push('/login');
  };

  // Don't show navbar on login page
  if (pathname === '/login') return null;

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="text-lg sm:text-xl font-bold">
            React Demo App
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm">{user.phoneNumber}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-blue-700 px-3 py-2 rounded hover:bg-blue-800 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {user && (
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {user && isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <span className="text-sm py-2">{user.phoneNumber}</span>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center space-x-2 bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition-colors text-sm w-full"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
