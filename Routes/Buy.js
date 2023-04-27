
const Products=require('../model/product')

async function buy(req, res) {
  try{
  const products = await Products.find();
  res.status(200).send(products);
}catch(err){
  res.status(400).send(err.message);
}
};

module.exports = { buy };