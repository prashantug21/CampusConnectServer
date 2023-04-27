const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "campusconnet2@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const otpRequests = require("../model/otpRequests");

async function sendOTP(req, res) {
   try {
  const data = req.body.email;
  const otp = Math.floor(1000 + Math.random() * 9000);
  const lastRequest = await otpRequests.findOne({ email: data });
  await otpRequests.deleteMany({ email: data });
  await otpRequests.create({
    email: data,
    OTP: otp,
    createdAt: new Date(),
    expireAt: new Date(new Date().getTime() +  (10*60*1000)),
  });

    await transporter.sendMail({
      from: "campusconnet2@gmail.com",
      to: data,
      subject: "OTP Campus Connect",
      html: "<h1>Your OTP for Campus Connect is "+  otp + "</h1>"
    })
  res.json({ message: "OTP sent" });
    } catch (err) {
      res.status(400).json({ message: "error" });
   }
}

module.exports = { sendOTP };
