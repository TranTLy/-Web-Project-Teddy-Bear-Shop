const { getProducts,getTypes } = require("../models/product.model");

exports.index = async function(req, res, next) {
  const dbTypes = await getTypes();
  res.render("pages/products/index", { title: "Quản lý sản phẩm",Types: dbTypes});
};

exports.getTypes = async function(req,res,next) {
  const dbTypes = await getTypes();
  res.send(dbTypes);
}

exports.getProducts = async function(req,res,next) {
  const dbProducts = await getProducts();
  res.send(dbProducts);
}

exports.crud = function(req, res, next) {
  res.render("pages/products/index", { title: "Quản lý sản phẩm" });
};
