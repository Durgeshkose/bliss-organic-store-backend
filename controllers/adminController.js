import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// 🔹 Admin Login Controller (Plain Password)
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Step 1: Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Step 2: Plain text password comparison
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Step 3: Create JWT token
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Step 4: Send response
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
