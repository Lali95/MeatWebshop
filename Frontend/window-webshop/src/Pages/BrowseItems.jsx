import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SausageCard from '../Components/SausageCard';
import SteakCard from '../Components/SteakCard';
import '../Css/BrowseItems.css'; // Make sure to add any necessary styling here

function BrowseItems() {
  const [sausages, setSausages] = useState([]);
  const [steaks, setSteaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('sausage');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const sausageResponse = await fetch('/api/Sausage');
        const steakResponse = await fetch('/api/Steak');

        if (!sausageResponse.ok) {
          throw new Error(`Failed to fetch sausages: ${sausageResponse.status}`);
        }
        if (!steakResponse.ok) {
          throw new Error(`Failed to fetch steaks: ${steakResponse.status}`);
        }

        const sausageData = await sausageResponse.json();
        const steakData = await steakResponse.json();

        console.log('Sausage Data:', sausageData);
        console.log('Steak Data:', steakData);

        setSausages(sausageData.$values); // Extracting $values array
        setSteaks(steakData.$values); // Extracting $values array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error.message);
        setError('Failed to fetch items. Please try again later.');
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render cards based on selectedType
  const renderCards = (items) => {
    if (!Array.isArray(items)) {
      return null; // or handle this case as per your requirement
    }
    
    return items.map((item) => (
      <div key={item.id} className={`card-wrapper ${selectedType}-card`}>
        {selectedType === 'sausage' ? (
          <SausageCard sausage={item} />
        ) : (
          <SteakCard steak={item} />
        )}
      </div>
    ));
  };

  return (
    <div className="browse-items">
      <h1>Browse Items</h1>
      <div>
        <label htmlFor="meatType">Select product: </label>
        <select
          id="meatType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="sausage">Sausage</option>
          <option value="steak">Steak</option>
        </select>
      </div>
      <div className="item-list">
        {renderCards(selectedType === 'sausage' ? sausages : steaks)}
      </div>
    </div>
  );
}

export default BrowseItems;
