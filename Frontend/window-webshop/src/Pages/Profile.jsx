import React, { useState, useEffect } from 'react';
import '../Css/Profile.css'; // Ensure this path is correct

const Profile = () => {
  const [userData, setUserData] = useState({
    balance: 0,
    name: '',
    email: ''
  });
  const [balanceUpdate, setBalanceUpdate] = useState('');
  const [error, setError] = useState('');

  // Fetch the user's data
  const fetchUserData = async () => {
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
        console.error('Failed to fetch user data:', response.statusText);
        setError('Failed to fetch user data. Please try again later.');
        return;
      }

      const user = await response.json();
      setUserData({
        balance: user.balance || 0,
        name: user.userName || 'N/A',  
        email: user.email || 'N/A'
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data. Please try again later.');
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
      await fetchUserData(); // Fetch the latest user data from the server
    } catch (error) {
      console.error('Error updating balance:', error);
      setError('Error updating balance. Please try again later.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="profile-details">
        
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Your Balance:</strong> ${userData.balance.toFixed(2)}</p>
      </div>
      <form onSubmit={updateBalance} className="balance-form">
        <label className="balance-label">
          Update Balance:
          <input
            type="number"
            step="1"
            value={balanceUpdate}
            onChange={(e) => setBalanceUpdate(e.target.value)}
            required
            className="balance-input"
          />
        </label>
        <button type="submit" className="balance-button">Update Balance</button>
      </form>
    </div>
  );
};

export default Profile;
