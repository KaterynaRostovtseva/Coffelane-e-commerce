import React, { useRef } from 'react';
import { GoogleButton } from '../../components/UI/StyledGoogleButton.js';
import { ColoredGoogleIcon } from './ColoredGoogleIcon/ColoredGoogleIcon.jsx';
import { GoogleLogin } from '@react-oauth/google';

export const GoogleAuthButton = ({ onGoogleLogin, buttonText }) => {
    const googleButtonRef = useRef(null);

    const handleCustomButtonClick = () => {
        const googleDiv = googleButtonRef.current;
        if (googleDiv) {
            const googleBtn = googleDiv.querySelector('[role="button"]');
            if (googleBtn) {
                googleBtn.click();
            }
        }
    };

    return (
        <>
            <div ref={googleButtonRef} style={{ display: 'none' }}>
                <GoogleLogin
                    onSuccess={onGoogleLogin}
                    onError={() => console.error('Login Failed')}
                    useOneTap={false}
                    auto_select={false}
                />
            </div>

            <GoogleButton
                fullWidth
                variant="outlined"
                startIcon={<ColoredGoogleIcon/>}
                onClick={handleCustomButtonClick}
            >
                {buttonText}
            </GoogleButton>
        </>
    );
};

