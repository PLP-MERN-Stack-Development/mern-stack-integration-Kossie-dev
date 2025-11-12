import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <Link to={`/posts/${post._id}`}>
          <h2>{post.title}</h2>
        </Link>
        <span className="post-category">{post.category?.name}</span>
      </div>
      
      <div className="post-meta">
        <span className="post-author">By {post.author}</span>
        <span className="post-date">{formatDate(post.createdAt)}</span>
        <span className="post-views">{post.views} views</span>
      </div>
      
      {post.excerpt && (
        <p className="post-excerpt">{post.excerpt}</p>
      )}
      
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      )}
      
      <Link to={`/posts/${post._id}`} className="read-more">
        Read More →
      </Link>
    </div>
  );
};

export default PostCard;