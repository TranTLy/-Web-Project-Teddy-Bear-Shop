var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaProducers = mongoose.Schema.Types;

var ProducerSchema = new Schema(
  {
    _id: {
      type: SchemaProducers.ObjectId
    },
    name: {
      type: String,
      required: true
    }
  },
  { collection: "producer" }
);

module.exports = mongoose.model("Producer", ProducerSchema);
