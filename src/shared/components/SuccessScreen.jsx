import React from 'react';
import { Box, Typography } from '@mui/material';
import { StyledButton } from '../../components/UI/StyledButton.js';
import { typography } from '../../theme/typography.js';

export const SuccessScreen = ({
    image,
    imageAlt,
    heading,
    subheading,
    buttonText,
    onButtonClick,
    showTextFirst = true
}) => {
    const textContent = (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
        }}>
            <Typography sx={{
                ...typography.h3,
                color: '#3E3027',
                textAlign: 'center'
            }}>
                {heading}
            </Typography>
            <Typography sx={{
                ...typography.h5,
                color: '#3E3027',
                textAlign: 'center'
            }}>
                {subheading}
            </Typography>
        </Box>
    );

    const imageContent = (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Box
                component="img"
                src={image}
                alt={imageAlt}
                sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    margin: 0,
                    padding: 0
                }}
            />
        </Box>
    );

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: 0,
            width: '100%'
        }}>
            {showTextFirst ? (
                <>
                    {textContent}
                    {imageContent}
                </>
            ) : (
                <>
                    {imageContent}
                    {textContent}
                </>
            )}

            <StyledButton
                fullWidth
                variant="contained"
                onClick={onButtonClick}
                sx={{ 
                    maxWidth: 'none',
                    ...typography.h6
                }}
            >
                {buttonText}
            </StyledButton>
        </Box>
    );
};
