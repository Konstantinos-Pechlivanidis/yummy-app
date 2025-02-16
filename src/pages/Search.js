import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer";
import HeroSection from "../components/Search/HeroSection";
import HeroImage from "../images/wide7.jpg";
import MapSection from "../components/Search/MapSection";
import "./Search.css";

const Search = () => {
  const [location] = useState([40.712776, -74.005974]);
  return (
    <>
    <Navbar />
    <div
      style={{
        height: "100vh",
      }}
    >
      <div style={{ padding: "1em", height: "100vh" }}>
        <HeroSection imageUrl={HeroImage} />
      </div>
      <div style={{ padding: "1em", margin: "0 auto" }}>
        <MapSection location={location} />
      </div>
      <div className="footer-page-section">
        <Footer />
      </div>
      <div className="spacer"></div>
    </div></>
  );
};

export default Search;
