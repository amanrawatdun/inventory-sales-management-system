const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email:{type:String , require:true},
    otp:{type:String , require:true},
    createdAt:{type:Date ,default:Date.now , expire:300},
});

const Otp = mongoose.model('otp', otpSchema);

module.exports=Otp;