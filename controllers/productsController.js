const {
  createProduct,
  getProducts,
  getTypes,
  insertProduct,
  updateProduct,
  deleteProduct
} = require("../models/product.model");
const { getOrigins } = require("../models/origin.model");
const { getProducers } = require("../models/producer.model");
var ObjectId = require("mongodb").ObjectID;
exports.index = async function(req, res, next) {
  const dbTypes = await getTypes();
  const dbProducers = await getProducers();
  const dbOrigins = await getOrigins();
  if (req.isAuthenticated()) {
    res.render("pages/products/index", {
      title: "Quản lý sản phẩm",
      Types: dbTypes,
      Producers: dbProducers,
      Origins: dbOrigins
    });
  }
  return res.redirect("/");
};

exports.getTypes = async function(req, res, next) {
  const dbTypes = await getTypes();
  res.send(dbTypes);
};

exports.get = async function(req, res, next) {
  const filter = req.query;
  console.log("FILTER", filter);
  if(filter.hasOwnProperty('price')) {
    if(filter.price === '' ) delete filter.price
    else filter.price = parseInt(filter.price)
  } 
  if(filter.hasOwnProperty('discount')) {
    if(filter.discount === '') delete filter.discount
    else filter.discount = parseFloat(filter.discount);
  }
  if(filter.name === '') delete filter.name;
  if(filter._id === '') delete filter._id
  else filter._id = ObjectId(filter._id);
  if(filter.size === '') delete filter.size;
  if(filter.color === '') delete filter.color;
  if(filter.type === '')  delete filter.type
  else filter.type = ObjectId(filter.type);
  console.log("FILTERAFTER", filter);
  const dbProducts = await getProducts(filter);
  res.send(dbProducts);
};

exports.crud = function(req, res, next) {
  res.render("pages/products/index", { title: "Quản lý sản phẩm" });
};
exports.create = async function(req, res, next) {
  const product = req.body;
  const promistResult = createProduct(product);
  promistResult.then(value => {
    if (value.result.ok === 1) {
      product._id = value.insertedId;
      console.log("Thành công!", product);
      res.send({ isSuccess: true, msg: "Tạo thành công!", product: product });
    } else {
      console.log("Thất bại!");
      res.send({ isSuccess: false, msg: "Tạo thất bại!" });
    }
  });
};

// exports.create = function(req, res, next) {

//   // product.isDeleted = false;
//   // product.isStandOut = false;
//   // product.isNew = true;
//   // product.currentPrice= 10;

//   console.log("Dang insert!!", product);
//   insertProduct(product);
// };

exports.update = function(req, res, next) {
  let product = req.body;
  console.log("update exp", product);
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

  const promistResult = updateProduct(req.params._id, product);
  promistResult.then(value => {
    if (value.result.ok === 1) {
      res.send({ isSuccess: true, msg: "Cập nhật thành công!" });
      console.log("Cập nhật thành công!");
    } else {
      res.send({ isSuccess: false, msg: "Cập nhật thất bại!" });
      console.log("Cập nhật thất bại!");
    }
  });
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
