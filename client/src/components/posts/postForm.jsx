import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/appContext';
import { useForm } from '../../hooks/useForm';
import api from '../../services/api';
import Loader from '../ui/loader';
import ErrorMessage from '../ui/errorMessage';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, createPost, updatePost, fetchCategories } = useApp();
  const [fetchLoading, setFetchLoading] = React.useState(false);
  const [fetchError, setFetchError] = React.useState(null);

  // Validation rules
  const validationRules = {
    title: {
      required: { message: 'Title is required' },
      minLength: { value: 5, message: 'Title must be at least 5 characters' },
      maxLength: { value: 200, message: 'Title cannot exceed 200 characters' },
    },
    content: {
      required: { message: 'Content is required' },
      minLength: { value: 20, message: 'Content must be at least 20 characters' },
    },
    author: {
      required: { message: 'Author is required' },
    },
    category: {
      required: { message: 'Category is required' },
    },
    excerpt: {
      maxLength: { value: 300, message: 'Excerpt cannot exceed 300 characters' },
    },
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFormValues,
  } = useForm(
    {
      title: '',
      content: '',
      excerpt: '',
      author: '',
      category: '',
      tags: '',
      status: 'draft',
    },
    validationRules
  );

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch post if editing
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        setFetchLoading(true);
        setFetchError(null);
        try {
          const response = await api.posts.getById(id);
          const post = response.data.data;
          setFormValues({
            title: post.title,
            content: post.content,
            excerpt: post.excerpt || '',
            author: post.author,
            category: post.category._id,
            tags: post.tags?.join(', ') || '',
            status: post.status,
          });
        } catch (error) {
          setFetchError(error.message);
        } finally {
          setFetchLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, setFormValues]);

  // Submit handler
  const onSubmit = async (formValues) => {
    try {
      const postData = {
        ...formValues,
        tags: formValues.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      if (id) {
        await updatePost(id, postData);
      } else {
        await createPost(postData);
      }

      navigate('/posts');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  if (fetchLoading) return <Loader />;
  if (fetchError) return <ErrorMessage message={fetchError} />;

  return (
    <div className="post-form-container">
      <h1>{id ? 'Edit Post' : 'Create New Post'}</h1>

      {state.errors.posts && (
        <ErrorMessage message={state.errors.posts} />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="post-form">
        <div className="form-group">
          <label htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.title && errors.title ? 'error' : ''}
          />
          {touched.title && errors.title && (
            <span className="error-message">{errors.title}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="author">
            Author <span className="required">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={values.author}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.author && errors.author ? 'error' : ''}
          />
          {touched.author && errors.author && (
            <span className="error-message">{errors.author}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">
            Category <span className="required">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.category && errors.category ? 'error' : ''}
            disabled={state.loading.categories}
          >
            <option value="">Select a category</option>
            {state.categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {touched.category && errors.category && (
            <span className="error-message">{errors.category}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={values.excerpt}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="3"
            placeholder="Brief summary of the post"
            className={touched.excerpt && errors.excerpt ? 'error' : ''}
          />
          {touched.excerpt && errors.excerpt && (
            <span className="error-message">{errors.excerpt}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="content">
            Content <span className="required">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="10"
            className={touched.content && errors.content ? 'error' : ''}
          />
          {touched.content && errors.content && (
            <span className="error-message">{errors.content}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={values.tags}
            onChange={handleChange}
            placeholder="e.g., javascript, react, tutorial"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={values.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || state.loading.posts}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-small"></span>
                {id ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              id ? 'Update Post' : 'Create Post'
            )}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/posts')}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;