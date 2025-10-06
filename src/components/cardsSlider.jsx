// src/components/CardsSlider.js
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import cardsData from "../data/cardsData";
import "./cardsSlider.css";
import FindDoctorPage from "../pages/findDoctorPage";

const CardsSlider = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      if (
        scrollRef.current.scrollLeft + scrollRef.current.offsetWidth >=
        scrollRef.current.scrollWidth
      ) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }
  };

  const handleCardClick = (category) => {
    navigate(`/FindDoctorPage?speciality=${encodeURIComponent(category)}`);
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      scrollRight();
    }, 3000);
    return () => clearInterval(autoScroll);
  }, []);

  return (
    <div className="expert-slider-section">
      <h1 className="section-title-card">
        Get Expert Medical Care Online or In-Clinic for your Health Need
      </h1>

      <div className="slider-container" ref={scrollRef}>
        {cardsData.map((item, index) => (
          <div
            className="slide-item"
            key={index}
            onClick={() => handleCardClick(item.category)}
          >
            <img src={item.img} alt={item.title} />
            <div className="slide-title">{item.title}</div>
          </div>
        ))}
        <div className="slider-navigation">
          <button onClick={scrollLeft}>&#10094;</button>
          <button onClick={scrollRight}>&#10095;</button>
        </div>
      </div>
    </div>
  );
};

export default CardsSlider;
