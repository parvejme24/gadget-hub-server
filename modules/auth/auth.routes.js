const express = require('express');
const router = express.Router();
const AuthController = require('./auth.controller');

// Public routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

// Protected routes (require authentication)
router.get('/profile', AuthController.getProfile);
router.put('/profile', AuthController.updateProfile);
router.delete('/profile', AuthController.deleteProfile);

// Admin only routes
router.get('/users', AuthController.getAllUsers);
router.put('/users/:userId/role', AuthController.updateUserRole);

module.exports = router;

