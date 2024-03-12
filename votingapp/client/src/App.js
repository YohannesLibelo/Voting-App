import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CandidateCard from "./components/CandidateCard";
import VotingResults from "./components/VotingResults";
import toast, { Toaster } from "react-hot-toast";
import Help from "./components/Help";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        setIsRegistered(true);
        toast.success("User registered successfully.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      toast.error(`Registration failed: ${error.message}`);
    }
  };
  
  const handleViewResults = () => {
    window.location.href = "/voting-results"; // Redirect to the /voting-results route
  };

  const handleLogin = async (email, password, navigate) => {
    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        toast.error("Login failed: Invalid email or password.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed: Email has to end with '@gmail.com'.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div>
        <Header
          isLoggedIn={isLoggedIn}
          handleSignOut={handleLogout}
          handleViewResults={handleViewResults}
        />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<CandidateCard isLoggedIn={isLoggedIn} />} />
          <Route path="/modal" element={<Modal />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route path="/voting-results" element={<VotingResults />} />
          <Route path="/help" element={<Help />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
