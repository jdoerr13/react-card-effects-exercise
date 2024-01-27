import React, { useState } from "react";
import "./Card.css";


function Card({ image, value, suit, rotation }) {
  return (
    <img
      src={image}
      alt={`${value} of ${suit}`}
      style={{
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: `translate(-50%, 0) rotate(${rotation}deg)`,  
        width: '140px', 
        height: '200px' 
      }}
    />
  );
}

export default Card;