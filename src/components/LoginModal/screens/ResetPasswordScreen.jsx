import React, { useState, useEffect } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { StyledButton } from '../../UI/StyledButton.js';
import { typography } from '../../../theme/typography.js';
import passwordResetImage from '../../../assets/images/sign-up/password-reset.png';
import { FormContainer } from '../../../shared/components/FormContainer.jsx';
import { PasswordField } from '../../../shared/components/PasswordField.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { recoveryPassword, clearRecoveryPasswordSuccess, clearError } from '../../../store/slice/authSlice.jsx';

export const ResetPasswordScreen = ({ onBackToLogin, onResetPassword, token }) => {
    const dispatch = useDispatch();
    const { loading, error, recoveryPasswordSuccess } = useSelector((state) => state.auth);    
    const [formData, setFormData] = useState({
        newPassword: '',
        repeatPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const validatePassword = (password) => {
        const errors = [];
        
        if (!password) {
            errors.push('New password is required');
            return errors;
        }

        const minLengthDigit = 1;        // min_length_digit: 1 (adjusted from 4 for better UX)
        const minLengthAlpha = 2;        // min_length_alpha: 2
        const minLengthSpecial = 1;      // min_length_special: 1
        const minLengthLower = 1;        // min_length_lower: 1
        const minLengthUpper = 1;        // min_length_upper: 1
        const specialChars = '~!@#$%^&*()_+{}":;\'[]'; // special_characters
    
        const digitCount = (password.match(/\d/g) || []).length;
        const alphaCount = (password.match(/[a-zA-Z]/g) || []).length;
        const lowerCount = (password.match(/[a-z]/g) || []).length;
        const upperCount = (password.match(/[A-Z]/g) || []).length;
        const specialCount = (password.match(new RegExp(`[${specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g')) || []).length;
        
        if (digitCount < minLengthDigit) {
            errors.push(`Password must contain at least ${minLengthDigit} digits`);
        }
        
        if (alphaCount < minLengthAlpha) {
            errors.push(`Password must contain at least ${minLengthAlpha} alphabetic characters`);
        }
        
        if (specialCount < minLengthSpecial) {
            errors.push(`Password must contain at least ${minLengthSpecial} special character from: ${specialChars}`);
        }
        
        if (lowerCount < minLengthLower) {
            errors.push(`Password must contain at least ${minLengthLower} lowercase letter`);
        }
        
        if (upperCount < minLengthUpper) {
            errors.push(`Password must contain at least ${minLengthUpper} uppercase letter`);
        }
        
        return errors;
    };

    const handleInputChange = (field) => (event) => {
        const value = event.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
        
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const passwordErrors = validatePassword(formData.newPassword);
        if (passwordErrors.length > 0) {
            newErrors.newPassword = passwordErrors[0]; // Show first error
        }
        if (!formData.repeatPassword) {
            newErrors.repeatPassword = 'Please repeat your password';
        } else if (formData.newPassword !== formData.repeatPassword) {
            newErrors.repeatPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const isFormValid = () => {
        return formData.newPassword && 
               formData.repeatPassword &&
               !errors.newPassword &&
               !errors.repeatPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            if (!token) {
                setErrors({ general: 'Recovery token is missing. Please use the recovery link from your email or contact support.' });
                return;
            }
            
            if (token === 'placeholder-token') {
                setErrors({ general: 'This is a demo mode. In a real application, you would receive a recovery token via email.' });
                return;
            }
            
            dispatch(recoveryPassword({
                token,
                newPassword: formData.newPassword,
                repeatPassword: formData.repeatPassword
            }));
        }
    };

    useEffect(() => {
        if (recoveryPasswordSuccess) {
            // Reset form
            setFormData({
                newPassword: '',
                repeatPassword: ''
            });
            
            onResetPassword(formData.newPassword);

            const timer = setTimeout(() => {
                dispatch(clearRecoveryPasswordSuccess());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [recoveryPasswordSuccess, dispatch, onResetPassword, formData.newPassword]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: 0,
            width: '100%'
        }}>
            {/* Password Reset Illustration */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Box
                    component="img"
                    src={passwordResetImage}
                    alt="Reset Password"
                    sx={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        margin: 0,
                        padding: 0
                    }}
                />
            </Box>

            {/* Main Heading */}
            <Typography sx={{
                ...typography.h3,
                color: '#3E3027',
                textAlign: 'center'
            }}>
                Reset password
            </Typography>

            {/* Instructional Text */}
            <Typography sx={{
                ...typography.h5,
                color: '#3E3027',
                textAlign: 'center'
            }}>
                Enter your new password below.
            </Typography>

            {/* Form */}
            <FormContainer onSubmit={handleSubmit} gap={4}>
                <PasswordField
                    label="New password"
                    value={formData.newPassword}
                    onChange={handleInputChange('newPassword')}
                    error={errors.newPassword}
                    showPassword={showPassword}
                    onToggleVisibility={() => setShowPassword(!showPassword)}
                />

                <PasswordField
                    label="Repeat new password"
                    value={formData.repeatPassword}
                    onChange={handleInputChange('repeatPassword')}
                    error={errors.repeatPassword}
                    showPassword={showRepeatPassword}
                    onToggleVisibility={() => setShowRepeatPassword(!showRepeatPassword)}
                />

                <StyledButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading || !isFormValid()}
                    sx={{ 
                        maxWidth: 'none',
                        ...typography.h6
                    }}
                >
                    {loading ? 'Resetting...' : 'Reset Password'}
                </StyledButton>

                {/* Success Message */}
                {recoveryPasswordSuccess && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Password reset successfully! You can now log in with your new password.
                    </Alert>
                )}

                {/* General Error Message */}
                {errors.general && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {errors.general}
                    </Alert>
                )}

                {/* API Error Message */}
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </FormContainer>
        </Box>
    );
};
