import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useAuth } from './AuthContext';

export const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/orders/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const ordersData = await response.json();
        // Transform backend data to frontend format
        const transformedOrders = ordersData.map(order => ({
          id: order._id,
          customer: {
            firstName: order.Firstname,
            middleName: order.Middlename,
            lastName: order.Lastname,
            phone: order.phone,
            address: order.address,
          },
          items: order.products.map(p => ({
            id: p.product._id,
            product: p.product,
            quantity: p.quantity,
          })),
          subtotal: order.total,
          date: order.createdAt,
        }));
        setOrders(transformedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch orders from backend when user logs in
  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user, fetchOrders]);

  const addOrder = async (order) => {
    if (!user) {
      alert('Please login to place orders');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          products: order.items.map(item => ({
            product: item.product.id,
            quantity: item.quantity,
          })),
          total: order.subtotal,
          address: order.customer.address,
          phone: order.customer.phone,
          Firstname: order.customer.firstName,
          Lastname: order.customer.lastName,
          Middlename: order.customer.middleName || '',
        }),
      });
      if (response.ok) {
        await fetchOrders(); // Refresh orders
        return true;
      } else {
        alert('Failed to place order');
        return false;
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, loading, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
