const User = require("../models/admin.model");
var ObjectId = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const update = require("./usersController");
const jwtDecode = require("jwt-decode");

exports.get = async function(req, res, next) {
  const id = req.query._id;

  const user = await User.findOne({ _id: ObjectId(id) }, (err, result) => {
    return result;
  });

  res.render("pages/admin/index", {
    title: "Thông tin chi tiết",
    user: user
  });
};
exports.change_password_template = async function(req, res) {
  // const admin = await User.findById(req.query._id, (err, admin) => {
  //   return admin;
  // });

  res.render("pages/changepassword/index", {
    title: "Thay đổi mật khẩu",
    // admin: admin,
    layout: false
  });
};

exports.change_password = function(req, res) {
  const user = req.cookies.user;
  console.log("pass", user.password);
  password = bcrypt.hashSync(req.body.newpassword, 10);
  res.cookie("user", user);
  console.log("pass hash", user.password);
  const userUpdate = { password: password };
  User.findByIdAndUpdate(user._id, userUpdate, (err, user) => {
    if (err)
      return res.send({
        message: err + "Đã có lỗi xảy ra trong quá trình thay đổi mật khẩu"
      });
    else {
      req.login(user, err => {
        if (err) {
          res.send(err);
        }
        res.cookie("user", user);
        return res.render("pages/infor/index", {
          message: "Thay đổi mật khẩu thành công, mời bạn nhấn OK để tiếp tục",
          layout: false
        });
      });
    }
  });
};

exports.getInfoSuccess = function(req, res) {
  res.render("pages/infor/index", {
    message: "Xác thực tài khoản thành công, mời bạn nhấn OK để tiếp tục",
    layout: false
  });
};

exports.isAuthenUser = (req, res, next) => {
  const token = req.query.token;

  const jwtdecode = jwtDecode(token);
  const user = new User(jwtdecode.newUser);
  console.log("token decode", user);

  if (user) {
    user.save(function(err, user) {
      if (err) {
        res.render("pages/register/index", {
          title: "Đăng ký thất bại",
          isSuccess: false,
          message: "Có lỗi xảy ra trong quá trình đăng ký",
          layout: false
        });
      } else {
        req.login(user, err => {
          if (err) {
            res.send(err);
          }
          const token = jwt.sign({ user }, "secret");
          res.cookie("token", token);
          res.cookie("user", user);
          console.log("is authed");
        });
        next();
      }
    });
  } else {
    res.render("/register", {
      message: "Đã có lỗi trong quá trình xác thực tài khoản, mời bạn thử lại"
    });
  }
};
