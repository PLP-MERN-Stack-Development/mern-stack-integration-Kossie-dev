const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const validate = require('../middleware/validate');
const categoryValidationSchema = require('../validators/categoryValidator');

router.get('/categories', categoryController.getAllCategories);
router.post('/', validate(categoryValidationSchema), categoryController.createCategory);

module.exports = router;