var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;



var ItemProductInBill = new Schema(
  {
    id_product: SchemaTypes.ObjectId,
    amount: {
      type: Number,
      default: 0
    }
  },
  { collection: "bills" }
);

module.exports = mongoose.model("ItemProductInBill", ItemProductInBill);
