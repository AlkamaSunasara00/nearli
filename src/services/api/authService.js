// Mock API service for Authentication
export const authService = {
  sendOTP: async (phone) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (phone.length < 10) throw new Error('Invalid phone number');
    return { success: true };
  },
  
  verifyOTP: async (phone, otp) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (otp !== '123456') throw new Error('Invalid OTP. Use 123456 for demo.');
    return {
      success: true,
      user: {
        id: 'u1',
        phone,
        name: 'Demo User',
      }
    };
  }
};
