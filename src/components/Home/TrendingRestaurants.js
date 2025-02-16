import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TrendingRestaurants.css";
import restaurant1 from "../../images/mobile1.jpg";
import restaurant2 from "../../images/mobile2.jpg";
import restaurant3 from "../../images/mobile3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const restaurants = [
  {
    id: 1,
    image: restaurant1,
    name: "The Gourmet Spot",
    location: "Thessaloniki",
    address: "123 Aristotelous Street",
    rating: 4.8,
    reviews: 1500,
  },
  {
    id: 2,
    image: restaurant2,
    name: "Athens Bites",
    location: "Athens",
    address: "45 Kolonaki Square",
    rating: 4.6,
    reviews: 2100,
  },
  {
    id: 3,
    image: restaurant3,
    name: "Seafood Paradise",
    location: "Santorini",
    address: "78 Oia Road",
    rating: 4.7,
    reviews: 900,
  },
];

const TrendingRestaurants = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "10px",
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="trending-section">
      <h2 className="trending-header">What People Love Today</h2>
      <Slider {...settings} className="trending-carousel">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="carousel-item">
            <div
              className="carousel-card"
              style={{ backgroundImage: `url(${restaurant.image})` }}
            >
              <div className="card-overlay">
                <div className="card-text">
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.location}, {restaurant.address}</p>
                  <div className="reviews">
                    <i className="fa fa-star" aria-hidden="true"></i> {restaurant.rating} ({restaurant.reviews})
                  </div>
                </div>
                <button className="details-button">
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingRestaurants;
