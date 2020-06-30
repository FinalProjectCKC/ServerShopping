const router = require('express').Router()
const accAuth = require('../middleware/accountAuth')
var bodyParser = require('body-parser');
var AccountController = require('../controller/AccountController');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

let multer = require('multer')
let upload = multer({ dest: 'uploads' })

router.get('', function (req, res) {
  res.render('login/login');
});
router.get('home', function (req, res) {
  res.render('pages/index');
});
router.get('/productType', function (req, res) {
  res.render('product/productType');
});

module.exports = router;