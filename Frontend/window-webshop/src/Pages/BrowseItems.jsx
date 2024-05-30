import React, { useState, useEffect } from 'react';
import SausageCard from '../Components/SausageCard';
import SteakCard from '../Components/SteakCard'; // Import the SteakCard component
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
        <button onClick={() => setSelectedType('sausage')}>Sausage</button>
        <button onClick={() => setSelectedType('steak')}>Steak</button>
        {/* Add more buttons for other meat types if needed */}
      </div>
      <div className="item-list">
        {selectedType === 'sausage' && sausages.map((sausage) => (
          <SausageCard key={sausage.id} sausage={sausage} />
        ))}
        {selectedType === 'steak' && steaks.map((steak) => (
          <SteakCard key={steak.id} steak={steak} />
        ))}
        {/* Add more conditions for other meat types if needed */}
      </div>
    </div>
  );
}

export default BrowseItems;
