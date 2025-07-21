import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  clearAuthMessages,
  resetPassword,
  sendOtp,
  verifyOtp,
} from '../features/auth/authSlice';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, otpStep, otpMessage, success } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    dispatch(clearAuthMessages());
  }, [dispatch]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    dispatch(sendOtp({ email }));
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ email, otp }));
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email, otp, newPassword }));
  };

  useEffect(() => {
    if (success ==='Password reset successfully') {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, otpStep, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4 sm:p-6 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm border border-gray-200">
        <div className="flex items-center justify-center mb-8">
          <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">
            InventoryPro
          </span>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Forgot Password?</h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your email to receive a verification code.
        </p>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-6 text-sm animate-fade-in">
            <strong className="font-bold">Success:</strong>
            <span className="ml-1">{success}</span>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6 text-sm animate-fade-in">
            <strong className="font-bold">Error:</strong>
            <span className="ml-1">{error}</span>
          </div>
        )}
        {otpMessage && (
          <p className="text-blue-600 bg-blue-50 p-3 rounded-lg text-sm mb-6 text-center animate-fade-in">
            {otpMessage}
          </p>
        )}

        {/* Step 1: Email Input */}
        {otpStep === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. you@example.com"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {/* Step 2: OTP Input */}
        {otpStep === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="number"
                id="otp"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {otpStep === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Create a new password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        <p className="text-center text-gray-600 text-sm mt-8">
          Remember your password?{' '}
          <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
