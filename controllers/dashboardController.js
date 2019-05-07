exports.index = function(req, res,next) {
  res.render("pages/dashboard/index", { title: "Bảng tin" });
};
exports.statistical = function(req,res,next) {
  res.render("pages/dashboard/index", { title: "Bảng tin" });
}
