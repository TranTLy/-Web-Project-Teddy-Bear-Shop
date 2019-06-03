const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const AdminSchema = new Schema(
  {
    name: String,
    email: {
      type: String
    },
    hash_password: {
      type: String
    },
    created: {
      type: Date,
      default: Date.now
    },
    reset_password_token: {
      type: String
    },
    reset_password_expires: {
      type: Date
    }
  },
  {
    collection: "accountadmins"
  }
);

module.exports = mongoose.model("Amin", AdminSchema);
