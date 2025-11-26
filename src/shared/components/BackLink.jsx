import React from 'react';
import { Box, Typography } from '@mui/material';
import { typography } from '../../theme/typography.js';
import arrowLeftIcon from '../../assets/icons/arrow-left.svg';

export const BackLink = ({ onClick, text = "Back to Login" }) => {
    return (
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                color: '#3E3027',
                '&:hover': {
                    textDecoration: 'underline'
                }
            }}
            onClick={onClick}
        >
            <Box
                component="img"
                src={arrowLeftIcon}
                alt="Back"
                sx={{
                    width: '20px',
                    height: '20px'
                }}
            />
            <Typography sx={{
                ...typography.h6,
                color: '#3E3027'
            }}>
                {text}
            </Typography>
        </Box>
    );
};
