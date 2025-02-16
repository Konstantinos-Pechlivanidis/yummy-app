import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapSection.css";
import L from "leaflet";
import img1 from "../../images/wide6.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// Dummy restaurant data
const restaurants = [
  {
    id: 1,
    name: "The Gourmet Spot",
    location: "London, UK",
    cuisine: "Fine Dining",
    lat: 51.505,
    lng: -0.09,
    image: img1,
  },
  {
    id: 2,
    name: "Bistro Bliss",
    location: "London, UK",
    cuisine: "Bistro",
    lat: 51.51,
    lng: -0.1,
    image: img1,
  },
  {
    id: 3,
    name: "Sushi Sensation",
    location: "London, UK",
    cuisine: "Japanese",
    lat: 51.507,
    lng: -0.08,
    image: img1,
  },
  {
    id: 4,
    name: "Pasta Paradise",
    location: "London, UK",
    cuisine: "Italian",
    lat: 51.503,
    lng: -0.12,
    image: img1,
  },
  {
    id: 5,
    name: "The Vegan Haven",
    location: "London, UK",
    cuisine: "Vegan",
    lat: 51.509,
    lng: -0.07,
    image: img1,
  },
  {
    id: 6,
    name: "Burger Bliss",
    location: "London, UK",
    cuisine: "Fast Food",
    lat: 51.506,
    lng: -0.11,
    image: img1,
  },
  {
    id: 7,
    name: "Curry Kingdom",
    location: "London, UK",
    cuisine: "Indian",
    lat: 51.508,
    lng: -0.13,
    image: img1,
  },
  {
    id: 8,
    name: "Dragon's Delight",
    location: "London, UK",
    cuisine: "Chinese",
    lat: 51.504,
    lng: -0.14,
    image: img1,
  },
  {
    id: 9,
    name: "Taco Fiesta",
    location: "London, UK",
    cuisine: "Mexican",
    lat: 51.502,
    lng: -0.1,
    image: img1,
  },
  {
    id: 10,
    name: "Taco Fiesta",
    location: "London, UK",
    cuisine: "Mexican",
    lat: 52.502,
    lng: -0.1,
    image: img1,
  },
  {
    id: 11,
    name: "Taco Fiesta",
    location: "London, UK",
    cuisine: "Mexican",
    lat: 53.502,
    lng: -0.1,
    image: img1,
  },
  {
    id: 12,
    name: "Taco Fiesta",
    location: "London, UK",
    cuisine: "Mexican",
    lat: 54.502,
    lng: -0.1,
    image: img1,
  },
  {
    id: 13,
    name: "Taco Fiesta",
    location: "London, UK",
    cuisine: "Mexican",
    lat: 54.502,
    lng: -0.1,
    image: img1,
  },
  {
    id: 14,
    name: "Taco Fiesta",
    location: "London, UK",
    cuisine: "Mexican",
    lat: 55.502,
    lng: -0.1,
    image: img1,
  },
];

// Fix for missing marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapSection = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of cards per page

  // Pagination logic
  const totalPages = Math.ceil(restaurants.length / itemsPerPage);
  const paginatedRestaurants = restaurants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCardClick = (id) => {
    // Redirect to the restaurant details page with the restaurant ID
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="map-section">
      <div className="restaurant-details-list">
        <h2>Restaurants</h2>
        <div className="restaurant-details-cards">
          {paginatedRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="restaurant-details-card"
              onClick={() => handleCardClick(restaurant.id)}
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="restaurant-details-image"
              />
              <div className="restaurant-details-info">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.location}</p>
                <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <div className="map-container">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          className="styled-map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={[restaurant.lat, restaurant.lng]}
            >
              <Popup className="custom-popup">
                <div className="popup-content">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="popup-image"
                  />
                  <div className="popup-info">
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.location}</p>
                    <p>
                      <strong>Cuisine:</strong> {restaurant.cuisine}
                    </p>
                  </div>
                  <button
                    className="details-button"
                    onClick={() => handleCardClick(restaurant.id)}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapSection;
