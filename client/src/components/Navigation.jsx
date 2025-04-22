import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

// Styled Components
const NavBar = styled.nav`
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  
  &.scrolled {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
  
  @media (max-width: 992px) {
    padding: 1rem;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavLogo = styled(Link)`
  font-size: 1.6rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.5px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #0066cc;
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 24px;
  position: relative;
  margin-left: 1.5rem;
  z-index: 1001;
  
  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #333;
    margin: 5px 0;
    transition: all 0.3s ease;
  }
  
  &.open {
    span:first-child {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    span:nth-child(2) {
      opacity: 0;
    }
    
    span:last-child {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  }
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const NavCenter = styled.div`
  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    left: ${props => props.isOpen ? '0' : '-100%'};
    width: 280px;
    height: 100vh;
    background-color: #ffffff;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    padding: 80px 1.5rem 2rem;
    transition: left 0.3s ease;
    overflow-y: auto;
    z-index: 1000;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
  
  li {
    margin: 0 1rem;
    position: relative;
    
    @media (max-width: 992px) {
      margin: 0;
      margin-bottom: 1rem;
    }
    
    a {
      color: #333;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
      display: block;
      padding: 0.5rem 0;
      
      &:hover {
        color: #0066cc;
      }
      
      @media (max-width: 992px) {
        padding: 0.75rem 0;
        font-size: 1.1rem;
      }
    }
  }
`;

const DropdownToggle = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;
  font-weight: 500;
  
  &::after {
    content: "▼";
    font-size: 0.7rem;
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #0066cc;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  min-width: 180px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1001;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  
  li:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  a {
    padding: 0.75rem 1.25rem !important;
    display: block;
    border-bottom: 1px solid #f5f5f5;
    
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background-color: #f9f9f9;
    }
  }
  
  @media (max-width: 992px) {
    position: static;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    transform: none;
    margin-top: 0.5rem;
    margin-left: 1rem;
    border-left: 2px solid #f0f0f0;
    
    a {
      padding: 0.5rem 0.75rem !important;
    }
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: ${props => props.isOpen ? '0' : '-100%'};
    padding: 1.5rem;
    background-color: #ffffff;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
    transition: left 0.3s ease;
    z-index: 999;
  }
`;

const SearchForm = styled.form`
  display: flex;
  margin-right: 1.5rem;
  
  @media (max-width: 992px) {
    margin-right: 0;
    margin-bottom: 1.5rem;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 0.65rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px 0 0 4px;
  width: 200px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
  }
  
  @media (max-width: 992px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 0 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0055aa;
  }
  
  svg {
    vertical-align: middle;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 992px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const UserDropdown = styled.div`
  position: relative;
  margin-right: 1rem;
  
  @media (max-width: 992px) {
    margin-right: 0;
  }
`;

const UserDropdownToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const UserDropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  min-width: 180px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1001;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  
  ${UserDropdown}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  a, button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.75rem 1.25rem;
    color: #333;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.95rem;
    border-bottom: 1px solid #f5f5f5;
    transition: background-color 0.2s ease;
    
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background-color: #f9f9f9;
      color: #0066cc;
    }
  }
  
  @media (max-width: 992px) {
    position: static;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    transform: none;
    margin-top: 0.5rem;
  }
`;

const LoginButton = styled(Link)`
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem;
  margin-right: 1rem;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    color: #0066cc;
  }
  
  @media (max-width: 992px) {
    margin-right: 0;
  }
`;

const CartButton = styled(Link)`
  position: relative;
  color: #333;
  text-decoration: none;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f5f5f5;
    color: #0066cc;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff3860;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  font-weight: bold;
`;

const Overlay = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Navigation = () => {
  const { cartItems } = useCart();
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Track scroll position for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Prevent body scrolling when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <>
      <NavBar className={scrolled ? 'scrolled' : ''}>
        <NavContainer>
          <NavLeft>
            <NavLogo to="/">Kanyaa</NavLogo>
            
            <MobileMenuToggle 
              className={mobileMenuOpen ? 'open' : ''}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </MobileMenuToggle>
          </NavLeft>
          
          <NavCenter isOpen={mobileMenuOpen}>
            <NavLinks>
              <li>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              </li>
              <li>
                <Link to="/products" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
              </li>
              <li className="dropdown">
                <DropdownToggle>Categories</DropdownToggle>
                <DropdownMenu>
                  <Link to="/products/category/clothing" onClick={() => setMobileMenuOpen(false)}>
                    Clothing
                  </Link>
                  <Link to="/products/category/accessories" onClick={() => setMobileMenuOpen(false)}>
                    Accessories
                  </Link>
                  <Link to="/products/category/home-decor" onClick={() => setMobileMenuOpen(false)}>
                    Home Decor
                  </Link>
                  <Link to="/products/category/stationery" onClick={() => setMobileMenuOpen(false)}>
                    Stationery
                  </Link>
                </DropdownMenu>
              </li>
              <li>
                <Link to="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              </li>
            </NavLinks>
          </NavCenter>
          
          <NavRight isOpen={mobileMenuOpen}>
            <SearchForm onSubmit={handleSearchSubmit}>
              <SearchInput 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              <SearchButton type="submit" aria-label="Submit search">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </SearchButton>
            </SearchForm>
            
            <NavActions>
              {currentUser ? (
                <UserDropdown>
                  <UserDropdownToggle aria-label="User menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg>
                  </UserDropdownToggle>
                  <UserDropdownMenu>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                    <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </UserDropdownMenu>
                </UserDropdown>
              ) : (
                <LoginButton to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  </svg>
                  Login
                </LoginButton>
              )}
              
              <CartButton to="/cart" onClick={() => setMobileMenuOpen(false)} aria-label="Shopping cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                {cartItems && cartItems.length > 0 && (
                  <CartBadge>{cartItems.length}</CartBadge>
                )}
              </CartButton>
            </NavActions>
          </NavRight>
        </NavContainer>
      </NavBar>
      <Overlay isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Navigation;