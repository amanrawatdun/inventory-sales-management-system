const express = require('express');
const { registerAdmin, loginAdmin, updateprofile, getCurrentUser, sendOtp, verifyOtp, resetPassword } = require('../controllers/authController');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router.post('/admin/register',registerAdmin);
router.post('/admin/login',loginAdmin)
router.patch('/admin/updateprofile',checkAuth ,updateprofile );
router.get('/admin/me' , checkAuth , getCurrentUser);

router.post('/admin/forgot-password', sendOtp);
router.post('/admin/verify-otp' , verifyOtp)
router.post('/admin/reset-password',resetPassword)
module.exports = router; 