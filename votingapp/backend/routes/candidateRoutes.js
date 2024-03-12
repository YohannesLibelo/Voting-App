const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");

// Retrieve a list of candidates
router.get("/candidates", candidateController.getCandidates);

module.exports = router;
