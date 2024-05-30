import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Css/ItemDetails.css'; // Adjust the path as necessary

function ItemDetails() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        const response = await fetch(`/api/items/${itemId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const itemData = await response.json();
        setItem(itemData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching item details:', error);
        setLoading(false);
      }
    }
    fetchItemDetails();
  }, [itemId]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch(`/api/orders/1/items`, { // Replace '1' with your actual order ID
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert(`${item.name} added to cart!`);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!item) {
    return <div className="not-found">Item not found</div>;
  }

  return (
    <div className="item-details">
      <h1 className="item-name">{item.name}</h1>
      <div className="item-info">
        <p className="item-type">Type: {item.type}</p>
        <p className="item-weight">Weight: {item.weight}</p>
        <p className="item-price">Price: ${item.price}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ItemDetails;
