import React, { createContext, useContext, useReducer, useCallback } from 'react';
import api from '../services/api';

const AppContext = createContext();

// Action types
const ACTIONS = {
  // Posts
  SET_POSTS: 'SET_POSTS',
  ADD_POST: 'ADD_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  SET_POST_LOADING: 'SET_POST_LOADING',
  SET_POST_ERROR: 'SET_POST_ERROR',
  
  // Categories
  SET_CATEGORIES: 'SET_CATEGORIES',
  ADD_CATEGORY: 'ADD_CATEGORY',
  SET_CATEGORY_LOADING: 'SET_CATEGORY_LOADING',
  SET_CATEGORY_ERROR: 'SET_CATEGORY_ERROR',
  
  // UI State
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Initial state
const initialState = {
  posts: [],
  categories: [],
  postsPagination: {
    page: 1,
    total: 0,
    pages: 0,
  },
  loading: {
    posts: false,
    categories: false,
    global: false,
  },
  errors: {
    posts: null,
    categories: null,
    global: null,
  },
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    // Posts
    case ACTIONS.SET_POSTS:
      return {
        ...state,
        posts: action.payload.data,
        postsPagination: {
          page: action.payload.page,
          total: action.payload.total,
          pages: action.payload.pages,
        },
        loading: { ...state.loading, posts: false },
        errors: { ...state.errors, posts: null },
      };

    case ACTIONS.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case ACTIONS.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case ACTIONS.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case ACTIONS.SET_POST_LOADING:
      return {
        ...state,
        loading: { ...state.loading, posts: action.payload },
      };

    case ACTIONS.SET_POST_ERROR:
      return {
        ...state,
        errors: { ...state.errors, posts: action.payload },
        loading: { ...state.loading, posts: false },
      };

    // Categories
    case ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: { ...state.loading, categories: false },
        errors: { ...state.errors, categories: null },
      };

    case ACTIONS.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case ACTIONS.SET_CATEGORY_LOADING:
      return {
        ...state,
        loading: { ...state.loading, categories: action.payload },
      };

    case ACTIONS.SET_CATEGORY_ERROR:
      return {
        ...state,
        errors: { ...state.errors, categories: action.payload },
        loading: { ...state.loading, categories: false },
      };

    // Global
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: { ...state.loading, global: action.payload },
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, global: action.payload },
      };

    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        errors: initialState.errors,
      };

    default:
      return state;
  }
};

// Context Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Fetch posts with filters
  const fetchPosts = useCallback(async (filters = {}) => {
    dispatch({ type: ACTIONS.SET_POST_LOADING, payload: true });
    try {
      const response = await api.posts.getAll(filters);
      dispatch({
        type: ACTIONS.SET_POSTS,
        payload: {
          data: response.data.data,
          page: response.data.page,
          total: response.data.total,
          pages: response.data.pages,
        },
      });
      return response.data;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_POST_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  // Create post with optimistic update
  const createPost = useCallback(async (postData) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticPost = { ...postData, _id: tempId, createdAt: new Date() };

    // Optimistic update
    dispatch({ type: ACTIONS.ADD_POST, payload: optimisticPost });

    try {
      const response = await apiService.posts.create(postData);
      // Replace temp post with real post
      dispatch({ type: ACTIONS.UPDATE_POST, payload: response.data.data });
      return response.data;
    } catch (error) {
      // Rollback on error
      dispatch({ type: ACTIONS.DELETE_POST, payload: tempId });
      dispatch({ type: ACTIONS.SET_POST_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  // Update post with optimistic update
  const updatePost = useCallback(async (id, postData) => {
    const originalPost = state.posts.find((p) => p._id === id);

    // Optimistic update
    dispatch({
      type: ACTIONS.UPDATE_POST,
      payload: { ...originalPost, ...postData },
    });

    try {
      const response = await api.posts.update(id, postData);
      dispatch({ type: ACTIONS.UPDATE_POST, payload: response.data.data });
      return response.data;
    } catch (error) {
      // Rollback on error
      if (originalPost) {
        dispatch({ type: ACTIONS.UPDATE_POST, payload: originalPost });
      }
      dispatch({ type: ACTIONS.SET_POST_ERROR, payload: error.message });
      throw error;
    }
  }, [state.posts]);

  // Delete post with optimistic update
  const deletePost = useCallback(async (id) => {
    const originalPost = state.posts.find((p) => p._id === id);

    // Optimistic delete
    dispatch({ type: ACTIONS.DELETE_POST, payload: id });

    try {
      await apiService.posts.delete(id);
    } catch (error) {
      // Rollback on error
      if (originalPost) {
        dispatch({ type: ACTIONS.ADD_POST, payload: originalPost });
      }
      dispatch({ type: ACTIONS.SET_POST_ERROR, payload: error.message });
      throw error;
    }
  }, [state.posts]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_CATEGORY_LOADING, payload: true });
    try {
      const response = await api.categories.getAll();
      dispatch({ type: ACTIONS.SET_CATEGORIES, payload: response.data.data });
      return response.data;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_CATEGORY_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  // Create category
  const createCategory = useCallback(async (categoryData) => {
    try {
      const response = await api.categories.create(categoryData);
      dispatch({ type: ACTIONS.ADD_CATEGORY, payload: response.data.data });
      return response.data;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_CATEGORY_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  // Clear errors
  const clearError = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  }, []);

  const value = {
    state,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    fetchCategories,
    createCategory,
    clearError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};