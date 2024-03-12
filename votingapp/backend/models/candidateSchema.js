const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String, required: true },
  position: { type: String, required: true }, // Position of the candidate
  image: { type: String, required: true }, // File path of the candidate's image
  manifesto: { type: String }, // Optional manifesto text
  votes: { type: Number, default: 0 },

});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;


