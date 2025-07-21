import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { loginAdmin } from '../features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
const location = useLocation();
const from = location.state?.from?.pathname || '/dashboard';

useEffect(() => {
  if (isAuthenticated) {
    navigate(from);  
  }
}, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(loginAdmin({ email, password }));

    if (loginAdmin.rejected.match(resultAction)) {
      console.error('Login failed:', resultAction.payload || 'An unknown error occurred.');
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4 sm:p-6 font-sans">
      
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm border border-gray-200">
        
        <div className="flex items-center justify-center mb-8">
          <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">
            InventoryPro
          </span>
        </div>

        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back!</h2>

        <form onSubmit={handleSubmit}>

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
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>


          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
       
            <Link to="/forgot-password" className="block text-right text-blue-600 hover:text-blue-800 hover:underline text-sm mt-2 transition duration-200">
              Forgot Password?
            </Link>
          </div>

 
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error && (
            <p className="text-red-600 bg-red-100 border border-red-300 p-3 rounded-md text-center text-sm mt-6 animate-fade-in">
              {error}
            </p>
          )}
        </form>

        
        <p className="text-center text-gray-600 text-sm mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition duration-200">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;