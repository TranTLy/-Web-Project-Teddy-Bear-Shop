const express = require("express");
const router = express.Router();

const dashboard_controller = require("../controllers/dashboardController");
const users_controller = require("../controllers/usersController");
const customers_controller = require("../controllers/customersController");
const products_controller = require("../controllers/productsController");
const bills_controller = require("../controllers/billsController");
const types_controller = require("../controllers/typesController");
const producers_controller = require("../controllers/producersController");
const origins_controller = require("../controllers/originsController");
const detail_controller = require("../controllers/detailController");
const detail_customer_controller = require("../controllers/detailCustomerController");
const admin_controller = require("../controllers/adminController");
const accountadmin_controller = require("../controllers/accountadminController");
const passport = require("passport");
router.get("/", accountadmin_controller.login_template);
router.post("/", accountadmin_controller.login);

router.get("/register", accountadmin_controller.register_template);
router.post("/register", accountadmin_controller.register);

router.get("/logout", accountadmin_controller.logout);
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
router.get("/detail_customer", detail_customer_controller.get);

router.get("/admin", admin_controller.get);

router.get("/change-password", admin_controller.change_password_template);
router.post("/change-password", admin_controller.change_password);

router.get(
  "/infor",
  admin_controller.isAuthenUser,
  admin_controller.getInfoSuccess
);

router.get(
  "/dashboard",
  accountadmin_controller.isLoggedIn,
  dashboard_controller.index
);
router.post("/dashboard", dashboard_controller.statistical);

router.get("/users", users_controller.index);
router.put("/users/:_id", users_controller.update);
router.get("/users/getUser", users_controller.getUsers);
router.get("/users/checkpassword", users_controller.checkpassword);
router.get("/users/check-email-login", users_controller.checkemaillogin);
router.get("/users/check-pass-login", users_controller.checkpasswordlogin);
router.post("/users/edit-username", users_controller.edit_username);

router.put("/customers/:_id", customers_controller.update);
router.get("/customers/getUser", customers_controller.getUsers);

router.get("/products", products_controller.index);
router.get("/products/get", products_controller.get);
router.get("/products/getStatistic", products_controller.getStatistic);

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

router.get("/bills", bills_controller.get);
router.get("/bills/getStatistic", bills_controller.getStatistic);
router.get("/bills/getTop10", bills_controller.getTop10);
router.put("/bills/:_id", bills_controller.update);
router.get("/bills/getlistproducts", bills_controller.getProductsByIdBill);


module.exports = router;
