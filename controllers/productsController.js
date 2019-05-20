const { getProducts,getDiscount } = require("../models/product.model");

exports.index = async function(req, res, next) {
  const db = await getProducts();
  const dbDiscount = await getDiscount();
  console.log("db", db);
  res.render("pages/products/index", { title: "Quản lý sản phẩm" , products: db,discount: dbDiscount});
};
exports.crud = function(req, res, next) {
  res.render("pages/products/index", { title: "Quản lý sản phẩm" });
};
