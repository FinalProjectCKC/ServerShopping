const router = require('express').Router()
const accAuth = require('../middleware/accountAuth')
var bodyParser = require('body-parser');
var AccountController = require('../controller/AccountController');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
let multer = require('multer')
var proType = require('./routeProductType');

//Navigation
router.get('', function (req, res) {
  res.render('login/login');
});
router.get('/home', function (req, res) {
  res.render('pages/index');
});
router.route('/login')
  .post(AccountController.login)
//Product
router.use('/productType', proType );

module.exports = router;