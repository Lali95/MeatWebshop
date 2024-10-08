import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../Css/Cart.css'; // Ensure this path is correct

const Cart = () => {
  const { t } = useTranslation();
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
    <div className="cart-page">
      <h2 className="cart-heading">{t('shoppingCart')}</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">{t('cartEmpty')}</p>
      ) : (
        <div>
          <ul className="cart-items">
            {Object.entries(groupedCart).map(([type, items]) => (
              <li key={type} className="cart-item">
                {type.charAt(0).toUpperCase() + type.slice(1)} - {items.length} {t('pieces')}, {t('price')}: $
                {items.reduce((acc, item) => acc + item.price, 0)}
                <button
                  className="cart-remove-button"
                  onClick={() => handleRemoveFromCart(items[0].id)}
                >
                  {t('X')}
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h1 className="cart-total">{t('sum')}: ${sum.toFixed(2)}</h1>
            {/* You can add an order functionality here */}
            <button className="checkout-button">{t('Order')}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
