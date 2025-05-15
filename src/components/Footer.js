import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  TextField, 
  Divider,
  Box,
  IconButton,
  Link,
  useMediaQuery,
  Zoom,
  Fade
} from '@mui/material';
import { 
  Instagram, 
  Facebook, 
  Pinterest, 
  Twitter, 
  YouTube,
  Phone,
  Email,
  LocationOn,
  ArrowUpward
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showButton, setShowButton] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Color palette based on terracotta
  const colors = {
    terracotta: '#E07A5F',
    terracottaDark: '#c75439',
    terracottaLight: '#f3c5b8',
    cream: '#F2EAE2',
    brown: '#5E4B3F',
    darkBrown: '#3D2F27'
  };

  return (
    <Box 
      sx={{
        backgroundColor: colors.darkBrown,
        color: colors.cream,
        pt: 6,
        pb: 4,
        mt: 8,
        position: 'relative'
      }}
    >
      {/* Top decorative border */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: `linear-gradient(90deg, ${colors.terracotta}, ${colors.terracottaLight}, ${colors.terracotta})`
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 4 : 6}>
          {/* Company info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: colors.terracotta,
                mb: 2,
                fontFamily: '"Playfair Display", serif'
              }}
            >
              TERRA CRAFT
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Handcrafted clay pottery reflecting earth's beauty. 
              Every piece tells a story of tradition and artistry.
            </Typography>
            <Box sx={{ display: 'flex', mt: 3 }}>
              <IconButton 
                aria-label="Instagram" 
                sx={{ color: colors.terracotta, mr: 1, '&:hover': { color: colors.terracottaLight } }}
              >
                <Instagram size={20} />
              </IconButton>
              <IconButton 
                aria-label="Facebook" 
                sx={{ color: colors.terracotta, mr: 1, '&:hover': { color: colors.terracottaLight } }}
              >
                <Facebook size={20} />
              </IconButton>
              <IconButton 
                aria-label="Pinterest" 
                sx={{ color: colors.terracotta, mr: 1, '&:hover': { color: colors.terracottaLight } }}
              >
                <Pinterest size={20} />
              </IconButton>
              <IconButton 
                aria-label="Twitter" 
                sx={{ color: colors.terracotta, mr: 1, '&:hover': { color: colors.terracottaLight } }}
              >
                <Twitter size={20} />
              </IconButton>
              <IconButton 
                aria-label="YouTube" 
                sx={{ color: colors.terracotta, '&:hover': { color: colors.terracottaLight } }}
              >
                <YouTube size={20} />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: colors.terracotta,
                mb: 2,
                fontFamily: '"Playfair Display", serif'
              }}
            >
              QUICK LINKS
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column' 
              }}
            >
              {['Home', 'Shop', 'About Us', 'Gallery', 'Workshops', 'Contact'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  underline="none"
                  sx={{
                    color: colors.cream,
                    mb: 1.5,
                    transition: 'all 0.3s',
                    '&:hover': {
                      color: colors.terracotta,
                      pl: 1
                    }
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: colors.terracotta,
                mb: 2,
                fontFamily: '"Playfair Display", serif'
              }}
            >
              CONTACT US
            </Typography>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <LocationOn size={18} style={{ marginRight: '8px', color: colors.terracotta }} />
              <Typography variant="body2">
                123 Clay Avenue, Pottery Lane
                <br />
                Artisan City, AC 56789
              </Typography>
            </Box>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Phone size={18} style={{ marginRight: '8px', color: colors.terracotta }} />
              <Typography variant="body2">
                (555) 123-4567
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Email size={18} style={{ marginRight: '8px', color: colors.terracotta }} />
              <Typography variant="body2">
                info@terracraft.com
              </Typography>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: colors.terracotta,
                mb: 2,
                fontFamily: '"Playfair Display", serif'
              }}
            >
              JOIN OUR NEWSLETTER
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to receive updates on new collections, workshops and special offers.
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                sx={{
                  mb: 2,
                  background: colors.cream,
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: colors.terracotta,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.terracotta,
                    },
                  },
                }}
              />
              <Button 
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: colors.terracotta,
                  '&:hover': {
                    backgroundColor: colors.terracottaDark,
                  },
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(242, 234, 226, 0.2)' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
          <Typography variant="body2" sx={{ color: 'rgba(242, 234, 226, 0.7)', mb: isMobile ? 2 : 0 }}>
            © {new Date().getFullYear()} Terra Craft. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {['Privacy Policy', 'Terms of Service', 'Shipping Info'].map((text) => (
              <Link
                key={text}
                href="#"
                underline="none"
                sx={{
                  color: 'rgba(242, 234, 226, 0.7)',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: colors.terracotta,
                  }
                }}
              >
                {text}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Enhanced Back to top button */}
      <Fade in={showButton}>
        <Zoom in={showButton}>
          <IconButton
            onClick={scrollToTop}
            aria-label="back to top"
            sx={{
              position: 'fixed', // Changed to fixed for better scrolling
              right: 20,
              bottom: 20, // Changed to bottom positioning
              backgroundColor: colors.terracotta,
              color: colors.cream,
              '&:hover': {
                backgroundColor: colors.terracottaDark,
              },
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              zIndex: 1000,
              transition: 'all 0.3s ease',
              transform: showButton ? 'scale(1)' : 'scale(0)',
            }}
          >
            <ArrowUpward size={20} />
          </IconButton>
        </Zoom>
      </Fade>
    </Box>
  );
};

export default Footer;