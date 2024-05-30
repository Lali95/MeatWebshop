import React, { useState, useEffect } from 'react';
import '../Css/Cart.css'; // Adjust the path as necessary

function Cart() {
  const { getTotalItems, getTotalPrice } = useCart();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/orders/1/items'); // Replace '1' with your actual order ID
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    // Implement update quantity logic
  };

  const removeItem = (itemId) => {
    // Implement remove item logic
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
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
        <h3>Total Items: {getTotalItems()}</h3>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
