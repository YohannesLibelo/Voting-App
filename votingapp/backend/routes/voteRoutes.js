const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");
const { authenticateUserMiddleware } = require("../middleware/middleware");

// Cast a vote for a candidate
router.post("/vote", authenticateUserMiddleware, voteController.castVote);

// Route to aggregate votes for each candidate
router.get("/aggregate-votes", voteController.aggregateVotes);

// Retrieve the user's own vote
router.get(
  "/user-vote",
  authenticateUserMiddleware,
  voteController.getUserVote
);

module.exports = router;
