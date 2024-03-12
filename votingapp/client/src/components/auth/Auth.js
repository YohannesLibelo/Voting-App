/* The Parent component manages the state of the application, handles user registration and login,
and interacts with a backend API to perform CRUD operations on tasks.*/

// import necessary modules
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";
import ChangePassword from "./components/ChangePassword";
import "./App.css";

// functional component using arrow function syntax
const Auth = () => {
  // manages the state of logged in or not -> initial state is false
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // manages the state of registered or not -> initial state is false
  const [isRegistered, setIsRegistered] = useState(false);
  

  // asynchronous function that handles the registration submission - has two parameters
  const handleRegister = async (username, password) => {
    try {
      // sends a POST request to the API with the username and password in the body request
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // if the response was OK
      if (response.status === 200) {
        // alert the user
        alert("User registered successfully.");
        // Update the state to indicate successful registration
        setIsRegistered(true);
        // if the response was a Bad Request
      } else if (response.status === 400) {
        const data = await response.json();
        // log  the error
        console.log("Registration failed:", data.error);
        // alert the user
        alert("Registration failed!");
        // if the response code was Forbidden
      } else if (response.status === 403) {
        // log  the error
        console.log("Registration forbidden: User not allowed.");
        // alert the user
        alert("Registration forbidden: Username has to end with '@gmail.com'.");
      } else {
        // log the error
        console.log("Registration failed with status:", response.status);
        // alert the user
        alert("Username already exists!");
      }
    } catch (error) {
      // log the error
      console.error("Error during registration:", error.message);
    }
  };

  // asynchronous function that handles the login submission - has two parameters
  const handleLogin = async (username, password) => {
    try {
      // sends a POST request to the API with the username and password in the body request
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // if the response was OK
      if (response.ok) {
        const data = await response.json();
        // saves the authentication token in local storage
        localStorage.setItem("token", data.token);
        // sets the logged in state to true -> displays the logged in view
        setIsLoggedIn(true);
      } else {
        // if there was an error
        const errorData = await response.json();
        // log the error
        console.error("Login failed:", errorData.message);
        // alert the user
        alert("Login failed: Invalid username or password");
      }
      // if there was an error
    } catch (error) {
      // log the error
      console.error("Error logging in:", error);
      // alert the user
      alert("Login forbidden: Username has to end with '@gmail.com'.");
    }
  };

  useEffect(() => {
    const checkRegistrationStatus = () => {
      // retrieves the token value
      const token = localStorage.getItem("token");
      // shorthand way of of converting the token value to a boolean
      // if the token is true (not empty) the status is evaluated to true and vice versa
      setIsRegistered(!!token);
    };
    // function is called
    checkRegistrationStatus();
  }, []);

  // function to allow the user to logout
  const handleLogout = () => {
    // set logged in to false
    setIsLoggedIn(false);
    // clear the token form the storage
    localStorage.removeItem("token");
  };

  return (
    <div>
      <h1>To-Do List App</h1>

      {/* if user is registered, display the login page */}
      {isRegistered ? (
        <>
          {isLoggedIn ? ( // Check if user is already logged in
            <>
              {/* handles the change of forms */}
              <Button
                style={{ position: "absolute", top: "15px", right: "20px" }}
                onClick={() => setIsRegistered(false)}
              >
                Register
              </Button>
            </>
          ) : (
            // if user is registered, display the login page
            <>
              <div className="container">
                {/* pass prop down */}
                <Login handleLogin={handleLogin} />
              </div>
              {/* handles the change of forms */}
              <Button
                style={{ position: "absolute", top: "15px", right: "20px" }}
                onClick={() => setIsRegistered(false)}
              >
                Register
              </Button>
            </>
          )}
        </>
      ) : (
        // if user is not registered, display the registration page
        <>
          <div className="container">
            {/* passes prop down */}
            <Register handleRegister={handleRegister} />
          </div>
          {/* handles the change of forms */}
          <Button
            style={{ position: "absolute", top: "15px", right: "20px" }}
            onClick={() => setIsRegistered(true)}
          >
            Login
          </Button>
        </>
      )}
    </div>
  );
};

// export the component
export default Auth;
