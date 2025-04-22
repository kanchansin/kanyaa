import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Using styled-components for a truly single-file component
const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 2rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 2rem;
    padding: 0;
  }
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #555;
    padding-bottom: 0.5rem;
  }
  
  p {
    line-height: 1.5;
    color: #ccc;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.5rem;
      
      a {
        color: #ccc;
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: #fff;
          text-decoration: underline;
        }
      }
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  border-top: 1px solid #555;
  font-size: 0.9rem;
  color: #aaa;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About Us</h3>
          <p>
            We're a print-on-demand service that offers high-quality custom products
            shipped worldwide. Our mission is to help you create unique items that
            express your style.
          </p>
        </FooterSection>
        
        <FooterSection>
          <h3>Categories</h3>
          <ul>
            <li><Link to="/products/apparel">Apparel</Link></li>
            <li><Link to="/products/accessories">Accessories</Link></li>
            <li><Link to="/products/wall-art">Wall Art</Link></li>
            <li><Link to="/products">All Products</Link></li>
          </ul>
        </FooterSection>
        
        <FooterSection>
          <h3>Customer Service</h3>
          <ul>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/returns">Returns & Exchanges</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </FooterSection>
        
        <FooterSection>
          <h3>Connect With Us</h3>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a></li>
          </ul>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; {new Date().getFullYear()} YourBrand. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;