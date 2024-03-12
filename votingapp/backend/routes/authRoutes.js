/* This code sets up an Express router, defines routes with corresponding HTTP methods and paths,
applies middleware to certain routes, and assigns controller functions to handle the logic for each route. */

// import necessary modules
const express = require("express");
const router = express.Router();

// import middleware functions -> 
const {
  verifyEmailMiddleware
} = require("../middleware/verifyEmail");

// import controllers -> handler functions for user-related routes
const userController = require("../controllers/userController");

// POST request to register a new user
router.post("/register",verifyEmailMiddleware, userController.register);

// POST request to login a user
router.post("/login", userController.login);

const provinces = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
];

// GET request to fetch the list of provinces
router.get("/provinces", (req, res) => {
  res.json(provinces);
});


// export the router
module.exports = router;
