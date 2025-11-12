const Joi = require('joi');

const categoryValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().max(200).optional()
});

module.exports = categoryValidationSchema;

