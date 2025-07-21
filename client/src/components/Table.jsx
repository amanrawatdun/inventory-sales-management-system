import React from 'react';

const Table = ({ columns, rows, showIndex = false }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            {showIndex && <th className="p-2">#</th>}
            {columns.map((col, i) => (
              <th key={i} className="p-2">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50">
              {showIndex && <td className="p-2 font-medium">{rowIndex + 1}</td>}
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-2">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
