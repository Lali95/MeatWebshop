import React from 'react';
import PropTypes from 'prop-types';
import '../Css/SteakCard.css'; // Import your CSS for styling
import steakImage from '../assets/steak.jpg'; // Adjust the path to your steak image

const SteakCard = ({ steak }) => {
  return (
    <div className="steak-card">
      <h3>{steak.name}</h3>
      <img src={steakImage} alt="Steak" className="steak-image" />
      {/* You can add more details here if needed */}
    </div>
  );
};

SteakCard.propTypes = {
  steak: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    // Add more properties as needed
  }).isRequired,
};

export default SteakCard;
