// middleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/userSchema.js");

const authenticateUserMiddleware = async (req, res, next) => {
  try {
    // Check if the Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization header missing or invalid" });
    }

    // Extract the JWT token from the Authorization header
    const token = authHeader.split(" ")[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, "secretKey");
    console.log("Decoded token:", decoded);

    // Extract the user ID from the decoded token
    const userId = decoded.userId;

    // Retrieve the user from the database
    const user = await User.findById(userId);

    // If the user is not found, send an error response
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach the authenticated user to the request object
    req.user = user;

    // Call the next function
    next();
  } catch (err) {
    // Log the error for debugging
    console.error("Authentication error:", err);

    // Send appropriate error response based on the error type
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    } else if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
};



module.exports = {
  authenticateUserMiddleware,
};
