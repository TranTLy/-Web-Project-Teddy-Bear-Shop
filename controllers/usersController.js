const User = require("../models/admin.model");

exports.getUsers = async function(req, res, next) {
  console.log("getUser load");
  const dbUsers = await User.find({}, (err, result) => {
    return result;
  });
  res.send(dbUsers);
};

exports.update = function(req, res, next) {
  let user = req.body;
  let id = req.params._id;

  let myId = req.cookies.user._id
  console.log("Update","myid " + myId + " : ");
  // if(myId === id) {
  //   res.send({ isSuccess: false, msg: "Không thể khóa tài khoản của mình!" });
  //   return
  // }

  var updateObj = { is_block: user.is_block };

  User.findByIdAndUpdate(id, updateObj, function(err, model) {
    
    if (err) {
      console.log("Update","Thất bại");
      res.send({ isSuccess: false, msg: "Cập nhật thất bại!" });
      return;
    }
    console.log("Update","Thành công");
    res.send({ isSuccess: true, msg: "Cập nhật thành công!" });
  });
  // User.findByIdAndUpdate(
  //   { _id: ObjectId(id) },
  //   { $set: user },
  //   (err, result) => {
  //     console.log("Update", result);
  //     // if (result.ok === 1) {
  //     //
  //     // } else {
  //     //
  //     // }
  //   }
  // );
};

exports.index = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render("pages/users/index", { title: "Quản lý người dùng" });
  }
  return res.redirect("/");
};
exports.crud = function(req, res, next) {
  res.render("pages/users/index", { title: "Quản lý người dùng" });
};
