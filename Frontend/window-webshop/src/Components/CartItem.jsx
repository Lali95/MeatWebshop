// Components/CartItem.jsx

import React from 'react';
import PropTypes from 'prop-types';
import '../Css/CartItem.css'; // Adjust the path as necessary

function CartItem({ item, updateQuantity, removeItem }) {
  const handleQuantityChange = e => {
    updateQuantity(item.id, parseInt(e.target.value));
  };

  const handleRemoveItem = () => {
    removeItem(item.id);
  };

  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.name}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">${item.price}</p>
        <div className="cart-item-actions">
          <label htmlFor={`quantity_${item.id}`}>Quantity:</label>
          <input
            type="number"
            id={`quantity_${item.id}`}
            value={item.quantity}
            min="1"
            onChange={handleQuantityChange}
          />
          <button onClick={handleRemoveItem}>Remove</button>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    // Add more properties as needed
  }).isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default CartItem;
