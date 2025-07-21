import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserEdit, FaSave, FaKey } from 'react-icons/fa';
import { updateProfile, clearAuthMessages } from '../features/auth/authSlice';
import { ImSpinner2 } from 'react-icons/im';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { admin, loading, error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [updated, setUpdated] = useState(false);
  const [localError, setLocalError] = useState('');

  
  useEffect(() => {
    if (admin) {
      setFormData((prev) => ({
        ...prev,
        name: admin.name || '',
        email: admin.email || '',
        phone: admin.phone || '',
      }));
    }
    dispatch(clearAuthMessages());
  }, [admin, dispatch]);

  
  useEffect(() => {
    if (success) {
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }));
      setUpdated(true);
      setLocalError('');
      setTimeout(() => setUpdated(false), 3000);
    }
  }, [success]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      setLocalError('New password and confirm password do not match.');
      return;
    }

    setLocalError('');

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    if (formData.currentPassword) {
      userData.currentPassword = formData.currentPassword;
      if (formData.newPassword) {
        userData.newPassword = formData.newPassword;
      }
    }

    dispatch(updateProfile(userData));
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
        <FaUserEdit className="text-blue-600" /> Update Profile
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Your Information</h2>

       
        {updated && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-6 text-sm">
            <strong className="font-bold">Success!</strong>
            <span className="ml-2">{success}</span>
          </div>
        )}

       
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6 text-sm">
            <strong className="font-bold">Error!</strong>
            <span className="ml-2">{error}</span>
          </div>
        )}

      
        {localError && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-md mb-6 text-sm">
            <strong className="font-bold">Warning!</strong>
            <span className="ml-2">{localError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
         
          {['name', 'email', 'phone'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-gray-700 text-sm font-semibold mb-2 capitalize">
                {field === 'email' ? 'Email Address' : field === 'phone' ? 'Phone Number' : 'Name'}
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                placeholder={`Your ${field}`}
                required={field !== 'phone'}
              />
            </div>
          ))}

       
          <div className="pt-6 border-t border-gray-200 mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaKey className="text-gray-600 text-lg" /> Change Password (Optional)
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              To change your password, please enter your current password below.
            </p>

            {['currentPassword', 'newPassword', 'confirmNewPassword'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-gray-700 text-sm font-semibold mb-2 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="password"
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                  autoComplete="new-password"
                />
              </div>
            ))}
          </div>

        
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? <ImSpinner2 className="animate-spin" /> : <><FaSave /> Save Changes</>}
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default UpdateProfile;
