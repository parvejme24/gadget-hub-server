const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    payable: { type: String },
    cus_details: { type: String },
    ship_details: { type: String },
    tran_id: { type: String },
    val_id: { type: String },
    delivery_status: { type: String },
    payment_status: { type: String },
    total: { type: String },
    vat: { type: String },
  },
  { timestamp: true, versionKey: false }
);

const InvoiceModel = mongoose.model("invoices", InvoiceSchema);
module.exports = InvoiceModel;
