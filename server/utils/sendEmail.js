const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Car Rental" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: text || "Please view this message in an HTML-compatible email client.",
    html: html || `<p>${text}</p>`,
  });
};

module.exports = sendEmail;
