const EmailSend = require("../utils/EmailHelper");

const UserOTPService = async (req, res) => {
  let email = req.params.email;
  let code = Math.floor(100000 + Math.random() * 900000);
  let EmailText = `Your Verification code is: ${code}`;
  let EmailSubject = "Email Verification";
  await EmailSend(email, EmailText, EmailSubject);
};

const VerifyOTPService = async (req, res) => {};

const LogOutService = async (req, res) => {};

const CreateProfileService = async (req, res) => {};

const UpdateProfileService = async (req, res) => {};

const ReadProfileService = async (req, res) => {};
