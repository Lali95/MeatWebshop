import React from 'react';
import { useTranslation } from 'react-i18next';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  const { t } = useTranslation();

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
        <p>{t('price')}: ${item.price.toFixed(2)}</p>
        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          min="1"
        />
        <button onClick={handleRemoveItem}>{t('remove')}</button>
      </div>
    </div>
  );
};

export default CartItem;
