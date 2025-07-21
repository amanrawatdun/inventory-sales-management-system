const  express = require('express');

const checkAuth  = require('../middleware/checkAuth');
const getDashboardSummary = require('../controllers/dashboardController');

const router = express.Router();

router.get('/summary' , checkAuth  , getDashboardSummary)

module.exports = router;