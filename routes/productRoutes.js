import express from 'express';
import { upload } from '../utils/cloudinary.js'; //  ESM import

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// GET a product by ID
router.get('/:id', getProductById);

// GET all products
router.get('/', getAllProducts);

// POST a new product with image upload
router.post('/', upload.single('image'), createProduct);

// DELETE a product by ID
router.delete('/:id', deleteProduct);

// PUT (update) a product by ID
router.put('/update/:id', updateProduct);

export default router;
