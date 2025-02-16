// src/pages/Profile.js
import React from "react";
import ImageSection from "../components/Profile/ImageSection";
import ProfileForm from "../components/Profile/ProfileForm";
import "./Profile.css";

const Profile = () => {
  return (
    <div style={{ padding: "1em", height: "95vh" }}>
      <div className="profile-container">
        <div className="profile-section">
          <ImageSection />
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default Profile;
