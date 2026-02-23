export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return 'Phone number is required';
  }
  
  // Check if starts with +254
  if (!phoneNumber.startsWith('+254')) {
    return 'Phone number must start with country code +254';
  }
  
  // Check length (should be +254 followed by 9 digits)
  if (phoneNumber.length !== 13) {
    return 'Phone number must be +254 followed by 9 digits';
  }
  
  // Check if remaining characters are digits
  const digits = phoneNumber.slice(4);
  if (!/^\d+$/.test(digits)) {
    return 'Phone number must contain only digits after country code';
  }
  
  return null;
};

// Mock valid phone number for login
export const isValidMockUser = (phoneNumber) => {
  return phoneNumber === '+254712345678';
};