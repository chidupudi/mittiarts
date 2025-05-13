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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import productsData from '../data/productsData';

const Products = () => {
  const navigate = useNavigate();

  const [priceRange, setPriceRange] = useState([100, 5000]);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedColors, setSelectedColors] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Extract unique colors from data (optional: simulate with placeholder)
  const allColors = ['Red', 'Gold', 'Blue', 'Green', 'Purple', 'Brown', 'Yellow'];

  // Simulate color assignment (for demo)
  const assignColorsToProducts = (products) => {
    const colors = ['Red', 'Gold', 'Blue', 'Green', 'Purple', 'Brown', 'Yellow'];
    return products.map((product, index) => ({
      ...product,
      color: colors[index % colors.length],
      imgUrl: product.images?.[0] || 'https://via.placeholder.com/150',
    }));
  };

  const [products] = useState(assignColorsToProducts(productsData));

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (selectedColors.length === 0 || selectedColors.includes(product.color))
    );

    if (sortBy === 'priceLowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHighToLow') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [priceRange, sortBy, selectedColors, products]);

  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const resetFilters = () => {
    setPriceRange([100, 5000]);
    setSelectedColors([]);
    setSortBy('relevance');
  };

  const handleProductClick = (id, code) => {
    navigate(`/product/${id}?code=${code}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Filter Panel */}
      <Box sx={{ width: '20%', p: 2, borderRight: '1px solid #ccc' }}>
        <Typography variant="h6">Filters</Typography>

        <Box sx={{ my: 2 }}>
          <Typography gutterBottom>Price Range (₹)</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            min={100}
            max={5000}
            step={100}
            valueLabelDisplay="auto"
          />
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography gutterBottom>Sort By</Typography>
          <FormControl fullWidth>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
              <MenuItem value="alphabetical">Alphabetical</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography gutterBottom>Colors</Typography>
          {allColors.map((color) => (
            <FormControlLabel
              key={color}
              control={
                <Checkbox
                  checked={selectedColors.includes(color)}
                  onChange={() => handleColorChange(color)}
                />
              }
              label={color}
            />
          ))}
        </Box>

        <Button variant="outlined" color="secondary" fullWidth onClick={resetFilters}>
          Reset Filters
        </Button>
      </Box>

      {/* Product Grid */}
      <Box sx={{ width: '80%', p: 2 }}>
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Box
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  p: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.02)' },
                }}
                onClick={() => handleProductClick(product.id, product.code)}
              >
                <img
                  src={product.imgUrl}
                  alt={product.name}
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ₹{product.price}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                  Code: {product.code}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1, width: '100%' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Added ${product.name} to cart!`);
                  }}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outlined"
                  color="success"
                  sx={{ mt: 1, width: '100%' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Proceeding to buy ${product.name}!`);
                  }}
                >
                  Buy Now
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Products;
