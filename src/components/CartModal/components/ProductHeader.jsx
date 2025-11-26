import React from 'react';
import { Box, Typography } from '@mui/material';
import DeleteButton from './DeleteButton';
import { cartStyles } from '../styles.js';

const ProductHeader = ({ name, onDelete }) => (
  <Box sx={cartStyles.productHeader}>
    <Typography sx={cartStyles.textStyles.productName}>
      {name}
    </Typography>
    <DeleteButton onClick={onDelete} />
  </Box>
);

export default ProductHeader;
