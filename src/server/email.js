

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Email sending endpoint
app.post("/send-email", (req, res) => {
  const { inviteEmail } = req.body;

  // Check if email is provided
  if (!inviteEmail) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
              user: 'vaibhavning@gmail.com',
                   pass: 'ykkb izaa tepv kmna',
            },
  });

  const mailOptions = {
    from: "vaibhavning@gmail.com",
    to: inviteEmail,
    subject: "Invitation to Meeting",
    text: "You are invited to a meeting.",
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to send email" });
    }
    console.log("Email sent:", info.response);
    return res.status(200).json({ message: "Email sent successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
