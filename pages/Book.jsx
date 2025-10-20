import React from 'react'
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
import books from '../assets/books'; // Import the book data
import { useCart } from '../components/CartContext';
import { useWishlist } from '../components/WishlistContext';
import { Link, useNavigate } from 'react-router-dom';

function Book() {
  const { cartItems, increaseCartQuantity, decreaseCartQuantity, addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const filteredProducts = books;

  const handleFavoriteClick = (item, event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist(item);
    navigate('/wishlist');
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ padding: 2 }}>
      {filteredProducts.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
             <Link to={`/productDetails/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card sx={{ maxWidth: 345, cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
              component="img"
              sx={{ height: 240, objectFit: 'cover' }}
              image={item.image}
              alt={item.name}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}> 
         
          
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography gutterBottom variant="h5" component="div" >
                  {item.name}
                </Typography>
                <IconButton onClick={(event) => handleFavoriteClick(item, event)} sx={{ color: isInWishlist(item.id) ? 'red' : 'grey' }}>
                  <FavoriteIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {item.price}EGP
              </Typography>
              <Box sx={{ marginTop: 'auto', paddingTop: '16px' }}>
                {(() => {
                  const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
                  if (cartItem) {
                    return (
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton onClick={(event) => { event.stopPropagation(); decreaseCartQuantity(cartItem.id); }} size="small">
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="body1" sx={{ mx: 1 }}>{cartItem.quantity}</Typography>
                        <IconButton onClick={(event) => { event.stopPropagation(); increaseCartQuantity(cartItem.id); }} size="small">
                          <AddIcon />
                        </IconButton>
                      </Box>
                    );
                  } else {
                    return (
                      <Button fullWidth variant="contained" onClick={(event) => { event.stopPropagation(); addToCart(item); }} style={{ backgroundColor:'red', color:'white' }}>
                        Add to Cart
                      </Button>
                    );
                  }
                })()}
              </Box>
            </CardContent>
          </Card>
          </Link>
        </Grid>
      ))}
      </Grid>
    </div>
  )
}

export default Book
