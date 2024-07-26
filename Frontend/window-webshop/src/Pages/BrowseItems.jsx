import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderItemCard from '../Components/OrderItemCard';
import '../Css/BrowseItems.css';

function BrowseItems() {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('sausage');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`/api/OrderItem?type=${selectedType}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch items: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        if (data && Array.isArray(data.$values)) {
          setOrderItems(data.$values);
        } else {
          throw new Error('Fetched data does not contain $values array');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error.message);
        setError('Failed to fetch items. Please try again later.');
        setLoading(false);
      }
    }

    fetchItems();
  }, [selectedType]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredItems = Array.isArray(orderItems)
    ? orderItems.filter(item => item.type.toLowerCase() === selectedType)
    : [];

  const handleCardClick = (itemType, itemId) => {
    navigate(`/item/${itemType}/${itemId}`);
  };

  const renderCards = (items) => {
    if (!Array.isArray(items)) {
      return null;
    }

    return items.map((item) => (
      <div key={item.id} className={`card-wrapper ${selectedType}-card`} onClick={() => handleCardClick(item.type, item.id)}>
        <OrderItemCard item={item} />
      </div>
    ));
  };

  return (
    <div className="browse-items">
      <h1>Browse Items</h1>
      <div className="select">
        <label htmlFor="itemType">Select product: </label>
        <select
          id="itemType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="sausage">Sausage</option>
          <option value="steak">Steak</option>
          <option value="chicken thighs">Chicken</option>
          {/* Add other types as needed */}
        </select>
      </div>
      <div className="item-list">
        {renderCards(filteredItems)}
      </div>
    </div>
  );
}

export default BrowseItems;
