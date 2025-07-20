import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// Admin login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check if password is correct
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return success response with token
    res.status(200).json({
      message: 'Admin login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: 'admin'
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });  
  }
};
