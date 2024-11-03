
import React, { useState } from 'react';
import "./signin.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthContext'; 

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUserId } = useAuth();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";
  
    try {
      // Check if the user is an admin by verifying the email and password
      if (email === adminEmail && password === adminPassword) {
        // Navigate to the admin dashboard if credentials match
        navigate('/admin-dashboard', { state: { message: 'Welcome Admin!' } });
      } else {
        // Proceed with regular authentication via the API
        const response = await axios.post('http://localhost:5000/api/users/signin', { email, password });
        
        if (response.data.success) {
          localStorage.setItem("authToken", response.data.authToken);
          localStorage.setItem("user_id", response.data.userId);
          localStorage.setItem("name", response.data.username);  // Save the username here
          
          setUserId(response.data.userId); 
          
          // Check if the user is an admin and navigate accordingly
          if (response.data.isAdmin) {
            navigate('/admin-dashboard', { state: { message: 'Welcome Admin!' } }); // Navigate to admin page
          } else {
            navigate('/', { state: { message: 'Successfully logged in' } });
          }
        } else {
          if (response.data.message) {
            setErrorMessage(response.data.message); // Display the server message
          } else {
            setErrorMessage("Invalid email or password. Please try again.");
          }
        }
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 403) {
        setErrorMessage("Your account is banned. Please contact support.");
      } else {
        setErrorMessage("An error occurred during login. Please try again.");
      }
    }
  };
  
  return (
    <>
      <div id="signin-container">
        <div id="header">
          <h1 id="signin-title">Sign in</h1>
        </div>
        <div id="form-container">
          <form id="signin-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              required
              id='signin-email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              id='signin-password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='signin-btn'>Sign in</button>
          </form>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
        <p>Not Registered..? Please<Link to='/signup' style={{ textDecoration: "none"}}> Sign Up</Link></p>
        <p>Forgot Password? <Link to='/forgotpassword' style={{ textDecoration: "none"}}> Click here...</Link></p>
      </div>
    </>
  );
}
