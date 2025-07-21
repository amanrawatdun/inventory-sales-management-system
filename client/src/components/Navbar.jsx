import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { IoMenu, IoClose } from 'react-icons/io5';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
   
    <header className="fixed top-0 z-50 bg-gray-900 p-4  shadow-md w-full">
      <div className="flex items-center justify-between">
 
        <button 
          onClick={toggleSidebar} 
          className="text-2xl text-gray-300 md:hidden p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
          {isSidebarOpen ? <IoClose /> : <IoMenu />}
        </button>

       
        <div className="flex-none">
          <h1 className="text-xl sm:text-2xl font-bold text-white text-left">
            <span className="text-blue-400">InventoryPro</span> 
          </h1>
        </div>

        
        <button
          onClick={onLogout}
          className="hidden md:flex items-center gap-2 bg-red-600 text-white font-medium px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
        >
          <FaSignOutAlt />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;