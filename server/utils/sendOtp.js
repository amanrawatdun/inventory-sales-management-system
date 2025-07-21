const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`, // ✅ FIXED: Added missing closing angle bracket
    to: email,
    subject: 'Your OTP Code',
    html: `<h2>Your OTP is: ${otp}</h2><p>It will expire in 5 minutes.</p>`, // ✅ FIXED: Closed <p> tag
  });
};

module.exports = sendOtpEmail;
