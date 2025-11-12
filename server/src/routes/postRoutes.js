const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const validate = require('../middleware/validate');
const postValidationSchema = require('../validators/postValidator');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', validate(postValidationSchema.create), postController.createPost);
router.put('/:id', validate(postValidationSchema.update), postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;