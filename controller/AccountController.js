var passport = require('passport')
var Account = require('../models/account')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
let request = require('request-promise')
let base64 = require('base-64')
let mongoose = require('mongoose')
let handleAccountJwt = require('../handleAccountJwt')
let fs = require('fs')
const path = require('path')
let api = require('../config')
API_URL = api.API_URL

exports.login = async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  if (username == "" || username === undefined || password == "" || password === undefined) {
    return res.json({ success: false, mgs: 'Tài khoản mật khẩu không được để trống' });
  }
  try {
    username = username.toLowerCase()
    const check = await Account.findOne(
      {
        username: username,
      }
    )
    if (check !== null) {
      if (bcrypt.compareSync(`${password}`, check.password)) {
        req.session.isLogin = true;
        req.session.user = username;
        return res.json({ success: true, mgs: "" });
      }
    } else {
      return res.json({ success: false, mgs: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }
  }
  catch{
    return res.json({ success: false, mgs: 'Có sự cố xảy ra, vui lòng thử lại sau' });
  }

}
exports.getListAccount = async (req, res) => {
  try {
    const listAccount = await Account.find()
    return res.render('account/ListAccount', { listAccount });
  } catch (error) {
    return res.send('Có lỗi xảy ra! Lấy danh sách thất bại');;
  }
}
exports.addAccount = async (req, res) => {
  let username = req.body.username;
  let fullname = req.body.fullname;
  let email = req.body.email;
  let password = req.body.password;
  let address = req.body.address;
  let date = new Date();
  let today = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  if (!username) {
    return res.json({ success: false, mgs: "Tên tài khoản không được để trống" });
  }
  try {
    const check = await Account.findOne({
      username: username,
    });
    console.log("username",username)
    if (check==null) {
            const newAccount = new Account({
              _id: new mongoose.Types.ObjectId(),
              username: username,
              fullName: fullname,
              email:email,
              password: password,
              address:address,
              accRole:"admin",
              created_at: today,
              last_modified: today,
            });
            await newAccount.save().then(async () => {
              return res.json({
                success: true,
                mgs: "Thêm thành công",
              });
            });
    } else {
      return res.json({
        success: false,
        mgs: "Tên đã tồn tại!",
      });
    }
  } catch(e){
    console.log(e)
    return res.json({
      success: false,
      mgs: "Có sự cố xảy ra. Không thể thêm loại sản phẩm!",
    });
  }
}
// exports.logout = async (req, res) => {

// }