import React from "react";
import "./GoogleMapComponent.css";

const GoogleMapComponent = ({ name, location }) => {
  // Construct a Google Maps search URL
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " " + location)}`;

  return (
    <div className="google-map-container">
      {/* <h2 className="map-title">Location</h2> */}

      {/* Display a Static Map Image */}
      <img
        src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
          location
        )}&zoom=15&size=600x300&maptype=roadmap
        &markers=color:red%7Clabel:R%7C${encodeURIComponent(location)}
        &key=`}
        alt="Restaurant Location"
        className="map-image"
        onClick={() => window.open(googleMapsLink, "_blank")}
      />

      {/* Open Google Maps Search */}
      <button className="open-maps-button" onClick={() => window.open(googleMapsLink, "_blank")}>
        Open in Google Maps
      </button>
    </div>
  );
};

export default GoogleMapComponent;