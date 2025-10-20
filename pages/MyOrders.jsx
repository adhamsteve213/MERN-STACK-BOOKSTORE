import React from 'react';
import { Container, Typography, Paper, Box, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useOrders } from '../components/OrderContext';

const MyOrders = () => {
  const { orders } = useOrders();

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 4 }}>
          You have not placed any orders yet.
        </Typography>
      ) : (
        <Box>
          {orders.map((order) => (
            <Accordion key={order.id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                  <Grid item>
                    <Typography sx={{ fontWeight: 'bold' }}>Order #{order.id}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(order.date).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      Total: {order.subtotal.toFixed(2)}EGP
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: '#f9f9f9' }}>
                <Typography variant="h6" gutterBottom>Order Details</Typography>
                {order.items.map(item => (
                  <Paper key={item.id} elevation={0} sx={{ p: 1.5, display: 'flex', alignItems: 'center', mb: 1, gap: 2 }}>
                     <Box
                      component="img"
                      src={item.product?.image || ''}
                      alt={item.product?.name || 'Product'}
                      sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1">{item.product?.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qty: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {(item.quantity * item.product.price).toFixed(2)}EGP
                    </Typography>
                  </Paper>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default MyOrders;