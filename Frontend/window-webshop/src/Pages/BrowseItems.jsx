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

  useEffect(() => {
    async function fetchItems() {
      try {
        const sausageResponse = await fetch('/api/sausage');
        const steakResponse = await fetch('/api/steak');
        
        if (!sausageResponse.ok) {
          throw new Error(`HTTP error! Status: ${sausageResponse.status}`);
        }
        if (!steakResponse.ok) {
          throw new Error(`HTTP error! Status: ${steakResponse.status}`);
        }

        const sausageData = await sausageResponse.json();
        const steakData = await steakResponse.json();

        setSausages(sausageData);
        setSteaks(steakData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
        {selectedType === 'sausage' && sausages.map((sausage) => (
          <Link key={sausage.id} to={`/sausage/${sausage.id}`}>
            <SausageCard sausage={sausage} />
          </Link>
        ))}
        {selectedType === 'steak' && steaks.map((steak) => (
          <Link key={steak.id} to={`/steak/${steak.id}`}>
            <SteakCard steak={steak} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BrowseItems;
