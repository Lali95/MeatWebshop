import React from 'react';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  const handleQuantityChange = (event) => {
    updateQuantity(item.id, parseInt(event.target.value));
  };

  const handleRemoveItem = () => {
    removeItem(item.id);
  };

  return (
    <div className="cart-item">
      <div className="item-info">
        <h3>{item.name}</h3>
        <p>Price: ${item.price}</p>
        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          min="1"
        />
        <button onClick={handleRemoveItem}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
