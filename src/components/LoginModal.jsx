import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Divider,
  CircularProgress,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { h3, h6, h7 } from "../styles/typographyStyles.jsx";
import { btnStyles, googleButton } from "../styles/btnStyles.jsx";
import { inputStyles, checkboxStyles } from "../styles/inputStyles.jsx";
import {
  loginUser,
  registerAndLoginUser,
  loginWithGoogle,
} from "../store/slice/authSlice.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function LoginModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [tab, setTab] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  const handleTabChange = (e, newValue) => setTab(newValue);

  // обработчик Google
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse?.credential;
      if (!token) {
        console.error("No Google credential");
        return;
      }

      const decoded = jwtDecode(token);
      const email = decoded?.email;

      if (!email) {
        console.error("No email in Google token");
        return;
      }

      const result = await dispatch(loginWithGoogle({ email, token }));

      if (result.meta.requestStatus === "fulfilled") {
        console.log("✔ Google login successful. Closing modal...");
        handleClose();
        navigate("/account/personal-info");
      } else {
        console.log("✖ Google login failed:", result.payload);
      }
    } catch (e) {
      console.error("Google login error", e);
    }
  };

  const handleLogin = async () => {
    console.log("▶ LOGIN CLICK");
    console.log("Email:", email);
    console.log("Password:", password);

    const result = await dispatch(loginUser({ email, password }));

    console.log("LOGIN RESULT:", result);

    if (result.meta.requestStatus === "fulfilled") {
      console.log("✔ Login successful. Closing modal...");
      handleClose();
      navigate("/account/personal-info");
    } else {
      console.log("✖ Login failed:", result.payload);
    }
  };

  const handleRegister = async () => {
    console.log("▶ REGISTER CLICK");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Repeat:", repeatPassword);

    if (password !== repeatPassword) {
      console.log("❌ Passwords do not match!");
      alert("Passwords do not match!");
      return;
    }

    const registrationData = {
      email,
      password,
      profile: {
        first_name: firstName || "",
        last_name: lastName || "",
        company_name: "",
        country: "",
        state: "",
        region: "",
        street_name: "",
        apartment_number: "",
        zip_code: "",
        phone_number: "",
        agree_privacy: agreePrivacy || false,
        subscribe_newsletter: subscribeNewsletter || false,
      },
    };

    console.log("DATA SENT TO REGISTER:", registrationData);

    const result = await dispatch(registerAndLoginUser(registrationData));

    console.log("REGISTER RESULT:", result);

    if (result.meta.requestStatus === "fulfilled") {
      console.log("✔ Registration successful. Closing modal...");
      handleClose();
      // Редиректим на аккаунт сразу после успешного логина
      navigate("/account/personal-info");
    } else {
      console.log("✖ Registration failed:", result.payload);
    }
  };
console.log("VITE_GOOGLE_OAUTH_CLIENT_ID =", import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          position: "fixed",
          top: 0,
          right: 0,
          width: { xs: "100%", sm: 450 },
          borderRadius: { xs: 0, sm: "40px 0 0 0" },
          backgroundColor: "#fff",
          m: 0,
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", p: 3, gap: 2 }}>
        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "#3E3027" } }}
        >
          <Tab
            label="Log in"
            sx={{
              ...h3,
              textTransform: "none",
              color: tab === 0 ? "#3E3027" : "#999999",
            }}
          />
          <Tab
            label="Sign up"
            sx={{
              ...h3,
              textTransform: "none",
              color: tab === 1 ? "#3E3027" : "#999999",
            }}
          />
        </Tabs>

        {/* Поля формы */}
        <Box display="flex" flexDirection="column" gap={1}>
          {tab === 1 && (
            <>
              <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                sx={{ ...inputStyles }}
              />
              <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                sx={{ ...inputStyles }}
              />
            </>
          )}
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ ...inputStyles }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ ...inputStyles }}
          />
          {tab === 1 && (
            <TextField
              label="Repeat Password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              fullWidth
              sx={{ ...inputStyles }}
            />
          )}
          {tab === 1 && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ ...checkboxStyles }}
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                  />
                }
                label="I agree to the privacy policy"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ ...checkboxStyles }}
                    checked={subscribeNewsletter}
                    onChange={(e) =>
                      setSubscribeNewsletter(e.target.checked)
                    }
                  />
                }
                label="Subscribe to newsletter"
              />
            </>
          )}
          {tab === 0 && (
            <Typography
              sx={{
                ...h7,
                cursor: "pointer",
                color: "#A4795B",
                textAlign: "right",
              }}
              onClick={() => alert("Forgot password clicked")}
            >
              <span
                style={{
                  borderBottom: "1px solid #A4795B",
                  paddingBottom: 2,
                  display: "inline-block",
                  lineHeight: 1.2,
                }}
              >
                Forgot password?
              </span>
            </Typography>
          )}
          {error && <Alert severity="error">{JSON.stringify(error)}</Alert>}
        </Box>

        {/* Кнопка Login/Register */}
        <Button
          onClick={tab === 0 ? handleLogin : handleRegister}
          disabled={loading}
          sx={{ ...btnStyles, textTransform: "none", width: "100%" }}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : tab === 0 ? (
            "Log in"
          ) : (
            "Sign up"
          )}
        </Button>

        {/* Divider */}
        <Box display="flex" alignItems="center" gap={1}>
          <Divider sx={{ flex: 1 }} />
          <Typography variant="body2">OR</Typography>
          <Divider sx={{ flex: 1 }} />
        </Box>

        {/* Google button */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.error("Google login failed")}
            useOneTap={false}
          />
        </Box>
      </Box>
    </Dialog>
  );
}
