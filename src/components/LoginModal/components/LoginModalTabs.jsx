import React from 'react';
import { Box } from '@mui/material';
import { StyledTabs } from "../../UI/StyledTabs.js";
import { StyledTab } from "../../UI/StyledTab.js";

export const LoginModalTabs = ({ tabValue, onTabChange }) => {
    return (
        <Box sx={{ borderBottom: 1, borderColor: '#E0E0E0', padding: 0 }}>
            <StyledTabs value={tabValue} onChange={onTabChange}>
                <StyledTab label="Log in" />
                <StyledTab label="Sign up" />
            </StyledTabs>
        </Box>
    );
};
