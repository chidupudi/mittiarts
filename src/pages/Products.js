import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Slider,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Snackbar,
  Alert,
  Paper,
  Drawer,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Rating,
  Chip,
  Fade,
  Zoom,
  CircularProgress,
  InputAdornment,
  Badge,
  Avatar,
  SwipeableDrawer,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Skeleton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import productsData from '../data/productsData';
import { 
  FilterList, 
  Search, 
  ShoppingCart, 
  FavoriteBorder, 
  Close, 
  Sort, 
  PriceChange, 
  ColorLens, 
  Refresh, 
  Add, 
  Remove,
  ExpandMore, 
  ExpandLess,
  AddShoppingCart,
  ShoppingBag,
  Star,
  StarBorder,
  FilterAlt,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Styled components
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const ExpandButton = styled(IconButton)(({ theme, expanded }) => ({
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const ProductCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[10],
  },
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 16,
}));

const ProductBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  zIndex: 1,
}));

const FilterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
}));

const Products = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // States
  const [priceRange, setPriceRange] = useState([100, 5000]);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedColors, setSelectedColors] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loginAlert, setLoginAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState({
    price: true,
    sort: true,
    colors: true,
  });
  const [wishlist, setWishlist] = useState([]);
  const [wishlistAlert, setWishlistAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [addedToCartAlert, setAddedToCartAlert] = useState(false);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  // Modify the assignProductDetails function
  const assignProductDetails = (products) => {
    return products.map((product) => {
      const finalPrice = product.price; // This is the price you provided
      const originalPrice = Math.round(finalPrice * (1 + Math.random() * 0.3)); // Calculate original price 10-30% higher
      const discount = Math.round(((originalPrice - finalPrice) / originalPrice) * 100); // Calculate actual discount

      return {
        ...product,
        imgUrl: product.images?.[0] || 'https://via.placeholder.com/150',
        rating: (Math.random() * (4.6 - 3.9) + 3.9).toFixed(1),
        originalPrice: originalPrice,
        finalPrice: finalPrice,
        discount: discount,
        reviews: Math.floor(Math.random() * 500) + 10,
        isFeatured: Math.random() > 0.7,
      };
    });
  };

  const [products] = useState(assignProductDetails(productsData));

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (searchQuery === '' || 
         product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         product.code.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (sortBy === 'priceLowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHighToLow') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [priceRange, sortBy, products, searchQuery]);

  // Handle color selection
  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  // Reset filters
  const resetFilters = () => {
    setPriceRange([100, 5000]);
    setSortBy('relevance');
    setSearchQuery('');
  };

  // Product click handler
  const handleProductClick = (id, code) => {
    navigate(`/product/${id}?code=${code}`);
  };

  // Add to cart handler
  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    if (!user) {
      setLoginAlert(true);
      return;
    }
    setSelectedProduct(product);
    setQuantity(1);
    setOpenModal(true);
  };

  // Confirm add to cart
  const confirmAddToCart = async () => {
    if (!user) {
      setLoginAlert(true);
      setOpenModal(false);
      return;
    }

    if (!selectedProduct || quantity < 1) return;

    try {
      await addDoc(collection(db, 'cart'), {
        userId: user.uid,
        productId: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        code: selectedProduct.code,
        quantity: quantity,
      });
      setCartMessage(`${selectedProduct.name} added to cart!`);
      setAddedToCartAlert(true);
      setOpenModal(false);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Buy now handler
  const handleBuyNow = (product, e) => {
    e.stopPropagation();
    if (!user) {
      setLoginAlert(true);
      return;
    }
    alert(`Proceeding to buy ${product.name}!`);
  };

  // Toggle wishlist
  const handleToggleWishlist = (product, e) => {
    e.stopPropagation();
    if (!user) {
      setLoginAlert(true);
      return;
    }
    
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
      setWishlistAlert(true);
    }
  };

  // Toggle filter sections
  const toggleSection = (section) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section],
    });
  };

  // Alert close handlers
  const handleCloseLoginAlert = () => {
    setLoginAlert(false);
    navigate('/auth');
  };

  const handleCloseWishlistAlert = () => {
    setWishlistAlert(false);
  };

  const handleCloseAddedToCartAlert = () => {
    setAddedToCartAlert(false);
  };

  // Price formatter
  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (originalPrice, finalPrice) => {
    return finalPrice;
  };

  // Filter drawer for mobile
  const filterDrawer = (
    <Box sx={{ width: isMobile ? 250 : 320, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Filters
        </Typography>
        <IconButton onClick={() => setDrawerOpen(false)}>
          <Close />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />

      {/* Search in mobile view */}
      <Box sx={{ mb: 2, display: { xs: 'block', md: 'none' } }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchQuery ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchQuery('')}>
                  <Close fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
          sx={{ mb: 2 }}
        />
      </Box>

      {/* Price Range Filter */}
      <FilterSection>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PriceChange sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="subtitle1" fontWeight={600}>
              Price Range
            </Typography>
          </Box>
          <ExpandButton
            size="small"
            expanded={expanded.price}
            onClick={() => toggleSection('price')}
            edge="end"
          >
            {expanded.price ? <ExpandLess /> : <ExpandMore />}
          </ExpandButton>
        </Box>
        <Collapse in={expanded.price} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2 }}>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              min={100}
              max={5000}
              step={100}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `₹${value}`}
              sx={{
                '& .MuiSlider-thumb': {
                  height: 24,
                  width: 24,
                  backgroundColor: '#fff',
                  border: '2px solid currentColor',
                  '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                    boxShadow: 'inherit',
                  },
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Min: {formatPrice(priceRange[0])}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Max: {formatPrice(priceRange[1])}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </FilterSection>

      {/* Sort By Filter */}
      <FilterSection>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Sort sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="subtitle1" fontWeight={600}>
              Sort By
            </Typography>
          </Box>
          <ExpandButton
            size="small"
            expanded={expanded.sort}
            onClick={() => toggleSection('sort')}
            edge="end"
          >
            {expanded.sort ? <ExpandLess /> : <ExpandMore />}
          </ExpandButton>
        </Box>
        <Collapse in={expanded.sort} timeout="auto" unmountOnExit>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              variant="outlined"
              sx={{ '& .MuiSelect-select': { py: 1.5 } }}
            >
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
              <MenuItem value="alphabetical">Alphabetical</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>
        </Collapse>
      </FilterSection>

      {/* Reset Filters */}
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        startIcon={<Refresh />}
        onClick={resetFilters}
        sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
      >
        Reset Filters
      </Button>
    </Box>
  );

  // Render product cards
  const renderProductCards = () => {
    if (loading) {
      return Array(8).fill(0).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
          <Fade in={true} timeout={500 + index * 100}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <Skeleton variant="rectangular" height={200} />
              <CardContent>
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Skeleton variant="text" width="30%" />
                  <Skeleton variant="text" width="30%" />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Skeleton variant="rectangular" height={36} />
                  <Skeleton variant="rectangular" height={36} sx={{ mt: 1 }} />
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      ));
    }

    if (filteredProducts.length === 0) {
      return (
        <Box sx={{ width: '100%', textAlign: 'center', py: 5 }}>
          <Typography variant="h5" color="text.secondary">
            No products found matching your criteria
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={resetFilters}
            sx={{ mt: 2 }}
          >
            Reset Filters
          </Button>
        </Box>
      );
    }

    return filteredProducts.map((product, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
        <Zoom in={true} timeout={500 + index * 100}>
          <ProductCard elevation={3}>
            {product.isFeatured && (
              <ProductBadge
                label="Featured"
                color="primary"
                size="small"
              />
            )}
            <CardActionArea onClick={() => handleProductClick(product.id, product.code)}>
              <CardMedia
                component="img"
                height="200"
                image={product.imgUrl}
                alt={product.name}
                sx={{
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
              <CardContent>
                <Typography variant="h6" noWrap>
                  {product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <StyledRating
                    name={`rating-${product.id}`}
                    value={parseFloat(product.rating)}
                    readOnly
                    precision={0.1}
                    size="small"
                    icon={<Star fontSize="inherit" />}
                    emptyIcon={<StarBorder fontSize="inherit" />}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {product.rating} ({product.reviews})
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="body1" fontWeight={600} color="primary">
                    {formatPrice(product.finalPrice)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1, textDecoration: 'line-through' }}
                  >
                    {formatPrice(product.originalPrice)}
                  </Typography>
                  <Chip
                    label={`${product.discount}% off`}
                    size="small"
                    color="error"
                    sx={{ ml: 1, height: 20 }}
                  />
                </Box>
                <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                  Code: {product.code}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ mt: 'auto', justifyContent: 'space-between', p: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCart />}
                size="small"
                onClick={(e) => handleAddToCart(product, e)}
                sx={{
                  borderRadius: 2,
                  flexGrow: 1,
                  mr: 1,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                  transition: 'transform 0.2s ease-in-out',
                }}
              >
                Add to Cart
              </Button>
              <IconButton
                color={wishlist.some(item => item.id === product.id) ? 'error' : 'default'}
                onClick={(e) => handleToggleWishlist(product, e)}
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: '50%',
                  p: 1,
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                  transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
                }}
              >
                <FavoriteBorder />
              </IconButton>
            </CardActions>
          </ProductCard>
        </Zoom>
      </Grid>
    ));
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 2 }}>
      {/* Alerts */}
      <Snackbar
        open={loginAlert}
        autoHideDuration={3000}
        onClose={handleCloseLoginAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseLoginAlert} severity="warning" sx={{ width: '100%' }}>
          Please log in to continue!
        </Alert>
      </Snackbar>

      <Snackbar
        open={wishlistAlert}
        autoHideDuration={3000}
        onClose={handleCloseWishlistAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseWishlistAlert} severity="success" sx={{ width: '100%' }}>
          Product added to wishlist!
        </Alert>
      </Snackbar>

      <Snackbar
        open={addedToCartAlert}
        autoHideDuration={3000}
        onClose={handleCloseAddedToCartAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAddedToCartAlert} severity="success" sx={{ width: '100%' }}>
          {cartMessage}
        </Alert>
      </Snackbar>

      {/* Main Container */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            Explore Products
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Find the perfect product for your needs
          </Typography>
        </Box>

        {/* Search & Filter Bar */}
        <Paper
          elevation={2}
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {/* Search */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                      <Close fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
                sx: { borderRadius: 2, py: 0.5 }
              }}
            />
          </Box>
          
          {/* Filter Toggle Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDrawerOpen(true)}
            startIcon={<FilterAlt />}
            sx={{
              display: { xs: 'flex', md: 'none' },
              borderRadius: 2,
              px: 2,
            }}
          >
            Filters
          </Button>
          
          {/* Result Count */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {filteredProducts.length} products found
            </Typography>
          </Box>
        </Paper>

        {/* Main Content */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Filter Panel (Desktop) */}
          <Box
            component={Paper}
            elevation={2}
            sx={{
              width: { md: 280, lg: 320 },
              p: 2,
              mr: { md: 3 },
              mb: { xs: 3, md: 0 },
              borderRadius: 2,
              display: { xs: 'none', md: 'block' },
            }}
          >
            {filterDrawer}
          </Box>

          {/* Product Grid */}
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              {renderProductCards()}
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* Filter Drawer (Mobile) */}
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      >
        {filterDrawer}
      </SwipeableDrawer>

      {/* Quantity Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: '100%',
            maxWidth: 400,
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Choose Quantity</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <IconButton
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              color="primary"
              sx={{ border: '1px solid #ddd' }}
            >
              <Remove />
            </IconButton>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value || 1)))}
              inputProps={{ min: 1 }}
              sx={{ mx: 2, width: '100%' }}
            />
            <IconButton
              onClick={() => setQuantity(quantity + 1)}
              color="primary"
              sx={{ border: '1px solid #ddd' }}
            >
              <Add />
            </IconButton>
          </Box>
          
          {selectedProduct && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Product Details
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Avatar
                  src={selectedProduct.imgUrl}
                  alt={selectedProduct.name}
                  sx={{ width: 50, height: 50, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1">{selectedProduct.name}</Typography>
                  <Typography variant="body2" color="primary.main" fontWeight="bold">
                    {formatPrice(selectedProduct.finalPrice)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          
          <Box sx={{ mt: 3, bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
            <Typography variant="body2">
              Total: <strong>{selectedProduct ? formatPrice(selectedProduct.finalPrice * quantity) : ''}</strong>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setOpenModal(false)} 
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmAddToCart} 
            variant="contained"
            startIcon={<ShoppingCart />}
            sx={{ borderRadius: 2 }}
          >
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Scroll to top button */}
      <Zoom in={true}>
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 2,
          }}
        >
          <Tooltip title="Back to top">
            <IconButton
              color="primary"
              aria-label="back to top"
              component="span"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              <ExpandLess />
            </IconButton>
          </Tooltip>
        </Box>
      </Zoom>

      {/* Cart badge button */}
      <Zoom in={!!user}>
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            left: 20,
            zIndex: 2,
            display: { xs: 'block', md: 'none' },
          }}
        >
          <Tooltip title="View Cart">
            <IconButton
              color="primary"
              aria-label="shopping cart"
              component="span"
              onClick={() => navigate('/cart')}
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 2,
                p: 2,
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              <StyledBadge badgeContent={4} color="error">
                <ShoppingCart />
              </StyledBadge>
            </IconButton>
          </Tooltip>
        </Box>
      </Zoom>
    </Box>
  );
};

export default Products;