import React from 'react';
import PropTypes from 'prop-types';
import '../Css/OrderItemCard.css';

function OrderItemCard({ item }) {
  return (
    <div className="order-item-card">
      <div className="order-item-card-content">
        {/* You can include an image here if available */}
        {/* <div className="order-item-card-image">
          <img src={item.imageUrl} alt={item.name} />
        </div> */}
        <div className="order-item-card-details">
          <h3>{item.name}</h3>
          <p>Price: ${item.price.toFixed(2)}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Type: {item.type}</p>
          {/* Add more details and styling as needed */}
        </div>
      </div>
    </div>
  );
}

OrderItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderItemCard;
