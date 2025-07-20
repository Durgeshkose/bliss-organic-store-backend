// routes/orderRoutes.js

import express from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//  Route to fetch user's own orders
router.get('/my-orders', protect, getMyOrders);

//  Route to create a new order
router.post('/', protect, createOrder);

export default router;
