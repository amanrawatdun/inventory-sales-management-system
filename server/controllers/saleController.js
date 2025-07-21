const Sale = require('../models/Sale');
const Product = require('../models/Product');

exports.createSale = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { productId, quantitySold } = req.body;

    const product = await Product.findOne({ _id: productId, createdBy: adminId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    if (quantitySold > product.stock) {
      return res.status(400).json({ message: 'Quantity exceeds stock' });
    }

    const sale = new Sale({
      productId,
      productSnapshot: {
        name: product.name,
        price: product.price,
        costPrice:product.costPrice,
        category: product.category,
      },
      quantitySold,
      createdBy: adminId,
    });

    product.stock -= quantitySold;
    await product.save();
    await sale.save();

    res.status(201).json({ message: 'Sale recorded', sale });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllSales = async (req, res) => {
  try {
    const adminId = req.user.id;
    const sales = await Sale.find({ createdBy: adminId }).sort({ date: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
