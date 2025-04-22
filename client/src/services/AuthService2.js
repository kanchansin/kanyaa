// src/services/authService.js

// Import your Firebase configuration or other necessary dependencies here
// import { auth } from '../firebase';

// Mock API URL for demonstration
const API_URL = '/api/auth';

// Register a new user
const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    
    const data = await response.json();
    
    // Store the token in localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Login an existing user
const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    
    const data = await response.json();
    
    // Store the token in localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout the current user
const logout = () => {
  localStorage.removeItem('authToken');
  // You might need additional cleanup here depending on your app
};

// Check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

// Get the current user's information
const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return null;
    }
    
    const response = await fetch(`${API_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to get user information');
    }
    
    return response.json();
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

// Update the current user's profile
const updateProfile = async (userData) => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Profile update failed');
    }
    
    return response.json();
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

// Reset password
const resetPassword = async (email) => {
  try {
    const response = await fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Password reset failed');
    }
    
    return response.json();
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};

// Create a named service object
const authService = {
  register,
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  updateProfile,
  resetPassword
};

// Export the named service object
export default authService;