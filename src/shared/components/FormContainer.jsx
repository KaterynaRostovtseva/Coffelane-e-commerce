import React from 'react';
import { Box } from '@mui/material';

export const FormContainer = ({ 
    children, 
    onSubmit, 
    gap = 2,
    ...props 
}) => {
    return (
        <Box 
            component="form" 
            onSubmit={onSubmit}
            sx={{
                padding: 0, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: gap,
                width: '100%'
            }}
            {...props}
        >
            {children}
        </Box>
    );
};
