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
// router.get('/productType', ProductController.getListProductType)
router.get('/productType', function (req, res) {
  const listType = ProductController.getListProductType
  res.render('product/ProductType',{listType})
});

//Action
//Account
router.route('/login')
  .post(AccountController.login)

//Product
router.route('/productType/add')
  .post(ProductController.addProductType)
router.route('/productType/edit')
  .post(ProductController.editProductType)
router.route('/productType/delete')
  .post(ProductController.deleteProductType)

module.exports = router;