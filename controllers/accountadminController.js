"use strict";

var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  User = require("../models/user"),
  passport = require("passport"),
  async = require("async"),
  crypto = require("crypto"),
  ejs = require("ejs"),
  nodemailer = require("nodemailer"),
  smtpTransport = require("nodemailer-smtp-transport");
// pathtemplate = require("../templates");
var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "277f9a8e7fd614",
    pass: "cca596af4effa5"
  }
});
exports.register = function(req, res) {
  User.findOne({ email: req.body.email }, (err, results) => {
    if (results != null) {
      res.render("pages/register/index", {
        title: "Đăng ký thất bại",
        isSuccess: false,
        message: `Email ${req.body.email} đã tồn tại.`,
        layout: false
      });
    } else {
      var newUser = new User(req.body);
      newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
      newUser.save(function(err, User) {
        if (err) {
          res.render("pages/register/index", {
            title: "Đăng ký thất bại",
            isSuccess: false,
            message: "Có lỗi xảy ra trong quá trình đăng ký",
            layout: false
          });
        } else {
          User.hash_password = undefined;
          res.redirect("/dashboard");
        }
      });
    }
  });
};

exports.login_template = function(req, res) {
  console.log("authen", req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  }
  return res.render("pages/login/index", {
    title: "Đăng nhập",
    layout: false
  });
};

exports.register_template = function(req, res) {
  res.render("pages/register/index", {
    title: "Đăng nhập",
    isRegister: false,
    layout: false,
    isSuccess: true
  });
};

exports.forgot_password_template = function(req, res) {
  return res.render("pages/forgotpassword/index", {
    title: "Quên mật khấu",
    layout: false
  });
};

exports.reset_password_template = function(req, res) {
  return res.render("pages/resetpassword/index", {
    title: "Thay đổi mật khẩu",
    layout: false
  });
};

exports.sign_in = function(req, res) {
  // User.findOne(
  //   {
  //     email: req.body.email
  //   },
  //   function(err, User) {
  //     if (err) throw err;
  //     if (!User || !bcrypt.comparePassword(req.body.password)) {
  //       return res.status(401).json({
  //         message: "Authentication failed. Invalid User or password."
  //       });
  //     }
  //     return res.json({
  //       token: jwt.sign(
  //         {
  //           email: User.email,
  //           fullName: User.fullName,
  //           _id: User._id
  //         },
  //         "RESTFULAPIs"
  //       )
  //     });
  //   }
  // );
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/register"
  });
};

exports.loginRequired = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    req.login(user, err => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign({ user }, "secret");
      console.log("name", user.name);
      return res.render("pages/dashboard/index", { name: user.name });
    });
  })(req, res);
};

exports.forgot_password = function(req, res) {
  async.waterfall(
    [
      function(done) {
        User.findOne({
          email: req.body.email
        }).exec(function(err, account) {
          if (account) {
            done(err, account);
          } else {
            done("Tài khoản không tìm thấy.");
          }
        });
      },
      function(account, done) {
        // create the random token
        crypto.randomBytes(20, function(err, buffer) {
          var token = buffer.toString("hex");
          done(err, account, token);
        });
      },
      function(account, token, done) {
        User.findByIdAndUpdate({ _id: account._id }, account, {
          upsert: true,
          new: true
        }).exec(function(err, new_account) {
          done(err, token, new_account);
        });
      },
      function(token, account, done) {
        let url = "https://localhost:3000/reset-password?token=" + token;
        ejs.renderFile(
          __dirname + "/forgot-password-email.ejs",
          { name: account.name, url: url },
          function(err, data) {
            var mainOptions = {
              // from: "2264cc7f3a-e1d8c5@inbox.mailtrap.io",
              to: account.email,
              subject: "Password help has arrived!",
              html: data
            };
            if (err) {
              console.log(err);
            } else {
              transporter.sendMail(mainOptions, function(err) {
                console.log("main Otiopn", mainOptions.html);
                if (!err) {
                  console.log("main Otiopnsdfsdf", mainOptions.subject);
                  return res.json({
                    message: "Kindly check your email for further instructions"
                  });
                } else {
                  return done(err);
                }
              });
            }
          }
        );
      }
    ],
    function(err) {
      return res.status(422).json({ message: err });
    }
  );
};

/**
 * Reset password
 */
exports.reset_password = function(req, res, next) {
  User.findOne({
    reset_password_token: req.body.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }).exec(function(err, User) {
    if (!err && User) {
      if (req.body.newPassword === req.body.verifyPassword) {
        User.hash_password = bcrypt.hashSync(req.body.newPassword, 10);
        User.reset_password_token = undefined;
        User.reset_password_expires = undefined;
        User.save(function(err) {
          if (err) {
            return res.status(422).send({
              message: err
            });
          } else {
            var data = {
              to: User.email,
              from: email,
              template: "reset-password-email",
              subject: "Password Reset Confirmation",
              context: {
                name: User.fullName.split(" ")[0]
              }
            };

            smtpTransport.sendMail(data, function(err) {
              if (!err) {
                return res.json({ message: "Password reset" });
              } else {
                return done(err);
              }
            });
          }
        });
      } else {
        return res.status(422).send({
          message: "Passwords do not match"
        });
      }
    } else {
      return res.status(400).send({
        message: "Password reset token is invalid or has expired."
      });
    }
  });
};
