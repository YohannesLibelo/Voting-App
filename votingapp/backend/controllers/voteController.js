const Vote = require("../models/voteSchema");
const User = require("../models/userSchema");
const { ObjectId } = require("mongoose").Types;

// Controller to cast a vote for a candidate
exports.castVote = async (req, res) => {
  const { candidateId } = req.body;
  const userId = req.user.id; // Assuming you have implemented authentication middleware to get the user ID

  try {
    // Validate that the candidateId is a valid ObjectId
    if (!ObjectId.isValid(candidateId)) {
      return res.status(400).json({ message: "Invalid candidateId" });
    }
    
    // Check if the user has already voted
    const user = await User.findById(userId);
    if (user.hasVoted) {
      console.log("User has already voted");
      return res.status(400).json({ message: "You have already voted." });
    }

    // Create a new vote document
    const vote = new Vote({
      voterId: userId,
      candidateId,
    });

    // Save the vote document
    await vote.save();

    // Update the user's hasVoted status
    user.hasVoted = true;
    await user.save();

    res.json({ message: "Vote cast successfully." });
  } catch (error) {
    // Log the error for debugging
    console.error("Vote casting error:", error);

    res.status(500).json({ message: error.message });
  }
};

// Controller to retrieve the user's own vote
exports.getUserVote = async (req, res) => {
  const userId = req.user.id; // Assuming you have implemented authentication middleware to get the user ID

  try {
    // Find the vote document associated with the user
    const vote = await Vote.findOne({ voterId: userId });
    if (!vote) {
      return res.status(404).json({ message: "Vote not found." });
    }

    res.json(vote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller method to aggregate votes for each candidate with candidate names
// Controller method to aggregate votes for each candidate with candidate names
exports.aggregateVotes = async (req, res) => {
  try {
    // Aggregate votes using MongoDB aggregation pipeline
    const aggregationResult = await Vote.aggregate([
      {
        $group: { _id: "$candidateId", totalVotes: { $sum: 1 } }
      },
      {
        $lookup: {
          from: "candidates", // Assuming your candidates collection is named "candidates"
          localField: "_id",
          foreignField: "_id",
          as: "candidate"
        }
      },
      {
        $unwind: "$candidate" // Unwind the candidate array
      },
      {
        $project: {
          candidateName: "$candidate.name",
          totalVotes: 1
        }
      }
    ]);

    res.json(aggregationResult);
  } catch (error) {
    console.error("Error aggregating votes:", error);
    res.status(500).json({ message: "Error aggregating votes" });
  }
};

