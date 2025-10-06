import React from 'react';
import './Cards.css';

const Cards = ({ details }) => {
    const { name, role, image } = details;

    return (
        <li className="founderpage-developer-li">
            <img src={image} alt={`${name}`}  />
            <h3>{name}</h3>
            <p>{role}</p>
        </li>
    );
};

export default Cards;
