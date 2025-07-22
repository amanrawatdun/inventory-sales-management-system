import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import {
  getCurrentUserAPI,
  resetPasswordAPI,
  sendOtpAPI,
  updateProfileAPI,
  verifyOtpAPI,
} from "../../services/authApi";

const API = `${import.meta.env.VITE_API_URL}/admin`;

// === ASYNC THUNKS ===

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${API}/login`, credentials);
      localStorage.setItem('token', response.data.token);
      return response.data.admin;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const registerAdmin = createAsyncThunk(
  'auth/registerAdmin',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API}/register`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loadUserFromStorage = createAsyncThunk(
  'auth/loadUserFromStorage',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return thunkAPI.rejectWithValue('No token found');
      const res = await getCurrentUserAPI();
      return res;
    } catch {
      return thunkAPI.rejectWithValue('Failed to load user from storage.');
    }
  }
);

export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (email, thunkAPI) => {
    try {
      const res = await sendOtpAPI(email);
      return res.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp }, thunkAPI) => {
    try {
      const res = await verifyOtpAPI(email, otp);
      return res.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to verify OTP');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, otp, newPassword }, thunkAPI) => {
    try {
      const res = await resetPasswordAPI(email, otp, newPassword);
      return res.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to reset password');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'admin/update',
  async (data, thunkAPI) => {
    try {
      const res = await updateProfileAPI(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

// === AUTH SLICE ===

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    admin: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    success: null,
    otpStep: 1,
    otpMessage: '',
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.admin = null;
      state.isAuthenticated = false;
    },
    clearAuthMessages: (state) => {
      state.error = null;
      state.success = null;
      state.otpMessage = '';
    },
    resetOtpFlow: (state) => {
      state.otpStep = 1;
      state.otpMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOAD USER
      .addCase(loadUserFromStorage.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload;
      })
      .addCase(loadUserFromStorage.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // SEND OTP
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpMessage = action.payload;
        state.otpStep = 2;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // VERIFY OTP
      .addCase(verifyOtp.pending,(state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpMessage = action.payload;
        state.otpStep = 3;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // RESET PASSWORD
      .addCase(resetPassword.pending,(state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
       state.loading = false;
        state.success = action.payload;
        state.otpStep = 1;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PROFILE
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.user;
        state.success = action.payload.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthMessages, resetOtpFlow } = authSlice.actions;
export default authSlice.reducer;
