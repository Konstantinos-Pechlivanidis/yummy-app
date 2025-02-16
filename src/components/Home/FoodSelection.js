import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FoodSelection.css";
import cousine1 from "../../images/mobile1.jpg";
import cousine2 from "../../images/mobile2.jpg";
import cousine3 from "../../images/mobile3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const cousines = [
  {
    id: 1,
    image: cousine1,
    name: "Mexican",
  },
  {
    id: 2,
    image: cousine2,
    name: "Italian",
  },
  {
    id: 3,
    image: cousine3,
    name: "Asian",
  },
];

const FoodSelection = () => {
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
      <h2 className="trending-header">What’s Your Flavor Today?</h2>
      <Slider {...settings} className="trending-carousel">
        {cousines.map((cousine) => (
          <div key={cousine.id} className="carousel-item">
            <div
              className="carousel-card"
              style={{ backgroundImage: `url(${cousine.image})` }}
            >
              <div className="card-overlay-food">
                <div className="card-text">
                  <h3>{cousine.name}</h3>
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

export default FoodSelection;
