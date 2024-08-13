import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../Css/ItemDetails.css'; // Add CSS for styling

const ItemDetails = () => {
  const { t } = useTranslation();
  const { itemType, itemId } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError(t('userNotAuthenticated'));
        return;
      }

      try {
        const response = await fetch(`/api/OrderItem/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch item details: ${response.status}`);
        }

        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Error fetching item details:', error.message);
        setError(t('failedToFetchItemDetails'));
      }
    }

    fetchItem();
  }, [itemId, t]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(t('itemAddedToCart'));
  };

  if (error) {
    return <div>{t('error')}: {error}</div>;
  }

  if (!item) {
    return <div>{t('loading')}...</div>;
  }

  return (
    <div className="item-detail">
      <h1>{item.name}</h1>
      <img src={item.image} alt={item.name} />
      <p>{item.description}</p>
      <p>{t('price')}: ${item.price}</p>
      <button onClick={handleAddToCart}>{t('addToCart')}</button>
    </div>
  );
};

export default ItemDetails;
