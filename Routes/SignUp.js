const jwt = require('jsonwebtoken');

const otpRequests = require('../model/otpRequests');
const UserModel = require('../model/userModel');

const secretKey = process.env.JWT_SECRET_KEY;



async function signUP(req,res){
    try {
      const email=req.body.email;
      const otp=req.body.otp;
      const username=req.body.username;
      let user= await UserModel.findOne({email:email})
      const emailreg=/^[A-Za-z0-9._%+-]+@nitp\.ac\.in$/
        if(!emailreg.test(email)){
          return res.status(400).json({message:'Invalid email'})
        }
        if(user){
            return res.status(400).json({message:'User already exists'})
        }
        user= await UserModel.findOne({username:username})
        if(user){
          return res.status(400).json({message:'Username already exists'})
      }
        const sentOTP= await otpRequests.findOne({email:email})
        if(!sentOTP){
            return res.status(400).json({message:'Request time out'})
        }   
        if(sentOTP.OTP==otp && sentOTP.expireAt>new Date()){
          await UserModel.create({
            email:email,
            username:username
          })
          await otpRequests.deleteOne({email:email})
          user=await UserModel.findOne({email:email})
          const token = jwt.sign({_id:user._id},secretKey,{expiresIn:'30d'});
          res.cookie('jwtToken',token,{
            path:'/',
            maxAge: 30*24*60*60*1000,
          }).status(201).json({message:"Registration successful",username:user.username})
        }
    }catch(e){
      console.log(e)
      res.status(400).json({message:"Error"})
    }
 
}

module.exports= {signUP};