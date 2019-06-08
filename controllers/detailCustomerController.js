const User = require("../models/customer");
var ObjectId = require("mongodb").ObjectID;
var moment = require("moment");

exports.get = async function(req, res, next) {
  const id = req.query._id;

  const user = await User.findOne({ _id: ObjectId(id) }, (err, result) => {
    return result;
  });

  res.render("pages/detailaccountcustomer/index", {
    title: "Thông tin chi tiết",
    userDetail: user,
    moment: moment
  });
};

// exports.index = function(req, res, next) {
//   if (req.isAuthenticated()) {
//     res.render("pages/users/index", { title: "Quản lý người dùng" });
//   }
//   return res.redirect("/");
// };
// exports.crud = function(req, res, next) {
//   res.render("pages/users/index", { title: "Quản lý người dùng" });
// };
