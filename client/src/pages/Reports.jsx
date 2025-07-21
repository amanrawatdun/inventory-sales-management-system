import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSales } from '../features/sales/salesSlice';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Table from '../components/Table'; // Reusable component

const Reports = () => {
  const dispatch = useDispatch();
  const { sales, loading } = useSelector((state) => state.sales);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  // Filtered sales
  const filteredSales = sales.filter((sale) => {
    const date = new Date(sale.date);
    return (
      (!startDate || new Date(startDate) <= date) &&
      (!endDate || new Date(endDate) >= date)
    );
  });

  const columns = ['Product', 'Quantity', 'Revenue', 'Date'];
  const rows = filteredSales.map((s) => [
    s.productSnapshot?.name || '-',
    s.quantitySold,
    `₹${s.quantitySold * (s.productSnapshot?.price || 0)}`,
    new Date(s.date).toLocaleDateString(),
  ]);

  const handleExportCSV = () => {
    const csvContent = [columns, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, 'sales_report.csv');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Sales Report', 14, 10);
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });
    doc.save('sales_report.pdf');
  };

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold text-gray-800">📈 Sales Reports</h2>

      {/* Date Filters */}
      <div className="flex flex-wrap gap-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">End Date</label>
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleExportCSV}
          className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-green-700 transition"
        >
          ⬇️ Export CSV
        </button>
        <button
          onClick={handleExportPDF}
          className="bg-purple-600 text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-purple-700 transition"
        >
          📄 Export PDF
        </button>
      </div>

      {/* Reusable Table */}
      {loading ? (
        <p className="text-gray-500 text-center mt-6">Loading sales data...</p>
      ) : (
        <div className="bg-white p-4 rounded-xl shadow-md border">
          <Table columns={columns} rows={rows} showIndex />
        </div>
      )}
    </div>
  );
};

export default Reports;
