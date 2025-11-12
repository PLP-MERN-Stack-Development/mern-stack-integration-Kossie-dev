const Joi = require('joi');

const postValidationSchema = {
  create: Joi.object({
    title: Joi.string().min(5).max(200).required(),
    content: Joi.string().min(20).required(),
    excerpt: Joi.string().max(300).optional(),
    author: Joi.string().required(),
    category: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
      'string.pattern.base': 'Invalid category ID format'
    }),
    tags: Joi.array().items(Joi.string()).optional(),
    status: Joi.string().valid('draft', 'published', 'archived').optional()
  }),
  
  update: Joi.object({
    title: Joi.string().min(5).max(200).optional(),
    content: Joi.string().min(20).optional(),
    excerpt: Joi.string().max(300).optional(),
    author: Joi.string().optional(),
    category: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    status: Joi.string().valid('draft', 'published', 'archived').optional()
  }).min(1)
};
module.exports = postValidationSchema;