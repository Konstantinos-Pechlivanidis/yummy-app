import React from "react";
import "./ServiceSection.css";
import sectionImage1 from "../../images/mobile8.jpg";
import sectionImage2 from "../../images/mobile10.jpg";
import sectionImage3 from "../../images/mobile11.jpg";

const ServiceSection = ({
  onScrollToReservation,
  onScrollToTrendingRestaurants,
  onScrollTofoodSelection,
}) => {
  return (
    <section className="service-section">
      <div className="service-header">
        <h2>What We Do</h2>
        <p>
          Our app helps you find the best restaurants, select your food, and
          easily book a table for an unforgettable experience.
        </p>
      </div>

      <div className="cards-container">
        {/* Card 1 */}
        <div
          className="service-card"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.6) 50%), url(${sectionImage1})`,
          }}
        >
          <div className="card-content">
            <h3>Fast & Easy Booking</h3>
            <p>Choose your meal and pick your table. No more waiting!</p>
            <button
              className="service-button"
              onClick={onScrollToReservation}
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="service-card"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.6) 50%),url(${sectionImage2})`,
          }}
        >
          <div className="card-content">
            <h3>Restaurants Near You</h3>
            <p>
              Explore trending restaurants based on your location. Book your
              table.
            </p>
            <button
              className="service-button"
              onClick={onScrollToTrendingRestaurants}
            >
              Find Trends
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className="service-card"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.6) 50%),url(${sectionImage3})`,
          }}
        >
          <div className="card-content">
            <h3>Filter by Food Preferences</h3>
            <p>
              Select your favorite food, find the best restaurants offering
              exactly what you crave!
            </p>
            <button
              className="service-button"
              onClick={onScrollTofoodSelection}
            >
              Select Food
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
