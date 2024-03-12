import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/Username.module.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import toast from "react-hot-toast"; // Import toast for displaying notifications
import "./CandidateCard.css";

const CandidateCard = ({ isLoggedIn }) => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [manifestoText, setManifestoText] = useState("");
  const [userHasVoted, setUserHasVoted] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/candidates/candidates"
        );
        setCandidates(response.data);
        console.log("Candidates:", response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    // Check if the user has voted whenever the selectedCandidate state changes
    setUserHasVoted(selectedCandidate !== null);
  }, [selectedCandidate]);

  // Assuming you've addressed the potential causes above...

  const handleVote = async (candidateId, position) => {
    if (!isLoggedIn) {
      toast.error("Please sign in to vote.");
      return;
    }
  
    // Check if the user has already voted
    if (userHasVoted) {
      toast.error("You have already voted.");
      return;
    }
  
    try {
      setShowModal(true);
      const candidate = candidates.find((c) => c._id === candidateId);
      setManifestoText(candidate.manifesto);
      setSelectedCandidate(candidateId);
  
      console.log("Vote button clicked for candidate ID:", candidateId);
  
      // Make sure the vote is actually cast and recorded correctly
      await castVote(candidateId);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === "You have already voted.") {
        toast.error("You have already voted.");
      } else {
        console.error("Error handling vote:", error);
        toast.error("You have already voted.");
      }
    }
  };
  
  

  const castVote = async (candidateId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8080/votes/vote",
        { candidateId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Vote cast successfully:", response.data);
      toast.success("Vote cast successfully.");

      // Update candidates and userHasVoted state appropriately
      // (assuming you have a backend mechanism to update votes)
    } catch (error) {
      console.error("Error casting vote:", error.response.data.message);
      toast.error("You have already voted.");
    }
  };

  const confirmVote = () => {
    setShowModal(false);
    castVote(selectedCandidate);
  };

  const cancelVote = () => {
    setShowModal(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="container mx-auto" style={{ padding: "1px" }}>
      <div className="flex justify-center">
        <div className={styles.glass} style={{ width: "90%" }}>
          <div className="card p-4">
            <div className="card-body">
              <h2 className="text-center mb-4">President Candidates</h2>
              <div className="row row-cols-2 g-4">
                {candidates
                  .filter((candidate) => candidate.position === "President")
                  .map((candidate) => (
                    <div key={candidate._id} className="col">
                      <div className="card">
                        <img
                          src={candidate.image}
                          className="card-img-top"
                          alt=""
                          style={{
                            width: "100%",
                            height: "600px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="card-body text-center">
                          <h4 className="card-title">{candidate.name}</h4>
                          <h5 className="card-text">
                            Running for: {candidate.position}
                          </h5>
                          <p
                            className="card-text"
                            style={{ maxWidth: "300px", margin: "0 auto" }}
                          >
                            {candidate.manifesto}
                          </p>
                        </div>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() =>
                            handleVote(candidate._id, candidate.position)
                          }
                          disabled={userHasVoted}
                        >
                          {userHasVoted ? "Already Voted" : "Vote"}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className={styles.glass} style={{ width: "90%" }}>
          <div className="card p-4">
            <div className="card-body" id="cardVP">
              <h2 className="text-center mb-4">Vice-President Candidates</h2>
              <div className="row row-cols-2 g-4">
                {candidates
                  .filter(
                    (candidate) => candidate.position === "Vice-President"
                  )
                  .map((candidate) => (
                    <div key={candidate._id} className="col">
                      <div className="card">
                        <img
                          src={candidate.image}
                          className="card-img-top"
                          alt=""
                          style={{
                            width: "100%",
                            height: "600px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="card-body text-center">
                          <h4 className="card-title">{candidate.name}</h4>
                          <h5 className="card-text">
                            Running for: {candidate.position}
                          </h5>
                          <p
                            className="card-text"
                            style={{ maxWidth: "300px", margin: "0 auto" }}
                          >
                            {candidate.manifesto}
                          </p>
                        </div>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() =>
                            handleVote(candidate._id, candidate.position)
                          }
                          disabled
                        >
                          Vice-President Vote (Expired)
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isLoggedIn && (
        <div className="text-center py-4">
          <div className="flex justify-center">
            <div className={styles.glass} style={{ width: "60%" }}>
              <div className="card p-4">
                <div className="card-body">
                  <div className="row justify-content-center">
                    <span className="text-gray-500">
                      New User?{" "}
                      <Link to="/register" className="text-red-500">
                        Sign Up
                      </Link>{" "}
                      as a voter
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        manifestoText={manifestoText}
        confirmVote={confirmVote}
        cancelVote={cancelVote}
      />
    </div>
  );
};

export default CandidateCard;
