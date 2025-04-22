// src/pages/Cart.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems=[], cartTotal, removeFromCart, updateQuantity } = useContext(CartContext);
  
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/products" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.itemId} className="cart-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            
            <div className="item-details">
              <h3>{item.name}</h3>
              
              {item.options && Object.entries(item.options).map(([key, value]) => (
                <p key={key} className="item-option">
                  {key}: {value}
                </p>
              ))}
              
              <p className="item-price">${item.price.toFixed(2)}</p>
            </div>
            
            <div className="item-quantity">
              <button 
                className="quantity-btn"
                onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
              >
                +
              </button>
            </div>
            
            <div className="item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            
            <button 
              className="remove-item"
              onClick={() => removeFromCart(item.itemId)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-totals">
          <div className="subtotal">
            <span>Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="shipping">
            <span>Shipping:</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="total">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="cart-actions">
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
          <Link to="/checkout" className="proceed-to-checkout">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;