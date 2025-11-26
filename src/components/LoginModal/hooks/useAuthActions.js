import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser, loginWithGoogle, clearError } from '../../../store/slice/authSlice.jsx';
import { jwtDecode } from 'jwt-decode';

export const useAuthActions = () => {
    const dispatch = useDispatch();
    const { loading, error, registerSuccess } = useSelector(state => state.auth);

    const handleRegistration = async (formData, onSuccess) => {
        dispatch(clearError());
        
        const result = await dispatch(registerUser({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            newsletter: formData.newsletter
        }));
        
        if (registerUser.fulfilled.match(result)) {
            onSuccess();
        } else if (registerUser.rejected.match(result)) {
            return result.payload;
        }
    };

    const handleLogin = async (formData, onSuccess) => {
        dispatch(clearError());
        
        const result = await dispatch(loginUser({
            email: formData.email,
            password: formData.password
        }));
        
        if (loginUser.fulfilled.match(result)) {
            onSuccess();
        } else if (loginUser.rejected.match(result)) {
            return result.payload;
        }
    };

    const handleGoogleLogin = async (credentialResponse, onSuccess) => {
        try {
            const token = credentialResponse.credential;
            const user = jwtDecode(token);
            localStorage.setItem('googleToken', token);
            
            const result = await dispatch(loginWithGoogle({
                email: user.email,
                token: token
            }));

            if (loginWithGoogle.fulfilled.match(result)) {
                onSuccess();
            } else if (loginWithGoogle.rejected.match(result)) {
                return result.payload;
            }
        } catch (error) {
            return 'Google sign-in failed. Please try again.';
        }
    };

    return {
        loading,
        error,
        registerSuccess,
        handleRegistration,
        handleLogin,
        handleGoogleLogin,
    };
};
