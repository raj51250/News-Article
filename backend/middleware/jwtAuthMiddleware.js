const jwt = require("jsonwebtoken");

// Load environment variables from .env file
require("dotenv").config();
const SECRET_KEY = process.env.SECRET;

const jwtAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = jwtAuthMiddleware;
