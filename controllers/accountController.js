const User = require("../models/user");
var passport = require("passport");
var Bcrypt = require("bcryptjs");
var config = require("../config/database");
// require("../config/passport")(passport);
var jwt = require("jsonwebtoken");
// const async = require("async");
// const crypto = require("crypto");
// const email = process.env.MAILER_EMAIL_ID || "auth_email_address@gmail.com";
// const pass = process.env.MAILER_PASSWORD || "auth_email_pass";
// const nodemailer = require("nodemailer");

// router.get("/register", function(req, res) {
//   res.render("pages/register/index", { title: "Đăng ký" });
// });

// router.get("/login", function(req, res) {
//   res.render("pages/login/index", { title: "Đăng nhập" });
// });

// const smtpTransport = nodemailer.createTransport({
//   service: process.env.MAILER_SERVICE_PROVIDER || "Gmail",
//   auth: {
//     user: email,
//     pass: pass
//   }
// });

// const handlebarsOptions = {
//   viewEngine: "handlebars",
//   viewPath: path.resolve("./api/templates/"),
//   extName: ".html"
// };

// smtpTransport.use("compile", hbs(handlebarsOptions));

exports.signup = function(req, res) {
  res.render("pages/register/index", {
    title: "Đăng ký",
    isSuccess: true,
    layout: false
  });
};
exports.signin = function(req, res) {
  res.render("pages/login/index", {
    title: "Đăng nhập",
    isRegister: false,
    layout: false
  });
};
exports.forget_password = function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({
        email: req.body.email
      }).exec(function(err, user) {
        if (user) {
          done(err, user);
        } else {
          done("User không tìm thấy");
        }
      });
    },
    function(user, done) {
      crypto.randomBytes(20, function(err, buffer) {
        let token = buffer.toString("hex");
        done(err, user, token);
      });
    },
    function(user, token, done) {
      User.findByIdAndUpdate({ _id: user._id }, {});
    }
  ]);
  res.render("pages/forgotpassword/index", {
    title: "Quên mật khẩu",
    layout: false
  });
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
        // alert("Tên đăng nhập hoặc mật khẩu sai.");
        // res.redirect("/");
        res
          .status(401)
          .send({ success: false, msg: "Tên đăng nhập hoặc mật khẩu sai." });
      } else {
        if (!Bcrypt.compareSync(req.body.password, user.password)) {
          //wrong password
          // alert("Tên đăng nhập hoặc mật khẩu sai.");
          // res.redirect("/");
          return res
            .status(400)
            .send({ message: "Tên đăng nhập hoặc mật khẩu không đúng" });
        }
        var token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 86400 // 1 day
        });
        // return the information including token as JSON
        // res.json({
        //   success: true,
        //   token: "JWT " + token,
        //   message: "Đăng nhập thành công"
        // });
        res.redirect("/dashboard");
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
        isSuccess: false,
        message: `Email ${
          req.body.email
        } đã tồn tại. Vui lòng dùng email này để đăng nhập hoặc đăng ký tài khoản bằng email khác.`
      });
    } else {
      req.body.password = Bcrypt.hashSync(req.body.password, 10);
      const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
      });

      var result = user.save();
      res.render("pages/login/index", {
        title: "Đăng nhập",
        isSuccess: true,
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
