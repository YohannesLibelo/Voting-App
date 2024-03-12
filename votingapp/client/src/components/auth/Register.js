// Register.js
import React, { useState } from "react";
import styles from "../styles/Username.module.css";
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";


const Register = ({ handleRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleRegister(email, password);
      setEmail("");
      setPassword("");
      navigate("/login"); // Redirect to the login page after successful registration
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
            <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.glass} style={{ width: "50%", height: "60%" }}>
        <div className="title flex flex-col items-center">
          <h4 className="text-5xl font-bold">Hello</h4>
          <span className="py-4 text-xl w-2/3 text-center text-gray-500">
            Please register to vote
          </span>
        </div>
        <form className="py-1" onSubmit={handleSubmit}>
          <div className="textbox flex flex-col items-center gap-6">
            <input
              className={styles.textbox}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.textbox}
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.btn} type="submit">
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center py-4">
          <span className="text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;