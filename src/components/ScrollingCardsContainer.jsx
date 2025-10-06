import React, { useState, useEffect } from "react";
import "./ScrollingCardsContainer.css";
import cardsData from "../data/cardsData";

export default function ScrollingCardsContainer() {
  const [paused, setPaused] = useState(false);

  // You can tweak this speed factor (in seconds per card)
  const secondsPerCard = 1;
  const totalCards = cardsData.length * 3; // because we are doubling cards
  const totalDuration = totalCards * secondsPerCard;

  return (
    <div
      className={`slider-container ${paused ? "paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    > 
      <div
        className="slider-track"
        style={{ animationDuration: `${totalDuration}s` }}
      >
        <h1>Doctors Based on Your Needs</h1>
        {[...cardsData, ...cardsData].map((card, i) => (
          <div className="ScrollingCard" key={i}>
            <img src={card.img} alt={card.title} />
            <h3 className="cardTitle">{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
