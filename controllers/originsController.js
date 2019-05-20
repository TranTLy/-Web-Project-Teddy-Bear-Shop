const { getOrigins } = require("../models/origin.model");

exports.index = function(req, res, next) {
  res.render("pages/origins/index", { title: "Quản lý nơi xuất xứ sản phẩm" });
};

exports.getOrigins = async function(req, res, next) {
  const dbOrigins = await getOrigins();
  res.send(dbOrigins);
};
// exports.crud = function(req, res, next) {
//   res.render("pages/products/index", { title: "Quản lý sản phẩm" });
// };
