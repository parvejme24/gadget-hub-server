const mongoose = require("mongoose");

const PaymentSettingSchema = mongoose.Schema(
  {
    store_id: { type: String },
    store_password: { type: String },
    currency: { type: String },
    success_url: { type: String },
    fail_url: { type: String },
    cancel_url: { type: String },
    ipn_url: { type: String },
    init_url: { type: String },
  },
  { timestamp: true, versionKey: false }
);

const PaymentSettingModel = mongoose.model(
  "paymentSettings",
  PaymentSettingSchema
);
module.exports = PaymentSettingModel;
