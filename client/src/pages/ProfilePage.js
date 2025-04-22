// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import orderService from '../services/orderService';
import './ProfilePage.css';

const ProfilePage = () => {
  const { currentUser, logout, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setName(currentUser.name || '');
    
    // Load user orders
    const loadOrders = async () => {
      try {
        const userOrders = orderService.getUserOrders(currentUser.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await updateProfile({ name });
      setSuccess('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Account</h1>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Profile Information</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          {editing ? (
            <form onSubmit={handleUpdateProfile} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email (cannot be changed)</label>
                <input
                  type="email"
                  value={currentUser.email}
                  disabled
                />
              </div>
              <div className="profile-actions">
                <button type="submit" className="btn-primary">Save Changes</button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setEditing(false);
                    setName(currentUser.name || '');
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <p><strong>Name:</strong> {currentUser.name}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <button 
                className="btn-primary" 
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <div className="profile-section">
          <h2>Order History</h2>
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length > 0 ? (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <span>Order #{order.id}</span>
                    <span className={`order-status ${order.status}`}>{order.status}</span>
                  </div>
                  <div className="order-body">
                    <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                    <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                  </div>
                  <button 
                    className="btn-text" 
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven't placed any orders yet.</p>
          )}
        </div>

        <div className="profile-section">
          <h2>Account Actions</h2>
          <button className="btn-danger" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;