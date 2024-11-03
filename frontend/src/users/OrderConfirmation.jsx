import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

export default function OrderConfirmation() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Order Placed Successfully!</h1>
      <p style={styles.message}>Thank you for your order. Your order has been placed successfully.</p>
      <Link to="/" style={styles.link}>Return to Home</Link>
    </div>
  );
}

// Styles for the component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  message: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  link: {
    fontSize: '16px',
    color: 'blue',
    textDecoration: 'underline',
  },
};
