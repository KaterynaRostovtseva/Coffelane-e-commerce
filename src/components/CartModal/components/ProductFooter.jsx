import React from 'react';
import { Box, Typography } from '@mui/material';
import QuantityControls from './QuantityControls';
import { cartStyles } from '../styles.js';

const ProductFooter = ({ quantity, price, onQuantityChange }) => (
  <Box sx={cartStyles.productFooter}>
    <QuantityControls 
      quantity={quantity}
      onDecrease={() => onQuantityChange(-1)}
      onIncrease={() => onQuantityChange(1)}
    />
    <Typography sx={cartStyles.textStyles.price}>
      ${parseFloat(price.toFixed(2))}
    </Typography>
  </Box>
);

export default ProductFooter;
