// src/services/printfulService.js
// Note: In a real app, your API key should be stored securely in environment variables
// on your server, not in your frontend code.
const API_KEY = 'YOUR_PRINTFUL_API_KEY';
const API_URL = 'https://api.printful.com';

// Helper function for making authenticated API requests
const makeRequest = async (endpoint, method = 'GET', data = null) => {
  try {
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    };
    
    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || 'An error occurred with the Printful API');
    }

    return result.result;
  } catch (error) {
    console.error('Printful API error:', error);
    throw error;
  }
};

// Get store information
const getStoreInformation = async () => {
  return makeRequest('/store');
};

// Get product catalog
const getCatalog = async (categoryId = null) => {
  let endpoint = '/products';
  if (categoryId) {
    endpoint += `?category_id=${categoryId}`;
  }
  return makeRequest(endpoint);
};

// Get catalog variants for a specific product
const getProductVariants = async (productId) => {
  return makeRequest(`/products/${productId}`);
};

// Get shipping rates
const getShippingRates = async (shippingData) => {
  return makeRequest('/shipping/rates', 'POST', shippingData);
};

// Create an order
const createOrder = async (orderData) => {
  return makeRequest('/orders', 'POST', orderData);
};

// Get order details
const getOrder = async (orderId) => {
  return makeRequest(`/orders/${orderId}`);
};

// Get list of orders
const getOrders = async (status = null, offset = 0, limit = 20) => {
  let endpoint = `/orders?offset=${offset}&limit=${limit}`;
  if (status) {
    endpoint += `&status=${status}`;
  }
  return makeRequest(endpoint);
};

// Cancel an order
const cancelOrder = async (orderId) => {
  return makeRequest(`/orders/${orderId}/cancel`, 'POST');
};

// Confirm draft for fulfillment
const confirmOrder = async (orderId) => {
  return makeRequest(`/orders/${orderId}/confirm`, 'POST');
};

// Calculate estimated costs for an order
const estimateOrderCosts = async (orderData) => {
  return makeRequest('/orders/estimate-costs', 'POST', orderData);
};

// Get file info
const getFileInfo = async (fileId) => {
  return makeRequest(`/files/${fileId}`);
};

// Upload a file to Printful
const uploadFile = async (fileData) => {
  return makeRequest('/files', 'POST', fileData);
};

// Get webhooks
const getWebhooks = async () => {
  return makeRequest('/webhooks');
};

// Create a webhook
const createWebhook = async (url, types) => {
  return makeRequest('/webhooks', 'POST', { url, types });
};

// Delete a webhook
const deleteWebhook = async (webhookId) => {
  return makeRequest(`/webhooks/${webhookId}`, 'DELETE');
};

// Create a named service object before exporting
const printfulService = {
  getStoreInformation,
  getCatalog,
  getProductVariants,
  getShippingRates,
  createOrder,
  getOrder,
  getOrders,
  cancelOrder,
  confirmOrder,
  estimateOrderCosts,
  getFileInfo,
  uploadFile,
  getWebhooks,
  createWebhook,
  deleteWebhook
};

// Export the named service object
export default printfulService;