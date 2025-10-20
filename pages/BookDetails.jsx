import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useCart } from '../components/CartContext';
import { useWishlist } from '../components/WishlistContext';
import books from '../assets/books.js';


function ProductDetails() {
  const { id } = useParams();
  const product = books.find(p => p.id === parseInt(id));
  const { cartItems, addToCart, increaseCartQuantity, decreaseCartQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist(product);
    navigate('/wishlist');
  };

  if (!product) {
    return <Typography>Book not found!</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            height="400"
            image={product.image}
            alt={product.name}
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography gutterBottom variant="h4" component="div">
                  {product.name}
                </Typography>
                <IconButton onClick={handleFavoriteClick} sx={{ color: isInWishlist(product.id) ? 'red' : 'grey' }}>
                  <FavoriteIcon />
                </IconButton>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 }}>
                {product.description}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ marginBottom: 1 }}>
                {product.price}EGP
              </Typography>
              {/* <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Stock: {product.stock}
              </Typography> */}
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                {/* Availability: {product.available ? 'In Stock' : 'Out of Stock'} */}
              </Typography>
              {(() => {
                const cartItem = cartItems.find(cartItem => cartItem.id === product.id);
                if (cartItem) {
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                      <IconButton onClick={() => decreaseCartQuantity(cartItem.id)} size="small">
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 1 }}>
                        {cartItem.quantity}
                      </Typography>
                      <IconButton onClick={() => increaseCartQuantity(cartItem.id)} size="small">
                        <AddIcon />
                      </IconButton>
                    </Box>
                  );
                } else {
                  return (
                    <Button variant="contained" onClick={() => addToCart(product)} style = {{ backgroundColor: 'red' ,color:'white'}} size="large">
                      Add to Cart
                    </Button>
                  );
                }
              })()}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductDetails;