const User = require("../models/admin.model");
var ObjectId = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");
exports.get = async function(req, res, next) {
  const id = req.query._id;

  const user = await User.findOne({ _id: ObjectId(id) }, (err, result) => {
    result.password = bcrypt.de
    return result;
  });

  res.render("pages/admin/index", {
    title: "Thông tin chi tiết",
    user: user
  });
};

