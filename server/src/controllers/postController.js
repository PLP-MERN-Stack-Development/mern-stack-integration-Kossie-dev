const Post = require('../models/Post');
const Category = require('../models/Category');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');

exports.getAllPosts = asyncHandler(async (req, res) => {
  const { status, category, page = 1, limit = 10, sort = '-createdAt' } = req.query;

  let filter = {};
  if (category) filter.category = category;
  if (status) filter.status = status;

  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);
  const skip = (parsedPage - 1) * parsedLimit;
 
  const posts = await Post.find(filter)
    .populate('category', 'name slug')
    .sort(sort)
    .skip(skip)
    .limit(parsedLimit);

  const total = await Post.countDocuments(filter);

  res.status(200).json({
    success: true,
    posts,
    totalPages: Math.ceil(total / parsedLimit),
    total,
    page: parsedPage,
  });
});


exports.getPostById = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate('category', 'name slug description');
  
  if (!post) {
    return next(new AppError('Post not found', 404));
  }
  
  // Increment view count
  post.views += 1;
  await post.save();
  
  res.status(200).json({
    success: true,
    data: post
  });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  // Check if category exists
  const category = await Category.findById(req.body.category);
  if (!category) {
    return next(new AppError('Category not found', 404));
  }
  
  const post = await Post.create(req.body);
  await post.populate('category', 'name slug');
  
  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: post
  });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  // Check if category exists if being updated
  if (req.body.category) {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return next(new AppError('Category not found', 404));
    }
  }
  
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('category', 'name slug');
  
  if (!post) {
    return next(new AppError('Post not found', 404));
  }
  
  res.status(200).json({
    success: true,
    message: 'Post updated successfully',
    data: post
  });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  
  if (!post) {
    return next(new AppError('Post not found', 404));
  }
  
  res.status(200).json({
    success: true,
    message: 'Post deleted successfully'
  });
});