const nodemailer = require('nodemailer');
const {emailSender} = require('../configs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailSender.accountEmail,
    pass: emailSender.accountPassword
  }
});

const sendEmail = async (email, answers) => {
  let info;

  try {
    info = await transporter.sendMail({
      from: email,
      to: 'monsters@trialjectory.com',
      subject: 'Monster test answers',
      html: `<div>${answers.join(',')}</div>`
    });
  } catch (ex) {
    console.error(__filename, ex);
    return;
  }

  console.log('Email sent:', info);
};

module.exports = sendEmail;
