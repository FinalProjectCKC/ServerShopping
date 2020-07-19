const proType = require('express').Router()
const accAuth = require('../middleware/accountAuth')
var bodyParser = require('body-parser');
var path = require('path');
var AccountController = require('../controller/AccountController');
var ProductController = require('../controller/ProductController');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var passport = require('passport');
const formidable = require('formidable');
var localStrategy = require('passport-local').Strategy;
let multer = require('multer')
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/img/proType',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
    return cb(null, false);
  }
});
// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}
//Navigation
proType.get('/', ProductController.getListProductType)

// proType.route('/addType')
//   .post(upload.single('typeImg'))
//   .post(ProductController.addProductType)

proType.route('/addType')
  .post(ProductController.addProductType1)

proType.route('/editType1')
  .post(ProductController.editProductType)

proType.route('/editType')
  .post(upload.single('typeImg'))
  .post(ProductController.editProductType)

proType.route('/deleteType')
  .post(ProductController.deleteProductType)

module.exports = proType;