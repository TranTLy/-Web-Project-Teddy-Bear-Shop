const {
  createProduct,
  getProducts,
  getTypes,
  getStatistic,
  insertProduct,
  updateProduct,
  deleteProduct
} = require("../models/product.model");

const { getOrigins } = require("../models/origin.model");
const { getProducers } = require("../models/producer.model");
const ListProductInBillSchema = require("../models/listProductInBill");

var ObjectId = require("mongodb").ObjectID;
exports.index = async function(req, res, next) {
  if (req.isAuthenticated()) {
  console.log("Render", "Đã render");
  res.render("pages/products/index", {
    title: "Quản lý sản phẩm"
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
  if (filter.hasOwnProperty("price")) {
    if (filter.price === "") delete filter.price;
    else filter.price = parseInt(filter.price);
  }
  if (filter.hasOwnProperty("discount")) {
    if (filter.discount === "") delete filter.discount;
    else filter.discount = parseFloat(filter.discount);
  }
  if (filter.name === "") delete filter.name;
  if (filter._id === "") delete filter._id;
  else filter._id = ObjectId(filter._id);
  if (filter.size === "") delete filter.size;
  if (filter.color === "") delete filter.color;
  if (filter.type === "") delete filter.type;
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
  const promistResult = createProduct(product, res);
  promistResult
    .then(value => {
      if (value.result.ok === 1) {
        product._id = value.insertedId;
        console.log("Thành công!", product);
        res.send({ isSuccess: true, msg: "Tạo thành công!", product: product });
      } else {
        console.log("Thất bại!");
        res.send({ isSuccess: false, msg: "Tạo thất bại!" });
      }
    })
    .catch(err => {
      console.log("Thất bại!");
      res.send({ isSuccess: false, msg: "Tạo thất bại!\n" + err.message });
    });
};

exports.update = function(req, res, next) {
  let product = req.body;
  console.log("update exp", product);
  try {
    if (product.discount < 0 || product.discount > 1 || isNaN(product.discount))
      throw new Error("Discount không hợp lệ");
    if (product.price < 0 || isNaN(product.price))
      throw new Error("Giá không hợp lệ");
    if (
      product.origin === "" ||
      product.producer === "" ||
      product.type === "" ||
      product.imgs === "" ||
      product.name === "" ||
      product.size === "" ||
      product.color === ""
    )
      throw new Error("Các trường không được rỗng!");
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
  } catch (err) {
    console.log("LỖi nè", err.message);
    res.send({ isSuccess: false, msg: "Cập nhật thất bại!\n " + err.message });
  }
};

exports.delete = async function(req, res, next) {
  const id = req.params._id;
  const product = await ListProductInBillSchema.findOne({
    "products.id_product": ObjectId(id)
  });
  if (product == null) {
    const promistResult = deleteProduct(id);
    promistResult.then(value => {
      if (value.result.ok === 1) {
        res.send({ isSuccess: true, msg: "Xóa thành công!" });
      } else {
        res.send({ isSuccess: false, msg: "Xóa thất bại!" });
      }
    });
  } else {
    res.send({
      isSuccess: false,
      msg: "Không thể xóa sản phẩm vì có tham chiếu tới hóa đơn!"
    });
  }
};

exports.getStatistic = async function(req, res, next) {
  const cursor = await getStatistic();
  const dbTypes = await getTypes();
  const resultFunc = cursor.toArray();
  console.log("dbTypes", dbTypes);
  resultFunc
    .then(
      result => {
        console.log("onfile", result);
        let labels = [];
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < dbTypes.length; j++) {
            console.log("onfile", result[i]._id + " : " + dbTypes[j]._id);
            if (result[i]._id.toString() === dbTypes[j]._id.toString()) {
              console.log("onfile11111", dbTypes[i].name);
              labels.push(dbTypes[j].name);
              break;
            }
          }
        }

        let counts = result.map(value => value.count);
        let total = 0;
        result.forEach(product => {
          total += product.count;
        });

        res.send({
          isSuccess: true,
          msg: "Thành công!",
          labels: labels,
          counts: counts,
          total: total
        });
      },
      err => {
        console.log("onreject", err);
        res.send({ isSuccess: false, msg: "Thất bại!" });
      }
    )
    .catch(onrejected => {
      console.log("onreject", onrejected);
      res.send({ isSuccess: false, msg: "Thất bại!" });
    });
};
