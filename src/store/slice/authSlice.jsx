import { createSlice } from "@reduxjs/toolkit";
import { 
  registerUser, 
  loginUser, 
  loginWithGoogle, 
  changePassword, 
  resetPassword, 
  recoveryRequest, 
  recoveryPassword 
} from './authThunks.js';
import { SUCCESS_FLAGS, STORAGE_KEYS } from './authConstants.js';
import { 
  handleAsyncThunkPending,
  handleAsyncThunkFulfilled,
  handleAsyncThunkRejected,
  handleLoginSuccess,
  handleRegisterSuccess,
  handlePasswordActionPending,
  handlePasswordActionFulfilled,
  handlePasswordActionRejected,
  clearSuccessFlag,
  clearError as clearErrorReducer,
  logout as logoutReducer,
  setToken as setTokenReducer
} from './authReducers.js';


const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem(STORAGE_KEYS.TOKEN) || null,
    user: null,
    loading: false,
    error: null,
    [SUCCESS_FLAGS.CHANGE_PASSWORD]: false,
    [SUCCESS_FLAGS.RESET_PASSWORD]: false,
    [SUCCESS_FLAGS.RECOVERY_REQUEST]: false,
    [SUCCESS_FLAGS.RECOVERY_PASSWORD]: false,
    [SUCCESS_FLAGS.REGISTER]: false,
  },
  reducers: {
    setToken: setTokenReducer,
    logout: logoutReducer,
    clearChangePasswordSuccess: (state) => clearSuccessFlag(state, SUCCESS_FLAGS.CHANGE_PASSWORD),
    clearResetPasswordSuccess: (state) => clearSuccessFlag(state, SUCCESS_FLAGS.RESET_PASSWORD),
    clearRecoveryRequestSuccess: (state) => clearSuccessFlag(state, SUCCESS_FLAGS.RECOVERY_REQUEST),
    clearRecoveryPasswordSuccess: (state) => clearSuccessFlag(state, SUCCESS_FLAGS.RECOVERY_PASSWORD),
    clearRegisterSuccess: (state) => clearSuccessFlag(state, SUCCESS_FLAGS.REGISTER),
    clearError: clearErrorReducer,
  },
  extraReducers: (builder) => {
    builder
      /* --- Register --- */
      .addCase(registerUser.pending, (state) => {
        handleAsyncThunkPending(state);
        state[SUCCESS_FLAGS.REGISTER] = false;
      })
      .addCase(registerUser.fulfilled, handleRegisterSuccess)
      .addCase(registerUser.rejected, handleAsyncThunkRejected)

      /* --- Login --- */
      .addCase(loginUser.pending, handleAsyncThunkPending)
      .addCase(loginUser.fulfilled, handleLoginSuccess)
      .addCase(loginUser.rejected, handleAsyncThunkRejected)

      /* --- Google Login --- */
      .addCase(loginWithGoogle.pending, handleAsyncThunkPending)
      .addCase(loginWithGoogle.fulfilled, handleLoginSuccess)
      .addCase(loginWithGoogle.rejected, handleAsyncThunkRejected)

      /* --- Change password --- */
      .addCase(changePassword.pending, (state) => 
        handlePasswordActionPending(state, SUCCESS_FLAGS.CHANGE_PASSWORD))
      .addCase(changePassword.fulfilled, (state) => 
        handlePasswordActionFulfilled(state, SUCCESS_FLAGS.CHANGE_PASSWORD))
      .addCase(changePassword.rejected, (state, action) => 
        handlePasswordActionRejected(state, action, SUCCESS_FLAGS.CHANGE_PASSWORD, "Failed to change password"))

      /* --- Reset password --- */
      .addCase(resetPassword.pending, (state) => 
        handlePasswordActionPending(state, SUCCESS_FLAGS.RESET_PASSWORD))
      .addCase(resetPassword.fulfilled, (state) => 
        handlePasswordActionFulfilled(state, SUCCESS_FLAGS.RESET_PASSWORD))
      .addCase(resetPassword.rejected, (state, action) => 
        handlePasswordActionRejected(state, action, SUCCESS_FLAGS.RESET_PASSWORD, "Failed to reset password"))

      /* --- Recovery request --- */
      .addCase(recoveryRequest.pending, (state) => 
        handlePasswordActionPending(state, SUCCESS_FLAGS.RECOVERY_REQUEST))
      .addCase(recoveryRequest.fulfilled, (state) => 
        handlePasswordActionFulfilled(state, SUCCESS_FLAGS.RECOVERY_REQUEST))
      .addCase(recoveryRequest.rejected, (state, action) => 
        handlePasswordActionRejected(state, action, SUCCESS_FLAGS.RECOVERY_REQUEST, "Failed to send recovery email"))

      /* --- Recovery password --- */
      .addCase(recoveryPassword.pending, (state) => 
        handlePasswordActionPending(state, SUCCESS_FLAGS.RECOVERY_PASSWORD))
      .addCase(recoveryPassword.fulfilled, (state) => 
        handlePasswordActionFulfilled(state, SUCCESS_FLAGS.RECOVERY_PASSWORD))
      .addCase(recoveryPassword.rejected, (state, action) => 
        handlePasswordActionRejected(state, action, SUCCESS_FLAGS.RECOVERY_PASSWORD, "Failed to reset password"));
  },
});

// Re-export thunks for convenience
export {
  registerUser,
  loginUser,
  loginWithGoogle,
  changePassword,
  resetPassword,
  recoveryRequest,
  recoveryPassword
} from './authThunks.js';

export const { 
  setToken, 
  logout, 
  clearChangePasswordSuccess, 
  clearResetPasswordSuccess, 
  clearRecoveryRequestSuccess, 
  clearRecoveryPasswordSuccess, 
  clearRegisterSuccess, 
  clearError 
} = authSlice.actions;

export default authSlice.reducer;
