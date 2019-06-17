const {
  getOrigins,
  createOrigin,
  deleteOrigin,
  updateOrigin
} = require("../models/origin.model");

const { isExistOriginInProducts } = require("../models/product.model");

exports.index = function(req, res, next) {
    res.render("pages/origins/index", {
      title: "Quản lý nơi xuất xứ sản phẩm"
    });
};

exports.get = async function(req, res, next) {
  const dbOrigins = await getOrigins();
  res.send(dbOrigins);
};

exports.create = async function(req, res, next) {
  const origin = req.body;
  const promistResult = createOrigin(origin);
  promistResult.then(value => {
    console.log("love", value);
    if (value.result.ok === 1) {
      origin._id = value.insertedId;
      res.send({ isSuccess: true, msg: "Tạo thành công!", origin: origin });
    } else {
      res.send({ isSuccess: false, msg: "Tạo thất bại!" });
    }
  });
  createOrigin(req.body);
};

exports.delete = async function(req, res, next) {
  const id = req.params._id;
  console.log("Dang delete!", id);
  const isExits = await isExistOriginInProducts(id);
  if (isExits) {
    res.send({
      isSuccess: false,
      msg: "Không thể xóa origin do có ràng buộc với bản product!"
    });
  } else {
    const promistResult = deleteOrigin(id);
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
  let origin = req.body;
  const promistResult = updateOrigin(req.params._id, origin);
  promistResult.then(value => {
    if (value.result.ok === 1) {
      res.send({ isSuccess: true, msg: "Cập nhật thành công!" });
    } else {
      res.send({ isSuccess: false, msg: "Cập nhật thất bại!" });
    }
  });
};
