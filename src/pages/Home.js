import React, { useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/Home/HeroSection";
import ServiceSection from "../components/Home/ServiceSection";
import TrendingRestaurants from "../components/Home/TrendingRestaurants";
import FoodSelection from "../components/Home/FoodSelection";
import ReservationSection from "../components/Home/ReservationSection";
import Footer from "../components/Footer/Footer";
import "./Home.css";

const Home = () => {
  const reservationRef = useRef(null);
  const trendingRestaurantsRef = useRef(null);
  const foodSelectionRef = useRef(null);

  const scrollToReservation = () => {
    reservationRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTrendingRestaurants = () => {
    trendingRestaurantsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollTofoodSelection = () => {
    foodSelectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <Navbar />
    <div
      style={{
        height: "100vh",
        margin: "0 auto"
      }}
    >
      <div style={{ padding: "1em", height: "100vh" }}>
        <HeroSection onScrollToReservation={scrollToReservation} />
      </div>
      <div style={{ padding: "1em" }}>
        <ServiceSection
          onScrollToReservation={scrollToReservation}
          onScrollToTrendingRestaurants={scrollToTrendingRestaurants}
          onScrollTofoodSelection={scrollTofoodSelection} />
      </div>
      <div style={{ padding: "1em" }} ref={reservationRef}>
        <ReservationSection />
      </div>
      <div style={{ width: "100%", overflow: "hidden" }} ref={trendingRestaurantsRef}>
        <TrendingRestaurants />
      </div>
      <div style={{ width: "100%", overflow: "hidden" }} ref={foodSelectionRef}>
        <FoodSelection />
      </div>
      <div className="footer-page-section">
        <Footer />
      </div>
      <div className="spacer"></div>
    </div></>
  );
};

export default Home;
