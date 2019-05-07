var express = require('express');
var router = express.Router();

router.get('', function (req, res, next) {
  res.render('pages/dashboard/index', { title: 'Dashboard' });
});
router.get('/dashboard', function (req, res, next) {
  res.render('pages/dashboard/index', { title: 'Dashboard1' });
});
router.get('/users', function (req, res, next) {
  res.render('pages/users/index', { title: 'User' });
});
router.get('/products', function (req, res, next) {
  res.render('pages/products/index', { title: 'Product' });
});
router.get('/bills', function (req, res, next) {
  res.render('pages/bills/index', { title: 'Bill' });
});
module.exports = router;
