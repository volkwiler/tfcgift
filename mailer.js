const nodemailer = require('nodemailer');
require('dotenv').config();

const transport = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASS
  }
});

exports.sendMail = async ({ recipient_email, recipient_name, message }) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: recipient_email,
    subject: `You've received a gift message!`,
    html: `
      <h2>Hello ${recipient_name || ''} 🎁</h2>
      <p>${message}</p>
      <p>Sent with 💖 by someone who cares.</p>
    `
  };

  return transport.sendMail(mailOptions);
};
