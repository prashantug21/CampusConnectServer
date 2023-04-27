const mongoose =require("mongoose") 

const User =new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:false
    },
    OTP:{
        type:Number,
        required:true
    },
    createdAt: Date,
    expireAt: Date,
},{
    collection:'RequestedOTPS'
})


const UserModelVerify=mongoose.model('UserDataVerify',User)

module.exports=UserModelVerify;