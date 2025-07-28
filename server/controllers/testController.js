const sendEmail = require('../utils/sendEmail');

exports.sendTestEmail = async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  try {
    await sendEmail({
      to: email,
      subject: 'Notification from Car Rental Admin',
      text: message,
    });

    res.status(200).json({ message: '✅ Email sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ error: '❌ Failed to send email' });
  }
};