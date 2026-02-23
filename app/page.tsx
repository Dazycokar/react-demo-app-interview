import { Suspense } from 'react';
import { api } from './services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import ClientWrapper from './ClientWrapper';

// Define Post type
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// Server-side data fetching
async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default async function HomePage() {
  let posts: Post[] = [];
  let error = '';

  try {
    posts = await getPosts();
  } catch (e) {
    error = 'Failed to load posts. Please try again.';
  }

  return (
    <ClientWrapper initialPosts={posts} error={error} />
  );
}
