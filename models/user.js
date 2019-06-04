var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var UserSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
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
  { collection: "admins" }
);
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model("User", UserSchema);
