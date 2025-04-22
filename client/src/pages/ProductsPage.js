// src/pages/ProductsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// Placeholder data - will be replaced with API calls
const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Premium T-Shirt",
    price: 24.99,
    image: "https://via.placeholder.com/300x400",
    category: "apparel",
    description: "High-quality cotton t-shirt with custom print."
  },
  {
    id: 2,
    name: "Coffee Mug",
    price: 14.99,
    image: "https://via.placeholder.com/300x400",
    category: "accessories",
    description: "Ceramic mug, perfect for your morning coffee."
  },
  {
    id: 3,
    name: "Poster Print",
    price: 19.99,
    image: "https://via.placeholder.com/300x400",
    category: "wall-art",
    description: "High-quality poster print on premium paper."
  },
  {
    id: 4,
    name: "Hoodie",
    price: 39.99,
    image: "https://via.placeholder.com/300x400",
    category: "apparel",
    description: "Comfortable hoodie for cool days."
  },
  {
    id: 5,
    name: "Phone Case",
    price: 19.99,
    image: "https://via.placeholder.com/300x400",
    category: "accessories",
    description: "Durable phone case with your custom design."
  },
  {
    id: 6,
    name: "Canvas Print",
    price: 49.99,
    image: "https://via.placeholder.com/300x400",
    category: "wall-art",
    description: "Gallery-quality canvas print of your design."
  }
];

const ProductsPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    // Filter products by category if a category is specified
    const filteredProducts = category 
      ? ALL_PRODUCTS.filter(product => product.category === category)
      : ALL_PRODUCTS;
    
    // Simulate network delay
    setTimeout(() => {
      setProducts(filteredProducts);
      setLoading(false);
    }, 500);
    
    // In a real app, you would fetch from your backend:
    // fetch(`/api/products${category ? `?category=${category}` : ''}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setProducts(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     console.error('Error fetching products:', err);
    //     setLoading(false);
    //   });
    
  }, [category]);
  
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }
  
  return (
    <div className="products-page">
      <h1>{category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}</h1>
      
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;