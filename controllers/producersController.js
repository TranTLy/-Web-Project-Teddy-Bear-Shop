const { getProducers } = require("../models/producer.model");
exports.index = function(req, res, next) {
  res.render("pages/producers/index", { title: "Nhà cung cấp" });
};

exports.getProducers = async function(req, res, next) {
  const dbProducers = await getProducers();
  res.send(dbProducers);
};
// exports.crud = function(req, res, next) {
//   res.render("pages/products/index", { title: "Quản lý sản phẩm" });
// };
