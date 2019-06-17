const {
  getTypes,
  createType,
  deleteType,
  updateType
} = require("../models/type.model");

const { isExistTypeInProducts } = require("../models/product.model");

exports.index = function(req, res, next) {
    res.render("pages/types/index", { title: "Quản lý loại sản phẩm" });
};

exports.get = async function(req, res, next) {
  const dbTypes = await getTypes();
  res.send(dbTypes);
};

exports.create = async function(req, res, next) {
  const type = req.body;
  const promistResult = createType(type);
  promistResult.then(value => {
    console.log("love", value);
    if (value.result.ok === 1) {
      type._id = value.insertedId;
      res.send({ isSuccess: true, msg: "Tạo thành công!", type: type });
    } else {
      res.send({ isSuccess: false, msg: "Tạo thất bại!" });
    }
  });
};

exports.delete = async function(req, res, next) {
  const id = req.params._id;
  console.log("Dang delete!", id);
  const isExits = await isExistTypeInProducts(id);
  if (isExits) {
    res.send({
      isSuccess: false,
      msg: "Không thể xóa type do có ràng buộc với bản product!"
    });
  } else {
    const promistResult = deleteType(id);
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
  let type = req.body;
  const promistResult = updateType(req.params._id, type);
  promistResult.then(value => {
    if (value.result.ok === 1) {
      res.send({ isSuccess: true, msg: "Cập nhật thành công!" });
    } else {
      res.send({ isSuccess: false, msg: "Cập nhật thất bại!" });
    }
  });
};
