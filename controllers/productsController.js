exports.index = function(req, res,next) {
  res.render("pages/products/index", { title: "Quản lý sản phẩm" });
};
exports.crud = function(req, res,next) {
  res.render("pages/products/index", { title: "Quản lý sản phẩm" });
};