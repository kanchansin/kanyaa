// src/pages/Checkout.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  // If cart is empty, redirect to products
  if (cartItems.length === 0) {
    navigate('/products');
    return null;
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
    if (!formData.country) newErrors.country = 'Country is required';
    
    // Payment validation
    if (!formData.cardName) newErrors.cardName = 'Name on card is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = 'Card number must be 16 digits';
    if (!formData.expMonth) newErrors.expMonth = 'Expiration month is required';
    if (!formData.expYear) newErrors.expYear = 'Expiration year is required';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3 or 4 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      // Here you would:
      // 1. Send the order to your backend
      // 2. Process payment
      // 3. Connect to POD API (Printful/Printify/Printrove) based on shipping country
      
      // For now, just clear the cart and show success
      clearCart();
      navigate('/order-confirmation');
      
      setIsProcessing(false);
    }, 2000);
  };
  
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h2>Shipping Information</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={errors.state ? 'error' : ''}
                    />
                    {errors.state && <span className="error-message">{errors.state}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={errors.zipCode ? 'error' : ''}
                    />
                    {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={errors.country ? 'error' : ''}
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="IN">India</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                  {errors.country && <span className="error-message">{errors.country}</span>}
                </div>
              </div>
              
              <div className="form-section">
                <h2>Payment Information</h2>
                
                <div className="form-group">
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className={errors.cardName ? 'error' : ''}
                  />
                  {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={errors.cardNumber ? 'error' : ''}
                    placeholder="XXXX XXXX XXXX XXXX"
                  />
                  {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expMonth">Exp Month</label>
                    <select
                      id="expMonth"
                      name="expMonth"
                      value={formData.expMonth}
                      onChange={handleChange}
                      className={errors.expMonth ? 'error' : ''}
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = i + 1;
                        return (
                          <option key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                          </option>
                        );
                      })}
                    </select>
                    {errors.expMonth && <span className="error-message">{errors.expMonth}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="expYear">Exp Year</label>
                    <select
                      id="expYear"
                      name="expYear"
                      value={formData.expYear}
                      onChange={handleChange}
                      className={errors.expYear ? 'error' : ''}
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() + i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                    {errors.expYear && <span className="error-message">{errors.expYear}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className={errors.cvv ? 'error' : ''}
                      placeholder="XXX"
                    />
                    {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="place-order-btn"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.itemId} className="summary-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    {item.options && Object.entries(item.options).map(([key, value]) => (
                      <span key={key} className="item-option">
                        {key}: {value}
                      </span>
                    ))}
                    <span className="item-quantity">Qty: {item.quantity}</span>
                  </div>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="summary-totals">
              <div className="subtotal">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="shipping">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="tax">
                <span>Tax:</span>
                <span>${(cartTotal * 0.1).toFixed(2)}</span>
              </div>
              <div className="total">
                <span>Total:</span>
                <span>${(cartTotal + (cartTotal * 0.1)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;