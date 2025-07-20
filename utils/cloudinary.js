import { v2 as cloudinary } from 'cloudinary';  //  cloudinary ke v2 version ko import karna
import { CloudinaryStorage } from 'multer-storage-cloudinary';  //  CloudinaryStorage ko multer-storage-cloudinary se import karna
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config(); //  .env file load karne ke liye

//  Cloudinary configuration
//  all environment variables .env file ke sath match hone chahiye
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//  CloudinaryStorage setup for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bliss-products",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

//  Export multer upload middleware
export const upload = multer({ storage });
