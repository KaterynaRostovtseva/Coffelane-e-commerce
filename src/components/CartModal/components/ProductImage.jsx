import React from 'react';
import { Box } from '@mui/material';
import { cartStyles } from '../styles.js';

const ProductImage = ({ src, alt }) => (
  <Box 
    component="img" 
    src={src} 
    alt={alt} 
    sx={cartStyles.imageContainer}
  />
);

export default ProductImage;
