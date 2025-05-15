import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Divider,
  Chip,
  Rating,
  Badge,
  Avatar,
  useMediaQuery,
  useTheme,
  Paper,
  Grid,
  Fade,
  Skeleton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Container,
} from '@mui/material';
import {
  ShoppingCart,
  FavoriteBorder,
  Favorite,
  Share,
  ArrowBack,
  Add,
  Remove,
  CheckCircle,
  LocalShipping,
  AssignmentReturn,
  Security,
  Star,
  StarBorder,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import productsData from '../data/productsData';
import { auth, db } from '../Firebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ProductDetail = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const code = new URLSearchParams(search).get('code');
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Zoom effect related states
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);
  const [zoomScale] = useState(2.5);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundProduct = productsData.find(
        (product) => product.id === parseInt(id) || product.code === code
      );
      
      if (foundProduct) {
        const enhancedProduct = {
          ...foundProduct,
          rating: 4.2, // Fixed to match the image
          reviews: 201, // Fixed to match the image
          originalPrice: 506.00, // Fixed to match the image
          discount: 31, // Fixed to match the image
          features: [
            '100% natural clay',
            'Handcrafted by artisans',
            'Enhances food flavor',
            'Biodegradable and sustainable',
            'Easy to clean'
          ],
          details: [
            { name: 'Material', value: 'Natural clay' },
            { name: 'Dimensions', value: '10 inch diameter' },
            { name: 'Weight', value: '0.8 kg' },
            { name: 'Care', value: 'Hand wash recommended' },
            { name: 'Origin', value: 'Handmade in India' },
          ]
        };
        
        setProduct(enhancedProduct);
        setSelectedImage(enhancedProduct.images?.[0] || enhancedProduct.imgUrl || 'https://via.placeholder.com/300');
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id, code]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleOpenDialog = () => {
    if (!user) {
      navigate('/auth');
    } else {
      setOpenDialog(true);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addDoc(collection(db, 'cart'), {
        userId: user.uid,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images?.[0] || product.imgUrl,
        code: product.code
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    setOpenDialog(false);
    setQuantity(1);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Handle image zoom functionality
  const handleImageMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  const handleImageMouseEnter = () => {
    setShowZoom(true);
  };

  const handleImageMouseLeave = () => {
    setShowZoom(false);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
            <Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} variant="rectangular" width={80} height={80} sx={{ borderRadius: 1 }} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="40%" height={30} />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="text" width={100} sx={{ ml: 1 }} />
            </Box>
            <Skeleton variant="text" width="30%" height={40} sx={{ mt: 2 }} />
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Skeleton variant="rectangular" width={150} height={50} />
              <Skeleton variant="rectangular" width={150} height={50} />
            </Box>
            <Skeleton variant="rectangular" height={200} sx={{ mt: 3, borderRadius: 1 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Typography variant="h5" color="text.secondary">
          Product not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back button */}
      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          Back
        </Button>
      </Box>

      {/* Main product section */}
      <Grid container spacing={3}>
        {/* Left side - Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative' }}>
            {/* Main large image */}
            <Box
              ref={imageContainerRef}
              onMouseMove={handleImageMouseMove}
              onMouseEnter={handleImageMouseEnter}
              onMouseLeave={handleImageMouseLeave}
              sx={{
                position: 'relative',
                cursor: 'zoom-in',
                overflow: 'hidden',
                height: { xs: 350, sm: 450, md: 500 },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f8f8f8'
              }}
            >
              <Box
                component="img"
                src={selectedImage}
                alt={product.name}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
              />
            </Box>

            {/* Thumbnail strip */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                mt: 2,
                overflowX: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {(product.images || [product.imgUrl]).map((img, i) => (
                <Box
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  sx={{
                    width: 70,
                    height: 70,
                    flexShrink: 0,
                    border: selectedImage === img ? '2px solid' : '1px solid',
                    borderColor: selectedImage === img ? 'primary.main' : 'divider',
                    borderRadius: 1,
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    component="img"
                    src={img}
                    alt={`Product view ${i + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Right side - Product information */}
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100%', pl: { md: 4 } }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            {/* Rating and code */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating
                value={parseFloat(product.rating)}
                precision={0.1}
                readOnly
                size="small"
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                {product.rating} ({product.reviews} reviews)
              </Typography>
              <Chip 
                label={product.code}
                size="small"
                sx={{ bgcolor: 'action.selected' }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Price section styled like Amazon */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                List Price:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 0.5 }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 500, color: 'error.main', mr: 2 }}
                >
                  {formatPrice(product.price)}
                </Typography>
                {product.originalPrice && (
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: 'line-through',
                      color: 'text.secondary',
                    }}
                  >
                    {formatPrice(product.originalPrice)}
                  </Typography>
                )}
              </Box>
              {product.discount && (
                <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                  You save {formatPrice(product.originalPrice - product.price)} ({product.discount}%)
                </Typography>
              )}
              <Typography variant="body2" color="success.main" sx={{ fontWeight: 600, mt: 0.5 }}>
                In Stock
              </Typography>
            </Box>

            {/* Short description - Amazon style */}
            <Typography
              variant="body2"
              sx={{ mb: 3, color: 'text.primary', lineHeight: 1.6 }}
            >
              Experience the joy of traditional dining with our handcrafted Clay Eating Plates. These plates are made from 100% natural clay and are shaped carefully by artisans to preserve heritage while offering everyday utility.
            </Typography>

            {/* Key features */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Highlights:
              </Typography>
              <List dense sx={{ py: 0 }}>
                {product.features?.slice(0, 3).map((feature, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Action buttons - Amazon style */}
            <Box
              sx={{
                mt: 'auto',
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" sx={{ mr: 2, minWidth: 70 }}>
                    Quantity:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      color="primary"
                      size="small"
                      sx={{ border: '1px solid', borderColor: 'divider' }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <TextField
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      inputProps={{ min: 1, style: { textAlign: 'center' } }}
                      sx={{ mx: 1, '& .MuiOutlinedInput-root': { width: 60, height: 36 } }}
                      size="small"
                    />
                    <IconButton
                      onClick={() => setQuantity(quantity + 1)}
                      color="primary"
                      size="small"
                      sx={{ border: '1px solid', borderColor: 'divider' }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="contained"
                  color="warning"
                  size="large"
                  onClick={handleAddToCart}
                  sx={{
                    py: 1,
                    borderRadius: '20px',
                    fontWeight: 500,
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    bgcolor: '#FFD814',
                    color: '#111',
                    '&:hover': {
                      bgcolor: '#F7CA00',
                    }
                  }}
                  disabled={addedToCart}
                >
                  {addedToCart ? 'Added to Cart' : 'Add to Cart'}
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  size="large"
                  sx={{
                    py: 1,
                    borderRadius: '20px',
                    fontWeight: 500,
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    bgcolor: '#FFA41C',
                    color: '#111',
                    '&:hover': {
                      bgcolor: '#FA8900',
                    }
                  }}
                >
                  Buy Now
                </Button>
              </Box>
            </Box>

            {/* Delivery info */}
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalShipping
                  color="primary"
                  sx={{ mr: 1, fontSize: '1.2rem' }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Free delivery on orders over ₹5000
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AssignmentReturn
                  color="primary"
                  sx={{ mr: 1, fontSize: '1.2rem' }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Easy 30-day returns
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Security
                  color="primary"
                  sx={{ mr: 1, fontSize: '1.2rem' }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  1-year warranty
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Product details tabs - Below both product image and info sections */}
      <Box sx={{ mt: 6 }}>
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              bgcolor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Tab label="Description" />
            <Tab label="Product Details" />
            <Tab label="Reviews" />
          </Tabs>

          <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
            {tabValue === 0 && (
              <Box>
                <Typography variant="body1" paragraph>
                  The {product.name} is a premium product designed for those who appreciate traditional craftsmanship and sustainable living. Made from 100% natural clay, these plates are carefully shaped by skilled artisans to preserve cultural heritage while providing practical utility for modern dining.
                </Typography>
                <Typography variant="body1" paragraph>
                  Each plate carries a unique rustic charm that enhances your dining experience. The natural clay material adds an earthy essence to your food, subtly enhancing flavors and textures in a way that modern dinnerware cannot replicate.
                </Typography>
                <Typography variant="body1" paragraph>
                  Using clay plates adds an earthy essence to food, enhancing flavor and texture. They're easy to clean, biodegradable, and a sustainable alternative to plastic or metal plates. Embrace a slow, mindful lifestyle with every meal.
                </Typography>
              </Box>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Product Specifications
                </Typography>
                <Grid container spacing={2}>
                  {product.details?.map((detail, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          p: 1.5,
                          bgcolor: index % 2 === 0 ? 'action.hover' : 'transparent',
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 500, minWidth: 120 }}
                        >
                          {detail.name}:
                        </Typography>
                        <Typography variant="body1">{detail.value}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {tabValue === 2 && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mr: 2 }}>
                    {product.rating}
                  </Typography>
                  <Box>
                    <Rating
                      value={parseFloat(product.rating)}
                      precision={0.1}
                      readOnly
                      icon={<Star fontSize="inherit" />}
                      emptyIcon={<StarBorder fontSize="inherit" />}
                      sx={{ color: 'secondary.main' }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Based on {product.reviews} reviews
                    </Typography>
                  </Box>
                </Box>

                {/* Sample reviews */}
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Customer Reviews
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        Beautiful and Functional
                      </Typography>
                      <Rating value={5} size="small" readOnly />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      By Priya Sharma on May 10, 2023
                    </Typography>
                    <Typography variant="body1">
                      These clay plates have transformed our dining experience. Food tastes better, and the rustic aesthetic is perfect for our farmhouse table. Highly recommend!
                    </Typography>
                  </Paper>

                  <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        Authentic Craftsmanship
                      </Typography>
                      <Rating value={4} size="small" readOnly />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      By Rajesh Patel on April 28, 2023
                    </Typography>
                    <Typography variant="body1">
                      You can tell these are made by real artisans. Each plate has slight variations that add character. The only reason for 4 stars is that one plate had a small chip on arrival, but customer service was excellent about replacing it.
                    </Typography>
                  </Paper>
                </Box>

                <Button variant="outlined" color="primary">
                  See All Reviews
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Quantity Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: '100%',
            maxWidth: 400,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Add to Cart</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <IconButton
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              color="primary"
              sx={{ border: '1px solid', borderColor: 'divider' }}
            >
              <Remove />
            </IconButton>
            <TextField
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1, style: { textAlign: 'center' } }}
              sx={{ mx: 2, '& .MuiOutlinedInput-root': { width: 80 } }}
            />
            <IconButton
              onClick={() => setQuantity(quantity + 1)}
              color="primary"
              sx={{ border: '1px solid', borderColor: 'divider' }}
            >
              <Add />
            </IconButton>
          </Box>

          <Box sx={{ mt: 3, bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={product.images?.[0] || product.imgUrl}
                alt={product.name}
                sx={{ width: 60, height: 60, mr: 2 }}
              />
              <Box>
                <Typography variant="subtitle1" noWrap>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Code: {product.code}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Total:</Typography>
              <Typography variant="h6" fontWeight={600}>
                {formatPrice(product.price * quantity)}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            sx={{ borderRadius: 1, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddToCart}
            variant="contained"
            startIcon={<ShoppingCart />}
            sx={{ borderRadius: 1, px: 3 }}
          >
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductDetail;