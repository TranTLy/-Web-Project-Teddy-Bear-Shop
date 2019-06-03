var express = require("express");
var router = express.Router();

var dashboard_controller = require("../controllers/dashboardController");
var users_controller = require("../controllers/usersController");
var products_controller = require("../controllers/productsController");
var bills_controller = require("../controllers/billsController");
var types_controller = require("../controllers/typesController");
var producers_controller = require("../controllers/producersController");
var origins_controller = require("../controllers/originsController");
var detail_controller = require("../controllers/detailController");
var account_controller = require("../controllers/accountController");
var accountadmin_controller = require("../controllers/accountadminController");

router.get("/", accountadmin_controller.login_template);
router.post("/", accountadmin_controller.loginRequired);
// router.get('/login', account_controller.signin);
router.get("/register", accountadmin_controller.register_template);
router.post("/register", accountadmin_controller.register);
// router.post('/signin', account_controller.signup);
router.get(
  "/forgot-password",
  accountadmin_controller.forgot_password_template
);
router.post("/forgot-password", accountadmin_controller.forgot_password);
router.get("/reset-password", accountadmin_controller.reset_password_template);
router.post("/reset-password", accountadmin_controller.reset_password);
// router.get("/change-password", accountadmin_controller.change_password);
// router.get("/update-infor", account_controller.update_infor);

router.get("/detail", detail_controller.get);
router.get("/dashboard", dashboard_controller.index);
router.post("/dashboard", dashboard_controller.statistical);

router.get("/users", users_controller.index);
router.get("/users/getUser", users_controller.getUsers);

router.get("/products", products_controller.index);
router.get("/products/get", products_controller.get);
router.post("/products", products_controller.create);
router.delete("/products/:_id", products_controller.delete);
router.put("/products/:_id", products_controller.update);

router.get("/types", types_controller.index);
router.get("/types/get", types_controller.get);
router.post("/types", types_controller.create);
router.delete("/types/:_id", types_controller.delete);
router.put("/types/:_id", types_controller.update);

router.get("/origins", origins_controller.index);
router.get("/origins/get", origins_controller.get);
router.post("/origins", origins_controller.create);
router.delete("/origins/:_id", origins_controller.delete);
router.put("/origins/:_id", origins_controller.update);

router.get("/producers", producers_controller.index);
router.get("/producers/get", producers_controller.get);
router.post("/producers", producers_controller.create);
router.delete("/producers/:_id", producers_controller.delete);
router.put("/producers/:_id", producers_controller.update);

router.get("/bills", bills_controller.index);
router.post("/bills", bills_controller.search_sort);

// router.get("/register", function(req, res) {
//   res.render("pages/register/index", { title: "Đăng ký" });
// });

// router.get("/login", function(req, res) {
//   res.render("pages/login/index", { title: "Đăng nhập" });
// });

module.exports = router;
