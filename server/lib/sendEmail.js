const nodemailer = require('nodemailer');
const {mailer} = require('../configs');

const transporter = nodemailer.createTransport({
  host: mailer.host,
  auth: {
    user: mailer.user,
    pass: mailer.pass
  },
  port: mailer.port,
  secure: true,
  tls: {
    rejectUnauthorized: false
  }
});

const sendEmail = async (email, answers = []) => {
  let info;

  try {
    info = await transporter.sendMail({
      from: email,
      to: 'v.marushko.ossystem@gmail.com',  // monsters@trialjectory.com
      subject: `Monster test answers: ${email}`,
      html: `<div>${answers.join('; ')}</div>`
    });
  } catch (ex) {
    console.error(__filename, ex);
    return;
  }

  console.log('Email sent:', info);
};

module.exports = sendEmail;
