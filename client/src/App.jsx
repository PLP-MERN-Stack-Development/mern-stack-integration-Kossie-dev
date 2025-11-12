import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext';
import { AppProvider } from './context/AppContext';
import { PostProvider } from './context/postContext';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Layout from './components/layout/Layout';
import PostList from './components/posts/postList';
import PostDetail from './components/posts/postDetail';
import PostForm from './components/posts/postForm';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <PostProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={
                  <ErrorBoundary>
                    <PostList />
                  </ErrorBoundary>
                  } 
                  />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route 
                  path="/posts/new" 
                  element={
                    <ProtectedRoute>
                      <PostForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/posts/edit/:id" 
                  element={
                    <ProtectedRoute>
                      <PostForm />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          </PostProvider>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;