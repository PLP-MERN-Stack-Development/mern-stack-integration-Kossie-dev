import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fallback in case .env is missing
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // ✅ Fetch posts (with pagination + filters)
  const fetchPosts = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      const { page = 1, limit = 10, category = '', status = '' } = filters;
      const query = new URLSearchParams({ page, limit, category, status }).toString();

      const res = await axios.get(`${API_URL}/posts?${query}`);

      // ✅ Backend returns { success, data, pages, ... }
      setPosts(res.data.data || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);

      // Backend returns { success, data: [...] }
      if (Array.isArray(res.data.data)) {
        setCategories(res.data.data);
      } else {
        console.warn('Unexpected categories response:', res.data);
        setCategories([]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories([]);
    }
  }, [API_URL]);

  return (
    <PostContext.Provider
      value={{
        posts,
        fetchPosts,
        categories,
        fetchCategories,
        totalPages,
        loading,
        error,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

// Custom hook to use Post context
export const usePost = () => useContext(PostContext);
