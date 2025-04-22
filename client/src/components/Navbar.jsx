import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #fff;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
`;

const NavLogo = styled(Link)`
  color: #333;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const MenuIcon = styled.div`
  display: none;
  
  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #333;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: auto;
  margin-left: 2rem;
  
  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
    background-color: #fff;
    padding: 0;
    margin: 0;
  }
`;

const NavItem = styled.li`
  height: 80px;
  
  @media screen and (max-width: 960px) {
    width: 100%;
    height: auto;
    
    &:hover {
      border: none;
    }
  }
`;

const NavLink = styled(Link)`
  color: #333;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;
  font-weight: 500;
  
  &:hover {
    color: #007bff;
    transition: all 0.3s ease;
  }
  
  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
    
    &:hover {
      color: #007bff;
      transition: all 0.3s ease;
    }
  }
`;

const NavCart = styled.div`
  display: flex;
  align-items: center;
`;

const CartIcon = styled(Link)`
  color: #333;
  font-size: 1.5rem;
  text-decoration: none;
  margin-left: 1rem;
  position: relative;
  
  &:hover {
    color: #007bff;
    transition: all 0.3s ease;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #007bff;
  color: #fff;
  font-size: 0.75rem;
  font-weight: bold;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  return (
    <Nav>
      <NavContainer>
        <NavLogo to="/">
          YourBrand
        </NavLogo>
        
        <MenuIcon onClick={toggleMenu}>
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </MenuIcon>
        
        <NavMenu isOpen={menuOpen}>
          <NavItem>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/products" onClick={() => setMenuOpen(false)}>
              All Products
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/products/apparel" onClick={() => setMenuOpen(false)}>
              Apparel
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/products/accessories" onClick={() => setMenuOpen(false)}>
              Accessories
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/products/wall-art" onClick={() => setMenuOpen(false)}>
              Wall Art
            </NavLink>
          </NavItem>
        </NavMenu>
        
        <NavCart>
          <CartIcon to="/cart">
            <i className="fas fa-shopping-cart" />
            <CartCount>0</CartCount>
          </CartIcon>
        </NavCart>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;