const router = require('express').Router()
const accAuth = require('../middleware/accountAuth')
var bodyParser = require('body-parser');
var AccountController = require('../controller/AccountController');
var ProductController = require('../controller/ProductController');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

let multer = require('multer')
let upload = multer({ dest: 'uploads' })

//Navigation
router.get('', function (req, res) {
  res.render('login/login');
});
router.get('/home', function (req, res) {
  res.render('pages/index');
});

//Action
//Account
router.route('/login')
  .post(AccountController.login)

//Product
router.get('/productType', ProductController.getListProductType);
// router.route('/productType')
//   .post(ProductController.getListProductType)
router.route('/productType/add')
  .post(ProductController.addProductType)
router.route('/productType/edit')
  .post(ProductController.editProductType)
router.route('/productType/delete')
  .post(ProductController.deleteProductType)

module.exports = router;