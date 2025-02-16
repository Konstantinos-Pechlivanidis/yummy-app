import React, { useState } from "react";
import ImageSection from "../components/RestaurantDetails/ImageSection";
import ImagesSection from "../components/RestaurantDetails/ImagesSection";
import ToggleSection from "../components/RestaurantDetails/ToggleSection";
import "./RestaurantDetails.css";
import img1 from "../images/mobile1.jpg";
import TableManagement from "../components/RestaurantDetails/TableManagement";
import GoogleMapComponent from "../components/RestaurantDetails/GoogleMapComponent";
import DateTimePicker from "../components/RestaurantDetails/DateTimePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer/Footer";

const RestaurantDetails = ({ restaurantId }) => {
  const [currentStep, setCurrentStep] = useState(0); // Track step index
  const steps = ["images", "datetimepicker", "reservations", "menu"];

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const restaurant = {
    id: restaurantId,
    name: "The Gourmet Spot",
    address: "123 Fine Dining Lane, Flavor Town",
    cuisine: "Italian",
    reviews: 120,
    images: [img1, img1, img1, img1, img1, img1],
    menu: {
      salads: [
        { name: "Caesar Salad", price: 10 },
        { name: "Greek Salad", price: 12 },
        { name: "Caprese Salad", price: 11 },
        { name: "Cobb Salad", price: 13 },
        { name: "Waldorf Salad", price: 12 },
        { name: "Niçoise Salad", price: 14 },
        { name: "Spinach & Strawberry Salad", price: 10 },
        { name: "Asian Sesame Salad", price: 12 },
        { name: "Southwest Chicken Salad", price: 13 },
        { name: "Garden Salad", price: 9 },
      ],
      pizzas: [
        { name: "Margherita Pizza", price: 12 },
        { name: "Pepperoni Pizza", price: 14 },
        { name: "BBQ Chicken Pizza", price: 15 },
        { name: "Hawaiian Pizza", price: 14 },
        { name: "Meat Lovers Pizza", price: 16 },
        { name: "Vegetarian Pizza", price: 13 },
        { name: "Buffalo Chicken Pizza", price: 15 },
        { name: "White Pizza", price: 14 },
        { name: "Mushroom & Truffle Pizza", price: 17 },
        { name: "Four Cheese Pizza", price: 15 },
      ],
      pastas: [
        { name: "Spaghetti Carbonara", price: 15 },
        { name: "Penne Arrabbiata", price: 13 },
        { name: "Fettuccine Alfredo", price: 14 },
        { name: "Linguine Pesto", price: 15 },
        { name: "Lasagna Bolognese", price: 16 },
        { name: "Ravioli Ricotta & Spinach", price: 14 },
        { name: "Tagliatelle Truffle", price: 18 },
        { name: "Tortellini Alfredo", price: 15 },
        { name: "Mac & Cheese", price: 12 },
        { name: "Gnocchi Sorrentina", price: 14 },
      ],
      burgers: [
        { name: "Classic Cheeseburger", price: 12 },
        { name: "Bacon BBQ Burger", price: 14 },
        { name: "Mushroom Swiss Burger", price: 13 },
        { name: "Spicy Jalapeño Burger", price: 14 },
        { name: "Veggie Burger", price: 12 },
        { name: "Blue Cheese Burger", price: 15 },
        { name: "Teriyaki Pineapple Burger", price: 14 },
        { name: "Double Patty Burger", price: 16 },
        { name: "Avocado & Egg Burger", price: 15 },
        { name: "Truffle Aioli Burger", price: 17 },
      ],
      desserts: [
        { name: "Chocolate Lava Cake", price: 8 },
        { name: "Tiramisu", price: 9 },
        { name: "New York Cheesecake", price: 10 },
        { name: "Crème Brûlée", price: 11 },
        { name: "Apple Pie", price: 8 },
        { name: "Brownie with Ice Cream", price: 9 },
        { name: "Panna Cotta", price: 10 },
        { name: "Strawberry Shortcake", price: 9 },
        { name: "Banoffee Pie", price: 11 },
        { name: "Lemon Tart", price: 10 },
      ],
    },    
    reviewComments: [
      { text: "Amazing food and great atmosphere!", author: "John Doe" },
      { text: "Best pizza in town!", author: "Jane Smith" },
    ],
  };

  const restaurantAvailability = {
    openTime: "10:00",
    closeTime: "22:00",
    blockedSlots: [
      { date: "2025-02-10", times: ["12:00", "12:30", "19:00"] },
      { date: "2025-02-12", times: ["13:00", "18:30"] },
    ],
    existingReservations: [
      { date: "2025-02-11", time: "14:00" },
      { date: "2025-02-11", time: "20:00" },
      { date: "2025-02-15", time: "19:30" },
    ],
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    scrollToElement("scrollToTop");
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
    scrollToElement("scrollToTop");
  };

  return (
    <div className="restaurant-details-wrapper">
      <div className="restaurant-details-container">
        {/* Left Sidebar */}
        <aside className="left-section">
          <div className="restaurant-container">
            <div className="restaurant-section">
              <ImageSection />
            </div>
          </div>
          <nav className="restaurant-mini-navbar">
            <ul>
              <li className={currentStep === 0 ? "active" : ""}>
                Photos & Map
              </li>
              <li className={currentStep === 1 ? "active" : ""}>Date & Time</li>
              <li className={currentStep === 2 ? "active" : ""}>
                Table Selection
              </li>
              <li className={currentStep === 3 ? "active" : ""}>
                Menu & Reviews
              </li>
            </ul>
          </nav>
        </aside>

        {/* Right Section with Steps */}
        <main className="right-section">
          <h1 style={{ visibility: "hidden" }} id="scrollToTop">Reservation Page</h1>
          <div
            className="sections-container"
            style={{ transform: `translateX(-${currentStep * 100}%)` }}
          >
            {/* Step 1: Images & Map */}
            <section className="section">
              <ImagesSection restaurant={restaurant} />
              <GoogleMapComponent
                name="The Gourmet Spot"
                location={"Κύπρου, Γλυφάδα"}
              />
              <button className="next-step-button" onClick={nextStep}>
                Start Your Reservation
              </button>
            </section>

            {/* Step 2: Date & Time Picker */}
            <section className="section">
              <DateTimePicker
                availability={restaurantAvailability}
                isOwner={false}
              />
              {/* Navigation Arrows */}
              <div className="navigation-buttons">
                {currentStep > 0 && (
                  <button className="nav-button left" onClick={prevStep}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                )}
                {currentStep !== 0 && currentStep < steps.length - 1 && (
                  <button className="nav-button right" onClick={nextStep}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                )}
              </div>
            </section>

            {/* Step 3: Table Management */}
            <section className="section">
              <TableManagement isOwner={false} />
              {/* Navigation Arrows */}
              <div className="navigation-buttons">
                {currentStep > 0 && (
                  <button className="nav-button left" onClick={prevStep}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                )}
                {currentStep !== 0 && currentStep < steps.length - 1 && (
                  <button className="nav-button right" onClick={nextStep}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                )}
              </div>
            </section>

            {/* Step 4: Menu & Reviews */}
            <section className="section">
              <ToggleSection
                menu={restaurant.menu}
                reviews={restaurant.reviewComments}
              />
              {/* Navigation Arrows */}
              <div className="navigation-buttons">
                {currentStep > 0 && (
                  <button className="nav-button left" onClick={prevStep}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                )}
                {currentStep !== 0 && currentStep < steps.length - 1 && (
                  <button className="nav-button right" onClick={nextStep}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default RestaurantDetails;
