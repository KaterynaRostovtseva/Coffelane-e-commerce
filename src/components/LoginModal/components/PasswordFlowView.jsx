import React from 'react';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen.jsx';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen.jsx';
import { PasswordChangedSuccessScreen } from '../screens/PasswordChangedSuccessScreen.jsx';

export const PasswordFlowView = ({
    showForgotPassword,
    showResetPassword,
    showPasswordChangedSuccess,
    onBackToLogin,
    onSendEmail,
    onResetPassword,
    onAutoLogin,
    recoveryToken,
    onClose,
}) => {
    if (showForgotPassword) {
        return (
            <ForgotPasswordScreen
                onBackToLogin={onBackToLogin}
                onSendEmail={onSendEmail}
                onClose={onClose}
            />
        );
    }

    if (showResetPassword) {
        
        return (
            <ResetPasswordScreen
                onBackToLogin={onBackToLogin}
                onResetPassword={onResetPassword}
                token={recoveryToken}
            />
        );
    }

    if (showPasswordChangedSuccess) {
        return (
            <PasswordChangedSuccessScreen
                onBackToLogin={onBackToLogin}
                onAutoLogin={onAutoLogin}
            />
        );
    }

    return null;
};
