var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var BillSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now
    },
    name_customer: {
      type: String,
      default: ""
    },
    id_customer: {
      type: SchemaTypes.ObjectId
    },
    city: {
      type: String
    },
    status: {
      type: String
    },
    total: {
      type: SchemaTypes.Decimal128,
      default: 0
    },
    discount: {
      type: SchemaTypes.Decimal128,
      required: false,
      default: 0
    }
  },
  { collection: "bills" }
);

module.exports = mongoose.model("Bill", BillSchema);
