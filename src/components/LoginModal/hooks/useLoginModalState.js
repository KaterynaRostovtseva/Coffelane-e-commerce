import { useState } from 'react';

export const useLoginModalState = () => {
    const [tabValue, setTabValue] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showPasswordChangedSuccess, setShowPasswordChangedSuccess] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [resetPasswordData, setResetPasswordData] = useState({ email: '', newPassword: '' });
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        repeatPassword: '',
        privacyPolicy: false,
        newsletter: false,
    });
    const [errors, setErrors] = useState({});

    return {
        // State
        tabValue,
        showPassword,
        showRepeatPassword,
        showForgotPassword,
        showResetPassword,
        showPasswordChangedSuccess,
        showWelcome,
        resetPasswordData,
        formData,
        errors,
        
        // Setters
        setTabValue,
        setShowPassword,
        setShowRepeatPassword,
        setShowForgotPassword,
        setShowResetPassword,
        setShowPasswordChangedSuccess,
        setShowWelcome,
        setResetPasswordData,
        setFormData,
        setErrors,
    };
};
