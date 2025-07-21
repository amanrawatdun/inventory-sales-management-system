const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  costPrice: Number,
  stock: Number,
  category: String,
  image: String, 
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Admin',
    required:true
  }
}, { timestamps: true });

const Product = mongoose.model('product', productSchema);

module.exports=Product;