import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LoginSignupView } from './LoginSignupView.jsx';
import { PasswordFlowView } from './PasswordFlowView.jsx';
import { WelcomeView } from './WelcomeView.jsx';
import { FLOW_STATES } from '../constants/index.js';

export const ModalFlowManager = ({
    tabValue,
    showForgotPassword,
    showResetPassword,
    showPasswordChangedSuccess,
    showWelcome,
    formData,
    errors,
    loading,
    initialScreen,
    recoveryToken,
    onTabChange,
    onInputChange,
    onSubmit,
    onGoogleLogin,
    onForgotPassword,
    onBackToLogin,
    onSendEmail,
    onResetPassword,
    onAutoLogin,
    onStartShopping,
    onClose,
}) => {
    const getCurrentFlowState = () => {
        if (initialScreen === 'reset-password' && recoveryToken) {
            return FLOW_STATES.RESET_PASSWORD;
        }
        
        if (showWelcome) return FLOW_STATES.WELCOME;
        if (showPasswordChangedSuccess) return FLOW_STATES.PASSWORD_CHANGED_SUCCESS;
        if (showResetPassword) return FLOW_STATES.RESET_PASSWORD;
        if (showForgotPassword) return FLOW_STATES.FORGOT_PASSWORD;
        return FLOW_STATES.MAIN;
    };

    const currentFlowState = getCurrentFlowState();
    switch (currentFlowState) {
        case FLOW_STATES.MAIN:
            return (
                <LoginSignupView
                    tabValue={tabValue}
                    formData={formData}
                    errors={errors}
                    loading={loading}
                    onTabChange={onTabChange}
                    onInputChange={onInputChange}
                    onSubmit={onSubmit}
                    onGoogleLogin={onGoogleLogin}
                    onForgotPassword={onForgotPassword}
                />
            );

        case FLOW_STATES.WELCOME:
            return <WelcomeView onStartShopping={onStartShopping} />;
        default:
            return (
                <PasswordFlowView
                    showForgotPassword={showForgotPassword}
                    showResetPassword={showResetPassword}
                    showPasswordChangedSuccess={showPasswordChangedSuccess}
                    onBackToLogin={onBackToLogin}
                    onSendEmail={onSendEmail}
                    onResetPassword={onResetPassword}
                    onAutoLogin={onAutoLogin}
                    recoveryToken={recoveryToken}
                    onClose={onClose}
                />
            );
    }
};
