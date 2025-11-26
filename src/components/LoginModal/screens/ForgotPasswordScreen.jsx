import React, { useState, useEffect } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { StyledButton } from '../../UI/StyledButton.js';
import { typography } from '../../../theme/typography.js';
import passwordResetImage from '../../../assets/images/sign-up/password-reset.png';
import { FormContainer } from '../../../shared/components/FormContainer.jsx';
import { FormField } from '../../../shared/components/FormField.jsx';
import { BackLink } from '../../../shared/components/BackLink.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { recoveryRequest, clearRecoveryRequestSuccess, clearError } from '../../../store/slice/authSlice.jsx';

export const ForgotPasswordScreen = ({ onBackToLogin, onSendEmail, onClose }) => {
    const dispatch = useDispatch();
    const { loading, error, recoveryRequestSuccess } = useSelector((state) => state.auth);
    
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(recoveryRequest({ email }));
    };

    useEffect(() => {
        if (recoveryRequestSuccess) {
            
            const timer = setTimeout(() => {
                dispatch(clearRecoveryRequestSuccess());
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [recoveryRequestSuccess, dispatch, onClose]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const isFormValid = () => {
        return email && email.trim() !== '';
    };

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
                    alt="Password Reset"
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
                Forgot your password?
            </Typography>

            {/* Instructional Text */}
            <Typography sx={{
                ...typography.h5,
                color: '#3E3027',
                textAlign: 'center'
            }}>
                Enter your email to receive a password reset link.
            </Typography>

            {/* Form */}
            <FormContainer onSubmit={handleSubmit} gap={4}>
                <FormField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
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
                    {loading ? 'Sending...' : 'Send Email'}
                </StyledButton>

                {/* Success Message */}
                {recoveryRequestSuccess && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Recovery email sent successfully! Please check your inbox.
                    </Alert>
                )}

                {/* Error Message */}
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </FormContainer>

            <BackLink onClick={onBackToLogin} />
        </Box>
    );
};
