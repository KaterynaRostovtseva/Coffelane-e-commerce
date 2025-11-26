import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Paper, Tabs, Tab, Typography } from "@mui/material";
import { TabPanel } from "../components/TabPanel/TabPanel";
import PersonalInfoForm from "../components/account/PersonalInfoForm.jsx";
import AccountSettingsForm from "../components/account/AccountSettingsForm.jsx";
import OrdersHistory from "../components/account/OrdersHistory.jsx";
import { h3, h4 } from "../styles/typographyStyles.jsx";

const tabPaths = ["personal-info", "account-settings", "orders-history"];

export default function AccountPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabIndexFromPath = () => {
    const path = location.pathname.split("/").pop();
    const index = tabPaths.indexOf(path);
    return index !== -1 ? index : 0; 
  };

  const [tab, setTab] = useState(getTabIndexFromPath());

  const handleChange = (e, newValue) => {
    setTab(newValue);
    navigate(`/account/${tabPaths[newValue]}`);
  };

  useEffect(() => {
    setTab(getTabIndexFromPath());
  }, [location.pathname]);

  return (
    <Grid size={12} sx={{ px: 4, py: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>

      <Typography sx={{ ...h3, textAlign: "center", mb: 3, width: "100%" }}>My Account</Typography>

      <Paper elevation={1} sx={{ borderRadius: 3, p: 2, width: "100%", maxWidth: "1400px", }}>
        <Tabs value={tab} onChange={handleChange} variant="fullWidth" TabIndicatorProps={{ style: { display: "none" } }} sx={{
          "& .MuiTab-root": {
            ...h4,
            color: "#999",            
            textTransform: "none",
            borderBottom: "1px solid #999",
            "&:hover": {
            
              color: "#3E3027",              
            },
          },
          "& .Mui-selected": {
            color: "#3E3027 !important",            
            borderBottom: "3px solid #000", 
          },
        }}
        >
          <Tab label="Personal information" />
          <Tab label="Account Settings" />
          <Tab label="Check your orders" />
        </Tabs>

        <TabPanel value={tab} index={0}>
          <PersonalInfoForm />
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <AccountSettingsForm />
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <OrdersHistory />
        </TabPanel>
      </Paper>
    </Grid>
  );
}

