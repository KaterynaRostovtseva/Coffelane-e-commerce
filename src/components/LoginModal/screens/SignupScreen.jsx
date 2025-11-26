import {TabPanel} from "../../TabPanel/TabPanel.jsx";
import {StyledButton} from "../../UI/StyledButton.js";
import {CustomDivider} from "../../Divider/CustomDivider.jsx";
import React from "react";
import {FormContainer} from "../../../shared/components/FormContainer.jsx";
import {FormField} from "../../../shared/components/FormField.jsx";
import {PasswordField} from "../../../shared/components/PasswordField.jsx";
import {CheckboxField} from "../../../shared/components/CheckboxField.jsx";
import {GoogleAuthButton} from "../../../shared/components/GoogleAuthButton.jsx";

export const SignupScreen = ({
                           tabValue, handleSubmit, handleInputChange,
                           setShowPassword, showPassword, setShowRepeatPassword,
                           showRepeatPassword, formData, errors, onGoogleLogin
                       }) => {
    return (
        <TabPanel value={tabValue} index={1}>
            <FormContainer onSubmit={handleSubmit} autoComplete="on">
                <FormField
                    label="First name"
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    error={errors.firstName}
                    autoComplete="given-name"
                />

                <FormField
                    label="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    error={errors.lastName}
                    autoComplete="family-name"
                />

                <FormField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    error={errors.email}
                    autoComplete="email"
                />

                <PasswordField
                    label="Password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    error={errors.password}
                    showPassword={showPassword}
                    onToggleVisibility={() => setShowPassword(!showPassword)}
                    autoComplete="new-password"
                />

                <PasswordField
                    label="Repeat password"
                    value={formData.repeatPassword}
                    onChange={handleInputChange('repeatPassword')}
                    error={errors.repeatPassword}
                    showPassword={showRepeatPassword}
                    onToggleVisibility={() => setShowRepeatPassword(!showRepeatPassword)}
                    autoComplete="new-password"
                />

                <CheckboxField
                    label="I agree to the privacy policy"
                    checked={formData.privacyPolicy}
                    onChange={handleInputChange('privacyPolicy')}
                    error={errors.privacyPolicy}
                />

                <CheckboxField
                    label="Subscribe to the newsletter and get exclusive offers"
                    checked={formData.newsletter}
                    onChange={handleInputChange('newsletter')}
                    alignSelf="flex-start"
                />

                <StyledButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ maxWidth: 'none' }}
                >
                    Sign up
                </StyledButton>

                <CustomDivider label='OR'/>

                <GoogleAuthButton 
                    onGoogleLogin={onGoogleLogin}
                    buttonText="Sign up with Google"
                />
            </FormContainer>
        </TabPanel>
    )
}