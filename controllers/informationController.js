exports.index = function(req, res) {
  res.render("customer-views/index", { title: "Trang chủ" });
};
exports.about = function(req, res) {
  res.render("customer-views/about", { title: "Thông tin" });
};
exports.contact = function(req, res) {
  res.render("customer-views/contact", { title: "Liên hệ" });
};
exports.service = function(req, res) {
  res.render("customer-views/service", { title: "Dịch vụ" });
};
