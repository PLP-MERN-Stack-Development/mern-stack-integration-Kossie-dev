import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../context/authContext';
import Loader from '../ui/loader';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, del, loading } = useApi();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await get(`/posts/${id}`);
        setPost(data.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id, get]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await del(`/posts/${id}`);
        navigate('/posts');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading || !post) return <Loader />;

  return (
    <div className="post-detail">
      <div className="post-detail-header">
        <h1>{post.title}</h1>
        
        <div className="post-meta">
          <span className="post-author">By {post.author}</span>
          <span className="post-date">{formatDate(post.createdAt)}</span>
          <span className="post-category">{post.category?.name}</span>
          <span className="post-views">{post.views} views</span>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {isAuthenticated && (
        <div className="post-actions">
          <Link to={`/posts/edit/${post._id}`} className="btn btn-primary">
            Edit Post
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Post
          </button>
        </div>
      )}

      <Link to="/posts" className="back-link">
        ← Back to Posts
      </Link>
    </div>
  );
};

export default PostDetail;