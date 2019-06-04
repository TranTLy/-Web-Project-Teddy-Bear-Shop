const User = require("../models/user");
var ObjectId = require("mongodb").ObjectID;

exports.get = async function(req, res, next) {
  const id = req.query._id;

  const user = await User.findOne({ _id: ObjectId(id) }, (err, result) => {
    return result;
  });

  console.log("bbbb", user);
  // console.log("haha111111",id);
  // const dbUsers = await User.find({}, (err, result) => {
  // 	return result;
  // });

  res.render("pages/detailaccount/index", {
    title: "Thông tin chi tiết",
    user: user
  });
};

exports.index = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render("pages/users/index", { title: "Quản lý người dùng" });
  }
  return res.redirect("/");
};
exports.crud = function(req, res, next) {
  res.render("pages/users/index", { title: "Quản lý người dùng" });
};
