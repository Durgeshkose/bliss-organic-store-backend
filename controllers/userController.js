import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 🔹 User Signup Controller
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔸 Step 1: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔸 Step 2: Create a new user (password will be hashed via userModel.js pre-save middleware)
    const newUser = new User({ name, email, password });
    await newUser.save();

    // 🔸 Step 3: Respond with success message
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    // 🔸 Step 4: Catch any server/database errors
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// 🔹 User Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔸 Step 1: Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔸 Step 2: Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔸 Step 3: Create JWT token with user's id and role
    const token = jwt.sign(
      { id: user._id, role: user.role }, // 👈 role is important for frontend role-based control
      process.env.JWT_SECRET,
      { expiresIn: '3d' } // token valid for 3 days
    );

    // 🔸 Step 4: Return user info & token in response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    // 🔸 Step 5: Handle any errors
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// 🔹 Get Logged-in User Profile
export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  }
};

