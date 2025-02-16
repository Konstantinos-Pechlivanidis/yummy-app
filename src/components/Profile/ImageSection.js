import React from "react";
import NavbarProfile from "../Navbar/NavbarProfile";
import "./ImageSection.css";

const ImageSection = () => {
  return (
    <div className="profile-image-container">
      <div className="profile-overlay">
        <NavbarProfile />
        <h1>Profile</h1>
      </div>
    </div>
  );
};

export default ImageSection;
