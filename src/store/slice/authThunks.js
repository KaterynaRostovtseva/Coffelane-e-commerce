import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api/axios';

const handleApiError = (err, defaultMessage) => {
  if (err.response?.data && typeof err.response.data === 'object') {
    const validationErrors = err.response.data;
    let errorMessage = "Validation errors:\n";
    
    Object.keys(validationErrors).forEach(field => {
      if (Array.isArray(validationErrors[field])) {
        errorMessage += `${field}: ${validationErrors[field].join(', ')}\n`;
      } else {
        errorMessage += `${field}: ${validationErrors[field]}\n`;
      }
    });
    
    return errorMessage;
  }
  
  return err.response?.data?.message || defaultMessage;
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ firstName, lastName, email, password, newsletter }, { rejectWithValue }) => {
    try {
      const requestData = { 
        email,
        password,
        profile: {
          first_name: firstName,
          last_name: lastName
        }
      };
      
      const res = await api({
        method: 'POST',
        url: '/users/registration',
        data: requestData
      });
      
      return res.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err, "Registration failed"));
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err, "Login failed"));
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/googleLogin",
  async ({ email, token }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth_google/callback", { email, token });
      return res.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err, "Google login failed"));
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ currentPassword, newPassword, repeatNewPassword }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const res = await api.put(
        "/auth/change_password",
        { currentPassword, newPassword, repeatNewPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err, "Failed to change password"));
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ newPassword, repeatPassword }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/reset_password", { 
        newPassword, 
        repeatPassword 
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err, "Failed to reset password"));
    }
  }
);

export const recoveryRequest = createAsyncThunk(
  "auth/recoveryRequest",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/recovery_request", { email });
      return res.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err, "Failed to send recovery email"));
    }
  }
);

export const recoveryPassword = createAsyncThunk(
  "auth/recoveryPassword",
  async ({ token, newPassword, repeatPassword }, { rejectWithValue }) => {
    try {
      const requestPayload = { password: newPassword };
      const res = await api.post(`/auth/recovery_password/${token}`, requestPayload);
      return res.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err, "Failed to reset password"));
    }
  }
);
