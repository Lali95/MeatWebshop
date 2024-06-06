import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import steakImage from '../assets/steak.jpg';
import sausageImage from '../assets/sausage.png';
import '../Css/ItemDetails.css';

function ItemDetails() {
  const { itemType, itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemImage, setItemImage] = useState(null);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        const token = localStorage.getItem('accessToken'); 
        console.log(token)
        const response = await fetch(`/api/${itemType}/${itemId}`, {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
        });

      
       
        
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
  }, [itemType, itemId]);

  useEffect(() => {
    // Determine which image to use based on itemType
    if (itemType === 'sausage') {
      setItemImage(sausageImage);
    } else if (itemType === 'steak') {
      setItemImage(steakImage);
    }
  }, [itemType]);

  const addToCart = (item) => {
    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];
    
    const updatedCart = [...cart, item];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${item.name} has been added to the cart!`);
  };

  const handleAddToCart = () => {
    if (!item) return;

    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      type: itemType,
      image: itemImage,
    };

    addToCart(cartItem);
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
      <img src={itemImage} alt={item.name} className="item-image" />
      <div className="item-info">
        <p className="item-type">Type: {item.type}</p>
        <p className="item-weight">Weight: {item.weight}</p>
        <p className="item-price">Price: ${item.price.toFixed(2)}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ItemDetails;
