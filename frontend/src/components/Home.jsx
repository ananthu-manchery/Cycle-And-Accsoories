import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import "./home.css"
import { FaBars } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

 const isNewUser = true; 

export default function Home() {
  const navigate = useNavigate();


  return (
    <div className="container-fluid">
    <div className="hero-section">
      <div className="overlay"></div>
      <div className="hero-content text-center">
        <h1 className="hero-title">Welcome to Cycle & Accessories</h1>
        <p className="hero-subtitle">Find the best bikes and accessories for your next adventure</p>
        <Button className="shop-now-btn" onClick={() => navigate('/products')}>
      Shop Now
    </Button>
      </div>
    </div>
  
    {/* Featured Section */}
    <div className="featured-section">
      <h2 className="section-title text-center">#Trends</h2>
      <div className="featured-items">
        <div className="featured-item">
          <Link to="/products">
            <img className="featured-img" src={require('../images/medium.png')} alt="Cycle" />
          </Link>
          <h3 className="item-name">Latest Bikes</h3>
        </div>
        <div className="featured-item">
          <Link to="/accessories">
            <img className="featured-img" src={require('../images/medium.png')} alt="Accessories" />
          </Link>
          <h3 className="item-name">Top Accessories</h3>
        </div>
      </div>
    </div>
  
    
  
    {/* Customer Testimonials */}
    <div className="testimonial-section">
      <h2 className="section-title text-center">What Our Customers Say</h2>
      <div className="testimonials">
        <div className="testimonial">
          <p>"Best cycling experience ever! The bike quality is amazing!"</p>
          <span>- Alex Johnson</span>
        </div>
        <div className="testimonial">
          <p>"Their accessories are top-notch. My go-to shop for cycling gear!"</p>
          <span>- Emma Wilson</span>
        </div>
      </div>
    </div>
  
    {/* Footer Section */}
    <footer className="footer-section text-center">
      <p>Contact Us: info@cycleandaccessories.com | +91 8589686565</p>
      {/* <div className="social-media-links">
        <a href="#" className="social-link">Facebook</a>
        <a href="#" className="social-link">Instagram</a>
        <a href="#" className="social-link">Twitter</a>
      </div> */}
    </footer>
  </div>
  
  );
 
}




