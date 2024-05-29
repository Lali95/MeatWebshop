// SausageCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import '../Css/SausageCard.css'; // Import your CSS for styling

const SausageCard = ({ sausage }) => {
  return (
    <div className="sausage-card">
      <h3>{sausage.name}</h3>
      <p>{sausage.description}</p>
      {/* You can add more details here if needed */}
    </div>
  );
};

SausageCard.propTypes = {
  sausage: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // Add more properties as needed
  }).isRequired,
};

export default SausageCard;
