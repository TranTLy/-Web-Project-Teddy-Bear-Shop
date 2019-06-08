var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var CustomerSchema = new Schema(
  {
    name: {
      type: String
    },
    birthday: {
      type: Date
    },
    birthdayStr: {
      type: String,
      default: ""
    },
    email: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    is_block: {
      type: String,
      default: "Hoạt động"
    }
  },
  { collection: "customers" }
);

module.exports = mongoose.model("Customer", CustomerSchema);
