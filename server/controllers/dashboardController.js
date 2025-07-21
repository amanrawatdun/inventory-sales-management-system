const Product = require("../models/Product");
const Sale = require("../models/Sale");
const mongoose = require('mongoose')

const getDashboardSummary = async (req, res) => {
  try {
    const adminId = req.user.id; 

    const [totalProducts, totalSalesCount, totalSalesRevenue, allSales] = await Promise.all([
  Product.countDocuments({ createdBy: adminId }),
  Sale.countDocuments({ createdBy: adminId }),
  Sale.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId(adminId) } 
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: {
            $multiply: ['$quantitySold', '$productSnapshot.price']
          }
        }
      }
    }
  ]),
  Sale.find({ createdBy: adminId })
]);


   

    const totalRevenue = totalSalesRevenue[0]?.totalRevenue || 0;

    const totalProfit = allSales.reduce((acc, sale) => {
      const profitPerSale = (sale.productSnapshot.price - (sale.productSnapshot.costPrice || 0)) * sale.quantitySold;
      return acc + profitPerSale;
    }, 0);

    const products = await Product.find({ createdBy: adminId });

    const outOfStockProducts = products.filter(p => p.stock === 0);
    const lowStockProducts = products.filter(p => p.stock > 0 && p.stock < 5);

   
   const salesAggregation = await Sale.aggregate([
  {
    $match: {
      createdBy: new mongoose.Types.ObjectId(adminId), 
    },
  },
  {
    $group: {
      _id: '$productId',
      name: { $first: '$productSnapshot.name' },
      category: { $first: '$productSnapshot.category' }, 
      totalSold: { $sum: '$quantitySold' },
    },
  },
  { $sort: { totalSold: -1 } },
  { $limit: 1 },
]);

    

    const highestSaleProduct = salesAggregation[0] || null;

    res.status(200).json({
      totalProducts,
      totalSales: totalSalesCount,
      totalRevenue,
      totalProfit,
      outOfStockCount: outOfStockProducts.length,
      outOfStockProducts,
      lowStockProducts,
      highestSaleProduct
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard summary' });
  }
};

module.exports = getDashboardSummary;