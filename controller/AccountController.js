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

exports.login = async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  // console.log("=))", req.body)
  // let username = 'tungtx5'
  // let password = 'Tung!@#'
  if (username === null || username === undefined || password === null || password === undefined) {
    res.send('Tài khoản mật khẩu không được để trống');
  }
  try {
    username = username.toLowerCase()
    const check = await Account.findOne(
      {
        username: username,
        password: password
      }
    )
    if (check !== null) {
      req.session.isLogin = true;
      req.session.user = username;
      res.redirect('home')
    } else {
      res.send('Tên đăng nhập hoặc mật khẩu không đúng');
    }
  }
  catch{
    res.send('Có sự cố xảy ra, vui lòng thử lại sau');
  }

}

// exports.logout = async (req, res) => {

// }
