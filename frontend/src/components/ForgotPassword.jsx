import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './forgotpassword.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/forgot-password', { email });

      if (response.data.success) {
        setMessage('A password reset link has been sent to your email.');
      } else {
        setErrorMessage('Unable to send reset link. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div id="forgotpassword-container">
      <h1>Forgot Password</h1>
      <form id="forgotpassword-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="forgotpassword-btn" type="submit">
          Reset Password
        </button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <p>Remembered your password? <Link to='/signin'>Sign in</Link></p>
    </div>
  );
}
