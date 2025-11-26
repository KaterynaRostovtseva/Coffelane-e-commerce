import React from 'react';
import { SuccessScreen } from '../../../shared/components/SuccessScreen.jsx';
import passwordChangedImage from '../../../assets/images/sign-up/password-changed.png';

export const PasswordChangedSuccessScreen = ({ onBackToLogin, onAutoLogin }) => {
    return (
        <SuccessScreen
            image={passwordChangedImage}
            imageAlt="Password Changed Success"
            heading="Password changed successfully!"
            subheading="You can now log in with your new password."
            buttonText="Log in"
            onButtonClick={onAutoLogin}
            showTextFirst={true}
        />
    );
};
