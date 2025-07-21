const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
    productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantitySold: {
    type: Number,
    required: true,
  },
   productSnapshot: {
    name: String,
    price: Number,
    costPrice:Number,
    category: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Sale = mongoose.model('sale', saleSchema);

module.exports = Sale;