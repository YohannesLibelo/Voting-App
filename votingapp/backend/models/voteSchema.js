const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  voterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Candidate",
  },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
