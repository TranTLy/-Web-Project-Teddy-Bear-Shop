var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Dashboard');
});
router.get('/dashboard', function(req, res, next) {
  res.send('Dashboard-1');
});
module.exports = router;
