const {
  getProducers,
  createProducer,
  deleteProducer,
  updateProducer
} = require("../models/producer.model");

const { isExistProducerInProducts } = require("../models/product.model");

exports.index = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render("pages/producers/index", {
      title: "Quản lý nhà sản xuất sản phẩm"
    });
  }
  return res.redirect("/");
};

exports.get = async function(req, res, next) {
  const dbProducers = await getProducers();
  res.send(dbProducers);
};

exports.create = async function(req, res, next) {
  const producer = req.body;
  const promistResult = createProducer(producer);
  promistResult.then(value => {
    if (value.result.ok === 1) {
      producer._id = value.insertedId;
      res.send({ isSuccess: true, msg: "Tạo thành công!", producer: producer });
    } else {
      res.send({ isSuccess: false, msg: "Tạo thất bại!" });
    }
  });
};

exports.delete = async function(req, res, next) {
  const id = req.params._id;
  console.log("Dang delete!", id);
  const isExits = await isExistProducerInProducts(id);
  if (isExits) {
    res.send({
      isSuccess: false,
      msg: "Không thể xóa producer do có ràng buộc với bản product!"
    });
  } else {
    const promistResult = deleteProducer(id);
    promistResult.then(value => {
      if (value.result.ok === 1) {
        res.send({ isSuccess: true, msg: "Xóa thành công!" });
      } else {
        res.send({ isSuccess: false, msg: "Xóa thất bại!" });
      }
    });
  }
};

exports.update = async function(req, res, next) {
  let producer = req.body;
  const promistResult = updateProducer(req.params._id, producer);
  promistResult.then(value => {
    if (value.result.ok === 1) {
      res.send({ isSuccess: true, msg: "Cập nhật thành công!" });
    } else {
      res.send({ isSuccess: false, msg: "Cập nhật thất bại!" });
    }
  });
};
