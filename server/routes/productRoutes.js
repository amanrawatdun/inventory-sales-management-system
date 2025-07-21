const express = require('express');
const {createProduct , deleteProduct , updateProduct , getAllProducts} = require('../controllers/productController');
const checkAuth = require('../middleware/checkAuth');
const upload = require('../middleware/upload');

const router = express.Router();

router.use(checkAuth)
router.post('/', upload.single('image') , createProduct);
router.get('/allproduct',getAllProducts)
router.patch('/updateproduct/:id' , upload.single('image') , updateProduct )
router.delete('/deleteproduct/:id',deleteProduct)

module.exports = router;