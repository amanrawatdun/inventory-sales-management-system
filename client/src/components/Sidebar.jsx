import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBox, FaShoppingCart, FaChartBar, FaSignOutAlt , FaUserEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
  { name: 'Products', path: '/products', icon: <FaBox /> },
  { name: 'Sales', path: '/sales', icon: <FaShoppingCart /> },
  { name: 'Reports', path: '/reports', icon: <FaChartBar /> },
  {name:'UpdateProfile',path:'/updateProfile' , icon: <FaChartBar />}
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <aside
      className={`fixed flex flex-col justify-between w-64 text-white p-4 shadow-xl space-y-4 overflow-y-auto
      transform transition-transform duration-300 ease-in-out z-50
      top-[75px] bottom-0 bg-slate-900
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <div>
        <div className="border-b border-gray-700 pb-3 mb-4">
          <h2 className="text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Admin Panel
          </h2>
        </div>

        <nav className="flex-1">
          <ul className="flex flex-col gap-2">
            {navItems.map(({ name, path, icon }) => (
              <li key={name}>
                <NavLink
                  to={path}
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <span className="text-xl mr-3">{icon}</span>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div>
        <div className="flex md:hidden pt-4 mt-auto border-t border-slate-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-start px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition duration-200 text-base font-semibold shadow-md"
          >
            <FaSignOutAlt className="text-xl mr-3" />
            Logout
          </button>
        </div>

        <div className="pt-4 text-sm text-gray-500 text-center border-t border-slate-800">
          © 2025 InventoryPro. All rights reserved.
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
