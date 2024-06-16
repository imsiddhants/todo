const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMagicLink = async (email, token) => {
  const url = `http://localhost:3000/verify?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Magic Link',
    text: `Click here to login: ${url}`,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendMagicLink,
};
