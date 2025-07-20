import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Import routes
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Optional: import cloudinary config
// import './utils/cloudinary.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(" MongoDB Connected");
}).catch((err) => {
  console.error(" MongoDB Error:", err);
});

//  CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', // local URL
  'https://bliss-organic-store.netlify.app' // production URL
];

app.use(cors({
  origin: ['http://localhost:5173', 'https://bliss-organic-store.netlify.app'],
  credentials: true,
}));

//  Middlewares
app.use(express.json());

//  Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

//  Default Route
app.get('/', (req, res) => {
  res.send(' Bliss Organic Store Backend Running...');
});

//  Fallback route (for 404)
app.use((req, res, next) => {
  res.status(404).json({ message: ' Route not found' });
});

//  Start Server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
