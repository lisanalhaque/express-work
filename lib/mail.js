const nodemailer = require("nodemailer");
const { readFileSync } = require("fs");
const path = require("path");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lisanalhaque@gmail.com",
    pass: "srbe mcqr hbsf dzay",
  },
});

async function sendOTPEmail() {
  try {
    const otp = generateOTP();

    const htmlPath = path.join(__dirname, "mail.html");
    let htmlContent = readFileSync(htmlPath, "utf-8");

    htmlContent = htmlContent.replace("{{OTP}}", otp);

    const result = await transport.sendMail({
      from: "lisanalhaque@gmail.com",
      to: "lisanop4444@gmail.com",
      subject: "Your OTP Code",
      html: htmlContent,
    });

    console.log("✅ OTP Email sent successfully");
    console.log("🔐 OTP:", otp);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
  }
}

// Run directly
sendOTPEmail();