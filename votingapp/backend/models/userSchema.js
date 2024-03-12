const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Make sure the unique constraint is applied to the email field
  password: { type: String, required: true },
  hasVoted: { type: Boolean, default: false }, // Indicates whether the user has voted
});

const User = mongoose.model("User", userSchema);

module.exports = User;
