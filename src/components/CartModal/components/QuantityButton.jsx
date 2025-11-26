import React from 'react';
import { IconButton } from '@mui/material';
import { cartStyles } from '../styles.js';

const QuantityButton = ({ onClick, children }) => (
  <IconButton 
    onClick={onClick} 
    sx={cartStyles.quantityButton}
  >
    {children}
  </IconButton>
);

export default QuantityButton;
