import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useWishlist } from '../components/WishlistContext';
import { useCart } from '../components/CartContext';

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveFromWishlist = (itemId) => {
    removeFromWishlist(itemId);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  if (wishlistItems.length === 0) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Your Wishlist is Empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 }}>
          Add some books to your wishlist to see them here.
        </Typography>
        <Button variant="contained" component={Link} to="/books" style={{ backgroundColor: 'red', color: 'white' }}>
          Browse Books
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Wishlist
      </Typography>
      <Grid container spacing={2}>
        {wishlistItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                sx={{ height: 240, objectFit: 'cover' }}
                image={item.image}
                alt={item.name}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <IconButton onClick={() => handleRemoveFromWishlist(item.id)} sx={{ color: 'red' }}>
                    <FavoriteIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {item.price}EGP
                </Typography>
                <Box sx={{ marginTop: 'auto', paddingTop: '16px' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleAddToCart(item)}
                    style={{ backgroundColor: 'red', color: 'white' }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Wishlist;
