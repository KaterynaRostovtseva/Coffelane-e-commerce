import React from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormField } from './FormField.jsx';

export const PasswordField = ({
    label,
    value,
    onChange,
    error,
    showPassword,
    onToggleVisibility,
    fullWidth = true,
    autoComplete,
    ...props
}) => {
    return (
        <FormField
            label={label}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            error={error}
            fullWidth={fullWidth}
            autoComplete={autoComplete || 'current-password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={onToggleVisibility}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
};
