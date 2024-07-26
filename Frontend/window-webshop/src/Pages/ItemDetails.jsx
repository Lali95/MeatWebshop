import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Css/ItemDetails.css'; // Add CSS for styling

const ItemDetails = () => {
  const { itemType, itemId } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('User is not authenticated');
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
        setError('Failed to fetch item details. Please try again later.');
      }
    }

    fetchItem();
  }, [itemId]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="item-detail">
      <h1>{item.name}</h1>
      <img src={item.image} alt={item.name} />
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ItemDetails;
