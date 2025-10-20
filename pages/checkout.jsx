import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, TextField, Button, Box, Paper } from '@mui/material';
import { useCart } from '../components/CartContext';
import { useOrders } from '../components/OrderContext';

const Checkout = () => {
  const { cartItems, removeCompletelyFromCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First name is required.";
    if (!formData.lastName) tempErrors.lastName = "Last name is required.";
    if (!formData.phone) tempErrors.phone = "Phone number is required.";
    if (!/^\d{10,15}$/.test(formData.phone)) tempErrors.phone = "Phone number is invalid.";
    if (!formData.address) tempErrors.address = "Address is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to your cart before checking out.");
      navigate('/books');
      return;
    }

    const newOrder = {
      customer: formData,
      items: cartItems,
      subtotal: subtotal,
    };

    const success = await addOrder(newOrder);
    if (success) {
      // Clear the cart
      cartItems.forEach(item => removeCompletelyFromCart(item.id));
      navigate('/my-orders');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Checkout
      </Typography>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Shipping Information</Typography>
        <Box component="form" noValidate onSubmit={handlePlaceOrder}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField required id="firstName" name="firstName" label="First Name" fullWidth autoComplete="given-name" value={formData.firstName} onChange={handleChange} error={!!errors.firstName} helperText={errors.firstName} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="middleName" name="middleName" label="Middle Name" fullWidth autoComplete="additional-name" value={formData.middleName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField required id="lastName" name="lastName" label="Last Name" fullWidth autoComplete="family-name" value={formData.lastName} onChange={handleChange} error={!!errors.lastName} helperText={errors.lastName} />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="phone" name="phone" label="Phone Number" fullWidth autoComplete="tel" value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="address" name="address" label="Address" fullWidth multiline rows={3} autoComplete="shipping address-line1" value={formData.address} onChange={handleChange} error={!!errors.address} helperText={errors.address} />
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">
              Total: {subtotal.toFixed(2)}EGP
            </Typography>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={cartItems.length === 0}
            >
              Place Order
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout;