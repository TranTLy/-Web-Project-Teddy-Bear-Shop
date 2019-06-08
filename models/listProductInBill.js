var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var ListProductInBillSchema = new Schema(
  {
    products: [{ 
      id_product: SchemaTypes.ObjectId,
      amount: {
        type : Number,
        default : 0
      },
      imgs : {
        type: String,
        default : ""
      },
      name : {
        type : String,
        default : ""
      },
      price : {
        type : SchemaTypes.Number,
        default : 0
      },
      discount : {
        type: SchemaTypes.Decimal128,
        default : 0
      }
      }]
  },
  { collection: "bills" }
);

module.exports = mongoose.model("ListProductInBillSchema", ListProductInBillSchema);
