import express from 'express';
import { signup, login, getMe } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔹 @route   POST /api/users/register
// 🔸 @desc    Register new user
// 🔐 @access  Public
router.post('/register', signup);

// 🔹 @route   POST /api/users/login
// 🔸 @desc    Login user and return JWT token
// 🔐 @access  Public
router.post('/login', login);

router.get('/me', protect, getMe);

export default router;