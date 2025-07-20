import Product from '../models/Product.js'; // ESM import
import mongoose from 'mongoose';

// Create a new product
export const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  
  const imageURL = req.file?.path; // Cloudinary gives image URL here

  const product = new Product({ name, description, price, category, stock, imageURL });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product by ID
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error during deletion' });
  }
};

// Update product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error while updating product' });
  }
};

// Get product by ID
// This function retrieves a product by its ID and returns it in the response.
export const getProductById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Product not found" });
  }
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
