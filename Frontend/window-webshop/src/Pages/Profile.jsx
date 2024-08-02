import React, { useState, useEffect } from 'react';
import '../Css/Profile.css'; // Ensure this path is correct

const Profile = () => {
  const [userData, setUserData] = useState({
    balance: 0,
    name: '',
    email: '',
    role: ''
  });
  const [balanceUpdate, setBalanceUpdate] = useState('');
  const [error, setError] = useState('');
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    quantity: '',
    type: ''
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
        email: user.email || 'N/A',
        role: user.role || 'User'
      });

      // Fetch orders if the user is an admin
      if (user.role === 'Admin') {
        await fetchOrders();
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all orders
  const fetchOrders = async () => {
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`/api/Orders`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch orders:', response.statusText);
        setError('Failed to fetch orders. Please try again later.');
        return;
      }

      const orders = await response.json();
      setOrders(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Error fetching orders. Please try again later.');
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

  // Handle adding a new item
  const addItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch('/api/OrderItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to add item:', errorData.message || response.statusText);
        setError('Failed to add item. Please try again later.');
        return;
      }

      alert('Item added successfully');
      setNewItem({ name: '', price: '', quantity: '', type: '' }); // Clear the form
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Error adding item. Please try again later.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="profile-heading">Profile</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="profile-details">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Your Balance:</strong> ${userData.balance.toFixed(2)}</p>
            <p><strong>Role:</strong> {userData.role}</p>
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

          {userData.role === 'Admin' && (
            <div className="admin-section">
              <h3>Add Item to Stock</h3>
              <form onSubmit={addItem} className="add-item-form">
                <label>
                  Name:
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Type:
                  <input
                    type="text"
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                    required
                  />
                </label>
                <button type="submit" className="add-item-button">Add Item</button>
              </form>

              <h3>Orders</h3>
              <ul>
                {orders.map(order => (
                  <li key={order.id}>Order ID: {order.id}, Details: {order.details}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
