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
    address: {
      type: String
    },
    status: {
      type: String
    },
    total: {
      type: SchemaTypes.Decimal128,
      default: 0
    }
  },
  { collection: "bills" }
);

module.exports = mongoose.model("Bill", BillSchema);
