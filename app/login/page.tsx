'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { validatePhoneNumber, isValidMockUser } from '../utils/validation';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    // Validate phone number
    const validationError = validatePhoneNumber(phoneNumber);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Mock authentication
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isValidMockUser(phoneNumber)) {
        login(phoneNumber);
        router.push('/');
      } else {
        setError('Invalid phone number. Use +254712345678 for demo.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 p-6 sm:p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Please sign in to continue
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+254712345678"
                className="appearance-none block w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm text-gray-700"
                disabled={loading}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Demo: Use +254712345678 to login
            </p>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
