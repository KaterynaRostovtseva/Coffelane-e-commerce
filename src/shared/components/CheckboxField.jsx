import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { typography } from '../../theme/typography.js';

export const CheckboxField = ({
    label,
    checked,
    onChange,
    error,
    alignSelf = 'flex-start',
    ...props
}) => {
    return (
        <Box sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: alignSelf,
            width: '100%',
        }}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked}
                        onChange={onChange}
                        sx={{
                            color: '#A4795B',
                            '&.Mui-checked': {
                                color: '#A4795B',
                            },
                        }}
                    />
                }
                label={
                    <Typography sx={{
                        fontSize: typography.h7.fontSize,
                        lineHeight: typography.h7.lineHeight,
                        fontWeight: typography.h7.fontWeight,
                    }}>
                        {label}
                    </Typography>
                }
                sx={{
                    '& .MuiFormControlLabel-label': {
                        marginTop: '2px'
                    }
                }}
                {...props}
            />
            {error && (
                <Typography variant="caption" sx={{ color: '#FF2F2F', display: 'block' }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};
