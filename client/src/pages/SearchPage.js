// src/pages/SearchPage.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import  { searchProducts } from '../services/productService';
import './ProductsPage.css'; // Reuse the same styles

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        if (query) {
          const results = await searchProducts.searchProducts(query);
          setProducts(results);
        } else {
          setProducts([]);
        }
        setError('');
      } catch (error) {
        console.error('Error searching products:', error);
        setError('Failed to search for products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Search Results for "{query}"</h1>
        <p>{products.length} products found</p>
      </div>

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : products.length === 0 ? (
        <div className="no-results">
          <p>No products found matching "{query}".</p>
          <p>Try checking your spelling or using different keywords.</p>
        </div>
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

export default SearchPage;