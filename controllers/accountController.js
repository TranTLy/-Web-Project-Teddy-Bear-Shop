const User = require("../models/user");
var passport = require("passport");
var Bcrypt = require("bcryptjs");
var config = require("../config/database");
require("../config/passport")(passport);
var jwt = require("jsonwebtoken");

// router.get("/register", function(req, res) {
//   res.render("pages/register/index", { title: "Đăng ký" });
// });

// router.get("/login", function(req, res) {
//   res.render("pages/login/index", { title: "Đăng nhập" });
// });
exports.signup = function(req, res) {
  res.render("pages/register/index", {
	title: "Đăng ký",
	isSuccess : true
  });
};
exports.signin = function(req, res) {
  res.render("pages/login/index", { title: "Đăng nhập",isRegister : false });
};
exports.forget_password = function(req, res) {
  res.render("customer-views/forget-password", { title: "Quên mật khẩu" });
};
exports.change_password = function(req, res) {
  res.render("customer-views/change-password", { title: "Đổi mật khẩu" });
};
exports.update_infor = function(req, res) {
  res.render("customer-views/update-infor", { title: "Thay đổi thông tin" });
};

exports.post_signin = async function(req, res) {
  try {
    await User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (!user) {
        //user isn't exist
        res
          .status(401)
          .send({ success: false, msg: "Tên đăng nhập hoặc mật khẩu sai." });
      } else {
        if (!Bcrypt.compareSync(req.body.password, user.password)) {
          //wrong password
          return res
            .status(400)
            .send({ message: "Tên đăng nhập hoặc mật khẩu không đúng" });
        }
        var token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 86400 // 1 day
        });
        // return the information including token as JSON
        res.json({
          success: true,
          token: "JWT " + token,
          message: "Đăng nhập thành công"
        });
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.post_signup = async function(req, res) {
  User.findOne({ email: req.body.email }, (err, results) => {
    if (results != null) {
      res.render("pages/register/index", {
		title: "Đăng ký thất bại",
		isSuccess : false,
        message: `Email ${
          req.body.email
        } đã tồn tại. Vui lòng dùng email này để đăng nhập hoặc đăng ký tài khoản bằng email khác.`
      });
    } else {
      req.body.password = Bcrypt.hashSync(req.body.password, 10);
      const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });

      var result = user.save();
      res.render("pages/login/index", {
		title: "Đăng nhập",
		isSuccess : true,
        message: "Đăng ký thành công",
        name: req.body.name
        // birthday: req.body.birthday,
        // phoneNumber: req.body.phoneNumber
      });

      // //  create token
      // var token = jwt.sign(user.toJSON(), config.secret, {
      // 	expiresIn: 86400 // 1 day
      // });
    }
  });
};
