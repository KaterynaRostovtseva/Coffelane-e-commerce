import React from 'react';
import { Box, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import QuantityButton from './QuantityButton';
import { cartStyles } from '../styles.js';

const QuantityControls = ({ quantity, onDecrease, onIncrease }) => (
  <Box sx={cartStyles.quantityContainer}>
    <QuantityButton onClick={onDecrease}>
      <Remove fontSize="small" />
    </QuantityButton>
    <Typography sx={cartStyles.textStyles.quantity}>
      {quantity}
    </Typography>
    <QuantityButton onClick={onIncrease}>
      <Add fontSize="small" />
    </QuantityButton>
  </Box>
);

export default QuantityControls;
