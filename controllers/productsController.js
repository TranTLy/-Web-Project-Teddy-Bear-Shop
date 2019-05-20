const {
  getProducts,
  getTypes,
  insertProduct,
  updateProduct
} = require("../models/product.model");

exports.index = async function(req, res, next) {
  const dbTypes = await getTypes();
  res.render("pages/products/index", {
    title: "Quản lý sản phẩm",
    Types: dbTypes
  });
};

exports.getTypes = async function(req, res, next) {
  const dbTypes = await getTypes();
  res.send(dbTypes);
};

exports.getProducts = async function(req, res, next) {
  const dbProducts = await getProducts();
  res.send(dbProducts);
};

exports.crud = function(req, res, next) {
  res.render("pages/products/index", { title: "Quản lý sản phẩm" });
};

exports.insert = function(req, res, next) {

  let product = {...req.body,isDeleted: false,isStandOut: false,isNew: true, rating : 0};

  product.discount = parseFloat(product.discount/100);
  product.price = parseInt(product.price);
  product.type = parseInt(product.type);

  // product.isDeleted = false;
  // product.isStandOut = false;
  // product.isNew = true;
  // product.currentPrice= 10;

  console.log("Dang insert!!", product);
  insertProduct(product);
};

exports.update = function(req, res, next) {
  let product = req.body;
  product.discount = parseFloat(product.discount);
  product.price = parseInt(product.price);
  product.type = parseInt(product.type);
  product.rating = parseInt(product.rating);
  product.numberValidProduct = parseInt(product.numberValidProduct);
  product.isDeleted = JSON.parse(product.isDeleted);
  product.isStandOut = JSON.parse(product.isStandOut);
  product.isNew = JSON.parse(product.isNew);
  updateProduct(req.params._id, product);
};
