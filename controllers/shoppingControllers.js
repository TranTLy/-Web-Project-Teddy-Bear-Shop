exports.checkout = function(req, res) {
  res.render("customer-views/checkout", { title: "Giỏ hàng" });
};
exports.payment = function(req, res) {
  res.render("customer-views/payment", { title: "Thanh toán" });
};
exports.product = function(req, res) {
  res.render("customer-views/product", { title: "Sản phẩm" });
};
exports.shop = function(req, res) {
  res.render("customer-views/shop", { title: "Cửa hàng" });
};
exports.single = function(req, res) {
  res.render("customer-views/single", { title: "Chi tiết sản phẩm" });
};
exports.detail_receipt = function(req, res) {
  res.render("customer-views/detail-receipt", { title: "Chi tiết hóa đơn" });
};
exports.history = function(req, res) {
  res.render("customer-views/history", { title: "Lịch sử mua hàng" });
};
