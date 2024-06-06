import React from 'react';
import { Link } from 'react-router-dom';
import sausageImage from '../assets/sausage.png'; // Import the image

const SausageCard = ({ sausage }) => {
  return (
    <div className="card">
      <Link to={`/sausage/${sausage.id}`}>
        <div className="card-content">
          <div className="card-image">
            <img src={sausageImage} alt={sausage.name} /> {/* Use the imported image */}
          </div>
          <div className="card-details">
            <h2>{sausage.name}</h2>
            <p>Type: {sausage.type}</p>
            <p>Weight: {sausage.weight} g</p>
            <p>Price: ${sausage.price.toFixed(2)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SausageCard;
