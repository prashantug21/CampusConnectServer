const jwt=require('jsonwebtoken');

const secretKey=process.env.JWT_SECRET_KEY;

const User=require('../model/userModel');
const otpRequests=require('../model/otpRequests');

async function login(req,res){
//     try{
    console.log(1)
        const {email,otp}=req.body;
        const user=await User.findOne({email:email});
        const sentOTP = await otpRequests.findOne({email:email});
        const emailreg=/^[A-Za-z0-9._%+-]+@nitp\.ac\.in$/
        if(!emailreg.test(email)){
          return res.status(400).json({message:'Invalid email'})
        }
        if(!user){
            return res.status(400).json({message:'User not found'});
        }
        if(!sentOTP){
            return res.status(400).json({message:'Request Time out'});
        }
        if(sentOTP.OTP!=otp){
            return res.status(400).json({message:'Invalid OTP'});
        }
    console.log(2)
        const token=jwt.sign({_id:user._id},secretKey,{expiresIn:'30d'});
        res.header('Access-Control-Allow-Origin', 'hhttps://campusconnect1.netlify.app/');
        res.header('Access-Control-Allow-Credentials', true);
        res.cookie('jwtToken', token, {
            path:'/',
            httpOnly:true,
            sameSite:'none',
            secure:true,
            maxAge: 30*24*3600000
          }).status(201).json({message:"Login Successful","username":user.username});
          await otpRequests.deleteOne({email:email})
//     }catch(e){
//         return res.status(400).json({message:'Some Error has occured'});
//     }
    
}

module.exports={login};
