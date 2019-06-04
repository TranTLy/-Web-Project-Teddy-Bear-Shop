const User = require("../models/user");

exports.getUsers = async function(req, res, next) {
  console.log("getUser load");
  const dbUsers = await User.find({}, (err, result) => {
    return result;
  });
  res.send(dbUsers);
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
