// src/services/authService.js
const USERS_STORAGE_KEY = 'pod_users';
const CURRENT_USER_KEY = 'pod_current_user';

// Initialize with a default admin account
const initializeUsers = () => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  if (!users) {
    const defaultUsers = [
      {
        id: '1',
        email: 'admin@example.com',
        password: 'admin123', // In a real app, never store plaintext passwords
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
  }
};

// Initialize on import
initializeUsers();

const getUsersFromStorage = () => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsersToStorage = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Add the isAuthenticated function
const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

const register = (email, password, name) => {
  const users = getUsersFromStorage();
  
  // Check if user already exists
  if (users.some(user => user.email === email)) {
    throw new Error('User with this email already exists');
  }
  
  const newUser = {
    id: Date.now().toString(),
    email,
    password, // In a real app, this should be hashed
    name,
    role: 'customer',
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsersToStorage(users);
  
  // Don't return the password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

const login = (email, password) => {
  const users = getUsersFromStorage();
  const user = users.find(user => user.email === email && user.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Don't store the password in localStorage
  const { password: _, ...userWithoutPassword } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  
  return userWithoutPassword;
};

const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

const updateUserProfile = (userId, updates) => {
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Don't allow updating role or id through this method
  const { role, id, ...allowedUpdates } = updates;
  
  users[userIndex] = {
    ...users[userIndex],
    ...allowedUpdates
  };
  
  saveUsersToStorage(users);
  
  // Update current user if it's the logged-in user
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    const { password: _, ...userWithoutPassword } = users[userIndex];
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  }
  
  // Don't return the password
  const { password: _, ...userWithoutPassword } = users[userIndex];
  return userWithoutPassword;
};

// Create an authService object before exporting
const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  updateUserProfile,
  isAuthenticated // Add the new function to the exported object
};

export default authService;