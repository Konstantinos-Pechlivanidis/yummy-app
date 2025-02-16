import React from "react";
import "./HeroSection.css";

const HeroSection = ({ onScrollToReservation }) => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Yummy</h1>
        <p className="hero-subtitle">
          Discover and reserve your favorite dining experiences effortlessly.
        </p>
        <button className="hero-button" onClick={onScrollToReservation}>
          Let's Go!
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
