import React, { useState } from 'react';
import './ImagesSection.css';
import PopupGallery from './PopupGallery';

const ImagesSection = ({ restaurant }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => setIsPopupOpen(true);
  const handlePopupClose = () => setIsPopupOpen(false);

  return (
    <section className="images-section">
      <div className="info-container">
        <h1 className="restaurant-name">{restaurant.name}</h1>
        <p className="restaurant-details">
          {restaurant.address} | {restaurant.cuisine} | {restaurant.reviews} Reviews
        </p>
      </div>

      <div className="images-container">
        {restaurant.images.slice(0, 4).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Restaurant ${index + 1}`}
            className="restaurant-image"
          />
        ))}

        <div className="see-more-container" onClick={handlePopupOpen}>
          <div className="see-more-overlay">
            <span>See More Photos</span>
          </div>
          <img
            src={restaurant.images[4] || restaurant.images[0]}
            alt="See More"
            className="restaurant-image see-more-image"
            onClick={handlePopupOpen}
          />
        </div>
      </div>

      {isPopupOpen && (
        <PopupGallery
          images={restaurant.images}
          onClose={handlePopupClose}
        />
      )}
    </section>
  );
};

export default ImagesSection;
