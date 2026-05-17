const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Forgot Password route
router.post('/forgot-password', authController.forgotPassword);

// Reset Password route
router.post('/reset-password/:token', authController.resetPassword);

// Change Password route (protected)
router.post('/change-password', authMiddleware, authController.changePassword);

module.exports = router;
