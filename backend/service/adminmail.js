require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const adminmail = async (req, res) => {
  try {
    const user = req.user;

    await resend.emails.send({
      from: "Quizmaster <onboarding@resend.dev>", 
      to: process.env.EMAIL,
      subject: "New Transaction Request",
      html: `
        <h2>💳 New Payment Request</h2>

        <p><strong>User Email:</strong> ${user.email}</p>

        <p><strong>Transaction ID:</strong> ${user.transactionId}</p>

        <p>
          ⏱️ Please verify the payment and activate the user's plan.
        </p>
      `,
    });

    return res.json({
      success: true,
      message:
        "Transaction received. Your plan will be activated after verification (within 24 hours).",
    });
  } catch (error) {
    console.error("Resend Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send admin email",
    });
  }
};

module.exports = { adminmail };