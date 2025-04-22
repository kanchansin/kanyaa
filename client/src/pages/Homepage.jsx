import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchFeaturedProducts } from '../services/productService';
import './homepage.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Refs for scroll animations
  const featuredSectionRef = useRef(null);
  const categoriesSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const testimonialsSectionRef = useRef(null);
  const ctaSectionRef = useRef(null);

  // Intersection Observer setup
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections with animation classes
    const sections = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [featuredProducts]);

  // Fetch featured products
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const products = await fetchFeaturedProducts();
        setFeaturedProducts(products);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load featured products');
        setIsLoading(false);
        console.error('Error loading featured products:', err);
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Products for Every Occasion</h1>
          <p>Quality print-on-demand merchandise delivered to your doorstep</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
            <Link to="/custom" className="btn btn-secondary">
              Create Custom Design
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products section-padding" ref={featuredSectionRef}>
        <div className="container">
          <h2 className="section-title reveal">Featured Products</h2>
          <p className="section-description reveal">
            Explore our most popular designs and products, carefully selected for quality and style.
          </p>
          
          {isLoading ? (
            <div className="loading-spinner">Loading featured products</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="products-grid reveal">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center reveal">
            <Link to="/products" className="view-all-link">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section section-padding" ref={categoriesSectionRef}>
        <div className="container">
          <h2 className="section-title reveal">Shop By Category</h2>
          <p className="section-description reveal">
            Browse our collections by category to find exactly what you're looking for.
          </p>
          
          <div className="categories-grid">
            <Link to="/products/category/clothing" className="category-card reveal-left" style={{ animationDelay: '0.1s' }}>
              <div className="category-image clothing-image"></div>
              <h3>Clothing</h3>
            </Link>
            
            <Link to="/products/category/accessories" className="category-card reveal" style={{ animationDelay: '0.2s' }}>
              <div className="category-image accessories-image"></div>
              <h3>Accessories</h3>
            </Link>
            
            <Link to="/products/category/home-decor" className="category-card reveal" style={{ animationDelay: '0.3s' }}>
              <div className="category-image home-decor-image"></div>
              <h3>Home Decor</h3>
            </Link>
            
            <Link to="/products/category/stationery" className="category-card reveal-right" style={{ animationDelay: '0.4s' }}>
              <div className="category-image stationery-image"></div>
              <h3>Stationery</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" ref={aboutSectionRef}>
        <div className="about-content reveal-left">
          <h2>Our Story</h2>
          <p>
            We're passionate about helping you express your creativity through high-quality
            custom products. Our print-on-demand service ensures that each item is created
            with care and delivered directly to you.
          </p>
          <p>
            From unique designs to personalized gifts, we offer endless possibilities for
            customization without the hassle of inventory management or shipping logistics.
          </p>
          <Link to="/about" className="btn btn-secondary">
            Learn More About Us
          </Link>
        </div>
        <div className="about-image reveal-right"></div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section-padding" ref={testimonialsSectionRef}>
        <div className="container">
          <h2 className="section-title reveal">What Our Customers Say</h2>
          <p className="section-description reveal">
            Don't just take our word for it - hear what our satisfied customers have to share about their experience.
          </p>
          
          <div className="testimonials-grid">
            <div className="testimonial-card reveal-left" style={{ animationDelay: '0.1s' }}>
              <div className="testimonial-rating">★★★★★</div>
              <p>"The quality of my custom t-shirts exceeded my expectations. Will definitely order again!"</p>
              <div className="testimonial-author">- Sarah M.</div>
            </div>
            
            <div className="testimonial-card reveal" style={{ animationDelay: '0.2s' }}>
              <div className="testimonial-rating">★★★★★</div>
              <p>"Fast shipping and excellent customer service. The designs came out perfect."</p>
              <div className="testimonial-author">- James T.</div>
            </div>
            
            <div className="testimonial-card reveal-right" style={{ animationDelay: '0.3s' }}>
              <div className="testimonial-rating">★★★★★</div>
              <p>"I ordered custom mugs for my company and everyone loved them. Great quality and value!"</p>
              <div className="testimonial-author">- Emma L.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section" ref={ctaSectionRef}>
        <div className="cta-content reveal">
          <h2>Ready To Be A Part of Our Family?</h2>
          <p>Join thousands of satisfied customers and bring your ideas to life today.</p>
          <Link to="/register" className="cta-btn">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;