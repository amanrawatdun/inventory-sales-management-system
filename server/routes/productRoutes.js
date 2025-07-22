const express = require('express');
const {createProduct , deleteProduct , updateProduct , getAllProducts} = require('../controllers/productController');
const checkAuth = require('../middleware/checkAuth');
const upload = require('../middleware/upload');

const router = express.Router();

router.use(checkAuth)
router.post('/rest/', upload.single('image') , createProduct);
router.get('/rest/allproduct',getAllProducts)
router.patch('/rest/updateproduct/:id' , upload.single('image') , updateProduct )
router.delete('/rest/deleteproduct/:id',deleteProduct)

module.exports = router;