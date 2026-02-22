'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/common/NavBar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { api } from '../../services/api';
import { ArrowLeft, User, Mail, FileText, MessageCircle } from 'lucide-react';

export default function DetailPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const { loading: authLoading } = useAuth();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchPostDetails();
    }
  }, [id]);

  const fetchPostDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch post
      const postData = await api.getPostById(id);
      setPost(postData);
      
      // Fetch user (author)
      const userData = await api.getUserById(postData.userId);
      setUser(userData);
      
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
        <NavBar />
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <main className="container mx-auto p-4">
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
        <NavBar />
        <main className="container mx-auto p-4">
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
      <NavBar />
      <main className="container mx-auto p-4 max-w-4xl">
        <Link href="/" className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Main Page
        </Link>

        {/* Post Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-gray-700 text-lg leading-relaxed">{post.body}</p>
        </div>

        {/* Author Information */}
        {user && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Author Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <User className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-gray-700">{user.name}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-500 mr-2" />
                <a href={`mailto:${user.email}`} className="text-blue-600 hover:text-blue-800">
                  {user.email}
                </a>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-gray-700">{user.company.name}</span>
              </div>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Comments ({comments.length})
          </h2>
          
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <p className="font-medium text-gray-900">{comment.name}</p>
                  <p className="text-sm text-gray-600 mb-2">{comment.email}</p>
                  <p className="text-gray-700">{comment.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
