const {
  getProducts,
  getTypes,
  insertProduct,
  updateProduct,
  deleteProduct
} = require("../models/product.model");
const {
  getOrigins
} = require("../models/origin.model")
const {
  getProducers
} = require("../models/producer.model")
var ObjectId = require("mongodb").ObjectID;
exports.index = async function(req, res, next) {
  const dbTypes = await getTypes();
  const dbProducers = await getProducers();
  const dbOrigins = await getOrigins();
  res.render("pages/products/index", {
    title: "Quản lý sản phẩm",
    Types: dbTypes,
    Producers : dbProducers,
    Origins : dbOrigins
  });
};

exports.getTypes = async function(req, res, next) {
  const dbTypes = await getTypes();
  res.send(dbTypes);
};

exports.get = async function(req, res, next) {
  const dbProducts = await getProducts();
  res.send(dbProducts);
};

exports.crud = function(req, res, next) {
  res.render("pages/products/index", { title: "Quản lý sản phẩm" });
};

exports.create = function(req, res, next) {
  let product = {
    ...req.body,
    isDeleted: false,
    isStandOut: false,
    isNew: true,
    rating: 0
  };

  product.discount = parseFloat(product.discount / 100);
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
  console.log("update exp",product);
  product.discount = parseFloat(product.discount);
  product.price = parseInt(product.price);
  product.origin = new ObjectId(product.origin);
  product.producer = new ObjectId(product.producer);
  product.type = new ObjectId(product.type);
  product.rating = parseInt(product.rating);
  product.numberValidProduct = parseInt(product.numberValidProduct);
  product.isDeleted = JSON.parse(product.isDeleted);
  product.isStandOut = JSON.parse(product.isStandOut);
  product.isNew = JSON.parse(product.isNew);
  updateProduct(req.params._id, product);
  res.send({isSuccess : true});
};

exports.delete = async function(req, res, next) {
  const id = req.params._id;
  console.log("Dang delete!", id);
  const promistResult = deleteProduct(id);
  promistResult.then(value => {
    if (value.result.ok === 1) {
      res.send({ isSuccess: true, msg: "Xóa thành công!" });
    } else {
      res.send({ isSuccess: false, msg: "Xóa thất bại!" });
    }
  });
};
  