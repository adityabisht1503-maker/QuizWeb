require("dotenv").config();

const nodemailer =   require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });


 const sendVerificationEmail = async (email, otp) => {

  // const link = `http://localhost:${process.env.PORT}/verify/${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Verify your email",
    // html: `<p>Click to verify your email:</p>  
    //        <a href="${link}">Verify Email</a>`
         html: `
      <h2 style="color:#1f2937;">🔐 Quizmaster Account Verification</h2>

<p>Hello,</p>

<p>
  We received a request to verify your account on <strong>Quizmaster</strong>.
  Please use the One-Time Password (OTP) below to continue:
</p>

<h1 style="letter-spacing:4px; color:#2563eb;">
  ${otp}
</h1>

<p>
  ⏱️ This OTP is valid for <strong>10 minutes</strong>.
</p>

<p style="color:#6b7280; font-size:14px;">
  If you didn’t request this, you can safely ignore this email.
</p>

<hr />

<p style="font-size:14px; color:#9ca3af;">
  Regards,<br />
  <strong>Quizmaster Team</strong>
</p>

    `   
  });
    
};


module.exports = {sendVerificationEmail}