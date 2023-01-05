const nodemailer = require("nodemailer");

const sendMail = async (...props) => {
  const [email, message] = props;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const options = {
    from: email,
    to: process.env.USER_EMAIL,
    text: message,
  };
  await transporter.sendMail(options);

};

module.exports = sendMail;
