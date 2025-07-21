import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerAdmin } from '../features/auth/authSlice';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [localError, setLocalError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error: reduxError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (reduxError) {
      setLocalError(reduxError);
    }
    if (loading) {
      setLocalError(null);
    }
  }, [reduxError, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    const resultAction = await dispatch(registerAdmin({ name, email, password, phone }));

    if (registerAdmin.fulfilled.match(resultAction)) {
      navigate('/');
    } else {
      console.error('Registration failed:', resultAction.payload || 'An unknown error occurred.');
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setLocalError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4 sm:p-6 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm border border-gray-200">
        {/* Custom Text Logo - more visually appealing */}
        <div className="flex items-center justify-center mb-8">
          <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">
            InventoryPro
          </span>
        </div>

        {/* Signup Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h2>

        <form onSubmit={handleSubmit}>
          {/* Name Input Field */}
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="Your Full Name"
              value={name}
              onChange={handleInputChange(setName)}
              required
            />
          </div>

          {/* Email Input Field */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="your.email@example.com"
              value={email}
              onChange={handleInputChange(setEmail)}
              required
              autoComplete="email"
            />
          </div>

          {/* Password Input Field */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="Create a strong password"
              value={password}
              onChange={handleInputChange(setPassword)}
              required
              autoComplete="new-password"
            />
          </div>

          {/* Phone Input Field */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="e.g., +91 1234567890"
              value={phone}
              onChange={handleInputChange(setPhone)}
              autoComplete="tel"
            />
          </div>

          {/* Error Display */}
          {localError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-6 text-sm animate-fade-in" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline ml-2">{localError}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm mt-8">
          Already have an account?{' '}
          <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition duration-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;