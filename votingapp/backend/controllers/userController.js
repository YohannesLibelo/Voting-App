const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema.js");

// Register a user
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Attempting to register user:", email); // Log the email being registered

    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists:", email); // Log that the user already exists
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    console.log("User registered successfully:", email); // Log successful registration
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err.message); // Log any errors
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Attempting to login user:", email); // Log the email being logged in

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found:", email); // Log that the user was not found
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // JWT token is generated using the user's ID and secret key

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("Invalid password for user:", email); // Log that the password was invalid
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token using the user's ID
    const token = jwt.sign({ userId: user._id }, "secretKey");

    console.log("User logged in successfully:", email); // Log successful login
    console.log("Token:", token); // Log the token
    res.json({ token });
  } catch (err) {
    console.error("Error logging in user:", err.message); // Log any errors
    res.status(500).json({ message: "Internal server error" });
  }
};
