var express = require("express");
var router = express.Router();

var dashboard_controller = require("../controllers/dashboardController");
var users_controller = require("../controllers/usersController");

router.get('/',dashboard_controller.index);
router.get('/dashboard',dashboard_controller.index);
router.post('/dashboard',dashboard_controller.statistical);

router.get('/users',users_controller.index);
router.post('/users',users_controller.crud);

router.get('/products', function (req, res, next) {
  res.render('pages/products/index', { title: 'Product' });
});
router.get('/bills', function (req, res, next) {
  res.render('pages/bills/index', { title: 'Bill' });
});

module.exports = router;
