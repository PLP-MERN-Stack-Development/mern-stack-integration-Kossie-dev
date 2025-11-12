const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');
const authValidationSchema = require('../validators/authValidators');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', validate(authValidationSchema.register), authController.register);
router.post('/login', validate(authValidationSchema.login), authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/forgot-password', validate(authValidationSchema.forgotPassword), authController.forgotPassword);
router.post('/reset-password/:token', validate(authValidationSchema.resetPassword), authController.resetPassword);

// Protected routes (require authentication)
router.use(protect);

router.get('/me', authController.getMe);
router.post('/logout', authController.logout);
router.put('/update-profile', authController.updateProfile);
router.put('/change-password', validate(authValidationSchema.changePassword), authController.changePassword);

module.exports = router;
