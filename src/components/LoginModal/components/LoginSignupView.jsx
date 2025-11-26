import React from 'react';
import { LoginScreen } from '../screens/LoginScreen.jsx';
import { SignupScreen } from '../screens/SignupScreen.jsx';
import { LoginModalTabs } from './LoginModalTabs.jsx';

export const LoginSignupView = ({
    tabValue,
    formData,
    errors,
    loading,
    onTabChange,
    onInputChange,
    onSubmit,
    onGoogleLogin,
    onForgotPassword,
}) => {
    return (
        <>
            <LoginModalTabs tabValue={tabValue} onTabChange={onTabChange} />
            <LoginScreen
                tabValue={tabValue}
                handleSubmit={onSubmit}
                handleInputChange={onInputChange}
                setShowPassword={formData.setShowPassword}
                showPassword={formData.showPassword}
                formData={formData}
                errors={errors}
                onForgotPassword={onForgotPassword}
                onGoogleLogin={onGoogleLogin}
            />
            <SignupScreen
                tabValue={tabValue}
                handleSubmit={onSubmit}
                handleInputChange={onInputChange}
                setShowPassword={formData.setShowPassword}
                showPassword={formData.showPassword}
                showRepeatPassword={formData.showRepeatPassword}
                setShowRepeatPassword={formData.setShowRepeatPassword}
                formData={formData}
                errors={errors}
                loading={loading}
                onGoogleLogin={onGoogleLogin}
            />
        </>
    );
};
