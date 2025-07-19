// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config(); // ✅ .env file load karne ke liye

// ✅ Cloudinary ko config karo using same env variable names as .env
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,          // match with .env
  api_key: process.env.CLOUD_API_KEY,          // match with .env
  api_secret: process.env.CLOUD_API_SECRET,    // match with .env
});

// ✅ CloudinaryStorage setup for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bliss-products",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// ✅ Export multer upload middleware
export const upload = multer({ storage });
