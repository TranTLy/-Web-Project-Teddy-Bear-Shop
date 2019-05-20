const {
  getUsers,
} = require("../models/user.model");

exports.getUsers = async function(req, res, next) {
  console.log("getUser load");
  const dbUsers = await getUsers();
  res.send(dbUsers);
};

exports.index = function(req, res,next) {
  res.render("pages/users/index", { title: "Quản lý người dùng" });
};
exports.crud = function(req, res,next) {
  res.render("pages/users/index", { title: "Quản lý người dùng" });
};