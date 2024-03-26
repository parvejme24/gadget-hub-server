const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  opt: {
    type: String,
    require: true,
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
