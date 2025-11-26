// Auth state properties
export const AUTH_STATE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  LOADING: 'loading',
  ERROR: 'error',
  CHANGE_PASSWORD_SUCCESS: 'changePasswordSuccess',
  RESET_PASSWORD_SUCCESS: 'resetPasswordSuccess',
  RECOVERY_REQUEST_SUCCESS: 'recoveryRequestSuccess',
  RECOVERY_PASSWORD_SUCCESS: 'recoveryPasswordSuccess',
  REGISTER_SUCCESS: 'registerSuccess',
};

// Success flags
export const SUCCESS_FLAGS = {
  CHANGE_PASSWORD: 'changePasswordSuccess',
  RESET_PASSWORD: 'resetPasswordSuccess',
  RECOVERY_REQUEST: 'recoveryRequestSuccess',
  RECOVERY_PASSWORD: 'recoveryPasswordSuccess',
  REGISTER: 'registerSuccess',
};

// Default error messages
export const ERROR_MESSAGES = {
  REGISTRATION_FAILED: "Registration failed",
  LOGIN_FAILED: "Login failed",
  GOOGLE_LOGIN_FAILED: "Google login failed",
  CHANGE_PASSWORD_FAILED: "Failed to change password",
  RESET_PASSWORD_FAILED: "Failed to reset password",
  RECOVERY_REQUEST_FAILED: "Failed to send recovery email",
  RECOVERY_PASSWORD_FAILED: "Failed to reset password",
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
};
