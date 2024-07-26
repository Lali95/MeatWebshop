import React, { useState, useEffect } from 'react';
import '../Css/Profile.css'; 

const Profile = () => {
  const [balance, setBalance] = useState(0);
  const [balanceUpdate, setBalanceUpdate] = useState('');
  const [error, setError] = useState('');


  // Fetch the user's balance
  const fetchBalance = async () => {
    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('accessToken');

    if (!email || !token) {
      console.error('User email or token not found in local storage');
      return;
    }

    try {
      const response = await fetch(`/api/Auth/GetUserByEmail/${email}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch balance:', response.statusText);
        setError('Failed to fetch balance. Please try again later.');
        return;
      }

      const user = await response.json();
      setBalance(user.balance || 0); // Update state with the fetched balance
    } catch (error) {
      console.error('Error fetching balance:', error);
      setError('Error fetching balance. Please try again later.');
    }
  };

  // Update the user's balance
  const updateBalance = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('accessToken');

    if (!email || !token) {
      console.error('User email or token not found in local storage');
      return;
    }

    try {
      const response = await fetch(`/api/Auth/UpBalance`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, balance: parseFloat(balanceUpdate) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to update balance:', errorData.message || response.statusText);
        setError('Failed to update balance. Please try again later.');
        return;
      }

      alert('Balance updated successfully');
      setBalanceUpdate(''); // Clear the input field
      await fetchBalance(); // Fetch the latest balance from the server
    } catch (error) {
      console.error('Error updating balance:', error);
      setError('Error updating balance. Please try again later.');
    }
  };

  // Fetch the balance on component mount
  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="profile-details">
        <h3>Your Balance</h3>
        <p>${balance.toFixed(2)}</p>
      </div>
      <form onSubmit={updateBalance} className="balance-form">
        <label>
          Update Balance:
          <input
            type="number"
            step="1"
            value={balanceUpdate}
            onChange={(e) => setBalanceUpdate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update Balance</button>
      </form>
    </div>
  );
};

export default Profile;
