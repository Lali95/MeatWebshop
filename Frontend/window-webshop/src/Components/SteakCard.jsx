import React from 'react';
import { Link } from 'react-router-dom';
import steakImage from '../assets/steak.jpg'; // Import the image

const SteakCard = ({ steak }) => {
  return (
    <div className="card">
      <Link to={`/steak/${steak.id}`}>
        <div className="card-content">
          <div className="card-image">
            <img src={steakImage} alt={steak.name} /> {/* Use the imported image */}
          </div>
          <div className="card-details">
            <h2>{steak.name}</h2>
            <p>Type: {steak.type}</p>
            <p>Weight: {steak.weight} g</p>
            <p>Price: ${steak.price.toFixed(2)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SteakCard;
