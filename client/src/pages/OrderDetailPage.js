// src/pages/OrderDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import orderService from '../services/orderService';
import './OrderDetailPage.css';

const OrderDetailPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // First try to get from local storage
        const localOrder = orderService.getOrderById(id);
        
        if (localOrder) {
          // Verify this order belongs to the current user
          if (localOrder.userId !== currentUser.id) {
            throw new Error('You do not have permission to view this order');
          }
          setOrder(localOrder);
        } else {
          // If not in local storage, try to fetch from Printful API
          const printfulOrder = await orderService.getOrderFromPrintful(id);
          setOrder(printfulOrder);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchOrder();
    }
  }, [id, currentUser]);

  if (loading) {
    return <div className="order-detail-loading">Loading order details...</div>;
  }

  if (error) {
    return (
      <div className="order-detail-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button 
          className="btn-primary" 
          onClick={() => navigate('/profile')}
        >
          Back to Profile
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-detail-error">
        <h2>Order Not Found</h2>
        <p>We couldn't find the order you're looking for.</p>
        <button 
          className="btn-primary" 
          onClick={() => navigate('/profile')}
        >
          Back to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="order-detail-container">
      <div className="order-detail-header">
        <h1>Order #{order.id}</h1>
        <span className={`order-status ${order.status}`}>{order.status}</span>
      </div>

      <div className="order-detail-content">
        <div className="order-info-section">
          <h2>Order Information</h2>
          <div className="order-info-grid">
            <div>
              <h3>Order Date</h3>
              <p>{new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
            <div>
              <h3>Payment Method</h3>
              <p>{order.paymentMethod || 'Credit Card'}</p>
            </div>
            <div>
              <h3>Shipping Method</h3>
              <p>{order.shipping?.name || 'Standard Shipping'}</p>
            </div>
          </div>
        </div>

        <div className="order-items-section">
          <h2>Order Items</h2>
          <div className="order-items-list">
            {order.items?.map((item, index) => (
              <div key={index} className="order-item">
                <div className="order-item-image">
                  {item.thumbnail_url ? (
                    <img src={item.thumbnail_url} alt={item.name} />
                  ) : (
                    <div className="placeholder-image">No Image</div>
                  )}
                </div>
                <div className="order-item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  {item.variant_id && <p>SKU: {item.variant_id}</p>}
                  {item.size && <p>Size: {item.size}</p>}
                  {item.color && <p>Color: {item.color}</p>}
                </div>
                <div className="order-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-address-section">
          <div className="shipping-address">
            <h2>Shipping Address</h2>
            {order.recipient ? (
              <address>
                {order.recipient.name}<br />
                {order.recipient.address1}<br />
                {order.recipient.address2 && `${order.recipient.address2}<br />`}
                {order.recipient.city}, {order.recipient.state_code} {order.recipient.zip}<br />
                {order.recipient.country_code}<br />
                {order.recipient.phone && `Phone: ${order.recipient.phone}`}
              </address>
            ) : (
              <p>No shipping address information available.</p>
            )}
          </div>
          
          <div className="billing-address">
            <h2>Billing Address</h2>
            {order.billing ? (
              <address>
                {order.billing.name}<br />
                {order.billing.address1}<br />
                {order.billing.address2 && `${order.billing.address2}<br />`}
                {order.billing.city}, {order.billing.state_code} {order.billing.zip}<br />
                {order.billing.country_code}<br />
                {order.billing.phone && `Phone: ${order.billing.phone}`}
              </address>
            ) : (
              <p>Same as shipping address</p>
            )}
          </div>
        </div>

        <div className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="order-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${order.subtotal?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${order.shipping_cost?.toFixed(2) || '0.00'}</span>
            </div>
            {order.tax && (
              <div className="summary-row">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row total">
              <span>Total</span>
              <span>${order.total?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-actions">
        {order.status === 'pending' && (
          <button 
            className="btn-danger"
            onClick={async () => {
              try {
                await orderService.updateOrderStatus(order.id, 'cancelled');
                setOrder({...order, status: 'cancelled'});
              } catch (error) {
                setError(error.message);
              }
            }}
          >
            Cancel Order
          </button>
        )}
        <button 
          className="btn-secondary"
          onClick={() => navigate('/profile')}
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
};

export default OrderDetailPage;