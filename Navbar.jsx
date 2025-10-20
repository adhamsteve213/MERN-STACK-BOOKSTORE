import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import Logo from '../assets/jaririd.png';
// 📚 Icon Imports for Navigation Items
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContactsIcon from '@mui/icons-material/Contacts';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from './AuthContext';

// Define the width of the drawer
const drawerWidth = 240;

// Styled Toolbar as in your original component
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 128,
  },
}));

// --- Navigation Item Data ---
const mainNavItems = [
  { text: 'Home', icon: <HomeIcon />, primary: true , path: '/'},
  { text: 'Books', icon: <BookIcon />, primary: true, path: '/books'},
  { text: 'Cart', icon: <ShoppingCartIcon />, primary: true , path: '/cart'},
  { text: 'My Orders', icon: <ShoppingBasketIcon /> , path: '/orders'},
  { text: 'Wishlist', icon: <FavoriteIcon /> ,  path: '/wishlist'},
];

const secondaryNavItems = [
  { text: 'Contact', icon: <ContactsIcon />, path: '/contact'},
  { text: 'About', icon: <InfoIcon /> , path: '/about'},
];

const authNavItems = [
  { text: 'Login', icon: <LoginIcon /> , path: '/login'},
  { text: 'Signup', icon: <AppRegistrationIcon />,  path: '/signup'},
];

const userNavItems = [
  { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
  { text: 'Logout', icon: <LogoutIcon />, path: '/logout' },
];

const adminNavItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
];
// -----------------------------

// Helper component to render the navigation links inside the drawer
const DrawerList = ({ isAuthenticated, logout, isAdmin }) => (
  <Box sx={{ width: drawerWidth }} role="presentation">
    <List>
      {/* Render Main Navigation Links */}
      {mainNavItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton component={Link} to={item.path}>
            <ListItemIcon style={{color: 'red'}}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>

    <Divider />
    <List>
      {/* Render Secondary and Utility Links */}
      {secondaryNavItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton component={Link} to={item.path}>
            <ListItemIcon style={{color: 'red'}}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>

    {isAuthenticated && isAdmin && (
      <>
        <Divider />
        <List>
          {/* Render Admin Links */}
          {adminNavItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon style={{color: 'red'}}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>
    )}

    <Divider />
    <List>
      {/* Render Auth or User Links */}
      {(isAuthenticated ? userNavItems : authNavItems).map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            component={item.text === 'Logout' ? 'button' : Link}
            to={item.text === 'Logout' ? undefined : item.path}
            onClick={item.text === 'Logout' ? logout : undefined}
          >
            <ListItemIcon style={{color: 'red'}}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

// RENAME APPLIED HERE: ProminentAppBar is now Navbar
export default function Navbar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const theme = useTheme();
  const { isAuthenticated, logout, user } = useAuth();
  // Check if the screen size is medium or larger to show inline links
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
  };

  const handleLogout = () => {
    logout();
    setOpenDrawer(false);
  };

  // Filter items to show directly in the AppBar on large screens (Home, Books, Cart)
  const toolbarNavItems = mainNavItems.filter(item => item.primary);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: 'red' }}>
        <StyledToolbar>
          {/* 1. Menu/Drawer Toggle Button */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)} // Open the Drawer
          >
            <MenuIcon />
          </IconButton>
          
          {/* 2. Title */}
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, alignSelf: 'flex-end' }}
          >
            <img src={Logo} alt="MUI Bookstore Logo" width="100px" height="100px" style={{ color: 'white' }} />
          </Typography>
          
          {/* 3. Inline Navigation Items (Visible on md and up) */}
          {isMdUp && (
            <Box sx={{ display: 'flex', alignSelf: 'flex-end', mb: 1 }}>
                {toolbarNavItems.map((item) => (
                    <Typography
                        key={item.text}
                        variant="button"
                        component={Link}
                        to={item.path} // Example dynamic URL
                        sx={{
                          color: 'inherit',
                          mx: 1.5,
                          textDecoration: 'none',
                          fontWeight: 700,
                          '&:hover': { textDecoration: 'underline' }
                        }}
                    >
                        {item.text}
                    </Typography>
                ))}
            </Box>
          )}

          {/* 4. User Info or Auth Links */}
          {isMdUp && (
            <Box sx={{ display: 'flex', alignSelf: 'flex-end', mb: 1, alignItems: 'center' }}>
              {isAuthenticated ? (
                <>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Welcome, {user?.name || 'User'}
                  </Typography>
                  <IconButton color="inherit" component={Link} to="/profile">
                    <AccountCircleIcon />
                  </IconButton>
                  {user?.isAdmin && (
                    <IconButton color="inherit" component={Link} to="/dashboard">
                      <DashboardIcon />
                    </IconButton>
                  )}
                  <IconButton color="inherit" onClick={logout}>
                    <LogoutIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton color="inherit" component={Link} to="/login">
                    <LoginIcon />
                  </IconButton>
                  <IconButton color="inherit" component={Link} to="/signup">
                    <AppRegistrationIcon />
                  </IconButton>
                </>
              )}
            </Box>
          )}

          {/* 5. Search Button */}
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>

          {/* 6. More Actions Button */}
          <IconButton
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </StyledToolbar>
      </AppBar>
      
      {/* 7. The Responsive Navigation Drawer */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
        <DrawerList isAuthenticated={isAuthenticated()} logout={handleLogout} isAdmin={user?.isAdmin} />
      </Drawer>
    </Box>
  );
}