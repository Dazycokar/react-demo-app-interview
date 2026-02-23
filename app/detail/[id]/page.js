'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import ErrorMessage from '../../../components/common/ErrorMessage';
import CommentItem from '../../../components/CommentItem';
import { api } from '../../../app/services/api';
import { ArrowLeft, User, Mail, FileText, MessageCircle } from 'lucide-react';

export default function DetailPage({ params }) {
  const router = useRouter();
  const { id } = React.use(params);
  const { user: authUser, loading: authLoading } = useAuth();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push('/login');
    }
  }, [authUser, authLoading, router]);

  useEffect(() => {
    if (id && authUser) {
      fetchPostDetails();
    }
  }, [id, authUser]);

  const fetchPostDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch post
      const postData = await api.getPostById(id);
      setPost(postData);
      
      // Fetch user (author)
      const authorData = await api.getUserById(postData.userId);
      setAuthor(authorData);
      
      // Fetch comments
      const commentsData = await api.getCommentsByPostId(id);
      setComments(commentsData);
      
    } catch (err) {
      setError('Failed to load post details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <main className="container mx-auto px-4">
          <ErrorMessage message={error} />
          <Link href="/" className="inline-flex items-center text-blue-600 mt-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Main Page
          </Link>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <main className="container mx-auto px-4">
          <ErrorMessage message="Post not found" />
          <Link href="/" className="inline-flex items-center text-blue-600 mt-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Main Page
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div>
      <main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 max-w-4xl">
        <Link href="/" className="inline-flex items-center text-blue-600 mb-4 sm:mb-6 hover:text-blue-800 text-sm sm:text-base">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Main Page
        </Link>

        {/* Post Content */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{post.title}</h1>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{post.body}</p>
        </div>

        {/* Author Information */}
        {author && (
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Author Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center">
                <User className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-base">{author.name}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                <a href={`mailto:${author.email}`} className="text-blue-600 hover:text-blue-800 text-sm sm:text-base truncate">
                  {author.email}
                </a>
              </div>
              <div className="flex items-center sm:col-span-2">
                <FileText className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-base">{author.company.name}</span>
              </div>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Comments ({comments.length})
          </h2>
          
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
