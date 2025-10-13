// src/BusinessHome.jsx
import React from "react";
import "./BusinessHome.css";

const BusinessHome = () => {
  return (
    <div className="business-home">
      <header className="hero-section">
        <h1>Welcome to BizSpark Solutions</h1>
        <p>Empowering your business with smart, scalable solutions.</p>
        <div className="cta-buttons">
          <button onClick={() => window.location.href = "/services"}>Our Services</button>
          <button onClick={() => window.location.href = "/contact"}>Get in Touch</button>
        </div>
      </header>

      <section className="features-section">
        <h2>What We Offer</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Digital Transformation</h3>
            <p>Upgrade your systems with cutting-edge digital tools.</p>
          </div>
          <div className="feature-card">
            <h3>Consulting</h3>
            <p>Expert guidance to help you make the right decisions.</p>
          </div>
          <div className="feature-card">
            <h3>Custom Software</h3>
            <p>Tailored solutions designed specifically for your needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessHome;
