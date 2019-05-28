const User = require('../models/user');
var passport = require('passport');
var Bcrypt = require('bcryptjs');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

// router.get("/register", function(req, res) {
//   res.render("pages/register/index", { title: "Đăng ký" });
// });

// router.get("/login", function(req, res) {
//   res.render("pages/login/index", { title: "Đăng nhập" });
// });
exports.signup = function(req, res) {
	res.render("pages/register/index", { title: "Đăng ký" });
};
exports.signin = function(req, res) {
	res.render("pages/login/index", { title: "Đăng nhập" });
};
exports.forget_password = function(req, res) {
	res.render('customer-views/forget-password', { title: 'Quên mật khẩu' });
};
exports.change_password = function(req, res) {
	res.render('customer-views/change-password', { title: 'Đổi mật khẩu' });
};
exports.update_infor = function(req, res) {
	res.render('customer-views/update-infor', { title: 'Thay đổi thông tin' });
};

exports.post_signin = async function(req, res) {
	try {
		await User.findOne({ email: req.body.email }, (err, user) => {
			if (err) throw err;