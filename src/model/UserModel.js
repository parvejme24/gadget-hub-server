const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    otp: { type: String, require: true },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("users", DataSchema);
module.exports = UserModel;