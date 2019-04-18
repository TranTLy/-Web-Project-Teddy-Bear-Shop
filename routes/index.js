var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Page' });
});
router.get('/admin', function(req, res, next) {
  res.render('index', { title: 'Admin page' });
});
module.exports = router;
