import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faUsers,
  faMapMarkerAlt,
  faSearch,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="reservation">
          <div className="reservation-content">
            <h1 className="reservation-title">Find Your Perfect Dining Experience</h1>
            <p className="reservation-subtitle">
              Easily filter and discover restaurants based on your preferences.
            </p>
    
            <div className="reservation-inputs">
              <div className="input-group">
                <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
                <input type="date" className="reservation-input" placeholder="Select Date" />
              </div>
    
              <div className="input-group">
                <FontAwesomeIcon icon={faClock} className="input-icon" />
                <input type="time" className="reservation-input" placeholder="Select Hour" />
              </div>
    
              <div className="input-group">
                <FontAwesomeIcon icon={faUsers} className="input-icon" />
                <input type="number" min="1" className="reservation-input" placeholder="Number of People" />
              </div>
    
              <div className="input-group">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="input-icon" />
                <input type="text" className="reservation-input" placeholder="Location" />
              </div>
    
              <div className="input-group">
                <FontAwesomeIcon icon={faSearch} className="input-icon" />
                <input type="text" className="reservation-input" placeholder="Restaurant Name (optional)" />
              </div>
    
              <button className="reservation-button">Start Booking <FontAwesomeIcon icon={faUtensils} /></button>
            </div>
          </div>
        </div>
  );
};

export default HeroSection;