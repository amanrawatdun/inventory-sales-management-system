const fs = require('fs');
const path = require('path');
const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { name, price, category, costPrice, stock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Name and Price are required' });
    }

    const product = new Product({
      name,
      price,
      category,
      costPrice,
      stock,
      createdBy: adminId,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const adminId = req.user.id;
    const products = await Product.find({ createdBy: adminId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const updateProduct = async (req, res) => {
  
  try {
    const adminId = req.user.id;
    const product = await Product.findOne({ _id: req.params.id, createdBy: adminId });


    if (!product) return res.status(404).json({ message: 'Product not found or unauthorized' });

    const { name, price, category, costPrice, stock } = req.body;

    if (name) product.name = name;
    if (price) product.price = price;
    if (category) product.category = category;
    if (costPrice) product.costPrice = costPrice;
    if (stock) product.stock = stock;

    if (req.file) {
      if (product.image) {
        const oldPath = path.join(__dirname, '..', product.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      product.image = `/uploads/${req.file.filename}`;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.log('error')
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const adminId = req.user.id;
    const product = await Product.findOneAndDelete({ _id: req.params.id, createdBy: adminId });

    if (!product) return res.status(404).json({ message: 'Product not found or unauthorized' });

    if (product.image) {
      const filePath = path.join(__dirname, '..', product.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
};
