var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin/pages/dashboard/index', { title: 'Dashboard' });
});
router.get('/dashboard', function(req, res, next) {
  res.render('admin/pages/dashboard/index', { title: 'Dashboard1' });
});
router.get('/users', function(req, res, next) {
  res.render('admin/pages/users/index', { title: 'User' });
});
module.exports = router;
