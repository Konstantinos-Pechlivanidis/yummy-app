import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Title */}
      <h1 className="footer-title">Join The Community</h1>

      {/* Signup Section */}
      <div className="footer-signup">
        <input
          type="email"
          placeholder="Enter your email"
          className="footer-input"
        />
        <button className="footer-button">Sign Up</button>
      </div>

      {/* Description */}
      <p className="footer-description">
        No spam. Just weekly news from Yummy!
      </p>
      <div className="footer-overlay">
        {/* Links Section */}
        <div>
          <div className="footer-links">
            <a href="/privacy-policy" className="footer-link">
              Privacy Policy
            </a>
            <a href="/terms-conditions" className="footer-link">
              Terms And Conditions
            </a>
          </div>
          <div className="footer-links">
            <span className="footer-divider">|</span>
            <a href="/home" className="footer-link">
              Home
            </a>
            <a href="/search" className="footer-link">
              Reserve a Table
            </a>
            {/* <a href="/reservations" className="footer-link">
              My Reservations
            </a> */}
            <a href="/profile" className="footer-link">
              Profile
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
