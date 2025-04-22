// src/pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Placeholder data - will be replaced with API calls
const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Premium T-Shirt",
    price: 24.99,
    image: "https://via.placeholder.com/500x600",
    category: "apparel",
    description: "High-quality cotton t-shirt with custom print.",
    options: {
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White", "Black", "Navy", "Gray"]
    }
  },
  {
    id: 2,
    name: "Coffee Mug",
    price: 14.99,
    image: "https://via.placeholder.com/500x600",
    category: "accessories",
    description: "Ceramic mug, perfect for your morning coffee.",
    options: {
      colors: ["White", "Black"]
    }
  },
  // Other products
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    // Find product by ID
    const foundProduct = ALL_PRODUCTS.find(p => p.id === parseInt(id));
    
    // Initialize selected options
    if (foundProduct) {
      const options = {};
      if (foundProduct.options) {
        if (foundProduct.options.sizes) options.size = foundProduct.options.sizes[0];
        if (foundProduct.options.colors) options.color = foundProduct.options.colors[0];
      }
      setSelectedOptions(options);
    }
    
    // Simulate network delay
    setTimeout(() => {
      setProduct(foundProduct);
      setLoading(false);
    }, 500);
    
    // In a real app, you would fetch from your backend:
    // fetch(`/api/products/${id}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setProduct(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     console.error('Error fetching product details:', err);
    //     setLoading(false);
    //   });
    
  }, [id]);
  
  const handleOptionChange = (option, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const addToCart = () => {
    // Here you would add the product to the cart
    // This will be implemented with context or state management
    console.log('Adding to cart:', {
      product,
      options: selectedOptions,
      quantity
    });
    
    // For now, just navigate to cart page
    navigate('/cart');
  };
  
  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }
  
  if (!product) {
    return <div className="error">Product not found!</div>;
  }
  
  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          
          {product.options && product.options.sizes && (
            <div className="product-options">
              <label>Size:</label>
              <div className="options-buttons">
                {product.options.sizes.map(size => (
                  <button
                    key={size}
                    className={selectedOptions.size === size ? 'selected' : ''}
                    onClick={() => handleOptionChange('size', size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {product.options && product.options.colors && (
            <div className="product-options">
              <label>Color:</label>
              <div className="options-buttons">
                {product.options.colors.map(color => (
                  <button
                    key={color}
                    className={selectedOptions.color === color ? 'selected' : ''}
                    onClick={() => handleOptionChange('color', color)}
                    style={{backgroundColor: color.toLowerCase()}}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="product-quantity">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          
          <button className="add-to-cart-btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;