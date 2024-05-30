// Pages/Cart.jsx

import React, { useState } from 'react';
import CartItem from '../Components/CartItem';
import '../Css/Cart.css'; // Adjust the path as necessary

function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Sausage', price: 10, quantity: 2 },
    { id: 2, name: 'Steak', price: 15, quantity: 1 },
  ]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  const removeItem = itemId => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total Price: ${getTotalPrice()}</h3>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
