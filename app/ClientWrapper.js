'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import LoadingSpinner from '/components/common/LoadingSpinner';
import ErrorMessage from '/components/common/ErrorMessage';
import PostCard from '/components/PostCard';
import SearchBar from '/components/SearchBar';

export default function ClientWrapper({ initialPosts, error: serverError }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(serverError);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Use useMemo for filtering to avoid useEffect
  const filteredPosts = useMemo(() => {
    if (!initialPosts) return [];
    if (searchQuery.trim() === '') {
      return initialPosts;
    }
    return initialPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [initialPosts, searchQuery]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Posts</h1>
          <p className="text-gray-600 text-sm sm:text-base">Browse and search through our collection of posts</p>
        </div>

        {/* Search Bar */}
        <div className="mb-4 sm:mb-6">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search posts by title..." 
          />
        </div>

        {/* Error State */}
        {error && (
          <ErrorMessage message={error} />
        )}

        {/* Posts List */}
        {!error && (
          <>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 text-sm sm:text-lg">No posts found matching your search.</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
