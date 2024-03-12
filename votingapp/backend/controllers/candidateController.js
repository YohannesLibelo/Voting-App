const Candidate = require("../models/candidateSchema");

// Retrieve a list of candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
