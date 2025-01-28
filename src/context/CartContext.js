import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const ensureArray = (items) => {
  if (!items) return [];
  if (Array.isArray(items)) return items;
  return [];
};

const cartReducer = (state, action) => {
  const items = ensureArray(state.items);
  
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...items, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return [];
    const parsedCart = JSON.parse(savedCart);
    return ensureArray(parsedCart);
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: loadCartFromStorage(),
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(ensureArray(state.items)));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.items]);

  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    if (!productId) {
      console.error('Invalid productId:', productId);
      return;
    }
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (!productId || typeof quantity !== 'number' || quantity < 0) {
      console.error('Invalid arguments:', { productId, quantity });
      return;
    }
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    const items = ensureArray(state.items);
    try {
      return items.reduce((total, item) => {
        if (!item || typeof item.quantity !== 'number') return total;
        const price = typeof item.price === 'string' 
          ? parseFloat(item.price.replace(/[^0-9.-]+/g, ''))
          : parseFloat(item.price);
        return total + (price * item.quantity);
      }, 0);
    } catch (error) {
      console.error('Error calculating cart total:', error);
      return 0;
    }
  };

  const getCartCount = () => {
    const items = ensureArray(state.items);
    try {
      return items.reduce((count, item) => {
        if (!item || typeof item.quantity !== 'number') return count;
        return count + item.quantity;
      }, 0);
    } catch (error) {
      console.error('Error calculating cart count:', error);
      return 0;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: ensureArray(state.items),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
