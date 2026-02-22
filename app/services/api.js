const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = {
  // Get all posts
  getPosts: async () => {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  // Get single post by ID
  getPostById: async (id) => {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },

  // Get user by ID (for additional details)
  getUserById: async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  // Get comments for a post
  getCommentsByPostId: async (postId) => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
  }
};
