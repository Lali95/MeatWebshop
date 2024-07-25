import React, { useState, useEffect } from 'react';
import '../Css/Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [groupedCart, setGroupedCart] = useState({});

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);

      const grouped = parsedCart.reduce((acc, item) => {
        const itemType = item.type;
        if (!acc[itemType]) {
          acc[itemType] = [];
        }
        acc[itemType].push(item);
        return acc;
      }, {});

      setGroupedCart(grouped);

      const totalPrice = parsedCart.reduce(
        (acc, cartItem) => acc + (cartItem.price || 0),
        0
      );
      setSum(totalPrice);
    }
  }, []);

  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Update grouped cart and total sum
    const grouped = updatedCart.reduce((acc, item) => {
      const itemType = item.type;
      if (!acc[itemType]) {
        acc[itemType] = [];
      }
      acc[itemType].push(item);
      return acc;
    }, {});

    setGroupedCart(grouped);

    const totalPrice = updatedCart.reduce(
      (acc, cartItem) => acc + (cartItem.price || 0),
      0
    );
    setSum(totalPrice);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {Object.entries(groupedCart).map(([type, items]) => (
              <li key={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)} - {items.length} pieces, price: $
                {items.reduce((acc, item) => acc + item.price, 0)}
                <button onClick={() => handleRemoveFromCart(items[0].id)}>
                  Remove All
                </button>
              </li>
            ))}
          </ul>
          <h1>Sum: {sum} DOLLÁR</h1>
          {/* You can add an order functionality here */}
        </div>
      )}
    </div>
  );
};

export default Cart;
