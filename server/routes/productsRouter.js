const express = require('express');

const checkAuth = require('../middleware/checkAuth');
const multer = require('../middleware/multer'); // using multer.js
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productsController');

const router = express.Router();

// Protect all routes
router.use(checkAuth);

// Routes
router.post('/', multer.single('image'), createProduct);
router.get('/allproduct', getAllProducts);
router.patch('/updateproduct/:id', multer.single('image'), updateProduct);
router.delete('/deleteproduct/:id', deleteProduct);

module.exports = router;
