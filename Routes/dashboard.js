const User=require('../model/userModel');
const Product=require('../model/product');
const jwt=require('jsonwebtoken');
const secretKey=process.env.JWT_SECRET_KEY

async function dashboard(req,res){
  try{
    const token=req.headers.authorization.split(' ')[1];
     jwt.verify(token, secretKey,async function(err, decoded) {
        if (err) {
          return res.status(400).json({ message: 'Invalid token' }); // Return an error if the token is invalid
        } else {
          const user= await User.findOne({_id:decoded._id})
          if(!user){
            return res.status(400).json({message:'Invalid token'})
          }else{
            const products=await Product.find({email:user.email})
            return res.status(200).json({ message: 'Success','username':user.username,'email':user.email,'products':products});
          }
        }
    })
  }catch(err){
    return res.status(400).json({message:err.message})
  }
}

module.exports={dashboard}