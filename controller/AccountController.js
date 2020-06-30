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
  let username = req.params.username
  let password = req.params.password
  if (username === null || username === undefined || password === null || password === undefined) {
      return res.send('Tài khoản mật khẩu không được để trống');
  }

  username = username.toLowerCase()
  const check = await Account.findOne(
      { username: username }
  )
  if (check !== null) {
      const token1 = jwt.sign({ id: check.id }, 'jwt-secret')
      return res.send('Đăng nhập thành công');
  } else {
      return res.json({
          status: -1,
          message: 'Tên đăng nhập hoặc mật khẩu không chính xác',
          data: null
      })
  }
}

exports.logout = async (req, res) => {
  let accountId = handleAccountJwt.getAccountId(req)
  try {
      await Account.findOneAndUpdate(
          { _id: accountId },
          {
              notificationToken: {
                  token: null,
                  platform: null
              }
          }
      )
      res.json({
          status: 1,
          message: 'Đăng xuất thành công',
          data: null
      })
  } catch (error) {
      res.json({
          status: -1,
          message: 'Thất bại',
          data: null,
          error: error
      })
  }
}
