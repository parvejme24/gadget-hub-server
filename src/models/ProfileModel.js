const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    fax: { type: String },
    name: { type: String },
    phone: { type: String },
    phostCode: { type: String },
    state: { type: String },
    ship_address: { type: String },
    ship_city: { type: String },
    ship_country: { type: String },
    ship_name: { type: String },
    ship_postCode: { type: String },
    ship_state: { type: String },
  },
  { timestamp: true, versionKey: false }
);

const ProfileModel = mongoose.model("profiles", ProfileSchema);

module.exports = ProfileModel;
