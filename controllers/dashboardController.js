
var moment = require("moment");
exports.index = function(req, res, next) {
  res.render("pages/dashboard/index", { title: "Bảng tin" ,moment : moment});
};
exports.statistical = function(req, res, next) {
  res.render("pages/dashboard/index", { title: "Bảng tin" });
};
