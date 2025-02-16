import React, { useState } from 'react';
import './PopupGallery.css';

const PopupGallery = ({ images, onClose }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const handlePrevious = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="popup-gallery-overlay">
      <div className="popup-gallery">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="image-viewer">
          <button className="nav-button" onClick={handlePrevious}>❮</button>
          <img src={images[currentImage]} alt="Gallery" className="popup-image" />
          <button className="nav-button" onClick={handleNext}>❯</button>
        </div>
      </div>
    </div>
  );
};

export default PopupGallery;
