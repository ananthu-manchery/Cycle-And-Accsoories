import React from 'react';
import './about.css'; // Custom CSS file for styling

export default function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Your trusted partner for cycling and accessories!</p>
      </div>
      
      <div className="about-content">
        <section className="mission-vision">
          <h2>Our Mission</h2>
          <p>
            At Cycle and Accessories, our mission is to provide high-quality, durable, and stylish cycles and accessories that cater to cycling enthusiasts of all ages. We believe that cycling is not just a mode of transportation, but a lifestyle choice that promotes health, environmental consciousness, and adventure.
          </p>
          
          <h2>Our Vision</h2>
          <p>
            Our vision is to become the leading provider of premium cycling products in the industry, offering a wide range of bicycles, gear, and accessories that meet the needs of every cyclist, from beginners to professionals. We strive to inspire people to take up cycling and make it a lifelong passion.
          </p>
        </section>

        <section className="our-story">
          <h2>Our Story</h2>
          <p>
            Established in [Year], Cycle and Accessories started with a simple idea – to make cycling accessible and enjoyable for everyone. From humble beginnings, we have grown into a community-driven company that values customer satisfaction, product innovation, and sustainability. Our team consists of cycling enthusiasts who understand the needs of riders and are passionate about delivering the best products and services.
          </p>
        </section>

        <section className="why-choose-us">
          <h2>Why Choose Us?</h2>
          <ul>
            <li><strong>Wide Range of Products:</strong> Whether you’re looking for road bikes, mountain bikes, or accessories like helmets, locks, or cycling apparel, we’ve got it all.</li>
            <li><strong>Quality Assurance:</strong> We ensure that all our products are built to last and go through rigorous testing for safety and durability.</li>
            <li><strong>Customer Support:</strong> Our friendly and knowledgeable team is always ready to assist you in finding the perfect gear for your needs.</li>
            <li><strong>Affordable Pricing:</strong> We offer competitive pricing without compromising on quality, making cycling accessible to everyone.</li>
          </ul>
        </section>

        <section className="sustainability">
          <h2>Our Commitment to Sustainability</h2>
          <p>
            At Cycle and Accessories, we are committed to reducing our environmental footprint by promoting cycling as an eco-friendly mode of transportation. We also prioritize the use of sustainable materials and practices in our product design and packaging.
          </p>
        </section>

        <section className="team">
          <h2>Meet the Team</h2>
          <p>
            Our dedicated team of cycling experts is passionate about the sport and committed to providing top-notch service. We’re more than just a business; we’re a community of cyclists who love to share our knowledge and enthusiasm with others.
          </p>
        </section>
      </div>
    </div>
  );
}
