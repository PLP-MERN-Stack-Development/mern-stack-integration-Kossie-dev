const Category = require('../models/Category');
const Post = require('../models/Post');
const asyncHandler = require('../middleware/asyncHandler');

exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort('name');
  
  // Count posts in each category
  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const postCount = await Post.countDocuments({ category: category._id });
      return {
        ...category.toObject(),
        postCount
      };
    })
  );
  
  res.status(200).json({
    success: true,
    count: categories.length,
    data: categoriesWithCount
  });
});

exports.createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: category
  });
});