const { setUser } = require('../middleware/authMiddleware');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const Otp = require('../models/Otp');
const sendOtpEmail = require('../utils/sendOtp');


const registerAdmin = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists with this email' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const admin = new Admin({ name, email, password:hashPassword, phone });
        await admin.save();

        return res.status(201).json({ message: 'Admin registered successfully', admin });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = await setUser(admin)



        res.cookie('token', token);

        res.status(200).json({
            message: 'Login successful',
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                phone: admin.phone
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateprofile = async(req ,res)=>{
     try {
    const adminId = req.user.id; // Assuming auth middleware sets req.user
    const { name, email, phone, currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // If changing password, verify currentPassword first
    if (currentPassword) {
      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      if (newPassword) {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(newPassword, salt);
      }
    }

    // Update other fields
    if (name) admin.name = name;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;

    await admin.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
      },
    });
  } catch (err) {
    console.error('Update Profile Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
}

const getCurrentUser = async(req ,res)=>{
    const adminId = req.user.id;
    try{
        const admin = await Admin.findById(adminId).select('-password')
        return res.status(200).json({admin})
    }catch(error){
        return res.json({message:'Invalid User'})
    }
}

const sendOtp = async(req ,res)=>{
  const {email}=req.body;
 
  const otp=Math.floor(100000 + Math.random()*900000).toString();

  try {
    await Otp.deleteMany({email});
    await new Otp({email , otp}).save();
    await sendOtpEmail(email , otp);
    res.json({message:'OTP sent successfully'});
  } catch (error) { 
    res.status(500).json({message:'Failed to send OTP'});
  }

}

const verifyOtp=async(req ,res)=>{
  const {email , otp}=req.body;
  const validOtp = await Otp.findOne({email,otp});

  if(!validOtp){
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }
  res.json({message:"OTP verified successfully"});
}

const resetPassword=async(req ,res)=>{
  const {email ,otp , newPassword}=req.body;
   if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const existingOtp=await Otp.findOne({email});

    if (!existingOtp || existingOtp.otp !== otp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const admin = await Admin.findOne({email});

    if(!admin){
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword ,10);

    admin.password=hashedPassword;
    await admin.save();

    await Otp.deleteMany({ email });

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

}
 


module.exports = {
    registerAdmin,
    loginAdmin,
    updateprofile,
    getCurrentUser,
    sendOtp,
    verifyOtp,
    resetPassword
};