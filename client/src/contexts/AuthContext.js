import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Create the context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if the user is already logged in on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoading(true);
      try {
        if (authService.isAuthenticated()) {
          const user = await authService.getCurrentUser();
          setCurrentUser(user);
        }
      } catch (err) {
        console.error('Error checking authentication status:', err);
        setError('Failed to authenticate. Please try logging in again.');
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);
  
  // Register a new user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.register(userData);
      setCurrentUser(result.user);
      return result;
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Login an existing user
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.login(credentials);
      setCurrentUser(result.user);
      return result;
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout the current user
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };
  
  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await authService.updateProfile(userData);
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message || 'Failed to update profile. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Password reset request
  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      return await authService.resetPassword(email);
    } catch (err) {
      setError(err.message || 'Failed to request password reset. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Value provided to consumers of this context
  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    resetPassword,
    isAuthenticated: !!currentUser,
    clearError: () => setError(null)
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};