const jwt = require('jsonwebtoken');

const setUser=async(admin)=>{
    const token = jwt.sign({id:admin._id , email:admin.email},
        process.env.JWT_SECRET,
        {expiresIn:'2h'}
    )
    return token;
}

const getUser=async(token)=>{
    const user = jwt.verify(token ,process.env.JWT_SECRET);
    return user;
}

module.exports ={
    getUser , setUser
}