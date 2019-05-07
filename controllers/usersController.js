exports.index = function(req, res,next) {
  res.render("pages/users/index", { title: "Quản lý người dùng" });
};
exports.crud = function(req, res,next) {
  res.render("pages/users/index", { title: "Quản lý người dùng" });
};