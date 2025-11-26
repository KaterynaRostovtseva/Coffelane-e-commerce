import React from 'react';
import { Box } from '@mui/material';
import { StyledTextField } from '../../components/UI/Input.js';
import { ErrorOutline } from '@mui/icons-material';

export const FormField = ({
    label,
    type = 'text',
    value,
    onChange,
    error,
    helperText,
    fullWidth = true,
    ...props
}) => {
    const fieldSx = {
        '& .MuiInputLabel-root': {
            color: '#999999'
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#999999'
        }
    };

    return (
        <StyledTextField
            fullWidth={fullWidth}
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FF2F2F' }}>
                    <ErrorOutline fontSize="small" />
                    {error}
                </span>
            )}
            sx={fieldSx}
            autoComplete={type === 'email' ? 'email' : type === 'password' ? 'current-password' : 'off'}
            {...props}
        />
    );
};
