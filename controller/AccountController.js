var passport = require("passport");
var Account = require("../models/account");
var jwt = require("jsonwebtoken");
let request = require("request-promise");
let base64 = require("base-64");
let mongoose = require("mongoose");
let handleAccountJwt = require("../handleAccountJwt");
let fs = require("fs");
const path = require("path");
let api = require("../config");
API_URL = api.API_URL;

exports.login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (
    username == "" ||
    username === undefined ||
    password == "" ||
    password === undefined
  ) {
    return res.json({
      success: false,
      mgs: "Tài khoản mật khẩu không được để trống",
    });
  }
  try {
    username = username.toLowerCase();
    const check = await Account.findOne({
      username: username,
      password: password,
    });
    if (check !== null) {
      req.session.isLogin = true;
      req.session.user = username;
      return res.json({ success: true, mgs: "" });
    } else {
      return res.json({
        success: false,
        mgs: "Tên đăng nhập hoặc mật khẩu không đúng",
      });
    }
  } catch {
    return res.json({
      success: false,
      mgs: "Có sự cố xảy ra, vui lòng thử lại sau",
    });
  }
};
exports.getListAccount = async (req, res) => {
  try {
    const listAccount = await Account.find();
    return res.render("account/ListAccount", {
      listAccount,
    });
  } catch (error) {
    return res.send("Có lỗi xảy ra! Lấy danh sách thất bại");
  }
};
exports.getListPageAccount = async (req, res) => {
  try {
    let page = req.body.page;
    let limit = 2; //req.body.limit
    const listAccount = await Account.find()
      .skip(page * limit)
      .limit(limit);
    const listAll = Account.find();
    const countPage = (await listAll).length / limit;
    return res.json({
      success: true,
      listAccount,
      mgs: "shihi ",
      countPage: countPage,
    });
  } catch (error) {
    return res.json({
      success: false,
      mgs: "Có lỗi xảy ra! Lấy danh sách thất bại",
    });
  }
};

exports.addAccount = async (req, res) => {
  let accountName = req.body.accountName;
  let email = req.body.email;
  let address1 = req.body.address1;
  let address2 = req.body.address2;
  let City = req.body.City;
  let Status = req.body.Status;
  let date = new Date();
  let today = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  if (accountName == null || accountName == undefined || accountName == "") {
    return res.json({
      success: false,
      mgs: "Tên tài khoản không được để trống",
    });
  }
  try {
    const check = await Account.findOne({
      accountName: accountName,
    });
    if (check == null) {
      let files = req.files;
      if (!objectIsEmpty(files)) {
        let file = req.files.imgType;
        let imageName = file.fieldName + "-" + Date.now() + ".png";
        let tmp_path = file.path;
        let target_path =
          __dirname.replace("controller", "") +
          "public/img/account/" +
          imageName;
        let src = fs.createReadStream(tmp_path);
        let dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on("end", async () => {
          try {
            let typeImg = "img/account/" + imageName;
            const newAccount = new Account({
              _id: new mongoose.Types.ObjectId(),
              accountName: accountName,
              typeImg: typeImg,
              email: email,
              address1: address1,
              address2: address2,
              City: City,
              Status: Status,
              created_at: today,
              last_modified: today,
            });
            await newAccount.save().then(async () => {
              return res.json({
                success: true,
                mgs: "Thêm loại sản phẩm thành công",
              });
            });
          } catch (error) {
            return res.json({
              success: false,
              mgs: "Có sự cố xảy ra. Không thể thêm loại sản phẩm!",
            });
          }
        });
        src.on("error", (err) => {
          fs.unlink(tmp_path, (err) => {
            console.log(err);
          });
          return res.json({
            status: -1,
            message: "Thất bại",
          });
        });
      } else {
        let typeImg = "img/account/default.png";
        //create new Account
        const newAccount = new Account({
          _id: new mongoose.Types.ObjectId(),
          accountName: accountName,
          typeImg: typeImg,
          email: email,
          address1: address1,
          address2: address2,
          City: city,
          Status: status,
          created_at: today,
          last_modified: today,
        });
        await newAccount.save().then(async () => {
          return res.json({ success: true, mgs: "Thêm sản phẩm thành công" });
        });
      }
    } else {
      return res.json({
        success: false,
        mgs: "Tên loại sản phẩm đã tồn tại!",
      });
    }
  } catch {
    return res.json({
      success: false,
      mgs: "Có sự cố xảy ra. Không thể thêm loại sản phẩm!",
    });
  }
};

exports.editProductType = async (req, res) => {
  let typeId = req.body.typeId;
  let typeName = req.body.typeName;
  let description = req.body.description;
  let date = new Date();
  let today = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  if (typeName == null || typeName == undefined || typeName == "") {
    return res.json({ success: false, mgs: "Tên loại không được để trống" });
  }
  try {
    //Check ProductType Name exit
    const check = await ProductType.findOne({
      _id: typeId,
    });
    let currenImg = check.typeImg;
    let currenName = check.typeName;
    if (typeName !== currenName) {
      const checkName = await ProductType.find({
        typeName: typeName,
      });
      if (checkName.length != 0) {
        return res.json({
          success: false,
          mgs: "Tên loại sản phẩm đã tồn tại!",
        });
      }
    }

    //update ProductType
    let files = req.files;
    if (!objectIsEmpty(files)) {
      let file = req.files.imgType;
      let imageName = file.fieldName + "-" + Date.now() + ".png";
      let tmp_path = file.path;
      let target_path =
        __dirname.replace("controller", "") + "public/img/proType/" + imageName;
      let src = fs.createReadStream(tmp_path);
      let dest = fs.createWriteStream(target_path);
      src.pipe(dest);
      src.on("end", async () => {
        try {
          let typeImg = "img/proType/" + imageName;
          await ProductType.findOneAndUpdate(
            { _id: typeId },
            {
              typeName: typeName,
              typeImg: typeImg,
              description: description,
              last_modified: today,
            }
          ).then(async () => {
            fs.unlink(
              __dirname.replace("controller", "") + "public/" + currenImg,
              (err) => {
                console.log(err);
              }
            );
            return res.json({
              success: true,
              mgs: "Cập nhật loại sản phẩm thành công",
            });
          });
        } catch (error) {
          return res.json({
            success: false,
            mgs: "Có sự cố xảy ra. Không thể thêm loại sản phẩm!",
          });
        }
      });
      src.on("error", (err) => {
        fs.unlink(tmp_path, (err) => {
          console.log(err);
        });
        return res.json({
          status: -1,
          message: "Thất bại",
        });
      });
    } else {
      //create new ProductType
      await ProductType.findOneAndUpdate(
        { _id: typeId },
        {
          typeName: typeName,
          description: description,
          last_modified: today,
        }
      ).then(async () => {
        return res.json({
          success: true,
          mgs: "Cập nhật loại sản phẩm thành công",
        });
      });
    }
  } catch {
    return res.json({
      success: false,
      mgs: "Có sự cố xảy ra. Không thể cập nhật loại sản phẩm!",
    });
  }
};
