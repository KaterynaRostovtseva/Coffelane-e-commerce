import { AUTH_STATE_KEYS, SUCCESS_FLAGS, STORAGE_KEYS } from './authConstants.js';

// Helper functions for common reducer patterns
export const handleAsyncThunkPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const handleAsyncThunkFulfilled = (state, action) => {
  state.loading = false;
  if (action.payload.token) {
    state.token = action.payload.token;
    state.user = action.payload.user;
    localStorage.setItem(STORAGE_KEYS.TOKEN, action.payload.token);
  }
};

export const handleAsyncThunkRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

// Specific handlers for different auth actions
export const handleLoginSuccess = (state, action) => {
  handleAsyncThunkFulfilled(state, action);
};

export const handleRegisterSuccess = (state, action) => {
  handleAsyncThunkFulfilled(state, action);
  state[SUCCESS_FLAGS.REGISTER] = true;
};

export const handlePasswordActionPending = (state, successFlag) => {
  state.loading = true;
  state.error = null;
  state[successFlag] = false;
};

export const handlePasswordActionFulfilled = (state, successFlag) => {
  state.loading = false;
  state[successFlag] = true;
};

export const handlePasswordActionRejected = (state, action, successFlag, defaultMessage) => {
  state.loading = false;
  state.error = action.payload || defaultMessage;
};

// Clear functions
export const clearSuccessFlag = (state, successFlag) => {
  state[successFlag] = false;
};

export const clearError = (state) => {
  state.error = null;
};

export const logout = (state) => {
  state.token = null;
  state.user = null;
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

export const setToken = (state, action) => {
  state.token = action.payload;
  localStorage.setItem(STORAGE_KEYS.TOKEN, action.payload);
};
