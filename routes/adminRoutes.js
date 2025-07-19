import express from 'express';
import { loginAdmin } from '../controllers/adminController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔹 @route   POST /api/admin/login
// 🔸 @desc    Admin Login
// 🔐 @access  Public
router.post('/login', loginAdmin);

// 🔹 @route   GET /api/admin/dashboard
// 🔸 @desc    Protected admin dashboard route
// 🔐 @access  Admin only
router.get('/dashboard', verifyToken, isAdmin, (req, res) => {
  res.json({
    message: 'Welcome Admin! You have access to the dashboard.',
    user: req.user
  });
});

export default router;