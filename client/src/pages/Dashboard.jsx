import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Card from '../components/Card';
import {
  FaHandHoldingUsd,
  FaBox,
  FaChartLine,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
  FaTag,
} from 'react-icons/fa';
import { FaMoneyBillTrendUp    } from "react-icons/fa6";

import { getDashboardSummary } from '../features/dashboard/dashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    totalProducts,
    totalSales,
    totalRevenue,
    totalProfit,
    outOfStockCount,
    outOfStockProducts,
    highestSaleProduct,
    lowStockProducts,
    loading,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardSummary());
  }, [dispatch]);

  return (
    <div className="space-y-10 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <Card
          title="Total Products"
          value={totalProducts}
          icon={<FaBox className="text-2xl" />}
          gradientColor="from-blue-600 to-cyan-400"
        />
        <Card
          title="Total Sales"
          value={totalSales}
          icon={<FaChartLine className="text-2xl" />}
          gradientColor="from-green-600 to-green-400"
        />
        <Card
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon={<FaMoneyBillTrendUp className="text-2xl" />}
          gradientColor="from-purple-600 to-indigo-400"
        />
        <Card
          title="Total Profit"
          value={loading ? '...' : `₹${totalProfit.toLocaleString()}`}
          icon={<FaHandHoldingUsd className="text-2xl" />}
          gradientColor="from-yellow-500 to-orange-400"
        />
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
          <div className="flex items-center justify-between mb-4">
            
            <h3 className="text-gray-800 text-sm font-bold tracking-wide">Out of Stock Products</h3>
            <FaExclamationTriangle className="text-xl text-red-600" />
          </div>
          {outOfStockProducts && outOfStockProducts.length > 0 ? (
            <ul className="text-gray-900 text-sm space-y-2">
              {outOfStockProducts.map((product, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <FaTag className="text-gray-500 text-xs" />
                  <span>{product.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No out of stock items 🎉</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
          <div className="flex items-center justify-between mb-4">
          
            <h3 className="text-gray-800 text-sm font-bold tracking-wide">
              Highest Selling Product
            </h3>
            <FaArrowUp className="text-xl text-emerald-600" />
          </div>
          {highestSaleProduct ? (
            <div className="text-gray-900 text-sm space-y-2">
              <p><span className="font-semibold text-gray-700">Name:</span> {highestSaleProduct.name}</p>
              <p><span className="font-semibold text-gray-700">Category:</span> {highestSaleProduct.category || 'N/A'}</p>
              <p><span className="font-semibold text-gray-700">Units Sold:</span> {highestSaleProduct.totalSold}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No sales data available</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
          <div className="flex  justify-between  ">
          
            <h3 className="text-gray-800 text-sm font-bold tracking-wide mb-4">
              Low Stock Products
            </h3>
            <FaArrowDown className="text-xl text-red-600" />
            
          </div>
          {lowStockProducts && lowStockProducts.length > 0 ? (
            <ul className="text-gray-900 text-sm space-y-2">
              {lowStockProducts.map((product, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <FaTag className="text-gray-500 text-xs" />
                  <span>{product.name} – <span className="text-red-600 font-semibold">{product.quantity} left</span></span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No low stock items 🎉</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;