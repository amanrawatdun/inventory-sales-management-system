import api from "./api";

//  Send OTP
export const sendOtpAPI = async (email) => {
    
    const res = await api.post('/admin/forgot-password',  email );
    return res.data;
};

//  Verify OTP
export const verifyOtpAPI = async (email, otp) => {
    const res = await api.post('/admin/verify-otp', { email, otp });
    return res.data;
};

//  Reset Password
export const resetPasswordAPI = async (email, otp, newPassword) => {
    const res = await api.post('/admin/reset-password', { email, otp, newPassword });
    return res.data;
};

// ✅ Update Profile
export const updateProfileAPI = async (data) => {
    const res = await api.patch('/admin/updateprofile', data);
    console.log(res.data); // Optional debug
    return res.data;
};

// ✅ Get Current Logged In User
export const getCurrentUserAPI = async () => {
    const res = await api.get('/admin/me');
    return res.data.admin;
};
