const nodemailer = require("nodemailer");
const { readFileSync } = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGO_URI || "mongodb://localhost:27017/express-db";


function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER || "lisanalhaque@gmail.com",
    pass: process.env.GMAIL_PASS || "srbe mcqr hbsf dzay",
  },
});

// Connect to MongoDB
async function connectDB() {
  if (mongoURL) {
    try {
      await mongoose.connect(mongoURL);
      console.log("✅ Connected to MongoDB");
    } catch (error) {
      console.warn("⚠️  MongoDB connection warning (optional):", error.message);
    }
  }
}

async function sendOTPEmail() {
  try {
    const otp = generateOTP();

    const htmlPath = path.join(__dirname, "mail.html");
    let htmlContent = readFileSync(htmlPath, "utf-8");

    htmlContent = htmlContent.replace("{{OTP}}", otp);

    const result = await transport.sendMail({
      from: process.env.GMAIL_USER || "lisanalhaque@gmail.com",
      to: process.env.GMAIL_RECIPIENT || "lisanop4444@gmail.com",
      subject: "Your OTP Code",
      html: htmlContent,
    });

    console.log("✅ OTP Email sent successfully");
    console.log("🔐 OTP:", otp);
  } catch (error) {
    console.warn("⚠️  Email sending warning:", error.message);
  }
}

// Run directly
(async () => {
  try {
    await connectDB();
    await sendOTPEmail();
  } catch (error) {
    console.error("Fatal error:", error);
  } finally {
    process.exit(0);
  }
})();
