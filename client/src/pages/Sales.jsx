import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSale, fetchSales } from '../features/sales/salesSlice';
import { fetchProducts } from '../features/product/productSlice';
import { formatDate } from '../utils/formatDate';
import { FaPlusCircle, FaHistory } from 'react-icons/fa';

const Sales = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { sales, loading, error } = useSelector((state) => state.sales);

  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchSales());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId || !quantity) return;

    // Optional: Add client-side validation for quantity against product stock
    const selectedProduct = products.find(p => p._id === productId);
    if (selectedProduct && Number(quantity) > selectedProduct.stock) {
      alert('Quantity sold cannot exceed current stock!'); // Replace with a custom modal/toast
      return;
    }

    dispatch(createSale({ productId, quantitySold: Number(quantity) }));
    setProductId('');
    setQuantity('');
  };

  return (
    <div className="space-y-10 p-4 sm:p-6 lg:p-8">
      {/* Sale Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaPlusCircle className="text-green-600" /> Record a Sale
        </h2>

        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          required
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name} (Stock: {product.stock})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity Sold"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          required
          min="1" 
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md"
        >
          Submit Sale
        </button>
      </form>

      {/* Sales Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaHistory className="text-blue-600" /> Sales History
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading sales data...</p>
        ) : error ? (
          <p className="text-center text-red-600 py-8">Error: {error}</p>
        ) : sales.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No sales recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                  <th className="p-4 rounded-tl-xl">Product</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Revenue</th>
                  <th className="p-4 rounded-tr-xl">Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale._id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition duration-200">
                    <td className="p-4">{sale.productSnapshot?.name || 'N/A'}</td>
                    <td className="p-4">{sale.quantitySold}</td>
                    <td className="p-4">
                      ₹{(sale.productSnapshot?.price * sale.quantitySold).toLocaleString()}
                    </td>
                    <td className="p-4">{formatDate(sale.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;