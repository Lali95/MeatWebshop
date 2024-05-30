import React, { useState } from 'react';
import CartItem from '../Components/CartItem';
import ItemDetails from './ItemDetails'; // Adjust the path as necessary
import '../Css/Cart.css'; // Adjust the path as necessary

function Cart() {
  const [cartItems, setCartItems] = useState([]);

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

  const addToCart = (newItem) => {
    const existingItem = cartItems.find(item => item.id === newItem.id);
    if (existingItem) {
      // Item already exists in cart, update quantity
      updateQuantity(newItem.id, existingItem.quantity + newItem.quantity);
    } else {
      // Add new item to cart
      setCartItems([...cartItems, newItem]);
    }
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
      {/* Pass addToCart function to ItemDetails */}
      {cartItems.map(item => (
        <ItemDetails
          key={item.id}
          itemType={item.type}  // Assuming your item has a 'type' property
          itemId={item.id}
          addToCart={addToCart} // Pass addToCart function here
        />
      ))}
    </div>
  );
}

export default Cart;
