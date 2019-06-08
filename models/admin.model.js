const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const AdminSchema = new Schema({
  name: String,
  email: {
    type: String
  },
  password: {
    type: String
  },
  is_block: {
    type: Boolean,
    default: false
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
});
AdminSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

AdminSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model("Admin", AdminSchema);
