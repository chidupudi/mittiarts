import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Button,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const cartItemCount = 3; // Replace with actual cart state
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navLinks = [
    { label: 'Products', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Policies', path: '/policies' },
    { label: 'Contact Us', path: '/contactus' },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 3 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <ShoppingBagIcon sx={{ color: '#5D4037', fontSize: 32, mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#5D4037', fontWeight: 'bold' }}>
              MittiArts
            </Typography>
          </Box>

          {/* Navigation or Menu Icon */}
          {isMobile ? (
            <IconButton edge="end" onClick={handleDrawerToggle} sx={{ color: '#5D4037' }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {navLinks.map(link => (
                <Button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  sx={{ color: '#5D4037', textTransform: 'none' }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate('/cart')}>
              <Badge badgeContent={cartItemCount} color="secondary">
                <ShoppingCartIcon sx={{ color: '#5D4037' }} />
              </Badge>
            </IconButton>
            <IconButton onClick={() => navigate('/profile')}>
              <Avatar sx={{ bgcolor: '#A1887F' }}>U</Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
          <List>
            {navLinks.map(link => (
              <ListItem button key={link.label} onClick={() => navigate(link.path)}>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
