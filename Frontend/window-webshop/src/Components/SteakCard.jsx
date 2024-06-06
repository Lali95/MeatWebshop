import React from 'react';
import PropTypes from 'prop-types';
import '../Css/SteakCard.css'; // Adjust the path as necessary
import steakImage from '../assets/steak.jpg'; // Adjust the path as necessary

const SteakCard = ({ steak }) => {
  return (
    <div className="steak-card">
      <img src={steakImage} alt="Steak" className="steak-image" />
      <div className="steak-details">
        <h3 className="steak-name">{steak.name}</h3>
        <p className="steak-price">${steak.price}</p>
        {/* Additional details can be added here */}
      </div>
      <Link to={`/steak/${steak.id}`} className="steak-link">
        View Details
      </Link>
    </div>
  );
};

SteakCard.propTypes = {
  steak: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    // Add more properties as needed
  }).isRequired,
};

export default SteakCard;
