const User = require("../models/customer");
var moment = require("moment");
exports.getUsers = async function(req, res, next) {
  let dbUsers = await User.find({}, (err, result) => {
    return result;
  });
  console.log("getcustomer", dbUsers)
  dbUsers.map(user => {
    user.birthdayStr = moment(user.birthday).format('HH:mm DD/MM/YYYY')
    console.log("getcustomer", user)
    return user
  })
  console.log("getcustomeraf", dbUsers)
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

// exports.index = function(req, res, next) {
//   if (req.isAuthenticated()) {
//     res.render("pages/users/index", { title: "Quản lý người dùng" });
//   }
//   return res.redirect("/");
// };
