var express = require("express");
var router = express.Router();

var dashboard_controller = require("../controllers/dashboardController");
var users_controller = require("../controllers/usersController");
var products_controller = require("../controllers/productsController");
var bills_controller = require("../controllers/billsController");

router.get('/',dashboard_controller.index);

router.get('/dashboard',dashboard_controller.index);
router.post('/dashboard',dashboard_controller.statistical);

router.get('/users',users_controller.index);
router.get('/users/getUser',users_controller.getUsers);

router.get('/products',products_controller.index);
router.get('/products/getTypes',products_controller.getTypes);
router.get('/products/getProducts',products_controller.getProducts);
router.post('/products',products_controller.crud);
router.post('/products/insert',products_controller.insert);
router.put('/products/:_id',products_controller.update);

router.get('/bills',bills_controller.index);
router.post('/bills',bills_controller.search_sort);

module.exports = router;
