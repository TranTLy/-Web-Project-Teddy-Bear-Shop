exports.index = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render("pages/bills/index", { title: "QUản lý đặt hàng" });
  }
  return res.redirect("/");
};
exports.search_sort = function(req, res, next) {
  res.render("pages/bills/index", { title: "Quản lý đặt hàng" });
};
