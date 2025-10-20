import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

// Custom hook for better error messages
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/cart/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const cartData = await response.json();
        // Transform backend data to frontend format
        const transformedItems = cartData.products.map(item => ({
          id: item.product._id,
          product: item.product,
          quantity: item.quantity,
        }));
        setCartItems(transformedItems);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, [user]);

  // Fetch cart from backend when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user, fetchCart]);

  const addToCart = async (product) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          productId: product.id,
          quantity: 1,
        }),
      });
      if (response.ok) {
        await fetchCart(); // Refresh cart
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const increaseCartQuantity = async (productId) => {
    if (!user) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          productId: productId,
          quantity: 1,
        }),
      });
      await fetchCart();
    } catch (error) {
      console.error('Error increasing quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const decreaseCartQuantity = async (productId) => {
    if (!user) return;
    const item = cartItems.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      setLoading(true);
      try {
        // For simplicity, remove and re-add with decreased quantity
        // In a real app, you'd have a separate update endpoint
        await fetch('http://localhost:5000/cart/remove', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            userId: user.id,
            productId: productId,
          }),
        });
        if (item.quantity > 1) {
          await fetch('http://localhost:5000/cart/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              userId: user.id,
              productId: productId,
              quantity: item.quantity - 1,
            }),
          });
        }
        await fetchCart();
      } catch (error) {
        console.error('Error decreasing quantity:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const removeCompletelyFromCart = async (productId) => {
    if (!user) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          productId: productId,
        }),
      });
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, increaseCartQuantity, decreaseCartQuantity, removeCompletelyFromCart, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};
