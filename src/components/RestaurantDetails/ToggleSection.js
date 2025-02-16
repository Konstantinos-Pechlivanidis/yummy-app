import React, { useState } from "react";
import "./ToggleSection.css";

const ToggleSection = ({ menu, reviews }) => {
  const [activeSection, setActiveSection] = useState("menu");
  const [activeCategory, setActiveCategory] = useState("salads");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Pagination State for Reviews
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const reviewsPerPage = 5;
  const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage);

  // Pagination State for Menu Items
  const [currentMenuPage, setCurrentMenuPage] = useState(1);
  const dishesPerPage = 10;
  const totalMenuPages = Math.ceil(
    menu[activeCategory]?.length / dishesPerPage
  );

  const handleSectionToggle = (section) => setActiveSection(section);
  const handleCategoryToggle = (category) => {
    setActiveCategory(category);
    setCurrentMenuPage(1); // Reset menu pagination when switching categories
  };

  const handleItemClick = (item) => {
    setSelectedItems((prevItems) => {
      const itemExists = prevItems.find((i) => i.name === item.name);
      return itemExists
        ? prevItems.filter((i) => i.name !== item.name)
        : [...prevItems, item];
    });
  };

  const calculateTotalPrice = () =>
    selectedItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  // Pagination Functions for Reviews
  const handleNextReviewPage = () => {
    if (currentReviewPage < totalReviewPages)
      setCurrentReviewPage(currentReviewPage + 1);
  };

  const handlePrevReviewPage = () => {
    if (currentReviewPage > 1) setCurrentReviewPage(currentReviewPage - 1);
  };

  // Pagination Functions for Dishes
  const handleNextMenuPage = () => {
    if (currentMenuPage < totalMenuPages)
      setCurrentMenuPage(currentMenuPage + 1);
  };

  const handlePrevMenuPage = () => {
    if (currentMenuPage > 1) setCurrentMenuPage(currentMenuPage - 1);
  };

  const startReviewIndex = (currentReviewPage - 1) * reviewsPerPage;
  const selectedReviews = reviews.slice(
    startReviewIndex,
    startReviewIndex + reviewsPerPage
  );

  const startMenuIndex = (currentMenuPage - 1) * dishesPerPage;
  const selectedDishes =
    menu[activeCategory]?.slice(
      startMenuIndex,
      startMenuIndex + dishesPerPage
    ) || [];

  return (
    <div className="toggle-section">
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${
            activeSection === "menu" ? "active" : ""
          }`}
          onClick={() => handleSectionToggle("menu")}
        >
          Menu
        </button>
        <button
          className={`toggle-button ${
            activeSection === "reviews" ? "active" : ""
          }`}
          onClick={() => handleSectionToggle("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className="content-section">
        {activeSection === "menu" ? (
          <div className="menu-content">
            <h2>Menu</h2>

            {/* Category Buttons */}
            <div className="category-buttons">
              {Object.keys(menu).map((category) => (
                <button
                  key={category}
                  className={`category-button ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Menu Items in Selected Category with Pagination */}
            <ul className="menu-list">
              {selectedDishes.map((item, index) => (
                <li
                  key={index}
                  className={`menu-item ${
                    selectedItems.some((i) => i.name === item.name)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span>{item.name}</span>
                  <span className="menu-price">${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>

            {/* Pagination for Menu Items */}
            {totalMenuPages > 1 && (
              <div className="pagination-controls">
                <button
                  className="pagination-button"
                  onClick={handlePrevMenuPage}
                  disabled={currentMenuPage === 1}
                >
                  Previous
                </button>
                <span className="pagination-info">
                  Page {currentMenuPage} of {totalMenuPages}
                </span>
                <button
                  className="pagination-button"
                  onClick={handleNextMenuPage}
                  disabled={currentMenuPage === totalMenuPages}
                >
                  Next
                </button>
              </div>
            )}

            {/* Show button if at least one item is selected */}
            {selectedItems.length > 0 && (
              <button
                className="view-order-button"
                onClick={() => setShowPopup(true)}
              >
                View Selected Items
              </button>
            )}
          </div>
        ) : (
          <div className="reviews-content">
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
              <>
                {selectedReviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <p className="review-text">"{review.text}"</p>
                    <p className="review-author">- {review.author}</p>
                  </div>
                ))}
                {/* Pagination for Reviews */}
                {totalMenuPages > 1 && (
                  <div className="pagination-controls">
                    <button
                      className="pagination-button"
                      onClick={handlePrevReviewPage}
                      disabled={currentReviewPage === 1}
                    >
                      Previous
                    </button>
                    <span className="pagination-info">
                      Page {currentReviewPage} of {totalReviewPages}
                    </span>
                    <button
                      className="pagination-button"
                      onClick={handleNextReviewPage}
                      disabled={currentReviewPage === totalReviewPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        )}
      </div>

      {/* Popup for Selected Items */}
      {showPopup && (
        <div className="order-popup">
          <div className="order-popup-content">
            <h2>Your Selection</h2>
            <ul className="selected-items-list">
              {selectedItems.map((item, index) => (
                <li key={index} className="selected-item">
                  {item.name} - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="total-price">
              Total: <strong>${calculateTotalPrice()}</strong>
            </p>
            <button
              className="close-popup-button"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToggleSection;
