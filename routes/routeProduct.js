const routeProduct = require('express').Router()
const accAuth = require('../middleware/accountAuth')
var bodyParser = require('body-parser');
var path = require('path');
var AccountController = require('../controller/AccountController');
var ProductController = require('../controller/ProductController');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
let multer = require('multer')
// Set The Storage Engine
routeProduct.get('/', ProductController.getListProduct)

routeProduct.route('/addProduct')
  .post(ProductController.addProduct)

routeProduct.route('/editType')
  .post(ProductController.editProduct)

routeProduct.route('/deleteType')
  .post(ProductController.deleteProduct)

module.exports = routeProduct;