var express = require("express");
var router = express.Router();

// /* GET home page. */
// router.get("/", function(req, res, next) {
//   res.render("index", { title: "Express" });
// });

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("customer-views/index", { title: "Home" });
});
/* GET home page. */
router.get("/index", function(req, res, next) {
  res.render("customer-views/index", { title: "Home" });
});

router.get("/about", function(req, res, next) {
  res.render("customer-views/about", { title: "About" });
});

router.get("/checkout", function(req, res, next) {
  res.render("customer-views/checkout", { title: "Shoping cart" });
});
router.post("/checkout", function(req, res, next) {
  res.render("customer-views/checkout", { title: "Shoping cart" });
});

router.get("/contact", function(req, res, next) {
  res.render("customer-views/contact", { title: "Contact" });
});

// router.get("/icon", function(req, res, next) {
//   res.render("customer-views/icon", { title: "Icon" });
// });

router.get("/payment", function(req, res, next) {
  res.render("customer-views/payment", { title: "Payment" });
});

router.post("/payment", function(req, res, next) {
  res.render("customer-views/payment", { title: "Payment" });
});

router.get("/product", function(req, res, next) {
  res.render("customer-views/product", { title: "Product" });
});

router.get("/service", function(req, res, next) {
  res.render("customer-views/service", { title: "Service" });
});

router.get("/shop", function(req, res, next) {
  res.render("customer-views/shop", { title: "Shop" });
});
//TODO: add id
router.get("/single", function(req, res, next) {
  //todo: get name product form id
  const name = "Gấu teddy";
  res.render("customer-views/single", { title: "Single", nameProduct: name });
});
//todo
router.post("/single", function(req, res, next) {
  //add a comment
  res.render("customer-views/single", { title: "Add a comment" });
});
router.get("/signup", function(req, res, next) {
  res.render("customer-views/signup", { title: "Single" });
});
router.get("/404", function(req, res, next) {
  res.render("customer-views/single", { title: "Single" });
});
// router.post("/*", function(req, res, next) {
//   res.render("404-not-found", { title: "Single" });
// });

//Trần Phú Nguyện
// router.get('/admin/dashboard', function (req, res, next) {
//   res.render('admin/pages/dashboard/index', { title: 'Dashboard1' });
// });
//End Trần Phú Nguyện
module.exports = router;
