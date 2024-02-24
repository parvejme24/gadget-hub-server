const nodemailer = require("nodemailer");

const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
  let transport = nodemailer.createTransport({
    host: "mdparvejmep@gmail.com",
    port: 25,
    secure: false,
    host: { user: "mdparvejmep@gmail.com", pass: "123456" },
    tls: { rejectUnauthorized: false },
  });

  let mailOption = {
    from: "GadgetHub <info@gadget-hub.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transport.sendMail(mailOption);
};

module.exports = EmailSend;
