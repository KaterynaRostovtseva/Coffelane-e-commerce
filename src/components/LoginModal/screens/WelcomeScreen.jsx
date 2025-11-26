import React from 'react';
import { SuccessScreen } from '../../../shared/components/SuccessScreen.jsx';
import welcomeImage from '../../../assets/images/sign-up/welcome.png';

export const WelcomeScreen = ({ onStartShopping }) => {
    return (
        <SuccessScreen
            image={welcomeImage}
            imageAlt="Welcome to Coffee Lane"
            heading="Welcome to Coffee Lane!"
            subheading="Your account has been created."
            buttonText="Log in"
            onButtonClick={onStartShopping}
            showTextFirst={true}
        />
    );
};
