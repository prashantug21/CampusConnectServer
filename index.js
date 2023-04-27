const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;
const database = process.env.DATABASE_URL;

mongoose
  .connect(database)
  .then(async () => {
     console.log("Connected to DB");
  })
  .catch(async (err) => {
     console.log(err);
  });


app.use(cors({
  credentials: true,
}
));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit:'50mb'}));


const sendOTP=require('./Routes/sendOTP');
const signUP=require('./Routes/SignUp');
const home=require('./Routes/Home');
const buy=require('./Routes/Buy');
const sell=require('./Routes/Sell');
const login=require('./Routes/Login')
const dashboard=require('./Routes/dashboard')
const deleteProduct=require('./Routes/deleteProduct')


const otpRequests=require('./model/otpRequests')

app.post("/sendOTP",sendOTP.sendOTP);
app.post("/SignUP",signUP.signUP);
app.post("/login",login.login)
app.get("/home",home.home);
app.get("/buy",buy.buy);
app.post("/sell",sell.sell);
app.get("/dashboard",dashboard.dashboard)
app.delete("/deleteProduct/:itemid",deleteProduct)


app.listen(port, () => {
  console.log(`Example router listening on port ${port}`);
});

