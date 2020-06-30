var passport = require('passport')
var Account = require('../models/account')
var jwt = require('jsonwebtoken')
let request = require('request-promise')
let base64 = require('base-64')
let mongoose = require('mongoose')
let handleAccountJwt = require('../handleAccountJwt')
let fs = require('fs')
const path = require('path')
let api = require('../config')
API_URL = api.API_URL

exports.login= async (req, res) => {
  // let username = 'req.params.username'
  // let password = 'req.params.password'
  let username = 'tunsgtx5'
  let password = 'Tung!@#'
  if (username === null || username === undefined || password === null || password === undefined) {
      res.send('Tài khoản mật khẩu không được để trống');
  }
  username = username.toLowerCase()
  const check = await Account.findOne(
      { username: username,
        password: password}
  )
  if (check !== null) {
        // req.session.isLogin = true;
        // req.session.user = username;
        res.redirect('home')
  } else {
    res.send('Tên đăng nhập hoặc mật khẩu không đúng');
  }
}

// exports.logout = async (req, res) => {
  
// }
