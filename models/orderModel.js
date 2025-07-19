import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: { 
    type: String, 
    enum: ["pending", "success", "cancelled"], 
    default: "pending" 
  },
  nutritionFacts: { 
    type: Object 
  },
  farmInfo: {
    name: String,
    location: String,
    certification: String
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
