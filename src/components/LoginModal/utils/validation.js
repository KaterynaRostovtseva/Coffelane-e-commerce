const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    const errors = [];
    
    // Check length (1-128 characters as per backend schema)
    if (!password) {
        errors.push('Password is required');
        return errors;
    }
    
    if (password.length < 1) {
        errors.push('Password must be at least 1 character');
    }
    
    if (password.length > 128) {
        errors.push('Password must be no more than 128 characters');
    }
    
    // Backend requirements from the scheme:
    const minLengthDigit = 1;        // min_length_digit: 1 (adjusted from 4 for better UX)
    const minLengthAlpha = 2;        // min_length_alpha: 2
    const minLengthSpecial = 1;      // min_length_special: 1
    const minLengthLower = 1;        // min_length_lower: 1
    const minLengthUpper = 1;        // min_length_upper: 1
    const specialChars = '~!@#$%^&*()_+{}":;\'[]'; // special_characters
    
    // Count characters
    const digitCount = (password.match(/\d/g) || []).length;
    const alphaCount = (password.match(/[a-zA-Z]/g) || []).length;
    const lowerCount = (password.match(/[a-z]/g) || []).length;
    const upperCount = (password.match(/[A-Z]/g) || []).length;
    const specialCount = (password.match(new RegExp(`[${specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g')) || []).length;
    
    // Validate requirements
    if (digitCount < minLengthDigit) {
        errors.push(`Password must contain at least ${minLengthDigit} digits`);
    }
    
    if (alphaCount < minLengthAlpha) {
        errors.push(`Password must contain at least ${minLengthAlpha} alphabetic characters`);
    }
    
    if (specialCount < minLengthSpecial) {
        errors.push(`Password must contain at least ${minLengthSpecial} special character from: ${specialChars}`);
    }
    
    if (lowerCount < minLengthLower) {
        errors.push(`Password must contain at least ${minLengthLower} lowercase letter`);
    }
    
    if (upperCount < minLengthUpper) {
        errors.push(`Password must contain at least ${minLengthUpper} uppercase letter`);
    }
    
    return errors;
};

export const validation = (tabValue, formData, ) => {
    const newErrors = {};

    if (tabValue === 0) {
        // Login validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
    } else {
        // Signup validation
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        // Use comprehensive password validation
        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
            newErrors.password = passwordErrors[0]; // Show first error
        }
        if (!formData.repeatPassword) {
            newErrors.repeatPassword = 'Please repeat your password';
        } else if (formData.password !== formData.repeatPassword) {
            newErrors.repeatPassword = 'Passwords do not match';
        }
        if (!formData.privacyPolicy) {
            newErrors.privacyPolicy = 'You must agree to the privacy policy';
        }
    }
    return newErrors;
}
