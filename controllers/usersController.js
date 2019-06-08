const User = require("../models/admin.model");
const bcrypt = require("bcrypt");

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
  if(myId === id) {
    res.send({ isSuccess: false, msg: "Không thể khóa tài khoản của mình!" });
    return
  }

  var updateObj = { is_block: user.is_block };

  User.findByIdAndUpdate(id, updateObj, function(err, model) {
    if (err) {
      res.send({ isSuccess: false, msg: "Cập nhật thất bại!" });
      return;
    }
    res.send({ isSuccess: true, msg: "Cập nhật thành công!" });
  });
};

exports.index = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render("pages/users/index", { title: "Quản lý người dùng" });
  }
  return res.redirect("/");
};

exports.checkpassword = function(req, res) {
  const pass = req.query.pass;
  const match = bcrypt.compareSync(pass, req.cookies.user.password);
  if (match) res.send({ check: true });
  else res.send({ check: false });
};

exports.checkemaillogin = function(req, res) {
  const email = req.query.email;
  User.findOne({ email: email }, (err, user) => {
    if (user) return res.send({ check: true });
    else return res.send({ check: false });
  });
};

exports.checkpasswordlogin = function(req, res) {
  const pass = req.query.pass;
  const email = req.query.email;
  console.log("pass", pass);
  console.log("email", email);
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      const match = bcrypt.compareSync(pass, user.password);
      if (match) return res.send({ check: true });
    }
    return res.send({ check: false });
  });
};

exports.edit_username = function(req, res) {
  console.log("áhd", req.body);
  const objUser = { name: req.body.username };
  console.log("name", objUser);
  User.findByIdAndUpdate(req.cookies.user._id, req.body, function(err, user) {
    if (err) {
      console.log("Update", "Thất bại");
      res.send({ isSuccess: false, msg: "Cập nhật thất bại!" });
      return;
    } else {
      req.login(user, err => {
        if (err) {
          res.send(err);
        }
        res.cookie("user", user);
        res.send({ msg: "Cập nhật thành công" });
      });
    }
  });
};
