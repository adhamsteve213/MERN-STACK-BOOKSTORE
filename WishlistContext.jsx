import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useAuth } from './AuthContext';

export const WishlistContext = createContext();

// Custom hook for better error messages
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/wishlist/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const wishlistData = await response.json();
        // Transform backend data to frontend format
        const transformedItems = wishlistData.products.map(item => item.product);
        setWishlistItems(transformedItems);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch wishlist from backend when user logs in
  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [user, fetchWishlist]);

  const addToWishlist = async (product) => {
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          productId: product.id,
        }),
      });
      if (response.ok) {
        await fetchWishlist(); // Refresh wishlist
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/wishlist/remove', {
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
      await fetchWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (product) => {
    if (!user) {
      alert('Please login to manage wishlist');
      return;
    }
    const isIn = isInWishlist(product.id);
    if (isIn) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, loading }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
