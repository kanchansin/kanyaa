// src/services/orderService.js

// API endpoint for orders
const API_URL = '/api/orders';

// Helper function to get authorization header
const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Create a new order
const createOrder = async (orderData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create order');
    }
    
    return response.json();
  } catch (error) {
    console.error('Create order error:', error);
    throw error;
  }
};

// Get a specific order by ID
const getOrder = async (orderId) => {
  try {
    const response = await fetch(`${API_URL}/${orderId}`, {
      headers: getAuthHeader()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    
    return response.json();
  } catch (error) {
    console.error('Get order error:', error);
    throw error;
  }
};

// Get all orders for the current user
const getUserOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      headers: getAuthHeader()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user orders');
    }
    
    return response.json();
  } catch (error) {
    console.error('Get user orders error:', error);
    throw error;
  }
};

// Update an order status
const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await fetch(`${API_URL}/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ status })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update order status');
    }
    
    return response.json();
  } catch (error) {
    console.error('Update order status error:', error);
    throw error;
  }
};

// Create a named service object
const orderService = {
  createOrder,
  getOrder,
  getUserOrders,
  updateOrderStatus
};

// Export the named service object
export default orderService;