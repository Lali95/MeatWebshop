// BrowseItems.jsx

import React, { useState, useEffect } from 'react';
import SausageCard from '../Components/SausageCard'; // Adjust the import path as needed

function BrowseItems() {
  const [sausages, setSausages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSausages() {
      try {
        const response = await fetch('/api/sausage'); // Replace with your backend API endpoint
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Browse Items</h1>
      <div>
        {sausages.map((sausage) => (
          <SausageCard key={sausage.id} sausage={sausage} />
        ))}
      </div>
    </div>
  );
}

export default BrowseItems;
