const { getUser } = require("./authMiddleware");

const checkAuth = async(req ,res , next)=>{
    const token  = req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({message:"Unauthorized"});
    }

    try{
       
        const user = await getUser(token);
        req.user = user;
        next();
    }catch(error){
        res.status(401).json({message:'Invalid token'});
    }
};

module.exports=checkAuth;