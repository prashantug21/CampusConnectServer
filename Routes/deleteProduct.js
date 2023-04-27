const jwt = require('jsonwebtoken');

const secretKey =process.env.JWT_SECRET_KEY;

const User = require('../model/userModel');
const Product = require('../model/product');

async function deleteProduct(req,res){
    const token=req.headers.authorization.split(' ')[1];
     jwt.verify(token, secretKey,async function(err, decoded) {
        if (err) {
          return res.json({ message: 'Invalid token' }); // Return an error if the token is invalid
        } else {
          const user= await User.findOne({_id:decoded._id})
          if(!user){
            return res.json({message:'Invalid token'})
          }
            const itemid=req.params.itemid.replace(':','')
            const product=await Product.findOne({_id:itemid})
            if(product.email!=user.email){
                return res.status().json
            }
            await Product.deleteOne({_id:itemid})
            return res.json({ message: 'Product deleted'});
        }
    });
    // res.send("done")
}

module.exports=deleteProduct;