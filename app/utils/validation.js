export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return 'Phone number is required';
  }
  
  // Must start with country code
  if (!phoneNumber.startsWith('+')) {
    return 'Phone number must start with country code (e.g., +254)';
  }
  
  // Must have at least 10 digits after country code
  const digits = phoneNumber.replace(/[^0-9]/g, '');
  if (digits.length < 10) {
    return 'Phone number must have at least 10 digits';
  }
  
  return null;
};

export const isValidMockUser = (phoneNumber) => {
  // Demo user for testing
  return phoneNumber === '+254712345678';
};
