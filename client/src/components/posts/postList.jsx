import React, { useEffect, useState } from 'react';
import { usePost } from '../../context/postContext';
import { useApi } from '../../hooks/useApi';
import PostCard from './PostCard';
import Loader from '../ui/Loader';

const PostList = () => {
  const { posts, fetchPosts, categories, fetchCategories, totalPages } = usePost();
  const { loading } = useApi();

  const [filters, setFilters] = useState({
    status: '',
    category: '',
    page: 1,
    limit: 10,
  });

  // Fetch posts when filters change
  useEffect(() => {
    fetchPosts(filters);
  }, [filters, fetchPosts]);

  // Fetch categories only once on mount
  useEffect(() => {
    fetchCategories();
  }, []); // empty array = run once

  // Handle filter changes (category or status)
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
      page: 1, // Reset to first page on filter change
    });
  };

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    setFilters({
      ...filters,
      page: pageNumber,
    });
  };

  // Simple pagination UI
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="pagination-btn"
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    );
  };

  if (loading) return <Loader />;

  return (
    <div className="post-list-container">
      <div className="page-header">
        <h1>Blog Posts</h1>
      </div>

      {/* Filters */}
      <div className="filters">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Categories</option>
          <option value="technology">Technology</option>
          <option value="web_dev">Web Development</option>
          <option value="mobile_dev">Mobile Development</option>
          <option value="data_science">Data Science</option>
          <option value="devops">DevOps</option>
          <option value="cybersecurity">Cybersecurity</option>
          <option value="ui/ux">UI/UX Design</option>
          {Array.isArray(categories) && categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Posts Grid */}
      <div className="post-grid">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map(p => <PostCard key={p._id} post={p} />)
        ) : (
          <p>No posts found</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PostList;
