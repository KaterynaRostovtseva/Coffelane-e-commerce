import {TabPanel} from "../../TabPanel/TabPanel.jsx";
import {Box, Typography} from "@mui/material";
import {typography} from "../../../theme/typography.js";
import {StyledButton} from "../../UI/StyledButton.js";
import {CustomDivider} from "../../Divider/CustomDivider.jsx";
import React from "react";
import {FormContainer} from "../../../shared/components/FormContainer.jsx";
import {FormField} from "../../../shared/components/FormField.jsx";
import {PasswordField} from "../../../shared/components/PasswordField.jsx";
import {GoogleAuthButton} from "../../../shared/components/GoogleAuthButton.jsx";

export const LoginScreen = ({
                          tabValue, handleSubmit, handleInputChange,
                          setShowPassword, showPassword, formData, errors, onForgotPassword, onGoogleLogin
                      }) => {
    return (
        <TabPanel value={tabValue} index={0}>
            <FormContainer onSubmit={handleSubmit} autoComplete="on">
                <FormField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    error={errors.email}
                />

                <PasswordField
                    label="Password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    error={errors.password}
                    showPassword={showPassword}
                    onToggleVisibility={() => setShowPassword(!showPassword)}
                />
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%'}}>
                    {/* Forgot Password */}
                    <Typography
                        onClick={onForgotPassword}
                        sx={{
                            color: '#A4795B',
                            cursor: 'pointer',
                            textAlign: 'right',
                            fontSize: typography.h7.fontSize,
                            lineHeight: typography.h7.lineHeight,
                            fontWeight: typography.h7.fontWeight,
                            '&:hover': {textDecoration: 'underline'}
                        }}
                    >
                        Forgot password?
                    </Typography>

                    {/* Divider under text */}
                    <Box
                        sx={{
                            height: '1px',
                            backgroundColor: '#A4795B',
                            width: '120px',
                            marginTop: '4px',
                            marginLeft: 'auto',
                            marginRight: '0',
                        }}
                    />
                </Box>


                <StyledButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ maxWidth: 'none' }}
                >
                    Log in
                </StyledButton>

                <CustomDivider label='OR'/>

                <GoogleAuthButton 
                    onGoogleLogin={onGoogleLogin}
                    buttonText="Sign in with Google"
                />
            </FormContainer>
        </TabPanel>
    )
}