import React from 'react';
import PropTypes from 'prop-types';
import '../Css/SausageCard.css'; // Adjust the path as necessary
import sausageImage from '../assets/sausage.png'; // Adjust the path as necessary

const SausageCard = ({ sausage }) => {
  return (
    <div className="sausage-card">
      <img src={sausageImage} alt="Sausage" className="sausage-image" />
      <div className="sausage-details">
        <h3 className="sausage-name">{sausage.name}</h3>
        <p className="sausage-price">${sausage.price}</p>
        {/* Additional details can be added here */}
      </div>
      <Link to={`/sausage/${sausage.id}`} className="sausage-link">
        View Details
      </Link>
    </div>
  );
};

SausageCard.propTypes = {
  sausage: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    // Add more properties as needed
  }).isRequired,
};

export default SausageCard;
