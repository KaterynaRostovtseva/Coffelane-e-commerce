import React, { useEffect } from 'react';
import { DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StyledDialog } from "../UI/StyledDialog.js";
import { useLoginModalState } from './hooks/useLoginModalState.js';
import { useAuthActions } from './hooks/useAuthActions.js';
import { useFormHandlers } from './hooks/useFormHandlers.js';
import { ModalFlowManager } from './components/ModalFlowManager.jsx';
import { MODAL_CONFIG } from './constants/index.js';

const LoginModal = ({ open, onClose, initialScreen, recoveryToken }) => {
    const navigate = useNavigate();
    
    const state = useLoginModalState();
    const authActions = useAuthActions();
    const formHandlers = useFormHandlers(state, authActions, onClose, navigate);

    useEffect(() => {
        if (open && initialScreen === 'reset-password' && recoveryToken) {
            state.setShowResetPassword(true);
            state.setShowForgotPassword(false);
        }
    }, [open, initialScreen, recoveryToken, state.setShowResetPassword, state.setShowForgotPassword]);

    const handleTabChange = (event, newValue) => {
        state.setTabValue(newValue);
        state.setErrors({});
        state.setShowForgotPassword(false);
        state.setShowResetPassword(false);
        state.setShowPasswordChangedSuccess(false);
        state.setShowWelcome(false);
    };

    const handleBackToLogin = () => {
        state.setShowForgotPassword(false);
        state.setShowResetPassword(false);
        state.setShowPasswordChangedSuccess(false);
        state.setShowWelcome(false);
    };

    const handleAutoLogin = () => {
        onClose();
    };

    const handleStartShopping = () => {
        onClose();
    };

    return (
        <StyledDialog
            open={open}
            modalIsOpen={open}
            onClose={onClose}
            maxWidth={false}
            sx={{'& .MuiDialog-paper': {width: MODAL_CONFIG.WIDTH, maxWidth: MODAL_CONFIG.MAX_WIDTH}}}
        >
            <DialogContent sx={{
                padding: MODAL_CONFIG.PADDING, 
                height: MODAL_CONFIG.HEIGHT, 
                display: 'flex', 
                flexDirection: 'column'
            }}>
                <ModalFlowManager
                    // State
                    tabValue={state.tabValue}
                    showForgotPassword={state.showForgotPassword}
                    showResetPassword={state.showResetPassword}
                    showPasswordChangedSuccess={state.showPasswordChangedSuccess}
                    showWelcome={state.showWelcome}
                    formData={{
                        ...state.formData,
                        setShowPassword: state.setShowPassword,
                        showPassword: state.showPassword,
                        showRepeatPassword: state.showRepeatPassword,
                        setShowRepeatPassword: state.setShowRepeatPassword,
                    }}
                    errors={state.errors}
                    loading={authActions.loading}
                    
                    // URL parameters
                    initialScreen={initialScreen}
                    recoveryToken={recoveryToken}
                    
                    // Debug: Log the URL parameters
                    // console.log('LoginModal - initialScreen:', initialScreen, 'recoveryToken:', recoveryToken);
                    
                    // Handlers
                    onTabChange={handleTabChange}
                    onInputChange={formHandlers.handleInputChange}
                    onSubmit={formHandlers.handleSubmit}
                    onGoogleLogin={formHandlers.handleGoogleLoginClick}
                    onForgotPassword={formHandlers.handleForgotPassword}
                    onBackToLogin={handleBackToLogin}
                    onSendEmail={formHandlers.handleSendEmail}
                    onResetPassword={formHandlers.handleResetPassword}
                    onAutoLogin={handleAutoLogin}
                    onStartShopping={handleStartShopping}
                    onClose={onClose}
                />
            </DialogContent>
        </StyledDialog>
    );
};

export default LoginModal;
