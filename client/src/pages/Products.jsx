import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../features/product/productSlice';
import { FaEdit, FaTrashAlt, FaPlus, FaTimes, FaSearch, FaBoxOpen } from 'react-icons/fa'; 

const Products = () => {
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    costPrice: '',
    stock: '',
    image: null,
  });
  const [editId, setEditId] = useState(null);

  const imgurl = 'http://localhost:5000';

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form) {
      if (key === 'image' && !form.image) continue;
      formData.append(key, form[key]);
    }

    if (editId) {
      dispatch(updateProduct({ id: editId, data: formData }));
    } else {
      dispatch(createProduct(formData));
    }

    setEditId(null);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      costPrice: product.costPrice,
      stock: product.stock,
      image: null,
    });
    setEditId(product._id);
    setIsModalOpen(true);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      price: '',
      category: '',
      costPrice: '',
      stock: '',
      image: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 p-4 sm:p-6 lg:p-8">
      {/* Top Bar with Search and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 pl-10 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <button
          onClick={() => {
            setIsModalOpen(true);
            resetForm();
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          <FaPlus />
          Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Product List</h2>
        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div key={p._id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between border border-gray-200">
                <div className="relative">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-48 object-cover transition duration-300 transform hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                      <FaBoxOpen size={48} />
                      <p className="mt-2 text-sm">Image not available</p>
                    </div>
                  )}
                  <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    p.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    Stock: {p.stock}
                  </span>
                </div>
                
                <div className="p-4 space-y-2 flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 leading-tight truncate">{p.name}</h3>
                  <p className="text-gray-500 text-sm">Category: {p.category}</p>
                  
                  <div className="flex items-center justify-between text-base pt-2 border-t border-gray-100 mt-2">
                    <div className="flex flex-col">
                      <p className="text-gray-500 text-sm">Selling Price</p>
                      <p className="font-extrabold text-xl text-green-700">
                        ₹{p.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-gray-500 text-sm">Cost Price</p>
                      <p className="text-base font-semibold text-gray-700">
                        ₹{p.costPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                </div>
                
                <div className="p-4 bg-gray-50 flex gap-2 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex-1 inline-flex items-center justify-center gap-1 p-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                  >
                    <FaEdit />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 inline-flex items-center justify-center gap-1 p-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
                  >
                    <FaTrashAlt />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => {
            setIsModalOpen(false);
            setEditId(null);
            resetForm();
          }}
        >
          <div 
            className="bg-white p-8 rounded-xl w-full max-w-lg shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditId(null);
                resetForm();
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            >
              <FaTimes size={20} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{editId ? 'Edit Product' : 'Add Product'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Selling Price"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
              <input
                type="number"
                name="costPrice"
                value={form.costPrice}
                onChange={handleChange}
                placeholder="Cost Price"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Stock Quantity"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept="image/*"
                ref={fileInputRef}
              />

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsModalOpen(false);
                    setEditId(null);
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                >
                  {editId ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;