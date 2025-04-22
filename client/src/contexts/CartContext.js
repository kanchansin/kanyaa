import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create the CartContext
export const CartContext = createContext();

// Cart reducer function
const cartReducer = (state, action) => {
  // Ensure state.items is always an array
  const currentState = { ...state, items: state.items || [] };
  
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = currentState.items.findIndex(
        item => item.id === action.payload.id && 
                item.options?.every((option, idx) => 
                  option === action.payload.options?.[idx]
                )
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...currentState.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
        };
        return { ...currentState, items: updatedItems };
      } else {
        // Add new item
        return { ...currentState, items: [...currentState.items, action.payload] };
      }
    }
    
    case 'REMOVE_ITEM':
      return {
        ...currentState,
        items: currentState.items.filter(item => 
          !(item.id === action.payload.id && 
            JSON.stringify(item.options) === JSON.stringify(action.payload.options))
        )
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...currentState,
        items: currentState.items.map(item => {
          if (item.id === action.payload.id && 
              JSON.stringify(item.options) === JSON.stringify(action.payload.options)) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        })
      };
      
    case 'CLEAR_CART':
      return { ...currentState, items: [] };
      
    default:
      return currentState;
  }
};

// Initial cart state
const initialState = {
  items: []
};

// CartProvider component
export const CartProvider = ({ children }) => {
  // Try to load cart from localStorage
  const loadCartFromStorage = () => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (!storedCart) return initialState;
      
      const parsedCart = JSON.parse(storedCart);
      
      // Validate parsed data
      if (!parsedCart || typeof parsedCart !== 'object') {
        return initialState;
      }
      
      // Ensure items is an array
      return { ...parsedCart, items: Array.isArray(parsedCart.items) ? parsedCart.items : [] };
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return initialState;
    }
  };
  
  const [cartState, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    try {
      // Ensure we never save invalid state
      const safeState = {
        ...cartState,
        items: Array.isArray(cartState.items) ? cartState.items : []
      };
      
      localStorage.setItem('cart', JSON.stringify(safeState));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartState]);
  
  // Helper functions for cart operations
  const addToCart = (product, quantity = 1, options = []) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, quantity, options }
    });
  };
  
  const removeFromCart = (id, options = []) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id, options }
    });
  };
  
  const updateQuantity = (id, quantity, options = []) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity, options }
    });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  // Calculate cart totals - with safety checks
  const cartItemCount = Array.isArray(cartState.items) 
    ? cartState.items.reduce((total, item) => total + (item.quantity || 0), 0) 
    : 0;
  
  const cartTotal = Array.isArray(cartState.items)
    ? cartState.items.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0)
    : 0;
  
  // Provide cart context value
  const cartContextValue = {
    items: Array.isArray(cartState.items) ? cartState.items : [],
    itemCount: cartItemCount,
    total: cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
  
  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};