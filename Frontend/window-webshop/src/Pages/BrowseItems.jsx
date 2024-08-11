import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import OrderItemCard from '../Components/OrderItemCard';
import '../Css/BrowseItems.css';


function BrowseItems() {
  const { t } = useTranslation(); // Initialize the translation function
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
        setError(t('fetchError')); // Use translation key
        setLoading(false);
      }
    }

    fetchItems();
  }, [selectedType, t]);

  if (loading) {
    return <div>{t('loading')}</div>; // Use translation key
  }

  if (error) {
    return <div>{t('error')}: {error}</div>; // Use translation key
  }

  const filteredItems = Array.isArray(orderItems)
    ? orderItems.filter(item => item.type.toLowerCase() === selectedType.toLowerCase())
    : [];

  const handleCardClick = (itemId) => {
    navigate(`/item/${itemId}`); // Navigate to /item/${itemId}
  };

  const renderCards = (items) => {
    if (!Array.isArray(items)) {
      return null;
    }

    return items.map((item) => (
      <div key={item.id} className={`card-wrapper ${selectedType}-card`} onClick={() => handleCardClick(item.id)}>
        <OrderItemCard item={item} />
      </div>
    ));
  };

  return (
    <div className="browse-items">
      <h1>{t('browseItems')}</h1>
      <div className="select">
        <label htmlFor="itemType">{t('selectProduct')}: </label>
        <select
          id="itemType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="sausage">{t('sausage')}</option>
          <option value="steak">{t('steak')}</option>
          <option value="chicken thighs">{t('chickenThighs')}</option>
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

