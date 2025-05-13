import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import productsData from '../data/productsData';

const ProductDetail = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code');

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const foundProduct = productsData.find(
      (product) => product.id === parseInt(id) || product.code === code
    );
    setProduct(foundProduct);
    if (foundProduct?.images?.length) {
      setSelectedImage(foundProduct.images[0]);
    }
  }, [id, code]);

  if (!product) return <div>Loading...</div>;

  return (
    <Box sx={{ display: 'flex', padding: '30px', gap: 2, flexWrap: 'wrap' }}>
      {/* Thumbnail Gallery */}
      <Box sx={{ width: '10%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {(product.images || [product.imgUrl || 'https://via.placeholder.com/150']).map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`thumb-${i}`}
            onClick={() => setSelectedImage(img)}
            style={{
              width: '100%',
              cursor: 'pointer',
              borderRadius: '5px',
              border: selectedImage === img ? '2px solid #1976d2' : '1px solid #ccc',
            }}
          />
        ))}
      </Box>

      {/* Main Image View */}
      <Box sx={{ width: '35%', textAlign: 'center' }}>
        <img
          src={selectedImage || product.imgUrl || 'https://via.placeholder.com/300'}
          alt="main"
          style={{ width: '100%', maxHeight: '450px', objectFit: 'contain', borderRadius: '8px' }}
        />
      </Box>

      {/* Product Info & Actions */}
      <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="body1" color="textSecondary">
          {product.description || 'No description available.'}
        </Typography>
        <Typography variant="h5" sx={{ color: 'green' }}>
          ₹{product.price}
        </Typography>

        <Button variant="contained" color="primary" sx={{ height: '50px', fontWeight: 'bold' }}>
          Add to Cart
        </Button>
        <Button variant="outlined" color="secondary" sx={{ height: '50px', fontWeight: 'bold' }}>
          Buy Now
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetail;
