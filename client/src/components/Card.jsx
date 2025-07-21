import React from 'react';

const Card = ({ title, value, icon, gradientColor = 'from-blue-600 to-blue-400' }) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      <div>
        <p className="text-gray-600 text-[17px] font-bold ">{title}</p>
        <h2 className="text-2xl font-bold text-gray-900 mt-1">{value}</h2>
      </div>
      <div className={`ml-4 w-12 h-12 flex items-center justify-center rounded-full text-white bg-gradient-to-r ${gradientColor}`}>
        {icon}
      </div>
    </div>
  );
};

export default Card;