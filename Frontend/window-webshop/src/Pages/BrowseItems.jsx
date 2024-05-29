import React, { useState, useEffect } from 'react';

function BrowseItems() {
  const [sausages, setSausages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSausages() {
      try {
        const response = await fetch('/api/Sausage');
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
      <h1>Browse Sausages</h1>
      <ul>
        {sausages.map((sausage) => (
          <li key={sausage.id}>
            {sausage.name}   {/* Adjust fields based on your Sausage model */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrowseItems;
