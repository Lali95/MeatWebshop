import React, { useState, useEffect } from 'react';
import SausageCard from '../Components/SausageCard'; // Adjust the import path as needed

function BrowseItems() {
  const [sausages, setSausages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meatType, setMeatType] = useState('sausage'); // Default meat type is 'sausage'

  useEffect(() => {
    async function fetchSausages() {
      try {
        const response = await fetch(`/api/${meatType}`); // Fetch based on selected meat type
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSausages(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sausages:', error);
        setLoading(false);
      }
    }

    fetchSausages();
  }, [meatType]); // Re-fetch when meatType changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Browse Products</h1>
      <div>
        <button onClick={() => setMeatType('sausage')}>Sausage</button>
        <button onClick={() => setMeatType('bacon')}>Bacon</button>
        <button onClick={() => setMeatType('steak')}>Steak</button>
      </div>
      <div className="sausage-list">
        {sausages.map((sausage) => (
          <SausageCard key={sausage.id} sausage={sausage} />
        ))}
      </div>
    </div>
  );
}

export default BrowseItems;
