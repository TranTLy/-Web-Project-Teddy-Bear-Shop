var ObjectId = require("mongodb").ObjectID;
const Bill = require("../models/bill");
const ListProductInBill = require("../models/listProductInBill");
const Customer = require("../models/customer");
const Product = require("../models/product");
var moment = require("moment");

exports.index = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render("pages/bills/index", { title: "QUản lý đặt hàng" });
  }
  return res.redirect("/");
};

exports.get = async function(req, res) {
  const bills = await Bill.find({}, (err, result) => {
    return result;
  });
  await Promise.all(
    bills.map(async bill => {
      const customer = await Customer.findOne({
        _id: ObjectId(bill.id_customer)
      });
      bill.name_customer = customer.name;
      return bill;
    })
  );

  res.render("pages/bills/index", {
    title: "Đơn hàng",
    bills: bills,
    moment: moment
  });
};
exports.search_sort = function(req, res, next) {
  res.render("pages/bills/index", { title: "Quản lý đặt hàng" });
};

exports.getProductsByIdBill = async function(req, res) {
  const id = req.query._id;
  const bill = await ListProductInBill.findOne({ _id: ObjectId(id) });
  await Promise.all(
    bill.products.map(async product => {
      const productMongo = await Product.findOne({
        _id: ObjectId(product.id_product)
      });
      product.imgs = productMongo.imgs;
      product.name = productMongo.name;
      product.price = productMongo.price;
      product.discount = productMongo.discount;
      return product;
    })
  );
  res.send(bill.products);
};

exports.update = function(req, res, next) {
  let billUpdate = req.body;
  console.log("billUpdate", billUpdate);
  let id = req.params._id;

  Bill.findByIdAndUpdate(id, billUpdate, function(err, model) {
    if (err) {
      res.send({ isSuccess: false, msg: "Cập nhật thất bại!" });
      return;
    }
    res.send({ isSuccess: true, msg: "Cập nhật thành công!" });
  });
};
