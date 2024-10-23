
const nodemailer = require('nodemailer');

const sendAlert = async (condition) => {
  if (condition) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.PASSWORD, // your password
      },
    });

    let info = await transporter.sendMail({
      from: '"EzyMetrics Alerts" <your-email@example.com>',
      to: 'user@example.com',
      subject: 'Alert: Low Conversion Rate',
      text: 'Conversion rate is below the threshold. Immediate action required!',
    });

    console.log('Alert sent:', info.messageId);
  }
};

module.exports = sendAlert;
