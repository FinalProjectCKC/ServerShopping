const routeProductDiscount = require("express").Router();
var path = require("path");
var ProductController = require("../controller/ProductController");
let multer = require("multer");
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/img/productDiscount",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
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
    cb("Error: Images Only!");
  }
}

//Navigation
// routeProduct.get('/', function (req, res) {
//   res.render('login/login');
// });
routeProductDiscount.get("/", ProductController.getListProduct);

routeProductDiscount
  .route("/addProductDiscount")
  .post(upload.single("inputImg"))
  .post(ProductDiscountController.addProductDiscount);

routeProductDiscount
  .route("/editDiscount")
  .post(ProductDiscountController.editProductDiscount);

routeProductDiscount
  .route("/deleteDiscount")
  .post(ProductDiscountController.deleteProductDiscount);

module.exports = routeProductDiscount;
