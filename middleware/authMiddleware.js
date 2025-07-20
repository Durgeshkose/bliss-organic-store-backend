import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//  Middleware: Protect (for both user and admin)
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

//  Middleware to verify token (user or admin)
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //  Check if token is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    //  Decode token and attach to request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user object me id & role mil jayega
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

//  Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  //  verifyToken me already req.user set ho chuka hoga
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};
