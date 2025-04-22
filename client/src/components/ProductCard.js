// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-short-desc">{product.description}</p>
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="view-btn">View Details</Link>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;