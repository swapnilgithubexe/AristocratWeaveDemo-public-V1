require('dotenv').config();
const nodeMailer = require("nodemailer");


const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.USER,
      pass: process.env.SMPT_password
    }, tls: {
      rejectUnauthorized: false
    }
  })
  const mailOptions = {
    from: {
      name: "Aristocrat Weave",
      address: process.env.USER
    },
    to: options.email,
    subject: options.subject,
    text: options.message

  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: "Email sent successfully" };
  } catch (error) {
    return { message: "Error sending email" }
  }
};


module.exports = sendEmail;