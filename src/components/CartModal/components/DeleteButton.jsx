import React from 'react';
import { IconButton, Box } from '@mui/material';
import icondelete from '../../../assets/icons/delete-icon.svg?url';
import { cartStyles } from '../styles.js';

const DeleteButton = ({ onClick }) => (
  <IconButton onClick={onClick} sx={cartStyles.deleteButton}>
    <Box 
      component="img" 
      src={icondelete} 
      alt="delete" 
      sx={cartStyles.deleteIcon}
    />
  </IconButton>
);

export default DeleteButton;
