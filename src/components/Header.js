import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Button, Badge } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const navigate = useNavigate();
  const cartItemCount = 3; // Example count, replace with actual cart state
  
  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left - Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <ShoppingBagIcon sx={{ color: '#5D4037', fontSize: 32, mr: 1 }} />
          <Typography variant="h6" sx={{ color: '#5D4037', fontWeight: 'bold' }}>
            ittiArts
          </Typography>
        </Box>

        {/* Center - Navigation Links */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button onClick={() => navigate('/products')} sx={{ color: '#5D4037', textTransform: 'none' }}>
            Products
          </Button>
          <Button onClick={() => navigate('/about')} sx={{ color: '#5D4037', textTransform: 'none' }}>
            About
          </Button>
          <Button onClick={() => navigate('/policies')} sx={{ color: '#5D4037', textTransform: 'none' }}>
            Policies
          </Button>
          <Button onClick={() => navigate('/contactus')} sx={{ color: '#5D4037', textTransform: 'none' }}>
            Contact Us
          </Button>
        </Box>

        {/* Right - Profile and Cart */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Cart Icon */}
          <IconButton onClick={() => navigate('/cart')}>
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCartIcon sx={{ color: '#5D4037' }} />
            </Badge>
          </IconButton>
          
          {/* Profile Icon */}
          <IconButton onClick={() => navigate('/profile')}>
            <Avatar sx={{ bgcolor: '#A1887F' }}>U</Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
