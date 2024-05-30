import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ItemDetails() {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        const response = await fetch(`/api/${type}/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setItem(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching ${type} details:`, error);
        setLoading(false);
      }
    }

    fetchItemDetails();
  }, [type, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <p>Type: {item.type}</p>
      <p>Weight: {item.weight} grams</p>
      <p>Price: ${item.price}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default ItemDetails;
