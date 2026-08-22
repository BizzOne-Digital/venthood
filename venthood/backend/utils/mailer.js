const nodemailer = require('nodemailer');

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;
  if (!process.env.SMTP_USER || !process.env.SMTP_APP_PASSWORD) return null;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_APP_PASSWORD,
    },
  });
  return transporter;
};

// Sends an email. Never throws - logs and resolves so callers can safely
// fire-and-forget without crashing when SMTP creds are missing/invalid.
const sendMail = async ({ to, subject, html, text }) => {
  try {
    const t = getTransporter();
    if (!t) {
      console.warn('Mailer: SMTP credentials not configured, skipping email send.');
      return false;
    }
    await t.sendMail({
      from: `"Venthood.ca" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text,
    });
    return true;
  } catch (err) {
    console.error('Mailer error:', err.message);
    return false;
  }
};

module.exports = { sendMail };
