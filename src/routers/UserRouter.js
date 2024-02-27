const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/UserController");
const AuthVerification = require("../middlewares/AuthVerification");



userRouter.get("/UserOTP/:email", UserController.UserOTP);
userRouter.get("/VerifyLogin/:email/:otp", UserController.VerifyLogin);
userRouter.get("/UserLogout", AuthVerification, UserController.UserLogout);
userRouter.post(
  "/CreateProfile",
  AuthVerification,
  UserController.CreateProfile
);
userRouter.post(
  "/UpdateProfile",
  AuthVerification,
  UserController.UpdateProfile
);
userRouter.get("/ReadProfile", AuthVerification, UserController.ReadProfile);

module.exports = userRouter;
