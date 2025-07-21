const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const { createSale, getAllSales } = require('../controllers/saleController');
const router = express.Router();


router.post('/',checkAuth , createSale);
router.get('/',checkAuth , getAllSales);

module.exports = router;